// import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Grid,
  Table,
  Stack,
  Button,
  Checkbox,
  Container,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Tooltip,
  Typography
} from '@mui/material';

import axios from 'axios';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import { GetUsers } from '../_mocks_/user';
import UserRank from '../components/UserRank';
import UserDescription from '../components/UserDescription';

import { useUserState, useUserDispatch, setFavorites } from '../components/UserContext';
import Chart from '../components/stockchart/Charts';
import getStockData from '../utils/getStockData';
import UserPopup from '../components/UserPopup';
import StockSearchButtons from '../components/StockSearchButtons';

const textSubstitutes = require('./symbols.json');
const TABLE_HEAD = require('./UserTableHead.json');
const EXPLAINERS = require('./UserButtonSetup.json');
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    let command = '';
    const regex1 = new RegExp('\\(', 'g');
    query = query.replace(regex1, '( ');
    const regex2 = new RegExp('\\)', 'g');
    query = query.replace(regex2, ' )');
    query.split(' ').forEach((q) => {
      const found = Object.keys(textSubstitutes).find((key) => key === q);
      const item = found ? textSubstitutes[q] : q;
      command += command === '' ? item : ` ${item}`;
    });
    console.log(command);
    try {
      const result = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < array.length; i++) {
        const data = array[i];
        // eslint-disable-next-line no-eval
        if (eval(command)) {
          result.push(data);
        }
      }
      return result;
    } catch (e) {
      console.log('invalid command.');
    }
  }
  return stabilizedThis.map((el) => el[0]);
}

// export default function User() {
//   return <div />;
// }

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUserList] = useState(GetUsers([]));
  const [stockFavorites, setStockFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [stockData, setStockData] = useState({});
  const [chartSymbol, setChartSymbol] = useState('');
  const { symbols, favorites } = useUserState();

  const [stateKeyLevel, setStateKeyLevel] = useState(0);
  const [fibonaccis, setFibonaccis] = useState({});

  console.log('showFavorites', showFavorites);
  console.log('.................................');

  const userDispatch = useUserDispatch();

  useEffect(() => {
    console.log('useEffect');
    if (USERLIST.length === 0) setUserList(symbols);
    if (stockFavorites.length === 0) setStockFavorites(favorites);
    if (Object.entries(favorites).length > 0) {
      const newSelecteds = Object.keys(favorites).map((n) => n);
      setSelected(newSelecteds);
    }
    return () => {
      const token = localStorage.getItem('id_token');
      if (JSON.stringify(favorites) !== JSON.stringify(stockFavorites)) {
        setFavorites(userDispatch, token, null, null, stockFavorites);
        console.log('useEffect.  Save chagnes in favorites');
      } else console.log('useEffect.  No change.');
    };
  }, []);

  useEffect(() => {
    console.log('hello');

    // (async () => {
    //   try {
    //     const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:5000/symbols';
    //     const res1 = await axios.get(url1);
    //     const users = GetUsers(res1.data);
    //     const url2 = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:5000/favorites';
    //     const res2 = await axios.get(url2);
    //     const newSelecteds = Object.keys(res2.data).map((n) => n);
    //     setUserList(users);
    //     setFavorites(res2.data);
    //     setSelected(newSelecteds);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
    // return function cleanup() {
    //   const url2 = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:5000/favorites';
    //   axios
    //     .post(url2, favorites)
    //     .then((response) => {
    //       // Handle success.
    //       console.log('favorites updated. ', response);
    //     })
    //     .catch((error) => {
    //       // Handle error.
    //       console.log('An error occurred while saving favorites:', error.response);
    //     });
    //   console.log('cleaning up');
    // };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log(event.target.checked);
    setShowFavorites(!showFavorites);
    // if (event.target.checked) {
    //   const newSelecteds = USERLIST.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
  };

  const handleSymbolButtonPress = (symbol) => {
    getStockData(stockData, symbol, setStockData, setChartSymbol);
    const item = USERLIST.find((user) => user.name === symbol);
    try {
      if (item) setStateKeyLevel(item.keylevels);
    } catch (e) {
      setStateKeyLevel(0);
    }
    try {
      if (item) setFibonaccis(item.fibs);
    } catch (e) {
      setFibonaccis({ fib1: 0, fib2: 0 });
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let addKey = false;
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      addKey = true;
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    const stocks = stockFavorites;
    if (addKey) {
      stocks[name] = {
        description: '',
        rank: 3,
        created: new Date().toLocaleString()
      };
    } else {
      delete stocks[name];
    }
    setStockFavorites(stocks);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const getFilteredUsers = () => {
    if (USERLIST === []) return [];
    if (showFavorites) return selected.map((key) => USERLIST.find((one) => one.name === key));
    return applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  };

  const filteredUsers = getFilteredUsers();

  const isUserNotFound = filteredUsers.length === 0;

  const getEma = (ema20, ema50, ema200) => {
    let result = '';
    if (ema20) result = '20';
    if (ema50) result += result.length > 0 ? '|50' : '50';
    if (ema200) result += result.length > 0 ? '|200' : '200';
    return result.length > 0 ? result : '-';
  };

  const handleRankSelect = (symbol, rank) => {
    const data = stockFavorites;
    data[symbol].rank = rank;
    setStockFavorites(data);
  };

  const handleDescriptionChange = (symbol, description) => {
    const data = stockFavorites;
    data[symbol].description = description;
    setStockFavorites(data);
  };

  const extraLine = (name) => {
    if (Object.keys(stockFavorites).length === 0) return <></>;

    const id = `${name}-extra`;
    // return (
    //   <TableRow key={id}>
    //     <TableCell colSpan="2">test 1</TableCell>
    //     <TableCell colSpan="10">test 2</TableCell>
    //   </TableRow>
    // );

    return (
      <TableRow key={id}>
        <TableCell colSpan="2">
          <UserRank
            symbol={name}
            rank={stockFavorites[name].rank}
            handleChange={handleRankSelect}
          />
        </TableCell>
        <TableCell colSpan="10">
          <UserDescription
            symbol={name}
            description={stockFavorites[name].description}
            handleChange={handleDescriptionChange}
          />
        </TableCell>
      </TableRow>
    );
  };

  const fib1 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib1 : 0;
  const fib2 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib2 : 0;
  console.log(`price - ${stateKeyLevel} ${fib1} ${fib2} `);

  return (
    <Page title="Stocks | TradeSimp">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Stocks
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Favorites
          </Button>
        </Stack>

        {chartSymbol === '' || stockData[chartSymbol] === undefined ? (
          <></>
        ) : (
          <Card>
            <Chart
              type="svg"
              data={stockData[chartSymbol]}
              price={stateKeyLevel}
              fib1={fib1}
              fib2={fib2}
              symbol={chartSymbol}
            />
          </Card>
        )}

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Card>
            <StockSearchButtons data={EXPLAINERS} searchFunc={setFilterName} />
          </Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        atr,
                        cik,
                        corr,
                        cinv,
                        price,
                        trend,
                        reverse,
                        keylevel,
                        keylevels,
                        fibonachi,
                        fibs,
                        threebars,
                        relvol,
                        vpro,
                        engulf,
                        ema20,
                        ema50,
                        ema200,
                        gap,
                        dtop,
                        ogap,
                        rsi,
                        floats,
                        floatp
                      } = row;
                      const isItemSelected =
                        Object.entries(selected).length > 0 ? selected.indexOf(name) !== -1 : false;

                      const lineItem = (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                <Button
                                  variant="text"
                                  onClick={() => handleSymbolButtonPress(name)}
                                >
                                  {name}
                                </Button>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">${price}</TableCell>
                          <TableCell align="left">
                            {trend} / {reverse}
                          </TableCell>
                          <TableCell align="left">
                            {keylevel ? 'SR' : '-'}/{vpro ? 'V' : '-'}
                          </TableCell>
                          <TableCell align="left">{relvol}</TableCell>
                          <TableCell align="left">{getEma(ema20, ema50, ema200)}</TableCell>
                          <TableCell align="left">
                            {gap ? 'yes' : 'no'}/{ogap}%
                          </TableCell>
                          <TableCell align="left">
                            {engulf ? 'E' : '-'}/{dtop ? 'D' : '-'}/{rsi ? 'R' : '-'}/
                            {fibonachi ? 'F' : '-'}/{threebars ? '3' : '-'}
                          </TableCell>
                          <TableCell align="right">
                            <UserPopup data={row} />
                          </TableCell>
                        </TableRow>
                      );
                      return isItemSelected ? (
                        <>
                          {lineItem}
                          {extraLine(name)}
                        </>
                      ) : (
                        lineItem
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow key="empty-rows" style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow key="user-not-found">
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

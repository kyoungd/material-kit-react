/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
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
  Typography
} from '@mui/material';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import { GetUsers } from '../_mocks_/user';
import Chart from '../components/stockchart/Charts';
import getStockData from '../utils/getStockData';
import UserPopup from '../components/UserPopup';
import StockSearchButtons from '../components/StockSearchButtons';

const textSubstitutes = require('./symbols.json');
const TABLE_HEAD = require('./UserTableHead.json');
const EXPLAINERS = require('./UserButtonSetup.json');
// ----------------------------------------------------------------------

User.propTypes = {
  favorites: PropTypes.object.isRequired,
  symbols: PropTypes.array.isRequired,
  userDispatch: PropTypes.func.isRequired
};

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

export default function User(props) {
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

  const [stateKeyLevel, setStateKeyLevel] = useState(0);
  const [fibonaccis, setFibonaccis] = useState({});

  useEffect(() => {
    console.log('useEffect - initialize');
    setUserList(props.symbols);
    setStockFavorites(props.favorites);
    const newSelecteds = Object.keys(props.favorites).map((n) => n);
    setSelected(newSelecteds);

    // if (USERLIST.length === 0) setUserList(props.symbols);
    // if (Object.keys(stockFavorites).length === 0) setStockFavorites(props.favorites);
    // if (Object.entries(props.favorites).length > 0) {
    //   const newSelecteds = Object.keys(props.favorites).map((n) => n);
    //   setSelected(newSelecteds);
    // }
    return () => {
      console.log('useEffect - return');
      props.userDispatch({ type: 'FAVORITES', payload: props.favorites, work: 'SAVE' });
      console.log('useEffect.  Save chagnes in props.favorites');
    };
  }, [props]);

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

  const buildWeekData = (weekdata) => {
    const { open } = weekdata[0];
    const { close } = weekdata[weekdata.length - 1];
    const high = Math.max(...weekdata.map((row) => row.high));
    const low = Math.min(...weekdata.map((row) => row.low));
    const volume = weekdata.map((row) => row.volume).reduce((a, b) => a + b);
    return { date: weekdata[0].date, open, close, high, low, volume };
  };

  const dailyToWeeklyStockData = (daily) => {
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    const weekly = [];
    let weekdata = [];
    let lastDayOfWeek = 0;
    for (const day in daily) {
      const row = daily[day];
      const dayOfWeek = row.date.getDay();
      if (lastDayOfWeek < dayOfWeek) weekdata.push(row);
      else {
        if (weekdata.length > 0) {
          weekly.push(buildWeekData(weekdata));
          weekdata = [];
        }
        weekdata.push(row);
      }
      lastDayOfWeek = dayOfWeek;
      console.log(day);
    }
    if (weekdata.length > 0) weekly.push(buildWeekData(weekdata));
    return weekly;
  };

  const fib1 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib1 : 0;
  const fib2 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib2 : 0;

  const isNoSelection = chartSymbol === '' || stockData[chartSymbol] === undefined;

  let daily;
  let weekly;
  if (!isNoSelection) {
    daily = stockData[chartSymbol];
    if (daily !== undefined && daily !== null) {
      // eslint-disable-next-line no-unused-vars
      weekly = dailyToWeeklyStockData(daily);
    }
  }

  return (
    <Page title="Stocks | TradeSimp">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Stocks
          </Typography>
        </Stack>

        {isNoSelection ? (
          <></>
        ) : (
          <>
            <Card>
              <Chart
                type="svg"
                data={daily}
                price={stateKeyLevel}
                fib1={fib1}
                fib2={fib2}
                symbol={chartSymbol}
              />
            </Card>
            <Card>
              <Chart
                type="svg"
                data={weekly}
                price={stateKeyLevel}
                fib1={fib1}
                fib2={fib2}
                symbol={chartSymbol}
              />
            </Card>
          </>
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
                        relvol,
                        vpro,
                        td,
                        engulf,
                        ema20,
                        ema50,
                        ema200,
                        gap,
                        dtop,
                        ogap,
                        rsi,
                        vc,
                        wh,
                        wr,
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
                            {trend} / {reverse} / {td}
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
                            {fibonachi ? 'F' : '-'}/-
                          </TableCell>
                          <TableCell align="right">
                            <UserPopup data={row} />
                          </TableCell>
                        </TableRow>
                      );
                      return lineItem;
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

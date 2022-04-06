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

import { Icon } from '@iconify/react';
import highPriority from '@iconify/icons-eva/checkmark-circle-2-fill';
import mediumPriority from '@iconify/icons-eva/checkmark-circle-2-outline';
import lowPriority from '@iconify/icons-eva/clock-outline';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';

// import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import { GetUsers } from '../_mocks_/user';
import Chart from '../components/stockchart/Charts';
// import getStockData from '../utils/getStockData';
import { downloadStockData } from '../components/UserContext';

import UserPopup from '../components/UserPopup';
import StockSearchButtons from '../components/StockSearchButtons';

// ----------------------------------------------------------------------

User.propTypes = {
  favorites: PropTypes.object.isRequired,
  symbols: PropTypes.array.isRequired,
  userDispatch: PropTypes.func.isRequired,
  translation: PropTypes.array.isRequired,
  tableHead: PropTypes.array.isRequired,
  explainers: PropTypes.array.isRequired,
  rowContent: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired
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

function applySortFilter(array, comparator, query, translation) {
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
      const found = Object.keys(translation).find((key) => key === q);
      const item = found ? translation[q] : q;
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
  const [USERLIST, setUserList] = useState([]);
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
    // getStockData(stockData, symbol, setStockData, setChartSymbol);
    downloadStockData(stockData, symbol, setStockData, setChartSymbol);
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
    props.userDispatch({ type: 'FAVORITES', payload: stocks, work: 'SAVE' });
    setStockFavorites(stocks);
    setSelected(newSelected);
  };

  const userPopupOnClose = (symbol, favs) => {
    const selectedIndex = selected.indexOf(symbol);
    if (selectedIndex === -1) {
      let newSelected = [];
      newSelected = newSelected.concat(selected, symbol);
      setSelected(newSelected);
    }
    if (favs[symbol]) {
      props.userDispatch({ type: 'FAVORITES', payload: favs, work: 'SAVE' });
      setStockFavorites(favs);
    }
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
    if (showFavorites) {
      const filterSelected = selected.filter((key) => USERLIST.find((one) => one.name === key));
      return filterSelected.map((key) => USERLIST.find((one) => one.name === key));
    }
    return applySortFilter(USERLIST, getComparator(order, orderBy), filterName, props.translation);
  };

  const filteredUsers = getFilteredUsers();

  const isUserNotFound = filteredUsers.length === 0;

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
      // console.log(day);
    }
    if (weekdata.length > 0) weekly.push(buildWeekData(weekdata));
    return weekly;
  };

  const fib1 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib1 : 0;
  const fib2 =
    fibonaccis !== undefined && Object.keys(fibonaccis).length === 2 ? fibonaccis.fib2 : 0;

  const isNoSelection = chartSymbol === '' || stockData[chartSymbol] === undefined;

  const showPriority = (favs, symbol) => {
    const item = favs[symbol];
    if (item === undefined) return <></>;
    switch (item.rank) {
      case 'a':
        return <Icon icon={highPriority} color="#1C9CEA" width={16} height={16} />;
      case 'o':
        return <Icon icon={mediumPriority} color="#1C9CEA" width={16} height={16} />;
      case 'w':
        return <Icon icon={lowPriority} color="#EA9C1C" width={16} height={16} />;
      default:
        return <></>;
    }
  };

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
    <Page title="TRADESIMP">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {props.pageType === 'DAILY' ? 'Assets Daily' : 'Assets Realtime'}
          </Typography>
        </Stack>

        <Container maxwidth={false}>
          <StockSearchButtons
            data={props.explainers}
            searchFunc={setFilterName}
            resetFunc={setChartSymbol}
          />
        </Container>

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
            onFilterName={props.pageType === 'REALTIME' ? setUserList : handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={props.tableHead}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected =
                        Object.entries(selected).length > 0
                          ? selected.indexOf(row.name) !== -1
                          : false;

                      const lineItem = (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Stack direction="row" justifyContent="space-between">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row.name)}
                              />{' '}
                              {showPriority(stockFavorites, row.name)}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {props.pageType === 'DAILY' && (
                                  <Button
                                    variant="text"
                                    onClick={() => handleSymbolButtonPress(row.name)}
                                  >
                                    {row.name}
                                  </Button>
                                )}
                                {props.pageType === 'REALTIME' && row.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {props.rowContent(row)}
                          {props.pageType === 'DAILY' && (
                            <TableCell align="right">
                              <UserPopup
                                data={row}
                                favs={stockFavorites}
                                onClose={userPopupOnClose}
                              />
                            </TableCell>
                          )}
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

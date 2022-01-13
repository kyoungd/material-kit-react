import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
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

const symbols = require('./symbols.json');

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'atr', label: 'ATR', alignRight: false },
  { id: 'trend', label: 'Trend', alignRight: false },
  { id: 'keylevel', label: 'Level', alignRight: false },
  { id: 'fibonachi', label: 'Fib', alignRight: false },
  { id: 'threebars', label: '3-bar', alignRight: false },
  { id: 'relvol', label: 'r-vol', alignRight: false },
  { id: 'vpro', label: 'v-pro', alignRight: false },
  { id: 'ema', label: 'ema', alignRight: false },
  { id: '' }
];

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
      const found = Object.keys(symbols).find((key) => key === q);
      const item = found ? symbols[q] : q;
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
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);

  console.log('showFavorites', showFavorites);
  console.log('.................................');

  useEffect(() => {
    console.log('hello');

    // let users;
    // let res2;
    // const mounted = true;
    // (async () => {
    //   try {
    //     const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:5000/symbols';
    //     const res1 = await axios.get(url1);
    //     users = GetUsers(res1.data);
    //     const url2 = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:5000/favorites';
    //     res2 = await axios.get(url2);
    //     if (mounted) {
    //       const newSelecteds = Object.keys(res2.data).map((n) => n);
    //       setUserList(users);
    //       setSelected(newSelecteds);
    //       setFavorites(res2.data);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
    (async () => {
      try {
        const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:5000/symbols';
        const res1 = await axios.get(url1);
        const users = GetUsers(res1.data);
        const url2 = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:5000/favorites';
        const res2 = await axios.get(url2);
        const newSelecteds = Object.keys(res2.data).map((n) => n);
        setUserList(users);
        setFavorites(res2.data);
        setSelected(newSelecteds);
      } catch (e) {
        console.log(e);
      }
    })();
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
    const stocks = favorites;
    if (addKey) {
      stocks[name] = {
        description: '',
        rank: 3,
        created: new Date().toLocaleString()
      };
    } else {
      delete stocks[name];
    }
    setFavorites(stocks);
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
    const data = favorites;
    data[symbol].rank = rank;
    setFavorites(data);
  };

  const handleDescriptionChange = (symbol, description) => {
    const data = favorites;
    data[symbol].description = description;
    setFavorites(data);
  };

  const extraLine = (name) => {
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
          <UserRank symbol={name} rank={favorites[name].rank} handleChange={handleRankSelect} />
        </TableCell>
        <TableCell colSpan="10">
          <UserDescription
            symbol={name}
            description={favorites[name].description}
            handleChange={handleDescriptionChange}
          />
        </TableCell>
      </TableRow>
    );
  };

  const saveFavoriteToHost = (fvs) => {
    const url2 = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:5000/favorites';
    axios
      .post(url2, fvs)
      .then((response) => {
        // Handle success.
        console.log('User profile', response.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <Page title="Stocks | TradeSimp">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Stocks
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => saveFavoriteToHost(favorites)}
          >
            Favorites
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

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
                        avgatr,
                        price,
                        trend,
                        keylevel,
                        fibonachi,
                        threebars,
                        relvol,
                        vpro,
                        ema20,
                        ema50,
                        ema200
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">${price}</TableCell>
                          <TableCell align="left">${atr}</TableCell>
                          <TableCell align="left">{trend}</TableCell>
                          <TableCell align="left">{keylevel ? 'yes' : 'no'}</TableCell>
                          <TableCell align="left">{fibonachi ? 'yes' : 'no'}</TableCell>
                          <TableCell align="left">{threebars ? 'yes' : 'no'}</TableCell>
                          <TableCell align="left">{relvol}</TableCell>
                          <TableCell align="left">{vpro ? 'yes' : 'no'}</TableCell>
                          <TableCell align="left">{getEma(ema20, ema50, ema200)}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
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

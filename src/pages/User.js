/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import plusFill from '@iconify/icons-eva/plus-fill';  const { isAuthenticated, symbols, favorites } = useUserState();

import { Navigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
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
import ChartPopup from '../components/stockchart/ChartPopup';
import { useUserState } from '../components/UserContext';

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

  useEffect(() => {
    console.log('useEffect - initialize');
    setUserList(props.symbols);
    setStockFavorites(props.favorites);
    const newSelecteds = Object.keys(props.favorites).map((n) => n);
    setSelected(newSelecteds);
  }, [props]);

  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (Object.keys(props.symbols).length <= 0) return <Navigate to="/dashboard/app" replace />;

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

  const selectionMath = (selectedIndex, name, selected) => {
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    return newSelected;
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    const addKey = selectedIndex === -1;
    const newSelected = selectionMath(selectedIndex, name, selected);
    const stocks = stockFavorites;
    if (addKey) {
      stocks[name] = {
        description: '',
        rank: 'w',
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
    const newSelected = Object.keys(favs).map((n) => n);
    setSelected(newSelected);
    props.userDispatch({ type: 'FAVORITES', payload: favs, work: 'SAVE' });
    setStockFavorites(favs);
  };

  // const userPopupOnClose = (symbol, favs) => {
  //   const selectedIndex = selected.indexOf(symbol);
  //   if (selectedIndex === -1) {
  //     let newSelected = [];
  //     newSelected = newSelected.concat(selected, symbol);
  //     setSelected(newSelected);
  //   }
  //   if (favs[symbol]) {
  //     props.userDispatch({ type: 'FAVORITES', payload: favs, work: 'SAVE' });
  //     setStockFavorites(favs);
  //   }
  // };

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

  const showPriority = (favs, symbol) => {
    const item = favs[symbol];
    if (item === undefined) return <></>;
    switch (item.rank) {
      case 'a':
        return (
          <Tooltip title={item.description}>
            <Icon icon={highPriority} color="#1C9CEA" width={16} height={16} />
          </Tooltip>
        );
      case 'o':
        return (
          <Tooltip title={item.description}>
            <Icon icon={mediumPriority} color="#1C9CEA" width={16} height={16} />
          </Tooltip>
        );
      case 'w':
        return (
          <Tooltip title={item.description}>
            <Icon icon={lowPriority} color="#EA9C1C" width={16} height={16} />
          </Tooltip>
        );
      default:
        return <></>;
    }
  };

  const resetStockSearchButton = (key) => {
    console.log('resetStockSearchButton() - ', key);
  };

  return (
    <Page title="TRADESIMP">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {props.pageType === 'DAILY' ? 'Daily' : '5 Minutes'}
          </Typography>
        </Stack>

        <Container maxwidth={false}>
          <StockSearchButtons
            data={props.explainers}
            searchFunc={setFilterName}
            resetFunc={resetStockSearchButton}
          />
        </Container>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onRefreshData={setUserList}
            pageType={props.pageType}
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
                              {/* <UserPopup
                                isChecked={isItemSelected}
                                data={row}
                                favs={stockFavorites}
                                onClose={userPopupOnClose}
                              />{' '} */}
                              {showPriority(stockFavorites, row.name)}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {props.pageType === 'DAILY' && (
                                  <ChartPopup
                                    symbol={row.name}
                                    price={
                                      USERLIST.find((user) => user.name === row.name)
                                        ? USERLIST.find((user) => user.name === row.name).keylevels
                                        : 0
                                    }
                                    data={row}
                                    favs={stockFavorites}
                                    onClose={userPopupOnClose}
                                  />
                                )}
                                {props.pageType === 'REALTIME' && <p>{row.name}</p>}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {props.rowContent(row)}
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

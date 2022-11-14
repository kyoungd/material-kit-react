import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

NewsTable.propTypes = {
  newsList: PropTypes.array.isRequired,
  includeSymbols: PropTypes.bool
};

NewsTable.defaultProps = {
  includeSymbols: false
};

function dateString(ondate) {
  const today = new Date(ondate);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  // const yyyy = today.getFullYear();
  return `${mm}-${dd}`;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function NewsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            {props.includeSymbols && <StyledTableCell align="right">Symbols</StyledTableCell>}
            <StyledTableCell align="right">Sentiment</StyledTableCell>
            <StyledTableCell align="right">Headline</StyledTableCell>
            <StyledTableCell align="right">Summary</StyledTableCell>
            <StyledTableCell align="right">News</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.newsList.map((row) => (
            <StyledTableRow
              key={row.news_on}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell>{dateString(row.news_on)}</StyledTableCell>
              <StyledTableCell align="center">{row.symbols.replace(/,/g, ', ')}</StyledTableCell>
              <StyledTableCell align="right">{(row.sentiment * 100).toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right">{row.headline}</StyledTableCell>
              <StyledTableCell align="right">{row.summary}</StyledTableCell>
              <StyledTableCell align="right">
                <a href={row.url} target="_blank" rel="noreferrer">
                  NEWS SOURCE
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

NewsTable.propTypes = {
  newsList: PropTypes.array.isRequired
};

function dateString(ondate) {
  const today = new Date(ondate);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  // const yyyy = today.getFullYear();
  return `${mm}-${dd}`;
}

export default function NewsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Sentiment</TableCell>
            <TableCell align="right">Headline</TableCell>
            <TableCell align="right">Summary</TableCell>
            <TableCell align="right">News</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.newsList.map((row) => (
            <TableRow key={row.news_on} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ minWidth: 80 }}>
                {dateString(row.news_on)}
              </TableCell>
              <TableCell align="right">{(row.sentiment * 100).toFixed(2)}</TableCell>
              <TableCell align="right">{row.headline}</TableCell>
              <TableCell align="right">{row.summary}</TableCell>
              <TableCell align="right">
                <a href="{row.url}" target="_blank">
                  NEWS SOURCE
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

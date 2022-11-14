import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

CollapsibleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Row(data) {
  const { row } = data;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.room}
        </TableCell>
        <TableCell align="right">{row.summary}</TableCell>
        <TableCell align="right">{row.hours}</TableCell>
        <TableCell align="right">{row.students.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Display Name</TableCell>
                    <TableCell align="right">Student Since</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.students.map((historyRow) => (
                    <TableRow key={`std-${historyRow.id}`}>
                      <TableCell component="th" scope="row">
                        {historyRow.username}
                      </TableCell>
                      <TableCell>{historyRow.email}</TableCell>
                      <TableCell>{historyRow.displayName ? historyRow.displayName : '-'}</TableCell>
                      <TableCell align="right"> - </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable(props) {
  const rows = props.data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Channel</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

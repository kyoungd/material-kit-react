import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

Messages.propTypes = {
  socket: PropTypes.object.isRequired
};

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

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        console.log(message);
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    // const deleteMessageListener = (messageID) => {
    //     setMessages((prevMessages) => {
    //         const newMessages = { ...prevMessages };
    //         delete newMessages[messageID];
    //         return newMessages;
    //     });
    // };

    socket.on('message', messageListener);
    // socket.on('deleteMessage', deleteMessageListener);
    // socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      // socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Pattern</StyledTableCell>
            <StyledTableCell align="right">Timeframe</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Object.values(messages)]
            .sort((a, b) => b.sortid - a.sortid)
            .map((row) => {
              try {
                const message = JSON.parse(row.value);
                return (
                  <StyledTableRow
                    key={message.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {message.symbol}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {message.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="right">{message.pattern}</StyledTableCell>
                    <StyledTableCell align="right">{message.timeframe}</StyledTableCell>
                    <StyledTableCell align="right">{row.time}</StyledTableCell>
                  </StyledTableRow>
                );
              } catch (e) {
                return <></>;
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Messages;

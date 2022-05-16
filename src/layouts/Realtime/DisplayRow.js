/* eslint-disable no-bitwise */
import { TableCell } from '@mui/material';

export default function UserRow(row) {
  let candle = '';
  candle += row.vsa === 1 ? ' thrust' : '';
  candle += row.vsa === 2 ? ' climax' : '';
  candle += (row.cs & 1) === 1 ? ' engulf' : '';
  candle += (row.cs & 2) === 2 ? ' star' : '';
  return (
    <>
      <TableCell align="right">${row.price.toFixed(2)}</TableCell>
      <TableCell align="center">{candle}</TableCell>
      <TableCell align="center">{(row.cs & 4) === 4 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 8) === 8 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 16) === 16 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{row.tf}</TableCell>
    </>
  );
}

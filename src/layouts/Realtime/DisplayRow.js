/* eslint-disable no-bitwise */
import { TableCell } from '@mui/material';

export default function UserRow(row) {
  return (
    <>
      <TableCell align="right">${row.price}</TableCell>
      <TableCell align="center">{(row.vsa & 1) === 1 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.vsa & 2) === 2 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 1) === 1 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 2) === 2 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 4) === 4 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 8) === 8 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{(row.cs & 16) === 16 ? 'yes' : ''}</TableCell>
      <TableCell align="center">{row.tf}</TableCell>
    </>
  );
}

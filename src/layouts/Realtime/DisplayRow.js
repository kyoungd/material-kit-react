/* eslint-disable no-bitwise */
import { TableCell } from '@mui/material';

export default function UserRow(row) {
  return (
    <>
      <TableCell align="left">${row.price}</TableCell>
      <TableCell align="center">{(row.vsa & 1) === 1 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.vsa & 2) === 2 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.cs & 1) === 1 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.cs & 2) === 2 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.cs & 4) === 4 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.cs & 8) === 8 ? 'yes' : 'no'}</TableCell>
      <TableCell align="center">{(row.cs & 16) === 16 ? 'yes' : 'no'}</TableCell>
    </>
  );
}

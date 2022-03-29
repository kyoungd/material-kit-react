import { TableCell } from '@mui/material';

export default function UserRow(row) {
  return (
    <>
      <TableCell align="left">${row.price}</TableCell>
      <TableCell align="left">{row.vsa === 1 ? 'yes' : 'no'}</TableCell>
      <TableCell align="left">{row.vsa === 2 ? 'yes' : 'no'}</TableCell>
      <TableCell align="left">{row.vsa === 3 || row.vsa === 4 ? 'yes' : 'no'}</TableCell>
      <TableCell align="left">
        {row.vsa === 5 || row.vsa === 6 || row.vsa === 7 ? 'yes' : 'no'}
      </TableCell>
      <TableCell align="left">{row.vsa === 10 ? 'yes' : 'no'}</TableCell>
    </>
  );
}

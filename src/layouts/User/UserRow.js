import { TableCell } from '@mui/material';

export default function UserRow(row) {
  const getEma = (ema20, ema50, ema200) => {
    let result = '';
    if (ema20) result = '20';
    if (ema50) result += result.length > 0 ? '|50' : '50';
    if (ema200) result += result.length > 0 ? '|200' : '200';
    return result.length > 0 ? result : '-';
  };

  return (
    <>
      <TableCell align="left">${row.price}</TableCell>
      <TableCell align="left">
        {row.trend} / {row.reverse} / {row.td}
      </TableCell>
      <TableCell align="left">
        {row.keylevel ? 'SR' : '-'}/{row.vpro ? 'V' : '-'}
      </TableCell>
      <TableCell align="left">{row.vs}</TableCell>
      <TableCell align="left">{getEma(row.ema20, row.ema50, row.ema200)}</TableCell>
      <TableCell align="left">
        {row.gap ? 'yes' : 'no'}/{row.ogap}%/{row.oc ? 'yes' : 'no'}
      </TableCell>
      <TableCell align="left">
        {row.engulf ? 'E' : '-'}/{row.dtop ? 'D' : '-'}/{row.rsi ? 'R' : '-'}/
        {row.fibonachi ? 'F' : '-'}/-
      </TableCell>
    </>
  );
}

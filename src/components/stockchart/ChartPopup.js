/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Chart from './Charts';
import { downloadStockData } from '../UserContext';

ChartPopup.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.number
};

export default function ChartPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [timeframe, setTimeframe] = React.useState('d');
  const [stockData, setStockData] = React.useState({});
  const [chartSymbol, setChartSymbol] = React.useState('');
  const [fibonachi, setFibonachi] = React.useState({});

  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down(''));

  React.useEffect(() => {
    downloadStockData(stockData, props.symbol, setStockData, setChartSymbol);
    setFibonachi({ fib1: 0, fib2: 0 });
  }, [props, stockData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTimeframe = (event) => {
    setTimeframe(event.target.value);
  };

  const buildWeekData = (weekdata) => {
    const { open } = weekdata[0];
    const { close } = weekdata[weekdata.length - 1];
    const high = Math.max(...weekdata.map((row) => row.high));
    const low = Math.min(...weekdata.map((row) => row.low));
    const volume = weekdata.map((row) => row.volume).reduce((a, b) => a + b);
    return { date: weekdata[0].date, open, close, high, low, volume };
  };

  const dailyToWeeklyStockData = (daily) => {
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    const weekly = [];
    let weekdata = [];
    let lastDayOfWeek = 0;
    for (const day in daily) {
      const row = daily[day];
      const dayOfWeek = row.date.getDay();
      if (lastDayOfWeek < dayOfWeek) weekdata.push(row);
      else {
        if (weekdata.length > 0) {
          weekly.push(buildWeekData(weekdata));
          weekdata = [];
        }
        weekdata.push(row);
      }
      lastDayOfWeek = dayOfWeek;
      // console.log(day);
    }
    if (weekdata.length > 0) weekly.push(buildWeekData(weekdata));
    return weekly;
  };

  const fib1 = fibonachi !== undefined && Object.keys(fibonachi).length === 2 ? fibonachi.fib1 : 0;
  const fib2 = fibonachi !== undefined && Object.keys(fibonachi).length === 2 ? fibonachi.fib2 : 0;

  let daily = [];
  let weekly = [];
  daily = stockData[chartSymbol];
  if (daily !== undefined && daily !== null) {
    // eslint-disable-next-line no-unused-vars
    weekly = dailyToWeeklyStockData(daily);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>{props.symbol}</Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.symbol}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
            <Typography component="div">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={timeframe}
                  onChange={handleChangeTimeframe}
                >
                  <FormControlLabel value="d" control={<Radio />} label="Daily" />
                  <FormControlLabel value="w" control={<Radio />} label="Weekly" />
                </RadioGroup>
              </FormControl>
              <Card>
                <Chart
                  type="svg"
                  data={timeframe === 'd' ? daily : weekly}
                  price={props.price}
                  symbol={chartSymbol}
                  fib1={fib1}
                  fib2={fib2}
                />
              </Card>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

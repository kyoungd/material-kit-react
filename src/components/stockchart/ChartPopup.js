/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CandleStickChart from './CandleStickCharts';
import { downloadStockData, downloadNewsData } from '../UserContext';
import NewsTable from './components/NewsTable';

ChartPopup.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.number,
  favs: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default function ChartPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [timeframe, setTimeframe] = React.useState('d');
  const [stockData, setStockData] = React.useState({});
  const [newsData, setNewsData] = React.useState({});
  const [chartSymbol, setChartSymbol] = React.useState('');
  const [fibonachi, setFibonachi] = React.useState({});
  const [description, setDescription] = React.useState('');
  const [viewState, setViewState] = React.useState('');
  const [iChartData, setIChartData] = React.useState({});

  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down(''));

  React.useEffect(() => {
    downloadStockData(stockData, props.symbol, setStockData, setChartSymbol);
    downloadNewsData(newsData, props.symbol, setNewsData);
    setFibonachi({ fib1: 0, fib2: 0 });
    const item = props.favs[props.data.name];
    const valueDescription = item === undefined ? '' : item.description;
    setDescription(valueDescription);
    const interactiveChartData =
      item === undefined || !('iChartData' in item) ? {} : item.iChartData;
    setIChartData(interactiveChartData);
    const vstate = item === undefined ? '' : item.rank;
    setViewState(vstate);
  }, [props, stockData, newsData]);

  const handleSetChartData = (value) => {
    console.log('handleIChartData', value);
    setIChartData(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
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

  const handleClose = () => {
    const newFavs = { ...props.favs };
    const symbol = props.data.name;
    const initDescription = newFavs[symbol] === undefined ? '' : newFavs[symbol].description;
    const initViewState = newFavs[symbol] === undefined ? 0 : newFavs[symbol].rank;
    if (initDescription.trim() !== description.trim() || initViewState !== viewState) {
      if (viewState === 'd') {
        if (newFavs[symbol]) delete newFavs[symbol];
        props.onClose(symbol, newFavs);
      } else if (['a', 'o', 'w'].indexOf(viewState) >= 0) {
        if (newFavs[symbol] === undefined) {
          newFavs[symbol] = {
            created: new Date(),
            description,
            rank: viewState,
            iChartData: JSON.stringify(iChartData)
          };
        } else {
          newFavs[symbol].description = description;
          newFavs[symbol].rank = viewState;
          newFavs[symbol].iChartData = JSON.stringify(iChartData);
        }
        props.onClose(symbol, newFavs);
      }
    }
    setOpen(false);
  };

  const showCorrelations = (corr) => {
    let correlation = '';
    for (const line in corr) {
      const symbol = corr[line];
      correlation = correlation === '' ? symbol : `${correlation}, ${symbol}`;
    }
    return correlation === '' ? 'None' : correlation;
  };

  const showNewsFinviz = (symbol) => (
    <>
      <a href={`https://finviz.com/quote.ashx?t=${symbol}`} target="_blank" rel="noreferrer">
        News-Finviz
      </a>{' '}
    </>
  );

  const showNewsYahoo = (symbol) => (
    <>
      <a href={`https://finance.yahoo.com/quote/${symbol}`} target="_blank" rel="noreferrer">
        News-Yahoo Finance
      </a>{' '}
    </>
  );

  const showCik = (cik) => (
    <>
      <a
        href={
          cik === '0' || cik === undefined
            ? `https://www.sec.gov/edgar/searchedgar/companysearch.html`
            : `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`
        }
        target="_blank"
        rel="noreferrer"
      >
        SEC filings
      </a>
    </>
  );

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeViewState = (event) => {
    setViewState(event.target.value);
  };

  const selectionDashboard = () => (
    <Box m={2} pt={3}>
      <Typography component="div">
        <Box fontWeight="fontWeightMedium" display="inline">
          CORRELATIONS:
        </Box>{' '}
        {showCorrelations(props.data.corr)}
      </Typography>
      <Typography component="div">
        <Box fontWeight="fontWeightMedium" display="inline">
          INVERSES:
        </Box>{' '}
        {showCorrelations(props.data.cinv)}
      </Typography>
      <Typography component="div">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              Float %:
            </Box>{' '}
            {props.data.floatp}%{' '}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              Float Volume:
            </Box>{' '}
            {props.data.floats}M
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              {' '}
            </Box>
          </Grid>
        </Grid>
      </Typography>
      <Typography component="div">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              ATR:
            </Box>{' '}
            ${props.data.atr}{' '}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              Average ATR:
            </Box>{' '}
            ${props.data.avgatr}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              {' '}
            </Box>
          </Grid>
        </Grid>
      </Typography>

      <Typography component="div">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              {showNewsFinviz(props.data.name)}
            </Box>{' '}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              {showNewsYahoo(props.data.name)}
            </Box>{' '}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box fontWeight="fontWeightMedium" display="inline">
              {showCik(props.data.cik)}
            </Box>{' '}
          </Grid>
        </Grid>
      </Typography>

      <Typography component="div">
        <TextField
          id="id-description"
          label="description"
          style={{ width: '100%' }}
          multiline
          maxRows={3}
          value={description}
          onChange={handleDescriptionChange}
          variant="standard"
        />
      </Typography>

      <Typography component="div" m={2} pt={2}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={viewState}
            onChange={handleChangeViewState}
          >
            <FormControlLabel value="a" control={<Radio />} label="Active" />
            <FormControlLabel value="o" control={<Radio />} label="Watch" />
            <FormControlLabel value="w" control={<Radio />} label="Wait" />
            <FormControlLabel value="d" control={<Radio />} label="DELETE" />
          </RadioGroup>
        </FormControl>
      </Typography>
    </Box>
  );

  const selectionNews = () => (
    <Box m={2} pt={3}>
      <Typography component="div">
        <Box fontWeight="fontWeightMedium" display="inline">
          NEWS (last 21 days):
        </Box>{' '}
      </Typography>
      <Typography component="div">
        <NewsTable newsList={newsData[chartSymbol] === undefined ? [] : newsData[chartSymbol]} />
      </Typography>
    </Box>
  );

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
          <Typography component="div">
            <FormControl>
              <ButtonGroup aria-label="outlined button group" onClick={handleChangeTimeframe}>
                <Button variant={timeframe === 'd' ? 'contained' : 'outlined'} value="d">
                  Daily
                </Button>
                <Button variant={timeframe === 'w' ? 'contained' : 'outlined'} value="w">
                  Weekly
                </Button>
                <Button variant={timeframe === 'i' ? 'contained' : 'outlined'} value="i">
                  Information
                </Button>
                <Button variant={timeframe === 'n' ? 'contained' : 'outlined'} value="n">
                  News
                </Button>
              </ButtonGroup>
            </FormControl>
            <Card variant="outlined">
              {timeframe === 'd' && (
                <CandleStickChart
                  type="svg"
                  data={daily}
                  price={props.price}
                  symbol={chartSymbol}
                  favs={props.favs}
                  fib1={fib1}
                  fib2={fib2}
                  idata={iChartData}
                  setidata={handleSetChartData}
                />
              )}
              {timeframe === 'w' && (
                <CandleStickChart
                  type="svg"
                  data={weekly}
                  price={props.price}
                  symbol={chartSymbol}
                  fib1={fib1}
                  fib2={fib2}
                  idata={iChartData}
                  setidata={handleSetChartData}
                />
              )}
              {timeframe === 'i' && selectionDashboard()}
              {timeframe === 'n' && selectionNews()}
            </Card>
          </Typography>
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

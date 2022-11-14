/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

import { format } from 'd3-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries, CandlestickSeries, LineSeries, RSISeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  CurrentCoordinate,
  PriceCoordinate,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip, MovingAverageTooltip, RSITooltip } from 'react-stockcharts/lib/tooltip';
import { ema, rsi } from 'react-stockcharts/lib/indicator';
import { fitWidth } from 'react-stockcharts/lib/helper';
import {
  FibonacciRetracement,
  TrendLine,
  DrawingObjectSelector
} from 'react-stockcharts/lib/interactive';
import { last, toObject } from 'react-stockcharts/lib/utils';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { saveInteractiveNodes, getInteractiveNodes } from './interactiveutils';

class CandlestickChart extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.onFibComplete2 = this.onFibComplete2.bind(this);

    this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
    this.getInteractiveNodes = getInteractiveNodes.bind(this);

    this.saveCanvasNode = this.saveCanvasNode.bind(this);

    console.log('constuctor called');
    // this.state = {
    // 	enableTrendLine: false,
    // 	iactive_1: [
    // 		{ start: [1606, 56], end: [1711, 53], appearance: { stroke: "green" }, type: "XLINE" }
    // 	],
    // 	iactive_3: []
    // };
    const defaultState = {
      enableTrendLine: false,
      enableFib: false,
      iactive_1: [],
      showVolumeChart: true,
      showRsiChart: true,
      iactive_2: []
    };
    try {
      const chartData = JSON.parse(props.idata);
      this.state = Object.entries(chartData).length === 0 ? defaultState : chartData;
    } catch {
      this.state = defaultState;
    }
  }

  saveCanvasNode(node) {
    this.canvasNode = node;
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyPress);
  }

  handleSelection(interactives) {
    const state = toObject(interactives, (each) => [`iactive_${each.chartId}`, each.objects]);
    this.setState(state);
  }

  acceptTrendlines(trendlines) {
    for (const idx in trendlines) {
      const line = trendlines[idx];
      if (Math.abs(line.start[0] - line.end[0]) < 2) {
        line.end[1] = line.start[1];
        line.end[0] = line.start[0] + 30;
      }
    }
    return trendlines;
  }

  onDrawCompleteChart1(iactive_1) {
    // this gets called on
    // 1. draw complete of trendline
    // 2. drag complete of trendline
    console.log('trend_1: ', iactive_1);
    this.setState(
      {
        enableTrendLine: false,
        iactive_1: this.acceptTrendlines(iactive_1)
      },
      () => {
        this.props.setidata(this.state);
      }
    );
  }

  onFibComplete2(iactive_2) {
    console.log('fib_2: ', iactive_2);
    this.setState(
      {
        iactive_2,
        enableFib: false
      },
      () => {
        this.props.setidata(this.state);
      }
    );
  }

  onKeyPress(e) {
    const keyCode = e.which;
    console.log(keyCode);
    switch (keyCode) {
      case 46: {
        // DEL
        const { iactive_1, iactive_2 } = this.state;
        const niactive_1 = iactive_1.filter((each) => !each.selected);
        const niactive_2 = iactive_2.filter((each) => !each.selected);
        this.canvasNode.cancelDrag();
        this.setState({
          iactive_1: niactive_1,
          iactive_2: niactive_2
        });
        break;
      }
      case 27: {
        // ESC
        this.canvasNode.cancelDrag();
        this.node_1 && this.node_1.terminate();
        this.node_2 && this.node_2.terminate();
        this.node_3 && this.node_3.terminate();
        this.setState({
          enableTrendLine: false
        });
        break;
      }
      case 68: // D - Draw trendline
      case 69: {
        // E - Enable trendline
        this.setState({
          enableTrendLine: true
        });
        break;
      }
      case 70: {
        // F - Enable Fibonacci
        this.setState({
          enableFib: true
        });
        break;
      }
      case 71: {
        // G - Enable Grid id
        console.log('ggggggggggg');
        console.log(JSON.stringify(this.state.iactive_1, 4));
        break;
      }
      default:
        break;
    }
  }

  render() {
    const ema50 = ema()
      .id(0)
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor((d) => d.ema50);

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => {
        d.ema12 = c;
      })
      .accessor((d) => d.ema12);

    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.rsi = c;
      })
      .accessor((d) => d.rsi);

    const { type, data: initialData, width, ratio, price } = this.props;

    const calculatedData = ema12(ema50(rsiCalculator(initialData)));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);
    const label1 = { inputProps: { 'aria-label': 'volume' } };
    const label2 = { inputProps: { 'aria-label': 'rsi' } };

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <>
        <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
          <Checkbox
            {...label1}
            onChange={(event) => this.setState({ showVolumeChart: event.target.checked })}
            defaultChecked
          />
          {' volume'}
          <Checkbox
            {...label2}
            onChange={(event) => this.setState({ showRsiChart: event.target.checked })}
            defaultChecked
          />
          {' rsi'}
          <Button
            variant={this.state.enableTrendLine ? 'contained' : 'outlined'}
            onClick={() => {
              if (this.state.enableTrendLine) {
                this.canvasNode.cancelDrag();
                this.node_1 !== undefined && this.node_1.terminate();
                this.node_3 !== undefined && this.node_3.terminate();
                this.setState({
                  enableTrendLine: false
                });
              } else {
                this.setState({
                  enableFib: false,
                  enableTrendLine: true
                });
              }
            }}
          >
            line
          </Button>
          {}
          <Button
            variant={this.state.enableFib ? 'contained' : 'outlined'}
            onClick={() => {
              if (this.state.enableFib) {
                this.canvasNode.cancelDrag();
                this.node_2 !== undefined && this.node_2.terminate();
                this.setState({
                  enableFib: false
                });
              } else {
                this.setState({
                  enableTrendLine: false,
                  enableFib: true
                });
              }
            }}
          >
            fib
          </Button>
          {}
        </Stack>
        <ChartCanvas
          ref={this.saveCanvasNode}
          height={600}
          width={width}
          ratio={ratio}
          margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
          type={type}
          seriesName="MSFT"
          data={data}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
        >
          <Chart
            id={1}
            height={400}
            yExtents={[(d) => [d.high, d.low], ema50.accessor(), ema12.accessor()]}
            padding={{ top: 10, bottom: 20 }}
          >
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

            <CandlestickSeries />
            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />
            <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />

            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />
            <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

            {price > 0 && (
              <PriceCoordinate
                at="right"
                orient="right"
                price={price}
                stroke="#3490DC"
                strokeWidth={1}
                fill="#FFFFFF"
                textFill="#22292F"
                arrowWidth={7}
                strokeDasharray="LongDash"
                displayFormat={format('.2f')}
              />
            )}
            {/* <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              yAccessor={(d) => d.close}
              fill={(d) => (d.close > d.open ? '#6BA583' : '#FF0000')}
            /> */}

            <OHLCTooltip origin={[-40, 0]} />

            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[-38, 15]}
              options={[
                {
                  yAccessor: ema50.accessor(),
                  type: ema50.type(),
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize
                },
                {
                  yAccessor: ema12.accessor(),
                  type: ema12.type(),
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize
                }
              ]}
            />
            <TrendLine
              ref={this.saveInteractiveNodes('Trendline', 1)}
              enabled={this.state.enableTrendLine}
              type="RAY"
              snap={false}
              snapTo={(d) => [d.high, d.low]}
              onStart={() => console.log('START')}
              onComplete={this.onDrawCompleteChart1}
              trends={this.state.iactive_1}
            />
            <FibonacciRetracement
              ref={this.saveInteractiveNodes('FibonacciRetracement', 2)}
              enabled={this.state.enableFib}
              retracements={this.state.iactive_2}
              onComplete={this.onFibComplete2}
            />
          </Chart>
          {this.state.showVolumeChart && (
            <Chart id={2} height={150} yExtents={[(d) => d.volume]} origin={(w, h) => [0, h - 300]}>
              <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format('.2s')} />

              <MouseCoordinateY at="left" orient="left" displayFormat={format('.4s')} />

              <BarSeries
                yAccessor={(d) => d.volume}
                fill={(d) => (d.close > d.open ? '#6BA583' : '#FF0000')}
              />
            </Chart>
          )}
          {this.state.showRsiChart && (
            <Chart
              id={3}
              height={150}
              yExtents={rsiCalculator.accessor()}
              origin={(w, h) => [0, h - 150]}
              padding={{ top: 10, bottom: 10 }}
            >
              <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
              <YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
              <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

              <RSISeries yAccessor={(d) => d.rsi} />

              <RSITooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.rsi}
                options={rsiCalculator.options()}
              />
            </Chart>
          )}
          <CrossHairCursor />
          <DrawingObjectSelector
            enabled={!this.state.enableTrendLine}
            getInteractiveNodes={this.getInteractiveNodes}
            drawingObjectMap={{
              Trendline: 'trends'
            }}
            onSelect={this.handleSelection}
          />
        </ChartCanvas>
      </>
    );
  }
}

CandlestickChart.propTypes = {
  data: PropTypes.array.isRequired,
  price: PropTypes.number,
  symbol: PropTypes.string,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  idata: PropTypes.string.isRequired,
  setidata: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid'])
};

CandlestickChart.defaultProps = {
  price: 0,
  symbol: '',
  type: 'hybrid'
};

const CandleStickChart = fitWidth(CandlestickChart);

export default CandleStickChart;

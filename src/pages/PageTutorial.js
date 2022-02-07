import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function PageTutorial() {
  return (
    <RootStyle title="Tutorial | TradeSimp">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ margin: 'auto' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Key Terms
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              <ul>
                <li>
                  <strong>atr</strong> - ATR (dollar) Last ATR value. Usally in dollar terms. 2.14
                  or 3.11
                </li>
                <li>
                  <strong>avgatr</strong> - AVERAGE ATR (dollar) Average ATR value. Usally in dollar
                  terms. 2.14 or 3.11
                </li>
                <li>
                  <strong>ema20</strong> - EMA 20 (boolean) Is the current stock price near the 20
                  EMA? yes or no.
                </li>
                <li>
                  <strong>ema50</strong> - EMA 50 (boolean) Is the current stock price near the 50
                  EMA? yes or no.
                </li>
                <li>
                  <strong>ema200</strong> - EMA 200 (boolean) Is the current stock price near the
                  200 EMA? yes or no.
                </li>
                <li>
                  <strong>eguf</strong> - ENGULFING CANDLE (boolean) Is there an engulfing candle in
                  the last 3 days? yes or no.
                </li>
                <li>
                  <strong>fib</strong> - FIBONACCI RETRACEMENT (boolean) Is the current price near a
                  Fobonacci Retrace to 50%-63% level?? yes or no.
                </li>
                <li>
                  <strong>float</strong> - FLOAT % (decimal) Float share % in decimal from 0 to 100.
                  13.2 or 24.1
                </li>
                <li>
                  <strong>floatv</strong> - FLOAT SHARE (integer) decimal value of float shares in
                  million. 1.2 is 1200000 shares.
                </li>
                <li>
                  <strong>level</strong> - KEY LEVEL OF SUPPORT AND RESISTANCE (boolean) Is the
                  current price near a key support/resistance level? yes or no.
                </li>
                <li>
                  <strong>gap</strong> - PRICE GAPPER (boolean) Is the current price near a
                  historical Gapper? yes or no.
                </li>
                <li>
                  <strong>ogap</strong> - OVERNIGHT GAPPER (boolean) Is the current price near a
                  fresh Overnight Gapper? yes or no.
                </li>
                <li>
                  <strong>price</strong> - CLOSE PRICE (dollar) Price of the stock in decimals. 5 or
                  24.95 or 127.10.
                </li>
                <li>
                  <strong>reverse</strong> - TREND REVERSAL (bool) market trend reversal. After
                  trending, reversal pattern was detected.
                </li>
                <li>
                  <strong>r-vol</strong> - RELATIVE VOLUME (integer) Relative volume in terms of
                  integer percent. It should be an integer like 70 (for 70%) increase in relative
                  volume
                </li>
                <li>
                  <strong>3-bar</strong> - THREE BAR PLAY (boolean) Is the current stock bar right
                  after the 3 bar play?? yes or no.
                </li>
                <li>
                  <strong>trend</strong> - TRENDING (string) market trend. It msut be up, down or
                  side. example: trend = up
                </li>
                <li>
                  <strong>v-pro</strong> - VOLUME PROFILE (boolean) Is the current stock price near
                  a volume profile peak? yes or no.
                </li>
                <li>
                  <strong>volume</strong> - VOLUME (integer) Volume of the stock. Usually in
                  millions without any commas or decimal point. 1000000
                </li>
              </ul>
            </Typography>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}

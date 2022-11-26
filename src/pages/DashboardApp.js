// material
import { Box, Grid, Container } from '@mui/material';
import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import { AppDownloadRealtimes, AppOrderTimeline } from '../components/_dashboard/app';
import Cookie from '../utils/cookies';
import { useUserDispatch, useUserState } from '../components/UserContext';
import {
  getFavorites,
  getSymbols,
  getTop10News,
  getTechniques,
  downloadSchedule
} from '../components/UserContextDownload';

import 'react-modal-video/scss/modal-video.scss';
import ExpertShop from '../components/ExpertShop';

// ----------------------------------------------------------------------

IconBox.propTypes = {
  children: PropTypes.node.isRequired
};

function IconBox({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest
          })
      }}
    >
      {children}
    </Box>
  );
}

export default function DashboardApp() {
  const userDispatch = useUserDispatch();
  const { symbols, techniques } = useUserState();

  const token = Cookie.token();

  return (
    <Page title="Dashboard | TradeSimp">
      <Container maxWidth="xl">
        {!symbols || Object.keys(symbols).length <= 0 ? (
          <IconBox>
            {/* <AppDownloadSymbols dispatch={userDispatch} getSymbols={getSymbols} token={token} /> */}
            <AppDownloadRealtimes
              dispatch={userDispatch}
              callForData={getFavorites}
              token={token}
              name="favorites"
            />
            <AppDownloadRealtimes
              dispatch={userDispatch}
              callForData={getSymbols}
              token={token}
              name="symbols"
            />
            {/* <AppDownloadRealtimes
                dispatch={userDispatch}
                callForData={getRealtimes}
                token={token}
              /> */}
            <AppDownloadRealtimes
              dispatch={userDispatch}
              callForData={getTop10News}
              token={token}
              name="top10news"
            />
            <AppDownloadRealtimes
              dispatch={userDispatch}
              callForData={getTechniques}
              token={token}
              name="techniques"
            />
            <AppDownloadRealtimes
              dispatch={userDispatch}
              callForData={downloadSchedule}
              token={token}
              name="schedule"
            />
          </IconBox>
        ) : null}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            {techniques && techniques.length > 0 && <ExpertShop data={techniques} />}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

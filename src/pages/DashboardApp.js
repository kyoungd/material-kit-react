// material
import { useState } from 'react';
import { Button, Box, Grid, Container, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import {
  AppDownloadFavorites,
  AppDownloadRealtimes,
  AppOrderTimeline
} from '../components/_dashboard/app';
import { CookieGetToken } from '../utils/cookies';
import {
  useUserDispatch,
  getFavorites,
  getSymbols,
  getRealtimes,
  getTop10News,
  getTechniques,
  useUserState
} from '../components/UserContext';
import 'react-modal-video/scss/modal-video.scss';
import ExpertShop from '../components/ExpertShop';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [isForceDownload, setForceDownload] = useState(false);
  const userDispatch = useUserDispatch();
  const { isAuthenticated, symbols, favorites, techniques } = useUserState();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const token = isAuthenticated ? CookieGetToken() : '';

  return (
    <Page title="Dashboard | TradeSimp">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {isForceDownload || Object.keys(favorites).length <= 0 ? (
            <AppDownloadFavorites
              dispatch={userDispatch}
              getFavorites={getFavorites}
              token={token}
            />
          ) : (
            <></>
          )}
          {isForceDownload || Object.keys(symbols).length <= 0 ? (
            <>
              {/* <AppDownloadSymbols dispatch={userDispatch} getSymbols={getSymbols} token={token} /> */}
              <AppDownloadRealtimes
                dispatch={userDispatch}
                callForData={getSymbols}
                token={token}
              />
              <AppDownloadRealtimes
                dispatch={userDispatch}
                callForData={getRealtimes}
                token={token}
              />
              <AppDownloadRealtimes
                dispatch={userDispatch}
                callForData={getTop10News}
                token={token}
              />
              <AppDownloadRealtimes
                dispatch={userDispatch}
                callForData={getTechniques}
                token={token}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
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

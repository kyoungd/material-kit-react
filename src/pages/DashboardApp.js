// material
import { useState } from 'react';
import { Button, Box, Grid, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
// components
import Page from '../components/Page';
import {
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppOrderTimeline
  // AppTasks,
  // AppNewUsers,
  // AppWeeklySales,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite
} from '../components/_dashboard/app';
import { useUserDispatch, getFavorites, getSymbols, useUserState } from '../components/UserContext';
import 'react-modal-video/scss/modal-video.scss';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);
  const userDispatch = useUserDispatch();
  const { isAuthenticated, symbols, favorites } = useUserState();
  const token = isAuthenticated ? localStorage.getItem('id_token') : '';

  return (
    <Page title="Dashboard | TradeSimp">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Welcome to TradeSimp</Typography>
        </Box>
        <Box sx={{ pb: 5 }}>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen1}
            videoId="UUUWIGx3hDE"
            onClose={() => setOpen1(false)}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen1(true)}>
            VIDEO EXPLAINER
          </Button>
          &nbsp;
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen2}
            videoId="UUUWIGx3hDE"
            onClose={() => setOpen2(false)}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen2(true)}>
            VIDEO EXPLAINER
          </Button>
          &nbsp;
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen3}
            videoId="UUUWIGx3hDE"
            onClose={() => setOpen3(false)}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen3(true)}>
            VIDEO EXPLAINER
          </Button>
          &nbsp;
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen4}
            videoId="UUUWIGx3hDE"
            onClose={() => setOpen4(false)}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen4(true)}>
            VIDEO EXPLAINER
          </Button>
        </Box>
        <Box sx={{ pb: 5 }}>
          {Object.keys(favorites).length <= 0 ? (
            <AppItemOrders dispatch={userDispatch} getFavorites={getFavorites} token={token} />
          ) : (
            <></>
          )}
          {Object.keys(symbols).length <= 0 ? (
            <AppBugReports dispatch={userDispatch} getSymbols={getSymbols} token={token} />
          ) : (
            <></>
          )}
          {Object.keys(favorites).length > 0 && Object.keys(symbols).length > 0 ? (
            <Link underline="none" variant="subtitle2" component={RouterLink} to="/dashboard/user">
              FIND STOCKS TO TRADE
            </Link>
          ) : (
            <></>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

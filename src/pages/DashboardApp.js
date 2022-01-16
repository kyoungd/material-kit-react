// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite
} from '../components/_dashboard/app';
import { useUserDispatch, getFavorites, getSymbols, useUserState } from '../components/UserContext';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const userDispatch = useUserDispatch();
  const { isAuthenticated } = useUserState();
  const setIsLoading = (msg) => console.log(msg);
  const setError = (msg) => console.log(msg);
  const token = isAuthenticated ? localStorage.getItem('id_token') : '';

  return (
    <Page title="Dashboard | TradeSimp">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Welcome to TradeSimp</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders
              dispatch={userDispatch}
              getFavorites={getFavorites}
              token={token}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports
              dispatch={userDispatch}
              getSymbols={getSymbols}
              token={token}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

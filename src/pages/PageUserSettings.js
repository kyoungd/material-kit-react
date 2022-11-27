import { Suspense } from 'react';
import {
  Card,
  Stack,
  CircularProgress,
  Container,
  TableContainer,
  Typography
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

// components
import MotionFadeIn from '../components/MotionFadeIn';
import UserSettings from '../components/UserSettings';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Cookie from '../utils/cookies';

// ----------------------------------------------------------------------

export default function PageUserSettings() {
  const url = process.env.REACT_APP_ACCOUNT_SERVICE;
  const token = Cookie.token();

  return (
    <Page title="TRADESIMP">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            'USER SETTINGS'
          </Typography>
        </Stack>

        <MotionFadeIn>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, padding: 5 }}>
                <ErrorBoundary fallback={<div>Oh no</div>}>
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <UserSettings url={url} token={token} />
                  </Suspense>
                </ErrorBoundary>
              </TableContainer>
            </Scrollbar>
          </Card>
        </MotionFadeIn>
      </Container>
    </Page>
  );
}

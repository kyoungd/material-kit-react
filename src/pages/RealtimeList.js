/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Navigate } from 'react-router-dom';
// material
import { Card, Stack, Container, TableContainer, Typography } from '@mui/material';

// components
import RealtimeMessages from '../components/RealtimeMessages';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import Cookie from '../utils/cookies';

// import UserPopup from '../components/UserPopup';

// ----------------------------------------------------------------------

RealtimeList.propTypes = {
  room: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default function RealtimeList({ room, username }) {
  const token = Cookie.token();

  // if (Object.keys(props.symbols).length <= 0) return <Navigate to="/dashboard/app" replace />;

  return (
    <Page title="TRADESIMP">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            INTRADAY
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <RealtimeMessages room={room} username={username} jwt={token} />
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

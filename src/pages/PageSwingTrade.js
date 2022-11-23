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
import MotionFadeIn from '../components/MotionFadeIn';
import SwingTrade from '../components/SwingTrade';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';

// import UserPopup from '../components/UserPopup';

// ----------------------------------------------------------------------

PageDayTrade.propTypes = {
  favorites: PropTypes.object.isRequired,
  symbols: PropTypes.array.isRequired,
  userDispatch: PropTypes.func.isRequired,
  translation: PropTypes.object.isRequired,
  tableHead: PropTypes.array.isRequired,
  explainers: PropTypes.array.isRequired,
  rowContent: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired
};

export default function PageDayTrade(props) {
  // if (Object.keys(props.symbols).length <= 0) return <Navigate to="/dashboard/app" replace />;

  return (
    <Page title="TRADESIMP">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {props.pageType === 'DAILY' ? 'DAILY' : 'INTRADAY'}
          </Typography>
        </Stack>

        <MotionFadeIn>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <SwingTrade
                  symbols={props.symbols}
                  favorites={props.favorites}
                  userDispatch={props.userDispatch}
                  translation={props.translation}
                  tableHead={props.tableHead}
                  explainers={props.explainers}
                  rowContent={props.rowContent}
                  pageType={props.pageType}
                />
              </TableContainer>
            </Scrollbar>
          </Card>
        </MotionFadeIn>
      </Container>
    </Page>
  );
}

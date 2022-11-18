import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
// material
import { Stack, Container, Tooltip, Typography } from '@mui/material';
import axios from 'axios';

// components
import Page from '../components/Page';
import CollapsibleTable from '../components/CollapsibleTable';
import { useUserState } from '../components/UserContext';
import Cookie from '../utils/cookies';

// ----------------------------------------------------------------------

const rowJson = [
  {
    channelId: 1,
    name: 'INTRADAY TRADE',
    summary:
      'This one searches the 15-minute bars to detect a certain pattern.  It flags stocks that are near support-resistance, ABC pattern, Pivot Point and VSA.  There are too much noise in smaller time frames.',
    hours: 'MTWTF 9:30 AM - 10:45 AM EST',
    students: [
      {
        id: 1,
        username: 'cdog107',
        email: 'cdog107@cn.com',
        displayName: null
      },
      {
        id: 2,
        username: 'cdog108',
        email: 'cdog108@cn.com',
        displayName: null
      },
      {
        id: 3,
        username: 'cdog109',
        email: 'cdog109@cn.com',
        displayName: null
      }
    ]
  }
];

function makeBearToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

export default function ExpertChannels() {
  const [channelInfo, setChannelInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const token = Cookie.token();
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/get-expert-subscriptions`;
      const { data } = await axios.get(url, makeBearToken(token));
      const chanData = data.data.attributes.result;
      setChannelInfo(chanData);
      return data;
    })();
  }, [setChannelInfo]);

  return (
    <Page title="TRADESIMP">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Your Channels
          </Typography>
        </Stack>
        <Container maxwidth="lg">
          {channelInfo.length > 0 ? <CollapsibleTable data={channelInfo} /> : <div>loading...</div>}
        </Container>
      </Container>
    </Page>
  );
}

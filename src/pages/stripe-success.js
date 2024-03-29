import React, { useEffect } from 'react';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import Cookie from '../utils/cookies';

function StripeSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      setTimeout(() => {
        Cookie.signOut(false);
        navigate('/dashboard/app', { replace: true });
      }, 1000);
    };

    getSubscriptionStatus();
  }, [navigate]);

  return (
    <Page title="TRADESIMP">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            PAYMENT PROCESSING
          </Typography>
        </Stack>

        <Card>
          <SyncOutlinedIcon sx={{ fontSize: 50 }} />
        </Card>
      </Container>
    </Page>
  );
}

export default StripeSuccess;

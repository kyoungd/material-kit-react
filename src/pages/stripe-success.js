import React, { useEffect } from 'react';
import axios from 'axios';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Container, Typography } from '@mui/material';
import Page from '../components/Page';

const StripeSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      setTimeout(() => {
        navigate('/dashboard/account');
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
};

export default StripeSuccess;

import React from 'react';
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import { Card, Stack, Container, Typography } from '@mui/material';
import Page from '../components/Page';

const StripeSuccess = () => (
  <Page title="TRADESIMP">
    <Container maxWidth="lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          PAYMENT PROCESSING
        </Typography>
      </Stack>

      <Card>
        <NewReleasesTwoToneIcon sx={{ fontSize: 50 }} />
      </Card>
    </Container>
  </Page>
);

export default StripeSuccess;

import * as React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Avatar, Button, Box, Container, Typography, Divider, Grid } from '@mui/material';
import Page from '../components/Page';
import SkillCardGrid from '../components/experts/SkillCardGrid';
import PaymentPopup from './PaymentPopup';
import { useUserState } from '../components/UserContext';
import Cookie from '../utils/cookies';

export default function Expert() {
  const location = useLocation();
  const { id } = location.state;
  const { techniques } = useUserState();

  const token = Cookie.token();

  const EXPERTS = techniques;

  const techn = EXPERTS.find((user) => user.id === id);
  const expert = techn.features;
  const isSubscribed = expert.sales.access === 'paid' && expert.sales.status === 'active';
  const isFree = expert.sales.access === 'free';
  const isOnSales = expert.sales.priceSale > 0;
  const price = isOnSales ? expert.sales.priceSale : expert.sales.price;

  // const expert = activeExperts.find((expert) => expert.id === id);
  return (
    <Page title="EXPERT">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          EXPERT
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ minWidth: 160 }} mx={{ minWidth: 240 }}>
              <Avatar
                alt="Expert Photo"
                src={expert.person.image}
                sx={{ width: 160, height: 160 }}
                mx={{ width: 240, height: 240 }}
              />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {expert.person.name}
                </Typography>
                <Typography paragrah sx={{ mb: 2 }}>
                  {expert.person.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {isFree && 'Free'}
                  {!isSubscribed && !isFree && `$${price}`}
                </Typography>
                <Typography paragrah sx={{ mb: 2 }}>
                  {isSubscribed && (
                    <Button variant="outlined" color="primary">
                      Subscribed
                    </Button>
                  )}
                  {isFree && (
                    <Button variant="outlined" color="primary">
                      Free
                    </Button>
                  )}
                  {!isSubscribed && !isFree && (
                    <PaymentPopup priceId={techn.stripePriceId} token={token} />
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: 2, width: '100%' }}>
          <Divider>SKILLS</Divider>
        </Box>
        <SkillCardGrid skills={expert.data} />
      </Container>
    </Page>
  );
}

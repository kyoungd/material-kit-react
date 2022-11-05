import React, { useState, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Stack, Container, Typography } from '@mui/material';
import { getSubscriptions, getSubscriptionManagement } from '../utils/stripe-subscriptions';
import Page from '../components/Page';

const Account = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getStripeSubscriptions = async () => {
      const result = await getSubscriptions();
      setSubscriptions(result);
      // const { data } = await axios.get("/subscriptions");
      // console.log("subs => ", data);
      // setSubscriptions(data.data);
    };

    getStripeSubscriptions();
  }, []);

  const manageSubscriptions = async () => {
    const url = await getSubscriptionManagement();
    window.open(url);
  };

  return (
    <Page title="TRADESIMP">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
          <Typography variant="h4" gutterBottom>
            ACCOUNT
          </Typography>
        </Stack>

        <Card>
          {subscriptions &&
            subscriptions.map((sub) => (
              <div key={sub.id}>
                <section>
                  <hr />
                  <h4 className="fw-bold">{sub.plan.nickname}</h4>
                  <h5>
                    {(sub.plan.amount / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: sub.plan.currency
                    })}
                  </h5>
                  <p>Status: {sub.status}</p>
                  <p>Card last 4 digit: {sub.default_payment_method.card.last4}</p>
                  <p>
                    Current period end:{' '}
                    {moment(sub.current_period_end * 1000)
                      .format('dddd, MMMM Do YYYY h:mm:ss a')
                      .toString()}
                  </p>
                  <Button
                    onClick={() => navigate(`/${sub.plan.nickname.toLowerCase()}`)}
                    variant="contained"
                  >
                    Access
                  </Button>{' '}
                  <Button
                    onClick={manageSubscriptions}
                    className="btn btn-outline-warning"
                    variant="contained"
                  >
                    Manage Subscription
                  </Button>
                </section>
              </div>
            ))}
        </Card>
      </Container>
    </Page>
  );
};

export default Account;

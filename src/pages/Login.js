import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Button, Card, Stack, Link, Container, Typography } from '@mui/material';
import ModalVideo from 'react-modal-video';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

import 'react-modal-video/scss/modal-video.scss';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  return (
    <RootStyle title="Login | TradeSimp">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome to TradeSimp.
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              TradeSimp
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {' '}
              FIND MORE QUALITY TRADES WITH EASE.
            </Typography>
            <Typography sx={{ color: 'text.secondary', padding: 2 }}>
              {' '}
              <br />
              Search stock patterns as well as technical indicators.
              <br />
              You can register or use this account to test our app.
              <br />
              guest@tradesimp.com <br />
              password
            </Typography>
            <Typography sx={{ color: 'text.secondary', padding: 1 }}>
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen1}
                videoId="9Pc226w3HFM"
                onClose={() => setOpen1(false)}
              />
              <Button variant="contained" color="primary" onClick={() => setOpen1(true)}>
                VIDEO INTRODUCTION
              </Button>
            </Typography>
            <Typography sx={{ color: 'text.secondary', padding: 1 }}>
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen2}
                videoId="lqAEJIjPB38"
                onClose={() => setOpen2(false)}
              />
              <Button variant="contained" color="primary" onClick={() => setOpen2(true)}>
                DEMONSTRATION 1
              </Button>
            </Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

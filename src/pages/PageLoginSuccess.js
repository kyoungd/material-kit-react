import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { useUserState } from '../components/UserContext';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function PageLoginSuccess() {
  const { isAuthenticated } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PageLoginSuccess.useEffect');
    if (isAuthenticated) {
      navigate('/dashboard/app');
    }
    return () => {
      console.log('useEffect - return');
    };
  }, [navigate, isAuthenticated]);

  return (
    <RootStyle title="Page | Login">
      <Container>LOGIN SUCCESS</Container>
    </RootStyle>
  );
}

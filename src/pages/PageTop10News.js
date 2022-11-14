import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
// material
import { Stack, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import NewsTable from '../components/stockchart/components/NewsTable';
import { useUserState } from '../components/UserContext';

// ----------------------------------------------------------------------

PageTop10News.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default function PageTop10News(props) {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    setTop10(props.newsList);
  }, [props]);

  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Page title="TRADESIMP">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Best and Worst 5 News
          </Typography>
        </Stack>
        <Container maxwidth="lg">
          <NewsTable newsList={top10} includeSymbols />
        </Container>
      </Container>
    </Page>
  );
}

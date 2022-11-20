import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material
import { Card, Container, Stack, TableContainer, Typography } from '@mui/material';
import Scrollbar from '../components/Scrollbar';

// components
import Page from '../components/Page';
import NewsTable from '../components/stockchart/components/NewsTable';

// ----------------------------------------------------------------------

PageTop10News.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default function PageTop10News(props) {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    setTop10(props.newsList);
  }, [props]);

  return (
    <Page title="TRADESIMP">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Best and Worst 5 News
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <NewsTable newsList={top10} includeSymbols />
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

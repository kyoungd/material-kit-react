import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [
  {
    title: 'Near a major support resistance and close < 50 and fibonachi retrace ',
    description: 'level = yes and price < 50 and fib = yes',
    image: mockImgCover(1),
    postedAt: faker.date.soon()
  },
  {
    title: 'close > 100 and close < 200 and near a major support resistance and 3 bar retrace',
    description: 'price > 100 and price < 200 and level = yes and 3-bar = yes',
    image: mockImgCover(2),
    postedAt: faker.date.soon()
  },
  {
    title: 'close between 100 and 200 and average ATR > $5 and near a major support resistance',
    description: 'price > 100 and price < 200 and avgatr > 5 and level = yes',
    image: mockImgCover(3),
    postedAt: faker.date.soon()
  },
  {
    title:
      'close between 100 and 200, major support resistance, relative volume up 50% and fibonachi retrace',
    description: 'price > 100 and price < 200 and level = yes and relvol > 50 and fib = yes',
    image: mockImgCover(4),
    postedAt: faker.date.soon()
  },
  {
    title: 'close between 20 and 100, near a major volume profile lines and 3-bar',
    description: 'price > 20 and price < 100 and avgatr > 5 and vpros = yes and 3-bar = yes',
    image: mockImgCover(5),
    postedAt: faker.date.soon()
  }
];

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  return (
    <Card>
      <CardHeader title="Query Examples" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {NEWS.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

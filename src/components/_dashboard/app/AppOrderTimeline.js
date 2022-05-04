// import faker from 'faker';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Unit testing with live data',
    time: '2022-05-01T08:00:00.000Z',
    type: 'order7'
  },
  {
    title: 'Real-time Volume Analysis',
    time: '2022-04-25T08:00:00.000Z',
    type: 'order8'
  },
  {
    title: 'Real-time ABC Pattern',
    time: '2022-04-10T08:00:00.000Z',
    type: 'order8'
  },
  {
    title: 'Real-time Supply Demand Zone',
    time: '2022-04-19T08:00:00.000Z',
    type: 'order9'
  },
  {
    title: 'Google, Facebook, Twitter Sign-in added',
    time: '2022-02-28T08:00:00.000Z',
    type: 'order2'
  },
  {
    title: 'Data overflow error fixed',
    time: '2022-02-26T08:00:00.000Z',
    type: 'order3'
  },
  {
    title: 'Alpha Release (Free)',
    time: '2022-01-01T08:00:00.000Z',
    type: 'order4'
  },
  {
    title: 'First Online',
    time: '2021-12-19T08:00:00.000Z',
    type: 'order5'
  }
];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Release Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

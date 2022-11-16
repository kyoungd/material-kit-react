import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// material
import { Stack, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import MonthlyCalendar from '../components/monthlycalendar';
import { useUserState } from '../components/UserContext';

// ----------------------------------------------------------------------

export default function PageScheduleCalendar() {
  const [startDate, setStartDate] = useState('');
  const [events, setEvents] = useState({});

  const { schedules } = useUserState();

  useEffect(() => {
    const getStartDate = (date = new Date()) => {
      const previousMonday = new Date();
      previousMonday.setDate(date.getDate() - date.getDay());
      return previousMonday.toISOString().split('T')[0];
    };
    const getEvents = (events) => {
      const sched = events.data.map((event) => ({
        id: event.id,
        text: `${event.start.split(' ')[1]} - ${event.end.split(' ')[1]} ${event.title}`,
        start: event.start.split(' ')[0],
        end: event.end.split(' ')[0],
        backColor: '#d5663e'
      }));
      return sched;
    };
    const startDate = getStartDate();
    const events = getEvents(schedules);

    // setStartDate(startDate);
    setStartDate(startDate);
    setEvents(events.slice(0, 14));
    // setStartDate('2022-11-08');
    // setEvents([
    //   {
    //     id: 1,
    //     text: '9:30AM - 11:00AM',
    //     start: '2022-11-08',
    //     end: '2022-11-09',
    //     backColor: '#d5663e'
    //   },
    //   {
    //     id: 2,
    //     text: 'Event 2',
    //     start: '2022-11-08',
    //     end: '2022-11-09',
    //     backColor: '#ecb823'
    //   },
    //   {
    //     id: 3,
    //     text: 'Event 3',
    //     start: '2022-11-08',
    //     end: '2022-11-08',
    //     backColor: '#6aa84f'
    //   },
    //   {
    //     id: 4,
    //     text: 'Event 4',
    //     start: '2022-11-15',
    //     end: '2022-11-16',
    //     backColor: '#3d85c6'
    //   },
    //   {
    //     id: 5,
    //     text: 'Event 5',
    //     start: '2022-11-15',
    //     end: '2022-11-16'
    //   }
    // ]);
  }, [schedules]);

  console.log(startDate);
  console.log(events);
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
          {startDate && events && <MonthlyCalendar startDate={startDate} events={events} />}
        </Container>
      </Container>
    </Page>
  );
}

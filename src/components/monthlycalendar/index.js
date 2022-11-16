import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DayPilot, DayPilotMonth } from '@daypilot/daypilot-lite-react';
import './MonthlyStyles.css';
import './icons/style.css';

MonthlyCalendar.propTypes = {
  startDate: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

function MonthlyCalendar(props) {
  const [schedules, setSchedules] = useState({});

  const calendarRef = useRef();

  useEffect(() => {
    const state = {
      eventHeight: 30,
      headerHeight: 30,
      cellHeaderHeight: 25,
      onBeforeEventRender: (args) => {
        args.data.borderColor = 'darker';
        if (args.data.backColor) {
          args.data.barColor = DayPilot.ColorUtil.darker(args.data.backColor, -1);
        }
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: 'Delete',
            onClick: (args) => {
              const e = args.source;
              const cal = calendarRef.current.control;
              cal.events.remove(e);
            }
          },
          {
            text: '-'
          },
          {
            text: 'Blue',
            icon: 'icon icon-blue',
            color: '#3d85c6',
            onClick: (args) => updateColor(args.source, args.item.color)
          },
          {
            text: 'Green',
            icon: 'icon icon-green',
            color: '#6aa84f',
            onClick: (args) => updateColor(args.source, args.item.color)
          },
          {
            text: 'Yellow',
            icon: 'icon icon-yellow',
            color: '#ecb823',
            onClick: (args) => updateColor(args.source, args.item.color)
          },
          {
            text: 'Red',
            icon: 'icon icon-red',
            color: '#d5663e',
            onClick: (args) => updateColor(args.source, args.item.color)
          },
          {
            text: 'Auto',
            color: null,
            onClick: (args) => updateColor(args.source, args.item.color)
          }
        ]
      }),
      onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');

        const cal = calendarRef.current.control;
        cal.clearSelection();
        if (!modal.result) {
          return;
        }
        cal.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      }
    };

    setSchedules(state);

    // load event data
    setSchedules((prevState) => ({
      ...prevState,
      startDate: props.startDate,
      events: props.events
    }));
  }, [props]);

  // eslint-disable-next-line react/sort-comp
  const updateColor = (e, color) => {
    e.data.backColor = color;
    const cal = calendarRef.current.control;
    cal.events.update(e);
  };

  return (
    <div>
      <DayPilotMonth {...schedules} ref={calendarRef} />
    </div>
  );
}

export default MonthlyCalendar;

/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment_timezone from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useUserContext from '../../hooks/useUserContext';

moment_timezone.tz.setDefault('Atlantic/Madeira');
const localizer = momentLocalizer(moment_timezone);

const PlaydateCalendar = ({
  openEditModal,
  setEditPlaydateModal,
  closeEditModal,
  openAddModal,
  setAddPlaydateModal,
  closeAddModal,
  setStartTime,
  setEndTime
}) => {
  const [showPlaydateModal, setShowPlaydateModal] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  const { playdates /*, setPlaydates, handleSetPlaydates*/ } = useUserContext();

  useEffect(() => {
    setEventsData(playdates);
  }, [playdates]);

  const location = useLocation();
  const background = location.state && location.state.background;

  const handleAddNewPlaydate = ({ start, end }) => {
    // console.log(start);
    // console.log(end);
    openAddModal();
    setStartTime(start);
    setEndTime(end);

    // const title = window.prompt('New Event Name');
    // if (title) {
    //   setEventsData((prev) => [
    //     ...prev,
    //     {
    //       start: start,
    //       end: end,
    //       title: title
    //     }
    //   ]);
    // }
  };

  return (
    <div>
      {/* <Link to="/editplaydate" state={{ background: location }}>
        Edit Playdate Details
      </Link> */}
      <button type="button" onClick={openAddModal}>
        Add Playdate
      </button>
      <Calendar
        views={['day', 'agenda', 'week', 'month']}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        step="30"
        style={{ height: '90vh', width: '100vw' }}
        events={eventsData}
        onSelectEvent={openEditModal}
        onSelectSlot={handleAddNewPlaydate}
      />
    </div>
  );
};

export default PlaydateCalendar;

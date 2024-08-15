import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Calendario.css";
import Nav from "./Nav";

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: "Cita 1",
      start: new Date(2023, 5, 20, 10, 0), // 20th June 2023, 10:00 AM
      end: new Date(2023, 5, 20, 11, 0), // 20th June 2023, 11:00 AM
    },
    {
      title: "Cita 2",
      start: new Date(2023, 5, 21, 12, 0), // 21st June 2023, 12:00 PM
      end: new Date(2023, 5, 21, 13, 0), // 21st June 2023, 1:00 PM
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Nombre de la cita:");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  return (
    <div className="calend-body">
      <Nav />
      <div className="calend-header">
        <div style={{ height: "400px", width: "1100px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ height: "100vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendario;

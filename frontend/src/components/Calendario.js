import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost/sisDenatal/backend2/public/index.php?action=getcalendario");
      const data = await response.json();
      setEvents(
        data.map((event) => ({
          title: event.titulo,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      );
    };
    fetchEvents();
  }, []);



  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt("Nombre de la cita:");
    if (title) {
      const response = await fetch("http://localhost/sisDenatal/backend2/public/index.php?action=addcalendario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          start,
          end,
        }),
      });
      const data = await response.json();
      if (data.message === "exito") {
        setEvents([...events, { title, start, end }]);
      }
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

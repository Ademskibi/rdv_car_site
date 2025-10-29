import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigRDVCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rdv")
      .then((res) => {
        console.log("🧭 RDV data:", res.data);

        // ✅ Filter only RDVs with Type === true
        const confirmedRDVs = res.data.filter((rdv) => rdv.Type === true);

        // ✅ Convert to calendar events
        const formattedEvents = confirmedRDVs.map((rdv) => ({
          title: `${rdv.First_Name} ${rdv.Last_Name} - ${rdv.Poste}`,
          start: new Date(rdv.Date_RDV),
          end: new Date(
            new Date(rdv.Date_RDV).setHours(
              new Date(rdv.Date_RDV).getHours() + 1
            )
          ),
          allDay: false,
        }));

        console.log("📅 Confirmed Events:", formattedEvents);
        setEvents(formattedEvents);
      })
      .catch((err) => console.error("❌ Error fetching RDV:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
        Mes Rendez-vous confirmés
      </h1>
      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={["month", "week", "day"]}
          messages={{
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            today: "Aujourd’hui",
            previous: "Précédent",
            next: "Suivant",
          }}
          eventPropGetter={(event) => {
            let backgroundColor = "#2E8B57"; // default green
            if (event.title.includes("Fast service")) backgroundColor = "#e63946";
            if (event.title.includes("Diagnostics")) backgroundColor = "#457b9d";
            if (event.title.includes("Engine")) backgroundColor = "#f4a261";
            return { style: { backgroundColor, color: "white" } };
          }}
        />
      </div>
    </div>
  );
};

export default BigRDVCalendar;

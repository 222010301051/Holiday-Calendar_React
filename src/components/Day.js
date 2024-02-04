import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function Day({ day, rowIdx, events }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    dispatchCalEvent,
    savedEvents,
    labels,
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log(events);
    const eventsForDay = events.filter((evt) => {
      if (dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")) {
        if (
          labels
            .map((l) => {
              if (l.checked) {
                return l.label;
              }
            })
            .includes(evt.label)
        ) {
          return true;
        }
      }
      return false;
    });
    setDayEvents(eventsForDay);
  }, [events, day, labels]);
  useEffect(() => {
    const eventsForDay = savedEvents.filter(
      (evt) =>
        labels
          .map((l) => {
            if (l.checked) {
              return l.label;
            }
          })
          .includes(evt.label) &&
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents((prev) => [...prev, ...eventsForDay]);
  }, [savedEvents, day, labels]);
  // useEffect(() => {
  //   // Ensure that events are added only once
  //   if (dayEvents.length > 0) {
  //     dispatchCalEvent({ type: "push", payload: dayEvents });
  //   }
  // }, [dayEvents, dispatchCalEvent]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  // useEffect(() => {
  //   // Ensure that events are added only once
  //   dayEvents.forEach((evt) => {
  //     dispatchCalEvent({ type: "push", payload: evt });
  //   });
  // }, [dayEvents, dispatchCalEvent]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

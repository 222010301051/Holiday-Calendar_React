// Month.js
import React, { useContext } from "react";
import Day from "./Day";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import dayjs from "dayjs";

export default function Month(props) {
  const { monthIndex, selectedYear, filteredEvents } =
    useContext(GlobalContext);
  const monthMatrix = getMonth(monthIndex, selectedYear);
  const { events } = props;
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {monthMatrix.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} events={events} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

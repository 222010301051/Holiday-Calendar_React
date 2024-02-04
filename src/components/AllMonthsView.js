import React, { useContext } from "react";
import { getMonth } from "../util";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

const AllMonthsView = ({ selectedYear, events }) => {
  const { setDaySelected, setShowEventModal, setSelectedEvent } =
    useContext(GlobalContext);

  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    return getMonth(monthIndex, selectedYear);
  });

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {months.map((month, monthIndex) => (
        <React.Fragment key={monthIndex}>
          <div className="col-span-7 mb-4">
            {/* Header for each month */}
            <h2 className="text-center text-lg font-bold">
              {dayjs(new Date(selectedYear, monthIndex, 1)).format("MMMM YYYY")}
            </h2>
          </div>
          {month.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => {
                const dayEvents = events.filter(
                  (evt) =>
                    dayjs(evt.day).format("YYYY-MM-DD") ===
                    day.format("YYYY-MM-DD")
                );

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 flex flex-col"
                  >
                    <header className="flex flex-col items-center">
                      {i === 0 && (
                        <p className="text-sm mt-1">
                          {day.format("ddd").toUpperCase()}
                        </p>
                      )}
                      <p className={`text-sm p-1 my-1 text-center`}>
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
              })}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AllMonthsView;

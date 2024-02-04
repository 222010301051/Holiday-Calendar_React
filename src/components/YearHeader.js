import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    viewMonth,
    viewYear,
    setViewMonth,
    setViewYear,
  } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  function handleToggleMonth() {
    setViewMonth(true);
    setViewYear(false);
  }

  function handleToggleYear() {
    setViewMonth(false);
    setViewYear(true);
  }

  return (
    <header className="px-4 py-2 items-center justify-between flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Holiday Calendar
      </h1>
      <h2 className="text-xl text-gray-500 font-bold ml-auto mx-auto">
        Year Calendar
      </h2>
      <div className="ml-auto flex items-center">
        <button
          onClick={handleToggleMonth}
          className="border rounded py-2 px-4 mr-1"
        >
          Month
        </button>
        <button onClick={handleToggleYear} className="border rounded py-2 px-4">
          Year
        </button>
      </div>
    </header>
  );
}

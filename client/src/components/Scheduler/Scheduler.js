/* eslint-disable no-unused-vars */
import React from "react";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import "./Scheduler.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const history = createHistory();

function Scheduler({ calendarStore, isDoctor }) {
  console.log("Calendar store variable ", calendarStore);
  return (
    <div>
      <HomePage isDoctor={isDoctor} calendarStore={calendarStore} />
    </div>
  );
}

export default Scheduler;
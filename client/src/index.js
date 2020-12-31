/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CalendarStore } from "./components/Scheduler/store";
const calendarStore = new CalendarStore();

ReactDOM.render(
  <React.Fragment>
    <App calendarStore={calendarStore} />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

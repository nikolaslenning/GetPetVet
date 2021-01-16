/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CalendarStore } from "./components/Scheduler/store";
import './index.css';

const calendarStore = new CalendarStore();

ReactDOM.render(
  <React.Fragment>
    <App calendarStore={calendarStore} />
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();

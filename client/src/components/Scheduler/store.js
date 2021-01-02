import { observable, action, makeObservable } from "mobx";

class CalendarStore {
    calendarEvents = [];

    setCalendarEvents(calendarEvents) {
      this.calendarEvents = calendarEvents;
    }
    constructor() {
      makeObservable(this, {
        calendarEvents: observable,
        setCalendarEvents: action
      });
    }
  }
  // CalendarStore = makeObservable(CalendarStore, {
  //     calendarEvents: observable,
  //     setCalendarEvents: action
  // });
export { CalendarStore };
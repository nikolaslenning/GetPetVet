import { observable, action, makeObservable } from "mobx";

class CalendarStore {
  calendarEvents = [];

  setCalendarEvents(calendarEvents) {
    this.calendarEvents = calendarEvents.map(d => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end)
      };
    });
  }
  constructor() {
    makeObservable(this, {
      calendarEvents: observable,
      setCalendarEvents: action
    });
  }
}

export { CalendarStore };
import { observable, action, makeObservable } from "mobx";

class CalendarStore {
  calendarEvents = [];

  setCalendarEvents(calendarEvents) {
    this.calendarEvents = calendarEvents;
  }
}

CalendarStore = makeObservable(CalendarStore, {
  calendarEvents: observable,
  setCalendarEvents: action
});

export { CalendarStore };
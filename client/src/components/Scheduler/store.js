import { makeObservable, observable, action, } from "mobx";

class CalendarStore {
    calendarEvents = [];

    CalendarStore = makeObservable(CalendarStore, {
        calendarEvents: observable,
        setCalendarEvents: action
    });

    setCalendarEvents(calendarEvents) {
        this.calendarEvents = calendarEvents;
    }
}
export { CalendarStore };
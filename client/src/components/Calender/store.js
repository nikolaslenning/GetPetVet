import { makeObservable, observable, action } from "mobx";

class CalendarStore {
    calendarEvents = [];

    constructor() {
        makeObservable(this);
    }

    setCalendarEvents(calendarEvents) {
        this.calendarEvents = calendarEvents;
    }
}

CalendarStore = makeObservable(this, {
    calendarEvents: observable,
    setCalendarEvents: action
});

export { CalendarStore };
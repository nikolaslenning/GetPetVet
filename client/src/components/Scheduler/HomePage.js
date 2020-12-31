/* eslint-disable no-unused-vars */
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalendarForm";
import { observer } from "mobx-react";
import { getCalendar } from "./requests";

const localizer = momentLocalizer(moment);

function HomePage({ calendarStore }) {

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);

  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const getCalendarEvents = async () => {
    const response = await getCalendar();
    const evs = response.data.map(d => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end)
      };
    });

    calendarStore.setCalendarEvents(evs);
    setInitialized(true);
  };

  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false };
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };

  const handleSelectEvent = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, title, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, start, end, allDay };
    setCalendarEvent(data);
  };

  React.useEffect(() => {
    if (!initialized) {
      getCalendarEvents();
    }
  });

  return (

    <div className="page">

      <Modal show={showAddModal} onHide={hideModals}>

        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={false}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={hideModals}>

        <Modal.Header closeButton>
          <Modal.Title>Edit Calendar Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </Modal.Body>
      </Modal>

      <Calendar
        localizer={localizer}
        events={calendarStore.calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: "70vh" }}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
export default observer(HomePage);
/* eslint-disable no-unused-vars */
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar
} from "./requests";
import { observer } from "mobx-react";
const buttonStyle = { marginRight: 10 };

function CalendarForm({ calendarStore, calendarEvent, onCancel, edit }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);
  const [docID, setDocId] = React.useState(null);

  React.useEffect(() => {
    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent._id);
    setDocId(calendarEvent.docID);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent._id,
    calendarEvent.docID
  ]);

  const handleSubmit = async ev => {
    console.log(" CalenderForm ln 35");
    console.log(ev);
    ev.preventDefault();
    if (!title || !start || !end) {
      return;
    }

    if (+start > +end) {
      alert("Start date must be earlier than end date");
      return;
    }

    const data = { id, docID, title, start, end };
    console.log("data calendarForm ln 49");
    console.log(data);

    if (!edit) {
      await addCalendar(data);
    } else {
      await editCalendar(data);
    }

    const response = await getCalendar();

    // const evs = [...response.data.data].map(d => {
    //   return {
    //     ...d,
    //     start: new Date(d.start),
    //     end: new Date(d.end)
    //   };
    // });

    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
  };

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleTitleChange = ev => setTitle(ev.target.value);
  const handleDocIDChange = ev => setDocId(ev.target.value);

  const addCalendarEvent = async () => {
    // console.log(calendarEvent);
    await addCalendar(calendarEvent);
    const response = await getCalendar();
    // console.log(response.data.data);

    // const evs = [...response.data.data].map(d => {
    //   return {
    //     ...d,
    //     start: new Date(d.start),
    //     end: new Date(d.end)
    //   };
    // });
    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
    getCalendar();
  };

  const deleteCalendarEvent = async () => {
    // console.log(calendarEvent._id);
    await deleteCalendar(calendarEvent._id);
    const response = await getCalendar();
    // console.log(response);
    // console.log(response.data);
    // console.log(response.data.data);
    // console.log(response.data.data._id);

    // const evs = [...response.data.data].map(d => {
    //   return {
    //     ...d,
    //     start: new Date(d.start),
    //     end: new Date(d.end)
    //   };
    // });
    // console.log(evs);
    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
    getCalendar();

  };

  const editCalendarEvent = async () => {
    // console.log(calendarEvent);
    await editCalendar(calendarEvent._id);
    const response = await getCalendar();
    //console.log(evs);

    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
    getCalendar();
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={title || ""}
            onChange={handleTitleChange}
            isInvalid={!title}
          />
          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="docID">
          <Form.Label>DocID</Form.Label>
          <Form.Control
            type="number"
            name="docID"
            placeholder="DocID"
            value={docID || ""}
            onChange={handleDocIDChange}
            isInvalid={!docID}
          />
          <Form.Control.Feedback type="invalid">{!docID}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Start</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={start}
            onChange={handleStartChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="end">
          <Form.Label>End</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={end}
            onChange={handleEndChange}
          />
        </Form.Group>
      </Form.Row>
      {!edit ? (
        <Button type="submit" style={buttonStyle} onClick={addCalendarEvent}>
          Save
        </Button>) : (
          <Button type="submit" style={buttonStyle} onClick={editCalendarEvent}>
            Edit
          </Button>
        )}
      <Button type="button" style={buttonStyle} onClick={deleteCalendarEvent}>
        Delete
      </Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}
export default observer(CalendarForm);
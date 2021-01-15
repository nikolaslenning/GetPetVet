/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {
  addCalendar,
  editCalendar,
  getCalendar,
  getDocCalendar,
  deleteCalendar
} from "./requests";
import { observer } from "mobx-react";
const buttonStyle = { marginRight: 10 };

function CalendarForm({ calendarStore, calendarEvent, onCancel, edit, isDoctor }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);
  const [docID, setDocId] = React.useState(null);
  const [docList, setDocList] = React.useState([]);
  const docElement = React.useRef(null);

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

  React.useEffect(() => {
    axios.get('/doctors')
      .then(res => {
        console.log("res.data");
        console.log(res);
        console.log(res.data.data);
        setDocList(res.data.data);

      })
      .catch(err => console.log(err));
  }, []);

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

    let response = null;
    console.log({ isDoctor });
    if (!isDoctor) {
      response = await getCalendar();
    } else {
      console.log("HIt GetDocCalendar");
      response = await getDocCalendar();
    }

    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
  };

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleTitleChange = ev => setTitle(ev.target.value);
  const handleDocIDChange = ev => { console.log(docElement.current.value); setDocId(docElement.current.value); };

  const addCalendarEvent = async () => {
    // console.log(calendarEvent);
    await addCalendar(calendarEvent);
    const response = await getCalendar();

    calendarStore.setCalendarEvents(response.data.data);
    onCancel();
    getCalendar();
  };

  const deleteCalendarEvent = async () => {
    // console.log(calendarEvent._id);
    await deleteCalendar(calendarEvent._id);
    const response = await getCalendar();

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
          <Form.Label>Select Doctor</Form.Label>
          <Form.Control as="select" custom type="number"
            name="docID"
            placeholder="Select Doctor"
            value={docID || ""}
            onChange={handleDocIDChange}
            ref={docElement}
            isInvalid={!docID}>
            <option >Select your Veterinarian</option>
            {docList.map(doctor =>
              <option key={doctor._id} value={doctor._id}>Dr. {doctor.firstName} {doctor.lastName}</option>

            )}
          </Form.Control>

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
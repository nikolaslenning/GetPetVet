/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
const { userJoin, getRoomUsers, getUser, userLeave } = require('../../utils/users');
const socket = io();

function VideoChat({ email, firstName, lastName, isDoctor }) {
  const [mail, setMail] = React.useState("");
  // const [firstName, setFirstName] = React.useState("");
  // const [lastName, setLastName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [docList, setDocList] = React.useState([]);
  const [facility, setFacility] = React.useState(null);
  const docElement = React.useRef(null);

  React.useEffect(() => {
    axios.get('/doctors')
      .then(res => {
        // console.log("res.data");
        // console.log(res);
        // console.log(res.data.data);
        setDocList(res.data.data);

      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { firstName, lastName, facility};
    console.log("HIT DATA IN VIDEOCHAT data");
    console.log(data);
    axios.post("api/videochat", data );
    socket.emit("join-room", ({firstName, userName, facility}));
  };

  const handleFacilityChange = ev => { console.log(docElement.current.value); setFacility(docElement.current.value); };

  return (

    <section className="hero light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column  is-5-tablet is-4-desktop is-3-widescreen has-text-centered">
              <span className="icon is-large">
                <i className="fa fa-comments"></i>
              </span>
              <h2 className="title is-3"> VIDEO CHAT ROOMS</h2>
            </div>
          </div>
          <div className="columns is-centered">

            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="/videochat" method="POST" className="box">
                <div className="field">
                  <label className="label">Username:</label>
                  {/* <h1>{firstName}</h1> */}
                  <div className="control has-icons-left">
                    <p name="username">{firstName} {lastName}</p>
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Select Veterinarian</label>
                  <p className="control has-icons-left">
                    <select name="room" className="roomselect" placeholder="Room Name"
                    value={facility|| ""}
                    onChange={handleFacilityChange}
                    ref={docElement} >
                    <option >Select your Veterinarian</option>
                      {docList.map(doctor =>
                        <option key={doctor._id} value={doctor.facility}>Dr. {doctor.firstName} {doctor.lastName} at {doctor.facility}</option>

                      )}
                      {/* <option value="Kevorkian">Kevorkian</option>
                      <option value="Frank">Frankie</option> */}
                    </select>
                    {/* <!-- <input type="text" placeholder="Room Name" className="input" name="room" required> --></input> */}
                    <span className="icon is-small is-left">
                      <i className="fas fa-comment-alt"></i>
                    </span>
                  </p>
                </div>
                <div className="field ">
                  <button onClick={handleSubmit} className="button is-link">
                    <span className="icon is-small is-left mr-1">
                      <i className="fas fa-person-booth"></i>
                    </span>
                      JOIN
                     </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoChat;
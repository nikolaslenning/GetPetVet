/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import Peer from "simple-peer";
import Stream from "./Stream.js";

function VideoChat({ email, firstName, lastName, isDoctor }) {
  const [mail, setMail] = useState("");
  // const [firstName, setFirstName] = React.useState("");
  // const [lastName, setLastName] = React.useState("");
  const [userName, setUserName] = useState("");
  const [docList, setDocList] = useState([]);
  const [facility, setFacility] = useState(null);
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [initiatorName, setInitiatorName] = useState(null);
  const docElement = useRef(null);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const peer = useRef(new Peer({
    initiator: true,
    trickle: false,
    stream: stream,
  }));

  // Get username and room from URL
  // const { userName, room } = Qs.parse(location.search, {
  //   ignoreQueryPrefix: true
  // });

  // get doctors for docList
  useEffect(() => {
    axios.get('/doctors')
      .then(res => {
        // console.log("res.data");
        // console.log(res);
        // console.log(res.data.data);
        setDocList(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  // establish connection from client to server
  useEffect(() => {
    socket.current = io.connect("/");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });
    socket.current.on("hey", (data) => {
      console.log(data);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      // callPeer(data.);
    });
  }, []);

  // call peer/ go to doctor
  function callPeer(id) {
    // calls peer id
    peer.current.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data });
    });
    peer.current.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });
    // set peer to true to accept call
    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.current.signal(signal);
    });
  }

  // accept call / go to user
  function acceptCall() {
    setCallAccepted(true);
    peer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    // called peer
    peer.current.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });
    peer.current.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.current.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video className='video' playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video className='video' playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{userName} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { firstName, lastName, facility };
    console.log("HIT DATA IN VIDEOCHAT data");
    console.log(data);
    console.log("SOCKET");
    console.log(socket);
    socket.current.emit("join-room", ({ firstName, userName, facility }));
    console.log("SOCKET BELOW");
    console.log(socket);
    console.log(socket.current.id);
    // callPeer(socket.current.id);
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
                      value={facility || ""}
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
                  <div>
                    <Stream userName={userName} UserVideo={UserVideo} PartnerVideo={PartnerVideo} incomingCall={incomingCall}/>
                  </div>
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
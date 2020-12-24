import React, { useEffect, useState, useRef } from 'react';
import './VideoChat.css';
import io from "socket.io-client";
import Peer from "simple-peer";



function NameSelf({
  setName,
}) {
  const inputRef = useRef();

  function onClick() {
    setName(inputRef.current.value);
  }

  return (
    <div> Please Enter Your Name
      <input id="caller-name" type="text" placeholder="your name goes here." ref={inputRef} />
      <button onClick={onClick} >Submit</button>
    </div>
  );
}

function Stream(prop) {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  // const [callerName, setCallerName] = useState(null);
  const [initiatorName, setInitiatorName] = useState(null);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("/");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    socket.current.on("yourID", (id) => {
      setYourID(id);
    })

    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      console.log(data);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);

  useEffect(() => {
    socket.current.emit('nameSelf', { id: yourID, username: initiatorName });
  }, [initiatorName]);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    })

    peer.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    });

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
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
        <h1>{prop.username} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }


  function handleInitiatorname(value) {
    setInitiatorName(value);
  }

  // function handleCallerName(target) {
  //   setCallerName(target.value)
  // }

  return (
    <container className="container">
      <row className="row">
        {!initiatorName && (<NameSelf setName={handleInitiatorname} />)}
        <column>
          <h1>{prop.username}</h1>
          {UserVideo}
        </column>
        <column>
          {/* <h1>{callerName}</h1> */}
          {PartnerVideo}
        </column>
      </row >
      <row className="row">
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {prop.username}</button>
          );
        })}
      </row >
      <row className="row">
        {incomingCall}
      </row >
    </container>
  );
}

export default Stream;

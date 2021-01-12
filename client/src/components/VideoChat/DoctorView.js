import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import Stream from "./Stream.js";

function DoctorView() {
  const drSocket = useRef(io('/'));
  const peer = useRef(new Peer({
    initiator: true,
    trickle: false,
    stream: stream,
  }));

  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

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

  useEffect(() => {
    drSocket.current.on('connection', () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
      socket.current.on("hey", (data) => {
        console.log(data);
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      });
    });
    drSocket.current.on('facility name', () => {
      drSocket.emit('facility name', { socketID: drSocket.current.id })
    });
    drSocket.current.on(drSocket.current.id, (data) => {
      callPeer();
    });
  }, []);

  return <Stream />;
}

export default DoctorView;
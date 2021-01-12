import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import Stream from "./Stream.js";

function PatientView() {
  const patientSocket = useRef(io('/'));
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

  useEffect(() => {
    patientSocket.current.on('connection', () => {
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
    patientSocket.current.on(patientSocket.current.id, (data) => {
      acceptCall();
    });
    patientSocket.current.on('facility name', ({ socketID: drSocketID }) => {
      if (drSocketID) sendRequest(drSocketID);
    });
  }, []);

  const sendRequest = (id) => {
    patientSocket.current.emit('connect-to-dr', { drID: id, signal, ...})
  }

  return <Stream />;
}

export default PatientView;
/* eslint-disable no-unused-vars */
import { set } from "lodash";
import React, { Component, useEffect, useState, useRef } from "react";
import Peer from "simple-peer";


// peer1.on('signal', data => {
//     // when peer1 has signaling data, give it to peer2 somehow
//     peer2.signal(data);
// });

// peer2.on('signal', data => {
//     // when peer2 has signaling data, give it to peer1 somehow
//     peer1.signal(data);
// });

// peer1.on('connect', () => {
//     // wait for 'connect' event before using the data channel
//     peer1.send('hey peer2, how is it going?');
// });

// peer2.on('data', data => {
//     // got a data channel message
//     console.log('got a message from peer1: ' + data);
// });


function Temp() {
    const [peer1, setPeer1] = useState(null);
    // const [peer2, setPeer2] = useState(null);
    const [stream, setStream] = useState();
    const vid = useRef();


    function gotMedia() {
        // var peer1 = new Peer({ initiator: true, incoming: incoming })
        // var peer2 = new Peer();
        console.log("media got");

        peer1.on('signal', data => {
            peer1.signal(data);
        });

        peer1.on('signal', data => {
            peer1.signal(data);
        });

        peer1.on("stream", incoming => {
            if ('srcObject' in vid.current) {
                vid.current.srcObject = incoming;
            } else {
                vid.current.src = window.URL.createObjectURL(incoming); // for older browsers
            }
            vid.current.play();
        });
    }

    // useEffect(() => {


    // }, []);

    function startVideo() {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((s)=> setStream(s)).catch(() => { });

    }

    return (
        <div>
            <video ref={vid}></video>
            <button onClick={startVideo}>Start Video</button>
            <button onClick={() => {
                setPeer1(new Peer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                }));
            }}>Peer 1</button>
            <button onClick={() => {
                setPeer1(new Peer({
                    initiator: false,
                    trickle: false,
                    stream: stream,
                }));
            }}>Peer 2</button>

            <button onClick={()=> gotMedia()}>Connect</button>
        </div>
    );
}

export default Temp;
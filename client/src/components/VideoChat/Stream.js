/* eslint-disable no-unused-vars */
import React from 'react';
import './Stream.css';

function Stream(props) {

  return (
    <div className="container">
      <div className="row">
        <div>
          {props.UserVideo}
        </div>
        <div>
          {props.PartnerVideo}
        </div>
      </div >
      <div className="row">
        {props.incomingCall}
      </div >
      <div>
        <button onClick={props.handleHangup} >Hang up</button>
      </div>
    </div>
  );
}

export default Stream;
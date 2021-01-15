/* eslint-disable no-unused-vars */
import React from 'react';
import './Stream.css';

function Stream(props) {

  return (
    <div className="container">
      <div>
        {props.incomingCall}
      </div >
      <div className="row">
        <button className="hangupBtn" onClick={props.handleHangup} >TERMINATE</button>
      </div>
      <div className="row">
        <h3 className="userName">{props.firstName} {props.lastName}</h3>
        <div className="uservideo">
          {props.UserVideo}
        </div>
      </div>
      <div className="row" >
        <div className="partnervideo">
          {props.PartnerVideo}
        </div >
      </div>
    </div>
  );
}

export default Stream;
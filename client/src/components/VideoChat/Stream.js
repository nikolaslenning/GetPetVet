/* eslint-disable no-unused-vars */
import React from 'react';
import './Stream.css';

function Stream(props) {

  return (
    <div className="container">
      <div>
        {props.incomingCall}
      </div >
      <div className="row justify-content-center">
        <button className="hangupBtn col-sm-12 col-md-6 col-lg-4" onClick={props.handleHangup}>TERMINATE</button>
      </div>
        <h3 className="userName">{props.firstName} {props.lastName}</h3>
      <div className="user-row justify-content-center">
        <div className="uservideo">
          {props.UserVideo}
        </div>
      </div>
      <div className="partner-row justify-content-center" >
        <div className="partnervideo">
          {props.PartnerVideo}
        </div >
      </div>
    </div>
  );
}

export default Stream;
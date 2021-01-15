/* eslint-disable no-unused-vars */
import React from 'react';
import './Stream.css';

function Stream(props) {

  return (
    <div className="container">
      <div className="row">
        <div className="uservideo">
          {props.UserVideo}
        </div>
        <div className="partnervideo">
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
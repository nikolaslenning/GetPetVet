import React from 'react';
import './Stream.css';

function Stream ({ socket, peer }) {
    return (
      // stream logic
      <container className="container">
        <row className="row">
          <column>
            {props.UserVideo}
          </column>
          <column>
            {/* <h1>{callerName}</h1> */}
            {props.PartnerVideo}
          </column>
        </row >
        {/* <row className="row">
          {Object.keys(users).map(key => {
            if (key === yourID) {
              return null;
            }
            return (
              <button onClick={() => callPeer(key)}>Call {prop.userName}</button>
            );
          })}
        </row > */}
        <row className="row">
          {props.incomingCall}
        </row >
      </container>
    );
  }

  export default Stream;
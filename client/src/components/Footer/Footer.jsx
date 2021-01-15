/* eslint-disable no-unused-vars */
import React from 'react';
import Card from "react-bootstrap/Card";
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer2 extends Component {
  render() {
    return (
      <div>
        <Card.Footer>
          <small id="footerColor">&copy; Copyright 2021, Team LaFleur, Team Wilhelm</small>
        </Card.Footer>
      </div>
    );
  }
}

export default Footer2;
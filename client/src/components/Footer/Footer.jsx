import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import { Component } from 'react';

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
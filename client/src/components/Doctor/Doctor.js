/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: []
    };
  }

  getDoctor() {
    axios.get('/doctors')
      .then(res => {
        console.log("res.data");
        console.log(res.data.data);
        console.log(res.data);
        this.setState({
          doctor: res.data.data
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getDoctor();
  }

  render() {
    return (
      <div>
        <h3>Doctor Profiles</h3>
        {console.log(this.state.doctor)}
        {this.state.doctor.map(doctor =>
          <div className="card text-center">
            <div className="card-header">
            </div>
            <div className="card-body">
              <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
              <p>Address: {doctor.address}</p>
              <p>Province: {doctor.province}</p>
              <p>Zip Code: {doctor.zipCode}</p>
              <p>Phone Number: {doctor.phoneNumber}</p>
              <p>Email: {doctor.email}</p>
              {/* <a href="{doctor.email}" target="_blank" rel="noreferrer" >Book Info</a>
                            <br></br>
                            <button className="btn btn-primary" onClick={onClick}>Save</button> */}
            </div>
          </div>
        )
        }
      </div>

    );
  }
}

export default Doctor;
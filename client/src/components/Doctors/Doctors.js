/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: []
    };
  }

  getDoctor() {
    axios.get('/doctors')
      .then(res => {
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
          <div key={doctor._id} className="card text-center">
            <div className="card-header">
              <img src={doctor.image} alt={doctor.title} />
              <div className="card-body">
                <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
                <p>Schedule: {doctor.schedule}</p>
                <hr></hr>
                <p>Facility: {doctor.facility}</p>
                <p>Address: {doctor.address}</p>
                <p>Province: {doctor.province}</p>
                <p>Zip Code: {doctor.zipCode}</p>
                <p>Phone Number: {doctor.phoneNumber}</p>
                <p>Email: {doctor.email}</p>
                <p>About: {doctor.about}</p>
                <a href={`mailto:` + doctor.email + `?subject=Appointment Request&body=Dr. ` + doctor.lastName + `,%0D%0AI would like to request an appointment Date:%0D%0A(Specify Date Here)%0D%0APlease let me know avialable times?`}>Send Email</a>
              </div>
            </div>
          </div>
        )
        }
      </div>
    );
  }
}

export default Doctors;
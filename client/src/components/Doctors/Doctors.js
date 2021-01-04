/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";

class DoctorCards extends Component {
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
                <div className="card text-center">
                    <div className="content">
                        <ul>
                            {this.state.doctor.map(doctor =>
                                <li key={doctor._id} >
                                    <strong>Name:</strong> Dr. {doctor.firstName} {doctor.lastName}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/* <li>
                                    <strong>Breed:</strong> {pet.petBreed}
                                </li>
                                <li>
                                    <strong>Age:</strong> {pet.petAge}
                                </li> */}
            </div>

        );
    }
}

export default DoctorCards;
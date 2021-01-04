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
        axios.get('/users')
            .then(res => {
                console.log("res.data");
                console.log(res.data.data);
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
                        <div className="content">
                            <ul>
                                <li>
                                    <strong>Name:</strong> {doctor.name}
                                </li>
                                {/* <li>
                                    <strong>Breed:</strong> {pet.petBreed}
                                </li>
                                <li>
                                    <strong>Age:</strong> {pet.petAge}
                                </li> */}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

        );
    }
}

export default DoctorCards;
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: []
    };
  }

  getPet() {
    axios.get('/pet')
      .then(res => {
        console.log("res.data");
        console.log(res.data.data);
        this.setState({
          pet: res.data.data
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPet();
  }

  deletePet(id) {
    axios.delete(`/pet/${id}`);
    this.getPet();
  }

  render() {
    return (
      <div>
        <h3>Pet Profiles</h3>
        {console.log("this.state.pet")}
        {console.log(this.state.pet)}
        {this.state.pet.map(pet =>
          <div className="card text-center">
            <div className="card-header">
            </div>
            <div className="card-body">
              <h2>{pet.petName}</h2>
              <p>Breed: {pet.petBreed}</p>
              <p>Age: {pet.petAge}</p>
            </div>
            <button className="btn btn-primary" onClick={() => this.deletePet(pet._id)}>Delete This Profile</button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
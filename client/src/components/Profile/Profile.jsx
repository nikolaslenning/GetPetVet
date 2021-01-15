/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import logoBlueGreen from "../assets/logoBlueGreen.png";
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
        // console.log("res.data");
        // console.log(res.data.data);
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
        <div className="loginIntro">
          <img src={logoBlueGreen} alt="Girl in a jacket" width="20%" height="20%" className="aboutlogo"></img>
          <h1 id="welcomeHomepg">Pet Profiles</h1>
        </div>
        {this.state.pet.map(pet =>
          <div className="card text-center" id="cardbackground" key={pet._id}>
            <div className="card-body">
              <div className="card-header">
                <h2>{pet.petName}</h2>
                <p>Breed: {pet.petBreed}</p>
                <p>Age: {pet.petAge}</p>
                <button className="btn btn-primary" onClick={() => this.deletePet(pet._id)}>Delete This Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
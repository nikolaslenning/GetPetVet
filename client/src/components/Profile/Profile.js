/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';

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
          <div className="card">
          <div className="content">
            <ul>
              <li>
                <strong>Name:</strong> {pet.petName}
              </li>
              <li>
                <strong>Breed:</strong> {pet.petBreed}
              </li>
              <li>
                <strong>Age:</strong> {pet.petAge}
              </li>
            </ul>
          </div>
          <button onClick={() => this.deletePet(pet._id)}>Delete</button>
        </div>
        )}
      </div>
    );
  }
}

export default Profile;
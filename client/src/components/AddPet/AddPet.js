/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AddPet extends Component {
  constructor() {
    super();
    this.state = {
      petName: '',
      petBreed: '',
      petAge: '',
      redirectTo: null

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('Profile handleSubmit, petName: ');
    console.log(this.state.petName);
    event.preventDefault();

    //request to server to add a pet profile
    axios.post('/pet', {
      petName: this.state.petName,
      petBreed: this.state.petBreed,
      petAge: this.state.petAge
    })
      .then(response => {
        console.log(response);
        console.log(response.data);
        if (!response.data.errmsg) {
          console.log('successful profile');
          this.setState({ //redirect to home page
            redirectTo: '/'
          });
        } else {
          console.log('profile already exists');
        }
      }).catch(error => {
        console.log('profile error: ');
        console.log(error);

      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="ProfileForm">
          <h4>Pet Profile</h4>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label">Pet Name: </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                  type="text"
                  id="petName"
                  name="petName"
                  placeholder="pet name"
                  value={this.state.petName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label">Pet Breed: </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                  placeholder="pet breed"
                  type="text"
                  id="petBreed"
                  name="petBreed"
                  value={this.state.petBreed}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label">Pet Age: </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                  placeholder="pet age"
                  type="text"
                  id="petAge"
                  name="petAge"
                  value={this.state.petAge}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-primary col-1 col-mr-auto"
                onClick={this.handleSubmit}
                type="submit"
              >Create</button>
            </div>
          </form>
        </div>

      );
    }
  }
}

export default AddPet;
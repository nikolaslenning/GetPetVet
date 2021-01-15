// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import axios from 'axios';

class Passport extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      isDoctor: false
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          email: response.data.user.email,
          isDoctor: response.data.user.isDoctor
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        });
      }
    });
  }
}

export default Passport;
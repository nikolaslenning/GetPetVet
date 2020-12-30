/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route } from 'react-router-dom';
// components

import Signup from './components/Sign-up/Sign-up';
import LoginForm from './components/Login-form/Login-form';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import VideoChat from './components/VideoChat/VideoChat';
import Scheduler from './components/Scheduler/Scheduler';


// import { Calendar } from 'react-big-calendar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      firstName: null
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
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log("response data" + response.data);
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          email: response.data.user.email,
          firstName: response.data.user.firstName
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null,
          firstName: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">

        <Router>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn &&
            <p>Join the party, {this.state.firstName}!</p>
          }
          {/* Routes to different components */}
          <Route
            exact path="/"
            component={Home} />
          <Route
            exact path="/login"
            render={() =>
              <LoginForm
                updateUser={this.updateUser}
              />}
          />
          <Route
            exact path="/signup"
            render={() =>
              <Signup />}
          />
          <Route
            exact path="/scheduler"
            render={() =>
              <Scheduler />}
          />
        </Router>

        {/* <VideoChat username={this.state.firstName} /> */}

      </div>
    );
  }
}

export default App;
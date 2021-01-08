/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// components

import Signup from './components/Sign-up/Sign-up';
import LoginForm from './components/Login-form/Login-form';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import VideoChat from './components/VideoChat/VideoChat';
import Scheduler from './components/Scheduler/Scheduler';
import Profile from './components/Profile/Profile';
import AddPet from './components/AddPet/AddPet';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Doctors from "./components/Doctors/Doctors";

import { CalendarStore } from "../src/components/Scheduler/store";
const calendarStore = new CalendarStore();

// import { Calendar } from 'react-big-calendar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      firstName: null,
      isDoctor: false
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    // axios.get("/api/scheduler").then(e => {
    //   console.log("ajklsdfdfsjkl ", e);
    // });
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
      console.log("response data", response.data);
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          isDoctor: response.data.user.isDoctor
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
          <Navbar isDoctor={this.state.isDoctor} updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn &&
            <h2>Welcome, {this.state.firstName}!</h2>
          }
          {/* Routes to different components */}
          <Route
            exact path="/"
            render={() => {
              if (this.state.loggedIn) {
                return (
                  <Home
                    updateUser={this.updateUser}
                  />
                );
              } else {
                return (
                  <Redirect to="/login" />
                );
              }
            }
            }
          />
          <Route
            exact path="/login"
            render={() => {

              if (!this.state.loggedIn) {
                return (
                  <LoginForm
                    updateUser={this.updateUser}
                  />
                );
              } else {
                return (
                  <Redirect to="/" />
                );
              }
            }
            }
          />
          <Route
            exact path="/signup"
            render={() => {
              if (!this.state.loggedIn) {
                return (
                  <Signup />
                );
              } else {
                return (
                  <Redirect to="/" />
                );
              }
            }
            }
          />
          <Route
            exact path="/scheduler"
            render={() => {
              if (this.state.loggedIn) {
                return (
                  <Scheduler
                    calendarStore={calendarStore}
                    isDoctor={this.state.isDoctor} />
                );
              } else {
                return (
                  <Redirect to="/login" />
                );
              }
            }
            }
          />

          <Route
            exact path="/profile"
            render={() => {
              if (this.state.loggedIn) {
                return (
                  <Profile />
                );
              } else {
                return (
                  <Redirect to="/login" />
                );
              }
            }
            }
          />
          <Route
            exact path="/addpet"
            render={() => {
              if (this.state.loggedIn) {
                return (
                  <AddPet />
                );
              } else {
                return (
                  <Redirect to="/login" />
                );
              }
            }
            }
          />
          <Route
            exact path="/doctors"
            render={() => {
              if (this.state.loggedIn) {
                return (
                  <Doctors />
                );
              } else {
                return (
                  <Redirect to="/login" />
                );
              }
            }
            }
          />
        </Router>

        {/* <VideoChat username={this.state.firstName} /> */}

      </div>
    );
  }
}

export default App;
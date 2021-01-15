// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoLightBlue from "../assets/logoLightBlue.png";
import './Navbar.css';

class Navbar extends Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios.post('/user/logout').then(response => {
      console.log(response.data);

      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          email: null,
          isDoctor: true
        });
      }
      // eslint-disable-next-line no-unused-vars
    }).catch(error => {
      console.log('Logout error');
    });
  }

  render() {
    const isDoctor = this.props.isDoctor;
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark" id="nav-container">
          <div className="container-fluid">
            <img src={logoLightBlue} className="navlogo" alt="pet1"></img>
            <div className="navbar-brand m-0">GetPetVet</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                {loggedIn ? (
                  <section className="navbar-section" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                    <ul className="navList">

                      <li>
                        <Link to="/" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                          <span className="text-secondary">Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/scheduler" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                          <span className="text-secondary">Scheduler</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/videochat" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                          <span className="text-secondary">Video Chat</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/profile" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                          <span className="text-secondary">Profile</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/addpet" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                          <span className="text-secondary">Add Pet</span>
                        </Link>
                      </li>

                      {!isDoctor ? (
                        <li>
                          <Link to="/doctors" className="btn btn-link text-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                            <span className="text-secondary">Doctors</span>
                          </Link>
                        </li>

                      ) : (<span></span>)}
                      <li>
                        <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                          <span className="text-secondary">Logout</span>
                        </Link>
                      </li>

                    </ul>
                  </section>
                ) : (
                    <section className="navbar-section">

                      <Link to="/login" className="btn btn-link text-secondary">
                        <span className="text-secondary">Login</span>
                      </Link>

                      <Link to="/signup" className="btn btn-link">
                        <span className="text-secondary">Sign up</span>
                      </Link>

                    </section>
                  )}
              </ul>
            </div>
          </div>
        </nav>
      </div >
    );
  }
}

export default Navbar;
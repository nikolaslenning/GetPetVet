// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
// import '../App.css';
import axios from 'axios';
import "./Navbar.css";

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
          email: null
        });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch(error => {
      console.log('Logout error');
    });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav-container">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">GetPetVet</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
            {loggedIn ? (
              <section className="navbar-section">
              <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                <span className="text-secondary">logout</span></Link>

            </section>
                  ) : (
                    <section className="navbar-section">
                    <Link to="/" className="btn btn-link text-secondary">
                      <span className="text-secondary">Home</span>
                    </Link>
                    <Link to="/login" className="btn btn-link text-secondary">
                      <span className="text-secondary">Login</span>
                    </Link>
                    <Link to="/signup" className="btn btn-link">
                      <span className="text-secondary">Sign up</span>
                    </Link>
                    <Link to="/scheduler" classname="btn btn-link">
                      <span className="text-secondary">Scheduler</span>
                    </Link>
                  </section>
            )}
      </ul>
    </div>
  </div>
</nav>

        {/* <header className="navbar App-header" id="nav-container">
            <div className="col-4" >
              {loggedIn ? (
                <section className="navbar-section">
                  <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                    <span className="text-secondary">logout</span></Link>

                </section>
              ) : (
                  <section className="navbar-section">
                    <Link to="/" className="btn btn-link text-secondary">
                      <span className="text-secondary">Home</span>
                    </Link>
                    <Link to="/login" className="btn btn-link text-secondary">
                      <span className="text-secondary">Login</span>
                    </Link>
                    <Link to="/signup" className="btn btn-link">
                      <span className="text-secondary">Sign up</span>
                    </Link>
                    <Link to="/scheduler" classname="btn btn-link">
                      <span className="text-secondary">Scheduler</span>
                    </Link>
                  </section>
                )}
            </div>
            <div className="col-4 col-mr-auto">
              <div id="top-filler"></div>
              <h1 className="App-title">GetPetVet</h1>
            </div>
              </header> */}
      </div>

    );

  }
}

export default Navbar;
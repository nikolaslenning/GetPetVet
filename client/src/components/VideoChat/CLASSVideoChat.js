// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import axios from "axios";

class videoChat extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post("/scheduler", {

    });
}

  render() {
    return (

      <section className="hero light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column  is-5-tablet is-4-desktop is-3-widescreen has-text-centered">
                <span className="icon is-large">
                  <i className="fa fa-comments"></i>
                </span>
                <h2 className="title is-3"> VIDEO CHAT ROOMS</h2>
              </div>
            </div>
            <div className="columns is-centered">

              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="/videochat" method="POST" className="box">
                  <div className="field">
                    <label className="label">Username</label>
                    <h1>{this.props.firstName}</h1>
                    <div className="control has-icons-left">
                      <p name="username">{this.props.firstName} {this.props.lastName}</p>
                      <span className="icon is-small is-left">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Select Room Name</label>
                    <p className="control has-icons-left">
                      <select name="room" className="roomselect" aria-placeholder="Room Name" >
                        <option value="Kevorkian">Kevorkian</option>
                        <option value="Frank">Frankie</option>
                      </select>
                      {/* <!-- <input type="text" placeholder="Room Name" className="input" name="room" required> --></input> */}
                      <span className="icon is-small is-left">
                        <i className="fas fa-comment-alt"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field ">
                    <button onClick={this.handleSubmit} className="button is-link">
                      <span className="icon is-small is-left mr-1">
                        <i className="fas fa-person-booth"></i>
                      </span>
                      JOIN
                     </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default videoChat;
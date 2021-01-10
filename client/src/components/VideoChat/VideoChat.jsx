/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import "./NewVideoChat/VideoChat.css";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Stream from './OLDVideChat';
import "../../App";

function OldVideoFunction({ email, firstName, lastName, isDoctor }) {
  //   //const [mail, setMail] = React.useState("");
  //   // const [firstName, setFirstName] = React.useState("");
  //   // const [lastName, setLastName] = React.useState("");
  //   const [userName, setUserName] = React.useState("");
  const [room, setRoom] = React.useState("");
  //   //const [docList, setDocList] = React.useState([]);
  //   //const [facility, setFacility] = React.useState(null);
  //   //const docElement = React.useRef(null);
}

  //   // React.useEffect(() => {
  //   //   axios.get('/doctors')
  //   //     .then(res => {
  //   //       // console.log("res.data");
  //   //       // console.log(res);
  //   //       // console.log(res.data.data);
  //   //       //setDocList(res.data.data);

  //   //     })
  //   //     .catch(err => console.log(err));
  //   // }, []);

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const data = { firstName, lastName, room };
  //     console.log("HIT DATA IN VIDEOCHAT data");
  //     console.log(data);
  //     axios.post("api/videochat", data);
  //     Socket.emit("join-room", ({ firstName, userName, room }));
  //   };

//const name = "";

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Entered Room Number: " + this.state.value);
    console.log("BELOW IS IT");
    console.log(this.state.value);
  }

    // nextPath(path) {
    //   this.props.history.push(path);
    // }
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
                  <h2 className="title is-3">Virtual Vet Visit Room</h2>
                </div>
              </div>
              <div className="columns is-centered">

                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  <form onSubmit={this.handleSubmit.bind(this)} className="box">
                    <div className="field">
                      <label className="label">Your First Name</label>
                      <div className="control has-icons-left">
                        <input type="text" placeholder="First Name" className="input" name="username" required></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Patient: Pet's Name</label>
                      <div className="control has-icons-left">
                        <input type="text" placeholder="Pet Name" className="input" name="petname" required></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Please Enter Room Number
                      {/* <input type="text" value={this.state.value} onChange={this.handleChange}></input> */}
                      </label>
                      <p className="control has-icons-left">Your Room Number was provided during your appointment sign-up.</p>
                      <input type="text" placeholder="Room Number" className="input" value={this.state.value} onChange={this.handleChange} name="room" required></input>
                      <span className="icon is-small is-left">
                        <i className="fas fa-comment-alt"></i>
                      </span>
                    </div>
                    <div className="field ">
                      <Link to={`/stream/${this.state.value}`} className="btn btn-link text-secondary" type="button" value="Submit">
                        <span className="icon is-small is-left mr-1">
                          <i className="fas fa-person-booth"></i>
                        </span>
                  Meet with Doctor
                  </Link>
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

export default VideoChat;
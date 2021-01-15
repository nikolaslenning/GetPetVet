/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import pet1 from "../assets/pet1.jpg";
import patient2 from "../assets/patient2.jpg";
import doctor3 from "../assets/doctor3.jpg";
import "./Home.css";
import logoDarkGray from "../assets/logoDarkGray.png";
import Card from 'react-bootstrap/Card';
import pet5 from "../assets/pet5.jpg";
import pet2 from "../assets/pet2.jpg";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      firstName: ""
    };
  }
    render(props) {
      console.log(props);
      return (
      <div id="homeDiv">
            <h2>Welcome, {this.props.firstName}!</h2>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <ol className="carousel-indicators">
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={pet1} className="d-block w-100" alt="pet1"></img>
              <div className="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions1">Schedule Online</h5>
                <div className="carousel-caption d-none d-md-block" id="captionTxt">
                  <p>Connect directly with your veterinarian online with GetPetVet.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={patient2} className="d-block w-100" alt="patient2"></img>
              <div className="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions1">All from Home</h5>
                <div className="carousel-caption d-none d-md-block" id="captionTxt">
                  <p>Virtual visits offer interaction with your veterinarian from a distance.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={doctor3} className="d-block w-100" alt="doctor3"></img>
              <div className="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions1">Quality Care</h5>
                <div className="carousel-caption d-none d-md-block" id="captionTxt">
                  <p>Connect with the veterinarians you trust.</p>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
        <div className="aboutIntro">
          <img src={logoDarkGray} alt="Girl in a jacket" width="20%" height="20%" className="aboutlogo"></img>
          <h2 id="about">About</h2>
        </div>
        <Card className="cardbackground">
          <Card.Img variant="top" src={pet5} />
          <Card.Body>
            <Card.Text>
              GetPetVet is a way to connect with veterinarians virtually. Our app provides patients a way to visit with their doctors without having to leave the house. Create profiles for all of your pets, select your doctor and schedule appointments all from GetPetVet. When the time comes to visit with your vet, join the virtual meeting room for your video chat visit!
      </Card.Text>
          </Card.Body>
        </Card>
        <div className="aboutIntro">
          <img src={logoDarkGray} alt="Girl in a jacket" width="20%" height="20%" className="aboutlogo"></img>
          <h2 id="about">Contact</h2>
        </div>
        <Card className="cardbackground">
          <Card.Img variant="top" src={pet2} />
          <Card.Body>
            <Card.Text>
              If you are a doctor and would like to use GetPetVet to meet with your patients, please email us to verify your account. Have any other questions? We'd like to hear from you!
               <a className="getpetemail">contact@getpetvet.com</a>
      </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );

  }
}

export default Home;
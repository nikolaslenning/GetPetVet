// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import pet1 from "../assets/pet1.jpg";
import patient2 from "../assets/patient2.jpg";
import doctor3 from "../assets/doctor3.jpg";
import "./Home.css";

class Home extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div id="homeDiv">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <ol class="carousel-indicators">
    <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"></li>
    <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
    <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={pet1} class="d-block w-100" alt="pet1"></img>
      <div class="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions">Schedule Online</h5>
      <div class="carousel-caption d-none d-md-block" id="captionTxt">
        <p>Connect directly with your veterinarian online with GetPetVet.</p>
                </div>
      </div>
    </div>
    <div class="carousel-item">
      <img src={patient2} class="d-block w-100" alt="patient2"></img>
      <div class="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions">All from Home</h5>
      <div class="carousel-caption d-none d-md-block" id="captionTxt">
        <p>Virtual visits offer interaction with your veterinarian from a distance.</p>
                </div>
      </div>
    </div>
    <div class="carousel-item">
      <img src={doctor3} class="d-block w-100" alt="doctor3"></img>
      <div class="carousel-caption" id="captionTxt">
                <h5 id="carouselExampleCaptions">Quality Care</h5>
      <div class="carousel-caption d-none d-md-block" id="captionTxt">
        <p>Connect with the veterinarians you trust.</p>
                </div>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>
      </div>
    );

  }
}

export default Home;
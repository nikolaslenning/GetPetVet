/* eslint-disable no-unused-vars */
import React from "react";

function DoctorCards(props) {

    return (
        <div className="card text-center">
            <div className="card-header">
                <img src="#" alt="Doctor Face or something" />
            </div>
            <div className="card-body">
                <h2>Hello, my name is Dr. Frankenstien</h2>
                <p>I'm baby woke palo santo pabst edison bulb pok pok. Photo booth velit salvia, fixie coloring book neutra ennui palo santo ut ipsum. Deserunt narwhal williamsburg gluten-free. Tempor truffaut cred trust fund, organic activated charcoal qui post-ironic aliquip succulents. Selfies chillwave ad, eiusmod in quis keffiyeh irony lumbersexual cillum qui polaroid you probably haven't heard of them photo booth jean shorts.</p>
                <a href="#" target="_blank" rel="noreferrer" >Book Info</a>
                <br></br>
                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    );
}

export default DoctorCards;
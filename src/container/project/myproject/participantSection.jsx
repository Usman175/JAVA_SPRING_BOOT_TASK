import React, { Component } from "react";

class ParticipantSection extends Component {
  render() {
    return (
      <>
        <div className="client_rating">
          <p className="client_text">Participant</p>
          <div className="d-flex align-items-center">
            <span>J</span>
            <span className="freelancer_img">
              <img src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/freelancer_img.png" alt="" />
            </span>
            <span className="freelancer_img">
              <img src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/freelancer_img2.png" alt="" />
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default ParticipantSection;

import React, { Component } from "react";

class ParticipantSection extends Component {
  render() {
    const { projectObj } = this.props;
    return (
      <>
        <div className="client_rating">
          <p className="client_text">Team</p>
          <div className="d-flex align-items-center">
            {projectObj?.participants?.length > 0 &&
              projectObj?.participants?.map((participant) =>
                !participant?.userProfileUrl ? (
                  <span>J</span>
                ) : (
                  <span className="freelancer_img">
                    <img src={participant?.userProfileUrl} alt="user pic" />
                  </span>
                )
              )}
          </div>
        </div>
      </>
    );
  }
}

export default ParticipantSection;

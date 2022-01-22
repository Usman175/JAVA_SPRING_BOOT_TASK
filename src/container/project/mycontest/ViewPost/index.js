import React, { Component } from "react";
import ProjectFreelancerDetail from "../../projectDetails/projectFreelancerDetail";

class ViewPost extends Component {
  render() {
    return (
      <>
        <div className="ViewPost_mobile">
          <ProjectFreelancerDetail disableHeader disableShadow hideButton {...this.props} />
        </div>
      </>
    );
  }
}

export default ViewPost;

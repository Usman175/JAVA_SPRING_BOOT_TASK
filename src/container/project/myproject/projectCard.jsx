import React, { Component } from "react";
import v4 from "uuid";
import LeftSection from "./leftSection";
import MiddleSection from "./middleSection";
import { ProjectType, ProjectStatus } from "../../../utils/projectConst";
import Avatar from "@mui/material/Avatar";
import "./freelancerContract_secResponsive.scss";
import "./myProject.scss";
import {
  GET_IMAGE_PREFIX1,
} from "../../../store/constants/constant";
const dummyImage =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStatusIndex: "",
    };
  }

  actions = (project) => {
    if (project.action) {
      return (
        <div>
          <button className={`btn ${project.action.type}`}>
            {project.action.text}
          </button>
        </div>
      );
    } else return null;
  };

  render() {
    const { contractData,project, index,projectContractId,hourlyRate,contractStatus,clientFirstName,clientLastName,clientProfileImg,finalizedMilestoneAmount,finalizedSalarayAmount } = this.props;
    let isMilestone = project.projectType === ProjectType.Milestone;
    return (
      <>
        <div key={`${v4()}`} className="card_box right-section">
          <div className="row justify-content-between">
            <div className="col-md-3 leftFreelancerContract_secMobileTab">
              {<LeftSection finalizedMilestoneAmount={finalizedMilestoneAmount} finalizedSalarayAmount={finalizedSalarayAmount} hourlyRate={hourlyRate} projectContractId={projectContractId} projectObj={project} index={index} />}
            </div>
            <div className="col-md-6 separator separatorMiddleContract_mobile">
              <MiddleSection contractStatus={contractStatus} contractData={contractData} projectObj={project} {...this.props} />
            </div>

            <div className="col-md-3 rightFreelancerContract_secMobileTab">
              <div className="flex flex-row center mb-1 profile-wrapper">
                <Avatar alt="user" src={dummyImage} />
                <label className="mr-3 ml-3 mb-0">{clientFirstName} {clientLastName}</label>
                <i className="fa fa-star-o large" aria-hidden="true"></i>
              </div>

              <div className="user-feedback">
                {project.rating && (
                  <div className="cursor-pointer">
                    <span>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </span>
                    <span className="edit ml-2">
                      <img
                        src={
                          clientProfileImg? `https://${GET_IMAGE_PREFIX1}/${clientProfileImg}`:"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                        }
                      />
                    </span>
                  </div>
                )}

                {project.reviews && (
                  <div className="reviews">
                    <label>{project.reviews}</label>
                  </div>
                )}
                {isMilestone && this.actions(project)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectCard;

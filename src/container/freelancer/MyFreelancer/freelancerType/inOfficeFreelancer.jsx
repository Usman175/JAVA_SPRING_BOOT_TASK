import React, { Component } from "react";
import LeftSection from "../leftSection";
import { Link } from "react-router-dom";
// import ParticipantSection from "./../ParticipantSection";
// import ExpensionInOffice from "../expansionType/ExpensionInOffice";

class InOfficeFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { projectObj } = this.props;
    return (
      <>
        <div className="in-office-freelancer card_box work_card">
          <div className="row justify-content-between">
            <div className="col-md-3">
              <LeftSection projectObj={projectObj} />
            </div>
            <div className="col-md-5">
              <div className="design_work ">
                <h3 className="green_text">
                  {projectObj.projectType === "Contest" ? (
                    <Link
                      to={`/myContest/${projectObj?.projectId}`}
                      className="green_text"
                    >
                      {projectObj && projectObj.jobTitle}
                    </Link>
                  ) : (
                    projectObj && projectObj.jobTitle
                  )}
                </h3>
                <div className="rank-section">
                  <img src="https://marcyheller.com/wp-content/uploads/2019/12/advantage-trophy-logo.png"></img>
                  <span className="text-info">Awarded $2,000.00</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 align-self-center">
              {/* <ParticipantSection projectObj={projectObj} /> */}
            </div>
            <div className="col-md-2 text-right">
              <p className="client_text">{projectObj.projectType}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InOfficeFreelancer;

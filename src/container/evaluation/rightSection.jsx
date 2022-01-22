import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
  onReduxSelcteProjectChange,
} from "../../store/action/action.js";

class RightSection extends Component {
  render() {
    const { projectDetailResponse, projectResponse, languageType } = this.props;

    return (
      <>
        <div className="project_detail">
          <div className="d-flex justify-content-between project_no">
            <a title="">
              {languageType.PROJECT_NO}:{" "}
              {projectResponse && projectResponse.projectId}
            </a>
            <a title="">
              {moment(projectResponse && projectResponse.postDateTime).format(
                "DD-MMM-YYYY"
              )}
            </a>
          </div>
          <div className="applicant">
            <div className="d-flex milestone">
              <div className="d-flex align-items-center">
                <span>
                  <img
                    src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/applicant.svg"
                    alt=""
                  />
                </span>
                <p>
                  {projectResponse && projectResponse.proposalCount}{" "}
                  {languageType.APPLICANTS_TEXT}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span>
                  <i
                    className="fa fa-money-bill-alt"
                    aria-hidden="true"
                    style={{ fontSize: "20px", color: "#336699" }}
                  ></i>
                </span>
                <p>{projectResponse && projectResponse.projectType}</p>
              </div>
            </div>
            <div className="d-flex milestone">
              <div className="d-flex align-items-center">
                <span>
                  <i
                    className="far fa-calendar-check"
                    aria-hidden="true"
                    style={{ fontSize: "20px", color: "#336699" }}
                  ></i>
                </span>
                <p>
                  {projectResponse && projectResponse.projectType === "Hourly"
                    ? projectResponse.noOfDayHourly
                    : projectResponse.noOfDay}{" "}
                  {languageType.DAYS_TEXT}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span>
                  <img
                    src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/time.svg"
                    alt=""
                  />
                </span>
                <p>
                  {projectResponse && projectResponse.projectRemainingDays}{" "}
                  {languageType.DAYS_LEFT}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between skills_btn">
            {projectResponse.skills !== null && projectResponse.skills !== ""
              ? projectResponse &&
                projectResponse.skills &&
                projectResponse.skills.split(",").map(
                  (skill, index) =>
                    index < 4 && (
                      <a key={"skill" + `${index}`} title="">
                        {skill}
                      </a>
                    )
                )
              : "No skills required"}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}

export default withRouter(connect(mapStateToProps, null)(RightSection));

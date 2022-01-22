import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { onReduxSelcteProjectChange } from "../../../store/action/action";
import { getContestByIdRequestSuccess } from "../../../store/action/Contest/contestActions";
import { ProjectType, ProjectStatus } from "../../../utils/projectConst";
import { UserTypeConst } from "../../../utils/userTypeConst";
import ProjectStatusBadge from "../../../components/project/projectStatusBadge";
import ProgressBar from "../../../components/progressBar/progressBar";
import "./freelancerContract_secResponsive.scss";

class MiddleSection extends Component {
  constructor(props) {
    super(props);
    let sessionUserType = sessionStorage.getItem("userType");
    this.state = {
      userType: sessionUserType,
      noOfTasks: 0,
      completedTasks: 0,
      taskCompletionPer: 0,
      milagePer: 0,
      milagePayout: 0,
    };
  }


  componentDidMount() {
    let { projectObj } = this.props;

    if (projectObj?.projectId) {
      const noOfTasksLocal =
        projectObj &&
        projectObj.milestoneDetail &&
        projectObj.milestoneDetail.length;
      const completedTasksLocal = projectObj?.milestoneDetail?.filter(
        (item) => item?.milestoneCompleted
      );
      const milagePayoutLocal = projectObj?.milestoneDetail?.filter(
        (item) => item?.milestoneCompleted && item?.releaseDate
      );
      const tasksPerLocal = completedTasksLocal
        ? (completedTasksLocal.length / noOfTasksLocal) * 100
        : 0;
      const totalMilagePayout =
        milagePayoutLocal &&
        milagePayoutLocal.reduce((a, b) => +a + +b.milestoneAmount, 0);
      const milagePerLocal =
        (totalMilagePayout / projectObj?.projectAmount) * 100;

      this.setState({
        noOfTasks: noOfTasksLocal || 0,
        completedTasksLocal: completedTasksLocal
          ? completedTasksLocal.length
          : 0,
        taskCompletionPer: tasksPerLocal,
        milagePer: milagePerLocal,
        milagePayout: totalMilagePayout,
      });
    }
  }

   handleRedirectDetail = () => {
     let type=this.props.projectObj.projectType;
     let contractData=this.props.contractData;
    if (type === "Hourly") {
      this.props.history.push({
        pathname: "/hourly-contract-detail-freelancer",
        state: contractData,
      });
    }
    if (type === "Milestone") {
      this.props.history.push({
        pathname: "/milestone-contract-detail-freelancer",
        state: contractData,
      });
    }
    if (type === "FreeContract") {
      this.props.history.push({
        pathname: "/free-contract-detail-freelancer",
        state: contractData,
      });
    }

    if (type === "OfficeWork") {
      this.props.history.push({
        pathname: "/office-contract-detail-freelancer",
        state: contractData,
      });
    }

    if (type === "Contest") {
      this.props.history.push(`/my-contest?projectId=${contractData?.project?.projectId}`);
    }
  };

  render() {
    let { projectObj,contractStatus, languageType,contractData } = this.props;
    let isMilestone = projectObj.projectType === ProjectType.Milestone;
    let isHourly = projectObj.projectType === ProjectType.Hourly;
    let isFreeContract = projectObj.projectType === ProjectType.FreeContract;
    let iscontest = projectObj.projectType === ProjectType.Contest;
    let active = projectObj.projectStatus === ProjectStatus.Active;
    let waitigForInitialDeposit =
      projectObj.projectStatus === ProjectType.WaitingForInitialDeposit;
    const amountPaid = () => {
      if (isHourly || isFreeContract) {
        return (
          <div className="row m-0 middleFreelancer_contract_PaidTotal">
            <div className="col-6 p-0">
              <h4>Paid Total: US$230.00</h4>
            </div>
            <div className="col-6 p-0">
              <h4>Paid Hours: 235</h4>
            </div>
          </div>
        );
      } else return null;
    };

    const progressInfo = () => {
      if (isMilestone && !waitigForInitialDeposit) {
        return (
          <div className="flex flex-align-center middleFreelancer_contract_progressBar">
            <div className="mr-2">
              <ProgressBar />
            </div>
            <div>
              <h4 className="m-0">Paid Total: US$230.00</h4>
            </div>
          </div>
        );
      } else return null;
    };

    const contestResults = () => {
      if (active) {
        return (
          <>
            <div className="contest">
              <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstPass.png"} />
              <div className="firstPass">
                <h4 className="m-o">You are selected in the 1st pass</h4>
              </div>
            </div>
          </>
        );
      } else if (projectObj.award) {
        return (
          <>
            <div className="contest">
              <h4>Awarded 2nd US$200000.00</h4>
              <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"} />
            </div>
          </>
        );
      }
    };

    return (
      <>
        <div className="design_work middleFreelancer_contract_designWork">
          <h3
            title={projectObj && projectObj.jobTitle && projectObj.jobTitle}
            className="font_arial underline_hover pb-2 text-title freelancerMiddle_headingContract"
            onClick={this.handleRedirectDetail}
          >
            {projectObj &&
            projectObj.jobTitle &&
            projectObj.jobTitle.length > 25
              ? projectObj.jobTitle.slice(0, 25) + "..."
              : (projectObj && projectObj.jobTitle) || " "}
          </h3>

          <p className="mb-2">
          <ShowMoreText
                  lines={3}
                  more="show more"
                  less="Show Less"
                  className="content-css"
                  anchorClass="view-more-less"
                  expanded={false}
                >
                  <p
                    style={{ color: "#333333 !important" }}
                    dangerouslySetInnerHTML={{
                      __html: projectObj.jobDescription,
                    }}
                  ></p>
                </ShowMoreText>
           
          </p>

          {amountPaid()}

          <div className="status-badge">
            <ProjectStatusBadge projectBadge={contractStatus} />
          </div>
        </div>

        {progressInfo()}
        {iscontest && contestResults()}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    activeRoute: state.routeStore.activeRoute,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onSelcteProjectChange: (selectedProject) => {
      dispatch(onReduxSelcteProjectChange(selectedProject));
    },
    getContestByIdRequestSuccess: (selectedProject) => {
      dispatch(getContestByIdRequestSuccess(selectedProject));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(MiddleSection)
);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import LeftSection from "../leftSection";
// import ParticipantSection from "./../ParticipantSection";
// import ExpensionMilestone from "../expansionType/ExpensionMilestone";
// Redux
import { onReduxRouteChange } from "../../../../store/action/action";
import { connect } from "react-redux";
class MilestoneFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: 0,
      completed: 0,
      ratio: 0,
      milagePayoutPer: 0,
      milagePayout: 0,
    };
  }
  onPageRedirectHandle = (redirectTo) => {
    this.props.onRouteChange(redirectTo);
    this.props.history.push(redirectTo);
  };

  componentDidMount() {
    let { projectObj } = this.props;

    const noOfTasksLocal = projectObj?.milestoneDetail?.length;
    const completedTasksLocal = projectObj?.milestoneDetail?.filter(
      (item) => item?.milestoneCompleted
    ).length;
    const milagePayoutLocal = projectObj?.milestoneDetail?.filter(
      (item) => item?.milestoneCompleted && item?.releaseDate
    );
    const tasksPerLocal = (completedTasksLocal / noOfTasksLocal) * 100;
    const totalMilagePayout = milagePayoutLocal.reduce(
      (a, b) => +a + +b.milestoneAmount,
      0
    );
    const milagePerLocal =
      (totalMilagePayout / projectObj?.projectAmount) * 100;

    this.setState({
      tasks: noOfTasksLocal,
      completed: completedTasksLocal,
      ratio: tasksPerLocal,
      milagePayoutPer: milagePerLocal,
      milagePayout: totalMilagePayout,
    });
  }

  render() {
    let { projectObj, languageType } = this.props;
    return (
      <>
        <div className="card_box work_card">
          <div className="row justify-content-between">
            <div className="col-md-3">
              <LeftSection projectObj={projectObj} />
            </div>
            <div className="col-md-5">
              <div className="design_work ">
                <h3
                  className="green_text"
                  onClick={() =>
                    this.onPageRedirectHandle(
                      `/milestone-report?projectId=${projectObj?.projectId}&userId=${projectObj?.userId}`
                    )
                  }
                >
                  {projectObj && projectObj.jobTitle}
                </h3>
                <div className="progress_bar">
                  <div className="progress_value">
                    <label>
                      Tasks : <span>{JSON.stringify(this.state.tasks)}</span>
                    </label>
                    <label>
                      Completed :{" "}
                      <span>{JSON.stringify(this.state.completed)}</span>
                    </label>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar blue_bar transition-width "
                      role="progressbar"
                      style={{ width: `${this.state.ratio}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="progress_bar">
                  <div className="progress_value">
                    <label>{languageType.MILESTONE_PAYOUT}</label>
                    <div className="text-center"></div>
                    <small>${this.state.milagePayout}</small>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar green_bar transition-width "
                      role="progressbar"
                      style={{ width: `${this.state.milagePayoutPer}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
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

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(MilestoneFreelancer)
);

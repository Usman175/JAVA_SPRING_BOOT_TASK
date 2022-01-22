import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LeftSection from "../leftSection";
// import ParticipantSection from "./../ParticipantSection";
// Redux
import { onReduxRouteChange } from "../../../../store/action/action";
import { connect } from "react-redux";
import moment from "moment";
import FormatDWH from "../../../../components/formatDWH";

class HourlyFreeLancer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPageRedirectHandle = (redirectTo) => {
    this.props.onRouteChange(redirectTo);
    this.props.history.push(redirectTo);
  };
  render() {
    let { projectObj, languageType } = this.props;
    return (
      <>
        <div className="hourly-freelancer card_box work_card">
          <div className="row justify-content-between">
            <div className="col-md-3">
              {<LeftSection projectObj={projectObj} />}
            </div>
            <div className="col-md-8">
              <div className="hourly-design design_work maxWidth_100">
                <div className="row justify-content-between">
                  <div className="col-md-8">
                    <h2
                      className="green_text font_arial"
                      onClick={() =>
                        this.onPageRedirectHandle(
                          `/contract-detail?projectId=${projectObj.projectId}`
                        )
                      }
                    >
                      {projectObj.jobTitle}
                    </h2>
                  </div>
                  <div className="col-md-4">
                    {/* <ParticipantSection projectObj={projectObj} /> */}
                  </div>
                </div>
                <div className="week_tbl">
                  <table className="table">
                    <thead>
                      <tr>
                        {projectObj?.hourlyDetail?.length > 0 &&
                          projectObj?.hourlyDetail[0]?.dailyTimeLog?.length >
                            0 &&
                          projectObj?.hourlyDetail[0]?.dailyTimeLog?.map(
                            (item) => (
                              <th key={item?.date} scope="col">
                                <span className="main-text d-block">
                                  {moment(item?.date).format("ddd")}
                                </span>{" "}
                                <span className="sub-text">
                                  {moment(item?.date).format("MM/DD")}
                                </span>
                              </th>
                            )
                          )}
                        {/* <th scope="col">
                          <span className="main-text">Mon</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Tue</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Wed</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Thru</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Fri</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Sat</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Sun</span>{" "}
                          <span className="sub-text">7/23</span>
                        </th> */}
                        <th scope="col">
                          <span className="main-text">Hours</span>{" "}
                        </th>
                        <th scope="col">
                          <span className="main-text">Rate</span>
                        </th>
                        <th scope="col">
                          <span className="main-text">Amount</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {projectObj?.hourlyDetail?.length > 0 &&
                          projectObj?.hourlyDetail[0]?.dailyTimeLog?.length >
                            0 &&
                          projectObj?.hourlyDetail[0]?.dailyTimeLog?.map(
                            (item) => (
                              <td className="active" key={item?.date}>
                                {(item?.timeLogged * 1).toFixed(2)}
                              </td>
                            )
                          )}
                        {/* <td className="active">03:45</td>
                        <td className="active">03:45</td>
                        <td className="active">03:45</td>
                        <td className="active"> ... </td>
                        <td className="active">03:45</td> */}
                        {/* <td> </td>
                        <td></td> */}
                        <td style={{ textAlign: "center" }}>
                          {(
                            projectObj?.hourlyDetail &&
                            projectObj?.hourlyDetail[0]?.hoursWorked * 1
                          ).toFixed(2)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {"$"}
                          {(projectObj?.hourlyDetail &&
                            projectObj?.hourlyDetail[0]?.hourlyRate) * 1}
                          / <FormatDWH hr currency={projectObj.currencyCode} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          $
                          {(projectObj?.hourlyDetail &&
                            projectObj?.hourlyDetail[0]?.hoursWorked * 1) *
                            (projectObj?.hourlyDetail &&
                              projectObj?.hourlyDetail[0]?.hourlyRate * 1)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-1 text-right">
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
  connect(mapStateToProps, mapDispatchProps)(HourlyFreeLancer)
);

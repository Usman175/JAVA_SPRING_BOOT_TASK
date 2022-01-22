import React, { Component } from "react";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const reportData = [];

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    const key =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.key
        ? this.props.location.state.key
        : "Thursday, August 16, 2018";
    const index =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.index
        ? this.props.location.state.index
        : 0;

    this.state = {
      currentKey: key,
      currentIndex: index,
      currentReport: reportData[key],
    };
  }

  handleNextReport = () => {
    const { currentReport } = this.state;
    this.setState({
      currentKey: currentReport.next,
      currentReport: reportData[currentReport.next],
    });
  };

  handlePrevReport = () => {
    const { currentReport } = this.state;
    this.setState({
      currentKey: currentReport.prev,
      currentReport: reportData[currentReport.prev],
    });
  };

  render() {
    const { currentKey, currentReport, currentIndex } = this.state;
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post">
                  <div className="work_date text-center">
                    <a title="">
                      <i
                        className={`fa fa-angle-left ${
                          !currentReport.prev ? "text-muted" : ""
                        }`}
                        style={{
                          cursor: !currentReport.prev
                            ? "not-allowed"
                            : "pointer",
                        }}
                        aria-hidden="true"
                        onClick={
                          currentReport.prev ? this.handlePrevReport : null
                        }
                      ></i>
                    </a>
                    <span>{currentKey}</span>
                    <a title="">
                      <i
                        className={`fa fa-angle-right ${
                          !currentReport.next ? "text-muted" : ""
                        }`}
                        style={{
                          cursor: !currentReport.next
                            ? "not-allowed"
                            : "pointer",
                        }}
                        aria-hidden="true"
                        onClick={
                          currentReport.next ? this.handleNextReport : null
                        }
                      ></i>
                    </a>
                  </div>
                  <div className="screen_capture">
                    <img src={currentReport.data[currentIndex].image} alt="" />
                  </div>
                  <div className="work_detail">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="">
                          <label className="green_text">Activity</label>
                        </div>
                        <div className="">
                          <label className="green_text">Memo : </label>
                          <span>
                            Make the identical all functionality for 2
                          </span>
                        </div>
                        <div className="">
                          <label className="green_text">
                            Activity Window:{" "}
                          </label>
                          <span>{currentReport.data[currentIndex].window}</span>
                        </div>
                        <div className="">
                          <label className="green_text">
                            Activity Level :{" "}
                          </label>
                          <span>{currentReport.data[currentIndex].level}</span>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="table-responsive detail_tbl">
                          <table className="table text-center">
                            <thead>
                              <tr>
                                <th scope="col" className="text-left">
                                  Time
                                </th>
                                <th scope="col">Keyboard</th>
                                <th scope="col">Mouse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>42</td>
                                <td>21</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>31</td>
                                <td>21</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>105</td>
                                <td>21</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>21</td>
                                <td>21</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>21</td>
                                <td>21</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>254</td>
                                <td>5</td>
                              </tr>
                              <tr>
                                <td className="text-left">20:10:19 AM</td>
                                <td>21</td>
                                <td>5</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}
function mapDispatchProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(WorkDetail)
);

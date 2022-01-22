import React, { Component } from "react";
import v4 from "uuid";
import { connect } from "react-redux";
import { onReduxSelcteProjectChange } from "../../../store/action/action";
import { withRouter } from "react-router-dom";
import { ProjectTypeConst } from "../../../utils/ProjectConst";

class ExpansionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          epicNo: "#32342",
          epic: "Partition",
          storyData: [
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Requested",
              payment: "Paid",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Acknowledged",
              payment: "Paid",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "In-Progress",
              payment: "Hold",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Ready",
              payment: "Dispute",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Review",
              payment: "Paid",
            },
          ],
        },
        {
          epicNo: "#32342",
          epic: "Partition",
          storyData: [
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Acknowledged",
              payment: "Paid",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Requested",
              payment: "Paid",
            },

            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "In-Progress",
              payment: "Hold",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Ready",
              payment: "Dispute",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Review",
              payment: "Paid",
            },
          ],
        },
        {
          epicNo: "#32342",
          epic: "Partition",
          storyData: [
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "In-Progress",
              payment: "Hold",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Requested",
              payment: "Paid",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Acknowledged",
              payment: "Paid",
            },

            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Ready",
              payment: "Dispute",
            },
            {
              dueDate: "25th April 2020",
              stories: "#234234",
              states: "Review",
              payment: "Paid",
            },
          ],
        },
      ],
      expandedIndex: null,
    };
  }

  onExpansionHandle = (index) => {
    let { expandedIndex } = this.state;
    if (expandedIndex === index) {
      this.setState({ expandedIndex: null });
    } else {
      this.setState({ expandedIndex: index });
    }
  };

  getStoryStates = (states) => {
    if (states === "Requested") {
      return <a className="gray_bg">{states}</a>;
    }
    if (states === "Acknowledged") {
      return <a className="green_bg">{states}</a>;
    }
    if (states === "In-Progress") {
      return <a className="black_bg">{states}</a>;
    }
    if (states === "Ready") {
      return <a className="pink_bg">{states}</a>;
    }
    if (states === "Review") {
      return <a className="orange_bg">{states}</a>;
    }
  };

  getPaymentType = (payment) => {
    if (payment === "Paid") {
      return <a className="darkGreen_font">{payment}</a>;
    }
    if (payment === "Hold") {
      return <a className="blue_bg">{payment}</a>;
    }
    if (payment === "Dispute") {
      return <a className="red_bg">{payment}</a>;
    }
  };

  render() {
    let { data, expandedIndex } = this.state;

    let { projectObj } = this.props;
    let isMilestone,
      isHourly,
      isFreeContract,
      isofficeWork,
      iscontest = false;
    if (projectObj.projectType === ProjectTypeConst.Milestone)
      isMilestone = true;
    if (projectObj.projectType === ProjectTypeConst.Hourly) isHourly = true;
    if (projectObj.projectType === ProjectTypeConst.FreeContract)
      isFreeContract = true;
    if (projectObj.projectType === ProjectTypeConst.OfficeWork)
      isofficeWork = true;
    if (projectObj.projectType === ProjectTypeConst.Contest) iscontest = true;

    return (
      <>
        {/* Milestone Detail */}
        {isMilestone && (
          <>
            <div className="viewMoreDtl">
              <div className="d-flex  justify-content-between align-items-center">
                {" "}
                <h6>
                  <b>Project Name Here</b>
                </h6>
                <p className=" text-right maxWidth_100">View More Detail</p>
              </div>
              <div className="week_tbl weekDtl_tbl">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">Epic No.</th>
                      <th scope="col">Epic</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Stories</th>
                      <th scope="col">States</th>
                      <th scope="col">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.length > 0 &&
                      data.map((epicData, epicIdx) => (
                        <tr key={`${v4()}`}>
                          <td>{epicData.epicNo}</td>
                          <td>
                            {epicData.epic}{" "}
                            <button
                              className="table-colleps-btn"
                              onClick={() => this.onExpansionHandle(epicIdx)}
                            >
                              <span className="plus-minus">
                                {epicIdx === expandedIndex ? "-" : "+"}
                              </span>
                            </button>{" "}
                          </td>
                          <td colSpan="4">
                            <div
                              className={
                                epicIdx === expandedIndex
                                  ? "milestone-inner-table-main-div expanded"
                                  : "milestone-inner-table-main-div "
                              }
                            >
                              <table className={"table text-center  "}>
                                <tbody>
                                  {epicData &&
                                    epicData.storyData &&
                                    epicData.storyData.length > 0 &&
                                    epicData.storyData.map(
                                      (storyObj, storyIndex) => (
                                        <tr key={`${v4()}`}>
                                          <td>{storyObj.dueDate}</td>
                                          <td>{storyObj.stories} </td>
                                          <td>
                                            {this.getStoryStates(
                                              storyObj.states
                                            )}
                                          </td>
                                          <td>
                                            {this.getPaymentType(
                                              storyObj.payment
                                            )}{" "}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Hourly Detail */}
        {isHourly && (
          <>
            <div className="d-flex member_detail">
              <div className="client_rating">
                <div className="d-flex align-items-center">
                  <span>J</span>
                  <p className="client_text">Mr. Criket</p>
                </div>
              </div>
              <div className="table-responsive detail_tbl member_tbl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        MON<span>7/23</span>
                      </th>
                      <th scope="col">
                        TUE<span>7/23</span>
                      </th>
                      <th scope="col">
                        WED<span>7/23</span>
                      </th>
                      <th scope="col">
                        THU<span>7/23</span>
                      </th>
                      <th scope="col">
                        FRI<span>7/23</span>
                      </th>
                      <th scope="col">
                        SAT<span>7/23</span>
                      </th>
                      <th scope="col">
                        SUN<span>7/23</span>
                      </th>
                      <th scope="col">HOURS</th>
                      <th scope="col">RATE</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">---</td>
                      <td className="bg_gray">03:45</td>
                      <td></td>
                      <td></td>
                      <td>23:45</td>
                      <td>$10.00/hr</td>
                      <td>$2,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex member_detail">
              <div className="client_rating">
                <div className="d-flex align-items-center">
                  <span className="freelancer_img">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/freelancer_img2.png"
                      alt=""
                    />
                  </span>
                  <p className="client_text">Mr. Criket</p>
                </div>
              </div>
              <div className="table-responsive detail_tbl member_tbl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        MON<span>7/23</span>
                      </th>
                      <th scope="col">
                        TUE<span>7/23</span>
                      </th>
                      <th scope="col">
                        WED<span>7/23</span>
                      </th>
                      <th scope="col">
                        THU<span>7/23</span>
                      </th>
                      <th scope="col">
                        FRI<span>7/23</span>
                      </th>
                      <th scope="col">
                        SAT<span>7/23</span>
                      </th>
                      <th scope="col">
                        SUN<span>7/23</span>
                      </th>
                      <th scope="col">HOURS</th>
                      <th scope="col">RATE</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">---</td>
                      <td className="bg_gray">03:45</td>
                      <td></td>
                      <td></td>
                      <td>23:45</td>
                      <td>$10.00/hr</td>
                      <td>$2,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex member_detail">
              <div className="client_rating">
                <div className="d-flex align-items-center">
                  <span className="freelancer_img">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/freelancer_img.png"
                      alt=""
                    />
                  </span>
                  <p className="client_text">Mr. Criket</p>
                </div>
              </div>
              <div className="table-responsive detail_tbl member_tbl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        MON<span>7/23</span>
                      </th>
                      <th scope="col">
                        TUE<span>7/23</span>
                      </th>
                      <th scope="col">
                        WED<span>7/23</span>
                      </th>
                      <th scope="col">
                        THU<span>7/23</span>
                      </th>
                      <th scope="col">
                        FRI<span>7/23</span>
                      </th>
                      <th scope="col">
                        SAT<span>7/23</span>
                      </th>
                      <th scope="col">
                        SUN<span>7/23</span>
                      </th>
                      <th scope="col">HOURS</th>
                      <th scope="col">RATE</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">03:45</td>
                      <td className="bg_gray">---</td>
                      <td className="bg_gray">03:45</td>
                      <td></td>
                      <td></td>
                      <td>23:45</td>
                      <td>$10.00/hr</td>
                      <td>$2,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Free Contract Detail */}
        {isFreeContract && <></>}

        {/* Office Work Detail */}
        {isofficeWork && (
          <>
            <div className="terms_box">
              <div className="myContest">
                <div className="work_date save_cancel">
                  <span>Terms</span>
                </div>
                <div className="hourly_rate">
                  <div className="d-flex align-items-center">
                    <label className="titleBold">Location : </label>
                    <span>unit 234, Medi Street, Vitoria Australia</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <label className="titleBold">Attendance : </label>
                    <span>3 days per wee</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <label className="titleBold">Equipment : </label>
                    <span>Provided by project owner</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <label className="titleBold">Weekend Rate : </label>
                    <span>Saturday: 150% </span>
                    <span>Sundady: 200%</span>
                  </div>
                </div>
              </div>
              <div className="work_date">
                <a title="">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </a>
                <span>13th April ~ 18th April 2020</span>
                <a title="">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="week_tbl">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th className="text-left" scope="col">
                        3/7
                      </th>
                      <th scope="col">Mon</th>
                      <th scope="col">Tue</th>
                      <th scope="col">Wed</th>
                      <th scope="col">Thur</th>
                      <th scope="col">Fri</th>
                      <th scope="col" className="red_text">
                        Sat
                      </th>
                      <th scope="col" className="red_text">
                        Sun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left"></td>
                      <td>13/4</td>
                      <td>13/4</td>
                      <td>13/4</td>
                      <td>13/4</td>
                      <td>13/4</td>
                      <td>13/4</td>
                      <td>13/4</td>
                    </tr>
                    <tr>
                      <td className="text-left">Sonny</td>
                      <td>
                        <span className="green_dot"></span>
                      </td>
                      <td></td>
                      <td>
                        <span className="green_dot"></span>
                      </td>
                      <td></td>
                      <td>
                        <span className="green_dot"></span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Contest Detail */}
        {iscontest && (
          <>
            {projectObj && projectObj.projectStatus === "Completed" ? (
              <div className="progress_value award_value d-flex align-items-center">
                <label>
                  {" "}
                  1st Award<span>US$2,000.00</span>{" "}
                </label>
                <label>
                  {" "}
                  2nd Award<span>US$1,000.00</span>{" "}
                </label>
                <label>
                  {" "}
                  3rd Award<span>US$1,000.00</span>{" "}
                </label>
              </div>
            ) : (
              <div className="logo_character">
                <h5>Logo Character :</h5>
                <div className="row justify-content-between">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center custom_range">
                      <label>Male</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange"
                        />
                      </div>
                      <label>Female</label>
                    </div>
                    <div className="d-flex align-items-center custom_range">
                      <label>Young</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange2"
                        />
                      </div>
                      <label>Mutual</label>
                    </div>
                    <div className="d-flex align-items-center custom_range">
                      <label>Modern</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange3"
                        />
                      </div>
                      <label>Classic</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center custom_range">
                      <label>Luxury</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange4"
                        />
                      </div>
                      <label>Public</label>
                    </div>
                    <div className="d-flex align-items-center custom_range">
                      <label>Simple</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange5"
                        />
                      </div>
                      <label>Complex</label>
                    </div>
                    <div className="d-flex align-items-center custom_range">
                      <label>Abstract</label>
                      <div className="range_slider">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="20"
                          className="slider"
                          id="myRange6"
                        />
                      </div>
                      <label>Abstract</label>
                    </div>
                  </div>
                </div>
                <div className="logo_type">
                  <h5>Preferred Logo Type</h5>
                  <div className="preferred">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          <img
                            src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                            alt=""
                          />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck2"
                        >
                          <img
                            src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                            alt=""
                          />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck3"
                        >
                          <img
                            src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                            alt=""
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <h5>Slogun: My First Dream Company</h5>
                  <div className="creative_logo">
                    <h5>Description</h5>
                    <p>
                      I need a creative logo. Do not copy exisiting logos pls
                    </p>
                    <div className="upload_file">
                      <label htmlFor="exampleFormControlFile1">
                        <a>
                          <i
                            className="fa fa-cloud-download"
                            aria-hidden="true"
                          ></i>{" "}
                          sampleImage.jpg{" "}
                        </a>
                      </label>
                    </div>
                    <div className="post_modal">
                      <div className="save_cancel">
                        <button type="submit" className="btn cancel_btn">
                          Modify{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
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
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(ExpansionSection)
);

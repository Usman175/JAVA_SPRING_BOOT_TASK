import React, { Component } from "react";
import { connect } from "react-redux";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import Pagenation from "../../../components/pagenation";

import { PauseModal } from "../../../components/modals/pauseModal";
import { EndContract } from "../../../components/modals/endContract";
import { DisputeTime } from "../../../components/modals/disputeTime";
import { CreateMilelage } from "../../../components/modals/createMilelage";
import { JungleModal } from "../../../components/modals/jungleModal";
import { UserView } from "../../../components/freelancer/userView";
import {
  getUserProjectDetails,
  getProjectContractDetail,
} from "../../../store/middlewares/Project";
import LoginRequired from "../../../components/modals/loginRequired";
import Skeleton from "../../../components/skeleton/skeleton";
import moment from "moment";

class MileStoneMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionUserType: sessionStorage.getItem("userType"),
      activeTab: 1,
      isReportTableViewActive: false,
      loading:false
    };
  }
  onTabChangeHandle = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };

  onReportViewChange = () => {
    let { isReportTableViewActive } = this.state;
    this.setState({
      isReportTableViewActive: !isReportTableViewActive,
    });
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    console.log(this.props.authUser, "this.props.authUser.myAuth.id");
    this.props.getProjectContractDetailByFreelancerId({
      projectId: params.get("projectId"),
      freelancerUserId:
        params.get("userId") || this.props.authUser.myAuth.user.userId,
    });

    this.props.getProjectDetailByUserIdAndProjectId({
      projectId: params.get("projectId"),
      userId: params.get("userId") || this.props.authUser.myAuth.id,
    });
  }

  render() {
    let {
      languageType,
      authUser,
      userProjectDetails,
      
      projectContractDetail,
    } = this.props;
    let { activeTab, isReportTableViewActive,loading } = this.state;

    return (
      <>
        {authUser.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-9 col-md-8">
                  <div className="project_post invoice_tab work_card">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li
                        className="nav-item"
                        onClick={() => this.onTabChangeHandle(1)}
                      >
                        <a
                          className={
                            activeTab === 1 ? "nav-link active" : "nav-link"
                          }
                        >
                          Milelage{" "}
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.onTabChangeHandle(2)}
                      >
                        <a
                          className={
                            activeTab === 2 ? "nav-link active" : "nav-link"
                          }
                        >
                          Work Report{" "}
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.onTabChangeHandle(3)}
                      >
                        <a
                          className={
                            activeTab === 3 ? "nav-link active" : "nav-link"
                          }
                        >
                          Contract Detail{" "}
                        </a>
                      </li>
                    </ul>
                    {loading ? (
                      <Skeleton count={1} isSkeletonLoading={loading} />
                    ) : (
                      <div
                        className="tab-content workDiary_tab"
                        id="pills-tabContent"
                      >
                        <div
                          className={
                            activeTab === 1
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                        >
                          <UserView
                            userProjectDetails={userProjectDetails}
                            projectContractDetail={projectContractDetail}
                            history={this.props.history}
                          />
                          <div className="hourly_limit">
                            <div className="position_rel">
                              <h4 className="w-100"></h4>
                            </div>
                            <div
                              className="collapse show"
                              id="collapseExample2"
                            >
                              <div className="work_hours">

                                <div className="row justify-content-between">
                                  <div className="col-md-4">
                                    <div className="row">
                                      <div className="col-6">
                                        <span>Budget</span>
                                        <label className="green_text">
                                          {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$50
                                          {
                                            userProjectDetails?.projectResponse
                                              ?.projectAmount
                                          }
                                        </label>
                                      </div>
                                      <div className="col-6">
                                        <span>In Escrow</span>
                                        <label className="green_text">
                                          {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */}  US$
                                          20.00
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="row">
                                      <div className="col-6">
                                        <span>Milestone Paid</span>
                                        <label className="green_text">
                                          {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$
                                          {projectContractDetail?.releasedAmount ||
                                            0}
                                        </label>
                                      </div>
                                      <div className="col-6">
                                        <span>Remaining</span>
                                        <label className="green_text">
                                          {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$ 80
                                          {/* {projectContractDetail?.offerAmount -
                                            projectContractDetail?.releasedAmount} */}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="total_earn">
                                      <span>Total Payments</span>
                                      <label className="green_text">
                                        {/* {userProjectDetails?.projectResponse
                                          ?.currencyCode + " "} */} US$
                                        {/* {projectContractDetail?.releasedAmount} */} 500
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="current_milston">
                                  <div className="row align-items-center">
                                    <div className="col-sm-8">
                                      <div className="escrow">
                                        <span>Current Milestone</span>
                                      </div>
                                      <div className="escrow">
                                        <span>Task Key :</span>{" "}
                                        <span>NYA4</span>
                                      </div>
                                      <div className="escrow">
                                        <span>In Escrow: $20.00</span>
                                      </div>
                                    </div>

                                    {this.state.sessionUserType ===
                                      "Freelancer" && (
                                      <div className="col-sm-4 text-right">
                                        <div className="save_cancel">
                                          <JungleModal
                                            dialogClassName="jungle-modal"
                                            contentClassName="jungle-modal-content"
                                            customClose
                                            Body={CreateMilelage}
                                            OpenButton={({ handleClick }) => (
                                              <button
                                                type="button"
                                                className="btn save_btn"
                                                onClick={handleClick}
                                              >
                                                Create New Milestone
                                              </button>
                                            )}
                                            title="Create Milestone"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="task_manage milestone_tble">
                                  <div className="table-responsive detail_tbl">
                                    <table className="table text-center">
                                      <thead>
                                        <tr>
                                          <th scope="col" className="text-left">
                                            Milestone
                                          </th>
                                          <th scope="col">Created Date</th>
                                          <th scope="col">Due Date</th>
                                          <th scope="col">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                            
                                            <tr>
                                              <td
                                                className="text-left"
                                                style={{ maxWidth: 200 }}
                                              >
                                                UI Design completion 
                                              </td>
                                              <td>
                                                 2021/12/08
                                                {/* {moment(
                                                  milestone?.milestoneDateTime
                                                ).format("YYYY MMM DD")} */}
                                              </td>
                                              <td>
                                              2021/12/28
                                                {/* {moment(
                                                  milestone?.milestoneDueDate
                                                ).format("YYYY MMM DD")} */}
                                              </td>
                                              <td>
                                                US$600
                                                {/* {userProjectDetails
                                                  ?.projectResponse
                                                  ?.currencyCode + " "}
                                                {milestone?.milestoneAmount} */}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                className="text-left"
                                                style={{ maxWidth: 200 }}
                                              >
                                                Api implementation
                                              </td>
                                              <td>
                                                 2021/12/28
                                                {/* {moment(
                                                  milestone?.milestoneDateTime
                                                ).format("YYYY MMM DD")} */}
                                              </td>
                                              <td>
                                              2022/02/12
                                                {/* {moment(
                                                  milestone?.milestoneDueDate
                                                ).format("YYYY MMM DD")} */}
                                              </td>
                                              <td>
                                                US$1800
                                                {/* {userProjectDetails
                                                  ?.projectResponse
                                                  ?.currencyCode + " "}
                                                {milestone?.milestoneAmount} */}
                                              </td>
                                            </tr>
                                        {userProjectDetails?.projectDetailResponse?.milestoneDetail?.map(
                                          (milestone) => (
                                            <tr>
                                              <td
                                                className="text-left"
                                                style={{ maxWidth: 200 }}
                                              >
                                                {
                                                  milestone?.milestoneDescription
                                                }
                                              </td>
                                              <td>
                                                {moment(
                                                  milestone?.milestoneDateTime
                                                ).format("YYYY MMM DD")}
                                              </td>
                                              <td>
                                                {moment(
                                                  milestone?.milestoneDueDate
                                                ).format("YYYY MMM DD")}
                                              </td>
                                              <td>
                                                {userProjectDetails
                                                  ?.projectResponse
                                                  ?.currencyCode + " "}
                                                {milestone?.milestoneAmount}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                  
                              </div>
                            </div>
                          </div>
                          <div className="hourly_limit">
                            <div className="position_rel">
                              <h4>
                                <span className="viewDetail">
                                  <a
                                    className="plus_btn"
                                    data-toggle="collapse"
                                    href="#collapseExample3"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="collapseExample3"
                                  >
                                    +
                                  </a>
                                </span>
                              </h4>
                            </div>
                            <div
                              className="collapse show"
                              id="collapseExample3"
                            >
                              <div className="task_manage post_modal post_form">
                                <div className="save_cancel d-flex align-items-center">
                                  <label className="green_text">
                                    Task Management
                                  </label>
                                  <button
                                    type="button"
                                    className="btn gray_btn"
                                  >
                                    Issue new task
                                  </button>
                                </div>

                                <div className="table-responsive detail_tbl">
                                  <table className="table text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col" className="text-left">
                                          Task
                                        </th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Key</th>
                                        <th scope="col">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-left">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck19"
                                              required=""
                                              checked
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck19"
                                            >
                                              Login
                                            </label>
                                          </div>
                                        </td>
                                        <td>Completed</td>
                                        <td>NYA1</td>
                                        <td>03:45</td>
                                      </tr>
                                      <tr>
                                        <td className="text-left">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck20"
                                              required=""
                                              checked
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck20"
                                            >
                                              Forgot Password
                                            </label>
                                          </div>
                                        </td>
                                        <td>Completed</td>
                                        <td>NYA2</td>
                                        <td>03:45</td>
                                      </tr>
                                      <tr>
                                        <td className="text-left">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck21"
                                              required=""
                                              checked
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck21"
                                            >
                                              Search
                                            </label>
                                          </div>
                                        </td>
                                        <td>Completed</td>
                                        <td>NYA3</td>
                                        <td>03:45</td>
                                      </tr>
                                      <tr>
                                        <td className="text-left">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck22"
                                              required=""
                                              checked
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck22"
                                            >
                                              Push notification
                                            </label>
                                          </div>
                                        </td>
                                        <td>Completed</td>
                                        <td>NYA4</td>
                                        <td>03:45</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <Pagenation
                                items={new Array(25)}
                                onChangePage={() => {}}
                                initialPage={1}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeTab === 2
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                        >
                          <UserView
                            userProjectDetails={userProjectDetails}
                            projectContractDetail={projectContractDetail}
                            history={this.props.history}
                          />
                          <div className="task_manage milestone_tble">
                            <div className="table-responsive detail_tbl">
                              <table className="table text-center">
                                <thead>
                                  <tr>
                                    <th scope="col" className="text-left">
                                      Milestone
                                    </th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Complete Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Submitted Work</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(
                                    projectContractDetail?.releasedAmount &&
                                    JSON.parse(
                                      projectContractDetail?.milestones
                                    )
                                  )?.map((milestone) => (
                                    <tr>
                                      <td
                                        className="text-left"
                                        style={{ maxWidth: 200 }}
                                      >
                                        {milestone?.milestoneDescription}
                                      </td>

                                      <td>
                                        {moment(
                                          milestone?.milestoneDueDate
                                        ).format("YYYY MMM DD")}
                                      </td>
                                      <td>
                                        {moment(
                                          milestone?.submittedDateTime
                                        ).format("YYYY MMM DD")}
                                      </td>
                                      <td>
                                        {userProjectDetails?.projectResponse
                                          ?.currencyCode + " "}
                                        {milestone?.milestoneAmount}
                                      </td>
                                      <td>
                                        {userProjectDetails?.projectResponse
                                          ?.currencyCode + " "}
                                        {milestone?.releaseAmount || 0}
                                      </td>
                                      <td>
                                        {/* {milestone?.submittedDocument && ( */}
                                        <a
                                          href={milestone?.submittedDocument}
                                          target="_blank"
                                          style={{ color: "#669900" }}
                                        >
                                          <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-paperclip"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"
                                            />
                                          </svg>
                                        </a>
                                        {/* )} */}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="hourly_limit">
                            <div className="position_rel">
                              <h4>
                                <span className="viewDetail">
                                  <a
                                    className="plus_btn"
                                    data-toggle="collapse"
                                    // href="#collapseExample"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="collapseExample"
                                  >
                                    +
                                  </a>
                                </span>
                              </h4>
                            </div>
                            <div className="collapse show" id="collapseExample">
                              <div className="pause_dispute">
                                <div className="row">
                                  <div className="col-md-7">
                                    <div className="tracked_div">
                                      <label>Total: 1:20hrs</label>
                                      <span>
                                        <span className="blue_box"></span>
                                        Tracked 1: 20hrs
                                      </span>
                                      <span>
                                        <span className="red_box"></span>Manual
                                        1: 20hrs
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-5 text-right post_modal">
                                    <div className="save_cancel">
                                      <button
                                        type="button"
                                        className="btn white_btn"
                                      >
                                        Pause
                                      </button>
                                      <button
                                        type="button"
                                        className="btn gray_btn"
                                      >
                                        Dispute Hours
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="tracked_div candidate_reg">
                                <label>Activity</label>
                                <span>New Candidate Registration</span>
                                <span>92%</span>
                                <span>
                                  <button className="grid-list">
                                    <div className="icon">
                                      <div className="dots">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                      </div>
                                      <div className="lines">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                      </div>
                                    </div>
                                    <div className="text">
                                      <span>Grid</span>
                                      <span>List</span>
                                    </div>
                                  </button>
                                </span>
                              </div>

                              <div className="table-responsive post_form work_diary">
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <th scope="col">7am</th>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck1"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck1"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck2"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck2"
                                            >
                                              7:00 am
                                            </label>
                                            <span>49%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck3"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck3"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck4"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck4"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck5"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck5"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck6"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck6"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="col">7am</th>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            class="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div class="d-flex align-items-center justify-content-between">
                                          <div class="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              class="custom-control-input"
                                              id="customcheck7"
                                              required=""
                                            />
                                            <label
                                              class="custom-control-label"
                                              for="customcheck7"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck8"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck8"
                                            >
                                              7:00 am
                                            </label>
                                            <span>49%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck9"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck9"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck10"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck10"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck11"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck11"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <a href="" title="">
                                          <img
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/capture-view.png"}
                                            alt=""
                                          />
                                          <i
                                            className="fa fa-search-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customcheck12"
                                              required=""
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customcheck12"
                                            >
                                              7:00 am
                                            </label>
                                            <span>92%</span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="collapse show" id="collapseExample">
                              <Pagenation
                                items={new Array(25)}
                                onChangePage={() => {}}
                                initialPage={1}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeTab === 3
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                        >
                          <UserView
                            userProjectDetails={userProjectDetails}
                            projectContractDetail={projectContractDetail}
                            history={this.props.history}
                          />
                          <div className="hourly_limit post_form hourly_report">
                            <div className="position_rel">
                              <h4 className="w-100"></h4>
                            </div>
                            <div
                              className="collapse show"
                              id="collapseExample4"
                            >
                              <div className="work_date">
                                <a href="#" title="">
                                  <i
                                    className="fa fa-angle-left"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <span>Thursday, August 16, 2018</span>
                                <a href="#" title="">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                              <div className="hourly_rate basic_font">
                                <div className="row align-items-end">
                                  <div className="col-md-8">
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Rate:
                                      </label>
                                      <span className="rate_box">$6.00</span>
                                      <span>Per Hour</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Weekly Limit :
                                      </label>
                                      <span className="rate_box">40</span>
                                      <span>Per Hour</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl feedbk_lbl_manualTimeMobile">
                                        <i
                                          className="fa fa-question-circle"
                                          aria-hidden="true"
                                        ></i>
                                        Manual Time :
                                      </label>
                                      <span className="rate_box">Allowed</span>
                                      <span className="d-flex justify-content-center align-items-center">
                                        <a href="#">
                                          <i
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Offer Amount:
                                      </label>
                                      <span>
                                        {projectContractDetail?.offerAmount}
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Start Date:
                                      </label>
                                      <span>
                                        {moment(
                                          projectContractDetail?.finalizedDateTime
                                        ).format("DD MMM YYYY")}
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Hired By :
                                      </label>
                                      <span>
                                        {projectContractDetail?.clientUserId}
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <label className="green_text feedbk_lbl">
                                        Contract ID:
                                      </label>
                                      <span>
                                        {projectContractDetail?.contractCode}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="save_cancel">
                                      <button
                                        type="button"
                                        className="btn save_btn"
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="work_detail contract_detail">
                                <h5>View History of Contract Changes</h5>
                                <div className="contract_tbl">
                                  <div className="table-responsive detail_tbl">
                                    <table className="table text-center">
                                      <thead>
                                        <tr>
                                          <th scope="col" className="text-left">
                                            Date Time
                                          </th>
                                          <th scope="col" className="text-left">
                                            Description
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="text-left">
                                            21. Aug 2018
                                          </td>
                                          <td className="text-left">
                                            Increased hourly rate from $5 to $6
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="text-left">
                                            21. Aug 2018
                                          </td>
                                          <td className="text-left">
                                            Manual Time is disallowed
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="text-left">
                                            21. Aug 2018
                                          </td>
                                          <td className="text-left">
                                            Increased hourly rate from $5 to $6
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="text-left">
                                            21. Aug 2018
                                          </td>
                                          <td className="text-left">
                                            Increased hourly rate from $5 to $6
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <Pagenation
                                    items={new Array(25)}
                                    onChangePage={() => {}}
                                    initialPage={1}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <RightTop />
                  <RightBottom />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <LoginRequired defaultOpen={true} />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    activeRoute: state.routeStore.activeRoute,
    userProjectDetails: state.projectStore?.userProjectDetails?.data,
    projectContractDetail:
      state.projectStore?.userProjectContractDetails?.data &&
      state.projectStore?.userProjectContractDetails?.data[0],
    authUser: state.authReducer,
    loading: state.projectStore?.getUserProjectDetailPending,
  };
}

function mapDispatchProps(dispatch) {
  return {
    getProjectDetailByUserIdAndProjectId: ({ projectId, userId }) => {
      dispatch(getUserProjectDetails({ projectId, userId }));
    },
    getProjectContractDetailByFreelancerId: ({
      projectId,
      freelancerUserId,
    }) => {
      dispatch(getProjectContractDetail({ projectId, freelancerUserId }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(MileStoneMain);

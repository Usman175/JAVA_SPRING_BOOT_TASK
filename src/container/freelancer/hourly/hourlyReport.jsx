import React, { Component } from "react";
import "./hourly.scss";
class HourlyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }
  onTabChangeHandle = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };
  render() {
    let { activeTab } = this.state;

    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-12 col-md-2"></div>
              <div className="col-12 col-md-8">
                <div className="project_post invoice_tab work_card contract-detail-page">
                  <ul className="nav nav-pills">
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChangeHandle(1)}
                    >
                      <a
                        className={
                          activeTab === 1 ? "nav-link active" : "nav-link"
                        }
                      >
                        Time & Payments
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
                        Work Report
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
                        Contract Detail
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content workDiary_tab">
                    <div
                      className={
                        activeTab === 1
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                    >
                      <div className="pause_end">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="media align-items-center">
                              <div className="media-left d-flex align-items-center justify-content-center">
                                <img
                                  className="image-placement-contract"
                                  src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                />
                                {/* <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                ></i> */}
                              </div>
                              <div className="media-body post_modal">
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
                                    End Contract
                                  </button>
                                </div>
                                <h5>Asim Ali</h5>
                                <p className="green_text">Working Now</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-right">
                            <h6>Unpaid Amount</h6>
                            <label className="green_text">$230.00</label>
                            <div className="save_cancel">
                              <button type="button" className="btn save_btn">
                                Pay
                              </button>
                              <button type="button" className="btn cancel_btn">
                                Dispute
                              </button>
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
                                href="#collapseExample2"
                                role="button"
                                aria-expanded="true"
                                aria-controls="collapseExample2"
                              >
                                +
                              </a>
                            </span>
                          </h4>
                        </div>
                        <div className="collapse show" id="collapseExample2">
                          <div className="work_hours">
                            <div className="row justify-content-between">
                              <div className="col-md-4">
                                <div className="row">
                                  <div className="col-6">
                                    <span>Last 24hrs</span>
                                    <label className="green_text">
                                      9: 30 hrs
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <span>This week</span>
                                    <label className="green_text">
                                      9: 30 hrs
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="row">
                                  <div className="col-6">
                                    <span>Last Week</span>
                                    <label className="green_text">
                                      9: 30 hrs
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <span>Since Start</span>
                                    <label className="green_text">
                                      9: 30 hrs
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="range_chart">
                              <img
                                className="w-100"
                                style={{ height: "150px" }}
                                src="../../img/chart.png"
                                alt=""
                              />
                            </div>
                            <div className="contract-profile-detail-period">
                              <div className="row">
                                <div className="col-12 col-md-3 col-lg-2">
                                  <div className="profile-detail">
                                    <img
                                      className="image-placement-contract"
                                      src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                    />
                                    <div className="profile-detail-content">
                                      <h4>Asim Ali</h4>
                                      <p>A team</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-9  col-lg-10">
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
                        <div className="collapse show" id="collapseExample3">
                          <div className="task_manage post_modal post_form">
                            <div className="save_cancel d-flex align-items-center">
                              <label className="green_text">
                                Task Management
                              </label>
                              <button type="button" className="btn gray_btn">
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
                          <ul className="pagination justify-content-center mt-3 mb-3">
                            <li className=" page-item disabled">
                              <a className="page-link">First</a>
                            </li>
                            <li className=" page-item disabled">
                              <a className="page-link">Previous</a>
                            </li>
                            <li className=" page-item active">
                              <a className="page-link">1</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">2</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Next</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Last</a>
                            </li>
                          </ul>
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
                      <div className="pause_end">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="media align-items-center">
                              <div className="media-left d-flex align-items-center justify-content-center">
                                <img
                                  className="image-placement-contract"
                                  src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                />
                                {/* <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                ></i> */}
                              </div>
                              <div className="media-body post_modal">
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
                                    End Contract
                                  </button>
                                </div>
                                <h5>Asim Ali</h5>
                                <p className="green_text">Working Now</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-right">
                            <h6>Unpaid Amount</h6>
                            <label className="green_text">$230.00</label>
                            <div className="save_cancel">
                              <button type="button" className="btn save_btn">
                                Pay
                              </button>
                              <button type="button" className="btn cancel_btn">
                                Dispute
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hourly_limit post_form hourly_report">
                        <div className="position_rel">
                          <h4>
                            <span className="viewDetail">
                              <a
                                className="plus_btn"
                                data-toggle="collapse"
                                href="#collapseExample"
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
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="work_date">
                                <a title="">
                                  <i
                                    className="fa fa-angle-left"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <span>Thursday, August 16, 2018</span>
                                <a title="">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <select className="form-control world_select">
                                <option>My Local Time</option>
                                <option>USD</option>
                              </select>
                            </div>
                          </div>
                          <div className="pause_dispute">
                            <div className="row">
                              <div className="col-md-7">
                                <div className="tracked_div">
                                  <label>Total: 1:20hrs</label>
                                  <span>
                                    <span className="blue_box"></span>Tracked 1:
                                    20hrs
                                  </span>
                                  <span>
                                    <span className="red_box"></span>Manual 1:
                                    20hrs
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-5 text-right">
                                <div className="candidate_reg">
                                  <button className="grid-list ml-auto">
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
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="task_manage post_modal">
                            <div className="detail_tbl check_tble">
                              <table className="table text-center">
                                <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Task</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Activity</th>
                                    <th scope="col">Active Window</th>
                                    <th scope="col">Activity Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="selected">
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck1"
                                            required=""
                                            checked
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck1"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>
                                      <a className="tool_tip blue_text">
                                        <b>70%</b>
                                        <span>
                                          This indicates the average activity in
                                          Key board and mouse movement
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="red_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck7"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck7"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>
                                      <a className="tool_tip red_text">
                                        <b>92%</b>
                                        <span>
                                          This indicates the low activity in Key
                                          board and mouse movement
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
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
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <ul className="pagination justify-content-center mt-3 mb-3">
                            <li className=" page-item disabled">
                              <a className="page-link">First</a>
                            </li>
                            <li className=" page-item disabled">
                              <a className="page-link">Previous</a>
                            </li>
                            <li className=" page-item active">
                              <a className="page-link">1</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">2</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Next</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Last</a>
                            </li>
                          </ul>
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
                      <div className="pause_end">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="media align-items-center">
                              <div className="media-left d-flex align-items-center justify-content-center">
                                <img
                                  className="image-placement-contract"
                                  src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                />
                                {/* <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                ></i> */}
                              </div>
                              <div className="media-body post_modal">
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
                                    End Contract
                                  </button>
                                </div>
                                <h5>Asim Ali</h5>
                                <p className="green_text">Working Now</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-right">
                            <h6>Unpaid Amount</h6>
                            <label className="green_text">$230.00</label>
                            <div className="save_cancel">
                              <button type="button" className="btn save_btn">
                                Pay
                              </button>
                              <button type="button" className="btn cancel_btn">
                                Dispute
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hourly_limit post_form hourly_report">
                        <div className="position_rel">
                          <h4>
                            <span className="viewDetail">
                              <a
                                className="plus_btn"
                                data-toggle="collapse"
                                href="#collapseExample4"
                                role="button"
                                aria-expanded="true"
                                aria-controls="collapseExample4"
                              >
                                +
                              </a>
                            </span>
                          </h4>
                        </div>
                        <div className="collapse show" id="collapseExample4">
                          <div className="work_date">
                            <a title="">
                              <i
                                className="fa fa-angle-left"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <span>Thursday, August 16, 2018</span>
                            <a title="">
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
                                  <span>
                                    <a>
                                      <i
                                        className="fa fa-pencil"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Start Date:
                                  </label>
                                  <span>12 August 2018</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Hired By :
                                  </label>
                                  <span>Client ID</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Contract ID:
                                  </label>
                                  <span>H90273423</span>
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
                              <ul className="pagination justify-content-center mt-3 mb-3">
                                <li className=" page-item disabled">
                                  <a className="page-link">First</a>
                                </li>
                                <li className=" page-item disabled">
                                  <a className="page-link">Previous</a>
                                </li>
                                <li className=" page-item active">
                                  <a className="page-link">1</a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link">2</a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link">Next</a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link">Last</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default HourlyReport;

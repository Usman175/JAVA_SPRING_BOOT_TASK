import React, { Component } from "react";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";

class ProjectBlog extends Component {
  render() {
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="card_box pointer_none translate_box">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 left_card">
                      <h3 className="green_text">
                        Translation : Korean to English
                      </h3>
                    </div>
                    <div className="col-md-4 right_card">
                      <div className="project_detail">
                        <div className="d-flex justify-content-between project_no">
                          <a title="">Project No.: 20918240192384</a>
                          <a title="">2018.08.02</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card_box pointer_none accordion_box">
                  <div id="accordion">
                    <div className="collapse_box">
                      <div
                        className="card_header d-flex align-items-center"
                        id="headingOne"
                      >
                        <small>6</small>
                        <h6>Q</h6>
                        <p>
                          I have a question. what is Simple like? why you are
                          being such an asshole for this? I really want to
                          know...
                        </p>
                        <span>11</span>
                        <button
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          +
                        </button>
                      </div>

                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <h5>Fixed-Price Protection</h5>
                          <ul className="vcv-timeline">
                            <li
                              className="vcv-timeline-item blue_step"
                              data-step="1"
                              data-step-title="Download"
                            >
                              <a>Go to the Accounts Menu</a>
                            </li>
                            <li
                              className="vcv-timeline-item bluedark_step"
                              data-step="2"
                            >
                              <a>
                                Choose <br />
                                Setting
                              </a>
                            </li>
                            <li
                              className="vcv-timeline-item orange_step"
                              data-step="3"
                            >
                              <a>Click Billing Methods</a>
                            </li>
                            <li className="vcv-timeline-item" data-step="4">
                              <a>Click the Add Billing Method button</a>
                            </li>
                          </ul>
                          <p>
                            It's pretty straightforward—clients should only pay
                            for hours worked, and freelancers should be paid for
                            their time spent working. This program uses the
                            following tools to help ensure that, on hourly
                            projects, an hour worked is an hour paid, and an
                            hour paid is an hour worked
                          </p>
                          <p>
                            Work Diary: For every hourly contract, clients can
                            confirm work was completed by checking their
                            freelancer's Work Diary to see
                          </p>
                          <div className="save_cancel text-right">
                            <button type="submit" className="btn cancel_btn">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="collapse_box">
                      <div
                        className="card_header d-flex align-items-center"
                        id="headingTwo"
                      >
                        <small>5</small>
                        <h6>Q</h6>
                        <p>
                          I have a question. what is Simple like? why you are
                          being such an asshole for this? I really want to
                          know...
                        </p>
                        <span>11</span>
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          +
                        </button>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <h5>Fixed-Price Protection</h5>
                          <ul className="vcv-timeline">
                            <li
                              className="vcv-timeline-item blue_step"
                              data-step="1"
                              data-step-title="Download"
                            >
                              <a>Go to the Accounts Menu</a>
                            </li>
                            <li
                              className="vcv-timeline-item bluedark_step"
                              data-step="2"
                            >
                              <a>
                                Choose <br />
                                Setting
                              </a>
                            </li>
                            <li
                              className="vcv-timeline-item orange_step"
                              data-step="3"
                            >
                              <a>Click Billing Methods</a>
                            </li>
                            <li className="vcv-timeline-item" data-step="4">
                              <a>Click the Add Billing Method button</a>
                            </li>
                          </ul>
                          <p>
                            It's pretty straightforward—clients should only pay
                            for hours worked, and freelancers should be paid for
                            their time spent working. This program uses the
                            following tools to help ensure that, on hourly
                            projects, an hour worked is an hour paid, and an
                            hour paid is an hour worked
                          </p>
                          <p>
                            Work Diary: For every hourly contract, clients can
                            confirm work was completed by checking their
                            freelancer's Work Diary to see
                          </p>
                          <div className="save_cancel text-right">
                            <button type="submit" className="btn save_btn">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="collapse_box">
                      <div
                        className="card_header d-flex align-items-center"
                        id="headingThree"
                      >
                        <small>4</small>
                        <h6>Q</h6>
                        <p>
                          I have a question. what is Simple like? why you are
                          being such an asshole for this? I really want to
                          know...
                        </p>
                        <span>123</span>
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          +
                        </button>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <h5>Fixed-Price Protection</h5>
                          <ul className="vcv-timeline">
                            <li
                              className="vcv-timeline-item blue_step"
                              data-step="1"
                              data-step-title="Download"
                            >
                              <a>Go to the Accounts Menu</a>
                            </li>
                            <li
                              className="vcv-timeline-item bluedark_step"
                              data-step="2"
                            >
                              <a>
                                Choose <br />
                                Setting
                              </a>
                            </li>
                            <li
                              className="vcv-timeline-item orange_step"
                              data-step="3"
                            >
                              <a>Click Billing Methods</a>
                            </li>
                            <li className="vcv-timeline-item" data-step="4">
                              <a>Click the Add Billing Method button</a>
                            </li>
                          </ul>
                          <p>
                            It's pretty straightforward—clients should only pay
                            for hours worked, and freelancers should be paid for
                            their time spent working. This program uses the
                            following tools to help ensure that, on hourly
                            projects, an hour worked is an hour paid, and an
                            hour paid is an hour worked
                          </p>
                          <p>
                            Work Diary: For every hourly contract, clients can
                            confirm work was completed by checking their
                            freelancer's Work Diary to see
                          </p>
                          <div className="save_cancel text-right">
                            <button type="submit" className="btn save_btn">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="collapse_box">
                      <div
                        className="card_header d-flex align-items-center"
                        id="headingFour"
                      >
                        <small>4-1</small>
                        <h6 className="green_text">[Reply]</h6>
                        <p>Yes that is correct</p>
                        <span>123</span>
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          +
                        </button>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse"
                        aria-labelledby="headingFour"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <h5>Fixed-Price Protection</h5>
                          <ul className="vcv-timeline">
                            <li
                              className="vcv-timeline-item blue_step"
                              data-step="1"
                              data-step-title="Download"
                            >
                              <a>Go to the Accounts Menu</a>
                            </li>
                            <li
                              className="vcv-timeline-item bluedark_step"
                              data-step="2"
                            >
                              <a>
                                Choose <br />
                                Setting
                              </a>
                            </li>
                            <li
                              className="vcv-timeline-item orange_step"
                              data-step="3"
                            >
                              <a>Click Billing Methods</a>
                            </li>
                            <li className="vcv-timeline-item" data-step="4">
                              <a>Click the Add Billing Method button</a>
                            </li>
                          </ul>
                          <p>
                            It's pretty straightforward—clients should only pay
                            for hours worked, and freelancers should be paid for
                            their time spent working. This program uses the
                            following tools to help ensure that, on hourly
                            projects, an hour worked is an hour paid, and an
                            hour paid is an hour worked
                          </p>
                          <p>
                            Work Diary: For every hourly contract, clients can
                            confirm work was completed by checking their
                            freelancer's Work Diary to see
                          </p>
                          <div className="save_cancel text-right">
                            <button type="submit" className="btn save_btn">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="collapse_box">
                      <div
                        className="card_header d-flex align-items-center"
                        id="headingFive"
                      >
                        <small>4-2</small>
                        <h6 className="green_text">[Reply] [Reply]</h6>
                        <p>Yes that is correct</p>
                        <span>123</span>
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          +
                        </button>
                      </div>
                      <div
                        id="collapseFive"
                        className="collapse"
                        aria-labelledby="headingFive"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <h5>Fixed-Price Protection</h5>
                          <ul className="vcv-timeline">
                            <li
                              className="vcv-timeline-item blue_step"
                              data-step="1"
                              data-step-title="Download"
                            >
                              <a>Go to the Accounts Menu</a>
                            </li>
                            <li
                              className="vcv-timeline-item bluedark_step"
                              data-step="2"
                            >
                              <a>
                                Choose <br />
                                Setting
                              </a>
                            </li>
                            <li
                              className="vcv-timeline-item orange_step"
                              data-step="3"
                            >
                              <a>Click Billing Methods</a>
                            </li>
                            <li className="vcv-timeline-item" data-step="4">
                              <a>Click the Add Billing Method button</a>
                            </li>
                          </ul>
                          <p>
                            It's pretty straightforward—clients should only pay
                            for hours worked, and freelancers should be paid for
                            their time spent working. This program uses the
                            following tools to help ensure that, on hourly
                            projects, an hour worked is an hour paid, and an
                            hour paid is an hour worked
                          </p>
                          <p>
                            Work Diary: For every hourly contract, clients can
                            confirm work was completed by checking their
                            freelancer's Work Diary to see
                          </p>
                          <div className="save_cancel text-right">
                            <button type="submit" className="btn save_btn">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="save_cancel text-right">
                    <button
                      type="submit"
                      className="btn cancel_btn"
                      onClick={() => {
                        this.props.history.push({
                          pathname: this.props.location.state.prevUrl,
                          search: this.props.location.state.search,
                          state: { data: this.props.location.state.data },
                        });
                      }}
                    >
                      Project Post
                    </button>
                    <button type="submit" className="btn save_btn">
                      Chatting
                    </button>
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

export default ProjectBlog;

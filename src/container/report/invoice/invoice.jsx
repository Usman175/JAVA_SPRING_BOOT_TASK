import React, { Component } from "react";
import { Link } from "react-router-dom";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import { connect } from "react-redux";
import LoginRequired from "../../../components/modals/loginRequired";

class Invoice extends Component {
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
    const { authUser } = this.props;

    return (
      <>
        {authUser.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-10 col-md-12">
                  <div className="project_post invoice_tab">
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
                          All Transaction{" "}
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
                          Invoice{" "}
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
                          Milestone{" "}
                        </a>
                      </li>
                      <li
                        className="nav-item "
                        onClick={() => this.onTabChangeHandle(4)}
                      >
                        <a
                          className={
                            activeTab === 4 ? "nav-link active" : "nav-link"
                          }
                        >
                          Hourly{" "}
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.onTabChangeHandle(5)}
                      >
                        <a
                          className={
                            activeTab === 5 ? "nav-link active" : "nav-link"
                          }
                        >
                          On Hold{" "}
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className={
                          activeTab === 1
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="business_category post_form">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center display_select">
                              <label>Display</label>
                              <div className="form-control-select mx-2">
                                <select className="form-control m-0 pl-3 mw-80">
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                </select>
                              </div>
                            </div>
                            <div className="d-flex align-items-center display_select currency_select">
                              <label>Currency</label>
                              <div className="form-control-select">
                                <select className="form-control">
                                  <option>All</option>
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="text-left">
                                    Date
                                  </th>
                                  <th scope="col" className="text-left">
                                    Transaction
                                  </th>
                                  <th scope="col">Project Type</th>
                                  <th scope="col">Invoice</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id text-left">
                                    Project Fee taken<a>ID 293993938</a>
                                  </td>
                                  <td>Hourly</td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>
                                    -2.10
                                    <i
                                      className="fa fa-question-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                  <td>$0</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id text-left">
                                    Project Fee taken<a>ID 293993938</a>
                                  </td>
                                  <td>Turn-Key</td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>
                                    -2.10
                                    <i
                                      className="fa fa-question-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                  <td>$0</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id text-left">
                                    Project Fee taken<a>ID 293993938</a>
                                  </td>
                                  <td>Quick Deal</td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>
                                    -2.10
                                    <i
                                      className="fa fa-question-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                  <td>$0</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id text-left">
                                    Project Fee taken<a>ID 293993938</a>
                                  </td>
                                  <td>Contest</td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>
                                    -2.10
                                    <i
                                      className="fa fa-question-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                  <td>$0</td>
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
                      <div
                        className={
                          activeTab === 2
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="business_category post_form">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center display_select">
                              <label>Display</label>
                              <div className="form-control-select mx-2">
                                <select className="form-control m-0 pl-3 mw-80">
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                </select>
                              </div>
                            </div>
                            <div className="d-flex align-items-center display_select currency_select">
                              <label>Currency</label>
                              <div className="form-control-select">
                                <select className="form-control">
                                  <option>All</option>
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="text-left">
                                    Freelancer
                                  </th>
                                  <th scope="col" className="text-left">
                                    Project
                                  </th>
                                  <th scope="col" className="text-left">
                                    Project No.
                                  </th>
                                  <th scope="col">Invoice</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Unpaid</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-left">YK tech</td>
                                  <td className="text-left">
                                    KKY Project HTML
                                  </td>
                                  <td className="trans_id text-left">
                                    <a>ID 293993938</a>
                                  </td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>$234.00</td>
                                  <td>$0</td>
                                  <td>Paid</td>
                                </tr>
                                <tr>
                                  <td className="text-left">YK tech</td>
                                  <td className="text-left">
                                    KKY Project HTML
                                  </td>
                                  <td className="trans_id text-left">
                                    <a>ID 293993938</a>
                                  </td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>$234.00</td>
                                  <td className="red_text">$100.00</td>
                                  <td className="red_text">Unpaid</td>
                                </tr>
                                <tr>
                                  <td className="text-left">YK tech</td>
                                  <td className="text-left">
                                    KKY Project HTML
                                  </td>
                                  <td className="trans_id text-left">
                                    <a>ID 293993938</a>
                                  </td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>$234.00</td>
                                  <td>$0</td>
                                  <td>Paid</td>
                                </tr>
                                <tr>
                                  <td className="text-left">YK tech</td>
                                  <td className="text-left">
                                    KKY Project HTML
                                  </td>
                                  <td className="trans_id text-left">
                                    <a>ID 293993938</a>
                                  </td>
                                  <td>
                                    <Link to="/invoiceDetail">
                                      <i
                                        className="fa fa-file-pdf-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </td>
                                  <td>$234.00</td>
                                  <td>$0</td>
                                  <td>Paid</td>
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
                      <div
                        className={
                          activeTab === 3
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="business_category post_form">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center display_select">
                              <label>Display</label>
                              <div className="form-control-select mx-2">
                                <select className="form-control m-0 pl-3 mw-80">
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                </select>
                              </div>
                            </div>
                            <div className="d-flex align-items-center display_select currency_select">
                              <label>Currency</label>
                              <div className="form-control-select">
                                <select className="form-control">
                                  <option>All</option>
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="text-left">
                                    Date
                                  </th>
                                  <th scope="col">Freelancer</th>
                                  <th scope="col">Project</th>
                                  <th scope="col" className="text-left">
                                    Project ID
                                  </th>
                                  <th scope="col">Amount</th>
                                  <th scope="col" className="text-left">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>$230</td>
                                  <td className="text-left green_text">
                                    In progress
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>$100.00</td>
                                  <td className="text-left red_text">
                                    dispute
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>$0</td>
                                  <td className="text-left">released</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>$0</td>
                                  <td className="text-left red_text">
                                    cancelled
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
                      <div
                        className={
                          activeTab === 4
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="business_category post_form">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center display_select">
                              <label>Display</label>
                              <div className="form-control-select mx-2">
                                <select className="form-control m-0 pl-3 mw-80">
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                </select>
                              </div>
                            </div>
                            <div className="d-flex align-items-center display_select currency_select">
                              <label>Currency</label>
                              <div className="form-control-select">
                                <select className="form-control">
                                  <option>All</option>
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="text-left">
                                    Date
                                  </th>
                                  <th scope="col">Freelancer</th>
                                  <th scope="col">Project</th>
                                  <th scope="col" className="text-left">
                                    Project ID
                                  </th>
                                  <th scope="col">Total</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col" className="text-left">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>24:20 hours</td>
                                  <td>$230</td>
                                  <td className="text-left green_text">
                                    In progress
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>24:20 hours</td>
                                  <td>$100.00</td>
                                  <td className="text-left red_text">
                                    dispute
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>24:20 hours</td>
                                  <td>$0</td>
                                  <td className="text-left">released</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td>24:20 hours</td>
                                  <td>$0</td>
                                  <td className="text-left red_text">
                                    cancelled
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
                      <div
                        className={
                          activeTab === 5
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="business_category post_form">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center display_select">
                              <label>Display</label>
                              <div className="form-control-select mx-2">
                                <select className="form-control m-0 pl-3 mw-80">
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="text-left">
                                    Dispute Raised
                                  </th>
                                  <th scope="col">Freelancer</th>
                                  <th scope="col">Project</th>
                                  <th scope="col" className="text-left">
                                    Project ID
                                  </th>
                                  <th scope="col">Claim</th>
                                  <th scope="col">Total</th>
                                  <th scope="col">Claimed</th>
                                  <th scope="col">Accepting</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td className="trans_id">
                                    <a>I worked but ...</a>
                                  </td>
                                  <td>$340.00</td>
                                  <td>$230.00</td>
                                  <td>$130.00</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td className="trans_id">
                                    <a>I worked but ...</a>
                                  </td>
                                  <td>$340.00</td>
                                  <td>$230.00</td>
                                  <td>$130.00</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td className="trans_id">
                                    <a>I worked but ...</a>
                                  </td>
                                  <td>$340.00</td>
                                  <td>$230.00</td>
                                  <td>$130.00</td>
                                </tr>
                                <tr>
                                  <td className="text-left">
                                    03 Aug 2018 21: 58
                                  </td>
                                  <td className="trans_id">
                                    <a>YK TEAM</a>
                                  </td>
                                  <td>KKY Project HTML</td>
                                  <td className="trans_id text-left">
                                    <a>ID 292839321</a>
                                  </td>
                                  <td className="trans_id">
                                    <a>I worked but ...</a>
                                  </td>
                                  <td>$340.00</td>
                                  <td>$230.00</td>
                                  <td>$130.00</td>
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
                <div className="col-lg-2 col-md-12">
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
    authUser: state.authReducer,
  };
}

export default connect(mapStateToProps)(Invoice);

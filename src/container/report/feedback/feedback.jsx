import React, { Component } from "react";
import {
  onReduxRouteChange,
  onReduxLangaugeChange,
} from "../../../store/action/action";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import RightTop from "../../../components/rightbar/RightTop";
import RightBottom from "../../../components/rightbar/RightBottom";
import { UserTypeConst } from "../../../utils/UserTypeConst";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import moment from "moment";
import { DisputeTypeConst } from "../../../utils/DisputeTypeConst";
import { isValidString } from "../../../utils/validationConfig";
import LoginRequired from "../../../components/modals/loginRequired";
import {
  getProjectReviewClientWise,
  getProjectReviewFreelancerWise,
} from "../../../store/middlewares/Reviews";
import Skeleton from "../../../components/skeleton/Skeleton";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      userId: sessionStorage.getItem("userId"),
      userType: sessionStorage.getItem("userType"),
      isRejectDisputePopupOpen: false,
      rejectReason: "",
      isCounterOfferDisputePopupOpen: false,
      loading: false,
      disputeMessage: "",
      refundAmount: "",
      selectedDispute: {},
      disputeData: [],
      errorMessage: {},
      claimTableData: [
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Dispute",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Refund",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Refund",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Dispute",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Refund",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Refund",
          amount: "$240.00",
          date: "2018-02-18",
        },
        {
          claim_id: "201829-01",
          project_id: "201829-01	",
          required: "Refund",
          amount: "$240.00",
          date: "2018-02-18",
        },
      ],
      feedbackTableData: [
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3, 4, 5],
          reason: "Completed Contest",
          status: "completed",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3],
          reason: "Cheated he is a good developer",
          status: "other",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3, 4],
          reason: "He is not able to do requirements",
          status: "other",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2],
          reason: "He is not able to do requirements",
          status: "other",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3, 4, 5],
          reason: "Completed Contest",
          status: "completed",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3],
          reason: "Cheated he is a good developer",
          status: "other",
        },
        {
          date: "2018-02-18",
          project_id: "201829-01",
          client: "MR. Jaames Bond",
          evaluation: [1, 2, 3, 4],
          reason: "He is not able to do requirements",
          status: "other",
        },
      ],
      cliamPageOfItems: [],
      feedbackPageOfItems: [],
    };
  }
  onTabChangeHandle = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };
  onClaimTableChangePage = (pageOfItems) => {
    this.setState({ cliamPageOfItems: pageOfItems });
  };
  onFeedbackTableChangePage = (pageOfItems) => {
    this.setState({ feedbackPageOfItems: pageOfItems });
  };

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    let userType = sessionStorage.getItem("userType");

    userType === "Client" &&
      this.props.getClientReviews({
        clientUserId: this.props.authUser?.myAuth?.user?.userId,
      });

    userType === "Freelancer" &&
      this.props.getFreelancerReviews({
        freelancerUserId: this.props.authUser?.myAuth?.user?.userId,
      });

    if (langauge) this.props.onLangaugeChange(langauge);

    this.bindProjectDisputes();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: this.props.loadingReviews });
  }

  componentWillUnmount() {
    this.props.defaultReviews();
  }

  //#region Contest Dispute

  async bindProjectDisputes() {
    let url = ``;

    if (this.state.userType === UserTypeConst.Freelancer)
      url =
        `${ENDPOINT["GetFreelancerProjectDisputes"]}?freelancerUserId=` +
        this.state.userId;
    else if (this.state.userType === UserTypeConst.Client)
      url =
        `${ENDPOINT["GetClientProjectDisputes"]}?clientUserId=` +
        this.state.userId;

    let result = await request(url, getOptions({}));
    if (result.success) {
      this.setState({ disputeData: result.result.data });
    }
  }

  approveProjectDispute = async (dispute) => {
    var param = {
      projectId: dispute.projectId,
      freelancerUserId: dispute.freelancerUserId,
      threadId: dispute.threadId,
    };
    let result = await request(
      `${ENDPOINT["ApproveProjectDispute"]}`,
      postOptions(param)
    );
    if (result.success) {
      this.setState({ isAcceptRejectDisputePopupOpen: false });
      this.bindProjectDisputes();
    }
  };

  rejectProjectDispute = async () => {
    let { languageType } = this.props;
    let errorMessage = {};

    if (!isValidString(this.state.selectedDispute.projectId)) {
      errorMessage["projectId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.freelancerUserId)) {
      errorMessage["freelancerUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.threadId)) {
      errorMessage["threadId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.rejectReason)) {
      errorMessage["rejectReason"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else {
      var param = {
        projectId: this.state.selectedDispute.projectId,
        freelancerUserId: this.state.selectedDispute.freelancerUserId,
        threadId: this.state.selectedDispute.threadId,
        rejectReason: this.state.rejectReason,
      };
      let result = await request(
        `${ENDPOINT["RejectProjectDispute"]}`,
        postOptions(param)
      );
      if (result.success) {
        this.rejectProjectDisputePopupClose();
        this.bindProjectDisputes();
      }
    }
  };

  rejectProjectDisputePopupClose = async () => {
    this.setState({ isRejectDisputePopupOpen: false, selectedDispute: {} });
  };

  counterOfferProjectDispute = async () => {
    let { languageType } = this.props;
    let errorMessage = {};

    if (!isValidString(this.state.selectedDispute.projectId)) {
      errorMessage["projectId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.freelancerUserId)) {
      errorMessage["freelancerUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.clientUserId)) {
      errorMessage["clientUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.threadId)) {
      errorMessage["threadId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.fromUserId)) {
      errorMessage["fromUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.toUserId)) {
      errorMessage["toUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.selectedDispute.disputeMessage)) {
      errorMessage["disputeMessage"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (!isValidString(this.state.refundAmount)) {
      errorMessage["refundAmount"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else {
      var param = {
        projectId: this.state.selectedDispute.projectId,
        freelancerUserId: this.state.selectedDispute.freelancerUserId,
        clientUserId: this.state.selectedDispute.clientUserId,
        disputeType: DisputeTypeConst.RefundRequest,
        threadId: this.state.selectedDispute.threadId,
        fromUserId: this.state.selectedDispute.toUserId,
        toUserId: this.state.selectedDispute.fromUserId,
        disputeMessage: this.state.disputeMessage,
        refundAmount: this.state.refundAmount,
      };
      let result = await request(
        `${ENDPOINT["CreateProjectDisputeCounterOffer"]}`,
        postOptions(param)
      );
      if (result.success) {
        this.counterOfferProjectDisputePopupClose();
        this.bindProjectDisputes();
      }
    }
  };

  counterOfferProjectDisputePopupClose = async () => {
    this.setState({
      isCounterOfferDisputePopupOpen: false,
      selectedDispute: {},
    });
  };

  //#endregion Contest Dispute

  render() {
    let {
      disputeData,
      activeTab,
      claimTableData,
      cliamPageOfItems,
      feedbackTableData,
      feedbackPageOfItems,
    } = this.state;
    const { authUser, reviews, loadingReviews } = this.props;

    return (
      <>
        {authUser.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-10 col-md-8">
                  <div className="project_post">
                    <div className="">
                      <ul className="nav nav-pills mb-3">
                        <li
                          className="nav-item"
                          onClick={() => this.onTabChangeHandle(1)}
                        >
                          <a
                            className={
                              activeTab === 1 ? "nav-link active" : "nav-link"
                            }
                          >
                            FEEDBACK{" "}
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
                            CLAIMS{" "}
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
                          <div className="table-responsive detail_tbl feedback_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Project Id</th>
                                  <th scope="col">Client</th>
                                  <th scope="col">Evaluation</th>
                                  <th scope="col"> Reason</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loadingReviews && (
                                  <tr key={"0-1"}>
                                    <td colSpan="6">
                                      <Skeleton
                                        count={1}
                                        isSkeletonLoading={loadingReviews}
                                      />
                                    </td>
                                  </tr>
                                )}
                                {reviews && reviews?.length > 0 ? (
                                  reviews?.map((data, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        {moment(data?.reviewDateTime).format(
                                          "YYY-MM-DD"
                                        )}
                                      </td>
                                      <td>{data?.projectId}</td>
                                      <td>{data?.clientUserId}</td>
                                      <td>
                                        <label>
                                          {this.state.userType === "Freelancer"
                                            ? data.clientUserNoOfStar &&
                                              data.clientUserNoOfStar * 1 > 0 &&
                                              Array(data.clientUserNoOfStar * 1)
                                                .fill()
                                                .map((rating) => (
                                                  <i
                                                    className="fa fa-star"
                                                    aria-hidden="true"
                                                  ></i>
                                                ))
                                            : data.freelancerUserNoOfStar &&
                                              data.freelancerUserNoOfStar * 1 >
                                                0 &&
                                              Array(
                                                data.freelancerUserNoOfStar * 1
                                              )
                                                .fill()
                                                .map((rating) => (
                                                  <i
                                                    className="fa fa-star"
                                                    aria-hidden="true"
                                                  ></i>
                                                ))}
                                        </label>
                                      </td>
                                      <td>
                                        {this.state.userType === "Freelancer"
                                          ? data.clientUserReview
                                          : data.freelancerUserReview}
                                      </td>
                                      <td>
                                        {data.status === "completed" ? (
                                          <button
                                            type="submit"
                                            className="btn cancel_btn"
                                            disabled
                                          >
                                            {" "}
                                            Complete
                                          </button>
                                        ) : (
                                          <button
                                            type="submit"
                                            className="btn red_btn"
                                          >
                                            {" "}
                                            Feedback{" "}
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    {!loadingReviews && (
                                      <td colSpan="6" className="text-center">
                                        There is no data data to display
                                      </td>
                                    )}
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          {/* <Pagenation
                            items={feedbackTableData}
                            onChangePage={this.onFeedbackTableChangePage}
                            initialPage={1}
                          /> */}
                        </div>
                        <div
                          className={
                            activeTab === 2
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                        >
                          <div className="table-responsive detail_tbl feedback_tbl">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Claim ID</th>
                                  <th scope="col">Project Id</th>
                                  <th scope="col">Required</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/*{cliamPageOfItems && cliamPageOfItems.length > 0 ? cliamPageOfItems.map((data, idx) =>
                                <tr key={idx}>
                                  <td>{data.date}</td>
                                  <td>{data.claim_id}</td>
                                  <td>{data.project_id}</td>
                                  <td>{data.required}</td>
                                  <td>{data.amount}</td>
                                  <td>
                                    <button type="submit" className="btn red_btn" >Reject</button>
                                    <button type="submit" className="btn cancel_btn">Count Offer</button>
                                    <button type="submit" className="btn save_btn" >Accept </button>
                                  </td>
                                </tr>)
                                :
                                <tr >
                                  <td colSpan="6" className="text-center">There is no data data to display</td>
                                </tr>
                              }*/}

                                {disputeData && disputeData.length > 0 ? (
                                  disputeData.map((dispute, idx) => (
                                    <tr key={`dispute${idx}`}>
                                      <td>
                                        {moment(dispute.disputeDateTime).format(
                                          "DD-MMM-YYYY"
                                        )}
                                      </td>
                                      <td>{dispute.threadCode}</td>
                                      <td>{dispute.projectId}</td>
                                      <td>{dispute.disputeType}</td>
                                      <td>{dispute.refundAmount}</td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn red_btn"
                                          onClick={() => {
                                            this.setState({
                                              isRejectDisputePopupOpen: true,
                                              selectedDispute: dispute,
                                            });
                                          }}
                                        >
                                          Reject
                                        </button>
                                        <button
                                          type="button"
                                          className="btn cancel_btn"
                                          onClick={() => {
                                            this.setState({
                                              isCounterOfferDisputePopupOpen: true,
                                              selectedDispute: dispute,
                                            });
                                          }}
                                        >
                                          Count Offer
                                        </button>
                                        <button
                                          type="button"
                                          className="btn save_btn"
                                          onClick={() => {
                                            this.approveProjectDispute(dispute);
                                          }}
                                        >
                                          Accept{" "}
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      There is no data data to display
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          {/*<Pagenation items={claimTableData} onChangePage={this.onClaimTableChangePage} initialPage={1} />*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <RightTop />
                  <RightBottom />
                </div>
              </div>
            </div>

            {/* Reject Dispute Popup */}
            <Modal
              dialogClassName="jungle-modal"
              contentClassName="jungle-modal-content lg"
              show={this.state.isRejectDisputePopupOpen}
              onHide={() => {
                this.rejectProjectDisputePopupClose();
              }}
              centered
            >
              <Modal.Header className="position-relative jungle-modal-header">
                <img
                  src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                  alt=""
                />
                <span className="position-absolute">Reject Dispute</span>
                <span
                  onClick={() => {
                    this.rejectProjectDisputePopupClose();
                  }}
                  className="custom-close"
                >
                  x
                </span>
              </Modal.Header>
              <Modal.Body
                style={{
                  maxHeight: "887px",
                  overflow: "auto",
                  padding: "0px 0px",
                }}
              >
                <br />
                <h6>
                  <b>
                    Dispute Case for Dispute ID#{" "}
                    {this.state.selectedDispute.threadCode}
                  </b>
                </h6>
                <br />

                <div className="row justify-content-between align-items-center mb-12">
                  <div className="col-md-12 left_card">
                    <h6>
                      Reject Reason<span className="compulsory">*</span>
                    </h6>
                    <textarea
                      className="form-control"
                      placeholder="Please explain the reason for reject claim"
                      name="rejectReason"
                      value={this.state.rejectReason}
                      maxLength="500"
                      onChange={(e) => {
                        let errorMessage = {};
                        if (
                          e.target.value !== undefined &&
                          e.target.value !== null &&
                          e.target.value !== ""
                        )
                          errorMessage["rejectReason"] = null;
                        this.setState({
                          rejectReason: e.target.value,
                          errorMessage: errorMessage,
                        });
                      }}
                    ></textarea>
                    {this.state.errorMessage.rejectReason && (
                      <p className="text-danger">
                        {this.state.errorMessage.rejectReason}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="project_post style_place"
                  style={{ boxShadow: "none", marginTop: "0px" }}
                >
                  <div className="text-right save_cancel">
                    <button
                      type="button"
                      className="btn save_btn"
                      onClick={() => {
                        this.rejectProjectDispute();
                      }}
                      style={{ width: "100%" }}
                    >
                      {" "}
                      Reject{" "}
                    </button>
                    <button
                      type="button"
                      className="btn cancel_btn"
                      onClick={() => {
                        this.rejectProjectDisputePopupClose();
                      }}
                      style={{ width: "100%", marginLeft: "8px" }}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            {/* Reject Dispute Popup */}
            <Modal
              dialogClassName="jungle-modal"
              contentClassName="jungle-modal-content lg"
              show={this.state.isCounterOfferDisputePopupOpen}
              onHide={() => {
                this.counterOfferProjectDisputePopupClose();
              }}
              centered
            >
              <Modal.Header className="position-relative jungle-modal-header">
                <img
                  src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                  alt=""
                />
                <span className="position-absolute">Counter Offer Dispute</span>
                <span
                  onClick={() => {
                    this.counterOfferProjectDisputePopupClose();
                  }}
                  className="custom-close"
                >
                  x
                </span>
              </Modal.Header>
              <Modal.Body
                style={{
                  maxHeight: "887px",
                  overflow: "auto",
                  padding: "0px 0px",
                }}
              >
                <br />
                <h6>
                  <b>
                    Dispute Case for Dispute ID#{" "}
                    {this.state.selectedDispute.threadCode}
                  </b>
                </h6>
                <br />

                <div className="row justify-content-between align-items-center mb-4">
                  <div className="col-md-12 left_card">
                    <h6>
                      Offer Amount<span className="compulsory">*</span>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Refund Amount"
                      value={this.state.refundAmount}
                      maxLength="9"
                      onChange={(e) => {
                        let errorMessage = {};
                        let amount = "";
                        if (
                          !e.target.value ||
                          e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)
                        )
                          amount = e.target.value;
                        else if (e.target.value === "") amount = "";

                        if (
                          amount !== 0 &&
                          amount !== "" &&
                          amount !== null &&
                          amount !== undefined
                        )
                          errorMessage["refundAmount"] = null;
                        this.setState({
                          refundAmount: amount,
                          errorMessage: errorMessage,
                        });
                      }}
                    />
                    {this.state.errorMessage.refundAmount && (
                      <p className="text-danger">
                        {this.state.errorMessage.refundAmount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row justify-content-between align-items-center mb-12">
                  <div className="col-md-12 left_card">
                    <h6>
                      Offer Message<span className="compulsory">*</span>
                    </h6>
                    <textarea
                      className="form-control"
                      placeholder="Please explain the reason for reject claim"
                      name="disputeMessage"
                      value={this.state.disputeMessage}
                      maxLength="500"
                      onChange={(e) => {
                        let errorMessage = {};
                        if (
                          e.target.value !== undefined &&
                          e.target.value !== null &&
                          e.target.value !== ""
                        )
                          errorMessage["disputeMessage"] = null;
                        this.setState({
                          disputeMessage: e.target.value,
                          errorMessage: errorMessage,
                        });
                      }}
                    ></textarea>
                    {this.state.errorMessage.disputeMessage && (
                      <p className="text-danger">
                        {this.state.errorMessage.disputeMessage}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="project_post style_place"
                  style={{ boxShadow: "none", marginTop: "0px" }}
                >
                  <div className="text-right save_cancel">
                    <button
                      type="button"
                      className="btn save_btn"
                      onClick={() => {
                        this.counterOfferProjectDispute();
                      }}
                      style={{ width: "100%" }}
                    >
                      {" "}
                      Offer{" "}
                    </button>
                    <button
                      type="button"
                      className="btn cancel_btn"
                      onClick={() => {
                        this.counterOfferProjectDisputePopupClose();
                      }}
                      style={{ width: "100%", marginLeft: "8px" }}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </section>
        ) : (
          <LoginRequired defaultOpen={true} />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  let userType = sessionStorage.getItem("userType");

  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    reviews:
      userType === "Client"
        ? state.reviews?.getProjectReviewsClientWise
        : state.reviews?.getProjectReviewsFreelancerWise,
    loadingReviews:
      userType === "Client"
        ? state.reviews.getProjectReviewsClientWisePending
        : state.reviews.getProjectReviewsFreelancerWisePending,
    authUser: state.authReducer,
  };
}

function mapDispatchProps(dispatch) {
  let userType = sessionStorage.getItem("userType");

  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    getClientReviews: ({ clientUserId }) => {
      dispatch(getProjectReviewClientWise({ clientUserId }));
    },
    getFreelancerReviews: ({ freelancerUserId }) => {
      dispatch(getProjectReviewFreelancerWise({ freelancerUserId }));
    },
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },

    defaultReviews: () => {
      dispatch({
        type:
          userType === "Client"
            ? "GET_PROJECT_REVIEWS_CLIENT_WISE_SUCCESS"
            : "GET_PROJECT_REVIEWS_FREELANCER_WISE_SUCCESS",
        payload: { data: [] },
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(Feedback);

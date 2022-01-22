import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import { onReduxRouteChange } from "../../../store/action/action";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import UserCard from "../../../components/proposals/userCard";
import Modal from "react-bootstrap/Modal";
import notifications from "../../../utils/notifications";

class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.authUser?.myAuth?.user?.userId,
      projectId: new URLSearchParams(this.props.location.search).get(
        "projectId"
      ),
      offerDetail: {},
      isOfferDeclineModelOpen: false,
      declinedReason: "",
      errorMessage: {},
      sendOfferDetails: {},
    };
  }

  componentWillMount() {
    this.bindOfferDetail();
  }

  async bindOfferDetail() {
    let result = await request(
      `${ENDPOINT["GetProjectContractDetail"]}?projectContractId=` +
        this.state.projectId /* + "&freelancerUserId=" + this.state.userId */,
      getOptions({})
    );
    if (result.success) {
      console.log(result, "result");
      if (
        result.result &&
        result.result.data !== null &&
        result.result.data !== ""
      ) {
        let offerResponse = result.result;
        if (offerResponse.hasOwnProperty("offerDateTime"))
          offerResponse.offerDateTime = moment(
            offerResponse.offerDateTime
          ).format("DD-MMM-YYYY hh:mm a");
        if (offerResponse.hasOwnProperty("offerClosedDateTime"))
          offerResponse.offerClosedDateTime = moment(
            offerResponse.offerClosedDateTime
          ).format("DD-MMM-YYYY hh:mm a");
        if (offerResponse.hasOwnProperty("finalizedDateTime"))
          offerResponse.finalizedDateTime =
            offerResponse.finalizedDateTime !== null &&
            offerResponse.finalizedDateTime !== ""
              ? moment(offerResponse.finalizedDateTime).format(
                  "DD-MMM-YYYY hh:mm a"
                )
              : "";
        if (offerResponse.hasOwnProperty("declinedDateTime"))
          offerResponse.declinedDateTime =
            offerResponse.declinedDateTime !== null &&
            offerResponse.declinedDateTime !== ""
              ? moment(offerResponse.declinedDateTime).format(
                  "DD-MMM-YYYY hh:mm a"
                )
              : "";

        if (offerResponse.hasOwnProperty("milestones")) {
          var milestones = offerResponse.milestones;
          if (milestones !== null) {
            for (var i = 0; i < milestones.length; i++) {
              if (milestones[i].hasOwnProperty("milestoneDueDate"))
                milestones[i].milestoneDueDate =
                  milestones[i].milestoneDueDate !== null &&
                  milestones[i].milestoneDueDate !== ""
                    ? moment(milestones[i].milestoneDueDate).format(
                        "DD-MMM-YYYY"
                      )
                    : "";
            }
          }
          offerResponse.milestones = milestones !== null ? milestones : [];
        }

        this.setState({
          offerDetail: offerResponse,
          sendOfferDetails: result.result.data,
        });
      } else this.props.history.push("/my-offers");
    }
  }
  //#endregion Bind Contest Detail

  //#region Accept Offer
  handleDeclineOfferValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (
      this.state.declinedReason === null ||
      this.state.declinedReason === "" ||
      this.state.declinedReason === undefined
    ) {
      formIsValid = false;
      errorMessage["declinedReason"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  onAcceptOfferHandle = async (redirectTo) => {
    let param = {
      projectContractId: this.state.projectId,
      freelancerUserId: this.state.userId,
    };
    let result = await request(ENDPOINT["AcceptOffer"], postOptions(param));
    if (result.success) {
      this.props.onRouteChange(redirectTo);
      this.props.history.push(redirectTo);
    } else notifications.showError(result.message);

    return;
  };
  //#endregion Accept Offer

  //#region Decline Offer
  handleDeclineOfferValidation = () => {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (
      this.state.declinedReason === null ||
      this.state.declinedReason === "" ||
      this.state.declinedReason === undefined
    ) {
      formIsValid = false;
      errorMessage["declinedReason"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  };

  onDeclineOfferHandle = async (redirectTo) => {
    if (this.handleDeclineOfferValidation()) {
      let param = {
        projectContractId: this.state.projectId,
        freelancerUserId: this.state.userId,
      };
      let result = await request(ENDPOINT["OfferDecline"], postOptions(param));
      if (result.success) {
        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
      } else notifications.showError(result.message);
    } else return;
  };

  render() {
    let { offerDetail } = this.state;

    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <UserCard userObj={offerDetail} />
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="card_box" style={{ padding: "20px" }}>
                      <button
                        type="button"
                        className="btn save_btn"
                        style={{ marginBottom: "15px", width: "100%" }}
                        onClick={() => this.onAcceptOfferHandle("/my-offers")}
                      >
                        {" "}
                        Accept Offer{" "}
                      </button>
                      <br />
                      <button
                        type="button"
                        className="btn cancel_btn"
                        style={{ marginBottom: "15px", width: "100%" }}
                      >
                        {" "}
                        Message{" "}
                      </button>
                      <br />
                      <button
                        type="button"
                        className="btn save_btn"
                        style={{ marginBottom: "15px", width: "100%" }}
                        onClick={() => {
                          this.setState({
                            isOfferDeclineModelOpen: true,
                            declinedReason: "",
                          });
                        }}
                      >
                        {" "}
                        Decline Offer{" "}
                      </button>
                      <br />
                      <button
                        type="button"
                        className="btn save_btn"
                        style={{ width: "100%" }}
                        onClick={() =>
                          this.props.history.push(
                            "/project-proposal-detail?id=" +
                              this.state.projectId
                          )
                        }
                      >
                        {" "}
                        Original Proposal{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="card_box">
                  <div className="row align-items-center">
                    <div className="d-flex mt-3 col-12 pl-0">
                      <span className="pr-2 py-2 h6 text-muted font-weight-bold">
                        {offerDetail.projectType}
                      </span>
                      <span className="p-2 h6 text-muted font-weight-bold">
                        {offerDetail.projectScope}
                      </span>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Contract Title
                      </div>
                      <div className="tab-value">{offerDetail.jobTitle}</div>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Job Category
                      </div>
                      <div className="tab-value">
                        {offerDetail.projectScope}
                      </div>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Project Budget
                      </div>
                      <div className="tab-value">
                        {offerDetail.currencyCode} {offerDetail.projectAmount}
                      </div>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Offer Amount
                      </div>
                      <div className="tab-value">
                        {offerDetail.currencyCode} {offerDetail.offerAmount}
                      </div>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Offer Date Time
                      </div>
                      <div className="tab-value">
                        {offerDetail.offerDateTime}
                      </div>
                    </div>
                    <div className="border-bottom col-12 tab-container text-muted">
                      <div className="tab-value bg-warning text-right">
                        Offer Closed Date Time
                      </div>
                      <div className="tab-value">
                        {offerDetail.offerClosedDateTime}
                      </div>
                    </div>

                    {offerDetail.milestones &&
                      offerDetail.milestones.length > 0 && (
                        <>
                          <div className="d-flex mt-3 col-12 pl-0">
                            <span className="pr-2 py-2 h6 text-muted font-weight-bold">
                              Project Milestones:
                            </span>
                          </div>
                          {offerDetail.milestones.map((milestone, index) => (
                            <>
                              <div
                                key={`milestoneDescription${index}`}
                                className="border-bottom col-12 tab-container text-muted"
                              >
                                <div className="tab-value bg-warning text-right">
                                  Milestone Description
                                </div>
                                <div className="tab-value">
                                  {milestone.milestoneDescription}
                                </div>
                              </div>
                              <div
                                key={`milestoneDetail${index}`}
                                className="border-bottom col-12 tab-container text-muted mb-3"
                              >
                                <div className="tab-value bg-warning text-right">
                                  Milestone Amount
                                </div>
                                <div className="tab-value">
                                  {offerDetail.currencyCode}{" "}
                                  {milestone.milestoneAmount}
                                </div>
                                <div className="tab-value bg-warning text-right">
                                  Milestone Due Date
                                </div>
                                <div className="tab-value">
                                  {milestone.milestoneDueDate}
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
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

        {/* Offer Decline Model*/}
        <Modal
          dialogClassName="jungle-modal"
          contentClassName="jungle-modal-content lg"
          show={this.state.isOfferDeclineModelOpen}
          onHide={() => {
            this.setState({ isOfferDeclineModelOpen: false });
          }}
          centererd
          size="lg"
        >
          <Modal.Header className="position-relative jungle-modal-header">
            <img
              src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
              alt=""
            />
            <span className="position-absolute">Decline Proposal</span>
            <span
              onClick={() => {
                this.setState({ isOfferDeclineModelOpen: false });
              }}
              className="custom-close"
            >
              {" "}
              x{" "}
            </span>
          </Modal.Header>
          <Modal.Body
            style={{ maxHeight: "887px", overflow: "auto", padding: "0px 0px" }}
          >
            <div className="mt-4 mb-3 mx-3">
              <div className="row justify-content-between align-items-center mb-4">
                <div className="col-md-12 left_card">
                  <h6>
                    Declined Reason<span className="compulsory">*</span>
                  </h6>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    name="declinedReason"
                    value={this.state.declinedReason}
                    onChange={(e) => {
                      let errorMessage = {};
                      this.setState({ declinedReason: e.target.value });
                      if (
                        this.state.declinedReason !== undefined &&
                        this.state.declinedReason !== null &&
                        this.state.declinedReason !== ""
                      )
                        errorMessage["declinedReason"] = null;
                      this.setState({ errorMessage: errorMessage });
                    }}
                  ></textarea>
                  {this.state.errorMessage.declinedReason && (
                    <p className="text-danger">
                      {this.state.errorMessage.declinedReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => {
                this.setState({ isOfferDeclineModelOpen: false });
              }}
              className="btn cancel_btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => this.onDeclineOfferHandle("/my-offers")}
              className="btn save_btn"
            >
              {" "}
              Decline Proposal{" "}
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    authUser: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(OfferDetail);

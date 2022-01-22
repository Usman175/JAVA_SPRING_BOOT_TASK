import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import {
  onReduxRouteChange,
  onReduxLangaugeChange,
} from "../../../store/action/action";
import { connect } from "react-redux";
import moment from "moment";
import LoginRequired from "../../../components/modals/loginRequired";
import {
  getProjectReviewClientWise,
  getProjectReviewFreelancerWise,
} from "../../../store/middlewares/Reviews";
import Skeleton from "../../../components/skeleton/skeleton";
import "./feedback.scss";

const dummyImage =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";

class RefundAndDisputeCase extends Component {
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
          dispute_id: "201829",
          subject: "201829",
          created: "2020-04-20",
          last_activity: "2021-10-20",
          status: "Solved",
        },
        {
          dispute_id: "201829",
          subject: "201829",
          created: "2020-03-20",
          last_activity: "2021-05-20",
          status: "Awaiting",
        },
        {
          dispute_id: "201829",
          subject: "201829",
          created: "2020-02-20",
          last_activity: "2021-08-19",
          status: "Unresolved",
        },
        {
          dispute_id: "201829",
          subject: "201829",
          created: "2021-09-18",
          last_activity: "2021-09-22",
          status: "Solved",
        },
      ],
      cliamPageOfItems: [],
      feedbackPageOfItems: [],
    };
  }

  render() {
    const { authUser, reviews, loadingReviews } = this.props;
    const { claimTableData, refundAmount } = this.state;

    return (
      <>
        {authUser.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-12 col-md-2"></div>
                <div className="col-12 col-md-8">
                  <div className="project_post dispute-wrapper">
                    <div className="row header-wrapper">
                      <div className="flex flex-align-center">
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/disputeAndClaim.png"
                          }
                          alt="currencyIcon"
                        />
                        <span className="ml-4">
                          <h5 className="mb-0">
                            {"Refund & Dispute Case for Contract"}
                          </h5>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-space-between mb-4 refundDispute_mobileTab_heading">
                      <div>
                        <h5>Ref # EMS23323</h5>
                      </div>
                      <button className="btn save_btn accept_button">
                        Accept the offer
                      </button>
                    </div>

                    {[0, 1].map((item, index) => {
                      return (
                        <div className="mb-5">
                          <div className="mb-4">
                            <div className="flex refundDispute_mobileTab">
                              <Avatar alt="user" src={dummyImage} />
                              <div className="ml-3">
                                <p className="mb-1">Client: Sonny Cho</p>
                                <p className="mb-1">23rd feb 2021</p>
                              </div>
                              <div className="buttons-wrapper">
                                <input
                                  type="text"
                                  placeholder="Amount"
                                  className="form-control refundAmount_dispute"
                                  value={refundAmount}
                                  onChange={(e) =>
                                    this.setState({
                                      refundAmount: e.target.value,
                                    })
                                  }
                                />
                                <button className="btn save_btn_light send">
                                  <img
                                    src={
                                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/invitationtransparent.png"
                                    }
                                  />{" "}
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2">
                              <span>Total Change: US$200.00</span>
                            </div>
                            <div className="mb-2">
                              <span>Agreed Amount: US$100.00</span>
                            </div>
                            <div className="mb-2">
                              <span>Reason: I don't like this quality</span>
                            </div>
                          </div>

                          <div className="form-group upload_file mb-2 fileWrapper">
                            <label htmlFor="fileDocument">
                              <img
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/fileIcon.png"
                                }
                                alt="file"
                                aria-hidden="true"
                                className="mr-3"
                              />
                              Attachemented file
                            </label>
                            <input
                              id="fileDocument"
                              type="file"
                              className="form-control-file"
                            />
                          </div>
                        </div>
                      );
                    })}

                    <div className="mb-5">
                      <div className="mb-4">
                        <div className="flex mb-4">
                          <Avatar alt="user" src={dummyImage} />
                          <div className="ml-3">
                            <p className="mb-1">Client: Sonny Cho</p>
                            <p className="mb-1">23rd feb 2021</p>
                          </div>
                        </div>
                        <div>Description text here ......</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-2"></div>
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

export default connect(mapStateToProps, mapDispatchProps)(RefundAndDisputeCase);

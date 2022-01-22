import React, { Component } from "react";
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

class DisputeAndClaims extends Component {
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

  onClick = () => {
    this.props.history.push("/refund-and-dispute-case");
  };

  render() {
    const { authUser, reviews, loadingReviews, languageType } = this.props;
    const { claimTableData } = this.state;

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
                          <h5
                            onClick={() => {
                              this.onClick();
                            }}
                            className="mb-0"
                          >
                            {languageType.DISPUTEANDCLAIMS}
                          </h5>
                        </span>
                      </div>
                    </div>
                    <div className="disputeClaims_page_responsiveMobile  table-responsive">
                      <table className="table">
                        <thead className="head-wrapper">
                          <tr>
                            <th scope="col" style={{ paddingLeft: 0 }}>
                              Dispute Id
                            </th>
                            <th scope="col">Subject</th>
                            <th scope="col">Created</th>
                            <th scope="col">Last Activity</th>
                            <th scope="col"> Status</th>
                          </tr>
                        </thead>
                        <tbody className="body-wrapper">
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
                          {claimTableData && claimTableData?.length > 0 ? (
                            claimTableData?.map((data, idx) => (
                              <tr key={idx}>
                                <td>{data?.dispute_id}</td>
                                <td className="cursor-pointer"
                                  onClick={() => {
                                    this.onClick();
                                  }}
                                >
                                  Dispute Case Contract Id: #{data?.subject}
                                </td>
                                <td>
                                  {data?.created
                                    ? moment(
                                        moment(
                                          new Date(data.created).toString()
                                        )
                                      ).from(moment(new Date()))
                                    : ""}
                                </td>
                                <td>
                                  {data?.last_activity
                                    ? moment(
                                        moment(
                                          new Date(
                                            data.last_activity
                                          ).toString()
                                        )
                                      ).from(moment(new Date()))
                                    : ""}
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      this.onClick();
                                    }}
                                    className={`btn status-btn status-btn-color-${data?.status?.toLowerCase()}`}
                                  >
                                    {data?.status}
                                  </button>
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

export default connect(mapStateToProps, mapDispatchProps)(DisputeAndClaims);

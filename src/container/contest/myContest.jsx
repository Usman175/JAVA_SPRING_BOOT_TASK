import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ShowMoreText from "react-show-more-text";
import hired_emptyState from "../../assets/img/hired_emptyState.svg";
import DropdownList from "../../components/dropdowns/dropdownList";
import Pagenation from "../../components/pagenation";
import RightBottom from "../../components/rightbar/rightBottom";
import RightTop from "../../components/rightbar/rightTop";
import Skeleton from "../../components/skeleton/skeleton.jsx";
import { onReduxLangaugeChange } from "../../store/action/action";
import { getContestByIdRequestCleanUp } from "../../store/action/Contest/contestActions.js";
import { getContestById } from "../../store/middlewares/Contest/getContest.js";
import { getCurrencyCode } from "../../utils/currencyCode.js";
import LeftSection from "../freelancer/MyFreelancer/leftSection.jsx";
import ContractChangeTable from "./contractChangeTable";
import emptyContestState from "../../../src/assets/img/emptyCandidateState.svg";
import SubHeader from "../../components/subHeader";
class MyContest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      contestId: new URLSearchParams(this.props.location.search).get(
        "contestId"
      ),
      unHiredCandidates: [],
      activeTab: "My Contests",
      selectedProject: {},
      isRequestaRefundOpen: false,
      isRefundTotalAmount: true,
      proposedAmount: "",
      freelancerUserId: "",
      refundAmount: "",
      disputeMessage: "",
      errorMessage: {},
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
    let contestId = new URLSearchParams(this.props.location.search).get(
      "contestId"
    );
    this.props.getContestByProjectId(contestId);
  }

  componentWillUnmount() {
    const { getContestCleanUpRequest } = this.props;
    getContestCleanUpRequest();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { getContestState } = this.props;
    const { singleContestObj } = getContestState;
    let candidates = [];
    if (prevProps !== this.props) {
      if (prevProps.getContestState !== getContestState) {
        if (!_.isEmpty(singleContestObj)) {
          candidates =
            singleContestObj &&
            singleContestObj.proposals &&
            singleContestObj.proposals.filter((proposal) => !proposal.isHired);
          this.setState({ unHiredCandidates: candidates });
        }
      }
    }
  }

  onTabChange = async (requestedTab) => {
    const { getContestCleanUpRequest, getContestByProjectId } = this.props;
    await getContestCleanUpRequest();
    let contestId = new URLSearchParams(this.props.location.search).get(
      "contestId"
    );
    await getContestByProjectId(contestId);
    this.setState({ activeTab: requestedTab });
  };

  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  finalizeAmount = (amount, currencyCode, currencyCodeIncluded) => {
    if (!currencyCode || currencyCode === " " || !amount) {
      return null;
    }
    return new Intl.NumberFormat(
      currencyCode == "USD"
        ? "en-US"
        : currencyCode == "JPY"
        ? "ja-JP"
        : currencyCode == "KRW"
        ? "ko-KR"
        : "en-US",
      { style: "currency", currency: currencyCode }
    ).format(currencyCodeIncluded ? amount.slice(0, -3) : amount);
  };

  countTotalPrizes = () => {
    let { getContestState } = this.props;
    let { singleContestObj } = getContestState;
    if (!singleContestObj || singleContestObj.secondPlacePrize === " ") {
      return null;
    }

    let totalAmount = parseFloat(singleContestObj.winningAmount);
    if (singleContestObj.secondPlacePrize) {
      totalAmount =
        totalAmount +
        parseFloat(singleContestObj.secondPlacePrize.slice(0, -3));
    }
    if (singleContestObj.secondPlacePrize) {
      totalAmount =
        totalAmount +
        parseFloat(singleContestObj.secondPlacePrize.slice(0, -3));
    }
    return totalAmount;
  };

  itHasNoAwards = () => {
    let { getContestState } = this.props;
    const { singleContestObj } = getContestState;
    if (singleContestObj) {
      if (
        (singleContestObj.secondPrize === "USD" ||
          singleContestObj.secondPrize === "KRW" ||
          singleContestObj.secondPrize === "JPY" ||
          singleContestObj.secondPrize === singleContestObj.currencyCode) &&
        (singleContestObj.thirdPrize === "USD" ||
          singleContestObj.thirdPrize === "KRW" ||
          singleContestObj.thirdPrize === "JPY" ||
          singleContestObj.thirdPrize === singleContestObj.currencyCode)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    let { languageType, language, getContestState } = this.props;
    let { activeTab, unHiredCandidates } = this.state;
    const {
      getContestByIdPending,
      getContestByIdSuccess,
      getContestByIdFailure,
    } = getContestState;
    let { singleContestObj } = getContestState;
    console.log(language);
    if (!singleContestObj) {
      singleContestObj = {};
    }
    {
      console.log(getContestState, "getContestState");
    }
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post invoice_tab work_card">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChange("My Contests")}
                    >
                      <a
                        className={`nav-link ${
                          activeTab == "My Contests" ? "active" : ""
                        }`}
                        id="pills-home-tab"
                        data-toggle="pill"
                        // href="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        {languageType.MY_CONTEST}
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChange("Candidate")}
                    >
                      <a
                        className={`nav-link ${
                          activeTab == "Candidate" ? "active" : ""
                        }`}
                        id="pills-profile-tab"
                        data-toggle="pill"
                        // href="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        {languageType.CANDIDATES_TEXT}
                      </a>
                    </li>
                  </ul>
                  <div
                    className="tab-content workDiary_tab pb-0"
                    id="pills-tabContent"
                  >
                    <div
                      className={`tab-pane fade ${
                        activeTab == "My Contests" ? "show active" : ""
                      }`}
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="hourly_limit post_form hourly_report">
                        {getContestByIdPending && (
                          <div className="pb-5">
                            <Skeleton
                              count={3}
                              isSkeletonLoading={getContestByIdPending}
                            />
                          </div>
                        )}

                        {getContestByIdSuccess && (
                          <div className="myContest">
                            <div className="hourly_rate">
                              <div className="work_date save_cancel">
                                <span>
                                  {languageType.DUE_DATE}: {"2017 Aug 21"}
                                </span>
                                <button
                                  type="button"
                                  className="btn save_btn"
                                  data-toggle="modal"
                                  data-target="#create-milage-modal"
                                >
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  ></i>
                                  {languageType.EXTEND_DUE_DATE}
                                </button>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      {languageType.PROJECT_TITLE} :{" "}
                                    </label>
                                    <span>
                                      {(singleContestObj &&
                                        singleContestObj.jobTitle) ||
                                        "Design the brand logo"}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      {languageType.PAYMENT_CONFIRMATION_TYPE} :{" "}
                                    </label>
                                    <span>
                                      {singleContestObj &&
                                      singleContestObj.paymentConfirmation
                                        ? "Guranteed"
                                        : "Not Guranteed"}
                                    </span>
                                  </div>

                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      Private :{" "}
                                    </label>
                                    <span>
                                      {singleContestObj &&
                                      singleContestObj.isContestPrivate
                                        ? "Yes"
                                        : "No"}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    {this.itHasNoAwards() ? (
                                      <>
                                        <label className="boldText">
                                          {languageType.WINNING_AMOUNT}:{" "}
                                        </label>
                                        <span>
                                          {this.finalizeAmount(
                                            singleContestObj.winningAmount,
                                            singleContestObj.currencyCode,
                                            false
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {language === "korean" ? (
                                          <label className="boldText mr-4">
                                            {languageType.AWARDS_TEXT}:{" "}
                                          </label>
                                        ) : (
                                          <label className="boldText ">
                                            {languageType.AWARDS_TEXT}:{" "}
                                          </label>
                                        )}

                                        <span className="mr-3">1st</span>
                                        <span className="rate_box">
                                          {this.finalizeAmount(
                                            singleContestObj.winningAmount,
                                            singleContestObj.currencyCode,
                                            false
                                          )}
                                        </span>
                                        <span>
                                          <a>
                                            <i
                                              className="fa fa-pencil"
                                              aria-hidden="true"
                                            ></i>
                                          </a>
                                        </span>
                                      </>
                                    )}
                                  </div>

                                  {this.itHasNoAwards() ? (
                                    ""
                                  ) : (
                                    <>
                                      <div className="d-flex align-items-center award_lbl">
                                        <span className="mr-3">2nd</span>
                                        <span className="rate_box">
                                          {this.finalizeAmount(
                                            singleContestObj.secondPrize,
                                            singleContestObj.currencyCode,
                                            true
                                          )}
                                        </span>
                                        <span>
                                          <a>
                                            <i
                                              className="fa fa-pencil"
                                              aria-hidden="true"
                                            ></i>
                                          </a>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center award_lbl">
                                        <span className="mr-3">3rd</span>
                                        <span className="rate_box">
                                          {this.finalizeAmount(
                                            singleContestObj.thirdPrize,
                                            singleContestObj.currencyCode,
                                            true
                                          )}
                                        </span>
                                        <span>
                                          <a>
                                            <i
                                              className="fa fa-pencil"
                                              aria-hidden="true"
                                            ></i>
                                          </a>
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      {languageType.CONTEST_PROMOTED}:{" "}
                                    </label>
                                    <span>US$79.00</span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      {languageType.CONTEST_FEATURED}:{" "}
                                    </label>
                                    <span>US$49.00</span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="boldText">
                                      {languageType.CONTEST_BLIND} :
                                    </label>
                                    <span>US$39.00</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right total_price">
                                <span>
                                  {languageType.TOTAL_TEXT}:{" "}
                                  {this.itHasNoAwards()
                                    ? this.finalizeAmount(
                                        singleContestObj.winningAmount,
                                        singleContestObj.currencyCode,
                                        false
                                      )
                                    : this.finalizeAmount(
                                        this.countTotalPrizes(),
                                        singleContestObj.currencyCode,
                                        false
                                      )}
                                </span>
                                <div className="save_cancel">
                                  <button
                                    type="button"
                                    className="btn cancel_btn"
                                  >
                                    {languageType.ADD_MORE_SERVICES}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="work_detail contract_detail">
                              <h5>{languageType.CONTRACT_HISTORY}</h5>
                              <div className="contract_tbl">
                                <small className="red_text">
                                  This is your last free contest
                                </small>
                                <div className="table-responsive detail_tbl">
                                  <ContractChangeTable />
                                </div>
                                <Pagenation />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="contest_details__backButton">
                      <button
                        type="button"
                        className="btn cancel_btn"
                        onClick={() => {
                          this.props.history.push("/my-contracts");
                        }}
                      >
                        <i className="fas fa-chevron-left"></i> Back{" "}
                      </button>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab == "Candidate" ? "show active" : ""
                      }`}
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      {getContestByIdPending && (
                        <div className="pb-5">
                          <Skeleton
                            count={3}
                            isSkeletonLoading={getContestByIdPending}
                          />
                        </div>
                      )}

                      {getContestByIdSuccess && (
                        <div className="task_manage candidate_tbl">
                          {getContestByIdSuccess &&
                            unHiredCandidates &&
                            unHiredCandidates.length > 0 && (
                              <div className="d-flex justify-content-lg-end align-items-lg-end">
                                <label className="font-weight-bold">Sort</label>
                                <div className="">
                                  <DropdownList
                                    className="contest_details__sortDropdown"
                                    id="sort"
                                    name="sort"
                                    // value={}
                                    selectItem={(value) => {}}
                                    items={[
                                      {
                                        text: "Interesting",
                                        value: "Interesting",
                                      },
                                      {
                                        text: "Deactivate",
                                        value: "Deactivate",
                                      },
                                    ]}
                                  />
                                </div>
                              </div>
                            )}

                          <div className="table-responsive detail_tbl">
                            {getContestByIdPending ? (
                              <Skeleton
                                count={3}
                                isSkeletonLoading={getContestByIdPending}
                              />
                            ) : this.state.unHiredCandidates &&
                              this.state.unHiredCandidates.length < 0 ? (
                              this.state.unHiredCandidates.map(
                                (proposal, index) => (
                                  <div
                                    className="col-md-12"
                                    key={`HiredProposal${index}`}
                                  >
                                    <div className="row">
                                      <div className="col-md-3">
                                        {<LeftSection projectObj={proposal} />}
                                      </div>
                                      <div className="col-md-9">
                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <label className="project_details__reviewProposals_candidateName">
                                                {proposal.userName}
                                              </label>
                                              <label
                                                style={{
                                                  fontWeight: "bold",
                                                  fontSize: 14,
                                                  display: "flex",
                                                  lineHeight: 1,
                                                }}
                                              >
                                                Web developer
                                              </label>
                                              <label
                                                style={{
                                                  display: "flex",
                                                  fontSize: 12,
                                                  lineHeight: 1,
                                                }}
                                              >
                                                {proposal.userCountry}
                                              </label>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="text-right save_cancel">
                                                <button
                                                  type="button"
                                                  className="btn save_btn"
                                                  onClick={() => {
                                                    this.setState({
                                                      isRequestaRefundOpen: true,
                                                      proposedAmount:
                                                        proposal.amount,
                                                      freelancerUserId:
                                                        proposal.userId,
                                                    });
                                                  }}
                                                  disabled={
                                                    proposal.disputeCode !== ""
                                                  }
                                                >
                                                  Request a Refund
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row"
                                            style={{ marginTop: 5 }}
                                          >
                                            <div className="col-md-4">
                                              {singleContestObj.currencyCode}{" "}
                                              {proposal.amount}
                                            </div>
                                            <div className="col-md-4">$0</div>
                                          </div>
                                          <div
                                            className="row"
                                            style={{
                                              marginTop: 10,
                                              marginBottom: 20,
                                            }}
                                          >
                                            <div className="col-md-12">
                                              <div className="row">
                                                <div
                                                  className="col-md-2"
                                                  style={{ fontWeight: "bold" }}
                                                >
                                                  Cover Letter:
                                                </div>
                                                <div className="col-md-10">
                                                  {/* <div dangerouslySetInnerHTML={{ __html: proposal.coverLetter }}></div> */}
                                                  <ShowMoreText
                                                    lines={5}
                                                    more="show more"
                                                    less={"Show Less"}
                                                    className="content-css"
                                                    anchorClass="view-more-less"
                                                    expanded={false}
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          proposal.coverLetter,
                                                      }}
                                                    />
                                                  </ShowMoreText>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                )
                              )
                            ) : (
                              <div className="project_details__reviewProposals_emptyStateWrapper">
                                <div>
                                  <img src={emptyContestState} height={175} />
                                </div>
                                <div className="project_details__reviewProposals_emptyStateWrapperDesc">
                                  Nobody has participated in this contest yet.
                                  Please try after some time.
                                </div>
                              </div>
                            )}
                          </div>
                          <Pagenation />
                        </div>
                      )}
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
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    authData: state.authReducer,
    getContestState: state.contest,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    getContestByProjectId: (contestId) => {
      dispatch(getContestById(contestId));
    },
    getContestCleanUpRequest: () => {
      dispatch(getContestByIdRequestCleanUp());
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(MyContest);

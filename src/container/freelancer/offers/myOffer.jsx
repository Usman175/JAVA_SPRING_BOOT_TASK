import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { onReduxLangaugeChange } from "../../../store/action/action";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import UserCard from "../../../components/proposals/userCard";
import { ProjectTypeConst } from "../../../utils/projectConst";
import Skeleton from "../../../components/skeleton/skeleton";
import Pagination from "../../../components/pagination";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import SubHeader from "../../../components/subHeader";
class MyOffer extends Component {
  constructor(props) {
    super(props);

    let searchProject = new URLSearchParams(this.props.location.search).get(
      "searchProject"
    );
    let category = new URLSearchParams(this.props.location.search).get(
      "category"
    );
    let projectStatuses = new URLSearchParams(this.props.location.search).get(
      "status"
    );
    let projectStatusArray =
      projectStatuses !== "" &&
      projectStatuses !== null &&
      projectStatuses !== undefined
        ? projectStatuses.split(",")
        : [];

    this.state = {
      searchProject:
        searchProject !== null &&
        searchProject !== "" &&
        searchProject !== undefined
          ? searchProject
          : "",
      selectedCategory:
        category !== null && category !== "" && category !== undefined
          ? category
          : "",
      selectedProjectType: "",
      selectedProjectStatus:
        projectStatusArray.length > 0 ? projectStatusArray.join() : "",
      freelancerUserId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      projectTypes: [],
      projectStatuses: [
        { name: "recruitment", title: "Recruitment", checked: false },
        { name: "onGoing", title: "On Going", checked: false },
        { name: "completed", title: "Completed", checked: false },
      ],
      isSkeletonLoading: false,
      offerData: [],
      userData: this.props.userReducer.user,
      pagination: {
        pageSize: 10,
        lastPkEvaluated: "",
        pageNumber: 1,
        total: 10,
      },
      lastPkEvaluatedTrack: [],
      isNextPage: true,
      isPreviousPage: false,
      userReviews: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    let category = new URLSearchParams(nextProps.location.search).get(
      "category"
    );
    let searchProject = new URLSearchParams(nextProps.location.search).get(
      "searchProject"
    );
    this.state.searchProject =
      searchProject !== null &&
      searchProject !== "" &&
      searchProject !== undefined
        ? searchProject
        : "";
    this.state.selectedCategory =
      category !== null && category !== "" && category !== undefined
        ? category
        : "";
    // this.setState({ lastPkEvaluatedTrack: [] });
    // this.bindOffers("", "next");
  }

  componentWillMount() {
    //this.bindProjectTypes();
    this.bindOffers();
    this.bindUserReview();
  }

  //#region Bind Methods
  async bindProjectTypes() {
    let array = [];
    let projectTypes = new URLSearchParams(this.props.location.search).get(
      "type"
    );
    let projectTypeArray =
      projectTypes !== "" && projectTypes !== null && projectTypes !== undefined
        ? projectTypes.split(",")
        : [];

    Object.entries(ProjectTypeConst).map((item, index) => {
      let isChecked = projectTypeArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1],
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectType +=
          (this.state.selectedProjectType !== "" ? "," : "") + item[1];
    });
    this.setState({ projectTypes: array });
  }
  /// 105557885652848759469
  async bindOffers(move, lastPkEvaluated) {
    this.setState({ isSkeletonLoading: true, offerData: [] });
    let pageNumber = this.state.pagination.pageNumber;
    if (move === "next") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber + 1,
        },
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber - 1,
        },
      });
      pageNumber = pageNumber - 1;
    }
    let queryString =
      `?freelancerUserId=` +
      this.state.freelancerUserId +
      `&pageSize=` +
      this.state.pagination.pageSize +
      `&search=` +
      "" +
      `&pageNumber=` +
      pageNumber;

    let result = await request(
      `${ENDPOINT["GetOfferContracts"]}` + queryString,
      getOptions({})
    );

    if (result.success) {
      console.log(result, "result");
      let array = result.result.entries ? result.result.entries : [];
      array.map((element, index) => {
        if (element.hasOwnProperty("offerDateTime"))
          element.offerDateTime = moment(element.offerDateTime).format(
            "DD-MMM-YYYY hh:mm a"
          );
        if (element.hasOwnProperty("offerClosedDateTime"))
          element.offerClosedDateTime = moment(
            element.offerClosedDateTime
          ).format("DD-MMM-YYYY hh:mm a");
        if (element.hasOwnProperty("finalizedDateTime"))
          element.finalizedDateTime =
            element.finalizedDateTime !== null &&
            element.finalizedDateTime !== ""
              ? moment(element.finalizedDateTime).format("DD-MMM-YYYY hh:mm a")
              : "";
        if (element.hasOwnProperty("declinedDateTime"))
          element.declinedDateTime =
            element.declinedDateTime !== null && element.declinedDateTime !== ""
              ? moment(element.declinedDateTime).format("DD-MMM-YYYY hh:mm a")
              : "";
      });

      this.bindUser();

      let lastPkEvaluatedTrackLocal = this?.state?.lastPkEvaluatedTrack;
      if (move === "next") {
        lastPkEvaluatedTrackLocal.push(lastPkEvaluated);
      } else if (move === "prev") {
        lastPkEvaluatedTrackLocal.pop();
      }

      this.setState({
        isSkeletonLoading: false,
        offerData: array,
        pagination: {
          ...this.state.pagination,
          pageSize: this.state.pagination.pageSize,
          total: result.result.total,
          lastPkEvaluated: result.result.lastPkEvaluated,
        },
        lastPkEvaluatedTrack: lastPkEvaluatedTrackLocal,
        isNextPage: result.result.isNextPage,
        isPreviousPage: result.result.isPreviousPage,
      });
    }
  }

  async bindUser() {
    if (!this.props.userReducer.user && !this.props.userReducer.isLoading) {
      let result = await request(
        `${ENDPOINT["GetUser"]}?userId=` + this.state.freelancerUserId,
        getOptions({})
      );
      if (
        result.success &&
        result.result.entries &&
        Object.keys(result.result.entries).length > 0
      ) {
        this.setState({ userData: result.result.entries });
      }
    }
  }

  async bindUserReview() {
    let result = await request(
      `${ENDPOINT["GetProjectReviewFreeLancerWise"]}?freelancerUserId=${this.state.freelancerUserId}`
    );
    if (
      result.success &&
      result.result.data &&
      Object.keys(result.result.data).length > 0
    ) {
      this.setState({ userReviews: result.result.data });
    }
  }

  //#endregion Bind Methods

  //#region Change Event
  onCheckboxChangeHandle = (event, type, index) => {
    let { projectTypes, projectStatuses } = this.state;
    let { name, checked } = event.target;
    if (type === "projectTypes") {
      projectTypes[index].checked = checked;
      this.state.selectedProjectType = "";
      projectTypes.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectType +=
            (this.state.selectedProjectType !== "" ? "," : "") + element.title;
      });
    }
    if (type === "projectStatuses") {
      projectStatuses[index].checked = checked;
      this.state.selectedProjectStatus = "";
      projectStatuses.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectStatus +=
            (this.state.selectedProjectStatus !== "" ? "," : "") +
            element.title;
      });
    }
    this.setState({ projectTypes, projectStatuses });

    let redirectTo = "";
    if (this.state.searchProject !== "")
      redirectTo += `?searchProject=` + this.state.searchProject;
    if (this.state.selectedCategory !== "")
      redirectTo +=
        (redirectTo !== "" ? `&category=` : `?category=`) +
        this.state.selectedCategory;
    if (this.state.selectedProjectType !== "")
      redirectTo +=
        (redirectTo !== "" ? `&type=` : `?type=`) +
        this.state.selectedProjectType;
    if (this.state.selectedProjectStatus !== "")
      redirectTo +=
        (redirectTo !== "" ? `&status=` : `?status=`) +
        this.state.selectedProjectStatus;
    redirectTo += redirectTo === "" ? this.props.location.pathname : "";
    // this.props.history.push(redirectTo);
  };
  //#endregion Change Event

  render() {
    let {
      isSkeletonLoading,
      offerData,
      userData,
      pagination,
      lastPkEvaluatedTrack,
      userReviews,
      isNextPage,
      isPreviousPage,
    } = this.state;
    // console.log(pagination,"pagination")
    const user = this.props.userReducer.user || userData;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <UserCard userObj={{ ...user, userReviews }} />
                  </div>
                  {/*
                    <div className="col-lg-12 col-md-6">
                      <CheckboxCard title="Contest Type" data={projectTypes} type="projectTypes" onChange={this.onCheckboxChangeHandle} />
                    </div>
                    <div className="col-lg-12 col-md-6">
                        <CheckboxCard title="Status" data={projectStatuses} type="projectStatuses" onChange={this.onCheckboxChangeHandle} />
                    </div>
                  */}
                </div>
              </div>

              <div className="col-lg-8 col-md-12">
                <Skeleton
                  count={this.state.pagination.pageSize}
                  isSkeletonLoading={isSkeletonLoading}
                />
                <div style={{ marginTop: "20px" }}>
                  {offerData &&
                    offerData.map((offer, index) => (
                      <>
                        <div key={`offer${index}`} className="card_box">
                          <div className="row align-items-center">
                            <h4
                              className="col-8 underline_hover pl-0"
                              style={{
                                color: "#4A4949",
                                fontWeight: "700",
                                fontStyle: "normal",
                              }}
                            >
                              {offer.jobTitle && offer.jobTitle != " "
                                ? offer.jobTitle
                                : `job title ${index}`}
                            </h4>
                            <div
                              className="col-4 align-items-center"
                              hidden={!offer.isOfferFinalized}
                            >
                              <span style={{ float: "right" }}>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                  style={{ fontSize: "25px", color: "green" }}
                                ></i>
                                &nbsp;Finalize
                              </span>
                            </div>
                            <div
                              className="col-4 align-items-center"
                              hidden={!offer.isOfferDeclined}
                            >
                              <span style={{ float: "right" }}>
                                <i
                                  className="fa fa-window-close "
                                  aria-hidden="true"
                                  style={{ fontSize: "25px", color: "red" }}
                                ></i>
                                &nbsp;Decline
                              </span>
                            </div>
                            <a
                              onClick={() =>
                                this.props.history.push(
                                  "/offer-detail?projectId=" + offer.projectId
                                )
                              }
                              className="col-4 text-right text-info align-self-start"
                            >
                              To View More details
                            </a>
                            <div className="d-flex mt-3 col-12 pl-0">
                              <span className="pr-2 py-2 h6 text-muted font-weight-bold">
                                {offer.projectType && offer.projectType != " "
                                  ? offer.projectType
                                  : `Poject Type ${index}`}
                              </span>
                              <span className="p-2 h6 text-muted font-weight-bold">
                                {offer.projectScope && offer.projectScope != " "
                                  ? offer.projectScope
                                  : `Project Scope ${index}`}
                              </span>
                            </div>
                            <div className="border-top border-bottom col-12 tab-container text-muted mb-3">
                              <div className="tab-value bg-warning text-right">
                                Project Budget
                              </div>
                              <div className="tab-value">
                                {offer.currencyCode && offer.currencyCode != " "
                                  ? offer.currencyCode
                                  : `$`}
                                {offer.projectAmount &&
                                offer.projectAmount != " "
                                  ? offer.projectAmount
                                  : `0`}
                                {/* {offer.currencyCode} {offer.projectAmount} */}
                              </div>
                              <div className="tab-value bg-warning text-right">
                                Offer Amount
                              </div>
                              <div className="tab-value">
                                {offer.currencyCode && offer.currencyCode != " "
                                  ? offer.currencyCode
                                  : `$`}
                                {offer.offerAmount && offer.offerAmount != " "
                                  ? offer.offerAmount
                                  : `0`}
                                {/* {offer.offerAmount} */}
                              </div>
                              <div className="tab-value bg-warning text-right">
                                Offer Date Time
                              </div>
                              <div className="tab-value">
                                {offer.offerDateTime &&
                                offer.offerDateTime != " "
                                  ? offer.offerDateTime
                                  : JSON.stringify(new Date())}
                                {/* {offer.offerDateTime} */}
                              </div>
                              <div className="tab-value bg-warning text-right">
                                Offer Closed Date Time
                              </div>
                              <div className="tab-value">
                                {offer.offerClosedDateTime &&
                                offer.offerClosedDateTime != " "
                                  ? offer.offerClosedDateTime
                                  : JSON.stringify(new Date())}
                                {/* {offer.offerClosedDateTime} */}
                              </div>
                              {offer.isOfferFinalized && (
                                <>
                                  <div className="tab-value bg-warning text-right">
                                    Finalize Amount
                                  </div>
                                  <div className="tab-value">
                                    {offer.currencyCode &&
                                    offer.currencyCode != " "
                                      ? offer.currencyCode
                                      : `$`}
                                    {offer.finalizedAmount &&
                                    offer.finalizedAmount != " "
                                      ? offer.finalizedAmount
                                      : `0`}
                                    {/* {offer.finalizedAmount} */}
                                  </div>
                                  <div className="tab-value bg-warning text-right">
                                    Finalize Date Time
                                  </div>
                                  <div className="tab-value">
                                    {offer.finalizedDateTime &&
                                    offer.finalizedDateTime != " "
                                      ? offer.finalizedDateTime
                                      : JSON.stringify(new Date())}
                                    {/* {offer.finalizedDateTime} */}
                                  </div>
                                </>
                              )}
                              {offer.isOfferDeclined && (
                                <>
                                  <div className="tab-value bg-warning text-right">
                                    Decline Reason
                                  </div>
                                  <div className="tab-value">
                                    {offer.declinedReason}
                                  </div>
                                  <div className="tab-value bg-warning text-right">
                                    Decline Date Time
                                  </div>
                                  <div className="tab-value">
                                    {offer.declinedDateTime}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                </div>

                {offerData?.length > 0 && (
                  <Pagination
                    isPreviousPage={pagination.pageNumber > 1 ? true : false}
                    isNextPage={
                      pagination.pageNumber * pagination.pageSize <
                      pagination.total
                        ? true
                        : false
                    }
                    pageNumber={pagination.pageNumber}
                    lastPkEvaluatedTrack={offerData}
                    moveBack={() => this.bindOffers("prev")}
                    moveNext={() => this.bindOffers("next")}
                  />
                )}
                {!isSkeletonLoading && !offerData.length && (
                  <NoDataAvailable
                    title="Sorry no offer exist yet !"
                    color={"#0d2146"}
                    {...this.props}
                  />
                )}
              </div>
              <div className="col-lg-2 col-md-12">
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
    authUser: state.authReducer,
    userReducer: state.userReducer,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(MyOffer);

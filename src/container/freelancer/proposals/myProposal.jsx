import React, { Component } from "react";
import { connect } from "react-redux";
import { onReduxLangaugeChange } from "../../../store/action/action";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import UserCard from "../../../components/proposals/userCard";
import { ProposalTipCard } from "../../../components/proposals/proposalTipCard";
import Proposals from "../../../components/proposals/proposals";
import Skeleton from "../../../components/skeleton/skeleton";
import Pagination from "../../../components/pagination";
import SubHeader from "../../../components/subHeader";
import "./myProposal.scss";

class MyProposal extends Component {
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
      userId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      projectTypes: [],
      projectStatuses: [],
      // projectStatuses: [
      isSkeletonLoading: false,
      proposalData: [],
      userData: this.props.userState.user,
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

    this.setState({ lastPkEvaluatedTrack: [] });
  }

  componentDidMount() {
    this.bindProjectTypes();
    this.bindProjectStatuses();
    this.bindUser();
    // this.bindUserReview();
    this.bindProposals("");
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

    Object.entries(this.props.projectTypes).map((item, index) => {
      let isChecked = projectTypeArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1].text,
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectType +=
          (this.state.selectedProjectType !== "" ? "," : "") + item[1].value;
    });
    this.setState({ projectTypes: array });
  }

  async bindProjectStatuses() {
    let array = [];

    let projectStatuses = new URLSearchParams(this.props.location.search).get(
      "type"
    );

    let projectStatusArray =
      projectStatuses !== "" &&
      projectStatuses !== null &&
      projectStatuses !== undefined
        ? projectStatuses.split(",")
        : [];

    Object.entries(this.props.projectStatuses).map((item, index) => {
      let isChecked = projectStatusArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1].text,
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectStatus +=
          (this.state.selectedProjectStatus !== "" ? "," : "") + item[1].value;
    });
    this.setState({ projectStatuses: array });
  }

  async bindProposals(lastPkEvaluated, move) {
    this.setState({ isSkeletonLoading: true, proposalData: [] });

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
      `?projectTypes=` +
      this.state.selectedProjectType +
      `&projectStatus=` +
      this.state.selectedProjectStatus +
      `&projectScope=` +
      this.state.selectedCategory +
      `&search=` +
      this.state.searchProject +
      `&freelancerReferenceId=` +
      this.state.userId +
      `&pageSize=` +
      this.state.pagination.pageSize +
      `&pageNumber=` +
      pageNumber;
    // 1 +
    // `&lastPkEvaluated=` +
    // lastPkEvaluated +
    // `&isHired=` +
    // false;
    let result = await request(
      `${ENDPOINT["GetUserProposals"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      let array = result.result.entries ? result.result.entries : [];
      array = array.filter((itemData) => itemData.isHired !== true);

      let lastPkEvaluatedTrackLocal = this?.state?.lastPkEvaluatedTrack;
      if (move === "next") {
        lastPkEvaluatedTrackLocal.push(lastPkEvaluated);
      } else if (move === "prev") {
        lastPkEvaluatedTrackLocal.pop();
      }

      this.setState({
        //proposalData: array.length > 0 ? array : this.state.proposalData,
        isSkeletonLoading: false,
        proposalData: array,
        pagination: {
          pageSize: this.state.pagination.pageSize,
          lastPkEvaluated: result.result.lastPkEvaluated,
          ...this.state.pagination,
        },
        lastPkEvaluatedTrack: lastPkEvaluatedTrackLocal,
        isNextPage: result.result.isNextPage,
        isPreviousPage: result.result.isPreviousPage,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      this.setState({ isSkeletonLoading: false });
    }
  }

  async bindUser() {
    if (!this.props.userState.user && !this.props.userState.isLoading) {
      let result = await request(
        `${ENDPOINT["GetUser"]}?userId=${this.state.userId}`,
        getOptions({})
      );
      if (
        result.success &&
        result.result.data &&
        Object.keys(result.result?.data).length > 0
      ) {
        this.setState({ userData: result.result.data });
      }
    }
  }

  async bindUserReview() {
    let result = await request(
      `${ENDPOINT["GetProjectReviewFreeLancerWise"]}?freelancerUserId=${this.state.userId}`
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
    let { checked } = event.target;
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
      this.state.selectedProjectType = "";
      projectStatuses.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectType +=
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
    this.props.history.push(redirectTo);
  };

  //#endregion Change Event

  render() {
    let {
      isSkeletonLoading,
      proposalData,
      projectTypes,
      projectStatuses,
      userData,
      pagination,
      lastPkEvaluatedTrack,
      userReviews,
      isNextPage,
      isPreviousPage,
    } = this.state;
    const user = this.props.userState.user || userData;
    let { languageType } = this.props;
    return (
      <>
        <SubHeader />
        <section className="card_proposals">
          <div className="bcknd_container">
            <div className="row">
              <div
                className="col-lg-2 col-md-12"
                style={{ marginTop: "-20px" }}
              >
                <div className="row">
                  <div hidden={true} className="col-lg-12 col-md-6">
                    <UserCard userObj={{ ...user, userReviews }} />
                  </div>
                  <div
                    className="col-lg-12 col-md-6"
                    style={{ marginTop: "0px" }}
                  >
                    <ProjectTypeFilter onChange={this.onCheckboxChangeHandle} />
                  </div>
                  {/* <div className="col-lg-12 col-md-6">
                    <CheckboxCard
                      title="Status"
                      data={projectStatuses}
                      type="projectStatuses"
                      onChange={this.onCheckboxChangeHandle}
                    />
                  </div> */}
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div hidden={!isSkeletonLoading} style={{ marginTop: "-20px" }}>
                  <Skeleton
                    count={this.state.pagination.pageSize}
                    isSkeletonLoading={isSkeletonLoading}
                  />
                </div>
                {!isSkeletonLoading && (
                  <div
                    className="card_box pl-1 pt-1 cardBox_proposal_MarginMobile"
                    style={{ marginTop: "0px" }}
                  >
                    <span hidden={true}>
                      {" "}
                      <ProposalTipCard />
                    </span>
                    <Proposals
                      handleWithdrawProposal={() => this.bindProposals("")}
                      languageType={languageType}
                      proposalData={proposalData}
                      {...this.props}
                    />
                  </div>
                )}
                {/* {proposalData &&
                  proposalData.map((d, index) => (
                    <ProposalCard
                      key={`proposal${index}`}
                      cardData={d}
                      props={this.props}
                    />
                  ))} */}
                {proposalData?.length > 0 && (
                  <Pagination
                    isPreviousPage={pagination.pageNumber > 1 ? true : false}
                    isNextPage={
                      pagination.pageNumber * pagination.pageSize <
                      pagination.total
                        ? true
                        : false
                    }
                    pageNumber={pagination.pageNumber}
                    lastPkEvaluatedTrack={proposalData}
                    moveBack={() => this.bindProposals("prev")}
                    moveNext={() => this.bindProposals("next")}
                  />
                )}
              </div>
              <div
                hidden={true}
                className="col-lg-2 col-md-12"
                style={{ marginTop: "-20px" }}
              >
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
    projectTypes: state.languageReducer.projectTypes,
    projectStatuses: state.languageReducer.projectStatuses,
    userState: state.userReducer,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(MyProposal);

import React, { Component } from "react";
import { connect } from "react-redux";
import { onReduxLangaugeChange } from "../../../store/action/action";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import HourlyFreeLancer from "./freelancerType/hourlyFreeLancer.jsx";
import MilestoneFreelancer from "./freelancerType/milestoneFreelancer.jsx";
import HourlyAndOfficeFreelancer from "./freelancerType/hourlyAndOfficeFreelancer.jsx";
import InOfficeFreelancer from "./freelancerType/inOfficeFreelancer.jsx";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import CheckboxCard from "../../../components/checkboxCard/checkboxCard.jsx";
import { ProjectTypeConst } from "../../../utils/projectConst";
import { UserTypeConst } from "../../../utils/userTypeConst";
import { FreelancerTypeConst } from "../../../utils/freelancerConst";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import Skeleton from "../../../components/skeleton/skeleton";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import LoginRequired from "../../../components/modals/loginRequired";
import Pagination from "../../../components/pagination";
import SubHeader from "../../../components/subHeader";
class MyFreelancer extends Component {
  constructor(props) {
    super(props);

    let projectStatuses = new URLSearchParams(this.props.location.search).get(
      "status"
    );
    let projectStatusArray =
      projectStatuses !== "" &&
        projectStatuses !== null &&
        projectStatuses !== undefined
        ? projectStatuses.split(",")
        : [];
    let sessionUserType = sessionStorage.getItem("userType");

    this.state = {
      selectedProjectType: "",
      selectedFreelancerType: "",
      selectedProjectStatus:
        projectStatusArray.length > 0 ? projectStatusArray.join() : "",
      userType: sessionUserType,
      postUserId: props.authUser?.clientAuth?.clientId,
      projectTypes: [],
      freelancerTypes: [],
      projectStatuses: [],
      isSkeletonLoading: false,
      freelancerData: [],
      pagination: { pageSize: 100, lastPkEvaluated: "", lastSkEvaluated: "" },
      lastPkEvaluatedTrack: [],
      lastSkEvaluatedTrack: [],
      isNextPage: true,
      isPreviousPage: false,
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);

    this.bindProjectTypes();
    this.bindFreelancerTypes();
    this.GetMyFreelancers("", "next", "");
  }

  componentDidMount() {
    let userType = sessionStorage.getItem("userType");
    if (userType === "Freelancer") {
      return this.props.history.push("/");
    }
    this.bindProjectTypes();
    this.bindProjectStatuses();
  }

  //#region Bind Events
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

  //#freelancer types
  async bindFreelancerTypes() {
    let array = [];

    let freelancerTypes = new URLSearchParams(this.props.location.search).get(
      "freelancerType"
    );
    let freelancerTypeArray =
      freelancerTypes !== "" &&
        freelancerTypes !== null &&
        freelancerTypes !== undefined
        ? freelancerTypes.split(",")
        : [];

    Object.entries(this.props.freelancerTypes).map((item, index) => {
      let isChecked = freelancerTypeArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1].text,
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedFreelancerType +=
          (this.state.selectedFreelancerType !== "" ? "," : "") + item[1].value;
    });
    this.setState({ freelancerTypes: array });
  }

  async GetMyFreelancers(lastPkEvaluated, move, lastSkEvaluated) {
    this.setState({ isSkeletonLoading: true, freelancerData: [] });
    let queryString =
      `?projectTypes=` +
      this.state.selectedProjectType +
      `?freelancerType=` +
      this.state.selectedFreelancerType +
      `&projectStatus=` +
      this.state.selectedProjectStatus +
      `&clientId=` +
      this.state.postUserId +
      `&pageSize=` +
      this.state.pagination.pageSize +
      `&lastPkEvaluated=` +
      lastPkEvaluated +
      `&lastSkEvaluated` +
      lastSkEvaluated;

    let result = await request(
      `${ENDPOINT["GetMyFreelancers"]}` + queryString,
      getOptions({})
    );

    if (result.success) {
      let array = result.result.data;
      let lastPkEvaluatedTrackLocal = this?.state?.lastPkEvaluatedTrack;
      let lastSkEvaluatedTrackLocal = this?.state?.lastSkEvaluatedTrack;
      if (move === "next") {
        lastPkEvaluatedTrackLocal.push(lastPkEvaluated);
        lastSkEvaluatedTrackLocal.push(lastSkEvaluated);
      } else if (move === "prev") {
        lastPkEvaluatedTrackLocal.pop();
      }

      this.setState({
        isSkeletonLoading: false,
        freelancerData: array,
        pagination: {
          pageSize: this.state.pagination.pageSize,
          lastPkEvaluated: result.result.lastPkEvaluated,
          lastSkEvaluated: result.result.lastSkEvaluated,
        },
        lastPkEvaluatedTrack: lastPkEvaluatedTrackLocal,
        lastSkEvaluatedTrack: lastSkEvaluatedTrackLocal,
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

  openView = (index) => {
    this.setState({
      openStatusIndex: index,
    });
  };

  closeView = (index) => {
    this.setState({
      openStatusIndex: -1,
    });
  };

  getFreelancerType = (freelancer, index) => {
    let { openStatusIndex } = this.state;

    if (freelancer.projectType === ProjectTypeConst.Hourly) {
      return (
        <HourlyFreeLancer
          projectObj={freelancer}
          openStatusIndex={openStatusIndex}
          index={index}
          openView={this.openView}
          closeView={this.closeView}
        />
      );
    } else if (freelancer.projectType === ProjectTypeConst.Milestone) {
      return (
        <MilestoneFreelancer
          projectObj={freelancer}
          openStatusIndex={openStatusIndex}
          index={index}
          openView={this.openView}
          closeView={this.closeView}
        />
      );
    } else if (freelancer.projectType === ProjectTypeConst.FreeContract) {
      return (
        <HourlyAndOfficeFreelancer
          projectObj={freelancer}
          openStatusIndex={openStatusIndex}
          index={index}
          openView={this.openView}
          closeView={this.closeView}
        />
      );
    }
    return (
      <InOfficeFreelancer
        projectObj={freelancer}
        openStatusIndex={openStatusIndex}
        index={index}
        openView={this.openView}
        closeView={this.closeView}
      />
    );
  };

  onCheckboxChangeHandle = (event, type, index) => {
    let { projectTypes, projectStatuses, freelancerTypes } = this.state;
    if (type === "projectTypes") {
      projectTypes[index].checked = event.target.checked;
      this.state.selectedProjectType = "";
      projectTypes.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectType +=
            (this.state.selectedProjectType !== "" ? "," : "") + element.title;
      });
    }
    if (type === "projectStatuses") {
      projectStatuses[index].checked = event.target.checked;
      this.state.selectedProjectStatus = "";
      projectStatuses.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectStatus +=
            (this.state.selectedProjectStatus !== "" ? "," : "") +
            element.title;
      });
    }
    if (type === "freelancerTypes") {
      freelancerTypes[index].checked = event.target.checked;
      this.state.selectedFreelancerType = "";
      freelancerTypes.map((element, i) => {
        if (element.checked)
          this.state.selectedFreelancerType +=
            (this.state.selectedFreelancerType !== "" ? "," : "") +
            element.title;
      });
    }
    this.setState({
      projectTypes,
      projectStatuses,
      lastPkEvaluatedTrack: [],
      freelancerTypes,
    });

    let redirectTo = "";

    if (this.state.selectedProjectType !== "")
      redirectTo +=
        (redirectTo !== "" ? "&type=" : "?type=") +
        this.state.selectedProjectType;
    if (this.state.selectedProjectStatus !== "")
      redirectTo +=
        (redirectTo !== "" ? "&status=" : "?status=") +
        this.state.selectedProjectStatus;

    if (this.state.selectedFreelancerType !== "")
      redirectTo +=
        (redirectTo !== "" ? "&freelancerType=" : "?freelancerType=") +
        this.state.selectedFreelancerType;

    redirectTo += redirectTo === "" ? this.props.location.pathname : "";
    this.props.history.push(redirectTo);
  };

  //#endregion Change Events

  render() {
    let {
      isSkeletonLoading,
      freelancerData,
      pagination,
      projectTypes,
      projectStatuses,
      isNextPage,
      isPreviousPage,
      lastPkEvaluatedTrack,
      lastSkEvaluatedTrack,
      freelancerTypes,
    } = this.state;

    let { authUser, languageType } = this.props;
    return (
      <>
        <SubHeader />
        {authUser.myAuth !== null ? (
          <section className="my-freelancer card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-2 col-md-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-6">
                      <ProjectTypeFilter
                        onChange={this.onCheckboxChangeHandle}
                      />
                    </div>
                    <div
                      className="col-lg-12 col-md-6"
                      style={{ marginTop: "-30px" }}
                    >
                      <CheckboxCard
                        title="Freelancer"
                        data={freelancerTypes}
                        type="freelancerTypes"
                        onChange={this.onCheckboxChangeHandle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12">
                  <Skeleton
                    count={this.state.pagination.pageSize}
                    isSkeletonLoading={isSkeletonLoading}
                  />
                  {freelancerData &&
                    freelancerData.length > 0 &&
                    freelancerData.map((freelancer, index) =>
                      this.getFreelancerType(freelancer, index)
                    )}

                  {(isNextPage || isPreviousPage) &&
                    freelancerData?.length > 0 && (
                      <Pagination
                        isPreviousPage={isPreviousPage}
                        isNextPage={isNextPage}
                        lastPkEvaluatedTrack={lastPkEvaluatedTrack}
                        moveBack={() =>
                          this.GetMyFreelancers(
                            lastPkEvaluatedTrack[
                            lastPkEvaluatedTrack?.length - 2
                            ],
                            "prev",
                            lastSkEvaluatedTrack[
                            lastSkEvaluatedTrack?.length - 2
                            ]
                          )
                        }
                        moveNext={() =>
                          this.GetMyFreelancers(
                            pagination.lastPkEvaluated,
                            "next",
                            pagination.lastSkEvaluated
                          )
                        }
                      />
                    )}

                  {!isSkeletonLoading && !freelancerData.length && (
                    <>
                      <NoDataAvailable
                        title={languageType.NO_FREELANCER_EXISTS_YET}
                        buttonText={languageType.CLICK_HERE_SEE_MORE}
                      />
                    </>
                  )}
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
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    projectTypes: state.languageReducer.projectTypes,
    freelancerTypes: state.languageReducer.freelancerTypes,
    projectStatuses: state.languageReducer.projectStatuses,
    authUser: state.authReducer,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(MyFreelancer);

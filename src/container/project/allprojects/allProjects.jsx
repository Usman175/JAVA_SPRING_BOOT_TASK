import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { onReduxLangaugeChange } from "../../../store/action/action";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import CheckboxCard from "../../../components/checkboxCard/checkboxCard.jsx";
import SubHeader from "../../../components/subHeader";
import ProjectCardbox from "./projectCardbox";
import "./allprojects.scss";
import Skeleton from "../../../components/skeleton/skeleton";
import SkeletonCardBox from "../../../components/skeleton/skeletonCardBox/skeletonCardBox"; 
import Pagination from "../../../components/pagination";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import { projectPost_updateProjectType as updateProjectType } from "../../../store/action/Project/projectActions";
import TopFilter from "./topFilter";
class AllProjects extends Component {
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
      projectStatuses: [],
      topActiveFilter: "Basic",
      projectData: [],
      isSkeletonLoading: false,
      pagination: {
        pageSize: 10,
        lastPkEvaluated: "",
        pageNumber: 1,
        total: 20,
      },
      lastPkEvaluatedTrack: [],
      isNextPage: true,
      isPreviousPage: false,
      projectType: "",
      searchFlag: true,
      filterFlag: false,
      filter: {
        projectType: "",
        businessCategory: "",
        country: "",
      },
      sortFilter: "Basic",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      if (prevProps.location !== this.location) {
        if (prevProps.location.search !== this.props.location.search) {
          this.bindProjectTypes();
        }
      }
    }
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

    if (this.state.searchFlag) {
      (category || searchProject) && this.bindAllProject("", "");
      this.setState({ searchFlag: false });
    }
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
    this.bindProjectTypes();
    this.bindProjectStatuses();
    this.bindAllProject("", "");
  }

  //#region Bind Events
  async bindProjectTypes() {
    /*  debugger */
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
          (this.state.selectedProjectType !== "" ? "," : "") + item[1].text;
    });
    this.setState({ projectTypes: array });
    // this.bindAllProject()
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
          (this.state.selectedProjectStatus !== "" ? "," : "") + item[1].text;
    });
    this.setState({ projectStatuses: array });
  }

  async bindAllProject(
    lastPkEvaluated,
    move,
    projectType,
    country,
    businessCategory,
    remaining,
    amount,
    skills,
    location
  ) {
    this.setState({ isSkeletonLoading: true, projectData: [] });

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
    let selectedProjectStatus =
      this.state.selectedProjectStatus !== undefined &&
      this.state.selectedProjectStatus !== null &&
      this.state.selectedProjectStatus !== ""
        ? this.state.selectedProjectStatus
        : "";

    let queryString = `?projectTypes=${
      projectType ? projectType : ""
    }&projectStatus=${selectedProjectStatus}&projectScope=${
      this.state.selectedCategory || businessCategory ? businessCategory : ""
    }&search=${this.state.searchProject}&pageSize=${
      this.state.pagination.pageSize
    }&pageNumber=${pageNumber}&country=${country ? country : ""}&remaining=${
      remaining ? true : false
    }&amount=${amount ? (amount.highest ? "highest" : "lowest") : ""}&skills=${
      skills ? skills : ""
    }&location=${location ? location : ""}`;

    let result = await request(
      `${ENDPOINT["SearchProjects"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      this.setState({
        isSkeletonLoading: false,
        projectData: result.result.entries,
        pageNumber: result.result.pageNumber,
        pageSize: result.result.pageSize,
        pagination: { ...this.state.pagination, total: result.result.total },
      });
      let array =
        result.result && result.result.entries ? result.result.entries : [];

      array.map((element, i) => {
        if (element.jobDescription) {
          element.jobDescription = element.jobDescription.startsWith("<p>")
            ? element.jobDescription.slice(3)
            : element.jobDescription;
          element.jobDescription = element.jobDescription.endsWith("</p>")
            ? element.jobDescription.slice(0, -4)
            : element.jobDescription;
        }

        if (element.hasOwnProperty("postDateTime"))
          element.postDateTime = moment(element.postDateTime).format(
            "DD-MMM-YYYY"
          );
        if (element.hasOwnProperty("projectAmount"))
          element.projectAmount =
            element.projectAmount === null ||
            (element.projectAmount && element.projectAmount.trim() === "")
              ? 0
              : parseFloat(element.projectAmount).toFixed(2);
        if (element.hasOwnProperty("expectedCompletionDays"))
          element.expectedCompletionDays =
            element.expectedCompletionDays === null ||
            element.expectedCompletionDays.trim() === ""
              ? ""
              : element.expectedCompletionDays;
        if (element.hasOwnProperty("projectRemainingDays"))
          element.projectRemainingDays =
            element.projectRemainingDays === null ||
            element.projectRemainingDays.trim() === ""
              ? ""
              : element.projectRemainingDays;
        if (element.hasOwnProperty("fromSalary"))
          element.fromSalary =
            element?.fromSalary === null || element?.fromSalary.trim() === ""
              ? 0
              : parseFloat(element?.fromSalary).toFixed(2);
        if (element.hasOwnProperty("toSalary"))
          element.toSalary =
            element.toSalary === null || element.toSalary.trim() === ""
              ? 0
              : parseFloat(element.toSalary).toFixed(2);
        if (element.hasOwnProperty("winningAmount"))
          element.winningAmount =
            element.winningAmount === null ||
            element.winningAmount.trim() === ""
              ? 0
              : parseFloat(element.winningAmount).toFixed(2);
        if (element.hasOwnProperty("proposalCount"))
          element.proposalCount =
            element.proposalCount === null || element.proposalCount === ""
              ? 0
              : element.proposalCount;
        if (element.hasOwnProperty("amountPerDay"))
          element.amountPerDay =
            element.amountPerDay === null || element.amountPerDay.trim() === ""
              ? 0
              : parseFloat(element.amountPerDay).toFixed(2);
        if (element.hasOwnProperty("amountPerHour"))
          element.amountPerHour =
            element.amountPerHour === null ||
            element.amountPerHour.trim() === ""
              ? 0
              : parseFloat(element.amountPerHour).toFixed(2);

        if (element.hasOwnProperty("maximumWeekHours"))
          element.maximumWeekHours =
            element.maximumWeekHours !== undefined &&
            element.maximumWeekHours !== null &&
            element.maximumWeekHours.trim() !== ""
              ? parseInt(element.maximumWeekHours)
              : 0;
      });

      let lastPkEvaluatedTrackLocal = this?.state?.lastPkEvaluatedTrack;
      if (move === "next") {
        lastPkEvaluatedTrackLocal.push(lastPkEvaluated);
      } else if (move === "prev") {
        lastPkEvaluatedTrackLocal.pop();
      }
      this.setState({
        projectData: array,
        pagination: {
          ...this.state.pagination,
          pageSize: this.state.pagination.pageSize,
          lastPkEvaluated: result.result.lastPkEvaluated,
          total: result.result.total,
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
  //#endregion Bind Events

  //#region Change Event
  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };
  onCheckboxChangeHandle = (event, type, index, name) => {
    if (this.state.filter.projectType != name) {
      this.bindAllProject("", "", name.replace(/\s/g, ""));
    }

    this.setState({
      filterFlag: true,
      filter: { ...this.state.filter, projectType: name },
    });
  };

  onCheckboxChangeHandle12 = (event, type, index, name) => {
    this.bindAllProject("", "", name.replace(/\s/g, ""));
    let { projectTypes, projectStatuses } = this.state;
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
    this.setState({ projectTypes, projectStatuses, lastPkEvaluatedTrack: [] });

    let redirectTo = "";
    if (this.state.searchProject !== "")
      redirectTo += "?searchProject=" + this.state.searchProject;
    if (this.state.selectedCategory !== "")
      redirectTo +=
        (redirectTo !== "" ? "&category=" : "?category=") +
        this.state.selectedCategory;
    if (this.state.selectedProjectType !== "")
      redirectTo +=
        (redirectTo !== "" ? "&type=" : "?type=") +
        this.state.selectedProjectType;
    if (this.state.selectedProjectStatus !== "")
      redirectTo +=
        (redirectTo !== "" ? "&status=" : "?status=") +
        this.state.selectedProjectStatus;

    redirectTo +=
      redirectTo === "" ? `${this.props.location.pathname}?type=""` : "";
    this.props.history.push(redirectTo);
  };
  //#endregion Change Event

  handleFilterProject = (value, type) => {
    this.setState({ filter: { ...this.state.filter, [type]: value } });
    if (type === "projectType") {
      this.bindAllProject(
        "",
        "",
        value.replace(/\s/g, ""),
        this.state.filter.country,
        this.state.filter.businessCategory
      );
      this.props.updateProjectType(
        value
          ? value.replace(/([A-Z]+)/g, " $1").replace(/^ /, "")
          : "All Projects"
      );
    }
    if (type === "country") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        value,
        this.state.filter.businessCategory
      );
    }
    if (type === "businessCategory") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        value
      );
    }
  };

  handleSortFilter = (value) => {
    this.setState({ sortFilter: value });

    let freelancerData = this.props.authUser?.freelancerAuth
      ?.individualFreelancerId
      ? this.props.authUser?.freelancerAuth
      : this.props.authUser?.organizationAuth;
    let lookUpData = this.props.lookUpData;
    if (value === "Basic") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        this.state.filter.businessCategory,
        "",
        { highest: false },
        "",
        ""
      );
    }
    if (value === "High Amount") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        this.state.filter.businessCategory,
        "",
        { highest: true },
        "",
        ""
      );
    }
    if (value === "End Soon") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        this.state.filter.businessCategory,
        true,
        "",
        "",
        ""
      );
    }
    if (value === "Matching Skills") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        this.state.filter.businessCategory,
        "",
        "",
        freelancerData.skills &&
          freelancerData.skills.map((item) => item.skillName).toString(),
        ""
      );
    }
    if (value === "Location") {
      this.bindAllProject(
        "",
        "",
        this.state.filter.projectType,
        this.state.filter.country,
        this.state.filter.businessCategory,
        "",
        "",
        "",
        lookUpData.country
        // freelancerData.location
        //   ? freelancerData.location
        //   : `${lookUpData.city},${lookUpData.country}`
      );
    }
  };

  /*     remaining,
    amount,
    skills,
    location */
  render() {
    let {
      isSkeletonLoading,
      projectData,
      projectTypes,
      projectStatuses,
      pagination,
      lastPkEvaluatedTrack,
      isNextPage,
      isPreviousPage,
      topActiveFilter,
      filter,
      filterFlag,
    } = this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <ProjectTypeFilter
                      projectTypeFlag={this.state.filter.projectType}
                      onChange={this.onCheckboxChangeHandle}
                    />
                  </div>
                  <div
                    className="col-lg-12 col-md-6"
                    style={{ display: "none" }}
                  >
                    <CheckboxCard
                      title="Status"
                      data={projectStatuses}
                      type="projectStatuses"
                      onChange={this.onCheckboxChangeHandle}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-12">
                <div className="skeletonLoading_mobile">
                <Skeleton
                  count={this.state.pagination.pageSize}
                  isSkeletonLoading={isSkeletonLoading}
                />
                </div>
                
                <SkeletonCardBox
                  count={this.state.pagination.pageSize}
                  isSkeletonLoading={isSkeletonLoading} 
                />

                {filterFlag ? (
                  <div hidden={isSkeletonLoading}>
                    <TopFilter
                      filter={filter}
                      hidden={isSkeletonLoading}
                      handleFilterProject={this.handleFilterProject}
                      handleSortFilter={this.handleSortFilter}
                      sortFilter={this.state.sortFilter}
                      {...this.props}
                    />
                  </div>
                ) : (
                  ""
                )}
                {projectData &&
                  projectData.length > 0 &&
                  projectData.map((project, index) => (
                    <ProjectCardbox
                      key={`cardProject${index}`}
                      selectedProject={project}
                      index={index}
                    />
                  ))}

                {projectData?.length > 0 && (
                  <Pagination
                    isPreviousPage={pagination.pageNumber > 1 ? true : false}
                    isNextPage={
                      pagination.pageNumber * pagination.pageSize <
                      pagination.total
                        ? true
                        : false
                    }
                    lastPkEvaluatedTrack={projectData}
                    pageNumber={pagination.pageNumber}
                    moveBack={() =>
                      this.bindAllProject(
                        lastPkEvaluatedTrack[lastPkEvaluatedTrack?.length - 2],
                        "prev"
                      )
                    }
                    moveNext={() =>
                      this.bindAllProject(pagination.lastPkEvaluated, "next")
                    }
                  />
                )}

                {!isSkeletonLoading && projectData?.length <= 0 && (
                  <NoDataAvailable
                    title="Sorry no project exist yet !"
                    buttonText="Click here to see more"
                    path="/project-post"
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
    projectTypes: state.languageReducer.projectTypes,
    authUser: state.authReducer,
    projectStatuses: state.languageReducer.projectStatuses,
    lookUpData: state.lookUp.lookUpData,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    updateProjectType: (type) => {
      dispatch(updateProjectType(type));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(AllProjects);

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
import ProjectCardbox from "./cardbox";
import "./featuredContest.scss";
import SkeletonCardBox from "../../../components/skeleton/skeletonCardBox/skeletonCardBox"; 
import Skeleton from "../../../components/skeleton/skeleton";
import Pagination from "../../../components/pagination";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import NoDataAvailable from "../../../shared/error/not-data-available-new";

class ContestFeaturedPosts extends Component {
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
      clientUserId: props.authUser?.clientAuth?.clientId,
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
    // let projectTypes = new URLSearchParams(this.props.location.search).get("type");

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

    this.setState(
      {
        lastPkEvaluatedTrack: [],
      },
      () => {}
    );

    (category || searchProject) && this.bindAllProject("", "");
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

  async bindAllProject(lastPkEvaluated, move, projectType) {
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

    let queryString =
      `?projectTypes=` +
      (projectType ? projectType : "") +
      `&projectStatus=` +
      selectedProjectStatus +
      `&projectScope=` +
      this.state.selectedCategory +
      `&postUserId=` +
      this.state.clientUserId +
      `&search=` +
      this.state.searchProject +
      `&pageSize=` +
      this.state.pagination.pageSize +
      `&pageNumber=` +
      pageNumber;

    let result = await request(
      `${ENDPOINT["GetFeaturedContests"]}` + queryString,
      getOptions({})
    );
    if (result.entries) {
      this.setState({
        isSkeletonLoading: false,
        projectData: result.entries,
        pageNumber: result.pageNumber,
        pageSize: result.pageSize,
        pagination: { ...this.state.pagination, total: result.total },
      });
      let array =
      result.entries ? result.entries : [];
   

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
          lastPkEvaluated: result.lastPkEvaluated,
          total: result.total,
        },
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
    this.bindAllProject("", "", name.replace(/\s/g, ""));
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
                    {/* <ProjectTypeFilter onChange={this.onCheckboxChangeHandle} /> */}
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

                <div hidden={true} className="all-project-top-filter-area">
                  <div
                    onClick={() => this.setState({ topActiveFilter: "Basic" })}
                    className={`all-project-top-filter-area-item ${
                      topActiveFilter === "Basic" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-circle" /> Basic
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ topActiveFilter: "High Amount" })
                    }
                    className={`all-project-top-filter-area-item ${
                      topActiveFilter === "High Amount" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-circle" /> High Amount
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ topActiveFilter: "End Soon" })
                    }
                    className={`all-project-top-filter-area-item ${
                      topActiveFilter === "End Soon" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-circle" /> End Soon
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ topActiveFilter: "Matching Skills" })
                    }
                    className={`all-project-top-filter-area-item ${
                      topActiveFilter === "Matching Skills" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-circle" /> Matching Skills
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ topActiveFilter: "Location" })
                    }
                    className={`all-project-top-filter-area-item ${
                      topActiveFilter === "Location" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-circle" /> Location
                  </div>
                </div>
                {projectData &&
                  projectData.length > 0 &&
                  projectData.map((project, index) => (
                    <ProjectCardbox
                      key={`cardProject${index}`}
                      selectedProject={project}
                      index={index}
                    />
                  ))}

                { projectData?.length > 0 && (
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
                    buttonText="Post a new job"
                    path="/project-post"
                    color={"#0d2146"}
                    {...this.props}
                  />
                )}
              </div>
              <div className="col-lg-2 col-md-12">
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
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ContestFeaturedPosts);

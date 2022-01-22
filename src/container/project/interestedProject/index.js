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
import "./interestedProject.scss";
import Skeleton from "../../../components/skeleton/skeleton";
import SkeletonCardBox from "../../../components/skeleton/skeletonCardBox/skeletonCardBox"; 
import Pagination from "../../../components/pagination";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import { projectPost_updateProjectType as updateProjectType } from "../../../store/action/Project/projectActions";
class InterestedProjects extends Component {
  constructor(props) {
    super(props);


    this.state = {
      projectData: [],
      isSkeletonLoading: false,
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 20,
      },
    };
  }

  componentDidMount(){
    this.getInterestedProjects()
  }
  async getInterestedProjects(
    move
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
    let queryString = `?pageSize=${
      this.state.pagination.pageSize
    }&pageNumber=${pageNumber}`;

    let result = await request(
      `${ENDPOINT["GetShortListedProjects"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      console.log(result,"result")
      this.setState({
        isSkeletonLoading: false,
        projectData: result.result.result.entries,
        pageNumber: result.result.result.pageNumber,
        pageSize: result.result.result.pageSize,
        pagination: { ...this.state.pagination, total: result.result.result.total },
      });
      let array =
        result.result && result.result.result.entries ? result.result.result.entries : [];

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
      } else if (move === "prev") {
        lastPkEvaluatedTrackLocal.pop();
      }
      this.setState({
        projectData: array,
        pagination: {
          ...this.state.pagination,
          pageSize: this.state.pagination.pageSize,
          total: result.result.result.total,
        },
        lastPkEvaluatedTrack: lastPkEvaluatedTrackLocal,
        isNextPage: result.result.result.isNextPage,
        isPreviousPage: result.result.result.isPreviousPage,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      this.setState({ isSkeletonLoading: false });
    }
  }


  

  /*     remaining,
    amount,
    skills,
    location */
  render() {
    let {
      isSkeletonLoading,
      projectData,
      projectStatuses,
      pagination,
    } = this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
               
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
                      this.getInterestedProjects("prev"
                      )
                    }
                    moveNext={() =>
                      this.getInterestedProjects("next")
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

export default connect(mapStateToProps, mapDispatchProps)(InterestedProjects);

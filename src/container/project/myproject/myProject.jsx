import React, { Component } from "react";
import v4 from "uuid";
import { connect } from "react-redux";
import moment from "moment";
import { onReduxLangaugeChange } from "../../../store/action/action";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import CheckboxCard from "../../../components/checkboxCard/checkboxCard.jsx";
import { UserTypeConst } from "../../../utils/userTypeConst";
import SkeletonCardBox from "../../../components/skeleton/skeletonCardBox/skeletonCardBox";
import Skeleton from "../../../components/skeleton/skeleton";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import LoginRequired from "../../../components/modals/loginRequired";
import Pagination from "../../../components/pagination";
import ProjectTypeFilter from "../../../components/project/projectTypeFilter";
import SubHeader from "../../../components/subHeader";
import MyProjectsCards from "../../../components/project/MyprojectsCards/myprojectsCards";
import ProjectCard from "./projectCard.jsx";
import "./myProject.scss";
class MyProject extends Component {
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
    let sessionUserType = sessionStorage.getItem("userType");
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
      userType: sessionUserType,
      postUserId: props.authUser?.clientAuth?.clientId,
      freelancerUserId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.companyId,
      projectTypes: [],
      projectStatuses: [],
      contractData: [],
      isSkeletonLoading: false,
      projectData: [],
      pagination: {
        pageSize: 10,
        lastPkEvaluated: "",
        pageNumber: 1,
        total: 20,
      },
      lastSkEvaluatedTrack: [],
      lastPkEvaluatedTrack: [],
      lastPkIndexEvaluatedTrack: [],
      lastSkIndexEvaluatedTrack: [],
      imageUrl: "",
      isNextPage: true,
      isPreviousPage: false,
    };
  }

  componentWillMount() {
    let category = new URLSearchParams(this.props.location.search).get(
      "category"
    );
    let searchProject = new URLSearchParams(this.props.location.search).get(
      "searchProject"
    );

    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);

    this.bindProjectTypes();
    this.bindProjectStatuses();
    if (!category && !searchProject) {
      this.GetMyProjects("");
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

    this.setState({
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
      lastPkEvaluatedTrack: [],
      lastSkEvaluatedTrack: [],
      lastPkIndexEvaluatedTrack: [],
      lastSkIndexEvaluatedTrack: [],
    });

    (category || searchProject) && this.GetMyProjects("", "");
    /* if (nextProps.location.search) {
      this.GetMyProjects("next");
    } */
  }
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
          (this.state.selectedProjectType !== "" ? "," : "") + item[1].text;
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
          (this.state.selectedProjectStatus !== "" ? "," : "") + item[1].text;
    });
    this.setState({ projectStatuses: array });
  }

  async GetMyProjects(move, projectType) {
    this.setState({ isSkeletonLoading: true, projectData: [] });
    let queryString = "";
    let result;
    let resultContract;
    const userType = sessionStorage.getItem("userType");
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
    if (userType === UserTypeConst.Client) {
      // const pkEvaluated = isPagination ? action === 'back' ? '' : lastPkEvaluated : ''
      queryString =
        `?freelancerId=` +
        `&status=` +
        this.state.searchProject +
        `&clientId=${this.state.postUserId}` +
        `&pageSize=` +
        this.state.pagination.pageSize +
        `&pageNumber=` +
        pageNumber;

      resultContract = await request(
        `${ENDPOINT["GetContractsByClient"]}` + queryString,
        getOptions({})
      );
    } else {
      queryString =
        `?freelancerReferenceId=` +
        this.state.freelancerUserId +
        `&pageNumber=` +
        pageNumber +
        `&pageSize=` +
        this.state.pagination.pageSize;

      result = await request(
        `${ENDPOINT["GetContractsByFreelancer"]}` + queryString,
        getOptions({})
      );
    }

    if (resultContract && resultContract.success) {
      const contractData =
        resultContract.result &&
        resultContract.result.entries &&
        resultContract.result.entries
          ? resultContract.result.entries
          : [];

      this.setState({
        isSkeletonLoading: false,
        contractData: contractData,
        pagination: {
          ...this.state.pagination,
          total: resultContract.result ? resultContract.result.total : 1,
        },
      });
    } else {
      this.setState({ isSkeletonLoading: false });
    }

    if (result && result.success) {
      const postData =
        result.result && result.result.entries && result.result.entries
          ? result.result.entries
          : [];
      const dataResult =
        postData !== undefined &&
        postData.length !== 0 &&
        postData !== " " &&
        postData.map((element) => {
          if (element.postDateTime && element.hasOwnProperty("postDateTime"))
            element.postDateTime = moment(element.postDateTime).format(
              "DD-MMM-YYYY"
            );
          if (element.projectAmount && element.hasOwnProperty("projectAmount"))
            element.projectAmount =
              element.projectAmount === null ||
              element.projectAmount.trim() === ""
                ? 0
                : parseFloat(element.projectAmount).toFixed(2);
          if (
            element.expectedCompletionDays &&
            element.hasOwnProperty("expectedCompletionDays")
          )
            element.expectedCompletionDays =
              element.expectedCompletionDays === null ||
              element.expectedCompletionDays.trim() === ""
                ? ""
                : element.expectedCompletionDays;
          if (
            element.projectRemainingDays &&
            element.hasOwnProperty("projectRemainingDays")
          )
            element.projectRemainingDays =
              element.projectRemainingDays === null ||
              element.projectRemainingDays.trim() === ""
                ? 0
                : element.projectRemainingDays;
          if (element.fromSalary && element.hasOwnProperty("fromSalary"))
            element.fromSalary =
              element.fromSalary === null || element.fromSalary.trim() === ""
                ? 0
                : parseFloat(element.fromSalary).toFixed(2);
          if (element.toSalary && element.hasOwnProperty("toSalary"))
            element.toSalary =
              element.toSalary === null || element.toSalary.trim() === ""
                ? 0
                : parseFloat(element.toSalary).toFixed(2);
          if (element.winningAmount && element.hasOwnProperty("winningAmount"))
            element.winningAmount =
              element.winningAmount === null ||
              element.winningAmount.trim() === ""
                ? 0
                : parseFloat(element.winningAmount).toFixed(2);
          if (
            element.hourlyDetails &&
            element.hasOwnProperty("hourlyDetails") &&
            element.hourlyDetails !== " "
          )
            element.fromSalary =
              element.hourlyDetails.trim() === ""
                ? 0
                : Math.min
                    .apply(
                      Math,
                      JSON.parse(element.hourlyDetails).map(function (x) {
                        return x.fromAmount;
                      })
                    )
                    .toFixed(2);
          return element;
        });

      this.setState({
        isSkeletonLoading: false,
        projectData: dataResult,
        pagination: {
          ...this.state.pagination,
          total: result.result ? result.result.total : 1,
        },
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
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
    this.GetMyProjects("", name.replace(/\s/g, ""));
  };
  onCheckboxChangeHandle1 = (event, type, index) => {
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
            (this.state.selectedProjectStatus !== "" ? "," : "") + element.name;
      });
    }
    this.setState({
      projectTypes,
      projectStatuses,
      lastPkEvaluatedTrack: [],
      lastSkEvaluatedTrack: [],
      lastPkIndexEvaluatedTrack: [],
      lastSkIndexEvaluatedTrack: [],
      isNextPage: true,
      isPreviousPage: false,
    });

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
      redirectTo === "" ? `${this.props.location.pathname}?status=""` : "";
    this.props.history.push(redirectTo);
  };
  //#endregion Change Event

  render() {
    let {
      isSkeletonLoading,
      openStatusIndex,
      projectData,
      pageNumber,
      projectTypes,
      projectStatuses,
      pagination,
      contractData,
    } = this.state;

    let {} = pagination;

    const { authUser } = this.props;
    return (
      <>
        <SubHeader />
        {authUser.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-2 d-none d-xl-block col-md-12">
                  <div className="row ">
                    <div className="col-lg-12 col-md-6">
                      <ProjectTypeFilter
                        onChange={this.onCheckboxChangeHandle}
                      />
                    </div>
                    <div
                      className="col-lg-12 col-md-6"
                      style={{ marginTop: "0px" }}
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
                <div className="col-lg-12 col-xl-8 col-md-12">
                  <div
                    className="all-contract-container"
                    hidden={
                      sessionStorage.userType === "Freelancer" ||
                      isSkeletonLoading
                        ? true
                        : false
                    }
                  >
                    {contractData.length > 0 ? (
                      contractData.map((item, index) => (
                        <MyProjectsCards
                          contractData={item}
                          type={item.project.projectType || "hourly"}
                          completed={
                            item.projectContractStatus === "OnHold"
                              ? "stopped"
                              : item.projectContractStatus === "Contract_Ended"
                              ? "completed"
                              : item.project.projectType === "Contest" &&
                                !item.userProfile
                              ? "InWaiting"
                              : "in-progress"
                          }
                          status={
                            item.projectContractStatus === "OnHold"
                              ? "OnHold"
                              : item.projectContractStatus === "Contract_Ended"
                              ? "Closed"
                              : item.projectContractStatus
                          }
                          {...this.props}
                        />
                      ))
                    ) : (
                      <NoDataAvailable
                        title="Sorry no contract exist yet !"
                        buttonText="Click here to see more"
                        path="/all-my-posts"
                        {...this.props}
                      />
                    )}
                  </div>
                  {/* Below all card is static just for demo we will remove later */}
                  <div className="all-contract-container" hidden={true}>
                    <MyProjectsCards
                      type="hourly"
                      completed="in-progress"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="hourly"
                      completed="completed"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="hourly"
                      completed="stopped"
                      status={"OnHold"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="Milestone"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="Milestone"
                      Milestone="desposit"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="Milestone"
                      Milestone="paid"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="Milestone"
                      Milestone="Released"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="freeContract"
                      completed="in-progress"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="freeContract"
                      completed="completed"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="freeContract"
                      completed="stopped"
                      status={"OnHold"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="OfficeWork"
                      completed="in-progress"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="OfficeWork"
                      completed="completed"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="OfficeWork"
                      completed="stopped"
                      status={"OnHold"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="contest"
                      completed="in-progress"
                      status={"Active"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="contest"
                      Contest="Winner"
                      completed="completed"
                      status={"Closed"}
                      {...this.props}
                    />
                    <MyProjectsCards
                      type="contest"
                      status={"Closed"}
                      completed="InWaiting"
                      contest="InWaiting"
                      {...this.props}
                    />
                  </div>
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

                  <div
                    className="all-contract-container"
                    hidden={
                      isSkeletonLoading
                        ? true
                        : sessionStorage.userType === "Freelancer"
                        ? false
                        : true
                    }
                  >
                    {projectData && projectData.length > 0 ? (
                      projectData.map((contract, index) => (
                        <>
                          <ProjectCard
                            contractData={contract}
                            project={contract.project}
                            type={contract.projectType}
                            index={index}
                            contractStatus={contract.projectContractStatus}
                            projectContractId={contract.projectContractId}
                            hourlyRate={contract.finalizedHourlyRate}
                            finalizedMilestoneAmount={
                              contract.finalizedMilestoneAmount
                            }
                            finalizedSalarayAmount={
                              contract.finalizedSalarayAmount
                            }
                            clientFirstName={contract.client.firstName}
                            clientLastName={contract.client.lastName}
                            clientProfileImg={contract.client.userProfileUrl}
                          />
                        </>
                      ))
                    ) : (
                      <NoDataAvailable
                        title="Sorry no contract exist yet !"
                        buttonText="Click here to see more"
                        path="/all-my-posts"
                        {...this.props}
                      />
                    )}
                  </div>

                  <div>
                    {(projectData?.length > 0 ||
                      (contractData && contractData.length > 0)) && (
                      <Pagination
                        isPreviousPage={
                          pagination.pageNumber > 1 ? true : false
                        }
                        isNextPage={
                          pagination.pageNumber * pagination.pageSize <
                          pagination.total
                            ? true
                            : false
                        }
                        pageNumber={pagination.pageNumber}
                        lastPkEvaluatedTrack={
                          projectData.length > 0 ? projectData : contractData
                        }
                        moveBack={() => this.GetMyProjects("prev")}
                        moveNext={() => this.GetMyProjects("next")}
                      />
                    )}
                  </div>
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
    projectStatuses: state.languageReducer.projectStatuses.filter(
      (n) => n.isAdmin === !state.authReducer.isGuest
    ),
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

export default connect(mapStateToProps, mapDispatchProps)(MyProject);

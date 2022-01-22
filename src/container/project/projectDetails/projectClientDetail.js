import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./projectDetail.scss";
import ShowMoreText from "react-show-more-text";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import { ENDPOINT } from "../../../utils/endpoint";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../utils/request";
import Skeleton from "../../../components/skeleton/skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import { ProjectType } from "../../../utils/projectConst";
import ProposalsClient from "../../../components/proposals/proposalClient";
import RecommendedFreelancers from "../../../components/freelancer/recommendedFreelancers";
import Currency from "../../../components/currency";
import Format from "../../../components/numberFormat";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import ProjectCardbox from "../allprojects/projectCardbox.jsx";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import FormatDWH from "../../../components/formatDWH";
import SubHeader from "../../../components/subHeader";
import { filter } from "lodash-es";
import Pagination from "../../../components/pagination";

function ProjectClientDetailNew(props) {
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [activeTab, setActiveTab] = useState("recommended");
  const [lastPkEvaluated, setlastPkEvaluated] = React.useState("");
  const [projectData, setProjectData] = React.useState({});
  const [proposalData, setProposalData] = React.useState([]);
  const [showText, setShowText] = React.useState(120);
  const [showTitle, setShowTitle] = React.useState(100);
  const [isSkeletonLoading, setIsSkeletonLoading] = React.useState(false);
  const [isSkeletonLoading1, setIsSkeletonLoading1] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    pageNumber: 1,
    pageSize: 10,
    total: 10,
  });
  const [recommendedFreelancers, setRecommendedFreelancers] = React.useState(
    []
  );
  const [freelancerLoading, setFreelancerLoading] = React.useState(false);
  const [freelancersPagination, setFreelancersPagination] = React.useState({
    pageNumber: 1,
    pageSize: 10,
    total: 10,
  });

  const dispatch = useDispatch();

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const [flag, setFlag] = useState(false);
  const purposalSearchTypes = languageReducer.purposalSearchTypes;
  const keysList = {
    isSameOrigin: false,
    isLowesProspose: false,
    isNoOnGoingProject: false,
    isCompany: false,
    isIndividual: false,
    isAgent: false,
    isFavorite: false,
    isBlocked: false,
  };

  const [keys, setKeys] = useState(keysList);

  useEffect(() => {
    handleGetProjectData();
    GetProjectProposalsByFilteredFreelancer();
  }, []);
  const handleGetProjectData = async () => {
    setIsSkeletonLoading(true);
    let result = await request(
      `${ENDPOINT["GetProjectBidding"]}?projectId=` +
        new URLSearchParams(props.location.search).get("projectId") +
        "&pageSize=" +
        10 +
        "&lastSkEvaluated=" +
        lastPkEvaluated,
      getOptions({})
    );
    if (result.success) {
      setProjectData(result.result);
      let project = result.result;
      setIsSkeletonLoading(false);
      handelRecommendedFreelancers(
        project.freelancerType,
        project.projectScope?.projectScope,
        project.projectScope?.projectSubscope,
        project.skills
      );
    }
  };

  const handelRecommendedFreelancers = async (
    freelancerType,
    projectScope,
    projectSubscope,
    skills,
    move
  ) => {
    setFreelancerLoading(true);
    let pageNumber = freelancersPagination.pageNumber;
    if (move === "next") {
      setPagination({
        ...freelancersPagination,
        pageNumber: freelancersPagination.pageNumber + 1,
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setPagination({
        ...freelancersPagination,
        pageNumber: freelancersPagination.pageNumber - 1,
      });
      pageNumber = pageNumber - 1;
    }

    let result = await request(
      `${ENDPOINT["GetRecommendedFreelancers"]}?freelancerType=${freelancerType}&serviceScope=${projectScope}&subServiceScope=${projectSubscope}&skills=${skills}&pageNumber=${pageNumber}&pageSize=${freelancersPagination.pageSize}`,
      getOptions({})
    );
    if (result.success) {
      console.log(result, "result");
      setFreelancersPagination({
        pageNumber: result.pageNumber || result.pageNumer,
        pageSize: result.pageSize,
        total: result.total,
      });
      setRecommendedFreelancers([
        ...(result.entries.organizations ? result.entries.organizations : []),
        ...(result.entries.freelancers ? result.entries.freelancers : []),
      ]);
      setFreelancerLoading(false);
    } else {
      setFreelancerLoading(false);
    }
  };

  const GetProjectProposalsByFilteredFreelancer = async () => {
    let queryString = "";
    if (keys.isSameOrigin) {
      queryString = queryString + `isSameOrigin=${keys.isSameOrigin}&`;
    }
    if (keys.isLowesProspose) {
      queryString = queryString + `isLowesProspose=${keys.isLowesProspose}&`;
    }
    if (keys.isNoOnGoingProject) {
      queryString =
        queryString + `isNoOnGoingProject=${keys.isNoOnGoingProject}&`;
    }
    if (keys.isCompany) {
      queryString = queryString + `isCompany=${keys.isCompany}&`;
    }
    if (keys.isIndividual) {
      queryString = queryString + `isIndividual=${keys.isIndividual}&`;
    }
    if (keys.isAgent) {
      queryString = queryString + `isAgent=${keys.isAgent}&`;
    }
    if (keys.isFavorite) {
      queryString = queryString + `isFavorite=${keys.isFavorite}&`;
    }
    if (keys.isBlocked) {
      queryString = queryString + `isBlocked=${keys.isBlocked}&`;
    }

    setIsSkeletonLoading1(true);
    let result = await request(
      `${ENDPOINT["GetProjectProposalsByFilteredFreelancer"]}?projectId=` +
        new URLSearchParams(props.location.search).get("projectId") +
        `&clientId=${props.clientAuth.clientId}&pageSize=${pagination.pageSize}&pageNumber=${pagination.pageNumber}&` +
        queryString,
      getOptions({})
    );
    if (result.entries) {
      setProposalData(result.entries);
      setIsSkeletonLoading1(false);
    } else {
      setIsSkeletonLoading1(false);
    }
  };

  const toggleSearchfilters = (key) => {
    let keysListDefault = keys;
    keysListDefault[key] = !keys[key];
    setKeys(keysListDefault);
    setFlag(!flag);
  };

  const checkedfunction = (key) => {
    if (keys[key]) {
      return true;
    } else {
      return false;
    }
  };
  const handleActive = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <Skeleton
            count={10}
            isSkeletonLoading={isSkeletonLoading || isSkeletonLoading1}
          />
          {!isSkeletonLoading && !isSkeletonLoading1 && (
            <div className="row">
              <div className="col-lg-2 col-md-12">
                {" "}
                {/* <RightTop />
              <RightBottom /> */}
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="project-client-detail-area">
                  {/*        {console.log(projectData,"projectData")} */}
                  <h4 className="project-client-detail-heading">
                    {languageType.JOB_POST_SUMMARY}
                  </h4>
                  <div className="adjust-card-area-project-detial">
                    <ProjectCardbox
                      key={`cardProject${1}`}
                      selectedProject={projectData}
                      index={1}
                      disableShadow={true}
                    />
                  </div>
                  <br />
                  <div className="client-project-section-tabs">
                    <div
                      title={
                        activeTab === "recommended"
                          ? "Selected tab"
                          : "select tab"
                      }
                      onClick={() => handleActive("recommended")}
                      className={`company-section-tabs-item ${
                        activeTab === "recommended" ? "active" : ""
                      }`}
                    >
                      Recommended freelancers
                    </div>

                    <div
                      title={
                        activeTab === ""
                          ? "Selected tab"
                          : "select tab"
                      }
                      onClick={() => handleActive("applicants")}
                      className={`company-section-tabs-item ${
                        activeTab === "applicants" ? "active" : ""
                      }`}
                    >
                      Applicants
                    </div>
                  </div>
                  <br />
                  <br />
                  {activeTab === "applicants" ? (
                    <div className="project-detail-client-applicants-area">
                                   <div className="project-detail-client-applicants-header">
                        <h6 style={{ textTransform: "uppercase" }}>
                          {languageType.APPLICANTS_TEXT}
                        </h6>
                        <i
                          title={languageType.SEARCH}
                          onClick={() => {
                            if (searchFlag) {
                              setSearchFlag(false);
                              document.getElementsByClassName(
                                "project-detail-client-applicants-search-area"
                              )[0].style.maxHeight = "0px";
                            } else {
                              setSearchFlag(true);
                              document.getElementsByClassName(
                                "project-detail-client-applicants-search-area"
                              )[0].style.maxHeight = "500px";
                            }
                          }}
                          className="fa fa-tasks"
                        ></i>
                      </div>

                      <div className="project-detail-client-applicants-search-area">
                        <div className="search-elements-project-detail">
                          {languageReducer.purposalSearchTypes.map((item) => (
                            <div className="search-elements-project-detail-item">
                              <input
                                type="checkbox"
                                onClick={() => toggleSearchfilters(item.key)}
                                checked={checkedfunction(item.key)}
                              />{" "}
                              <label>{item.text}</label>
                            </div>
                          ))}
                        </div>
                        <div className="search-button-area">
                          <button
                            onClick={() =>
                              GetProjectProposalsByFilteredFreelancer()
                            }
                          >
                            {languageType.SEARCH}
                          </button>
                        </div>
                      </div>
                      <ProposalsClient
                        projecType={projectData.projectType}
                        currencyCode={projectData.currencyCode}
                        proposalData={proposalData}
                        languageType={languageType}
                        type="client"
                        customSetting={true}
                        {...props}
                      />
                    </div>
                  ) : (
                    <div className="recommended-freelancers">
                      <Skeleton
                        count={5}
                        isSkeletonLoading={freelancerLoading}
                      />

                      <div
                        hidden={freelancerLoading}
                        className="recommended-freelancer-area"
                      >
                        {recommendedFreelancers.length > 0 ? (
                          <div>
                            <RecommendedFreelancers
                              freelancerData={recommendedFreelancers}
                              languageType={languageType}
                              projectId={projectData.projectId}
                              {...props}
                            />
                          </div>
                        ) : (
                          <NoDataAvailable
                            title="Sorry no recommended freelancer exists!"
                            buttonText="View more freelancers"
                            path="/all-freelancer"
                            color={"#0d2146"}
                            {...props}
                          />
                        )}
                        {recommendedFreelancers?.length > 0 && (
                          <Pagination
                            isPreviousPage={
                              freelancersPagination.pageNumber > 1
                                ? true
                                : false
                            }
                            isNextPage={
                              freelancersPagination.pageNumber *
                                freelancersPagination.pageSize <
                              freelancersPagination.total
                                ? true
                                : false
                            }
                            lastPkEvaluatedTrack={recommendedFreelancers}
                            pageNumber={freelancersPagination.pageNumber}
                            moveBack={() =>
                              handelRecommendedFreelancers(
                                projectData.freelancerType,
                                projectData.projectScope?.projectScope,
                                projectData.projectScope?.projectSubscope,
                                projectData.skills,
                                "prev"
                              )
                            }
                            moveNext={() =>
                              handelRecommendedFreelancers(
                                projectData.freelancerType,
                                projectData.projectScope?.projectScope,
                                projectData.projectScope?.projectSubscope,
                                projectData.skills,
                                "next"
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                {" "}
                {/* <RightTop />
              <RightBottom /> */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    authUser: state.authReducer,
    clientAuth: state.authReducer.clientAuth,
  };
}

export default connect(mapStateToProps)(ProjectClientDetailNew);

import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExtensionLeft from "../../container/freelancer/freelancerContents/extension/extensionSections/extensionLeft";
import ExtensionOngoing from "../../container/freelancer/freelancerContents/extension/extensionSections/extensionOngoing";
import Portfolios from "../../container/freelancer/freelancerContents/extension/extensionSections/extensionPrevious";
import ExtensionReview from "../../container/freelancer/freelancerContents/extension/extensionSections/extensionReview";
import "./allFreelancers.scss";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import NoDataAvailable from "../../shared/error/not-data-available-new";
import Skeleton from "../../components/skeleton/skeleton";
import SkeletonSkillsExperienceAdditional from "./skeletonSkillsExperienceAdditional";
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../utils/httpConfig";

function DetailSection({ freelancer, index }, ...props) {
  const [mainExpansionPanelId, setMainExpansionPanelId] = useState(-1);
  const [subExpansionPanelId, setSubExpansionPanelId] = useState(-1);
  // to avoid open and close issue I am making this flag in old structure
  const [subExpansionPanelFlag, setSubExpansionPanelFlag] = useState(false);
  const [mainExpansionPanelFlag, setMainExpansionPanelFlag] = useState(false);

  // ongoing projects
  const [onGoingProjectLoading, setOnGoingProjectLoading] = useState(false);
  const [onGoingProjectData, setOnGoingProjectData] = useState([]);
  const [onGoingProjectsPagination, setOnGoingProjectsPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
    total: 10,
  });

  // portfolio
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioDataLoading, setPortfolioDataLoading] = useState(false);
  // skills
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);

  // reviews
  const [reviewData, setReviewData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const [openTestSkill, setOpenTestSkill] = useState(false);
  //#region Expansion
  const onMainExpansionPanelHandle = (index) => {
    if (index === -1) {
      setSubExpansionPanelFlag(false);
      // setMainExpansionPanelFlag(false)
    } else {
      setMainExpansionPanelFlag(true);
    }
    setMainExpansionPanelId(index);
  };

  const onSubExpansionPanelHandle = (index, type) => {
    setSubExpansionPanelFlag(true);
    setSubExpansionPanelId(index);
    if (type === "projects" && onGoingProjectData.length===0) {
      getOngoingProjectsForFreelancer(
        "",
        freelancer.individualFreelancerId || freelancer.organizationId
      );
    }
    if (type === "portfolio" && portfolioData.length===0) {
      getPortfolios();
    }
    if(type==="reviews" && reviewData.length===0){
      getReviewData()
    }
  };

  const getReviewData=async()=>{
    setReviewsLoading(true)

    let  result = await request(
      `${ENDPOINT["GetFreelancerProjectSummary"]}?individualFreelancerId=${freelancer.individualFreelancerId}&pageNumber=1&pageSize=1000`,
      getOptions({})
    );

    if (result.entries) {
      setReviewData(result.entries.filter((item)=>item.projectStatus==="Closed"));
      setReviewsLoading(false);
    } else {
      setReviewsLoading(false);
    }

  }
  const getSkills =async () => {
    setSkillsLoading(true);
    let result;
    if (freelancer.individualFreelancerId) {
      result = await request(
        `${ENDPOINT["GetSkillsFreelancer"]}?individualFreelancerId=${freelancer.individualFreelancerId}`,
        getOptions({})
      );
    } else {
      result = await request(
        `${ENDPOINT["GetSkillsOrganization"]}?organizationId=${freelancer.organizationId}`,
        getOptions({})
      );
    }

    if (result.success) {
      setSkills(result.result);
      setSkillsLoading(false);
    } else {
      setSkillsLoading(false);
    }
  };

  const getPortfolios = async () => {
    setPortfolioDataLoading(true);
    let result;
    if (freelancer.individualFreelancerId) {
      result = await request(
        `${ENDPOINT["GetPortfoliosFreelancer"]}?individualFreelancerId=${freelancer.individualFreelancerId}`,
        getOptions({})
      );
    } else {
      result = await request(
        `${ENDPOINT["GetPortfoliosOrganization"]}?organizationId=${freelancer.organizationId}`,
        getOptions({})
      );
    }

    if (result.success) {
      setPortfolioData(result.result);

      setPortfolioDataLoading(false);
    } else {
      setPortfolioDataLoading(false);
    }
  };

  const getOngoingProjectsForFreelancer = async (
    move,
    individualFreelancerId
  ) => {
    setOnGoingProjectLoading(true);
    let pageNumber = onGoingProjectsPagination.pageNumber;
    if (move === "next") {
      setOnGoingProjectsPagination({
        ...onGoingProjectsPagination,
        pageNumber: onGoingProjectsPagination.pageNumber + 1,
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setOnGoingProjectsPagination({
        ...onGoingProjectsPagination,
        pageNumber: onGoingProjectsPagination.pageNumber - 1,
      });
      pageNumber = pageNumber - 1;
    }
    let result = await request(
      `${ENDPOINT["GetFreelancerOnGoingProjects"]}?freelancerId=${individualFreelancerId}&pageNumber=${pageNumber}&pageSize=${onGoingProjectsPagination.pageSize}`,
      getOptions({})
    );
    if (result.entries) {
      setOnGoingProjectData(result.entries);
      setOnGoingProjectsPagination({
        pageNumber: result.pageNumber || result.pageNumer,
        pageSize: result.pageSize,
        total: result.total,
      });
      setOnGoingProjectLoading(false);
    } else {
    }
    setOnGoingProjectLoading(false);
  };

  return (
    <div className="hourly_limit heigh_skill">
      <div className="position_rel">
        <span
          className="viewDetail"
          onClick={() =>
            onMainExpansionPanelHandle(
              mainExpansionPanelId === index ? -1 : index
            )
          }
        >
          {" "}
          {languageType.VIEW_DETAIL}
          <div
            className="plus_btn"
            aria-expanded={mainExpansionPanelId === index ? true : false}
          >
            +
          </div>
        </span>
        <div
          className={
            index === mainExpansionPanelId
              ? "collapse animaton-height show"
              : "collapse animaton-height custom-padding-collapse"
          }
        >
          <div
            hidden={!mainExpansionPanelFlag}
            style={{ paddingTop: "40px" }}
            className="row"
          >
            <div class="col-md-3 col_3">
              <div class="tested_skill">
                <div class="position_rel">
                  <h4
                    class="green_text"
                    onClick={() => {
                      setOpenTestSkill(openTestSkill ? false : true);
                      if(skills.length===0){
                        getSkills();
                      }
                      setSubExpansionPanelFlag(true);
                    }}
                  >
                    Skill & Experience
                    <span class="viewDetail">
                      <a class="plus_btn">{openTestSkill ? "-" : "+"}</a>
                    </span>
                  </h4>
                </div>
                <div
                  class={`collapse ${openTestSkill ? "show" : ""}`}
                  id="collapseExample5"
                >
                  <div hidden={!subExpansionPanelFlag} class="testSkill_lbl">
                    <SkeletonSkillsExperienceAdditional count={3} isSkeletonLoading={skillsLoading} />
                    <div className="skeletonLoading_mobile">
                      <Skeleton count={1} isSkeletonLoading={skillsLoading} />
                    </div>
                    {!skillsLoading &&skills.length  ? skills.map((item, index) => (
                        <label class="d-flex justify-content-between">
                          <span>{item.skillName}</span>
                          <span>{item.experienceYears}</span>
                        </label>
                      )):!skillsLoading? <NoDataAvailable minHeight="20vh" title="Skills not exists" />:null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 col_12">
              <div className="position_rel">
                <h4 className="green_text">
                  {" "}
                  {languageType.ONGOING_PROJECT}
                  <span
                    className="viewDetail"
                    onClick={() =>
                      onSubExpansionPanelHandle(
                        subExpansionPanelId === index + 1 ? -1 : index + 1,
                        "projects"
                      )
                    }
                  >
                    <a
                      className="plus_btn"
                      role="button"
                      aria-expanded={
                        subExpansionPanelId === index + 1 ? true : false
                      }
                    >
                      {" "}
                      +{" "}
                    </a>
                  </span>
                </h4>
              </div>
              <div
                className={
                  subExpansionPanelId === index + 1
                    ? "collapse animaton-height show"
                    : "collapse animaton-height"
                }
              >
                <div hidden={!subExpansionPanelFlag}>
                  <ExtensionOngoing
                    loading={onGoingProjectLoading}
                    pagination={onGoingProjectsPagination}
                    onGoingProjectData={onGoingProjectData}
                    freelancer={freelancer}
                    {...props}
                  />
                </div>
              </div>
              {/*Freelancer Previous Project */}
              <div className="position_rel">
                <h4 className="green_text">
                  {languageType.PORTFOLIO_TEXT}
                  <span
                    className="viewDetail"
                    onClick={() =>
                      onSubExpansionPanelHandle(
                        subExpansionPanelId === index + 2 ? -1 : index + 2,
                        "portfolio"
                      )
                    }
                  >
                    <a
                      className="plus_btn"
                      role="button"
                      aria-expanded={
                        subExpansionPanelId === index + 2 ? true : false
                      }
                    >
                      {" "}
                      +{" "}
                    </a>
                  </span>
                </h4>
              </div>
              <div
                className={
                  subExpansionPanelId === index + 2
                    ? "collapse animaton-height show"
                    : " animaton-height collapse"
                }
              >
                <div hidden={!subExpansionPanelFlag}>
                  <Portfolios
                    loading={portfolioDataLoading}
                    portfolioData={portfolioData}
                    freelancer={freelancer}
                  />
                </div>
              </div>

              {/*Freelancer Project Reviews*/}
              <div className="position_rel">
                <h4 className="green_text">
                  {" "}
                  {languageType.REVIEW_TEXT}
                  <span
                    className="viewDetail"
                    onClick={() =>
                      onSubExpansionPanelHandle(
                        subExpansionPanelId === index + 3 ? -1 : index + 3,
                        "reviews"
                      )
                    }
                  >
                    <a
                      className="plus_btn"
                      role="button"
                      aria-expanded={
                        subExpansionPanelId === index + 3 ? true : false
                      }
                    >
                      {" "}
                      +{" "}
                    </a>
                  </span>
                </h4>
              </div>
              <div
                className={
                  subExpansionPanelId === index + 3
                    ? "collapse animaton-height show"
                    : "collapse animaton-height"
                }
              >
                <div hidden={!subExpansionPanelFlag}>
                  <ExtensionReview
                  loading={reviewsLoading}
                  reviewData={reviewData}
                  freelancer={freelancer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSection;

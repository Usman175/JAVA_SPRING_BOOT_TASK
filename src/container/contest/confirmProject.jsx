import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { projectPost_updateSuccessfully } from "../../store/action/Project/projectActions";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";
import { ProjectType } from "../../utils/projectConst";
import { saveProjectDataRedux } from "../../store/action/action";
import Skeleton from "../../components/skeleton/skeleton";
import notifications from "../../utils/notifications";
import Currency from "../../components/currency";
import Format from "../../components/numberFormat";
import "./contest.scss";
import ProjectTypeBadge from "../../components/project/projectTypeBadge";
import DisplayRangeComponent from "../project/projectDetails/displayRangeComponent";
import FormatDWH from "../../components/formatDWH";
import SubHeader from "../../components/subHeader";
import FileAttachments from '../../components/postProject/fileAttchment'
const matchingScope = [
  {
    name: "design",
    icon: "designColor.svg",
  },
  {
    name: "web",
    icon: "WebColor.svg",
  },
  {
    name: "Law",
    icon: "LawColor.svg",
  },
  {
    name: "marketing",
    icon: "marketingColor.svg",
  },
  {
    name: "videoPhot",
    icon: "VideoGoodColor.svg",
  },
  {
    name: "engineering",
    icon: "compassColor.svg",
  },
  {
    name: "marketingColor",
    icon: "marketingColor.svg",
  },
  {
    name: "translation",
    icon: "TranslationColor.svg",
  },
  {
    name: "planing",
    icon: "WritingColor.svg",
  },
  {
    name: "teaching",
    icon: "onlineTeachingColor.svg",
  },
  {
    name: "realestate",
    icon: "realestatecolor.svg",
  },
  {
    name: "admin",
    icon: "ClipColor.svg",
  },
  {
    name: "customerService",
    icon: "headsetColor.svg",
  },
  {
    name: "internationalTrade",
    icon: "InternationalTradeColor.svg",
  },
];
class ConfirmProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerUserId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      projectId: new URLSearchParams(this.props.location.search).get("id"),
      userType: sessionStorage.getItem("userType"),
      selectedProject: {},
      projectDetail: {},
      isSkeletonLoading: false,
      isAvailableForPropose: true,
      projectProposalId: "",
      loading: false,
      projectType: "",
    };
  }

  componentWillMount() {
    this.bindProjectDetails();

    this.checkIsAlreadyProposed();
  }

  async onPageRedirectHandle() {
    this.setState({ loading: true });
    let result = await request(
      `${ENDPOINT["UpdateProjectPost"]}?projectId=${this.state.projectId}`,
      postOptions({})
    );
    if (result.success) {
      this.setState({ loading: false });
      this.props.projectPost_updateSuccessfully();

      this.props.history.push(
        "/project-detail-for-client?projectId=" + this.state.projectId
      );
    } else {
      notifications.showError(result.message);
      this.setState({ loading: false });
    }
  }

  handleBackClick = () => {
    let { projectPost } = this.props;
    if (
      projectPost.projectType === "Milestone" ||
      this.state.projectType === "Milestone"
    ) {
      this.props.history.push(
        `/project-post-milestone?id=${this.state.projectId}`
      );
    }
    if (
      projectPost.projectType === "Hourly" ||
      this.state.projectType === "Hourly"
    ) {
      this.props.history.push(
        `/project-post-hourly?id=${this.state.projectId}`
      );
    }
    /* "OfficeWork" */
    if (
      projectPost.projectType === "OfficeWork" ||
      this.state.projectType === "OfficeWork"
    ) {
      this.props.history.push(
        `/project-post-office?id=${this.state.projectId}`
      );
    }
    /*      "FreeContract" */
    if (
      projectPost.projectType === "FreeContract" ||
      this.state.projectType === "FreeContract"
    ) {
      this.props.history.push(
        `/project-post-free-contract?id=${this.state.projectId}`
      );
    }
  };

  checkIsAlreadyProposed = async () => {
    let { projectId, freelancerUserId } = this.state;
    if (projectId && freelancerUserId) {
      let result = await request(
        `${ENDPOINT["AvailableToPropose"]}?projectId=` +
          this.state.projectId +
          "&freelancerReferenceId=" +
          this.state.freelancerUserId,
        getOptions({})
      );
      if (result.success) {
        this.setState({ isAvailableForPropose: true });
      } else {
        notifications.showWarning("You have already proposed for this project");
        this.setState({
          isAvailableForPropose: false,
          projectProposalId: result.result,
        });
      }
    }
  };
  //#region Bind Contest Detail

  async bindProjectDetails() {
    this.setState({ isSkeletonLoading: true });
    let result = await request(
      `${ENDPOINT["GetProject"]}?projectId=` +
        this.state.projectId +
        "&userId=" +
        this.state.freelancerUserId,
      getOptions({})
    );
    if (result.success) {
      console.log(result, "result");
      this.setState({ isSkeletonLoading: false });
      if (result.result !== null && result.result !== "") {
        let projectResponse = result.result;
        let projectDetailResponse = result.result;

        //Contest Check
        if (
          projectResponse.skills &&
          projectResponse.hasOwnProperty("skills")
        ) {
          projectResponse.skills =
            projectResponse.skills.length > 0 &&
            projectResponse.skills !== null &&
            projectResponse.skills !== ""
              ? projectResponse.skills.trim().length > 0
                ? projectResponse.skills.split(",")
                : []
              : [];
        }

        if (projectResponse.hasOwnProperty("postDateTime")) {
          projectResponse.postDateTime = moment(
            projectResponse.postDateTime
          ).format("DD-MMM-YYYY");
        }

        if (projectResponse.hasOwnProperty("expectedCompletionDays")) {
          projectResponse.expectedCompletionDays =
            projectResponse.expectedCompletionDays === null ||
            (projectResponse.expectedCompletionDays &&
              projectResponse.expectedCompletionDays.trim() === "")
              ? 0
              : projectResponse.expectedCompletionDays;
        }

        if (projectResponse.hasOwnProperty("projectRemainingDays")) {
          projectResponse.projectRemainingDays =
            projectResponse.projectRemainingDays === null ||
            projectResponse.projectRemainingDays.trim() === ""
              ? 0
              : projectResponse.projectRemainingDays;
        }

        if (projectResponse.hasOwnProperty("projectClosingDate")) {
          projectResponse.projectClosingDate = moment(
            projectResponse.projectClosingDate
          ).format("DD-MMM-YYYY");
        }

        if (projectResponse.hasOwnProperty("projectReviewNoOfStar")) {
          projectResponse.projectReviewNoOfStar =
            projectResponse.projectReviewNoOfStar &&
            projectResponse.projectReviewNoOfStar.trim() !== ""
              ? parseInt(projectResponse.projectReviewNoOfStar)
              : 0;
        }

        if (projectResponse.hasOwnProperty("documents")) {
          projectResponse.documents =
            projectResponse.documents === null ? [] : projectResponse.documents;
        }

        if (projectResponse.hasOwnProperty("isProposalExist")) {
          projectResponse.isProposalExist =
            projectResponse.isProposalExist !== ""
              ? projectResponse.isProposalExist
              : false;
        }

        if (projectResponse.hasOwnProperty("isWithdrawProposal")) {
          projectResponse.isWithdrawProposal =
            projectResponse.isWithdrawProposal !== ""
              ? projectResponse.isWithdrawProposal
              : false;
        }

        if (projectResponse.hasOwnProperty("projectAmount")) {
          projectResponse.projectAmount =
            projectResponse.projectAmount === null ||
            (projectResponse.projectAmount &&
              projectResponse.projectAmount.trim() === "")
              ? 0
              : parseFloat(projectResponse.projectAmount).toFixed(2);
        }

        if (projectResponse.hasOwnProperty("fromSalary")) {
          projectResponse.fromSalary =
            projectResponse.fromSalary === null ||
            (projectResponse.fromSalary &&
              projectResponse.fromSalary.trim() === "")
              ? 0
              : parseFloat(projectResponse.fromSalary).toFixed(2);
        }

        if (projectResponse.hasOwnProperty("toSalary")) {
          projectResponse.toSalary =
            projectResponse.toSalary === null ||
            (projectResponse.toSalary && projectResponse.toSalary.trim() === "")
              ? 0
              : parseFloat(projectResponse.toSalary).toFixed(2);
        }

        if (projectResponse.hasOwnProperty("winningAmount")) {
          projectResponse.winningAmount =
            projectResponse.winningAmount === null ||
            (projectResponse.winningAmount &&
              projectResponse.winningAmount.trim() === "")
              ? 0
              : parseFloat(projectResponse.winningAmount).toFixed(2);
        }

        if (projectResponse.hasOwnProperty("proposalCount")) {
          projectResponse.proposalCount =
            projectResponse.proposalCount === null ||
            (projectResponse.proposalCount &&
              projectResponse.proposalCount.trim() === "")
              ? 0
              : projectResponse.proposalCount;
        }

        if (projectResponse.hasOwnProperty("amountPerDay")) {
          projectResponse.amountPerDay =
            projectResponse.amountPerDay === null ||
            (projectResponse.amountPerDay &&
              projectResponse.amountPerDay.trim() === "")
              ? 0
              : parseFloat(projectResponse.amountPerDay).toFixed(2);
        }

        if (projectResponse.hasOwnProperty("amountPerHour")) {
          projectResponse.amountPerHour =
            projectResponse.amountPerHour === null ||
            (projectResponse.amountPerHour &&
              projectResponse.amountPerHour.trim() === "")
              ? 0
              : parseFloat(projectResponse.amountPerHour).toFixed(2);
        }

        if (
          projectResponse.hourlyDetails &&
          projectResponse.hasOwnProperty("hourlyDetails") &&
          projectResponse.hourlyDetails.trim() !== ""
        ) {
          projectResponse.fromSalary =
            projectResponse.hourlyDetails &&
            projectResponse.hourlyDetails.trim() === ""
              ? 0
              : Math.min
                  .apply(
                    Math,
                    JSON.parse(projectResponse.hourlyDetails).map(function (x) {
                      return x.fromAmount;
                    })
                  )
                  .toFixed(2);
        }

        if (projectResponse.hasOwnProperty("maximumWeekHours")) {
          projectResponse.maximumWeekHours =
            projectResponse.maximumWeekHours !== undefined &&
            projectResponse.maximumWeekHours !== null &&
            projectResponse.maximumWeekHours !== ""
              ? parseInt(projectResponse.maximumWeekHours)
              : 0;
        }

        if (
          projectResponse.maximumWeekHours === "" ||
          projectResponse.maximumWeekHours === 0 ||
          projectResponse.maximumWeekHours === "0"
        ) {
          projectResponse.maximumWeekHours =
            projectResponse.hourlyDetails &&
            projectResponse.hourlyDetails.trim() != ""
              ? Math.max.apply(
                  Math,
                  JSON.parse(projectResponse.hourlyDetails).map(function (x) {
                    return parseInt(x.maximumHourPerWeek);
                  })
                )
              : "0";
        }

        if (projectResponse.hasOwnProperty("screeningQuestions")) {
          if (
            projectResponse.screeningQuestions &&
            projectResponse.screeningQuestions.trim() !== "" &&
            projectResponse.screeningQuestions !== null &&
            projectResponse.screeningQuestions !== undefined
          ) {
            let screeningQuestions = JSON.parse(
              projectResponse.screeningQuestions
            );
            projectResponse.screeningQuestions = screeningQuestions;
          } else projectResponse.screeningQuestions = [];
        }

        //Contest Detail Check
        if (projectDetailResponse.hasOwnProperty("fromSalary"))
          projectDetailResponse.fromSalary =
            (projectDetailResponse.fromSalary &&
              projectDetailResponse.fromSalary !== null) ||
            (projectDetailResponse.fromSalary &&
              projectDetailResponse.fromSalary.trim() !== "")
              ? parseFloat(projectDetailResponse.fromSalary).toFixed(2)
              : 0;
        if (projectDetailResponse.hasOwnProperty("toSalary"))
          projectDetailResponse.toSalary =
            projectDetailResponse.toSalary !== null ||
            (projectDetailResponse.toSalary &&
              projectDetailResponse.toSalary.trim() !== "")
              ? parseFloat(projectDetailResponse.toSalary).toFixed(2)
              : 0;
        if (projectDetailResponse.hasOwnProperty("hourlyDetails"))
          projectDetailResponse.hourlyDetails =
            projectDetailResponse.hourlyDetails &&
            projectDetailResponse.hourlyDetails.trim() !== ""
              ? JSON.parse(projectDetailResponse.hourlyDetails)
              : [];
        if (projectDetailResponse.hasOwnProperty("professions"))
          projectDetailResponse.professions =
            projectDetailResponse.professions &&
            projectDetailResponse.professions.trim() !== ""
              ? JSON.parse(projectDetailResponse.professions)
              : {};
        if (projectDetailResponse.hasOwnProperty("designStyles"))
          projectDetailResponse.designStyles =
            projectDetailResponse.designStyles &&
            projectDetailResponse.designStyles.trim() !== ""
              ? JSON.parse(projectDetailResponse.designStyles)
              : [];
        if (projectResponse.jobDescription) {
          projectResponse.jobDescription =
            projectResponse.jobDescription.startsWith("<p>")
              ? projectResponse.jobDescription.slice(3)
              : projectResponse.jobDescription;
          projectResponse.jobDescription =
            projectResponse.jobDescription.endsWith("</p>")
              ? projectResponse.jobDescription.slice(0, -4)
              : projectResponse.jobDescription;
        } else {
          projectResponse.jobDescription =
            projectResponse.contestComment.startsWith("<p>")
              ? projectResponse.contestComment.slice(3)
              : projectResponse.contestComment;
          projectResponse.contestComment =
            projectResponse.contestComment.endsWith("</p>")
              ? projectResponse.contestComment.slice(0, -4)
              : projectResponse.contestComment;
        }
        /* contestComment */

        this.setState({
          selectedProject: projectResponse,
          projectDetail: projectDetailResponse,
          projectType: projectDetailResponse.projectType,
        });
      } else this.props.history.push("/project-post");
    }
  }

  renderStars = (number = 0) => {
    let container = [];
    for (let i = 0; i < number; i++)
      container.push(
        <i
          className="fa fa-star"
          style={{ color: "#0d2146" }}
          aria-hidden="true"
          key={i}
        />
      );
    return container;
  };

  //#endregion Bind Contest Detail

  render() {
    let { languageType, hideButton } = this.props;
    let lessText = "Show Less";
    let {
      selectedProject,
      projectDetail,
      isSkeletonLoading,
      isAvailableForPropose,
      userType,
    } = this.state;

    let isMilestone = false;
    let isHourly = false;
    let isFreeContract = false;
    let isOfficeWork = false;
    let isContest = false;
    let isPaymentVerified = true;
    if (selectedProject.projectType === ProjectType.Milestone)
      isMilestone = true;
    if (selectedProject.projectType === ProjectType.Hourly) isHourly = true;
    if (selectedProject.projectType === ProjectType.FreeContract)
      isFreeContract = true;
    if (selectedProject.projectType === ProjectType.OfficeWork)
      isOfficeWork = true;
    if (selectedProject.projectType === ProjectType.Contest) {
      isContest = true;
    }

    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className={`col-12 col-md-2`}></div>
              <div className={`col-12 col-md-8`}>
                {/*Project Proposal */}
                {!isSkeletonLoading && !isAvailableForPropose && (
                  <div className="card_box">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-md-1">
                        <i
                          style={{ color: "#FFD35C" }}
                          className="fa fa-star fa-2x"
                        ></i>
                      </div>
                      <div className="col-md-11" hidden={isAvailableForPropose}>
                        <p>You have already submitted a proposal.</p>
                        <a
                          className="green_text"
                          onClick={() => {
                            this.props.history.push(
                              "/project-proposal-detail?id=" +
                                selectedProject.projectId +
                                "&&projectProposalId=" +
                                this.state.projectProposalId
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          View Proposal
                        </a>
                      </div>
                      <div
                        className="col-md-11"
                        hidden={!selectedProject.isWithdrawProposal}
                      >
                        <p>You have already withdrawal a proposal.</p>
                      </div>
                    </div>
                  </div>
                )}

                <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
                {!isSkeletonLoading && (
                  <div
                    className="project_post project_post_new project_post_new_2"
                    style={{ marginTop: isAvailableForPropose ? "" : "20px" }}
                  >
                    <div
                      className="project-post-confirmation-heading"
                      style={{ justifyContent: "space-between" }}
                    >
                      <h4 className="text-left-new">
                        {languageType.PROJECT_DETAILS}
                      </h4>
                      {selectedProject.isGuaranteed ? (
                        <div
                          className="top-right-text"
                          hidden={!isPaymentVerified}
                          style={{ paddingRight: "10px" }}
                        >
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/awardGuarnteee.svg"
                            }
                          />{" "}
                          {languageType.AWARD_GURANTEED}
                        </div>
                      ) : (
                        <div
                          className="top-right-text"
                          hidden={!isPaymentVerified}
                          style={{ paddingRight: "10px" }}
                        >
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/verifiedPayment.svg"
                            }
                          />{" "}
                          {languageType.PAYMENT_VERIFIED}
                        </div>
                      )}
                    </div>
                    <div
                      className="project-post-confirmation-items"
                      style={{ marginTop: "50px" }}
                    >
                      <div className="project-post-confirmation-item-left">
                        <span style={{ marginRight: "30px" }}>
                          {" "}
                          {languageType.PROJECT_TYPE} :{" "}
                        </span>{" "}
                        <ProjectTypeBadge
                          projectType={selectedProject.projectType}
                        />
                      </div>
                      <div className="project-post-confirmation-item-right">
                        <div hidden={isContest}>
                          <div style={{ float: "left" }}>
                            {" "}
                            {languageType.BUSINESS_SCOPE} :{" "}
                          </div>
                          <div
                            className="capitalize"
                            style={{ float: "left", color: "#3B3A3A" }}
                          >
                            {"  "}
                            <img
                              style={{
                                width: "27px",
                                height: "27px",
                                margin: "-4px 15px 0px 30px",
                              }}
                              src={
                                selectedProject.projectScope &&
                                selectedProject.projectScope.projectScope &&
                                `https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/${
                                  matchingScope[
                                    matchingScope.findIndex(
                                      (obj) =>
                                        obj.name ==
                                        selectedProject.projectScope
                                          .projectScope
                                    )
                                  ]?.icon || matchingScope[1].icon
                                } `
                              }
                            />{" "}
                            {"  "}
                            {selectedProject.projectScope &&
                              selectedProject.projectScope.projectScope}
                          </div>
                        </div>
                      </div>
                    </div>

 
                    <div className="project-post-confirmation-items">
                      <div className="project-post-confirmation-item-full-width">
                        <div className="project-post-confirmation-sub-item">
                          {languageType.JOB_TITLE} :
                        </div>
                        <div className="project-post-confirmation-sub-item desc">
                          {selectedProject.jobTitle}
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="project-post-confirmation-sub-item">
                          {languageType.JOB_DESCRIPTION} :
                        </div>
                        <div
                          className="project-post-confirmation-sub-item desc"
                          style={{ width: "80%" }}
                        >
                          <ShowMoreText
                            lines={5}
                            more="show more"
                            less="Show Less"
                            className="content-css"
                            anchorClass="view-more-less"
                            expanded={false}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  selectedProject.jobDescription ||
                                  selectedProject.contestComment,
                              }}
                            ></span>
                          </ShowMoreText>
                        </div>
                      </div>
                    </div>
                    <div hidden={!selectedProject.documents } className="file-attachments">
                      <h6>Attachments</h6>
                    <div  className="file-attachments-item">
                    {
                        selectedProject.documents && selectedProject.documents.length>0  &&
                        selectedProject.documents.map((item)=>(
                          <FileAttachments url={item} />
                        ))
                      }
                    </div>
                    </div>
                    <div
                      className="project-post-confirmation-items"
                      hidden={!isContest}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="3cells">
                          <div className="project-post-confirmation-sub-item">
                            <img
                              style={{
                                width: "22px",
                                height: "23px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              }
                            />{" "}
                            {"  "}
                            {languageType.FIRST_AWARDS_TEXT} :
                          </div>
                          <div className="project-post-confirmation-sub-item desc">
                            {selectedProject.featuredContestPrice}
                          </div>
                        </div>
                        {selectedProject.secondPlacePrize ? (
                          <div className="3cells">
                            <div className="project-post-confirmation-sub-item">
                              {languageType.SECOND_AWARDS_TEXT} :
                            </div>
                            <div className="project-post-confirmation-sub-item desc">
                              <Format
                                number={selectedProject.secondPlacePrize}
                                currency={selectedProject.currencyCode}
                              />
                            </div>
                          </div>
                        ) : null}

                        {selectedProject.thirdPlacePrize ? (
                          <div className="3cells">
                            <div className="project-post-confirmation-sub-item">
                              {languageType.THIRD_AWARDS_TEXT} :
                            </div>

                            <div className="project-post-confirmation-sub-item desc">
                              <Format
                                number={selectedProject.thirdPlacePrize}
                                currency={selectedProject.currencyCode}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={!isContest}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="3cells">
                          <div className="project-post-confirmation-sub-item">
                            <img
                              style={{
                                width: "29px",
                                height: "27px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              }
                            />{" "}
                            {"  "}
                            {languageType.CONTEST_OPEN} :
                          </div>
                          <div className="project-post-confirmation-sub-item desc">
                            {selectedProject.postDateTime &&
                              moment(selectedProject.postDateTime).format(
                                "lll"
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={!isContest}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="3cells">
                          <div className="project-post-confirmation-sub-item">
                            <img
                              style={{
                                width: "29px",
                                height: "27px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/brushlightcolor.svg"
                              }
                            />{" "}
                            {"  "}
                            {languageType.DESIGN_TEXT} :
                          </div>
                          <div className="project-post-confirmation-sub-item desc">
                            {selectedProject.packageDesignStyles}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="project-post-confirmation-items"
                      style={{ marginLeft: "-4px" }}
                      hidden={!isContest}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        {selectedProject.logoDesignStyles &&
                          JSON.parse(selectedProject.logoDesignStyles).map(
                            (item) => (
                              <div
                                style={{
                                  width: "140px",
                                  margin: "10px",
                                  border: "solid 1px grey",
                                  padding: "20px",
                                  float: "left",
                                }}
                              >
                                <img
                                  style={{ width: "100px" }}
                                  src={item.img}
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={!isContest}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="project-post-confirmation-sub-item">
                          <img
                            style={{
                              width: "45px",
                              margin: "-4px 0px 0px -4px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/bookmarkLove.svg"
                            }
                          />{" "}
                          {"  "}
                          {languageType.DESIGN_PREFERENCE} :
                        </div>
                      </div>
                      <div className="project-post-confirmation-item-full-width">
                        <div
                          className="project-post-confirmation-sub-item"
                          style={{ paddingTop: "40px", paddingLeft: "10px" }}
                        >
                          <div className="row justify-content-between">
                            <DisplayRangeComponent
                              type1={languageType.FEMALE}
                              type2={languageType.MALE}
                              percentage={selectedProject.maleFemalePercentage}
                            />
                            <DisplayRangeComponent
                              type1={languageType.YOUNG}
                              type2={languageType.MATURE}
                              percentage={selectedProject.youngMutualPercentage}
                            />
                            <DisplayRangeComponent
                              type1={languageType.MODERN}
                              type2={languageType.CLASSIC}
                              percentage={
                                selectedProject.modernClassicPercentage
                              }
                            />
                            <DisplayRangeComponent
                              type1={languageType.LUXURY}
                              type2={languageType.PUBLIC}
                              percentage={
                                selectedProject.luxuryPublicPercentage
                              }
                            />
                            <DisplayRangeComponent
                              type1={languageType.SIMPLE}
                              type2={languageType.COMPLEX}
                              percentage={
                                selectedProject.simpleComplexPercentage
                              }
                            />
                            <DisplayRangeComponent
                              type1={languageType.ABSTRACT}
                              type2={languageType.CONCRETE}
                              percentage={
                                selectedProject.abstractConcretePercentage
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={isContest}
                    >
                      {selectedProject.projectType ===
                        ProjectType.FreeContract && (
                        <div
                        style={{ width: "45%" }}
                          className="project-post-confirmation-item-left"
                          hidden={selectedProject.amountPerDay === ""}
                        >
                          <div className="heading">
                            <img
                              style={{
                                width: "20px",
                                height: "23px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              }
                            />{" "}
                            {"  "} {languageType.HOURLY_RATE} :{" "}
                          </div>
                          <div className="desc boldText">
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.minHourlyRate}
                              currency={selectedProject.currencyCode}
                            />{" "}
                            {" - "}
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.maxHourlyRate}
                              currency={selectedProject.currencyCode}
                            />
                          </div>
                        </div>
                      )}
                      {selectedProject.projectType === ProjectType.Hourly && (
                        <div
                        style={{ width: "45%" }}
                          className="project-post-confirmation-item-left"
                          hidden={selectedProject.amountPerDay === ""}
                        >
                          <div className="heading">
                            <img
                              style={{
                                width: "20px",
                                height: "23px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              }
                            />{" "}
                            {"  "} {languageType.HOURLY_RATE} :{" "}
                          </div>
                          <div className="desc boldText">
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.fromSalary || 0}
                              currency={selectedProject.currencyCode}
                            />{" "}
                            {" - "}
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.toSalary || "0"}
                              currency={selectedProject.currencyCode}
                            />
                          </div>
                        </div>
                      )}

                      {selectedProject.projectType ===
                        ProjectType.FreeContract && (
                        <div
                        style={{ width: "45%" }}
                          className="project-post-confirmation-item-right additionalInfo"
                          hidden={selectedProject.amountPerDay === ""}
                        >
                          <div className="heading">
                            <img
                              style={{
                                width: "26px",
                                height: "26px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              }
                            />{" "}
                            {"  "} {languageType.DAILY_RATE} :{" "}
                          </div>
                          <div className="desc boldText">
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.minDailyRate}
                              currency={selectedProject.currencyCode}
                            />{" "}
                            {" - "}
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.maxDailyRate}
                              currency={selectedProject.currencyCode}
                            />
                            {/*<FormatDWH week  currency={selectedProject.currencyCode} />*/}
                          </div>
                        </div>
                      )}
                      {selectedProject.projectType ===
                        ProjectType.OfficeWork && (
                        <div
                          className="project-post-confirmation-item-right additionalInfo"
                          style={{ width: "45%" }}
                          hidden={selectedProject.amountPerDay === ""}
                        >
                          <div className="heading">
                            <img
                              style={{
                                width: "26px",
                                height: "26px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              }
                            />{" "}
                            {"  "} {languageType.DAILY_RATE} :{" "}
                          </div>
                          <div className="desc boldText">
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.fromSalary}
                              currency={selectedProject.currencyCode}
                            />{" "}
                            {" - "}
                            <Currency currency={selectedProject.currencyCode} />
                            <Format
                              number={selectedProject.toSalary}
                              currency={selectedProject.currencyCode}
                            />
                            {/*<FormatDWH week  currency={selectedProject.currencyCode} />*/}
                          </div>
                        </div>
                      )}

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "45%" }}
                        hidden={
                          selectedProject.projectType !== ProjectType.Milestone
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "22px",
                              height: "23px",
                              margin: "-4px 10px 0px 0px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.BUDGET_TEXT} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          <Currency
                            currency={selectedProject.currencyCode}
                          />{" "}
                          <Format
                            currency={selectedProject.currencyCode}
                            number={selectedProject.projectBudgetForMilestone}
                          />
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "45%" }}
                        hidden={
                          selectedProject.projectType !==
                          ProjectType.FreeContract
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "22px",
                              height: "23px",
                              margin: "-4px 10px 0px 0px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/5131762_appointment_calendar_daily_once a week_publication_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.CONDITION_TEXT} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.maximumWeekHours}
                          <FormatDWH
                            hrs
                            currency={selectedProject.currencyCode}
                          />
                          /
                          <FormatDWH
                            week
                            currency={selectedProject.currencyCode}
                          />{" "}
                          , {selectedProject.noOfDayAttendance}
                          <FormatDWH
                            days
                            currency={selectedProject.currencyCode}
                          />
                          /
                          <FormatDWH
                            week
                            currency={selectedProject.currencyCode}
                          />
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "45%" }}
                        hidden={
                          selectedProject.projectType !== ProjectType.Hourly
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "22px",
                              height: "23px",
                              margin: "-4px 10px 0px 5px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/5131762_appointment_calendar_daily_once a week_publication_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.CONDITION_TEXT} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.maximumWeekHours}
                          <FormatDWH
                            hrs
                            currency={selectedProject.currencyCode}
                          />
                          /
                          <FormatDWH
                            week
                            currency={selectedProject.currencyCode}
                          />
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "50%" }}
                        hidden={
                          selectedProject.projectType !==
                          ProjectType.FreeContract
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "28px",
                              height: "28px",
                              margin: "-4px 10px 0px -4px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/565232_user_communication_profile_social_social network_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.PREFERRED_FREELANCER_TYPE} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.freelancerType}{" "}
                        </div>
                      </div>
                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "50%" }}
                        hidden={
                          selectedProject.projectType !== ProjectType.Milestone
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "28px",
                              height: "28px",
                              margin: "-4px 10px 0px -4px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/565232_user_communication_profile_social_social network_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.PREFERRED_FREELANCER_TYPE} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.freelancerType}{" "}
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "45%" }}
                        hidden={
                          selectedProject.projectType !== ProjectType.Hourly
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "28px",
                              height: "28px",
                              margin: "-4px 10px 0px -5px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                            }
                          />{" "}
                          {"  "} {languageType.PROBATION_PERIOD} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.probationPeriod}{" "}
                        </div>
                      </div>
                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "50%" }}
                        hidden={
                          selectedProject.projectType !== ProjectType.Hourly
                        }
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "28px",
                              height: "28px",
                              margin: "-4px 10px 0px -4px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/565232_user_communication_profile_social_social network_icon.svg"
                            }
                          />{" "}
                          {"  "} {languageType.PREFERRED_FREELANCER_TYPE} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.freelancerType}{" "}
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-right additionalInfo"
                        style={{ width: "45%" }}
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "28px",
                              height: "28px",
                              margin: "-4px 10px 0px -5px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                            }
                          />{" "}
                          {"  "} {languageType.positionAvailableDate} :{" "}
                        </div>
                        <div className="desc boldText">
                          {" "}
                          {selectedProject.positionAvailableDate?.slice(
                            0,
                            10
                          )}{" "} 
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-left additionalInfo"
                        style={{ width: "45%" }}
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "22px",
                              height: "23px",
                              margin: "-4px 10px 0px 0px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"
                            }
                          />{" "}
                          {"  "} {languageType.APPLICANTS_TEXT} :
                        </div>
                        <div className="desc boldText">
                          {selectedProject.proposalCount || "0"}
                        </div>
                      </div>

                      <div
                        className="project-post-confirmation-item-left additionalInfo"
                        style={{ width: "45%" }}
                      >
                        <div className="heading">
                          <img
                            style={{
                              width: "22px",
                              height: "23px",
                              margin: "-4px 10px 0px 0px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"
                            }
                          />{" "}
                          {"  "} {languageType.NO_OF_FREELANCER} :
                        </div>
                        <div className="desc boldText">
                          {selectedProject.noOfRequiredFreelancer}{" "}
                          {selectedProject.noOfRequiredFreelancer
                            ? selectedProject.noOfRequiredFreelancer > 1
                              ? "Persons"
                              : "Person"
                            : ""}
                        </div>
                      </div>
                      <div className="project-post-confirmation-item-right additionalInfo">
                        <div className="heading">
                          <img
                            style={{
                              width: "26px",
                              height: "27px",
                              margin: "-4px 10px 0px -2px",
                            }}
                            src={
                              "https://dhihitu47nqhv.cloudfront.net/icons/sixmonths.svg"
                            }
                          />{" "}
                          {"  "} {languageType.PROJECT_PERIOD} :{" "}
                        </div>
                        <div className="desc boldText">
                          {selectedProject.expectedCompletionDays
                            ? selectedProject.expectedCompletionDays
                            : "N/A"}{" "}
                          {/* {languageType.DAYS_TEXT} */}
                        </div>
                      </div>
                    </div>

                    {selectedProject.projectType === ProjectType.Milestone &&
                      selectedProject.offeredMilestones &&
                      selectedProject.offeredMilestones.length > 0 && (
                        <div className="project-post-confirmation-items">
                          <div className="project-post-confirmation-item-full-width">
                            <img
                              style={{
                                width: "22px",
                                height: "23px",
                                margin: "-4px 10px 0px 0px",
                              }}
                              src={
                                "https://dhihitu47nqhv.cloudfront.net/icons/flagblack.svg"
                              }
                            />{" "}
                            {"  "} {languageType.MILESTONE_TEXT}:
                          </div>
                          <div className="project-post-confirmation-item-full-width">
                            {selectedProject.offeredMilestones.map((item) => (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                  paddingLeft: "15px",
                                  paddingTop: "15px",
                                }}
                              >
                                <ol style={{ width: "99%" }}>
                                  <li style={{ width: "99%" }}>
                                    <p
                                      style={{
                                        marginBottom: "0px",
                                        minWidth: "150px",
                                        float: "left",
                                      }}
                                    >
                                      {item.milestoneTitle}
                                    </p>
                                    <p
                                      style={{
                                        marginBottom: "0px",
                                        minWidth: "150px",
                                        float: "left",
                                        fontWeight: "600",
                                        color: "#010101",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {" "}
                                      <Currency
                                        currency={selectedProject.currencyCode}
                                      />
                                      {item.offerAmount}{" "}
                                    </p>
                                    <p
                                      style={{
                                        marginBottom: "0px",
                                        minWidth: "150px",
                                        float: "left",
                                        fontWeight: "600",
                                        color: "#010101",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {moment(item.milestoneDueDate).format(
                                        "lll"
                                      )}
                                    </p>
                                  </li>
                                </ol>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div
                      className="project-post-confirmation-items"
                      hidden={isContest}
                      style={{ marginTop: "15px", marginBottom: "15px" }}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="project-post-confirmation-sub-item">
                          {languageType.REQUIRED_SKILLS} :
                        </div>
                        <div
                          className="project-post-confirmation-sub-item desc"
                          style={{ width: "80%" }}
                        >
                          {selectedProject.skills &&
                            selectedProject.skills.map((skill, index) => (
                              <a
                                key={index}
                                style={{
                                  margin: "2px",
                                  padding: "1px 8px 1px 8px",
                                }}
                                className="blue_div_new"
                                title={skill}
                              >
                                {skill}
                                {/*  <span
                                  className="float-right ml-1"
                                  style={{
                                    cursor: "pointer",
                                  }} onClick={() => this.handleRemoveSkill(skill)}
                                >
                                  &times;
                                </span> */}
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={isContest}
                    >
                      <div className="project-post-confirmation-item-left">
                        <div className="heading">
                          {" "}
                          {languageType.MIN_NO_OF_STAR} :{" "}
                        </div>
                        <div className="desc boldText">
                          <div className="project-post-confirmation-item-right">
                            <div className="requirements-left-response stars_block">
                              {selectedProject.noOfStar
                                ? this.renderStars(
                                    Number(selectedProject.noOfStar)
                                  )
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="project-post-confirmation-item-right">
                        <div className="heading">
                          {" "}
                          {languageType.JOB_SUCCESS_SCORE} :{" "}
                        </div>
                        <div className="desc boldText">
                          {selectedProject.jobSuccessScore}
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={isContest}
                    >
                      <div className="project-post-confirmation-item-left">
                        <div className="heading">
                          {" "}
                          {languageType.LOCATION_TEXT} :{" "}
                        </div>
                        <div className="desc boldText">
                          <div className="project-post-confirmation-item-right">
                            {selectedProject.freelancerLocation}
                          </div>
                        </div>
                      </div>
                      <div className="project-post-confirmation-item-right">
                        <div className="heading">
                          {" "}
                          {languageType.WORK_EXPERIENCE} :{" "}
                        </div>
                        <div className="desc boldText">
                          {selectedProject.yearsOfExperience
                            ? selectedProject.yearsOfExperience + " Years"
                            : ""}
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      hidden={isContest}
                    >
                      <div className="project-post-confirmation-item-left">
                        <div className="heading">
                          {" "}
                          {languageType.REQUIRED_LANGUAGE_TEXT} :{" "}
                        </div>
                        <div className="desc boldText">
                          <div className="project-post-confirmation-item-right">
                            {selectedProject.language}
                          </div>
                        </div>
                      </div>
                      <div className="project-post-confirmation-item-right">
                        <div className="heading">
                          {" "}
                          {languageType.LANGUAGE_LEVEL} :{" "}
                        </div>
                        <div className="desc boldText">
                          {selectedProject.languageLevel}
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-post-confirmation-items"
                      style={{ marginTop: "15px", marginBottom: "15px" }}
                    >
                      <div className="project-post-confirmation-item-full-width">
                        <div className="question-bottom-area question-bottom-area-new">
                          {selectedProject.projectType !==
                            ProjectType.Contest && (
                            <ol className="no-list">
                              {selectedProject.screeningQuestions &&
                                selectedProject.screeningQuestions.map(
                                  (screeningQuestion, index) => (
                                    <li
                                      key={index}
                                      style={{
                                        width: "99%",
                                        color: "#707070",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      {index == 0 && screeningQuestion && (
                                        <img
                                          style={{
                                            width: "25px",
                                            paddingLeft: "0px",
                                            marginLeft: "-5px",
                                            marginRight: "15px",
                                          }}
                                          src={
                                            "https://dhihitu47nqhv.cloudfront.net/icons/userquestionheader.svg"
                                          }
                                        />
                                      )}
                                      {index > 0 && screeningQuestion && (
                                        <div
                                          style={{
                                            width: "35px",
                                            height: "24px",
                                            paddingLeft: "0px",
                                          }}
                                        >
                                          {" "}
                                        </div>
                                      )}
                                      <div
                                        style={{
                                          float: "left",
                                          display: "inline",
                                        }}
                                      >
                                        {screeningQuestion.question ||
                                          screeningQuestion}
                                      </div>
                                    </li>
                                  )
                                )}
                            </ol>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="save_cancel submission-buttons">
                    <div
                                type="submit"
                                onClick={this.handleBackClick}
                                className="back-button"
                              >
                                <i className="fa fa-angle-left"></i>
                              </div>
                 

                      <button
                        disabled={this.state.loading}
                        onClick={() => this.onPageRedirectHandle()}
                        type="submit"
                        /* className="btn save_btn"  */ className="btn contest-project-post-btn"
                      >
                        {languageType.NEXT_TEXT} <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} />{" "}
                        {this.state.loading ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`col-12 col-md-2`}></div>
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
    projectPost: state.projectStore.projectPost,
  };
}
function mapDispatchProps(dispatch) {
  return {
    saveProjectDataRedux: (key, data) => {
      dispatch(saveProjectDataRedux(key, data));
    },
    projectPost_updateSuccessfully: () => {
      dispatch(projectPost_updateSuccessfully());
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ConfirmProject);

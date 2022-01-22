import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { onReduxRouteChange } from "../../../../store/action/action";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import RightTop from "../../../../components/rightbar/rightTop";
import RightBottom from "../../../../components/rightbar/rightBottom";
import { ProjectType } from "../../../../utils/projectConst";
import Skeleton from "../../../../components/skeleton/skeleton";
import FreeContract from "./proposalCompnents/freeContract";
import ProjectCardbox from "../../allprojects/projectCardbox";
import Heading from "../../../../components/postProject/heading";
import FormatDWH from "../../../../components/formatDWH";
import Format from "../../../../components/numberFormat";
import "../postProjectProposal.scss";
import SubHeader from "../../../../components/subHeader";
import WithDrawModal from "../../../../components/proposals/withdrawModal";
import FileAttachments from '../../../../components/postProject/fileAttchment'

class PostProjectProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerUserId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      projectId: new URLSearchParams(this.props.location.search).get("id"),
      projectProposalId: new URLSearchParams(this.props.location.search).get(
        "projectProposalId"
      ),
      isWithdrawalProposalModelOpen: false,
      proposalDetail: {},
      loading: false,
      isSkeletonLoading: false,
      selectedProject: {},
      projectProposalWithdrawReasons: [],
      proposalWithdraw: {
        withdrawReason: "",
        withdrawMessage: "",
        isBlockFutureInvitation: false,
      },
      errorMessage: {},
    };
  }

  componentDidMount() {
    this.bindProjectProposalWithdrawReasons();
    this.bindProposalDetail();
  }

  //#region Bind Methods
  async bindProjectProposalWithdrawReasons() {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=ProjectProposalWithdrawReasons`,
      getOptions({})
    );
    if (result && result.success) {
      result.result.data[0].data.map((element, i) => {
        array.push({
          id: element.id,
          name: element.name.toString(),
        });
      });
      this.setState({ projectProposalWithdrawReasons: array });
    }
  }

  async bindProposalDetail() {
    this.setState({ isSkeletonLoading: true });
    let result = await request(
      `${ENDPOINT["GetProposal"]}?projectProposalId=${this.state.projectProposalId}`,
      getOptions({})
    );
    if (result.success) {
      let element = result.result;
      if (
        element.coverLetter !== null &&
        element.coverLetter !== "" &&
        element.coverLetter !== undefined
      ) {
        element.coverLetter = element.coverLetter.startsWith("<p>")
          ? element.coverLetter.slice(3)
          : element.coverLetter;
        element.coverLetter = element.coverLetter.endsWith("</p>")
          ? element.coverLetter.slice(0, -4)
          : element.coverLetter;
      }

      this.setState({
        proposalDetail: element,
      });
      if (
        this.state.proposalDetail.projectId !== "" &&
        this.state.proposalDetail.projectId !== undefined &&
        this.state.proposalDetail.projectId !== null
      )
        this.bindProject();
    }
  }

  async bindProject() {
    this.setState({ isSkeletonLoading: true, selectedProject: {} });
    let result = await request(
      `${ENDPOINT["GetProject"]}?projectId=` +
        this.state.proposalDetail.projectId,
      getOptions({})
    );
    if (result.success) {
      let objProject = result.result;
      this.setState({
        isSkeletonLoading: false,
        selectedProject: objProject,
      });
      if (objProject.hasOwnProperty("skills"))
        objProject.skills =
          objProject.skills !== null && objProject.skills !== " "
            ? objProject.skills
            : [];

      if (objProject.hasOwnProperty("expectedCompletionDays"))
        objProject.expectedCompletionDays =
          objProject.expectedCompletionDays === null ||
          objProject.expectedCompletionDays.trim() === ""
            ? 0
            : objProject.expectedCompletionDays;
      if (objProject.hasOwnProperty("projectRemainingDays"))
        objProject.projectRemainingDays =
          objProject.projectRemainingDays === null ||
          objProject.projectRemainingDays.trim() === ""
            ? 0
            : objProject.projectRemainingDays;
      if (objProject.hasOwnProperty("projectClosingDate"))
        objProject.projectClosingDate = moment(
          objProject.projectClosingDate
        ).format("DD-MMM-YYYY");
      if (objProject.hasOwnProperty("projectReviewNoOfStar"))
        objProject.projectReviewNoOfStar =
          objProject.projectReviewNoOfStar.trim() !== ""
            ? parseInt(objProject.projectReviewNoOfStar)
            : 0;
      if (objProject.hasOwnProperty("documentList"))
        objProject.documentList =
          objProject.documentList === null ? [] : objProject.documentList;
      if (objProject.hasOwnProperty("projectAmount"))
        objProject.projectAmount =
          objProject.projectAmount === null ||
          objProject.projectAmount.trim() === "" ||
          objProject.projectAmount === "NaN"
            ? 0
            : parseFloat(objProject.projectAmount).toFixed(2);
      if (objProject.hasOwnProperty("fromSalary"))
        objProject.fromSalary =
          objProject.fromSalary === null || objProject.fromSalary.trim() === ""
            ? 0
            : parseFloat(objProject.fromSalary).toFixed(2);
      if (objProject.hasOwnProperty("toSalary"))
        objProject.toSalary =
          objProject.toSalary === null || objProject.toSalary.trim() === ""
            ? 0
            : parseFloat(objProject.toSalary).toFixed(2);
      if (objProject.hasOwnProperty("winningAmount"))
        objProject.winningAmount =
          objProject.winningAmount === null ||
          objProject.winningAmount.trim() === "" ||
          objProject.winningAmount === "NaN"
            ? 0
            : parseFloat(objProject.winningAmount).toFixed(2);
      if (objProject.hasOwnProperty("proposalCount"))
        objProject.proposalCount =
          objProject.proposalCount === null ||
          objProject.proposalCount.trim() === ""
            ? "0"
            : objProject.proposalCount;
      if (objProject.hasOwnProperty("amountPerDay"))
        objProject.amountPerDay =
          objProject.amountPerDay === null ||
          objProject.amountPerDay === "" ||
          objProject.amountPerDay === "NaN"
            ? "0"
            : parseFloat(objProject.amountPerDay).toFixed(2);
      if (objProject.hasOwnProperty("amountPerHour"))
        objProject.amountPerHour =
          objProject.amountPerHour === null ||
          objProject.amountPerHour === "" ||
          objProject.amountPerHour === "NaN"
            ? 0
            : parseFloat(objProject.amountPerHour).toFixed(2);
      if (
        objProject.hasOwnProperty("hourlyDetails") &&
        objProject.hourlyDetails &&
        objProject.hourlyDetails.trim() !== ""
      )
        objProject.fromSalary =
          objProject.hourlyDetails.trim() === ""
            ? 0
            : Math.min
                .apply(
                  Math,
                  JSON.parse(objProject.hourlyDetails).map(function (x) {
                    return x.fromAmount;
                  })
                )
                .toFixed(2);
      if (objProject.hasOwnProperty("maximumWeekHours"))
        objProject.maximumWeekHours =
          objProject.maximumWeekHours !== undefined &&
          objProject.maximumWeekHours !== null &&
          objProject.maximumWeekHours.trim() !== "" &&
          !isNaN(objProject.maximumWeekHours)
            ? parseInt(objProject.maximumWeekHours)
            : 0;
      if (
        objProject.maximumWeekHours === "" ||
        objProject.maximumWeekHours === 0 ||
        objProject.maximumWeekHours === "0"
      )
        objProject.maximumWeekHours =
          objProject.hourlyDetails && objProject.hourlyDetails.trim() === ""
            ? 0
            : Math.max.apply(
                Math,
                JSON.parse(objProject.hourlyDetails).map(function (x) {
                  return parseInt(x.maximumHourPerWeek);
                })
              );

      objProject.jobDescription = objProject.jobDescription.startsWith("<p>")
        ? objProject.jobDescription.slice(3)
        : objProject.jobDescription;
      objProject.jobDescription = objProject.jobDescription.endsWith("</p>")
        ? objProject.jobDescription.slice(0, -4)
        : objProject.jobDescription;

      this.setState({
        isSkeletonLoading: false,
        selectedProject: objProject,
      });
    } else {
      this.props.onRouteChange("/all-projects");
      this.props.history.push("/all-projects");
    }
  }
  //#endregion Bind Methods

  //#region Form Submit Method
  onFormSubmitHandle = (event) => {
    event.preventDefault();
  };
  //#endregion Form Submit Method

  //#region Withdraw Proposal Methods
  handleProposalWithdrawValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (
      this.state.proposalWithdraw.withdrawReason === null ||
      this.state.proposalWithdraw.withdrawReason === "" ||
      this.state.proposalWithdraw.withdrawReason === undefined
    ) {
      formIsValid = false;
      errorMessage["withdrawReason"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.proposalWithdraw.withdrawReason === "Other" &&
      (this.state.proposalWithdraw.withdrawMessage === null ||
        this.state.proposalWithdraw.withdrawMessage === "" ||
        this.state.proposalWithdraw.withdrawMessage === undefined)
    ) {
      formIsValid = false;
      errorMessage["withdrawMessage"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  onPageRedirectHandle = async (redirectTo) => {
    if (this.handleProposalWithdrawValidation()) {
      this.setState({ loading: true });
      let param = {
        freelancerReferenceId: this.state.freelancerUserId,
        projectProposalId: this.state.projectProposalId,
        projectId: this.state.projectId,
        isWithdrawProposal: true,
        withdrawReason: this.state.proposalWithdraw.withdrawReason,
        withdrawMessage:
          this.state.proposalWithdraw.withdrawReason === "Other"
            ? this.state.proposalWithdraw.withdrawMessage
            : "",
        isBlockFutureInvitation:
          this.state.proposalWithdraw.isBlockFutureInvitation,
      };
      let result = await request(
        ENDPOINT["WithdrawProposal"],
        postOptions(param)
      );
      if (result.success) {
        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
        notifications.showSuccess(
          "You have successfully width draw your proposal "
        );
        this.setState({ loading: false, isWithdrawalProposalModelOpen: false });
      } else {
        this.setState({ loading: false });
        notifications.showError(result.message);
      }
    } else return;
  };
  //#endregion Withdraw Proposal Methods

  render() {
    let { languageType } = this.props;
    let lessText = "Show Less";
    let {
      isSkeletonLoading,
      selectedProject,
      proposalDetail,
      projectProposalId,
      loading,
      isWithdrawalProposalModelOpen,
      projectProposalWithdrawReasons,
      errorMessage,
      proposalWithdraw,
    } = this.state;
    let iscontest = false;
    let isMilestone = false;
    let isHourly = false;
    let isFreeContract = false;
    let isofficeWork = false;

    if (selectedProject.projectType === ProjectType.Milestone) {
      isMilestone = true;
    }
    if (selectedProject.projectType === ProjectType.Hourly) {
      isHourly = true;
    }
    if (
      (selectedProject.projectType &&
        selectedProject.projectType.replace(/\s/g, "") ===
          ProjectType.FreeContract) ||
      selectedProject.projectType === ProjectType.FreeContract
    ) {
      isFreeContract = true;
    }
    if (selectedProject.projectType === ProjectType.Contest) {
      iscontest = true;
    }
    if (selectedProject.projectType === ProjectType.OfficeWork) {
      isofficeWork = true;
    }
    return (
      <>
        <SubHeader />

        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-lg-8 col-md-12">
                {/*Contest Detail*/}
                <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />

                {!isSkeletonLoading && (
                  <div style={{ marginTop: "0px" }}>
                    <ProjectCardbox
                      key={`cardProject${1}`}
                      selectedProject={selectedProject}
                      index={"0"}
                    />
                  </div>
                )}

                {/*Proposal Detail*/}
                <div className="project_post" hidden={isSkeletonLoading}>
                  <Heading
                    heading={"My Proposal"}
                    icon={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/post_sticky.svg"
                    }
                    color="#333333"
                    fontSize="26px"
                    fontWeight="600"
                    fontFamily="Raleway"
                  />
                  {/* <h4
                    style={{
                      color: "#669900",
                      borderBottom: "2px solid lightgrey",
                  
                    }}
                  >
                  
                    Your Proposed Terms
                  </h4> */}
                  <div
                    style={{ paddingLeft: "0px" }}
                    className="col-md-12 left_card"
                  >
                    <h4>
                      <h6
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "-25px",
                        }}
                        className="project-detail-area-middle"
                        dangerouslySetInnerHTML={{
                          __html: this.state.proposalDetail.coverLetter,
                        }}
                      />
                    </h4>
                    <br />
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
                          __html: this.state.proposalDetail.description,
                        }}
                      />
                    </ShowMoreText>
                  </div>

                  <form
                    className="post_form"
                    onSubmit={this.onFormSubmitHandle}
                    style={{ paddingLeft: "0px" }}
                  >
                    <div
                      className="row justify-content-between align-items-center"
                      hidden={isFreeContract ? false : true}
                    >
                      <div className="col-md-8 left_card">
                        <p>
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Hourly Amount :{" "}
                          <Format
                            currency={selectedProject.currencyCode}
                            number={proposalDetail.hourlyAmount}
                          />{" "}
                        </p>
                        <p>
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Daily Amount :{" "}
                          <Format
                            currency={selectedProject.currencyCode}
                            number={proposalDetail.amountPerDay}
                          />{" "}
                        </p>
                        <p>
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/5131762_appointment_calendar_daily_once a week_publication_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Week Days :{" "}
                          {proposalDetail.weekDays &&
                            JSON.parse(proposalDetail.weekDays).map((item) => (
                              <>
                                <div className="label-initial-general-days"></div>
                                {item}
                              </>
                            ))}{" "}
                        </p>
                        <p>
                          <div className="label-initial-general-img1">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              alt=""
                            />
                          </div>{" "}
                          Days Attending Per Week:{" "}
                          {proposalDetail.daysAttendingPerWeek}{" "}
                        </p>
                        <p>
                          {" "}
                          <div className="label-initial-general-img1">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              alt=""
                            />
                          </div>{" "}
                          Hours Per Week: {proposalDetail.hoursPerWeek}{" "}
                        </p>
                      </div>
                    </div>

                    <div
                      className="row justify-content-between align-items-center"
                      hidden={isofficeWork ? false : true}
                    >
                      <div className="col-md-8 left_card">
                        {/* <h4>Proposal Detail </h4>
                        <p>Total Amount the client will see on your proposal</p> */}

                        <p
                          hidden={
                            proposalDetail.freelancers &&
                            proposalDetail.freelancers.length === 0
                              ? false
                              : true
                          }
                        >
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Amount : {proposalDetail.amount}{" "}
                          {selectedProject.currencyCode || "USD"}
                        </p>

                        <p>
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/5131762_appointment_calendar_daily_once a week_publication_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Week Days :{" "}
                          {proposalDetail.weekDays &&
                            JSON.parse(proposalDetail.weekDays).toString()}{" "}
                        </p>
                        <p>
                          <div className="label-initial-general-img1">
                            {" "}
                            <img
                              s
                              src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              alt=""
                            />
                          </div>{" "}
                          Days Attending Per Week:{" "}
                          {proposalDetail.daysAttendingPerWeek}{" "}
                        </p>
                      </div>
                    </div>

                    {/*Hourly Detail*/}
                    <div
                      className="row justify-content-between align-items-center"
                      hidden={isHourly ? false : true}
                    >
                      <div className="col-md-8 left_card">
                        {/* <h4>Hourly Rate</h4>
                        <p>Total Amount the client will see on your proposal</p> */}
                        <p
                          hidden={
                            proposalDetail.freelancers &&
                            proposalDetail.freelancers.length === 0
                              ? false
                              : true
                          }
                        >
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Hourly Amount :{" "}
                          <Format
                            number={proposalDetail.hourlyAmount}
                            currency={proposalDetail.currencyCode}
                          />
                          /
                          <FormatDWH
                            hr
                            currency={proposalDetail.currencyCode}
                          />
                        </p>
                        <p>
                          {" "}
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Hours Per Week: {proposalDetail.hoursPerWeek}{" "}
                        </p>
                        <p>
                          <div className="label-initial-general-img1">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                              alt=""
                            />
                          </div>{" "}
                          Probation Accepted:{" "}
                          {proposalDetail.isProbationAccepted ? "Yes" : "No"}{" "}
                        </p>
                      </div>
                    </div>
                    {/* isProbationAccepted */}
                    {/*Milestone Detail*/}
                    <div
                      className="row justify-content-between align-items-center"
                      hidden={isMilestone ? false : true}
                    >
                      <div className="col-md-12 left_card">
                        {/* <h4>Milestone Detail</h4>
                        <p>Total Amount the client will see on your proposal</p> */}
                        <p>
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Amount :{" "}
                          <Format
                            number={this.state.proposalDetail.amount || "0"}
                            currency={proposalDetail.currencyCode}
                          />
                        </p>
                      </div>

                      <div className="col-md-12 left_card">
                        <h4
                          hidden={
                            isMilestone &&
                            this.state.proposalDetail.offeredMilestones &&
                            this.state.proposalDetail.offeredMilestones.length >
                              0
                              ? false
                              : true
                          }
                        >
                          {" "}
                          <div className="label-initial-general-img">
                            {" "}
                            <img
                              src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                              alt=""
                            />
                          </div>{" "}
                          Milestone
                        </h4>
                        <br />
                        {isMilestone &&
                        this.state.proposalDetail.offeredMilestones &&
                        this.state.proposalDetail.offeredMilestones.length >
                          0 ? (
                          <>
                            <div className="col-md-12 left_card">
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>Milestone Description</label>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Milestone Amount</label>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Milestone Due Date</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {this.state.proposalDetail.offeredMilestones
                              .length > 0 &&
                              this.state.proposalDetail.offeredMilestones.map(
                                (milestone, index) => (
                                  <div
                                    key={`milestone${index}`}
                                    className="col-md-12 left_card"
                                  >
                                    <div key={index} className="row">
                                      <div className="form-group">
                                        <p>{index + 1}</p>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <p>{milestone.milestoneTitle}</p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <p>
                                            <Format
                                              number={milestone.offerAmount}
                                              currency={
                                                selectedProject.currencyCode
                                              }
                                            />
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <p>
                                            {moment(
                                              milestone.milestoneDueDate
                                            ).format("DD-MMM-YYYY")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </>
                        ) : (
                          <div
                            style={{ marginLeft: "12px", visibility: "hidden" }}
                          >
                            <p>
                              Amount : {selectedProject.currencyCode}{" "}
                              {this.state.proposalDetail.amount || "0"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="selected-members">
                          <h4
                            hidden={
                              proposalDetail.freelancers &&
                              proposalDetail.freelancers.length === 0
                            }
                          >
                            {" "}
                            <div className="label-initial-general-img1">
                              {" "}
                              <img
                                src={
                                  "https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"
                                }
                                alt=""
                              />
                            </div>
                            Freelancers
                          </h4>
                          <div className="row">
                            {proposalDetail.freelancers &&
                              proposalDetail.freelancers.length > 0 &&
                              proposalDetail.freelancers.map(
                                (item1, index1) => {
                                  return (
                                    <div className="col-12">
                                      <div className="freelancer-user-item">
                                        <div className="freelancer-user-item-top">
                                          <div className="freelancer-user-item-profile">
                                            <img
                                              src={
                                                item1.freelancer?.userProfileUrl
                                                  ? `https://dhihitu47nqhv.cloudfront.net/${item1.freelancer?.userProfileUrl}`
                                                  : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                                              }
                                            />
                                            <div className="profile-detail">
                                              <p>
                                                {item1.freelancer?.userName ||
                                                  "Freelancer name N/A"}
                                              </p>
                                              <span>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                              </span>
                                            </div>
                                          </div>
                                          <div className="freelancer-user-item-role">
                                            <div>
                                              <input
                                                readOnly={true}
                                                placeholder="set a role"
                                                value={
                                                  item1.freelancer?.userTitle
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="freelancer-profile-rate">
                                          <div
                                            className="row"
                                            hidden={
                                              selectedProject.projectType ===
                                              "Milestone"
                                            }
                                          >
                                            <div
                                              className="col-12 col-md-6"
                                              hidden={
                                                selectedProject.projectType ===
                                                "OfficeWork"
                                              }
                                            >
                                              <div className="project-terms-item">
                                                <div className="project-terms-item-left">
                                                  <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                                                  Hourly Rate :
                                                </div>
                                                <div className="project-terms-item-right">
                                                  US${" "}
                                                  <input
                                                    readOnly={true}
                                                    value={
                                                      item1.hourlyRate + ".00"
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col-12 col-md-6"
                                              hidden={
                                                selectedProject.projectType ===
                                                "FreeContract"
                                                  ? false
                                                  : selectedProject.projectType ==
                                                    "OfficeWork"
                                                  ? false
                                                  : true
                                              }
                                            >
                                              <div className="project-terms-item">
                                                <div className="project-terms-item-left">
                                                  <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                                                  Daily Rate :
                                                </div>
                                                <div className="project-terms-item-right">
                                                  US${" "}
                                                  <input
                                                    readOnly={true}
                                                    value={
                                                      item1.dailyRate + ".00"
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                      <div hidden={!proposalDetail.documents } className="file-attachments">
                      <h6> <img style={{width:'20px',marginRight:'5px',marginTop:'-3px'}} src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobDocuments.svg" />Attachments</h6>
                    <div  style={{marginLeft:'-10px'}}  className="file-attachments-item">
                    {
                        proposalDetail.documents && proposalDetail.documents.length>0  &&
                        proposalDetail.documents.map((item)=>(
                          <FileAttachments url={item} />
                        ))
                      }
                    </div>
                    </div>
                        </div>
                    </div>
                    <div
                      hidden={sessionStorage.userType === "Client"}
                      className="text-right save_cancel withdrawProposal_changeTerms_Mobile"
                    >
                      <button
                        type="button"
                        disabled={this.state.proposalDetail.isHired || this.state.proposalDetail.proposalStatus!="Offered"}
                        onClick={() => {
                          this.setState({
                            isWithdrawalProposalModelOpen: true,
                          });
                        }}
                        className="btn save_btn"
                      >
                        {" "}
                        Withdraw Proposal{" "}
                      </button>
                      <button
                        type="button"
                        disabled={this.state.proposalDetail.isHired || this.state.proposalDetail.proposalStatus!="Offered"}
                        onClick={() =>
                          this.props.history.push(
                            `/project-post-proposal?projectId=${this.state.selectedProject.projectId}&projectProposalId=${projectProposalId}`
                          )
                        }
                        className="btn cancel_btn"
                      >
                        {" "}
                        Change Terms{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-2 col-md-12"></div>
            </div>
          </div>

          <WithDrawModal
            isWithdrawalProposalModelOpen={isWithdrawalProposalModelOpen}
            handleClose={() =>
              this.setState({ isWithdrawalProposalModelOpen: false })
            }
            projectProposalWithdrawReasons={projectProposalWithdrawReasons}
            errorMessage={errorMessage}
            proposalWithdraw={proposalWithdraw}
            handleUpdateProposalWithdraw={(proposalWithdraw) =>
              this.setState({ proposalWithdraw })
            }
            onPageRedirectHandle={() =>
              this.onPageRedirectHandle("/my-proposals")
            }
            loading={loading}
            setErrorMessage={(errorMessage) => this.setState({ errorMessage })}
            modalKey="ProposalsDetail"
          />
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
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(PostProjectProposal);

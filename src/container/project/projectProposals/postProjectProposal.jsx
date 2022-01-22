import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ShowMoreText from "react-show-more-text";
import { onReduxRouteChange } from "../../../store/action/action";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { ProjectTypeConst, ProjectType } from "../../../utils/projectConst";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import Skeleton from "../../../components/skeleton/skeleton";
import "../projectDetails/projectDetail.scss";
import "./postProjectProposal.scss";
import Label from "../../../components/customLabel/label";
import Milestone from "./projectProposalDetails/proposalCompnents/milestone";
import Hourly from "./projectProposalDetails/proposalCompnents/hourly";
import FreeContract from "./projectProposalDetails/proposalCompnents/freeContract";
import OfficeWork from "./projectProposalDetails/proposalCompnents/officeWork";
import ContestTypeProposal from "./projectProposalDetails/proposalCompnents/constestType";
import Currency from "../../../components/currency";
import Format from "../../../components/numberFormat";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import FormatDWH from "../../../components/formatDWH";
import ProjectCardbox from "../allprojects/projectCardbox";
import SubHeader from "../../../components/subHeader";
import notifications from "../../../utils/notifications";
import { uploadImage, deleteImage } from "../../../services/uploadImages";
import FileUploadLoader from "../../../components/loader/fileUpload";

class PostProjectProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : props.authUser?.organizationAuth?.organizationId,
      projectId:
        new URLSearchParams(this.props.location.search).get("projectId") !==
        null
          ? new URLSearchParams(this.props.location.search).get("projectId")
          : "",
      projectProposalId:
        new URLSearchParams(this.props.location.search).get(
          "projectProposalId"
        ) !== null
          ? new URLSearchParams(this.props.location.search).get(
              "projectProposalId"
            )
          : "",
      description: "",
      coverLetter: "",
      amount: "",
      hourlyAmount: "",
      expectedCompletionDays: "",
      milestone: {
        milestoneId: 1,
        milestoneDescription: "",
        milestoneAmount: "",
        milestoneDueDate: "",
      },
      milestoneList: [],
      screeningQuestionList: [],
      isSkeletonLoading: false,
      selectedProject: {},
      errorMessage: {},
      existingProposalData: {},
      companyFreelancers: [],
      documents:[],
      uploading:false
    };
  }

  componentWillMount() {
    this.bindProject();
    this.state.milestoneList.push(this.state.milestone);
    if (this.props.authUser?.organizationAuth?.organizationId) {
      this.getCompanyMembers();
    }
  }

  getCompanyMembers = async () => {
    let organizationId = this.state.userId;
    if (organizationId) {
      let result = await request(
        `${ENDPOINT["GetFreelancersByOrganization"]}?organizationId=${organizationId}`,
        postOptions()
      );
      if (result.success) {
        this.setState({ companyFreelancers: result.result });
      } else {
        notifications.showWarning(
          "Error while loading the freelancer against company"
        );
      }
    }
  };

  //#region Bind Contest, Proposal Detail
  async bindProject() {
    this.setState({ isSkeletonLoading: true, selectedProject: {} });
    let result = await request(
      `${ENDPOINT["GetProject"]}?projectId=` +
        this.state.projectId /*  + `&userId=` + this.state.userId */,
      getOptions({})
    );
    if (result.success) {
      let objProject = result.result;

      if (objProject.hasOwnProperty("postDateTime"))
        objProject.postDateTime = moment(objProject.postDateTime).format(
          "DD-MMM-YYYY"
        );
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
          objProject.projectAmount.trim() === ""
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
          objProject.winningAmount.trim() === ""
            ? 0
            : parseFloat(objProject.winningAmount).toFixed(2);
      if (objProject.hasOwnProperty("isUserProposalExist"))
        objProject.isUserProposalExist =
          objProject.isUserProposalExist !== null &&
          objProject.isUserProposalExist !== ""
            ? objProject.isUserProposalExist
            : false;
      if (objProject.hasOwnProperty("proposalCount"))
        objProject.proposalCount =
          objProject.proposalCount === null ||
          objProject.proposalCount.trim() === ""
            ? 0
            : objProject.proposalCount;
      if (objProject.hasOwnProperty("amountPerDay"))
        objProject.amountPerDay =
          objProject.amountPerDay === null ||
          objProject.amountPerDay.trim() === ""
            ? 0
            : parseFloat(objProject.amountPerDay).toFixed(2);
      if (objProject.hasOwnProperty("amountPerHour"))
        objProject.amountPerHour =
          objProject.amountPerHour === null ||
          objProject.amountPerHour.trim() === ""
            ? 0
            : parseFloat(objProject.amountPerHour).toFixed(2);
      if (
        objProject.hasOwnProperty("hourlyDetails") &&
        objProject.hourlyDetails !== ""
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
          objProject.maximumWeekHours.trim() !== ""
            ? parseInt(objProject.maximumWeekHours)
            : 0;

      if (objProject.hasOwnProperty("screeningQuestions")) {
        if (
          objProject.screeningQuestions &&
          objProject.screeningQuestions.trim() !== "" &&
          objProject.screeningQuestions !== null &&
          objProject.screeningQuestions !== undefined
        ) {
          let screeningQuestions = JSON.parse(objProject.screeningQuestions);
          screeningQuestions.map((objProject, i) => {
            this.state.screeningQuestionList.push({
              questionId: objProject.questionId,
              question: objProject.question,
              answer: "",
            });
          });
        } else objProject.screeningQuestionList = [];
      }

      objProject.jobDescription = objProject.jobDescription.startsWith("<p>")
        ? objProject.jobDescription.slice(3)
        : objProject.jobDescription;
      objProject.jobDescription = objProject.jobDescription.endsWith("</p>")
        ? objProject.jobDescription.slice(0, -4)
        : objProject.jobDescription;

      if (this.state.projectProposalId) {
        this.bindProposalDetail();
      }

      this.setState({
        isSkeletonLoading: false,
        selectedProject: objProject,
      });
    } else {
      this.props.onRouteChange("/all-projects");
      this.props.history.push("/all-projects");
    }
  }

  async bindProposalDetail() {
    let result = await request(
      `${ENDPOINT["GetProposal"]}?projectProposalId=${this.state.projectProposalId}`,
      getOptions({})
    );

    if (result.success) {
      let element = result.result;

      this.setState({
        description: element.description,
        coverLetter: element.coverLetter,
        existingProposalData: element,
      });

      let screeningQuestions = this.state.screeningQuestionList;
      screeningQuestions.map((screeningQuestion, i) => {
        let question = JSON.parse(element.screeningQuestions).find(
          (x) => x.questionId === screeningQuestion.questionId
        );
        if (question !== null) screeningQuestion.answer = question.answer;
      });
    }
  }
  //#endregion Bind Contest, Proposal Detail

  //#region Click Events
  addClickMilestone = () => {
    let array = this.state.milestoneList;
    const maxMilestoneId = Math.max(
      ...this.state.milestoneList.map((item) => item.milestoneId)
    );
    array.push({
      id: maxMilestoneId + 1,
      milestoneDescription: "",
      milestoneAmount: "",
      milestoneDueDate: "",
    });
    this.setState({ milestoneList: array });
  };

  removeClickMilestone = (index) => {
    let array = this.state.milestoneList;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ milestoneList: array });
    }
  };
  //#endregion Click Events

  //#region Post Contest Proposal
  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (this.state.projectId === null || this.state.projectId === "") {
      formIsValid = false;
      errorMessage["projectId"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.description === null ||
      this.state.description === ""
    ) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
    } else if (
      (this.state.selectedProject.projectType === ProjectType.Contest ||
        this.state.selectedProject.projectType === ProjectType.FreeContract ||
        this.state.selectedProject.projectType === ProjectType.OfficeWork) &&
      (!this.state.amount ||
        this.state.amount === null ||
        this.state.amount === "")
    ) {
      formIsValid = false;
      errorMessage["amount"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.selectedProject.projectType === ProjectType.Hourly &&
      (!this.state.hourlyAmount ||
        this.state.hourlyAmount === null ||
        this.state.hourlyAmount === "")
    ) {
      formIsValid = false;
      errorMessage["hourlyAmount"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.selectedProject.projectType === ProjectType.Milestone &&
      this.state.milestoneList.filter((x) => x.milestoneDescription === "")
        .length > 0
    ) {
      formIsValid = false;
      errorMessage["milestone"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.selectedProject.projectType === ProjectType.Milestone &&
      this.state.milestoneList.filter(
        (x) => x.milestoneAmount === "" || x.milestoneAmount === "0"
      ).length > 0
    ) {
      formIsValid = false;
      errorMessage["milestone"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.selectedProject.projectType === ProjectType.Milestone &&
      this.state.milestoneList.filter((x) => x.milestoneDueDate === "").length >
        0
    ) {
      formIsValid = false;
      errorMessage["milestone"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.selectedProject.isCoverLetterRequired &&
      (this.state.coverLetter === null || this.state.coverLetter === "")
    ) {
      formIsValid = false;
      errorMessage["coverLetter"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.screeningQuestionList.length > 0 &&
      this.state.screeningQuestionList.filter((x) => x.answer === "").length > 0
    ) {
      formIsValid = false;
      errorMessage["answer"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  //#endregion Post Contest Proposal

  //#region Form Submit Method
  onFormSubmitHandle = (event) => {
    event.preventDefault();
  };
  //#endregion Form Submit Method
  // setting validation\
  handleInitialValidation = (type) => {
    let { languageType } = this.props;
    let errorMessage = {};
    errorMessage[type] = languageType.REQUIRED_MESSAGE;
    this.setState({ errorMessage: errorMessage });
  };
  handleUpdateBasicInfo = (type, value) => {
    let errMsg = this.state.errorMessage;
    delete errMsg[type];
    this.setState({ [type]: value, errorMessage: errMsg });
  };
   handleUploadImage = async (file) => {
    this.setState({uploading:true})
    let response = await uploadImage(file, "photos");
    if (response.success) {
      this.setState({documents:[...this.state.documents,response.result.s3Key],uploading:false})

    } else {
      notifications.showError(response || "Error uploading image.");
      this.setState({uploading:false})
    }
  };

   handleDeleteImage = async (key,index) => {
    let documentsAll=[...this.state.documents]
     documentsAll.splice(index,1)
    this.setState({documents:documentsAll})
    if (key.slice(0, 5) != "https") {
      await deleteImage(key);
    }
  };
  render() {
    let { languageType } = this.props;
    let lessText = "Show Less";
    let {
      isSkeletonLoading,
      selectedProject,
      coverLetter,
      description,
      userId,
      projectId,
      projectProposalId,
      existingProposalData,
      companyFreelancers,
      documents,
      uploading
    } = this.state;

    let isMilestone,
      isHourly,
      isFreeContract,
      isofficeWork,
      iscontest = false;
    if (selectedProject.projectType === ProjectType.Milestone)
      isMilestone = true;
    if (selectedProject.projectType === ProjectType.Hourly) isHourly = true;
    if (
      selectedProject.projectType === ProjectType.FreeContract ||
      selectedProject.projectType === "Free Contract"
    ) {
      isFreeContract = true;
    }
    if (
      selectedProject.projectType &&
      selectedProject.projectType.replace(/\s/g, "") === ProjectType.OfficeWork
    )
      isofficeWork = true;
    if (selectedProject.projectType === ProjectType.Contest) iscontest = true;
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

                <div
                  className="project-client-detail-area project_propose_area"
                  hidden={isSkeletonLoading}
                  style={{ marginTop: "20px" }}
                >
                  <h4
                    className="project-client-detail-heading"
                    style={{ textTransform: "uppercase" }}
                  >
                    {languageType.PROJECT_PROPOSAL}
                  </h4>

                  <div className="row">
                    <div className="col-12 project_propose_area_cardBox_colAlign">
                      <ProjectCardbox
                        key={`cardProject${0}`}
                        selectedProject={selectedProject}
                        index={0}
                        IsNewDesign={1}
                      />
                    </div>
                  </div>
                  <h4
                    className="project-client-detail-heading"
                    style={{ textTransform: "uppercase" }}
                  >
                    {languageType.PROJECT_DETAIL}
                  </h4>

                  <div className="input_proposal_area">
                    <div className="row">
                      <div className="col-12 col-md-10">
                        {" "}
                        <Label
                          title={"Propose Description"}
                          compulsory={true}
                        />
                        <input
                          type="text"
                          value={coverLetter}
                          onChange={(event) =>
                            this.handleUpdateBasicInfo(
                              "coverLetter",
                              event.target.value
                            )
                          }
                          placeholder="Proposing Title"
                        />
                        {this.state.errorMessage.coverLetter && (
                          <p className="text-danger">
                            {" "}
                            {this.state.errorMessage.coverLetter}{" "}
                          </p>
                        )}
                      </div>
                      <div className="col-12 col-md-2">
                        <label  for={"proposal-file-upload"}>
                        <div className="attach-files-button-for-proposal">
                           <div>  Attach file  &nbsp;  <i class="fas fa-paperclip"></i></div>
                         </div>
                        </label>
                        <input type={"file"}
                          accept="jpg jpeg png PNG gif"
                          onChange={(e) => {
                            let size = e.target.files[0]
                              ? e.target.files[0].size
                              : 0;
                            if (size < 1048576) {
                              this.handleUploadImage(e.target.files[0]);
                            } else {
                              notifications.showWarning(
                                languageType.IMAGE_UPLOADING_SIZE_TEXT
                              );
                            }
                          }}
                        id={"proposal-file-upload"}  style={{visibility:"hidden",height:'0px'}} />
                       
                      </div>
                      
                    </div>

                    <textarea
                      name="textarea"
                      rows="10"
                      value={description}
                      onChange={(event) =>
                        this.handleUpdateBasicInfo(
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Write your proposal here"
                    ></textarea>
                    {this.state.errorMessage.description && (
                      <p className="text-danger">
                        {" "}
                        {this.state.errorMessage.description}{" "}
                      </p>
                    )}
                    <br />
                    <div className="row">
                    <div hidden={documents.length===0} className="col-12">
                    <br />
                        <div className="uploaded-files-area-proposal">
                          {
                            documents.map((item,index)=>( <div className="uploaded-files-area-proposal-item">
                            <i class="fas fa-paperclip"></i> <span>{item}</span> <i title="Delate this file" onClick={()=>this.handleDeleteImage(item,index)} class="fas fa-close"></i>
                            </div>))
                          }
                         
                        </div>
                      </div>
                    </div>
                  </div>

                  {isMilestone && (
                    <Milestone
                      selectedProject={{ ...selectedProject }}
                      proposalData={{
                        userId: userId,
                        projectId: projectId,
                        coverLetter: coverLetter,
                        description: description,
                        screeningQuestionList: this.state.screeningQuestionList,
                        projectProposalId: projectProposalId,
                      }}
                      handleInitialValidation={this.handleInitialValidation}
                      languageType={languageType}
                      existingProposalData={existingProposalData}
                      companyFreelancers={companyFreelancers}
                      documents={documents}
                      {...this.props}
                    />
                  )}

                  {isHourly && (
                    <Hourly
                      selectedProject={{ ...selectedProject }}
                      proposalData={{
                        userId: userId,
                        projectId: projectId,
                        coverLetter: coverLetter,
                        description: description,
                        screeningQuestionList: this.state.screeningQuestionList,
                        projectProposalId: projectProposalId,
                      }}
                      handleInitialValidation={this.handleInitialValidation}
                      languageType={languageType}
                      documents={documents}
                      existingProposalData={existingProposalData}
                      companyFreelancers={companyFreelancers}
                      {...this.props}
                    />
                  )}
                  {isFreeContract && (
                    <FreeContract
                      selectedProject={{ ...selectedProject }}
                      proposalData={{
                        userId: userId,
                        projectId: projectId,
                        coverLetter: coverLetter,
                        description: description,
                        screeningQuestionList: this.state.screeningQuestionList,
                        projectProposalId: projectProposalId,
                      }}
                      handleInitialValidation={this.handleInitialValidation}
                      languageType={languageType}
                      existingProposalData={existingProposalData}
                      documents={documents}
                      companyFreelancers={companyFreelancers}
                      {...this.props}
                    />
                  )}
                  {isofficeWork && (
                    <OfficeWork
                      selectedProject={{ ...selectedProject }}
                      proposalData={{
                        userId: userId,
                        projectId: projectId,
                        coverLetter: coverLetter,
                        description: description,
                        screeningQuestionList: this.state.screeningQuestionList,
                        projectProposalId: projectProposalId,
                      }}
                      handleInitialValidation={this.handleInitialValidation}
                      languageType={languageType}
                      existingProposalData={existingProposalData}
                      documents={documents}
                      companyFreelancers={companyFreelancers}
                      {...this.props}
                    />
                  )}
                  {iscontest && (
                    <ContestTypeProposal
                      selectedProject={{ ...selectedProject }}
                      proposalData={{
                        userId: userId,
                        projectId: projectId,
                        coverLetter: coverLetter,
                        description: description,
                        screeningQuestionList: this.state.screeningQuestionList,
                        projectProposalId: projectProposalId,
                      }}
                      handleInitialValidation={this.handleInitialValidation}
                      languageType={languageType}
                      existingProposalData={existingProposalData}
                      {...this.props}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                {/* <RightTop />
                <RightBottom /> */}
              </div>
            </div>
          </div>
        </section>
        <FileUploadLoader title={" Uploading new file..."} show={uploading} />
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

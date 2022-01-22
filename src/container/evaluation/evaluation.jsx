import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DropdownList from "../../components/dropdowns/dropdownList";
import RightBottom from "../../components/rightbar/rightBottom";
import RightTop from "../../components/rightbar/rightTop";
import Skeleton from "../../components/skeleton/skeleton.jsx";
import { hitApiGetUser } from "../../services/userService.js";
import { ENDPOINT } from "../../utils/endpoint.js";
import { getOptions, postOptions } from "../../utils/httpConfig.js";
import notifications from "../../utils/notifications.js";
import request from "../../utils/request.js";
import PublicFeedback from "./publicFeedback";
import RightSection from "./rightSection";
import ProjectCardbox from "../project/allprojects/projectCardbox";
import "./evaluation.scss";
import SubHeader from "../../components/subHeader";

function validateWords(string, noOfWords) {
  return (
    string
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n /, "\n")
      .split(" ").length < parseInt(noOfWords)
  );
}

const endContractReasons = [
  {
    text: "Job completed successfully",
    value: "Job completed successfully",
  },
  {
    text: "Job cancelled due freelancer  performance",
    value: "Job cancelled due freelancer  performance",
  },
  {
    text: "Job cancelled for other reason",
    value: "Job cancelled for other reason",
  },
  {
    text: "Another reason",
    value: "Another reason",
  },
];

class Evaluation extends Component {
  renderType() {
    return sessionStorage.getItem("userType") == "Freelancer"
      ? "Client"
      : this.props.organizationReducer != null
      ? ""
      : "Freelancer";
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: { recommendPercentage: 100 },
      projectContractDetail: this.props.location?.state?.contractDetail,
      isSkeletonLoading: false,
      projectId: new URLSearchParams(this.props.location.search).get(
        "projectId"
      ),
      type:
        new URLSearchParams(this.props.location.search).get("type") ||
        "freelancer",
      projectDetailResponse: {},
      projectResponse: {},
      userData: {},
      reasonForEndContract: "",
      totalScore: 0,
      reviewText: "",
      errors: ["endingReason", "totalScore", "reviewText"].reduce(
        (current, item) => {
          current[item] = {};
          current[item]["hasError"] = false;
          current[item]["errorMsg"] = "";
          return current;
        },
        {}
      ),
      feedback: {
        skillsStars: 0,
        qualityOfWorkStars: 0,
        availabilityStars: 0,
        understandingTask: 0,
        communicationStars: 0,
        cooperationStars: 0,
        emojiFeedback: "gestureEmojy",
        teamSkillStars: 0,
        managementStars: 0,
        responsibleStar: 0,
        projectUnderStandStar: 0,
        qualityOfRequirementStar: 0,
      },
      loading: false,
    };
  }

  handleUpdateFeedBack = (field, value) => {
    this.setState({
      feedback: { ...this.state.feedback, [field]: value },
    });
  };
  async componentDidMount() {
    let projectId = new URLSearchParams(this.props.location.search).get(
      "projectId"
    );
    console.log(this.props, "projectId projectId projectId projectId ");
    if (projectId !== null) {
      await this.getProjectData();
    } else {
      this.props.history.push("/");
    }

    if( this.props.location.state?.contractDetail?.projectContractId){

    }else{
      notifications.showWarning("Not select any contract, first select contract!")
      this.props.history.push('/my-contracts')
    }
  }

  getProjectData = async () => {
    const { history } = this.props;
    this.setState({ isSkeletonLoading: true });
    let response = await request(
      `${ENDPOINT["GetProject"]}?projectId=` +
        this.state.projectId +
        "&userId=" +
        this.state.freelancerUserId,
      getOptions({})
    );
    if (response.success) {
      if (response.result) {
        if (response.result) {
          this.setState(
            {
              projectDetailResponse: response.result,
              projectResponse: response.result,
            },
            () => {
              this.setState({ isSkeletonLoading: false });
            }
          );
        }
      }
    } else {
      this.setState({ isSkeletonLoading: false });
      history.goBack();
    }
  };

  onFieldChange = (e) => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };

  // call to submit the reviews

  async submitTheReview() {
    let { type } = this.state;

    if (type === "freelancer") {
      this.handleSubmitClientFeedbackToFreelancer();
    } else if (type === "company") {
      this.handleSubmitClientFeedbackToOrganization();
    } else if (type === "client") {
      this.handleSubmitFreelancerFeedbackToClient();
    }
  }
  handleSubmitClientFeedbackToOrganization = async () => {
    const {
      projectResponse,
      projectContractDetail,
      totalScore,
      reviewText,
      reasonForEndContract,
      fields,
      feedback,
    } = this.state;
    let contractDetail = this.props.location.state.contractDetail;
    let params = {
      contractId: contractDetail.projectContractId,
      clientId: contractDetail.postUserId,
      organizationId: contractDetail?.userProfile?.organizationId,
      createdDateTime: "",
      updatedDateTime: "",
      reasonForEnding: reasonForEndContract,
      otherReason: "",
      recommendPercent: fields.recommendPercentage.toString(),
      availabilityPublicRating: feedback.availabilityStars.toString(),
      teamSkillPublicRating: feedback.teamSkillStars.toString(),
      qualityPublicRating: feedback.qualityOfWorkStars.toString(),
      managementPublicRating:feedback.managementStars.toString(),
      understandingPublicRating: feedback.understandingTask.toString(),
      feedbackMessage: reviewText,
      communicationEmoji:feedback.emojiFeedback,
      totalScore: totalScore.toString(),
    };
    this.setState({ loading: true });
    let reviewResponse = await request(
      ENDPOINT["AddNewOrganizationFeedback"],
      postOptions(params)
    );

    if (reviewResponse.success) {
      notifications.showSuccess(
        "You have successfully added feedback for freelancer"
      );
      this.props.history.push("/my-contracts");
      this.setState({ loading: false });
    } else {
      notifications.showError(
        reviewResponse.message
          ? reviewResponse.message
          : "Something went wrong! try later."
      );
      this.setState({ loading: false });
    }

  };
  handleSubmitClientFeedbackToFreelancer = async () => {
    const {
      projectResponse,
      projectContractDetail,
      totalScore,
      reviewText,
      reasonForEndContract,
      fields,
      feedback,
      emojiFeedback
    } = this.state;
    let contractDetail = this.props.location.state.contractDetail;
    let params = {
      contractId: contractDetail.projectContractId,
      clientId: contractDetail.postUserId,
      individualFreelancerId:
        contractDetail?.userProfile?.individualFreelancerId,
      createdDateTime: "",
      updatedDateTime: "",
      reasonForEnding: reasonForEndContract,
      otherReason: "",
      recommendPercent: fields.recommendPercentage.toString(),
      skillPublicRating: feedback.skillsStars.toString(),
      qualityPublicRating: feedback.qualityOfWorkStars.toString(),
      availabilityPublicRating: feedback.availabilityStars.toString(),
      understandingPublicRating: feedback.understandingTask.toString(),
      realiabilityFeedback: "0",
      
      communicationEmoji:feedback.emojiFeedback,
      feedbackMessage: reviewText,
      totalScore: totalScore.toString(),
    };
    this.setState({ loading: true });
    let reviewResponse = await request(
      ENDPOINT["AddNewFreelancerFeedback"],
      postOptions(params)
    );

    if (reviewResponse.success) {
      notifications.showSuccess(
        "You have successfully added feedback for freelancer"
      );
      this.props.history.push("/my-contracts");
      this.setState({ loading: false });
    } else {
      notifications.showError(
        reviewResponse.message
          ? reviewResponse.message
          : "Something went wrong! try later."
      );
      this.setState({ loading: false });
    }
  };
  handleSubmitFreelancerFeedbackToClient = async () => {
    const {
      projectResponse,
      projectContractDetail,
      totalScore,
      reviewText,
      reasonForEndContract,
      fields,
      feedback,
      emojiFeedback
    } = this.state;
    let contractDetail = this.props.location.state.contractDetail;
    let params = {
      contractId: contractDetail.projectContractId,
      clientId: contractDetail.postUserId,
      individualFreelancerId:
        contractDetail?.userProfile?.individualFreelancerId,
      createdDateTime: "",
      updatedDateTime: "",
      freelancerType: contractDetail?.userProfile?.individualFreelancerId
        ? "Individual"
        : "Organization",
      reasonForEnding: reasonForEndContract,
      otherReason: "",
      recommendPercent: fields.recommendPercentage,
      projectPublicRating: feedback.projectUnderStandStar.toString(),
      qualityPublicRating: feedback.qualityOfWorkStars.toString(),
      availabilityPublicRating: feedback.availabilityStars.toString(),
      reasonablePublicRating: feedback.responsibleStar.toString(),
      feedbackMessage: reviewText,
      communicationEmoji:feedback.emojiFeedback,
      totalScore: totalScore.toString(),
    };
    this.setState({ loading: true });
    let reviewResponse = await request(
      ENDPOINT["AddNewClientFeedback"],
      postOptions(params)
    );

    if (reviewResponse.success) {
      notifications.showSuccess(
        "You have successfully added feedback for client"
      );
      this.props.history.push("/my-contracts");
      this.setState({ loading: false });
    } else {
      notifications.showError(
        reviewResponse.message
          ? reviewResponse.message
          : "Something went wrong! try later."
      );
      this.setState({ loading: false });
    }
  };
  handleSubmitEvaluationForm = async () => {
    if (this.validateEvaluationForm()) {
      await this.submitTheReview();
    }
  };

  validateEvaluationForm = () => {
    const { reasonForEndContract, reviewText, totalScore, errors } = this.state;
    let evaluationErrors = { ...errors };

    if (
      !reasonForEndContract ||
      !reviewText ||
      !totalScore ||
      validateWords(reviewText, 5)
    ) {
      if (!reasonForEndContract) {
        evaluationErrors.endingReason.hasError = true;
        evaluationErrors.endingReason.errorMsg =
          "Please select reason to end the contract";
      } else {
        evaluationErrors.endingReason.hasError = false;
        evaluationErrors.endingReason.errorMsg = "";
      }

      if (!reviewText) {
        evaluationErrors.reviewText.hasError = true;
        evaluationErrors.reviewText.errorMsg = `Please give feedback to the ${this.renderType()}`;
      } else if (validateWords(reviewText, 5)) {
        evaluationErrors.reviewText.hasError = true;
        evaluationErrors.reviewText.errorMsg =
          "Please write at least 5 words in your feedback";
      } else {
        evaluationErrors.reviewText.hasError = false;
        evaluationErrors.reviewText.errorMsg = "";
      }

      if (!totalScore) {
        evaluationErrors.totalScore.hasError = true;
        evaluationErrors.totalScore.errorMsg = `Please give ratings to the ${this.renderType()}`;
      } else {
        evaluationErrors.totalScore.hasError = false;
        evaluationErrors.totalScore.errorMsg = "";
      }
      this.setState({ errors: { ...evaluationErrors } });
      return false;
    } else {
      return true;
    }
  };

  renderError = (type) => {
    const { errors } = this.state;
    return errors[type].hasError === true ? (
      <p className="text-danger">{errors[type].errorMsg}</p>
    ) : null;
  };

  render() {
    const {
      fields,
      isSkeletonLoading,
      projectDetailResponse,
      projectResponse,
      reasonForEndContract,
      errors,
      type,
      feedback,
      loading,
      
    } = this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec evaluation-page">
          <div className="bcknd_container">
            {isSkeletonLoading && (
              <Skeleton count={3} isSkeletonLoading={isSkeletonLoading} />
            )}

            {!isSkeletonLoading && (
              <div className="row">
                <div className="col-lg-2 col-md-12"></div>
                <div className="col-lg-8 col-md-12">
                  <div className="card_box hover_none pfont_14">
                    <div className="customer-evaluation-card-margin">
                      <ProjectCardbox
                        key={`cardProject${1}`}
                        selectedProject={this.state.projectDetailResponse}
                        index={1}
                        disableShadow
                      />
                    </div>

                    <div className="post_form feedbk_box">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label
                              className="green_text feedbk_lbl"
                              style={{ marginLeft: "4px" }}
                            >
                              {" "}
                              Reason for ending contract
                            </label>
                            <div className="">
                              <DropdownList
                                id="reason"
                                name="reason"
                                enableAutoCompleteSearch
                                value={reasonForEndContract}
                                selectItem={(value) => {
                                  this.setState(
                                    { reasonForEndContract: value },
                                  );
                                }}
                                items={endContractReasons}
                              />
                              {this.renderError("endingReason")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="position_rel">
                        <h3 className="evaluation_tab_title">
                          {type === "company"
                            ? "Client feedback to Company"
                            : ""}
                          {type === "freelancer"
                            ? "Client feedback to Individual freelancer"
                            : ""}
                          {type === "client"
                            ? "Individual Freelancer or Company to Client"
                            : ""}
                          {/* Give Feedback to Your {this.renderType()} */}
                        </h3>
                      </div>

                      <div className="feedbk_bar">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-7">
                            <p>
                              How likely are you to recommend this{" "}
                              {this.renderType()} to a friend or a colleague?
                            </p>
                            <div className="progress_bar">
                              <div className="d-flex justify-content-between">
                                <label>Not at all likely</label>
                                <label>Extremely likely</label>
                              </div>
                              <div className="slidecontainer">
                                <input
                                  type="range"
                                  onChange={this.onFieldChange}
                                  name="recommendPercentage"
                                  min="0"
                                  max="100"
                                  value={fields.recommendPercentage}
                                  className="slider"
                                  id="myRange"
                                />
                                <div className="d-flex justify-content-between">
                                  <label>
                                    <span id="demo">
                                      {fields.recommendPercentage}
                                    </span>
                                    %
                                  </label>
                                  <label>100%</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="public_feedbk">
                        <PublicFeedback
                          errors={{ ...errors }}
                          userType={this.renderType()}
                          type={this.state.type}
                          emitToSetTotalScore={(score) =>
                            this.setState({ totalScore: score })
                          }
                          feedback={feedback}
                          handleUpdateFeedBack={this.handleUpdateFeedBack}
                          emitToSetReviewText={(review) =>
                            this.setState({ reviewText: review })
                          }
                        />
                      </div>
                      <div className="evaluation-bottom-area">
                        <p>
                          Ending this contract will permanently lock your{" "}
                          {this.renderType()}'s Work Diary for this project.
                          We'll let your {this.renderType()} know the job is
                          done and send you a final statement for any unpaid
                          work.
                        </p>
                        <div className="save_cancel">
                          <button
                            type="submit"
                            className="btn save_btn"
                            onClick={() => this.handleSubmitEvaluationForm()}
                          >
                            Submit{" "}
                            {loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
                          </button>
                          <button
                            onClick={() =>
                              this.props.history.push("/my-contracts")
                            }
                            type="submit"
                            className="btn cancel_btn"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-12"></div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    organizationReducer: state.organizationReducer.organization,
    userReducer: state.userReducer,
  };
}

export default withRouter(connect(mapStateToProps, null)(Evaluation));

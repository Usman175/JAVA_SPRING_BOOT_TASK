import React, { Component } from "react";
import "./evaluation.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

class PublicFeedback extends Component {
  state = {
    totalScore: 0,
    reviewText: "",
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
    activeFields: [],
  };

  handleStarRatings = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: parseInt(value) });
    this.props.handleUpdateFeedBack(name,parseInt(value) )
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { emitToSetTotalScore } = this.props;
    const {
      skillsStars,
      qualityOfWorkStars,
      availabilityStars,
      understandingTask,
      communicationStars,
      cooperationStars,
      totalScore,
      qualityOfRequirementStar,
      projectUnderStandStar,
      responsibleStar,
      managementStars,
      teamSkillStars}=this.state;

    if (prevState !== this.state) {
      if (prevState.totalScore !== totalScore) {
        emitToSetTotalScore(totalScore);
      }

      if (
        prevState.skillsStars !== skillsStars ||
        prevState.qualityOfWorkStars !== qualityOfWorkStars ||
        prevState.availabilityStars !== availabilityStars ||
        prevState.understandingTask !== understandingTask ||
        prevState.communicationStars !== communicationStars ||
        prevState.cooperationStars !== cooperationStars ||
        prevState.qualityOfRequirementStar !== qualityOfRequirementStar ||
        prevState.projectUnderStandStar !== projectUnderStandStar ||
        prevState.responsibleStar !== responsibleStar ||
        prevState.managementStars !== managementStars ||
        prevState.teamSkillStars !== teamSkillStars 
      ) {
        this.setState({
          totalScore:
            skillsStars +
            qualityOfWorkStars +
            availabilityStars +
            understandingTask +
            communicationStars +
            cooperationStars+
            qualityOfRequirementStar+
            projectUnderStandStar+
            responsibleStar+
            managementStars+
            teamSkillStars
        });
      }
    }
  }

  renderError = (type) => {
    const { errors } = this.props;
    return errors[type].hasError === true ? (
      <p className="text-danger">{errors[type].errorMsg}</p>
    ) : null;
  };
  handleActive = (field) => {
    let newActiveFields = [...this.state.activeFields];
    newActiveFields.push(field);
    this.setState({ activeFields: newActiveFields });
  };
  handleDeActive = (field) => {
    let newActiveFields = [...this.state.activeFields];
    let newElements = newActiveFields.filter((item) => item != field);
    this.setState({ activeFields: newElements });
  };
  render() {
    const { emitToSetReviewText, errors, userType, type } = this.props;
    const { totalScore, emojiFeedback, activeFields } = this.state;
    return (
      <div className="evaluation-page-feedback">
        <label className="green_text feedbk_lbl">Public Feedback</label>

        <p>
          This feedback will be shared on your{" "}
          {type === "client" || type === "company" ? "client" : "freelancer"}'s
          profile only after they've left feedback for you.{" "}
          {this.props.disableExtra && activeFields.includes(type) ? (
            <BootstrapTooltip
              PopperProps={{
                disablePortal: true,
              }}
              arrow
              placement="top"
              title={"Save feedback"}
            >
              <img
                onClick={() => this.handleDeActive(type)}
                className="edit-icon"
                src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
              />
            </BootstrapTooltip>
          ) : this.props.disableExtra ? (
            <BootstrapTooltip
              PopperProps={{
                disablePortal: true,
              }}
              title={"Edit feedback "}
              arrow
              placement="top"
            >
              <img
                onClick={() => this.handleActive(type)}
                className="edit-icon"
                src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
              />
            </BootstrapTooltip>
          ):null}
        </p>
        <div
          style={{ pointerEvents: activeFields.includes(type) ? "" : this.props.disableExtra? "none":"" }}
        >
          {" "}
          {type === "freelancer" && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Skills</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star5"
                  name="skillsStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star5">5 stars</label>
                <input
                  type="radio"
                  id="star4"
                  name="skillsStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star4">4 stars</label>
                <input
                  type="radio"
                  id="star3"
                  name="skillsStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star3">3 stars</label>
                <input
                  type="radio"
                  id="star2"
                  name="skillsStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star2">2 stars</label>
                <input
                  type="radio"
                  id="star1"
                  name="skillsStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star1">1 star</label>
              </div>
            </div>
          )}
          {type === "company" && (
            <div
              hidden={true}
              className="d-flex justify-content-between align-items-center"
            >
              <label>Team Skills</label>
              <div className="rating">
                <input
                  type="radio"
                  id="starTeamSkill5"
                  name="teamSkillStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkill5">5 stars</label>
                <input
                  type="radio"
                  id="starTeamSkill4"
                  name="teamSkillStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkill4">4 stars</label>
                <input
                  type="radio"
                  id="starTeamSkill3"
                  name="teamSkillStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkill3">3 stars</label>
                <input
                  type="radio"
                  id="starTeamSkill2"
                  name="teamSkillStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkill2">2 stars</label>
                <input
                  type="radio"
                  id="starTeamSkill1"
                  name="teamSkillStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkill1">1 star</label>
              </div>
            </div>
          )}
          {type === "client" && (
            <div
              hidden={true}
              className="d-flex justify-content-between align-items-center"
            >
              <label>Understanding the own project</label>
              <div className="rating">
                <input
                  type="radio"
                  id="projectUnderStandStar5"
                  name="projectUnderStandStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStar5">5 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStar4"
                  name="projectUnderStandStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStar4">4 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStar3"
                  name="projectUnderStandStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStar3">3 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStar2"
                  name="projectUnderStandStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStar2">2 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStar1"
                  name="projectUnderStandStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStar1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "company") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Quality of Work</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star10"
                  name="qualityOfWorkStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star10">5 stars</label>
                <input
                  type="radio"
                  id="star9"
                  name="qualityOfWorkStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star9">4 stars</label>
                <input
                  type="radio"
                  id="star8"
                  name="qualityOfWorkStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star8">3 stars</label>
                <input
                  type="radio"
                  id="star7"
                  name="qualityOfWorkStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star7">2 stars</label>
                <input
                  type="radio"
                  id="star6"
                  name="qualityOfWorkStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star6">1 star</label>
              </div>
            </div>
          )}
          {type === "client" && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Quality of Requirements</label>
              <div className="rating">
                <input
                  type="radio"
                  id="qualityOfRequirementStar5"
                  name="qualityOfRequirementStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStar5">5 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStar4"
                  name="qualityOfRequirementStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStar4">4 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStar3"
                  name="qualityOfRequirementStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />

                <label for="qualityOfRequirementStar3">3 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStar2"
                  name="qualityOfRequirementStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStar2">2 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStar1"
                  name="qualityOfRequirementStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStar1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "client") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Availability</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star15"
                  name="availabilityStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star15">5 stars</label>
                <input
                  type="radio"
                  id="star14"
                  name="availabilityStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star14">4 stars</label>
                <input
                  type="radio"
                  id="star13"
                  name="availabilityStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star13">3 stars</label>
                <input
                  type="radio"
                  id="star12"
                  name="availabilityStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star12">2 stars</label>
                <input
                  type="radio"
                  id="star11"
                  name="availabilityStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star11">1 star</label>
              </div>
            </div>
          )}
          {type === "company" && (
            <div
              hidden={true}
              className="d-flex justify-content-between align-items-center"
            >
              <label>Management</label>
              <div className="rating">
                <input
                  type="radio"
                  id="managementStars5"
                  name="managementStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStars5">5 stars</label>
                <input
                  type="radio"
                  id="managementStars4"
                  name="managementStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStars4">4 stars</label>
                <input
                  type="radio"
                  id="managementStars3"
                  name="managementStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStars3">3 stars</label>
                <input
                  type="radio"
                  id="managementStars2"
                  name="managementStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStars2">2 stars</label>
                <input
                  type="radio"
                  id="managementStars1"
                  name="managementStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStars1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "company") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Understanding task</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star16"
                  name="understandingTask"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star16">5 stars</label>
                <input
                  type="radio"
                  id="star17"
                  name="understandingTask"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star17">4 stars</label>
                <input
                  type="radio"
                  id="star18"
                  name="understandingTask"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star18">3 stars</label>
                <input
                  type="radio"
                  id="star19"
                  name="understandingTask"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star19">2 stars</label>
                <input
                  type="radio"
                  id="star20"
                  name="understandingTask"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star20">1 star</label>
              </div>
            </div>
          )}
          {type === "client" && (
            <div
              hidden={true}
              className="d-flex justify-content-between align-items-center"
            >
              <label>Reasonable Deadline</label>
              <div className="rating">
                <input
                  type="radio"
                  id="responsibleStar5"
                  name="responsibleStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStar5">5 stars</label>
                <input
                  type="radio"
                  id="responsibleStar4"
                  name="responsibleStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStar4">4 stars</label>
                <input
                  type="radio"
                  id="responsibleStar3"
                  name="responsibleStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStar3">3 stars</label>
                <input
                  type="radio"
                  id="responsibleStar2"
                  name="responsibleStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStar2">2 stars</label>
                <input
                  type="radio"
                  id="responsibleStar1"
                  name="responsibleStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStar1">1 star</label>
              </div>
            </div>
          )}
        </div>
        <div className="readability-communication-area">
          <p>
            Readability, Communication and Responsiveness{" "}
            {this.props.disableExtra &&
            activeFields.includes(`${type}Communication`) ? (
              <BootstrapTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                arrow
                placement="top"
                title={"Save feedback"}
              >
                <img
                  onClick={() => this.handleDeActive(`${type}Communication`)}
                  className="edit-icon"
                  src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                />
              </BootstrapTooltip>
            ) : this.props.disableExtra? (
              <BootstrapTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                title={"Edit feedback "}
                arrow
                placement="top"
              >
                <img
                  onClick={() => this.handleActive(`${type}Communication`)}
                  className="edit-icon"
                  src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                />
              </BootstrapTooltip>
            ):null}{" "}
          </p>
          <div
            style={{
              pointerEvents: activeFields.includes(`${type}Communication`)
                ? ""
                :this.props.disableExtra? "none":"",
            }}
            className="feedback-emoji"
          >
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "gestureEmojy" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "gestureEmojy" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "gestureEmojy") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "gestureEmojy" });
                    this.props.handleUpdateFeedBack('emojiFeedback','gestureEmojy')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/gestureEmojy.svg"
              />
            </div>
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "heartEmoji" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "heartEmoji" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "heartEmoji") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "heartEmoji" });
                    this.props.handleUpdateFeedBack('emojiFeedback','heartEmoji')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/heartEmoji.svg"
              />
            </div>
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "smileEmoji" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "smileEmoji" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "smileEmoji") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "smileEmoji" });
                    this.props.handleUpdateFeedBack('emojiFeedback','smileEmoji')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/smileEmoji.svg"
              />
            </div>
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "wowEmoji" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "wowEmoji" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "wowEmoji") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "wowEmoji" });
                    this.props.handleUpdateFeedBack('emojiFeedback','wowEmoji')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/wowEmoji.svg"
              />
            </div>
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "upsetEmoji" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "upsetEmoji" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "upsetEmoji") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "upsetEmoji" });
                    this.props.handleUpdateFeedBack('emojiFeedback','upsetEmoji')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/upsetEmoji.svg"
              />
            </div>
            <div
              style={{
                display:
                  this.props.disableExtra &&
                  emojiFeedback != "angryEmoji" &&
                  !activeFields.includes(`${type}Communication`)
                    ? "none"
                    : "",
              }}
              className="emoji-item"
            >
              <img
                className={emojiFeedback === "angryEmoji" ? "active" : ""}
                onClick={() => {
                  if (emojiFeedback === "angryEmoji") {
                    this.setState({ emojiFeedback: "" });
                    this.props.handleUpdateFeedBack('emojiFeedback','')
                  } else {
                    this.setState({ emojiFeedback: "angryEmoji" });
                    this.props.handleUpdateFeedBack('emojiFeedback','angryEmoji')
                  }
                }}
                src="https://dhihitu47nqhv.cloudfront.net/icons/angryEmojy.svg"
              />
            </div>
          </div>
        </div>

        {this.renderError("totalScore")}

        <div hidden={this.props.disableExtra} className="total_score">
          <label className="feedbk_lbl">
            Total Score: {totalScore.toFixed(2)}
          </label>
          <p>
            Share your experience with this {userType} to the Bearole community
          </p>
          <div className="milestone_form">
            <textarea
              className="text-area-custom"
              id="exampleFormControlTextareaFeedback"
              rows="8"
              onChange={(e) => {
                this.setState({ reviewText: e.target.value });
                emitToSetReviewText(e.target.value);
              }}
            ></textarea>
            {this.renderError("reviewText")}
          </div>
        </div>
      </div>
    );
  }
}

export default PublicFeedback;

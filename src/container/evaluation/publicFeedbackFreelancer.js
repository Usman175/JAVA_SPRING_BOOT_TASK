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

class PublicFeedbackFreelancer extends Component {
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
    } = this.state;

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
        prevState.cooperationStars !== cooperationStars
      ) {
        this.setState({
          totalScore:
            skillsStars +
            qualityOfWorkStars +
            availabilityStars +
            understandingTask +
            communicationStars +
            cooperationStars,
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
          This feedback will be shared on your {type}'s profile only after
          they've left feedback for you.{" "}
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
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                }
              />
            </BootstrapTooltip>
          ) : (
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
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                }
              />
            </BootstrapTooltip>
          )}
        </p>
        <div
          style={{ pointerEvents: activeFields.includes(type) ? "" : "none" }}
        >
          {" "}
          {type === "freelancer" && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Skills</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star5Skills"
                  name="skillsStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star5Skills">5 stars</label>
                <input
                  type="radio"
                  id="star4Skills"
                  name="skillsStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star4Skills">4 stars</label>
                <input
                  type="radio"
                  id="star3Skills"
                  name="skillsStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star3Skills">3 stars</label>
                <input
                  type="radio"
                  id="star2Skills"
                  name="skillsStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star2Skills">2 stars</label>
                <input
                  type="radio"
                  id="star1Skills"
                  name="skillsStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star1Skills">1 star</label>
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
                  id="starTeamSkills5"
                  name="teamSkillStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkills5">5 stars</label>
                <input
                  type="radio"
                  id="starTeamSkills4"
                  name="teamSkillStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkills4">4 stars</label>
                <input
                  type="radio"
                  id="starTeamSkills3"
                  name="teamSkillStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkills3">3 stars</label>
                <input
                  type="radio"
                  id="starTeamSkills2"
                  name="teamSkillStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkills2">2 stars</label>
                <input
                  type="radio"
                  id="starTeamSkills1"
                  name="teamSkillStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="starTeamSkills1">1 star</label>
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
                  id="projectUnderStandStars5"
                  name="projectUnderStandStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStars5">5 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStars4"
                  name="projectUnderStandStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStars4">4 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStars3"
                  name="projectUnderStandStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStars3">3 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStars2"
                  name="projectUnderStandStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStars2">2 stars</label>
                <input
                  type="radio"
                  id="projectUnderStandStars1"
                  name="projectUnderStandStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="projectUnderStandStars1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "company") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Quality of Work</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star10Quality"
                  name="qualityOfWorkStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star10Quality">5 stars</label>
                <input
                  type="radio"
                  id="star9Quality"
                  name="qualityOfWorkStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star9Quality">4 stars</label>
                <input
                  type="radio"
                  id="star8Quality"
                  name="qualityOfWorkStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star8Quality">3 stars</label>
                <input
                  type="radio"
                  id="star7Quality"
                  name="qualityOfWorkStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star7Quality">2 stars</label>
                <input
                  type="radio"
                  id="star6Quality"
                  name="qualityOfWorkStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star6Quality">1 star</label>
              </div>
            </div>
          )}
          {type === "client" && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Quality of Requirements</label>
              <div className="rating">
                <input
                  type="radio"
                  id="qualityOfRequirementStars5"
                  name="qualityOfRequirementStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStars5">5 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStars4"
                  name="qualityOfRequirementStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStars4">4 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStars3"
                  name="qualityOfRequirementStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />

                <label for="qualityOfRequirementStars3">3 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStars2"
                  name="qualityOfRequirementStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStars2">2 stars</label>
                <input
                  type="radio"
                  id="qualityOfRequirementStars1"
                  name="qualityOfRequirementStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="qualityOfRequirementStars1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "client") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Availability</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star15Availability"
                  name="availabilityStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star15Availability">5 stars</label>
                <input
                  type="radio"
                  id="star14Availability"
                  name="availabilityStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star14Availability">4 stars</label>
                <input
                  type="radio"
                  id="star13Availability"
                  name="availabilityStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star13Availability">3 stars</label>
                <input
                  type="radio"
                  id="star12Availability"
                  name="availabilityStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star12Availability">2 stars</label>
                <input
                  type="radio"
                  id="star11Availability"
                  name="availabilityStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star11Availability">1 star</label>
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
                  id="managementStar5"
                  name="managementStars"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStar5">5 stars</label>
                <input
                  type="radio"
                  id="managementStar4"
                  name="managementStars"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStar4">4 stars</label>
                <input
                  type="radio"
                  id="managementStar3"
                  name="managementStars"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStar3">3 stars</label>
                <input
                  type="radio"
                  id="managementStars2"
                  name="managementStars"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStar2">2 stars</label>
                <input
                  type="radio"
                  id="managementStars1"
                  name="managementStars"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="managementStar1">1 star</label>
              </div>
            </div>
          )}
          {(type === "freelancer" || type === "company") && (
            <div className="d-flex justify-content-between align-items-center">
              <label>Understanding task</label>
              <div className="rating">
                <input
                  type="radio"
                  id="star16UnderstandingTask"
                  name="understandingTask"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star16UnderstandingTask">5 stars</label>
                <input
                  type="radio"
                  id="star17UnderstandingTask"
                  name="understandingTask"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star17UnderstandingTask">4 stars</label>
                <input
                  type="radio"
                  id="star18UnderstandingTask"
                  name="understandingTask"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star18UnderstandingTask">3 stars</label>
                <input
                  type="radio"
                  id="star19UnderstandingTask"
                  name="understandingTask"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star19UnderstandingTask">2 stars</label>
                <input
                  type="radio"
                  id="star20UnderstandingTask"
                  name="understandingTask"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="star20UnderstandingTask">1 star</label>
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
                  id="responsibleStars5"
                  name="responsibleStar"
                  value="5"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStars5">5 stars</label>
                <input
                  type="radio"
                  id="responsibleStars4"
                  name="responsibleStar"
                  value="4"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStars4">4 stars</label>
                <input
                  type="radio"
                  id="responsibleStars3"
                  name="responsibleStar"
                  value="3"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStars3">3 stars</label>
                <input
                  type="radio"
                  id="responsibleStars2"
                  name="responsibleStar"
                  value="2"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStars2">2 stars</label>
                <input
                  type="radio"
                  id="responsibleStars1"
                  name="responsibleStar"
                  value="1"
                  onChange={(e) => {
                    this.handleStarRatings(e);
                  }}
                />
                <label for="responsibleStars1">1 star</label>
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
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                  }
                />
              </BootstrapTooltip>
            ) : (
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
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                  }
                />
              </BootstrapTooltip>
            )}
          </p>
          <div
            style={{
              pointerEvents: activeFields.includes(`${type}Communication`)
                ? ""
                : "none",
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
                  } else {
                    this.setState({ emojiFeedback: "gestureEmojy" });
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
                  } else {
                    this.setState({ emojiFeedback: "heartEmoji" });
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
                  } else {
                    this.setState({ emojiFeedback: "smileEmoji" });
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
                  } else {
                    this.setState({ emojiFeedback: "wowEmoji" });
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
                  } else {
                    this.setState({ emojiFeedback: "upsetEmoji" });
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
                  } else {
                    this.setState({ emojiFeedback: "angryEmoji" });
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

export default PublicFeedbackFreelancer;

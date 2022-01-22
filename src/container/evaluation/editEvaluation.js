import React, { useState } from "react";
import SubHeader from "../../components/subHeader/index";
import "./evaluation.scss";
import Heading from "../../components/postProject/heading";
import { useSelector } from "react-redux";
import PublicFeedback from "./publicFeedback";
import PublicFeedbackFreelancer from "./publicFeedbackFreelancer";
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

function EditEvaluation(props) {
  const [type, setType] = useState(
    new URLSearchParams(props.location.search).get("type") || "freelancer"
  );
  const [review, setReview] = useState("");
  const [activeFields, setActiveFields] = useState([]);
  const [errors, setErrors] = useState(
    ["endingReason", "totalScore", "reviewText"].reduce((current, item) => {
      current[item] = {};
      current[item]["hasError"] = false;
      current[item]["errorMsg"] = "";
      return current;
    }, {})
  );
  const [score, setScore] = useState(0);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const renderType = () => {
    return sessionStorage.getItem("userType") == "Freelancer"
      ? "Client"
      : "Freelancer";
  };

  const handleActive = (field) => {
    let newActiveFields = [...activeFields];
    newActiveFields.push(field);
    setActiveFields(newActiveFields);
  };
  const handleDeActive = (field) => {
    let newActiveFields = [...activeFields];
    let newElements = newActiveFields.filter((item) => item != field);
    setActiveFields(newElements);
  };
  return (
    <>
      <SubHeader />
      <div className="bcknd_container">
        <div className="row">
          <div className="col-lg-2 col-md-12"></div>
          <div className="col-lg-8 col-md-12">
            <div className="card_box edit-evaluation-page">
              <Heading
                heading={"Feedback"}
                icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/emojiEmotions.png"}
                color="#333333"
                fontSize="26px"
                fontWeight="600"
                fontFamily="Raleway"
              />
              <h4>Ref #EMS23323</h4>
              <div className="profile-area">
                <img src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png" />
                <div>
                  <h6>
                    <span>
                      {type === "client" || type === "company"
                        ? "client"
                        : "freelancer"}
                    </span>
                    : Sonny Cho
                  </h6>
                  <p>23rd Feb 2021</p>
                </div>
              </div>

              <div className="public_feedbk">
                <PublicFeedback
                  errors={{ ...errors }}
                  userType={renderType()}
                  type={type}
                  emitToSetTotalScore={(score) => setScore(score)}
                  emitToSetReviewText={(review) => setReview(review)}
                  disableExtra={true}
                />
              </div>
              <div className="remarks-area">
                {activeFields.includes(type) ? (
                  <input
                    type="text"
                    defaultValue="He worked terrible!!!!!!!!!!!!!!!!!!!!!!!"
                  />
                ) : (
                  <p>He worked terrible!!!!!!!!!!!!!!!!!!!!!!!</p>
                )}
                {activeFields.includes(type) ? (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top"
                    title={"Save remarks"}
                  >
                    <img
                      onClick={() => handleDeActive(type)}
                      className="edit-icon"
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    title={"Edit remarks "}
                    arrow
                    placement="top"
                  >
                    <img
                      onClick={() => handleActive(type)}
                      className="edit-icon"
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                    />
                  </BootstrapTooltip>
                )}
              </div>
              <br />
              <div className="profile-area">
                <img src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png" />
                <div>
                  <h6>
                    <span>
                      {type === "client"
                        ? "freelancer"
                        : type === "company"
                        ? "company"
                        : type === "freelancer"
                        ? "client"
                        : ""}
                    </span>
                    : Sonny Cho
                  </h6>
                  <p>23rd Feb 2021</p>
                </div>
              </div>

              <div className="public_feedbk">
                <PublicFeedbackFreelancer
                  errors={{ ...errors }}
                  userType={renderType()}
                  type={
                    type === "client"
                      ? "freelancer"
                      : type === "company"
                      ? "company"
                      : type === "freelancer"
                      ? "client"
                      : ""
                  }
                  emitToSetTotalScore={(score) => setScore(score)}
                  emitToSetReviewText={(review) => setReview(review)}
                  disableExtra={true}
                />
              </div>
              <div className="remarks-area">
                {activeFields.includes(
                  type === "client" ? "freelancer" : "client"
                ) ? (
                  <input
                    type="text"
                    defaultValue="He worked terrible!!!!!!!!!!!!!!!!!!!!!!!"
                  />
                ) : (
                  <p>He worked terrible!!!!!!!!!!!!!!!!!!!!!!!</p>
                )}
                {activeFields.includes(
                  type === "client" ? "freelancer" : "client"
                ) ? (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top"
                    title={"Save remarks"}
                  >
                    <img
                      onClick={() =>
                        handleDeActive(
                          type === "client" ? "freelancer" : "client"
                        )
                      }
                      className="edit-icon"
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    title={"Edit remarks "}
                    arrow
                    placement="top"
                  >
                    <img
                      onClick={() =>
                        handleActive(
                          type === "client" ? "freelancer" : "client"
                        )
                      }
                      className="edit-icon"
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                    />
                  </BootstrapTooltip>
                )}
              </div>
              <br />
              <div className="bottom-area-evaluation">
                <div>
                  <p>
                    To reflect content changes, the both parties must confirm
                  </p>
                  <button>Confirm</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-12"></div>
        </div>
      </div>
    </>
  );
}

export default EditEvaluation;

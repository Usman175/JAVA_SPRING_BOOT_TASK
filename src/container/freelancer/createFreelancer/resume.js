import React from "react";
import Heading from "../../../components/freelancerCreation/heading";
import "./createFreelancer.scss";
function Resume(props) {
  return (
    <section className="card_sec" style={{ padding: "0px" }}>
      <div className="resume-heading-icon">
        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/resume.png"} />
        <h3>Resume Registration (Optional)</h3>
      </div>
      <br />
      <div className="resume-add-confirmation-area">
        <h5>
          This is optional section to submit your CV, your personal information
          will be hidden but only to companies HR or Headhunters. You may skip
          the section for now.
        </h5>
        <div className="resume-add-confirmation-box-selection">
          <div
            className="resume-add-confirmation-box-register"
            onClick={() => {
              props.handleNext("ResumeRegister");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
              localStorage.setItem(
                "IndividaulFreelancerRegistrationInfo",
                JSON.stringify({
                  step: "ResumeRegister",
                  userId: props.userId,
                })
              );
            }}
          >
            <center>
              <img
                draggable={false}
                src={
                  "https://dhihitu47nqhv.cloudfront.net/icons/resume_check.svg"
                }
              />
            </center>
            <h6> Register My Resume</h6>
          </div>
          <div
            className="resume-add-confirmation-box-skip"
            onClick={() => {
              props.handleNext("FreelancerProfileConfirmation");
              localStorage.setItem(
                "IndividaulFreelancerRegistrationInfo",
                JSON.stringify({
                  step: "FreelancerProfileConfirmation",
                  userId: props.userId,
                })
              );
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
            }}
          >
            <center>
              <img
                draggable={false}
                src={"https://dhihitu47nqhv.cloudfront.net/icons/bus_wait.svg"}
              />
            </center>
            <h6> Skip this section for now</h6>
          </div>
        </div>
        <div className="create-freelancer-bottom-steps">
          <button
            onClick={() => {
              props.handleBack("SkillAndBusinessStep");
            }}
            className="create-freelancer-bottom-steps-back"
          >
            Back
          </button>
          <button
            onClick={() => {
              props.handleNext("FreelancerProfileConfirmation");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
              localStorage.setItem(
                "IndividaulFreelancerRegistrationInfo",
                JSON.stringify({
                  step: "FreelancerProfileConfirmation",
                  userId: props.userId,
                })
              );
            }}
            className="create-freelancer-bottom-steps-skip"
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}

export default Resume;

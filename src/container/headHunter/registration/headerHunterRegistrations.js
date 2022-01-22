import React from "react";
import Heading from "../../../components/freelancerCreation/heading";
import "./headHunter.scss";
function HeaderHunterRegistration(props) {
  return (
    <section className="card_sec" style={{ padding: "0px" }}>
      <Heading
        heading={"Register Headhunting Contract "}
        step={"5"}
        shadow={true}
      />
      <div className="resume-add-confirmation-area">
        <h5>
          You may start using Simplywithus.net with bearole clients. If you want
          to add more information.
        </h5>
        <div className="resume-add-confirmation-box-selection">
          <div
            className="company-add-confirmation-box-register"
            onClick={() => {
              props.handleNext("ConfirmationPage");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
            }}
          >
            <center>
              <img
                draggable={false}
                src={
                  "https://dhihitu47nqhv.cloudfront.net/icons/notepad_check.svg"
                }
              />
            </center>
            <h6> Electronic Contract</h6>
          </div>
          <div
            className="resume-add-confirmation-box-skip"
            onClick={() => {
              props.handleNext("ConfirmationPage");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
            }}
          >
            <center>
              <img
                draggable={false}
                src={
                  "https://dhihitu47nqhv.cloudfront.net/icons/note_pen_guy.svg"
                }
              />
            </center>
            <h6> Paper/Manual Contract</h6>
          </div>
        </div>
        <div className="create-freelancer-bottom-steps">
          <button
            onClick={() => {
              props.handleBack("Invitation");
            }}
            className="create-freelancer-bottom-steps-back"
          >
            Back
          </button>
          <button
            onClick={() => {
              props.handleNext("ConfirmationPage");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
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

export default HeaderHunterRegistration;

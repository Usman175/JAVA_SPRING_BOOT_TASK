import React, { useState, useEffect } from "react";
import FreelancerProfile from "./profileInfoRegistration";
import SkillAndBusinessStep from "./businessScopeSkills";
import Resume from "./resume";
import ConfirmationPage from "./confirmationPage";
import ResumeRegister from "./resumeRegister";
import FreelancerProfileConfirmation from "./userProfileConfirmation";
import {useSelector} from "react-redux";

function CreateFreelancer(props) {
  const [step, setStep] = useState("userProfile");
  const [userId, setUserId] = useState("");
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);
  const [printable, setPrintable] = useState(false);
  const handleNext = (value, userId, isPrintable) => {
    setStep(value);
    if (userId) {
      setUserId(userId);
    }
    if (isPrintable) {
      setPrintable(true);
    }
  };
  const handleBack = (value) => {
    setStep(value);
  };
  useEffect(() => {
    if (localStorage.IndividaulFreelancerRegistrationInfo) {
      setStep(
        JSON.parse(localStorage.IndividaulFreelancerRegistrationInfo).step
      );
      setUserId(
        JSON.parse(localStorage.IndividaulFreelancerRegistrationInfo).userId
      );
    }
  }, []);
  return (
    <section className="card_sec">
      <div
        hidden={step === "FreelancerProfileConfirmation"}
        className="card_reg_header"
      >
        <div className="bcknd_container client-regisration-top-heading">
          <div className="row">
          <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-8">
              <h1>
                {
                  new URLSearchParams(props.location.search).get(
                    "type"
                  )==="update"?'Update Freelancer Profile':languageType.FREELANCER_REGISTRATION
                }
              </h1>
              <p>
                {languageType.FREELANCER_REGISTRATION_EXPLAIN}
              </p>
            </div>
            <div className="col-12 col-md-2"></div>
          </div>
        </div>
      </div>
      <div
        hidden={step === "FreelancerProfileConfirmation" ? true : false}
        className="bcknd_container"
      >
        <div className="row">
          <div className="col-12 col-lg-2 col-md-0"></div>
          <div className="col-12 col-lg-8 col-md-12" style={{ marginTop: "0px" }}>
            <div className="project_post work_card user_profile">
              {step === "userProfile" ? (
                <FreelancerProfile
                  userId={userId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "SkillAndBusinessStep" ? (
                <SkillAndBusinessStep
                  userId={userId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "Resume" ? (
                <Resume
                  userId={userId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "ConfirmationPage" ? (
                <ConfirmationPage
                  handleNext={handleNext}
                  handleBack={handleBack}
                  userId={userId}
                  {...props}
                />
              ) : null}
              {step === "ResumeRegister" ? (
                <ResumeRegister
                  printable={printable}
                  userId={userId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
      {step === "FreelancerProfileConfirmation" ? (
        <FreelancerProfileConfirmation
          userId={userId}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ) : null}
    </section>
  );
}

export default CreateFreelancer;

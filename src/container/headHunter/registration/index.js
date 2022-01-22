import React, { useState, useEffect } from "react";
import RightBottom from "../../../components/rightbar/rightBottom";
import RightTop from "../../../components/rightbar/rightTop";
import HeadHunterProfile from "./headHunterProfileRegister";
import HeaderHunterRegistration from "./headerHunterRegistrations";
import Invitation from "./invitation";
import ConfirmationPage from "./confirmationPage";
import ConditionSetup from "./conditionSetup";
import "./headHunter.scss";
import CreateFreelancerBasicInfo from "./createFreelancerBasicInfo";
import {useSelector} from "react-redux";
function HeadHunterRegistration(props) {
  const [step, setStep] = useState("ConditionSetup");  // ConditionSetup
  const [headhunterId, setHeadhunterId] = useState("");
  const handleNext = (value) => {
    setStep(value);
  };
  const handleBack = (value) => {
    setStep(value);
  };
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
  );

  useEffect(() => {
    if (localStorage.headhunterRegistrationInfo) {
      setStep(JSON.parse(localStorage.headhunterRegistrationInfo).step);
      setHeadhunterId(
        JSON.parse(localStorage.headhunterRegistrationInfo).headhunterId
      );
    }
  }, []);

  return (
    <section className="card_sec">
      <div hidden={step != "HeadHunterProfile"} className="card_reg_header">
        <div className="bcknd_container client-regisration-top-heading">
          <div className="row">
            <div className="col-lg-6">
              <h1>{languageType.HEADHUNTER_REGISTRATION}</h1>
              <p>
                {languageType.HEADHUNTER_REGISTRATION_EXPLAIN}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bcknd_container">
        <div className="row">
        
          <div className="col-lg-9 col-md-12 offset-md-1" style={{ marginTop: "0px" }}>
            <div className="project_post work_card user_profile">
              {step === "HeadHunterProfile" ? (
                <HeadHunterProfile
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "Invitation" ? (
                <Invitation handleNext={handleNext} handleBack={handleBack} />
              ) : null}
              {step === "HeaderHunterRegistration" ? (
                <HeaderHunterRegistration
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "ConfirmationPage" ? (
                <ConfirmationPage
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "ConditionSetup" ? (
                <ConditionSetup
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
              {step === "CreateFreelancerBasicInfo" ? (
                <CreateFreelancerBasicInfo
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default HeadHunterRegistration;

import React, { useState, useEffect } from "react";
import CompanyProfile from "./organizationProfile";
import Invitation from "./invitation";
import ConfirmationPage from "./confirmationPage";
import ConfirmationStep from "./organizationConfirmation";
import { useSelector } from "react-redux";

function OrganizationRegistration(props) {
  const [step, setStep] = useState("userProfile");
  const [CompanyId, setCompanyId] = useState("");
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const handleNext = (value, organizationId) => {
    setStep(value);
    if (organizationId) {
      setCompanyId(organizationId);
    }
  };
  const handleBack = (value) => {
    setStep(value);
  };

  useEffect(() => {
    let isMounted = true;
    if (localStorage.CompanyRegistrationInfo) {
      setStep(JSON.parse(localStorage.CompanyRegistrationInfo).step);
      // setStep("CreateFreelancerBasicInfo")
      setCompanyId(
        JSON.parse(localStorage.CompanyRegistrationInfo).organizationId
      );
      // console.log(JSON.parse(localStorage.IndividaulFreelancerRegistrationInfo).userId,"this.props.userId")
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="card_sec">
      <div hidden={step === "ConfirmationStep"} className="card_reg_header">
        <div className="bcknd_container client-regisration-top-heading">
          <div className="row">
            <div className="col-12 col-md-1 col-lg-2"></div>
            <div className="col-12 col-md-10 col-lg-8">
              <h1>{languageType.COMPANY_REGIST}</h1>
              <p>
                {languageType.COMPANY_REGISTRATION_EXPLAIN}
              </p>
            </div>
            <div className="col-12 col-md-1 col-lg-2"></div>
          </div>
        </div>
      </div>
      <div
        hidden={step === "ConfirmationStep" ? true : false}
        className="bcknd_container"
      >
        <div className="row">
          <div className="col-12 col-md-0 col-lg-2"></div>
          <div
            className="col-12 col-md-12 col-lg-8"
            style={{ marginTop: "0px" }}
          >
            <div className="project_post work_card user_profile">
              {step === "userProfile" ? (
                <CompanyProfile
                  CompanyId={CompanyId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              ) : null}
              {/*  thid id old component we not using these components  */}
              {/* {step === "Invitation" ? (
                <Invitation
                  CompanyId={CompanyId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              ) : null} */}
              {step === "ConfirmationPage" ? (
                <ConfirmationPage
                  CompanyId={CompanyId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
            </div>
          </div>
          <div className="col-12 col-md-1 col-lg-2"></div>
        </div>
      </div>
      {step === "ConfirmationStep" ? (
        <ConfirmationStep
          CompanyId={CompanyId}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ) : null}
      {/* ConfirmationStep */}
    </section>
  );
}

export default OrganizationRegistration;

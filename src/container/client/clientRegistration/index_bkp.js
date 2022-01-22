import React, { useState, useEffect } from "react";
import RightBottom from "../../../components/rightbar/RightBottom";
import RightTop from "../../../components/rightbar/RightTop";
import ClientRegistrationStep from "./ClientRegistration";
import ConfirmationStep from "./clientConfirmation";
import ConfirmationPage from "./confirmationPage";
function ClientRegistration(props) {
  const [step, setStep] = useState("ClientRegistrationStep");
  const [clientId, setClientId] = useState("");
  const handleNext = (value, clientId) => {
    setStep(value);
    if (clientId) {
      setClientId(clientId);
    }
  };
  const handleBack = (value) => {
    setStep(value);
  };

  useEffect(() => {
    let isMounted = true;
    if (localStorage.clientRegistrationInfo) {
      setStep(JSON.parse(localStorage.clientRegistrationInfo).step);
      setClientId(JSON.parse(localStorage.clientRegistrationInfo).clientId);
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="card_sec">
      <div
        hidden={step === "ConfirmationStep" ? true : false}
        className="bcknd_container"
      >
        <div className="row">
          <div className="col-lg-9 col-md-12" style={{ marginTop: "0px" }}>
            <div className="project_post work_card user_profile">
              {step === "ClientRegistrationStep" ? (
                <ClientRegistrationStep
                  clientId={clientId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}

              {step === "ConfirmationPage" ? (
                <ConfirmationPage
                  clientId={clientId}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  {...props}
                />
              ) : null}
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <RightTop />
            <RightBottom />
          </div>
        </div>
      </div>
      {step === "ConfirmationStep" ? (
        <ConfirmationStep
          clientId={clientId}
          handleNext={handleNext}
          handleBack={handleBack}
          {...props}
        />
      ) : null}
      {/* ConfirmationStep */}
    </section>
  );
}

export default ClientRegistration;

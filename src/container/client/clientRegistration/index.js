import React, { useState,useEffect } from "react";
import RightBottom from "../../../components/rightbar/rightBottom";
import RightTop from "../../../components/rightbar/rightTop";
import ClientRegistrationStep from './clientRegistration'
import ConfirmationStep from './clientConfirmation'
import ConfirmationPage from './confirmationPage'
import './clientRegistration.scss'
import {useSelector} from "react-redux";
function ClientRegistration(props) {
  const [step, setStep] = useState("ClientRegistrationStep");
  const [clientId, setClientId] = useState('')
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);
  const handleNext=(value,clientId)=>{
    setStep(value)
    if(clientId){
      setClientId(clientId)
    }
  }
  const handleBack=(value)=>{
    setStep(value)
  }


  useEffect(()=>{
    let isMounted = true; 
    if(localStorage.clientRegistrationInfo){
      setStep(JSON.parse(localStorage.clientRegistrationInfo).step)
      setClientId(JSON.parse(localStorage.clientRegistrationInfo).clientId)
    }

    return () => { isMounted = false };
    },[])
  return (
    <section className="card_sec">
      <div hidden={step != "ClientRegistrationStep" } className="card_reg_header">
        <div className="bcknd_container client-regisration-top-heading">
          <div className="row">
          <div className="col-lg-1">
            </div>
            <div className="col-lg-6">
              <h1>{languageType.CLIENT_REGISTRATION}</h1>
              <p>{languageType.CLIENT_REGISTRATION_EXPLAIN}</p>
            </div>
          </div>
        </div>
      </div>
      <div hidden={step==="ConfirmationStep"?true:false} className="bcknd_container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-12" style={{ marginTop: "0px" }}>
              <div className="project_post work_card user_profile">
              {step === "ClientRegistrationStep" ? <ClientRegistrationStep clientId={clientId} handleNext={handleNext} handleBack={handleBack} {...props} /> : null}
        
                {step === "ConfirmationPage" ? <ConfirmationPage  clientId={clientId} handleNext={handleNext} handleBack={handleBack} {...props} /> : null}
          </div>
          </div>
        </div>
      </div>
      {step === "ConfirmationStep" ? <ConfirmationStep clientId={clientId} handleNext={handleNext} handleBack={handleBack} {...props} /> : null}
      {/* ConfirmationStep */}
    </section>
  );
}

export default ClientRegistration;

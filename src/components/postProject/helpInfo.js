import React from "react";
import { JungleModal } from "../modals/jungleModal";
import { NDABody } from "../modals/NDAModalContent";
import SearchAssistantModalContent from '../modals/searchAssitantModalContent'
import ITExpertModalContent from '../modals/iTExpertModalContent'
import { connect } from "react-redux";
import "./postProject.scss";
import { useDispatch } from "react-redux";
import {
  projectPost_updateSelectedServices as updateServices,
} from "../../store/action/Project/projectActions";



const HelpInfo = ({
  languageType,
  isNeededNDA,
  isNeededSearchAssistant,
  isNeededUrgent,
  onFieldChange,
  setSign,
  sign,
  services,
  projectPost
},...props) => {
  let dispatch=useDispatch()
  return (
    <div className="help_box">
      <h6>
        {languageType.EXTRA_SERVICES}
        <div className="step-heading-shadow"></div>
      </h6>
      <div className="d-flex align-items-center justify-content-between">
       
        <JungleModal
          dialogClassName="jungle-modal"
          contentClassName="jungle-modal-content lg"
          customClose
          OpenButton={({ handleClick }) => (
            <>
             <div   onClick={handleClick} className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customcheck1"
            onClick={handleClick}
            checked={projectPost.selectedServices.find((service)=>service.subCategory==="Boost visibility")}
          />
          <label className="custom-control-label" htmlFor="customcheck0">
            <span>
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/search-assistant.svg"
                alt=""
              />
            </span>
            {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_SUBTITLE}
          </label>
        </div>
        <a
              title="View Search Assistant"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              {languageType.VIEW_MORE}
            </a>
            </>
         
          )}
          Body={(propsData)=>(<SearchAssistantModalContent onFieldChange={onFieldChange} services={services} {...propsData} {...props} />)}
          title= {languageType.SEARCH_ASSISTANT}
          size="lg"
          nextModalClass="assistant-boost-visibility-wrapper"
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customcheck2"
            checked={isNeededNDA}
            onChange={(e) =>{
              onFieldChange("isNeededNDA", e.target.checked)
                }
            } 
          />
          <label className="custom-control-label" htmlFor="customcheck2">
            <span>
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/nda.svg"
                alt=""
              />
            </span>
            {languageType.NDA_TEXT}
          </label>
        </div>
        <JungleModal
          dialogClassName="jungle-modal"
          contentClassName="jungle-modal-content lg"
          customClose
          OpenButton={({ handleClick }) => (
            <a
              title="View Search Assistant"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              {languageType.VIEW_MORE}
            </a>
          )}
          Body={NDABody}
          sign={sign}
          setSign={setSign}
          title={"Non Disclosure Agreement"}
          languageType={languageType}
          size="lg"
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div hidden={true}  className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customcheck3"
            checked={isNeededUrgent}
            onChange={(e) => onFieldChange("isNeededUrgent", e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="customcheck3">
            <span>
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/urgent.svg"
                alt=""
              />
            </span>
            {languageType.IT_EXPERT}
          </label>
        </div>
        <JungleModal
          dialogClassName="jungle-modal"
          contentClassName="jungle-modal-content lg"
          customClose
          OpenButton={({ handleClick }) => (
            <a
              title="View Search Assistant"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
              hidden={true}   
            >
              {languageType.VIEW_MORE}
            </a>
          )}
          Body={ITExpertModalContent}
          title={languageType.IT_EXPERT}
          size="lg"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    languageType: state.languageReducer.languageType,
  };
};

export default connect(mapStateToProps)(HelpInfo);

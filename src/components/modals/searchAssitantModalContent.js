import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import {
  projectPost_updateSelectedServices as updateServices,
} from "../../store/action/Project/projectActions";

function SearchAssistantBoostVisibilityModel(props) {
  const [priceCurrency, setPriceCurrency] = useState("US$");
   let dispatch=useDispatch()
  let boostServices=props.services['Boost visibility']
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const projectPost = useSelector(
    (state) => state.projectStore.projectPost
  );

  const handleConfirmClick = () => {
      props.handleClose()
  };

 const handleSelectService=(flag,service)=>{
 let pre_services=[...projectPost.selectedServices] 
 if(flag){
  pre_services.push(service)
  dispatch(updateServices(pre_services))
  props.onFieldChange("isNeededSearchAssistant", true)
 }else{
  dispatch(updateServices(pre_services.filter((item)=>item.serviceId!=service.serviceId)))
  if(pre_services.filter((item)=>item.serviceId!=service.serviceId).length===0){
    props.onFieldChange("isNeededSearchAssistant", false)
  }
 }
 }
  return (
    <Container className="assistant-boost-visibility">
      <div className="assistant-boost-visibility-title h2 text-center">
        {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_TITLE}
        <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/diamond.svg" />
      </div>
      <div class="assistant-boost-visibility-content">
        <div className="text-justify mb-20">
          {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_BODY}
        </div>
        <div className="text-justify">
          {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_BODY1}
        </div>
        <div className="text-justify mb-20">
          {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_BODY2}
          <a href="#">{languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_BODY3}</a>
          {languageType.SEARCH_ASSISTANT_BOOST_VISIBILITY_BODY4}
        </div>
      </div>
      <div class="amount-wrapper">
        <div class="assistant-boost-visibility-content-list">
          {boostServices && boostServices.length>0 &&  boostServices.map((item, index) => (
            <div
              className="assistant-boost-visibility-context withdraw-proposal-modal-content-list-item"
              key={`radioWithdrawAmount${index}`}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name={`assistantWithdrawElement${item.serviceId}`}
                id={`radioAmount${index}`}
                value={item.serviceId}
                onChange={(e) => {handleSelectService(e.target.checked,item)}}
                checked={projectPost.selectedServices.find((service)=>service.serviceId===item.serviceId)}
              />
              <label
                style={{ width: "auto", height: "auto" }}
                className="form-check-label"
                htmlFor={`radioAmount${index}`}
              >
                {" "}
                {" " + item.name} -  {item.description}
                <span>
                  {" "}
                  {
                    priceCurrency +
                    "" +
                    item.fee}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div class="total-amount">
          {priceCurrency}{projectPost.selectedServices.length>0?projectPost.selectedServices.reduce((previousValue, currentValue)=>previousValue + Number(currentValue.fee),0).toFixed(2):"0.00"}
        </div>
      </div>

      <div className="modal-footer text-right">
        <button
          type="button"
          className="btn save_btn"
          onClick={() => {
            handleConfirmClick();
          }}
        >
          {languageType.CONFIRM_TEXT}{" "}
        </button>
      </div>
    </Container>
  );
}

export default SearchAssistantBoostVisibilityModel;

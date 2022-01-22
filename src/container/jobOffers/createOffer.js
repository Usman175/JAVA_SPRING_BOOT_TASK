import React, { useState, useEffect } from "react";
import SubHeader from "../../components/subHeader";
import DropdownList from "../../components/dropdowns/dropdownList";
import { useSelector } from "react-redux";
import Label from "../../components/postProject/label";
import { selectSubScopes } from "../../utils/helpers";
import notifications from "../../utils/notifications"; 
import "./jobOffers.scss";
function CreateOffer(props) {
  const [accept, setAccept] = useState(true);
  const [projectScope, setProjectScope] = useState("");
  const [SubScope, setSubScope] = useState("");
  const [SubScopes, setSubScopes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [jobTitle, setJobTitle] = useState(""); 
  const [activeTabsData, setActiveTabsData] = useState([])
  const [professionalOverview, setProfessionalOverview] = useState("");
  const languageReducer = useSelector((state) => state.languageReducer);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );  
   
  const setScopeChange = (Scope) => {
    setProjectScope(Scope);
    setSubScopes(selectSubScopes(Scope, languageReducer.projectScopes));
  };
  useEffect(()=>{
    const stateObject = props?.location.state;
    if(stateObject ){ 
      const stateArray = Object.entries(stateObject);   
      setActiveTabsData(stateArray) 
    }
    else{
      props.history.push('/profession')
    }

  }, []) 

  const handleRemoveCategory =(Scope, index)=>{
    const filteredTabData = activeTabsData?.filter(data=> data[0] !== Scope[0])
    setActiveTabsData(filteredTabData) 
  }

  const handleRemoveSubCategory =(innerValue, outerValue, Scope)=>{ 
    let newProfession =  activeTabsData[outerValue][1].filter(
      (item) => item != innerValue
    );
    const filteredArray = activeTabsData?.map((data, index)=>{ 
      if(data[0] === Scope[0] ){
        data[1] = newProfession
      } 
      return data
    })
    const arr = filteredArray?.filter(array=>array[1].length !== 0)
    setActiveTabsData(arr)   
  }

  const handleValidation=()=> { 
    let errorMessage = {};
    let formIsValid = true;
    
      if(
        jobTitle === null ||
        jobTitle?.trim() === "" ||
        jobTitle === undefined ||
        jobTitle?.length < 3
      ) 
      {
      formIsValid = false;
      errorMessage["title"] = languageType?.REQUIRED_MESSAGE;
    } else if (!professionalOverview === null || professionalOverview?.trim() === "" 
    || professionalOverview === undefined || professionalOverview?.length < 3) 
    {
      formIsValid = false;
      errorMessage["description"] = languageType?.REQUIRED_MESSAGE;
    }
 
    setErrorMessage(errorMessage) 
    return formIsValid;
  }

  const handleNext = () => {
    if (handleValidation()) {
      setLoading(true);    
        notifications.showSuccess('You published the project successfully');
        props.history.push('/profession'); 
    } 
    else {
      notifications.showError("Please Enter Required Fields");
    }
      setLoading(false); 
  };


  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-lg-2 col-md-12"></div>
            <div className="col-lg-8 col-md-12">
              <div className="create-offer-page-design">
               <form
                        className="post_form border-top-0 pt-0"
                        onSubmit={(e) => e.preventDefault()}
                        style={{ paddingLeft: "0px" }}
                     >
                <div className="create-offer-top">
                  <div className="offer-icon">
                    <img
                      src={
                        "https://dhihitu47nqhv.cloudfront.net/icons/offers.png"
                      }
                      draggable={false}
                    />
                  </div>
                  <div className="offer-detail-content">
                    <p>{languageType.CREATE_OFFER_DETAIL}</p>

                    <input
                      className="custom-checkbox-styled"
                      checked={accept}
                      onChange={(e) => setAccept(accept ? false : true)}
                      id="styled-checkbox-1"
                      type="checkbox"
                      value={accept}
                    />
                    <label for="styled-checkbox-1">
                      {languageType.CREATE_OFFER_LABEL}
                    </label>
                  </div>
                </div>
                {console.log(activeTabsData,"activeTabsData")}
                <div className="offer-detail-scopes">
                  {activeTabsData?.map((Scope, index) => ( 
                    <div className="Scope_tab_Top_createOffer">
                      <span className="Scope_tab_createOffer">
                        {Scope[0]}
                        <span
                          onClick={() => handleRemoveCategory(Scope, index)}
                          style={{ cursor: "pointer", marginLeft:'10px', marginTop:'1px'}} 
                        >X</span>
                      </span> 
                      {Scope[1]?.map((subScope, i) => (
                        <div  className="SubScope_tab_createOffer">
                        {subScope.text}
                        <span>
                          <span
                            onClick={() => handleRemoveSubCategory(subScope, index, Scope)}
                            style={{ cursor: "pointer", marginLeft:'10px', marginTop:'1px' }} 
                          >X</span>
                        </span>
                        </div>
                      ))}
                    </div> 
                  ))}
                </div>
                <div className="create-offer-form-area">
                  <div className="row">
                    {/* <div className="col-12 col-md-6">
                      <DropdownList
                        id="projectScope"
                        name="projectScope"
                        placeHolder={languageType.SELECT_BUSINESS_CATEGORY}
                        value={projectScope}
                        items={languageReducer.projectScopes}
                        selectItem={(value) => setScopeChange(value)}
                        className="dropdown-area-custom-MobileClass"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <DropdownList
                        id="projectSubScope"
                        name="projectSubScope"
                        placeHolder={languageType.SELECT_SUB_BUSINESS_SCOPE}
                        value={SubScope}
                        selectItem={(value) => setSubScope(value)}
                        items={SubScopes}
                        className="dropdown-area-custom-MobileClass"
                      />
                    </div> */}
                    <div className="col-12 col-md-12">
                      <div classname="col-12 detail-area form-control">
                      <Label
                                title={languageType.JOB_TITLE}
                                compulsory={true}
                                prefixBoxValid={
                                  errorMessage["title"]
                                    ? false
                                    : true
                                }
                                prefixBoxInValid={
                                  errorMessage["title"]
                                    ? true
                                    : false
                                }

                                icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"}
                                color="#333333"
                              />

                        <textarea
                          rows="1"
                          value={jobTitle}
                          placeholder="Job Title"
                          maxLength="100"
                          minHeight="100px"
                          onChange={(e) => {
                            setJobTitle(e.target.value);
                          }}
                          className="text-area-custom-title"
                        />
                        <p className="text-danger">
                                {errorMessage.title}
                              </p>
                      </div>
                    </div>
                    <div className="col-12 detail-area text-area-custom_form">
                    <Label
                                title={languageType.JOB_DESCRIPTION}
                                compulsory={true}
                                prefixBoxValid={
                                  errorMessage["description"]
                                    ? false
                                    : true
                                }
                                prefixBoxInValid={
                                  errorMessage["description"]
                                    ? true
                                    : false
                                }
                                icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobDetail.svg"}
                                color="#333333"
                              />

                      <textarea
                        rows="10"
                        value={professionalOverview}
                        placeholder={languageType.OFFER_OVERVIEW}
                        maxLength="1000"
                        onChange={(e) => {
                          setProfessionalOverview(e.target.value);
                        }}
                        className="text-area-custom"
                      />
                      <p className="text-danger">
                                {errorMessage.description}
                       </p>
                    </div>
                  </div>
                </div>
                <div className="publish-button-area">
                  <button onClick={handleNext}>{languageType.PUBLISH_TEXT}</button>
                </div>
                </form>
              </div>
            </div>
            <div className="col-lg-2 col-md-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateOffer;

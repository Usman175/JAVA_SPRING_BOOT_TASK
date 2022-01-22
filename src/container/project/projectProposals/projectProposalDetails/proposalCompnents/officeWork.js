import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./proposalCompnents.scss";
import Label from "../../../../../components/customLabel/label";
import DropdownList from "../../../../../components/dropdowns/dropdownList";
import { ENDPOINT } from "../../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../../utils/httpConfig";
import request from "../../../../../utils/request";
import { store } from 'react-notifications-component';
import Radio from "../../../../../components/radioButton/radio";
import 'react-notifications-component/dist/theme.css'
import FreelancerSelection from './freelancerSelection'
import notifications from "../../../../../utils/notifications";

let teams=[
  {
   text:"team 1",
   value:"team 1",
},
{
  text:"team 2",
  value:"team 2",
},{
  text:"team 3",
  value:"team 3",
},
{
  text:"team 4",
  value:"team 4",
},
{
  text:"team 5",
  value:"team 5",
}
]


export default function OfficeWork(props) {
  const [currency, setCurrency] = useState(props.selectedProject.currencyCode?props.selectedProject.currencyCode:"");
  const [proposingAmount, setProposingAmount] = useState("");
  const [weekDays,seSpecificWeekDays]=useState([]);
  const [proposalDays, setProposalDays] = useState("");
  const [anyDaysFlag,setaSnyDaysFlag]=useState(false);
  const [termsFlag,setTermsFlag]=useState(false);
  const[loading,setLoading]=useState(false);
  const [flag,setFlag]=useState(false);
  const [freelancerType, setFreelancerType] = useState('')
  const [daysAlert, setDaysAlert] = useState(false)
  const [isProbationAccepted,setIsProbationAccepted]=useState(false);
  const [errMsg,setErrMsg]= useState({});
  const [selectedTeams,setSelectedTeams]= useState([
    {
      teamName:"",
      teamMembers:[]
    }
  ])
  const [SelectedFreelancer, setSelectedFreelancer] = useState([])
  const dispatch = useDispatch();

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const authReducer = useSelector(
    (state) => state.authReducer
  );


  React.useEffect(()=>{
   
    if(authReducer.freelancerAuth){
      setFreelancerType('Freelancer')
    }
    if(authReducer.organizationAuth){
      setFreelancerType('Company')
    }

  },[authReducer.freelancerAuth,authReducer.organizationAuth])

  const handleValidation = () => {
    let errorMessage = {};
    let { proposalData, languageType } = props;
    let formIsValid = true;
    if (!proposalData.coverLetter) {
      formIsValid = false;
      props.handleInitialValidation("coverLetter");
    } else if (!proposalData.description) {
      formIsValid = false;
      props.handleInitialValidation("description");
    } else if (!currency) {
      formIsValid = false;
      errorMessage["currency"] = languageType.REQUIRED_MESSAGE;
    }  else if (freelancerType === "Freelancer" && !proposingAmount) {
      formIsValid = false;
      errorMessage["proposingAmount"] = languageType.REQUIRED_MESSAGE;
    } else if (!proposalDays) {
      formIsValid = false;
      errorMessage["proposalDays"] = languageType.REQUIRED_MESSAGE;
    } else if (!anyDaysFlag && weekDays.length === 0) {
      formIsValid = false;
      errorMessage["weekDays"] = languageType.REQUIRED_MESSAGE;
    }else if (
      freelancerType === "Company" &&
      props.companyFreelancers.length < 1
    ) {
      formIsValid = false;
      notifications.showWarning("You need at least freelance for proposal");
    } else if (freelancerType === "Company" && SelectedFreelancer.length < 1) {
      formIsValid = false;
      notifications.showWarning("You need to select at least one freelancer!");
    } else if (!termsFlag) {
      formIsValid = false;
      errorMessage["termsFlag"] = languageType.REQUIRED_MESSAGE;
    }
    /* proposalDays */
    setErrMsg(errorMessage);
    return formIsValid;
  };
  const handleUpdateWeekDays = (value, day) => {
    if (Number(proposalDays) && Number(proposalDays) > 0) {
      if (weekDays.length < Number(proposalDays)) {
        if (value) {
          let specificWeekDay = weekDays;
          specificWeekDay.push(day);
          seSpecificWeekDays(specificWeekDay);
          setFlag(flag ? false : true);
        } else {
          let specificWeekDay = weekDays;
          specificWeekDay.splice(specificWeekDay.indexOf(day));
          seSpecificWeekDays(specificWeekDay);
          setFlag(flag ? false : true);
        }
        setDaysAlert(false)
      }else{
        setDaysAlert(true)
      }
    }else{
      setDaysAlert(null)
    }
    let errMsgs = errMsg;
    delete errMsgs.weekDays;
    setErrMsg(errMsgs);
  };
  const handleUpdateTermsFlag = (value) => {
    if (value) {
      let errMsgs = errMsg;
      delete errMsgs.termsFlag;
      setErrMsg(errMsgs);
    } else {
      let errMsgs = errMsg;
      errMsgs["termsFlag"] = props.languageType.REQUIRED_MESSAGE;
      setErrMsg(errMsgs);
    }
    setTermsFlag(value);
  };
  const handleUpdateIsProbation = (value) => {
    setIsProbationAccepted(value);
  };
  React.useEffect(()=>{
    let {amount,weekDays,daysAttendingPerWeek,isProbationAccepted}=props.existingProposalData;
 
    setProposingAmount(amount)

    if(weekDays && JSON.parse(weekDays).length>0){
      seSpecificWeekDays(weekDays)
 
    }else{
      setaSnyDaysFlag(true)
    }
    setProposalDays(daysAttendingPerWeek)

    setIsProbationAccepted(isProbationAccepted)

  },[props.existingProposalData])

  const handleProposalSubmit = async () => {
    let { proposalData, selectedProject } = props;
    if (handleValidation()) {
      let params = {
        projectId: proposalData.projectId,
        freelancerReferenceId: proposalData.userId,
        projectProposalId :proposalData.projectProposalId,
        freelancerType:
        selectedProject.freelancerType === " "
      ? "Individual"
      : selectedProject.freelancerType || "Individual",
        proposedDateTime: "",
        description: proposalData.description,
        coverLetter: proposalData.coverLetter,
        documents:props.documents,
        screeningQuestions:
          proposalData.screeningQuestionList.length > 0
            ? JSON.stringify(proposalData.screeningQuestionList)
            : "",
        isProbationAccepted: isProbationAccepted,
        daysAttendingPerWeek: proposalDays?.toString(),
        amountPerDay: "",
        weekDays: JSON.stringify(weekDays),
        hoursPerWeek: "",
        hourlyAmount: "",
        estimateCompleteDateTime: "",
        amount: proposingAmount?.toString(),
        milestones: "",
        currencyCode: currency,
        offerProjectPeriod: "",
        offeredMilestones: [],
        freelancers: SelectedFreelancer.length>0?SelectedFreelancer.map((item)=>({
          individualFreelancerId: item.individualFreelancerId,
          dailyRate: item.dailyRate,
      })):null
      };
      setLoading(true);
      let result = await request(
        proposalData.projectProposalId
          ? ENDPOINT["UpdateProposal"]
          : ENDPOINT["CreateProposal"],
        postOptions(params)
      );

      if (result.success) {
        if (result) {
          setLoading(false);
          store.addNotification({
            title: `Proposal ${proposalData.projectProposalId?"Updated":"Submitted"} Successfully `,
            message:
              `Proposal  successfully ${proposalData.projectProposalId?"Updated":"Submitted"}  Office Work project`,
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          let newurl = `project-proposal-detail?id=${proposalData.projectId}&projectProposalId=${result.result}`;
          props.onRouteChange("project-proposal-detail");
          props.history.push(newurl)
     
        } else {
          store.addNotification({
            title: "Error ",
            message: result.message,
            type: "warning",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          setLoading(false);
        }
      }
    }
  };
  return (
    <div className="milestone_project_proposal_area">
      <div className="milestone_project_proposal_detail">
        <Label title={"Propose Description"} compulsory={true} />
        <div className="row">
          <div className="col-12 col-md-3"   hidden={freelancerType === "Company"}>
            <DropdownList
              id="currency"
              name="currency"
              enableAutoCompleteSearch
              placeHolder="currency"
              value={currency}
              items={languageReducer.currencies}
              selectItem={(value) => {
                setCurrency(value);
                let errMsgs=errMsg
                delete errMsgs.currency
                setErrMsg(errMsgs)
              }}
            />
             {
        errMsg.currency && <p className="text-danger">{errMsg.currency}</p>
      }
          </div>
          <div className="col-12 col-md-4"   hidden={freelancerType === "Company"}>
            <div className="input_proposal_area_detail">
              <input value={proposingAmount}
              onChange={(e)=>{
                setProposingAmount(e.target.value)
                let errMsgs=errMsg
                delete errMsgs.proposingAmount
                setErrMsg(errMsgs)
              }} type="number" placeholder="Proposing Amount" />
            </div>
            {
        errMsg.proposingAmount && <p className="text-danger">{errMsg.proposingAmount}</p>
      }
          </div>
       
          {/* projectCompletionTime */}
        </div>
        <br />
        <div className="row">

          <div className="col-12 col-md-4">
            <Label title={"Proposing Attendance per Week"} compulsory={true} />
            <DropdownList
              id="proposalHours"
              name="proposalHours"
              enableAutoCompleteSearch
              placeHolder="Days"
              value={proposalDays}
              items={[
                {
                  text: "1 day",
                  value: "1",
                },
                {
                  text: "2 days",
                  value: "2",
                },
                {
                  text: "3 days",
                  value: "3",
                },
                {
                  text: "4 days",
                  value: "4",
                },
                {
                  text: "5 days",
                  value: "5",
                },
                {
                  text: "6 days",
                  value: "6",
                },
                {
                  text: "7 days",
                  value: "7",
                },
              ]}
              selectItem={(value) => {
                setProposalDays(value);
                let errMsgs=errMsg
                delete errMsgs.proposalDays
                setErrMsg(errMsgs)
                setDaysAlert(false)
                seSpecificWeekDays([])
              }}
            />
                   {
        errMsg.proposalDays && <p className="text-danger">{errMsg.proposalDays}</p>
      }
          </div>
          <div className="col-12 col-md-2 proposal_hours_unit">per week</div>
        </div>
        <div className="row" style={{ margin: "40px 0px" }} >
        <div className="col-12  col-md-3" style={{margin:'5px',marginLeft:'-5px'}}>
        <Radio
                                    handleSelect={(e) => {
                                      if (!anyDaysFlag) {
                                        seSpecificWeekDays([]);
                                      }
                                      setaSnyDaysFlag(anyDaysFlag ? false : true);
                                      let errMsgs = errMsg;
                                      delete errMsgs.weekDays;
                                      setErrMsg(errMsgs);
                                    }}
                                    name="hourly-option12"
                                    id="s-option-hourly12"
                                    checked={anyDaysFlag?false:true}
                                    label={"specific days of week"}
                                  
                                    disableCustomControl={true}
                                  />
         
          </div>
        <div className="col-12  col-md-3" style={{margin:'5px'}}>
        <Radio
                                    handleSelect={(e) => {
                                      if (!anyDaysFlag) {
                                        seSpecificWeekDays([]);
                                      }
                                      setaSnyDaysFlag(anyDaysFlag ? false : true);
                                      let errMsgs = errMsg;
                                      delete errMsgs.weekDays;
                                      setErrMsg(errMsgs);
                                      setDaysAlert(false)
                                    }}
                                    name="hourly-option12"
                                    id="s-option-hourly12"
                                    checked={anyDaysFlag}
                                    label={"Any Day Client Want"}
                                  
                                    disableCustomControl={true}
                                  />
         
          </div>
        <div
            className="col-12  col-md-12 weekly-days-selection"
            style={{ pointerEvents: anyDaysFlag ? "none" : "" ,marginTop:'15px',marginLeft:'-5px'}}
          >
            <span>
              <div>Mon</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Mon")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Mon")}
                                 id="styled-checkbox-week-Mon" type="checkbox"  value={weekDays.includes("Mon")} />
                              <label for="styled-checkbox-week-Mon"></label>
           
            </span>
            <span>
              <div>Tue</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Tue")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Tue")}
                                 id="styled-checkbox-week-tue" type="checkbox"  value={weekDays.includes("Tue")} />
                              <label for="styled-checkbox-week-tue"></label>
            </span>
            <span>
              <div>Wed</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Wed")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Wed")}
                                 id="styled-checkbox-week-Wed" type="checkbox"  value={weekDays.includes("Wed")} />
                              <label for="styled-checkbox-week-Wed"></label>
            
            </span>
            <span>
              <div>Thu</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Thu")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Thu")}
                                 id="styled-checkbox-week-Thu" type="checkbox"  value={weekDays.includes("Thu")} />
                              <label for="styled-checkbox-week-Thu"></label>

            </span>
            <span>
              <div>Fri</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Fri")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Fri")}
                                 id="styled-checkbox-week-Fri" type="checkbox"  value={weekDays.includes("Fri")} />
                              <label for="styled-checkbox-week-Fri"></label>
             
            </span>
            <span>
              <div style={{ color: "#6D0909" }}>Sat</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Sat")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Sat")}
                                 id="styled-checkbox-week-Sat" type="checkbox"  value={weekDays.includes("Sat")} />
                              <label for="styled-checkbox-week-Sat"></label>
             
           
            </span>
            <span>
              <div style={{ color: "#6D0909" }}>Sun</div>
              <input className="custom-checkbox-styled"
             checked={weekDays.includes("Sun")}
             onChange={(e) => handleUpdateWeekDays(e.target.checked, "Sun")}
                                 id="styled-checkbox-week-Sun" type="checkbox"  value={weekDays.includes("Sun")} />
                              <label for="styled-checkbox-week-Sun"></label>
           
            </span>
          </div>

   
        
        </div>
        {
          daysAlert===false?'': daysAlert===true? <p style={{marginTop:'-30px'}} className="text-danger">You have selected only {proposalDays} days</p>: <p style={{marginTop:'-30px'}} className="text-danger">You have not selected  days</p>
        }
        {
        errMsg.weekDays && <p className="text-danger">{errMsg.weekDays}</p>
      }  
         <div hidden={freelancerType==="Freelancer"}>
       <FreelancerSelection 
        teams={teams}
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        teamMembers={props.companyFreelancers}
        type={"OfficeWork"}
        amount={proposingAmount}
        setSelectedFreelancer={setSelectedFreelancer}
        SelectedFreelancer={SelectedFreelancer}
        /></div>
       <div hidden={sessionStorage.userType==="Freelancer"} className="row">
          <div className="col-12">
            <p style={{ margin: "30px 0px 0px 0px" }}>
              Payment will be increased on Sat/Sun/Public Holiday as below{" "}
            </p>
            <p>
              Saturday X 1.5 times/Sunday & Public Holiday X 2 times of regular
              daily payment agreed
            </p>
          </div>
        </div>
      </div>
      <div className="checkbox_area_for_mile_stone_bid" style={{margin:'5px 0px 0px -5px'}}>
       
        <input className="custom-checkbox-styled"
               onChange={(e) => handleUpdateIsProbation(e.target.checked)}
               checked={isProbationAccepted}
                                 id="styled-checkbox-week-probation" type="checkbox"  value={isProbationAccepted} />
                              <label for="styled-checkbox-week-probation">Do you accept 2 weeks probation period?</label>

      </div>
      <div className="checkbox_area_for_mile_stone_bid" style={{margin:'5px 0px 0px -5px'}}>
    
        <input className="custom-checkbox-styled"
               onChange={(e) => handleUpdateTermsFlag(e.target.checked)}
               checked={termsFlag}
                                 id="styled-checkbox-week-terms" type="checkbox"  value={termsFlag} />
                              <label for="styled-checkbox-week-terms">  Have you read the terms and conditions? If not, please click here</label>
      </div>
      {
        errMsg.termsFlag && <p className="text-danger">{errMsg.termsFlag}</p>
      }
      <div className="proposal_submit_area">
      <button disabled={loading} onClick={handleProposalSubmit}>
      {props.proposalData.projectProposalId?"Update":"Propose"}  {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
        </button>
      </div>
    </div>
  );
}

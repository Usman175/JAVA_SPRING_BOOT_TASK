import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./proposalCompnents.scss";
import Label from "../../../../../components/customLabel/label";
import DropdownList from "../../../../../components/dropdowns/dropdownList";
import { ENDPOINT } from "../../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../../utils/httpConfig";
import request from "../../../../../utils/request";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import notifications from "../../../../../utils/notifications";
import FreelancerSelection from './freelancerSelection'
let teamMembers=[
  {
    name:"Asim ALi",
    profile:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType:"ReactJs developer",
    available:"Part Time",
    hourlyRate:'0.00',
    availablePerWeek:'30'
  },
  {
    name:"Mansure Haider",
    profile:"https://lh3.googleusercontent.com/a-/AOh14GjK1QIGlo0M7b0EvnbpUV8gpL730CC4kH_LG0JG-DA=s96-c",
    jobType:"C# developer",
    available:"Full Time",
    hourlyRate:'0.00',
    availablePerWeek:'30'
  },
  {
    name:"Sonny Cho",
    profile:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType:"Dot net, developer",
    available:"Part Time",
    hourlyRate:'0.00',
    availablePerWeek:'30'
  },
  {
    name:"Canh doan",
    profile:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType:"C# developer",
    available:"Part Time",
    hourlyRate:'0.00',
    availablePerWeek:'30'
  },
  {
    name:"Fiaz Ahmed",
    profile:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType:"C# developer",
    available:"Part Time",
    hourlyRate:'0.00',
    availablePerWeek:'30'
  },
]
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

export default function Milestone(props) {
  
  const [currency, setCurrency] = useState(props.selectedProject.currencyCode?props.selectedProject.currencyCode:"");
  const [completionTime, setCompletionTime] = useState("");
  const [mileStoleBid,setMileStoleBid] = useState(false);
  const [proposingAmount,setProposingAmount]= useState("");
  const [freelancerType, setFreelancerType] = useState('')
  const [termsFlag,setTermsFlag]=useState(false);
  const[loading,setLoading]=useState(false);
  const [errMsg,setErrMsg]= useState({});
  const [SelectedFreelancer, setSelectedFreelancer] = useState([])
const [flag,setFlag]=useState(true);
  const [mileStoneDetail,setMileStoneDetail]= useState([
    {
      projectId: props.proposalData.projectId,
      proposalId: props.proposalData.projectProposalId?props.proposalData.projectProposalId:"",
      projectContractId: "",
      milestoneTitle: "",
      milestoneDescription: "",
      offerAmount: "",
      milestoneDueDate: ""
    }
  ]);

  const [selectedTeams,setSelectedTeams]= useState([
    {
      teamName:"",
      teamMembers:[]
    }
  ])

  const dispatch = useDispatch();


  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  // console.log(languageReducer, "languageReducer12");
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
  React.useEffect(()=>{
    let {estimateCompleteDateTime,offeredMilestones,amount}=props.existingProposalData;
    setCompletionTime(estimateCompleteDateTime?estimateCompleteDateTime:"")

    if(offeredMilestones && offeredMilestones.length>0){
      setMileStoneDetail(offeredMilestones)
      setMileStoleBid(true)
    }else{
      setProposingAmount(amount)
    }

  },[props.existingProposalData])


  const handleAddMileStoneItem=()=>{
    setMileStoneDetail([...mileStoneDetail,{
        projectId: props.proposalData.projectId,
        proposalId: "",
        projectContractId: "",
        milestoneTitle: "",
        milestoneDescription: "",
        offerAmount: "",
        milestoneDueDate: ""
      
    }])
  }
  const handleRemoveMileStoneItem=(index)=>{
     setMileStoneDetail( [...mileStoneDetail.slice(0, index), ...mileStoneDetail.slice(index + 1)])
    setFlag(flag?false:true)
  }
  const handleAddMileStoneDes=(value,index)=>{
 
    let mileStoneData=mileStoneDetail;
    mileStoneData[index].milestoneTitle=value

    setMileStoneDetail(mileStoneData)
    setFlag(flag?false:true)
  }
  const handleAddMileStoneAmount=(value,index)=>{
  let mileStoneData=mileStoneDetail;
  mileStoneData[index].offerAmount=value

  setMileStoneDetail(mileStoneData)
  setFlag(flag?false:true)
}
const handleAddMileStoneDate=(value,index)=>{
    let mileStoneData=mileStoneDetail;
    mileStoneData[index].milestoneDueDate=value
  
    setMileStoneDetail(mileStoneData)
    setFlag(flag?false:true)
  }
const handleValidation=()=>{
  let errorMessage = {};
  let {proposalData,languageType}=props;
  let formIsValid = true;
  if(!proposalData.coverLetter){
    formIsValid = false
    props.handleInitialValidation("coverLetter")
  }else if(!proposalData.description){
    formIsValid = false
    props.handleInitialValidation("description")
  }else if(!currency){
    formIsValid = false
    errorMessage["currency"]=languageType.REQUIRED_MESSAGE
  }else if(!completionTime & !mileStoleBid){
    formIsValid = false
    errorMessage["completionTime"]=languageType.REQUIRED_MESSAGE
  }else if(freelancerType === "Freelancer" && !proposingAmount  & !mileStoleBid){
    formIsValid = false
    errorMessage["offerAmount"]=languageType.REQUIRED_MESSAGE
  }else if (
    freelancerType === "Company" &&
    props.companyFreelancers.length < 1
  ) {
    formIsValid = false;
    notifications.showWarning("You need at least freelance for proposal");
  } else if (freelancerType === "Company" && SelectedFreelancer.length < 1) {
    formIsValid = false;
    notifications.showWarning("You need to select at least one freelancer!");
  }
  else if(!termsFlag){
    formIsValid = false
    errorMessage["termsFlag"]=languageType.REQUIRED_MESSAGE
  }
  setErrMsg(errorMessage)
  return formIsValid
}

const handleProposalSubmit=async (e)=>{
  e.preventDefault();
  let {proposalData,selectedProject}=props;
  if(handleValidation()){
  let params={
    projectId: proposalData.projectId,
    freelancerReferenceId: proposalData.userId,
    projectProposalId :proposalData.projectProposalId ,
    freelancerType: selectedProject.freelancerType,
    proposedDateTime: '',
    description: proposalData.description,
    coverLetter: proposalData.coverLetter,
    documents:props.documents,
    screeningQuestions: proposalData.screeningQuestionList.length > 0 ? JSON.stringify(proposalData.screeningQuestionList) : "",
    isProbationAccepted: false,
    daysAttendingPerWeek: "",
    amountPerDay: "",
    hoursPerWeek: "",
    hourlyAmount: "",
    estimateCompleteDateTime: completionTime,
    amount: (!mileStoleBid?proposingAmount:mileStoneDetail.reduce(function (acc, obj) { return acc + Number(obj.offerAmount); }, 0)).toString(),
   currencyCode:currency,
    offerProjectPeriod: "",
    offeredMilestones:mileStoleBid? mileStoneDetail:[],
    freelancers: SelectedFreelancer.length>0?SelectedFreelancer.map((item)=>({
      individualFreelancerId: item.individualFreelancerId,
  })):null
  }
  handleLoading(true)
  let result = await request(proposalData.projectProposalId ? ENDPOINT['UpdateProposal'] : ENDPOINT['CreateProposal'], postOptions(params));

  if (result.success) {
    if (result) {
      handleLoading(false)
      store.addNotification({
        title: `Proposal ${proposalData.projectProposalId?"Updated":"Submitted"} Successfully `,
        message: `Proposal submitted successfully  ${proposalData.projectProposalId?"Updated":"Submitted"} again milestone project`,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
      let newurl = `project-proposal-detail?id=${proposalData.projectId}&projectProposalId=${result.result}`;
        props.onRouteChange("project-proposal-detail");
        props.history.push(newurl);

    }
 
   
  }
  else{
    console.log(result)
    store.addNotification({
      title: "Error ",
      message: result.title || "Error Occurred from backend services",
      type: "warning",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });
    handleLoading(false)
  }


 
  }

}
const handleLoading=(flag)=>{
setLoading(flag)
}
const handleUpdateTermsFlag=(value)=>{
if(value){
 let errMsgs=errMsg
 delete errMsgs.termsFlag
 setErrMsg(errMsgs)
}else{
  let errMsgs=errMsg
   errMsgs["termsFlag"]=props.languageType.REQUIRED_MESSAGE
  setErrMsg(errMsgs)
}  
setTermsFlag(value)
}
  // console.log(props.selectedProject.offeredMilestones,"selectedProject")
  return (
    <div className="milestone_project_proposal_area">
      <form onSubmit={handleProposalSubmit}>
      <div className="checkbox_area_for_mile_stone_bid">
        <input type="checkbox" onChange={(e)=>setMileStoleBid(e.target.checked)} checked={mileStoleBid} />
        <label>
          Please, check if you would like to set milestones in detail or request
          to set the plan for the bid.
        </label>
      </div>
      <div className="milestone_project_proposal_detail">
        <Label title={"Propose Description"} compulsory={true} />
        <div className="row">
          <div className="col-12 col-md-3">
            <DropdownList
              id="currency"
              name="currency"
              enableAutoCompleteSearch
              placeHolder="Select currency"
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
          <div className="col-12 col-md-4">
              <div className="input_proposal_area_detail">
              <input type="number" value={!mileStoleBid?proposingAmount:mileStoneDetail.reduce(function (acc, obj) { return acc + Number(obj.offerAmount); }, 0)} disabled={mileStoleBid} onChange={(e)=>
                {setProposingAmount(e.target.value);
                  let errMsgs=errMsg
                  delete errMsgs.offerAmount
                  setErrMsg(errMsgs)
                }} placeholder="Proposing Amount" />
              {
        errMsg.offerAmount && <p className="text-danger">{errMsg.offerAmount}</p>
      }
              </div>

       
          </div>
          {!mileStoleBid?
          <div className="col-12 col-md-5 completionTime-box" >
      <Label title={"Estimated Project Completion"} compulsory={true} />
            <DropdownList
              id="completionTime"
              name="completionTime"
              enableAutoCompleteSearch
              placeholder="Select completion Time"
              value={completionTime}
              items={languageReducer.projectCompletionTime}
              selectItem={(value) => {
                setCompletionTime(value);
                let errMsgs=errMsg
                delete errMsgs.completionTime
                setErrMsg(errMsgs)
              }}
            />
             {
        errMsg.completionTime && <p className="text-danger">{errMsg.completionTime}</p>
      }
      
          </div>:null}

          {/* projectCompletionTime */}
        </div>
      {/*  set for client plan show */}
        {mileStoleBid?
        
      <div>
      {props.selectedProject.offeredMilestones && props.selectedProject.offeredMilestones.length>0 &&  props.selectedProject.offeredMilestones.map((item,index)=>(
          <div>
 <br />
      <div className="row">
          <div className="col-12 col-md-4">
          <div className="input_proposal_area_detail">
              <input type="text"  value={item.milestoneTitle} disabled={true}  />
               </div>
           </div>
           <div className="col-12 col-md-3">
          <div className="input_proposal_area_detail">
              <input type="text" value={item.offerAmount} disabled={true}  />
               </div>
           </div>
           <div className="col-12 col-md-3">
          <div className="input_proposal_area_detail"> 
              <input type="date"  value={item.milestoneDueDate.slice(0,10)}disabled={true}     />
               </div>
           </div>
      </div> 
          </div>
        ))}

      <br />
      <div className="checkbox_area_for_mile_stone_bid">
        <input type="checkbox" />
        <label>
        I would like to counter offer
        </label>
      </div>
      {mileStoneDetail.map((item,index)=>(<div>
        <br />
      <div className="row">
          <div className="col-12 col-md-4">
          <div className="input_proposal_area_detail">
              <input type="text" required placeholder="Milestone title" onChange={(e)=>handleAddMileStoneDes(e.target.value,index)}  value={item.milestoneTitle}   />
               </div>
           </div>
           <div className="col-12 col-md-3">
          <div className="input_proposal_area_detail">
              <input type="number"  required placeholder="Offer Amount" onChange={(e)=>handleAddMileStoneAmount(e.target.value,index)}  value={item.offerAmount}  />
               </div>
           </div>
           <div className="col-12 col-md-3">
          <div className="input_proposal_area_detail">
              <input type="date" required onChange={(e)=>handleAddMileStoneDate(e.target.value,index)}   value={item.milestoneDueDate}      />
               </div>
           </div>
           {index+1===mileStoneDetail.length?<div className="col-12 col-md-2 customer-plus-addition-icon" >
               <i onClick={handleAddMileStoneItem} className="fa fa-plus"></i>
           </div>:<div onClick={()=>handleRemoveMileStoneItem(index)} className="col-12 col-md-2 customer-plus-addition-icon" >
               <i className="fa fa-minus"></i>
           </div>}
           
      </div> 
      </div>))}
     
      <br />
      </div>:null}
     

      </div>
      <div hidden={freelancerType==="Freelancer"}>
      <FreelancerSelection 
        teams={teams}
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        teamMembers={props.companyFreelancers}
        type={"Milestone"}
        amount={(!mileStoleBid?proposingAmount:mileStoneDetail.reduce(function (acc, obj) { return acc + Number(obj.offerAmount); }, 0))?.toString()}
        setSelectedFreelancer={setSelectedFreelancer}
        SelectedFreelancer={SelectedFreelancer}
        />
        </div>
      <div  /* className={mileStoleBid?"terms-conditions-aligned":""} */ >
          <div className="checkbox_area_for_mile_stone_bid">
        <input type="checkbox" onChange={(e)=>handleUpdateTermsFlag(e.target.checked)} checked={termsFlag} />
        <label>
        Have you read the terms and conditions? If not, please click here
        </label>
      </div>
      {
        errMsg.termsFlag && <p className="text-danger">{errMsg.termsFlag}</p>
      }
      
      </div>
      <div className="proposal_submit_area">

        <button  disabled={loading} type="submit" > {props.proposalData.projectProposalId?"Update":"Propose"}  {" "}  {loading?<i className="fa fa-spinner fa-spin"></i>:''}</button>
      </div>
      </form>
    </div>
  );
}

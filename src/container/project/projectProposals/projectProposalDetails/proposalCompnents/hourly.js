import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./proposalCompnents.scss";
import Label from "../../../../../components/customLabel/label";
import DropdownList from "../../../../../components/dropdowns/dropdownList";
import { GetAmountPerHour } from "../../../../../utils/currency";
import { ENDPOINT } from "../../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../../utils/httpConfig";
import request from "../../../../../utils/request";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Currency from "../../../../../components/currency";
import FreelancerSelection from "./freelancerSelection";
import notifications from "../../../../../utils/notifications";
let teamMembers = [
  {
    name: "Asim ALi",
    profile:
      "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType: "ReactJs developer",
    available: "Part Time",
    hourlyRate: "0.00",
    availablePerWeek: "30",
  },
  {
    name: "Mansure Haider",
    profile:
      "https://lh3.googleusercontent.com/a-/AOh14GjK1QIGlo0M7b0EvnbpUV8gpL730CC4kH_LG0JG-DA=s96-c",
    jobType: "C# developer",
    available: "Full Time",
    hourlyRate: "0.00",
    availablePerWeek: "30",
  },
  {
    name: "Sonny Cho",
    profile:
      "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType: "Dot net, developer",
    available: "Part Time",
    hourlyRate: "0.00",
    availablePerWeek: "30",
  },
  {
    name: "Canh doan",
    profile:
      "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType: "C# developer",
    available: "Part Time",
    hourlyRate: "0.00",
    availablePerWeek: "30",
  },
  {
    name: "Fiaz Ahmed",
    profile:
      "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
    jobType: "C# developer",
    available: "Part Time",
    hourlyRate: "0.00",
    availablePerWeek: "30",
  },
];
let teams = [
  {
    text: "team 1",
    value: "team 1",
  },
  {
    text: "team 2",
    value: "team 2",
  },
  {
    text: "team 3",
    value: "team 3",
  },
  {
    text: "team 4",
    value: "team 4",
  },
  {
    text: "team 5",
    value: "team 5",
  },
];

export default function Hourly(props) {
  const [currency, setCurrency] = useState(
    props.selectedProject.currencyCode ? props.selectedProject.currencyCode : ""
  );
  const [proposingAmount, setProposingAmount] = useState("");
  const [proposalHours, setProposalHours] = useState("");
  const [termsFlag, setTermsFlag] = useState(false);
  const [freelancerType, setFreelancerType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProbationAccepted, setIsProbationAccepted] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([
    {
      teamName: "",
      teamMembers: [],
    },
  ]);
  const [SelectedFreelancer, setSelectedFreelancer] = useState([]);
  const dispatch = useDispatch();

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);

  const authReducer = useSelector((state) => state.authReducer);

  React.useEffect(() => {
    if (authReducer.freelancerAuth) {
      setFreelancerType("Freelancer");
    }
    if (authReducer.organizationAuth) {
      setFreelancerType("Company");
    }
  }, [authReducer.freelancerAuth, authReducer.organizationAuth]);

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
    } else if (!proposalHours) {
      formIsValid = false;
      errorMessage["proposalHours"] = languageType.REQUIRED_MESSAGE;
    } else if (freelancerType === "Freelancer" && !proposingAmount) {
      formIsValid = false;
      errorMessage["proposingAmount"] = languageType.REQUIRED_MESSAGE;
    } else if (!termsFlag) {
      formIsValid = false;
      errorMessage["termsFlag"] = languageType.REQUIRED_MESSAGE;
    } else if (
      freelancerType === "Company" &&
      props.companyFreelancers.length < 1
    ) {
      formIsValid = false;
      notifications.showWarning("You need at least freelance for proposal");
    } else if (freelancerType === "Company" && SelectedFreelancer.length < 1) {
      formIsValid = false;
      notifications.showWarning("You need to select at least one freelancer!");
    }

    setErrMsg(errorMessage);
    return formIsValid;
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

  React.useEffect(() => {
    let {
      hoursPerWeek,
      hourlyAmount,
      amountPerDay,
      weekDays,
      daysAttendingPerWeek,
      isProbationAccepted,
    } = props.existingProposalData;
    setProposalHours(hoursPerWeek);
    setProposingAmount(hourlyAmount);
    setIsProbationAccepted(isProbationAccepted);
  }, [props.existingProposalData]);

  // submit proposal

  const handleProposalSubmit = async () => {
    let { proposalData, selectedProject } = props;
    if (handleValidation()) {
      let params = {
        projectId: proposalData.projectId,
        freelancerReferenceId: proposalData.userId,
        freelancerType: selectedProject.freelancerType,
        projectProposalId: proposalData.projectProposalId,
        proposedDateTime: "",
        description: proposalData.description,
        coverLetter: proposalData.coverLetter,
        screeningQuestions:
          proposalData.screeningQuestionList.length > 0
            ? JSON.stringify(proposalData.screeningQuestionList)
            : "",
        isProbationAccepted: isProbationAccepted,
        daysAttendingPerWeek: "",
        amountPerDay: "",
        hoursPerWeek: proposalHours?.toString(),
        hourlyAmount: proposingAmount?.toString(),
        documents:props.documents,
        estimateCompleteDateTime: "",
        amount: "",
        milestones: "",
        currencyCode: currency,
        offerProjectPeriod: "",
        offeredMilestones: [],
        freelancers: SelectedFreelancer.length>0?SelectedFreelancer.map((item)=>({
          individualFreelancerId: item.individualFreelancerId,
            attendHourOfWeek: proposalHours,
            hourlyRate: item.hourlyRate,
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
            title: `Proposal ${
              proposalData.projectProposalId ? "Updated" : "Submitted"
            } Successfully `,
            message: `Proposal  successfully ${
              proposalData.projectProposalId ? "Updated" : "Submitted"
            }  hourly project`,
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
          props.history.push(newurl);
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

  /*   console.log(languageReducer, "languageReducer12"); */

  return (
    <div className="milestone_project_proposal_area">
      <div className="milestone_project_proposal_detail">
        {/* <Label title={"Propose Description"} compulsory={true} /> */}
        <div className="row">
          <div
            className="col-12 col-md-3"
            hidden={freelancerType === "Company"}
          >
            <DropdownList
              id="currency"
              name="currency"
              enableAutoCompleteSearch
              placeHolder="Select currency"
              value={currency}
              items={languageReducer.currencies}
              selectItem={(value) => {
                setCurrency(value);
                let errMsgs = errMsg;
                delete errMsgs.currency;
                setErrMsg(errMsgs);
              }}
            />
            {errMsg.currency && (
              <p className="text-danger">{errMsg.currency}</p>
            )}
          </div>
          <div
            className="col-12 col-md-4"
            hidden={freelancerType === "Company"}
          >
            <div className="input_proposal_area_detail">
              <DropdownList
                id="ProposingAmount"
                name="ProposingAmount"
                enableAutoCompleteSearch
                placeHolder="Proposing Amount"
                value={proposingAmount}
                items={currency ? GetAmountPerHour(currency) : []}
                selectItem={(value) => {
                  setProposingAmount(value);
                  let errMsgs = errMsg;
                  delete errMsgs.proposingAmount;
                  setErrMsg(errMsgs);
                }}
              />
            </div>

            {errMsg.proposingAmount && (
              <p className="text-danger">{errMsg.proposingAmount}</p>
            )}
          </div>
          <div
            hidden={freelancerType === "Company"}
            className="col-12 col-md-3 proposal_hours_unit"
            style={{ marginTop: "0px" }}
          >
            per hour
          </div>
          {/*  <div className="col-12 col-md-5 completionTime-box" >
      <Label title={"Estimated Project Completion"} compulsory={true} />
            <DropdownList
              id="completionTime"
              name="completionTime"
              placeholder="Select completion Time"
              value={completionTime}
              items={languageReducer.projectCompletionTime}
              selectItem={(value) => {
                setCompletionTime(value);
              }}
            />
          </div>
 */}
          {/* projectCompletionTime */}
        </div>
        <br />
        <div className="row">
          <div className="col-12 col-md-4">
            <Label title={"Proposing Hours Per Week"} compulsory={true} />
            <DropdownList
              id="proposalHours"
              name="proposalHours"
              enableAutoCompleteSearch
              placeHolder="Select Hours"
              value={proposalHours}
              items={[
                {
                  text: languageType.NO_TEN_TEXT,
                  value: "10",
                },
                {
                  text: languageType.NO_TWENTY_TEXT,
                  value: "20",
                },
                {
                  text: languageType.NO_THIRTY_TEXT,
                  value: "30",
                },
                {
                  text: languageType.NO_FOURTY_TEXT,
                  value: "40",
                },
                {
                  text: languageType.NO_FIFTY_TEXT,
                  value: "50",
                },
                {
                  text: languageType.NO_UNLIMITED_TEXT,
                  value: "60",
                },
              ]}
              selectItem={(value) => {
                setProposalHours(value);
                let errMsgs = errMsg;
                delete errMsgs.proposalHours;
                setErrMsg(errMsgs);
              }}
            />
            {errMsg.proposalHours && (
              <p className="text-danger">{errMsg.proposalHours}</p>
            )}
          </div>
          <div className="col-12 col-md-3 proposal_hours_unit">per week</div>
        </div>
      </div>
      <div hidden={freelancerType === "Freelancer"}>
        <FreelancerSelection
          teams={teams}
          setSelectedTeams={setSelectedTeams}
          selectedTeams={selectedTeams}
          teamMembers={props.companyFreelancers}
          proposingAmountHourly={proposingAmount}
          type={"Hourly"}
          setSelectedFreelancer={setSelectedFreelancer}
          SelectedFreelancer={SelectedFreelancer}
        />
      </div>

      <div
        className="checkbox_area_for_mile_stone_bid"
        style={{ margin: "5px 0px 0px -5px" }}
      >
        <input
          className="custom-checkbox-styled"
          onChange={(e) => handleUpdateIsProbation(e.target.checked)}
          checked={isProbationAccepted}
          id="styled-checkbox-week-probation"
          type="checkbox"
          value={isProbationAccepted}
        />
        <label for="styled-checkbox-week-probation">
          Do you accept 2 weeks probation period?
        </label>
      </div>
      <div
        className="checkbox_area_for_mile_stone_bid"
        style={{ margin: "5px 0px 0px -5px" }}
      >
        <input
          className="custom-checkbox-styled"
          onChange={(e) => handleUpdateTermsFlag(e.target.checked)}
          checked={termsFlag}
          id="styled-checkbox-week-terms"
          type="checkbox"
          value={termsFlag}
        />
        <label for="styled-checkbox-week-terms">
          {" "}
          Have you read the terms and conditions? If not, please click here
        </label>
      </div>
      {errMsg.termsFlag && <p className="text-danger">{errMsg.termsFlag}</p>}

      <div className="proposal_submit_area">
        <button disabled={loading} onClick={handleProposalSubmit}>
        {props.proposalData.projectProposalId?"Update":"Propose"}  {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import SubHeader from "../../../components/subHeader";
import Label from "../../../components/postProject/label";
import notifications from "../../../utils/notifications";
import LeftFreelancerContent from "../../freelancer/freelancerContents/leftFreelancerContent";
import MiddleFreelancerContent from "../../freelancer/freelancerContents/middleFreelancerContent";
import RightFreelancerContent from "../../freelancer/freelancerContents/rightFreelancerContent";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import "./hire.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import request from "../../../utils/request";
import Format from "../../../components/numberFormat";
import { ENDPOINT } from "../../../utils/endpoint";
import Skeleton from "../../../components/skeleton/skeleton";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}


function HireFreelancer(props) {
  const [proposalDetail, setProposalDetail] = useState({
    hourlyRate: "14.00",
    dailyRate: "200.00",
    availablePerWeek: "30",
    daysPerWeek: "5",
    noOfFreelancer: "3",
    projectType: "Free Contrac",
    projectDuration: "Less then one month",
    finalizedMilestoneAmount: "1500.00",
    currencyCode: "US$",
    estimateCompleteDateTime: "",
    coverLetter: "",
    description: "",
    projectProposalId: "",
    amount: "",
    daysAttendingPerWeek: "",
    hoursPerWeek: "",
    weekDays: [],
    allowChangeParticipants: false,
    allowManualTimeLog: false,
    termsConditions: false,
    finalizedSalaryType:''
  });
  const [finalizedSalaryType,setFinalizedSalaryType] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [activeFields, setActiveFields] = useState([]);
  const [show, setShow] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isSkeletonLoading1, setIsSkeletonLoading1] = useState(false);
  const [isSkeletonLoading2, setIsSkeletonLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freelancer, setFreelancer] = useState('');
  const [projectDetail, setProjectDetail] = useState({});
  const [errMsg, setErrMsg] = useState({});
  const [daysAlert, setDaysAlert] = useState(false);
  const [mileStoneDetail,setMileStoneDetail]= useState([]);
  const [termsAndConditionError, setTermsAndConditionError] = useState(false);
  const [isHireProposalPopupDisplay, setIsHireProposalPopupDisplay] =
    useState(false);
  const [isHireMoreFreelancer, setIsHireMoreFreelancer] = useState(false);
  React.useEffect(() => {
    getFreelancerDetail();
    getProposal();
    getProject();
  }, []);

  const clientUserId = props.authUser?.clientAuth?.clientId;

  const onPageRedirectHandle = async () => {
    setTermsAndConditionError(false);
    if (proposalDetail.termsConditions && contractDescription) {
      let projectId = new URLSearchParams(props.location.search).get("id");
      let projectProposalId = new URLSearchParams(props.location.search).get(
        "projectProposalId"
      );
      let freelancerUserId = new URLSearchParams(props.location.search).get(
        "userId"
      );
      let param = {
        projectId: projectId,
        postUserId: clientUserId,
        freelancerReferenceId: freelancerUserId,
        offerAvailableDateTime: projectDetail.submissionExpirationDate,
        billingDate: projectDetail.submissionExpirationDate,
        offerAmount: proposalDetail.amount ? proposalDetail.amount : "",
        allowManualTimeLog: proposalDetail.allowManualTimeLog,
        allowChangeParticipants: proposalDetail.allowChangeParticipants,
        contractDescription: contractDescription,
        proposalId: projectProposalId,
      };

      let customizedParams = {};

      if (proposalDetail.projectType === "Hourly") {
        customizedParams = {
          ...param,
          finalizedHourOfWeek: proposalDetail.hoursPerWeek,
          finalizedHourlyRate: proposalDetail.hourlyRate,
        };
      }

      if (proposalDetail.projectType === "OfficeWork" || proposalDetail.projectType === "OfficeWork") {
        customizedParams = {
          ...param,
          finalizedDayOfWeek: proposalDetail.daysAttendingPerWeek,
          finalizedSalarayAmount: proposalDetail.amount,
          finalizedSalaryType:finalizedSalaryType,
          finalizedWeekdays: proposalDetail.weekDays
            ? proposalDetail.weekDays.toString()
            : "",
        };
      }

      if (proposalDetail.projectType === "Free Contract" || proposalDetail.projectType === "FreeContract") {
        customizedParams = {
          ...param,
          finalizedDailyRate: proposalDetail.dailyRate,
          finalizedHourlyRate: proposalDetail.hourlyRate,
          finalizedHourOfWeek: proposalDetail.hoursPerWeek,
          finalizedDayOfWeek: proposalDetail.daysAttendingPerWeek, // count
          finalizedWeekdays: proposalDetail.weekDays
            ? proposalDetail.weekDays.toString()
            : "", // days stringified array
        };
      }

      if (projectDetail.projectType === "Milestone") {
        customizedParams = {
          ...param,
          projectDuration: proposalDetail.projectDuration,
          finalizedMilestoneAmount: mileStoneDetail.length>0?mileStoneDetail.reduce(function (acc, obj) { return acc + Number(obj.offerAmount); }, 0).toString() :proposalDetail.finalizedMilestoneAmount,
         finalizedMilestones:mileStoneDetail.length>0?mileStoneDetail:[]
        };
      }

      setLoading(true);
      let result = await request(
        ENDPOINT["CreateProjectContract"],
        postOptions(customizedParams)
      );
      if (result.success) {
        setLoading(false);
        setIsHireProposalPopupDisplay(true);
      } else {
        setLoading(false);
        notifications.showError(
          result.message ? result.message : "Something went wrong"
        );
      }
    } else {
      if (!proposalDetail.termsConditions) {
        setTermsAndConditionError(true);
      }
      if (!contractDescription) {
        setErrMsg({ contractDescription: "This is required" });
      }
    }
  };

  const onHireMoreFreelancer = (redirectTo) => {
    props.history.push(redirectTo);
  };

  const getProject = async () => {
    let projectId = new URLSearchParams(props.location.search).get("id");
    if (projectId) {
      setIsSkeletonLoading2(true);
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        setProjectDetail(result.result);
        setFinalizedSalaryType(result.result.salaryType)
        setIsSkeletonLoading2(false);
      }
    }
  };
  const getFreelancerDetail = async () => {
    let freelancerUserId = new URLSearchParams(props.location.search).get(
      "userId"
    );
    if (freelancerUserId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${freelancerUserId}`,
        getOptions()
      );
      if (result.success && result.result) {
        setIsSkeletonLoading(false);
        setFreelancer(result.result);
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  const getProposal = async () => {
    let projectProposalId = new URLSearchParams(props.location.search).get(
      "projectProposalId"
    );
    if (projectProposalId) {
      setIsSkeletonLoading1(true);
      let result = await request(
        `${ENDPOINT["GetProposal"]}?projectProposalId=${projectProposalId}`,
        getOptions({})
      );

      if (result.success) {
        setProposalDetail({
          ...proposalDetail,
          projectType: result.result.projectType,
          hourlyRate: result.result.hourlyAmount,
          dailyRate: result.result.amountPerDay,
          finalizedMilestoneAmount: result.result.amount,
          projectDuration: result.result.estimateCompleteDateTime,
          estimateCompleteDateTime: result.result.estimateCompleteDateTime,
          coverLetter: result.result.coverLetter,
          description: result.result.description,
          projectProposalId: result.result.projectProposalId,
          amount: result.result.amount,
          daysAttendingPerWeek: result.result.daysAttendingPerWeek,
          hoursPerWeek: result.result.hoursPerWeek,
          weekDays: result.result.weekDays
            ? JSON.parse(result.result.weekDays)
            : "",
          currencyCode:
            result.result.currencyCode === "USD"
              ? "US$"
              : result.result.currencyCode === "KRW"
              ? "원"
              : result.result.currencyCode === "JPY"
              ? "円"
              : "US$",
        });
        setMileStoneDetail(result?.result.offeredMilestones?result.result.offeredMilestones:[])
        setIsSkeletonLoading1(false);
      } else {
        setIsSkeletonLoading1(false);
      }
    }
  };
  const handleActive = (field) => {
    let newActiveFields = [...activeFields];
    newActiveFields.push(field);
    setActiveFields(newActiveFields);
  };
  const handleDeActive = (field) => {
    let newActiveFields = [...activeFields];
    let newElements = newActiveFields.filter((item) => item != field);
    setActiveFields(newElements);
  };
  const handleUpdateProposal = (value, field) => {
    setProposalDetail({
      ...proposalDetail,
      [field]: value,
    });
  };

  const toggleFlag = (field) => {
    console.log("toggle func called");
    setProposalDetail({
      ...proposalDetail,
      [field]: !proposalDetail[field],
    });
  };

  const handleUpdateWorkingHours = (value, field) => {
    if (value > 0 && value < 41) {
   
      setProposalDetail({
        ...proposalDetail,
        [field]: value,
      });
    } else {
    }
  };

  const handleDaysChange = (value, field) => {
    if (value > 0 && value < 8) {
 
      setProposalDetail({
        ...proposalDetail,
        [field]: value,
      });
    } else {
    }
  };
  const handleUpdateWeekDays = (value, day) => {
    if (
      Number(proposalDetail.daysAttendingPerWeek) &&
      Number(proposalDetail.daysAttendingPerWeek) > 0
    ) {
      if (
        proposalDetail.weekDays.length <
        Number(proposalDetail.daysAttendingPerWeek)
      ) {
        if (value) {
          let specificWeekDay = proposalDetail.weekDays;
          specificWeekDay.push(day);
          setProposalDetail({
            ...proposalDetail,
            weekDays: specificWeekDay,
          });
          setFlag(flag ? false : true);
        } else {
          let specificWeekDay = proposalDetail.weekDays;
          specificWeekDay.splice(specificWeekDay.indexOf(day));
          setProposalDetail({
            ...proposalDetail,
            weekDays: specificWeekDay,
          });
          setFlag(flag ? false : true);
        }
        setDaysAlert(false);
      } else {
        setDaysAlert(true);
      }
    } else {
      setDaysAlert(null);
    }
    let errMsgs = errMsg;
    delete errMsgs.weekDays;
    setErrMsg(errMsgs);
  };

// offered milestones
const handleAddMileStoneItem=()=>{
  setMileStoneDetail([...mileStoneDetail,{
      projectId: projectDetail.projectId,
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

  return (
    <div>
      <SubHeader />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-1"></div>
          <div className="col-12 col-lg-10 hire-container client_detail">
            <div className="hire-heading">
              <img
                src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/greet_hello.svg"}
                alt="greet_hello"
                className="hire-heading-img"
              />
              <h4 className="hire-heading-text">Hire Freelancer</h4>
            </div>
            <br /> <br />
            <Skeleton count={1} isSkeletonLoading={isSkeletonLoading} />
            <div
              hidden={isSkeletonLoading}
              className="row justify-content-between"
            >
              <div className="col-md-2 col_3">
                <LeftFreelancerContent freelancer={freelancer} {...props} />
              </div>
              <div className="col-md-6 col_5">
                <MiddleFreelancerContent freelancer={freelancer} {...props} />
              </div>
              <div className="col-md-4 text-right">
                <RightFreelancerContent
                  freelancer={freelancer}
                  index={1}
                  {...props}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="workDescription">
              <div className="hire-company-terms-heading">
                <img
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/workDescription.svg"
                  }
                  alt="storage"
                  className="storage"
                />
                <h4 className="hire-terms-text">Work Description</h4>
              </div>
              <Skeleton count={1} isSkeletonLoading={isSkeletonLoading2} />
              <div hidden={isSkeletonLoading2} className="detail-area">
                <p>Project ID: {projectDetail.projectId}</p>
                <p>
                  Project Title:{" "}
                  <b>
                    {activeFields.includes("jobTitle") ? (
                      <input
                        type="text"
                        onChange={(e) => {
                          setProjectDetail({
                            ...projectDetail,
                            jobTitle: e.target.value,
                          });
                        }}
                        readOnly={
                          activeFields.includes("jobTitle") ? false : true
                        }
                        className={`${
                          activeFields.includes("jobTitle") ? "active" : ""
                        }`}
                        value={projectDetail.jobTitle}
                      />
                    ) : (
                      projectDetail.jobTitle
                    )}
                  </b>
                  {activeFields.includes("jobTitle") ? (
                    <BootstrapTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      placement="top"
                      title={"Save Job Title"}
                    >
                      <img
                        onClick={() => handleDeActive("jobTitle")}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                        }
                      />
                    </BootstrapTooltip>
                  ) : (
                    <BootstrapTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      title={"Edit Job Title"}
                      arrow
                      placement="top"
                    >
                      <img
                        onClick={() => handleActive("jobTitle")}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                        }
                      />
                    </BootstrapTooltip>
                  )}
                </p>
                <p>
                  Description:{" "}
                  <b>
                    {activeFields.includes("jobDescription") ? (
                      <textarea
                        onChange={(e) => {
                          setProjectDetail({
                            ...projectDetail,
                            jobDescription: e.target.value,
                          });
                        }}
                        readOnly={
                          activeFields.includes("jobDescription") ? false : true
                        }
                        className={`${
                          activeFields.includes("jobDescription")
                            ? "active"
                            : ""
                        }`}
                        value={projectDetail.jobDescription}
                        rows="5"
                      ></textarea>
                    ) : (
                      projectDetail.jobDescription
                    )}
                  </b>
                  {activeFields.includes("jobDescription") ? (
                    <BootstrapTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      placement="top"
                      title={"Save Job Description"}
                    >
                      <img
                        onClick={() => handleDeActive("jobDescription")}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                        }
                      />
                    </BootstrapTooltip>
                  ) : (
                    <BootstrapTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      title={"Edit Job Description"}
                      arrow
                      placement="top"
                    >
                      <img
                        onClick={() => handleActive("jobDescription")}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                        }
                      />
                    </BootstrapTooltip>
                  )}
                </p>
              </div>
            </div>
            <div className="proposedTerms">
              <div className="hire-company-terms-heading">
                <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/storage.svg"} alt="storage" className="storage" />
                <h4 className="hire-terms-text">Freelancer Proposed </h4>
              </div>
              <Skeleton count={1} isSkeletonLoading={isSkeletonLoading1} />
              <div hidden={isSkeletonLoading1} className="detail-area">
                <p>Propose ID: {proposalDetail.projectProposalId}</p>
                <p>
                  Propose Title:{" "}
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top-start"
                    title={proposalDetail.coverLetter}
                  >
                    <b>{proposalDetail.coverLetter}</b>
                  </BootstrapTooltip>
                </p>
                <p>
                  Cover Letter:{" "}
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top-start"
                    title={proposalDetail.description}
                  >
                    <b>{proposalDetail.description}</b>
                  </BootstrapTooltip>
                </p>
              </div>
            </div>
            <div className="hire-company-terms">
              <div className="hire-company-terms-heading">
                <img
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/proposedTerms.svg"
                  }
                  alt="storage"
                  className="storage"
                />
                <h4 className="hire-terms-text">Freelancer Offered Terms</h4>
              </div>
              <Skeleton count={2} isSkeletonLoading={isSkeletonLoading1} />
              <div hidden={isSkeletonLoading1} className="hire-terms-about">
                <div className="hire-terms-about-sec1">
                  <span>Project Type : </span>
                  <ProjectTypeBadge projectType={proposalDetail.projectType} />
                </div>
                <div className="hire-terms-about-sec2">
                  <div className="row">
                    <div
                      hidden={proposalDetail.projectType != "OfficeWork"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                          Salary :
                        </div>
                        <div className="project-terms-item-right">
                          {proposalDetail.currencyCode}{" "}
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(e.target.value, "amount")
                            }
                            readOnly={
                              activeFields.includes("amount") ? false : true
                            }
                            className={`${
                              activeFields.includes("amount") ? "active" : ""
                            }`}
                            value={proposalDetail.amount}
                          />
                          {activeFields.includes("amount") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Salary amount"}
                            >
                              <img
                                onClick={() => handleDeActive("amount")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Salary amount"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("amount")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={proposalDetail.projectType != "FreeContract"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                          Daily Rate :
                        </div>
                        <div className="project-terms-item-right">
                          {proposalDetail.currencyCode}{" "}
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(e.target.value, "dailyRate")
                            }
                            readOnly={
                              activeFields.includes("dailyRate") ? false : true
                            }
                            className={`${
                              activeFields.includes("dailyRate") ? "active" : ""
                            }`}
                            value={proposalDetail.dailyRate}
                          />
                          {activeFields.includes("dailyRate") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Daily Rate"}
                            >
                              <img
                                onClick={() => handleDeActive("dailyRate")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Daily Rate"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("dailyRate")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={
                        proposalDetail.projectType === "FreeContract" ||
                        proposalDetail.projectType === "Hourly"
                          ? false
                          : true
                      }
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                          Hourly Rate :
                        </div>
                        <div className="project-terms-item-right">
                          {proposalDetail.currencyCode}{" "}
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(e.target.value, "hourlyRate")
                            }
                            readOnly={
                              activeFields.includes("hourlyRate") ? false : true
                            }
                            className={`${
                              activeFields.includes("hourlyRate")
                                ? "active"
                                : ""
                            }`}
                            value={proposalDetail.hourlyRate}
                          />
                          {activeFields.includes("hourlyRate") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Hourly Rate"}
                            >
                              <img
                                onClick={() => handleDeActive("hourlyRate")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Hourly Rate"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("hourlyRate")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={proposalDetail.projectType != "Hourly"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img
                            style={{ width: "33px" }}
                            src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                          />
                          Condition :
                        </div>
                        <div className="project-terms-item-right">
                          <input
                            type="number"
                            onChange={(e) =>
                              handleUpdateWorkingHours(
                                e.target.value,
                                "hoursPerWeek"
                              )
                            }
                            readOnly={
                              activeFields.includes("availablePerWeek")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("availablePerWeek")
                                ? "active"
                                : ""
                            } custom-width1`}
                            value={proposalDetail.hoursPerWeek}
                          />{" "}
                          hrs/week 
                         {activeFields.includes("availablePerWeek") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Condition"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("availablePerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Condition"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("availablePerWeek")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      hidden={proposalDetail.projectType != "FreeContract"}
                      className="row w-100"
                    >
                      <div className="project-terms-item col-6">
                        <div className="project-terms-item-left">
                          <img
                            style={{ width: "33px" }}
                            src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                          />
                          Condition :
                        </div>
                        <div className="project-terms-item-right">
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(
                                e.target.value,
                                "hoursPerWeek"
                              )
                            }
                            readOnly={
                              activeFields.includes("availablehoursPerWeek")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("availablehoursPerWeek")
                                ? "active"
                                : ""
                            } custom-width`}
                            value={proposalDetail.hoursPerWeek}
                          />{" "}
                          hrs/week,{" "}
                          {activeFields.includes("availablehoursPerWeek") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Condition"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("availablehoursPerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Condition"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() =>
                                  handleActive("availablehoursPerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>

                      <div className="project-terms-item col-6">
                        <div className="project-terms-item-left">
                          <img
                            style={{ width: "33px" }}
                            src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                          />
                          Days per week :
                        </div>
                        <div className="project-terms-item-right">
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(
                                e.target.value,
                                "daysAttendingPerWeek"
                              )
                            }
                            readOnly={
                              activeFields.includes("availablePerWeek")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("availablePerWeek")
                                ? "active"
                                : ""
                            } custom-width1`}
                            value={proposalDetail.daysAttendingPerWeek}
                          />{" "}
                          days/week
                          {activeFields.includes("availablePerWeek") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Condition"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("availablePerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Condition"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("availablePerWeek")}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      hidden={proposalDetail.projectType != "OfficeWork"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img
                            style={{ width: "33px" }}
                            src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                          />
                          Days Per Week :
                        </div>
                        <div className="project-terms-item-right">
                          <input
                            type="number"
                            onChange={(e) => {
                              handleDaysChange(
                                e.target.value,
                                "daysAttendingPerWeek"
                              );
                              setDaysAlert(false);
                            }}
                            readOnly={
                              activeFields.includes("daysAttendingPerWeek")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("daysAttendingPerWeek")
                                ? "active"
                                : ""
                            }`}
                            value={proposalDetail.daysAttendingPerWeek}
                          />
                          {activeFields.includes("daysAttendingPerWeek") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Days Attending Per Week"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("daysAttendingPerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Days Attending Per Week"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() =>
                                  handleActive("daysAttendingPerWeek")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={
                        proposalDetail.projectType === "OfficeWork" ||
                        proposalDetail.projectType === "FreeContract"
                          ? false
                          : true
                      }
                      className="col-12 col-md-6"
                    >
                      <div
                        className="weekly-days-selection"
                        style={{
                          pointerEvents: proposalDetail.anyDaysFlag
                            ? "none"
                            : "",
                          marginTop: "15px",
                          marginLeft: "-5px",
                        }}
                      >
                        <span>
                          <div>Mon</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Mon")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Mon")
                            }
                            id="styled-checkbox-week-Mon"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Mon")}
                          />
                          <label for="styled-checkbox-week-Mon"></label>
                        </span>
                        <span>
                          <div>Tue</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Tue")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Tue")
                            }
                            id="styled-checkbox-week-tue"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Tue")}
                          />
                          <label for="styled-checkbox-week-tue"></label>
                        </span>
                        <span>
                          <div>Wed</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Wed")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Wed")
                            }
                            id="styled-checkbox-week-Wed"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Wed")}
                          />
                          <label for="styled-checkbox-week-Wed"></label>
                        </span>
                        <span>
                          <div>Thu</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Thu")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Thu")
                            }
                            id="styled-checkbox-week-Thu"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Thu")}
                          />
                          <label for="styled-checkbox-week-Thu"></label>
                        </span>
                        <span>
                          <div>Fri</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Fri")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Fri")
                            }
                            id="styled-checkbox-week-Fri"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Fri")}
                          />
                          <label for="styled-checkbox-week-Fri"></label>
                        </span>
                        <span>
                          <div style={{ color: "#6D0909" }}>Sat</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Sat")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Sat")
                            }
                            id="styled-checkbox-week-Sat"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Sat")}
                          />
                          <label for="styled-checkbox-week-Sat"></label>
                        </span>
                        <span>
                          <div style={{ color: "#6D0909" }}>Sun</div>
                          <input
                            className="custom-checkbox-styled"
                            checked={proposalDetail.weekDays.includes("Sun")}
                            onChange={(e) =>
                              handleUpdateWeekDays(e.target.checked, "Sun")
                            }
                            id="styled-checkbox-week-Sun"
                            type="checkbox"
                            value={proposalDetail.weekDays.includes("Sun")}
                          />
                          <label for="styled-checkbox-week-Sun"></label>
                        </span>
                      </div>
                      {daysAlert === false ? (
                        ""
                      ) : daysAlert === true ? (
                        <p style={{ marginTop: "0px" }} className="text-danger">
                          You have selected only{" "}
                          {proposalDetail.daysAttendingPerWeek} days
                        </p>
                      ) : (
                        <p
                          style={{ marginTop: "-30px" }}
                          className="text-danger"
                        >
                          You have not selected days
                        </p>
                      )}
                    </div>

                    <div
                      hidden={proposalDetail.projectType != "Milestone"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                          Milestone Amount :
                        </div>
                        <div className="project-terms-item-right">
                          {proposalDetail.currencyCode}{" "}
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(
                                e.target.value,
                                "finalizedMilestoneAmount"
                              )
                            }
                            readOnly={
                              activeFields.includes("finalizedMilestoneAmount")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("finalizedMilestoneAmount")
                                ? "active"
                                : ""
                            }`}
                            value={mileStoneDetail.length>0?mileStoneDetail.reduce(function (acc, obj) { return acc + Number(obj.offerAmount); }, 0) :proposalDetail.finalizedMilestoneAmount}
                          />
                          {activeFields.includes("finalizedMilestoneAmount") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save milestone amount"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("finalizedMilestoneAmount")
                                }
                                hidden={mileStoneDetail.length>0}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit milestone amount"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() => handleActive("finalizedMilestoneAmount")}
                                hidden={mileStoneDetail.length>0}
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={proposalDetail.projectType != "Milestone"}
                      className="col-12 col-md-6"
                    >
                      <div className="project-terms-item">
                        <div className="project-terms-item-left">
                          <img
                            style={{ width: "34px" }}
                            src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                          />
                          Project Duration :
                        </div>
                        <div className="project-terms-item-right">
                          <input
                            onChange={(e) =>
                              handleUpdateProposal(
                                e.target.value,
                                "estimateCompleteDateTime"
                              )
                            }
                            readOnly={
                              activeFields.includes("estimateCompleteDateTime")
                                ? false
                                : true
                            }
                            className={`${
                              activeFields.includes("estimateCompleteDateTime")
                                ? "active"
                                : ""
                            }`}
                            value={proposalDetail.estimateCompleteDateTime}
                          />

                          {activeFields.includes("estimateCompleteDateTime") ? (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              arrow
                              placement="top"
                              title={"Save Hourly Rate"}
                            >
                              <img
                                onClick={() =>
                                  handleDeActive("estimateCompleteDateTime")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                }
                              />
                            </BootstrapTooltip>
                          ) : (
                            <BootstrapTooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              title={"Edit Hourly Rate"}
                              arrow
                              placement="top"
                            >
                              <img
                                onClick={() =>
                                  handleActive("estimateCompleteDateTime")
                                }
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                }
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="checkbox-allow-area">
                        <div>
                          <input
                            className="custom-checkbox-styled"
                            id="Allow-to-change-participants"
                            type="checkbox"
                            onChange={() =>
                              toggleFlag("allowChangeParticipants")
                            }
                          />
                          <label for="Allow-to-change-participants">
                            Allow to change participants
                          </label>
                        </div>
                        <div>
                          <input
                            className="custom-checkbox-styled"
                            id="Allow-freelancer"
                            type="checkbox"
                            onChange={() => toggleFlag("allowManualTimeLog")}
                          />
                          <label for="Allow-freelancer">
                            Allow freelancer to log time manually if needed
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div hidden={!mileStoneDetail || mileStoneDetail.length===0}  className="hire-contract-note-area" style={{marginBottom:'0px'}}>
                  <Label
                    title={"Offered milestones"}
                    compulsory={true}
                    question={true}
                    primary={true}
                    icon={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/storage.svg"
                    }
                    color="#333333"
                  />
                 
                </div>   
                {mileStoneDetail.map((item,index)=>(<div>
         <div className="row" style={{marginBottom:'15px'}}>
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
                <div className="hire-contract-note-area">
                  <Label
                    title={"Contract Description"}
                    compulsory={true}
                    question={true}
                    primary={true}
                    icon={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/post_sticky.svg"
                    }
                    color="#333333"
                  />
                  <textarea
                    value={contractDescription}
                    onChange={(e) => {
                      setContractDescription(e.target.value);
                      setErrMsg({ contractDescription: "" });
                    }}
                    rows={6}
                  ></textarea>
                  {errMsg.contractDescription && (
                    <p className="text-danger">This field is required!</p>
                  )}
                </div>
                <div className="term-conditions">
                  <input
                    className="custom-checkbox-styled"
                    id={`termsConditions`}
                    type="checkbox"
                    onChange={() => {
                      toggleFlag("termsConditions");
                      setTermsAndConditionError(false);
                    }}
                  />
                  <label for={`termsConditions`}>
                    Yes, I understand and agree to the Bearole Terms of Service,
                    including the User Agreement and Privacy Policy.
                  </label>
                </div>
                {termsAndConditionError && (
                  <p style={{ marginTop: "0px" }} className="text-danger">
                    Please accept terms and conditions to continue
                  </p>
                )}
                <div
                  className="process-button"
                  onClick={() => {
                    onPageRedirectHandle();
                  }}
                >
                  <button>
                    Proceed {" "}
                    {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-1"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Modal
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content lg"
        show={isHireProposalPopupDisplay}
        onHide={() => {
          setIsHireProposalPopupDisplay(false);
        }}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Body
          style={{
            maxHeight: "887px",
            overflow: "hidden",
            padding: "0px 0px",
          }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="col-md-12">
                <div className="row">
                  <div className="card-box col-md-3 hire_confirmation_modal_candidateInfoWrapper">
                    <span>
                      <img
                        className="hire_confirmation_modal_candidateInfoWrapper_avatar"
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/client_img.jpg"
                        alt=""
                      />
                    </span>
                    <div className="hire_confirmation_modal_candidateInfoWrapper_infoMsg">
                      * We will notify you when{" "}
                      <strong className="text-capitalize text-green">
                        {/* {selectedProject.freelancerUserName} */}
                      </strong>{" "}
                      respond to your Offer.
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="col-md-12">
                      <div className="mt-4 mb-3 mx-3">
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          We Will politely notify the client that you are not
                          interested. The client will be able to view the reason
                          you've withdrawn your proposal.
                        </div>

                        <div className="custom-control custom-checkbox mb-4">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="isHireMoreFreelancer"
                            id="chkIsHireDoneForFreelancer"
                            onChange={(e) => {
                              setIsHireMoreFreelancer(true);
                            }}
                            checked={!isHireMoreFreelancer}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chkIsHireDoneForFreelancer"
                          >
                            {" "}
                            I'm done hiring for this project{" "}
                          </label>
                          <br />
                          <div>
                            When the freelancer accepts, your job post will be
                            closed to new proposals. Don't worry - the original
                            job post, all the freelancers you messaged,
                            shortlisted or archived for this job will be saved.
                          </div>
                        </div>

                        <div className="custom-control custom-checkbox mb-4">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="isHireMoreFreelancer"
                            id="chkIsHireMoreFreelancer"
                            onChange={(e) => {
                              setIsHireMoreFreelancer(false);
                            }}
                            checked={!isHireMoreFreelancer}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chkIsHireMoreFreelancer"
                          >
                            {" "}
                            I plan to hire more freelancers for this job{" "}
                          </label>
                          <br />
                          <div>
                            Your job post will remain open to new proposals.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => onHireMoreFreelancer("/my-contracts")}
            className="btn save_btn"
          >
            {" "}
            Go to My Contracts{" "}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    authUser: state.authReducer,
  };
}

export default connect(mapStateToProps, null)(HireFreelancer);

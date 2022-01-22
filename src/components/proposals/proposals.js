import React, { useState, useEffect } from "react";
import Status from "../status/status";
import ShowMoreText from "react-show-more-text";
import { ProjectType } from "../../utils/projectConst";
import Currency from "../currency";
import ProjectTypeBadge from "../project/projectTypeBadge";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";
import { onReduxRouteChange } from "../../store/action/action";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";
import FormatDWH from "../formatDWH";
import Format from "../numberFormat";
import moment from "moment";
import "./proposals.scss";
import WithDrawModal from "./withdrawModal";
import notifications from "../../utils/notifications";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Heading from "../postProject/heading";
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

export default function Proposals(props) {
  const [isWithdrawalProposalModelOpen, setIsWithdrawalProposalModelOpen] =
    useState(false);
  const [projectProposalWithdrawReasons, setProjectProposalWithdrawReasons] =
    useState([]);
  const [flag, setFlag] = useState(false);
  const [proposalDetail, setProposalDetail] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [proposalWithdraw, setProposalWithdraw] = useState({
    withdrawReason: "",
    withdrawMessage: "",
    isBlockFutureInvitation: false,
  });

  const dispatch = useDispatch();

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  useEffect(() => {
    bindProjectProposalWithdrawReasons();
  }, []);

  const bindProjectProposalWithdrawReasons = async () => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=ProjectProposalWithdrawReasons`,
      getOptions({})
    );
    if (result && result.success) {
      result.result.data[0].data.map((element, i) => {
        array.push({
          id: element.id,
          name: element.name.toString(),
        });
      });
      setProjectProposalWithdrawReasons(array);
    }
  };

  //#region Withdraw Proposal Methods
  const handleProposalWithdrawValidation = () => {
    let errorMessage = {};
    let formIsValid = true;

    if (
      proposalWithdraw.withdrawReason === null ||
      proposalWithdraw.withdrawReason === "" ||
      proposalWithdraw.withdrawReason === undefined
    ) {
      formIsValid = false;
      errorMessage["withdrawReason"] = languageType.REQUIRED_MESSAGE;
    } else if (
      proposalWithdraw.withdrawReason === "Other" &&
      (proposalWithdraw.withdrawMessage === null ||
        proposalWithdraw.withdrawMessage === "" ||
        proposalWithdraw.withdrawMessage === undefined)
    ) {
      formIsValid = false;
      errorMessage["withdrawMessage"] = languageType.REQUIRED_MESSAGE;
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };

  const onPageRedirectHandle = async (redirectTo) => {
    if (handleProposalWithdrawValidation()) {
      setLoading(true);
      let param = {
        freelancerReferenceId: proposalDetail.freelancerReferenceId,
        projectProposalId: proposalDetail.projectProposalId,
        projectId: proposalDetail.projectId,
        isWithdrawProposal: true,
        withdrawReason: proposalWithdraw.withdrawReason,
        withdrawMessage:
          proposalWithdraw.withdrawReason === "Other"
            ? proposalWithdraw.withdrawMessage
            : "",
        isBlockFutureInvitation: proposalWithdraw.isBlockFutureInvitation,
      };

      let result = await request(
        ENDPOINT["WithdrawProposal"],
        postOptions(param)
      );
      if (result.success) {
        setIsWithdrawalProposalModelOpen(false);
        onRouteChange(redirectTo);
        props.history.push(redirectTo);
        notifications.showSuccess(
          "You have successfully width draw your proposal "
        );
        setLoading(false);
        setTimeout(() => {
          props.handleWithdrawProposal();
        }, 2000);
      } else {
        setLoading(false);
        notifications.showError(result.message);
      }
    } else return;
  };
  const handleWithdrawProposal = (data) => {
    setProposalDetail(data);
    setIsWithdrawalProposalModelOpen(true);
  };
  const onRouteChange = (activeRoute) => {
    dispatch(onReduxRouteChange(activeRoute));
  };

  return (
    <div
      className="my-proposals-area client-proposal-card"
      style={{ margin: props.customSetting ? "13px 0px 20px 0px" : "" }}
    >
      <Heading
        heading={languageType.PROPOSALS_TEXT}
        icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/workDescription.svg"}
        color="#333333"
        fontSize="26px"
        fontWeight="600"
        fontFamily="Raleway"
      />
      {props.proposalData && props.proposalData.length > 0 ? (
        props.proposalData.map((item, index) => (
          <div className="client-proposal-card-item">
            <div className="row">
              <div className="col-12 col-md-5 col-lg-4">
                <div className="profile-detail-area">
                  <div className="project-purposal-client-profile">
                    <img
                      alt="No Application"
                      src={
                        item.userProfile?.userProfileUrl &&
                          item.userProfile?.userProfileUrl != " "
                          ? `https://${GET_IMAGE_PREFIX1}/${item.userProfile?.userProfileUrl}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                    />
                    <Status
                      status={item.userProfile?.onlineStatus?.toLowerCase() || "offline"}
                      {...props}
                    />
                  </div>
                  <div className="right-profile-detail-area">
                    <BootstrapTooltip title="Client Name" placement="top">
                    <h5>
                      {item.userProfile?.firstName &&
                        item.userProfile.firstName != " "
                        ? item.userProfile.firstName +
                        " " +
                        item.userProfile.lastName
                        : item.userProfile?.userName || "Freelancer Name"}{" "}
                    </h5>
                    </BootstrapTooltip>
                    <p>
                      Proposed{" "}
                      {moment(
                        moment(new Date(item.proposedDateTime).toString())
                      ).from(moment(new Date()))}
                    </p>
                    <p hidden={(item.freelancerType === "Organization" || (item.freelancers && item.freelancers.length > 0))}>
                      <Currency currency={item.currencyCode} />
                      {item.projectType &&
                        item.projectType.replace(/\s/g, "") ===
                        "FreeContract" && (
                          <Format
                            number={item.hourlyAmount}
                            currency={item.currencyCode}
                            redIcon
                          />
                        )}{" "}
                      {item.projectType &&
                        item.projectType.replace(/\s/g, "") ===
                        "FreeContract" && (
                          <>
                            /<FormatDWH hr currency={item.currencyCode} />
                          </>
                        )}
                      {item.projectType === "Hourly" && (
                        <Format
                          number={item.hourlyAmount}
                          currency={item.currencyCode}
                          redIcon
                        />
                      )}
                      {item.projectType === "Hourly" && (
                        <>
                          /<FormatDWH hr currency={item.currencyCode} />
                        </>
                      )}
                      {item.projectType === "Milestone" &&
                        (item.amount.trim() ? (
                          <Format
                            number={item.amount}
                            currency={item.currencyCode}
                            redIcon
                          />
                        ) : (
                          (
                            <Format
                              number={item.projectBudgetForMilestone}
                              currency={item.currencyCode}
                              redIcon
                            />
                          ) || "0"
                        ))}
                      {item.projectType === "OfficeWork" && (
                        <Format
                          number={item.amount}
                          currency={item.currencyCode}
                          redIcon
                        />
                      )}
                    </p>
                    <div className="progress_bar">
                      <div className="progress">
                        <div
                          className="progress-bar darkBlue_bar"
                          role="progressbar"
                          style={{
                            width:
                              "60%" /*  `${freelancer?.jobSuccessRatio}%` */,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div className="rating-area">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-7 col-lg-8">
                <div className="proposal-detail-right">
                  <h6
                    onClick={() =>
                      props.history.push(
                        `/project-proposal-detail?id=${item.projectId}&projectProposalId=${item.projectProposalId}`
                      )
                    }
                    title={item.projectTitle}
                    style={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    className="title-proposal"
                  >
                    <span>
                      {" "}
                      {item.coverLetter && item.coverLetter.slice(0, 26)}
                      {item.coverLetter && item.coverLetter.length > 26
                        ? "..."
                        : ""}{" "}
                    </span>{" "}
                    <ProjectTypeBadge projectType={item.projectType} />
                  </h6>
                  <p>
                    <ShowMoreText
                      lines={2}
                      more="show more"
                      less="Show Less"
                      className="content-css"
                      anchorClass="view-more-less"
                      expanded={false}
                    >
                      <p
                        style={{ color: "#333333 !important" }}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </ShowMoreText>
                  </p>
                  <BootstrapTooltip
                      placement="top"
                      title="The contract has been made for for this proposal"
                      arrow
                    >
                      <div
                        className="contract-made-alert-text"
                        hidden={item.proposalStatus==="Offered"}
                      >
                        {" "}
                      <i className="fa fa-check-square"></i>  The contract has been made for for this proposal <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/icons/agreement_business_contract_deal_handshake_icon.svg" />
                      </div>
                    </BootstrapTooltip>
                  <div className="proposal-client-button1">
                    <BootstrapTooltip
                      placement="top"
                      title="Message this freelancer"
                      arrow
                    >
                      <button className="message-button">Message</button>
                    </BootstrapTooltip>{" "}
                    <BootstrapTooltip
                      placement="top"
                      title="Edit Proposal"
                      arrow
                    >
                      <button
                        onClick={() => {
                          props.history.push(
                            `/project-post-proposal?projectId=${item.projectId}&projectProposalId=${item.projectProposalId}`
                          );
                        }}
                        className="hire-button"
                        hidden={item.proposalStatus!="Offered"}
                      >
                        {" "}
                        Edit
                      </button>
                    </BootstrapTooltip>
                    <BootstrapTooltip
                      placement="top"
                      title="Edit Proposal"
                      arrow
                    >
                      <button
                        onClick={() => handleWithdrawProposal(item)}
                        className="withdraw-button"
                        hidden={item.proposalStatus!="Offered"}
                      >
                        {" "}
                        Withdraw
                      </button>
                    </BootstrapTooltip>
                  
                  </div>
                </div>
              </div>
            </div>
            {
              item.freelancers && item.freelancers.length > 0 && item.freelancers.map((freelancer) => (
                <div className="company-freelancer-area"
                >
                  <h3>Proposed Freelancer</h3>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-5">
                      <div className="profile-detail-area">
                        <div className="project-purposal-client-profile">
                          <img
                            alt="No Application"
                            src={
                              freelancer.freelancer?.userProfileUrl &&
                                freelancer.freelancer?.userProfileUrl != " "
                                ? `https://${GET_IMAGE_PREFIX1}/${freelancer.freelancer?.userProfileUrl}`
                                : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                            }
                          />
                          <Status
                            status={freelancer.freelancer?.onlineStatus?.toLowerCase() || "offline"}
                            {...props}
                          />
                        </div>
                        <div className="right-profile-detail-area">
                          <h5>
                            {freelancer.freelancer?.firstName &&
                              freelancer.freelancer.firstName != " "
                              ? freelancer.freelancer.firstName +
                              " " +
                              freelancer.freelancer.lastName
                              : freelancer.freelancer?.userName ||
                              "Freelancer Name"}{" "}
                          </h5>
                          <div className="job-type-available">Part Time</div>
                          <p>
                            Proposed{" "}
                            {moment(
                              moment(new Date(item.proposedDateTime).toString())
                            ).from(moment(new Date()))}
                          </p>
                          <p  > Proposed at {item.projectType &&
                            item.projectType.replace(/\s/g, "") ===
                            "FreeContract" && (
                              <>
                                {" "}
                                <Format
                                  number={freelancer.hourlyRate}
                                  currency={
                                    freelancer.currencyCode || props.currencyCode
                                  }
                                />
                                /{" "}
                                <FormatDWH
                                  hr
                                  currency={
                                    freelancer.currencyCode || props.currencyCode
                                  }
                                />
                              </>
                            )}
                            {item.projectType === "Hourly" && (
                              <>
                                {" "}
                                <Format
                                  number={freelancer.hourlyRate}
                                  currency={freelancer.currencyCode || props.currencyCode}
                                />
                                /{" "}
                                <FormatDWH
                                  hr
                                  currency={freelancer.currencyCode || props.currencyCode}
                                />
                              </>
                            )}
                            {item.projectType === "Milestone" &&
                              (item.amount.trim() ? (
                                <Format
                                  number={freelancer.amount}
                                  currency={freelancer.currencyCode || props.currencyCode}
                                />
                              ) : (
                                <Format
                                  number={freelancer.projectBudgetForMilestone}
                                  currency={freelancer.currencyCode || props.currencyCode}
                                />
                              ))}
                            {item.projectType === "OfficeWork" && (
                              <Format
                                number={freelancer.amount}
                                currency={freelancer.currencyCode || props.currencyCode}
                              />
                            )}{" "}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-7">
                      <div className="skills-area">
                        <h3> <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/preferences_project.svg"} />Skills</h3>
                        <div
                          className="project-post-confirmation-sub-item desc"
                          style={{ width: "80%" }}
                        >
                          {
                            freelancer.freelancer.skills.length > 0 && freelancer.freelancer.skills.map((skill) => (
                              <a
                                style={{
                                  margin: "2px",
                                  padding: "1px 8px 1px 8px",
                                }}
                                className="blue_div_new"
                              >
                                {skill.skillName}
                              </a>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }


          </div>
        ))
      ) : (
        <div className="no-applicant-are-project-detail">
          <div>
            <div className="no-applicant-are-project-detail-left">
              <img alt="No Proposal" src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/noApplicant.svg" />
            </div>
            <div className="no-applicant-are-project-detail-right">
              <div>
                <h5>{props.languageType.DON_NOT_HAVE_PROPOSAL}</h5>
                <center>
                  <button
                    onClick={() => {
                      props.history.push("/all-projects");
                    }}
                  >
                    {props.languageType.SEE_MORE_RECOMMENDED_PROJECT}
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      )}

      <WithDrawModal
        isWithdrawalProposalModelOpen={isWithdrawalProposalModelOpen}
        handleClose={() => setIsWithdrawalProposalModelOpen(false)}
        projectProposalWithdrawReasons={projectProposalWithdrawReasons}
        errorMessage={errorMessage}
        proposalWithdraw={proposalWithdraw}
        handleUpdateProposalWithdraw={(proposalWithdraw) => {
          setProposalWithdraw(proposalWithdraw);
          setFlag(!flag);
        }}
        onPageRedirectHandle={() => onPageRedirectHandle("/my-proposals")}
        loading={loading}
        setErrorMessage={(errorMessage) => setErrorMessage(errorMessage)}
        modalKey="Proposals"
      />
    </div>
  );
}

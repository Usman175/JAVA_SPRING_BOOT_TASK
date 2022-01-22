import React from "react";
import "./proposals.scss";
import Status from "../status/status";
import ShowMoreText from "react-show-more-text";
import { ProjectType } from "../../utils/projectConst";
import Tooltip from "@material-ui/core/Tooltip";
import Currency from "../currency";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";
import moment from "moment";
import Format from "../numberFormat";
import FormatDWH from "../formatDWH";
import ProjectTypeBadge from "../project/projectTypeBadge";
export default function ProposalsClient(props) {
  const onHirePageRedirect = (
    freelancerUserId,
    projectId,
    projectProposalId,
    userProfile
  ) => {
    if (userProfile.organizationId) {
      props.history.push(
        "/hire-company?id=" +
          projectId +
          "&userId=" +
          freelancerUserId +
          "&projectProposalId=" +
          projectProposalId
      );
    } else {
      props.history.push(
        "/hire-freelancer?id=" +
          projectId +
          "&userId=" +
          freelancerUserId +
          "&projectProposalId=" +
          projectProposalId
      );
    }
  };
  return (
    <div
      className="my-proposals-area client-proposal-card"
      style={{ margin: props.customSetting ? "13px 0px 20px 0px" : "" }}
    >
      {props.proposalData && props.proposalData.length > 0 ? (
        props.proposalData.map((item, index) => (
          <div className="client-proposal-card-item">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="profile-detail-area">
                  <div className="project-purposal-client-profile">
                    <img
                      alt="No Application"
                      src={
                        item.userProfile?.individualFreelancerId &&
                        item.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${item.userProfile?.userProfileUrl}`
                          : item.userProfile?.organizationId &&
                            item.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${item.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                    />
                    <Status
                      status={
                        item.userProfile?.onlineStatus?.toLowerCase() ||
                        "offline"
                      }
                      {...props}
                    />
                  </div>
                  <div className="right-profile-detail-area">
                    <h5>
                      {item.userProfile?.organizationId
                        ? item.userProfile.companyName
                        : item.userProfile?.individualFreelancerId
                        ? item.userProfile.userName
                        : item.userProfile?.userName ||
                          (item.freelancerType === "Organization" &&
                          item.freelancers.length > 0
                            ? "Organization Name"
                            : "Freelancer Name")}{" "}
                    </h5>
                    <p>
                      Proposed{" "}
                      {moment(
                        moment(new Date(item.proposedDateTime).toString())
                      ).from(moment(new Date()))}
                    </p>
                    <p hidden={item.freelancers && item.freelancers.length > 0}>
                      {" "}
                      {props.projecType &&
                        props.projecType.replace(/\s/g, "") ===
                          "FreeContract" && (
                          <>
                            {" "}
                            <Format
                              number={item.hourlyAmount}
                              currency={item.currencyCode || props.currencyCode}
                            />
                            /{" "}
                            <FormatDWH
                              hr
                              currency={item.currencyCode || props.currencyCode}
                            />
                          </>
                        )}
                      {props.projecType === "Hourly" && (
                        <>
                          {" "}
                          <Format
                            number={item.hourlyAmount}
                            currency={item.currencyCode || props.currencyCode}
                          />
                          /{" "}
                          <FormatDWH
                            hr
                            currency={item.currencyCode || props.currencyCode}
                          />
                        </>
                      )}
                      {props.projecType === "Milestone" &&
                        (item.amount.trim() ? (
                          <Format
                            number={item.amount}
                            currency={item.currencyCode || props.currencyCode}
                          />
                        ) : (
                          <Format
                            number={item.projectBudgetForMilestone}
                            currency={item.currencyCode || props.currencyCode}
                          />
                        ))}
                      {props.projecType === "OfficeWork" && (
                        <Format
                          number={item.amount}
                          currency={item.currencyCode || props.currencyCode}
                        />
                      )}{" "}
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
              <div className="col-12 col-md-8">
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
                  >
                    {item.coverLetter && item.coverLetter.slice(0, 26)}
                    {item.coverLetter && item.coverLetter.length > 26
                      ? "..."
                      : ""}
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
                  <div className="proposal-client-button">
                    <Tooltip
                      placement="top"
                      title="Message this freelancer"
                      arrow
                    >
                      <button className="message-button">Message</button>
                    </Tooltip>{" "}
                    <Tooltip placement="top" title={item.proposalStatus==="Offered"?"Hire this freelancer":item.proposalStatus} arrow>
                      <button
                        onClick={() => {
                          if(item.proposalStatus==="Offered"){
                            onHirePageRedirect(
                              item.freelancerReferenceId,
                              item.projectId,
                              item.projectProposalId,
                              item.userProfile
                            );
                          }
                         
                        }}
                        className="hire-button"
                      >
                        {
                          item.proposalStatus==="Offered"?"Hire":item.proposalStatus
                        }
                        
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            {item.freelancers &&
              item.freelancers.length > 0 &&
              item.freelancers.map((freelancer, index) => (
                <div className="company-freelancer-area">
                  <h3>Proposed Freelancer</h3>
                  <div className="row">
                    <div className="col-12 col-md-4">
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
                            status={
                              freelancer.freelancer?.onlineStatus?.toLowerCase() ||
                              "offline"
                            }
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
                            Proposed time{" "}
                            {moment(
                              moment(new Date(item.proposedDateTime).toString())
                            ).from(moment(new Date()))}
                          </p>
                          <p>
                            {" "}
                            Proposed at{" "}
                            {props.projecType &&
                              props.projecType.replace(/\s/g, "") ===
                                "FreeContract" && (
                                <>
                                  {" "}
                                  <Format
                                    number={freelancer.hourlyRate}
                                    currency={
                                      freelancer.currencyCode ||
                                      props.currencyCode
                                    }
                                  />
                                  /{" "}
                                  <FormatDWH
                                    hr
                                    currency={
                                      freelancer.currencyCode ||
                                      props.currencyCode
                                    }
                                  />
                                </>
                              )}
                            {props.projecType === "Hourly" && (
                              <>
                                {" "}
                                <Format
                                  number={freelancer.hourlyRate}
                                  currency={
                                    freelancer.currencyCode ||
                                    props.currencyCode
                                  }
                                />
                                /{" "}
                                <FormatDWH
                                  hr
                                  currency={
                                    freelancer.currencyCode ||
                                    props.currencyCode
                                  }
                                />
                              </>
                            )}
                            {props.projecType === "Milestone" &&
                              (item.amount.trim() ? (
                                <Format
                                  number={freelancer.amount}
                                  currency={
                                    freelancer.currencyCode ||
                                    props.currencyCode
                                  }
                                />
                              ) : (
                                <Format
                                  number={freelancer.projectBudgetForMilestone}
                                  currency={
                                    freelancer.currencyCode ||
                                    props.currencyCode
                                  }
                                />
                              ))}
                            {props.projecType === "OfficeWork" && (
                              <Format
                                number={freelancer.amount}
                                currency={
                                  freelancer.currencyCode || props.currencyCode
                                }
                              />
                            )}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="skills-area">
                        <h3>
                          {" "}
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/preferences_project.svg"
                            }
                          />
                          Skills
                        </h3>
                        <div
                          className="project-post-confirmation-sub-item desc"
                          style={{ width: "80%" }}
                        >
                          {freelancer.freelancer?.skills?.length > 0 &&
                            freelancer.freelancer?.skills.map((skill) => (
                              <a
                                style={{
                                  margin: "2px",
                                  padding: "1px 8px 1px 8px",
                                }}
                                className="blue_div_new"
                              >
                                {skill.skillName}
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))
      ) : (
        <div className="no-applicant-are-project-detail">
          <div>
            <div className="no-applicant-are-project-detail-left">
              <img
                alt="No proposal"
                src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/noApplicant.svg"
              />
            </div>
            <div className="no-applicant-are-project-detail-right">
              <div>
                <h5>{props.languageType.DON_NOT_HAVE_PROPOSAL}</h5>
                <center>
                  <button
                    onClick={() => {
                      props.history.push("/all-freelancer");
                    }}
                  >
                    {props.languageType.SEE_MORE_RECOMMENDED_FREELANCER}
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

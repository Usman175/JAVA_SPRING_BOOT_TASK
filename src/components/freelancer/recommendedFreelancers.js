import React from "react";
import "../proposals/proposals.scss";
import Status from "../status/status";
import ShowMoreText from "react-show-more-text";
import Tooltip from "@material-ui/core/Tooltip";
import { ENDPOINT } from "../../utils/endpoint";
import { postOptions } from "../../utils/httpConfig";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { getProfileImage } from "../../utils/getProfileUrl";
export default function RecommendedFreelancers(props) {
    const [loading,setLoading]=React.useState(false)

 const handleSendInvitation = async (individualFreelancerId,organizationId) => {
    setLoading(individualFreelancerId||organizationId)

    let params = {
      projectId: props.projectId,
      individualFreelancerId: individualFreelancerId || organizationId,
      message:
        "I'd like to invite you to take a look at the job I've posted. Please submit a proposal if you're available and interested.",
    };
    let result = await request(
      `${ENDPOINT["InterviewInvitation"]}?projectId=${params.projectId}&individualFreelancerId=${params.individualFreelancerId}&message=${params.message}`,
      postOptions(params)
    );
    if (result.success) {
      notifications.showSuccess("Invitation sent to this freelancer ");
      setLoading(false)
    } else {
      notifications.showWarning("some error occurred please try later! ");
      setLoading(false)
    }
  };
  return (
    <div
      className="my-proposals-area client-proposal-card"
      style={{ margin: props.customSetting ? "13px 0px 20px 0px" : "" }}
    >
      {props.freelancerData && props.freelancerData.length > 0 ? (
        props.freelancerData.map((item, index) => (
          <div className="client-proposal-card-item">
              <div className={`recommended-freelancer-badge ${item.individualFreelancerId?"Freelancer":"Company"}`}>
                  {
                      item.individualFreelancerId?"Freelancer":"Company"
                  }
              </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="profile-detail-area">
                  <div className="project-purposal-client-profile">
                    <img
                      alt="No Application"
                      src={getProfileImage(
                        item?.individualFreelancerId &&
                        item?.userProfileUrl
                          ?item?.userProfileUrl
                          : item?.organizationId &&
                            item?.companyLogo
                          ? item?.companyLogo
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png")
                      }
                    />
                    <Status
                      status={
                        item?.onlineStatus?.toLowerCase() ||
                        "offline"
                      }
                      {...props}
                    />
                  </div>
                  <div className="right-profile-detail-area">
                    <h5>
                      {item?.organizationId
                        ? item.companyName
                        : item?.individualFreelancerId
                        ? item.userName
                        : item?.userName ||
                          (item.freelancerType === "Organization" &&
                          item.freelancers.length > 0
                            ? "Organization Name"
                            : "Freelancer Name")}{" "}
                    </h5>
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
                    title={item.individualFreelancerId?item.userTitle:item.companyTitle}
                    style={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.individualFreelancerId && item.userTitle?.slice(0, 26)}
                    {item.individualFreelancerId && item.userTitle.length > 26
                      ? "..."
                      : ""}
                       {item.organizationId && item.companyTitle?.slice(0, 26)}
                    {item.organizationId && item.companyTitle.length > 26
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
                        dangerouslySetInnerHTML={{ __html:item.individualFreelancerId? item.professionalOverview:item.companyIntroduction}}
                      ></p>
                    </ShowMoreText>
                  </p>
                  <div className="proposal-client-button">
                    <Tooltip placement="top" title={"Invite here"} arrow>
                      <button
                        onClick={() => {
                            handleSendInvitation(item.individualFreelancerId,item.organizationId)
                        }}
                        className="hire-button"
                      >
                       Invite   {loading===item.individualFreelancerId || loading===item.organizationId ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
                        
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
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

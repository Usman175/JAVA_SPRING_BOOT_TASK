import React, { useState } from "react";
import "./organizationProfile.scss";
import ReactPlayer from "react-player";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import Skeleton from "../../../components/skeleton/skeleton";
import request from "../../../utils/request";
import Modal from "react-bootstrap/Modal";
import v4 from "uuid";
import { ENDPOINT } from "../../../utils/endpoint";
import SendInvitationModal from "../../../components/invitation/sendInvitation";
import PortFolioModalDetail from "../../../components/invitation/portfolio";
import OfficeModalDetail from "../../../components/invitation/officePhotos";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import ReviewProjectHistory from "../../../components/reviewProjectHistory";
import Pagination from "../../../components/pagination";
import Tooltip from "@material-ui/core/Tooltip";
import Rating from "@material-ui/lab/Rating";
import { useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Format from "../../../components/numberFormat";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import { getProfileImage } from "../../../utils/getProfileUrl";

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

function OrganizationProfile(props) {
  const [projectType, setProjectType] = useState("completed");
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isSkeletonLoading1, setIsSkeletonLoading1] = useState(false);
  const [organizationDetail, setOrganizationDetail] = useState({});
  const [officePhoto, setOfficePhoto] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [show, setShow] = useState(false);
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [members, setMembers] = useState([]);
  const [introductionVideo, setIntroductionVideo] = useState("");
  const [projectDetail, setProjectDetail] = useState({});
  const [Thumbnail, setThumbnail] = useState("");
  const [view, setView] = useState(1);
  const [showInvitation, setShowInvitation] = useState(false);
  const [organizationMembers,setOrganizationMembers] = useState('');
  const [logo, setLogo] = useState("");
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 1,
    total: 10,
  });
  const [showProjectHistoryReviewModal, setShowProjectHistoryReviewModal] =
  useState(false);

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  React.useEffect(() => {
    getCompanyDetail();
    getCompanyMembers();
    getFreelancerProjects();
  }, []);

  const getFreelancerProjects = async (move) => {
    let organizationId = props.match.params.organizationId;
    if (organizationId) {
      setProjectLoading(true);
      let pageNumber = pagination.pageNumber;
      if (move === "next") {
        setPagination({
          ...pagination,
          pageNumber: pagination.pageNumber + 1,
        });
        pageNumber = pageNumber + 1;
      } else if (move === "prev") {
        setPagination({
          ...pagination,
          pageNumber: pagination.pageNumber - 1,
        });
        pageNumber = pageNumber - 1;
      }
      let result = await request(
        `${ENDPOINT["GetFreelancerProjectSummary"]}?individualFreelancerId=${organizationId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
        getOptions({})
      );
      if (result.entries) {
        setProjectData(result.entries);
        setPagination({
          pageNumber: result.pageNumber || result.pageNumer,
          pageSize: result.pageSize,
          total: result.total,
        });
        setProjectLoading(false);
      } else {
      }
      setProjectLoading(false);
    }
  };

  const getCompanyMembers = async () => {
    let organizationId = props.match.params.organizationId;
    if (organizationId) {
      setIsSkeletonLoading1(true);
      let result = await request(
        `${ENDPOINT["GetFreelancersByOrganization"]}?organizationId=${organizationId}`,
        postOptions()
      );
      if (result.success) {
        setIsSkeletonLoading1(false);
        setMembers(result.result);
        if(result.result && result.result !=" "){
          setOrganizationMembers(result.result?.length)
        }
      } else {
        setIsSkeletonLoading1(false);
      }
    }
  };

  const getCompanyDetail = async () => {
    let organizationId = props.match.params.organizationId;
    if (organizationId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetOrganization"]}?organizationId=${organizationId}`,
        getOptions()
      );
      if (result.success) {
        setIsSkeletonLoading(false);
        setOrganizationDetail(result.result);
        if (result.result.portfolios && result.result.portfolios.length > 0) {
          result.result.portfolios.map((item, index) => {
            getImageUrlPortFolio(item, index);
          });
        }
        getImageUrl(
          result.result.profileImageUrl || result.result?.companyLogo,
          "userProfileUrl"
        );
        if (result.result.officePhotos[0]) {
          setOfficePhoto(result.result.officePhotos);
        }

        if (result.result?.companyLogo) {
          getImageUrl(result.result?.companyLogo, "logo");
        }
        if (result.result.introductionVideo) {
          getImageUrl(result.result.introductionVideo, "introductionVideo");
        }
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  const getImageUrlPortFolio = async (data, index) => {
    let result = await request(
      ENDPOINT["S3KeyToURL"] + "?key=" + data.portfolioImage,
      getOptions()
    );
    if (result.success && result.result) {
      let obj = {
        id: v4(),
        projectName: data.projectName,
        projectUrl: data.portfolioUrl,
        selectedFile: data.portfolioImage,
        description: data.description,
        fileDetails: result.result,
      };
      setPortfolio((state) => [...state, obj]);
      // setFlag(flag?false:true)
    }
  };
  const getImageUrl = async (image, type) => {
    let result = await request(
      ENDPOINT["S3KeyToURL"] + "?key=" + image,
      getOptions()
    );
    if (result.success) {
      if (type === "officePhoto") {
        setOfficePhoto(result.result);
      }
      if (type === "userProfileUrl") {
        setProfilePicture(result.result);
      }
      if (type === "logo") {
        setLogo(result.result);
      }
      if (type === "introductionVideo") {
        setIntroductionVideo(result.result);
      }
    }
  };
  const earnings = () => {
    return (
      <div className="tooltip-wrapper">
        <p>Total: $3900.00</p>
        <p>This week: $350.00</p>
      </div>
    );
  };
  return (
    <div className="organizationfreelancer-profile-area-page">
      <div className="container">
        <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      </div>
      <div hidden={isSkeletonLoading} className="freelancer-profile-top-area">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h1>
                {" "}
                {organizationDetail.companyTitle?.slice(0, 40)}{" "}
                {organizationDetail.companyTitle?.length > 40 ? "..." : ""}
              </h1>
              <p style={{ maxWidth: "100ch" }}>
                {" "}
                {organizationDetail.companyIntroduction?.slice(0, 420)}
                {organizationDetail.companyIntroduction?.length > 420
                  ? "..."
                  : ""}
              </p>
            </div>
            <div
              hidden={sessionStorage.userType === "Client"}
              className="col-md-3"
            >
              <div className="invite-button-area">
                <button
                  onClick={() =>
                    props.history.push("/company-invite-freelancer")
                  }
                >
                  Invite people
                </button>
              </div>
            </div>
            <div
              hidden={sessionStorage.userType === "Freelancer" || sessionStorage.userType === "Organization"}
              className="col-md-3"
            >
              <div className="invite-button-area">
                <button onClick={() => setShowInvitation(true)}>{languageType.INVITE_TEXT}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        hidden={isSkeletonLoading}
        className="freelancer-profile-detail-area"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12" style={{ paddingRight: "0px" }}>
              <div className="profile-section-card customer-height-col">
                <div className="profile-section-left">
                <div
                    hidden={officePhoto.length === 0}
                    className="customer-height-col"
                  >
                    <div className="portfolio-area-profile">
                      <div className="portfolio-area-profile-top">
                        <h6>Office Photos ({officePhoto.length})</h6>
                        {officePhoto && officePhoto.length > 0 && (
                          <p
                            onClick={() => {
                              setShowOfficePhotos(true);
                            }}
                          >
                            View More
                          </p>
                        )}
                      </div>
                      <img
                        src={
                          officePhoto && officePhoto[0]
                            ? `https://dhihitu47nqhv.cloudfront.net/${officePhoto[0]}`
                            : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/office-pic.jpg"
                        }
                      />
                    </div>
                  </div>
                  <div className="profile-rating-stats-area">
                     <div className="rating-area">
                     <Rating name="size-small" size="small" value={organizationDetail.feedBackScore && organizationDetail.feedBackScore!=" " ? Number(organizationDetail.feedBackScore):0} readOnly  />
                     </div>
                    <div hidden={false} className="profile-members">
                      {languageType.MEMBERS_TEXT} : {organizationMembers?`${organizationMembers} Members`:"No member yet"} 
                    </div>
                    {/* <br /> */}
                    <div hidden={false} className="profile-success-ratio-area">
                      <p>{languageType.SUCCESSFULLY_RATE} : 60%</p>
                      <div className="profile-success-ratio-bar">
                        {" "}
                        <div
                          style={{ width: "60%" }}
                          className="profile-success-ratio-bar-inner"
                        ></div>
                      </div>
                    </div>
                    <div hidden={false} className="profile-success-ratio-area">
                      <p>{languageType.MANAGEMENT_RATE} : 80%</p>
                      <div className="profile-success-ratio-bar">
                        {" "}
                        <div
                          style={{ width: "80%" }}
                          className="profile-success-ratio-bar-inner"
                        ></div>
                      </div>
                    </div>
                    <div hidden={false} className="profile-members">
                      {languageType.ACTIVE_SINCE_TEXT} : April 2020
                    </div>
                    <br />
                    <div className="portfolio-area-profile">
                      <div className="portfolio-area-profile-top">
                        <h6>Portfolio ({portfolio.length})</h6>
                        {portfolio.length > 0 && (
                          <p
                            onClick={() => {
                              setShowPortfolio(true);
                            }}
                          >
                            View More
                          </p>
                        )}
                        {portfolio.length > 0 &&
                          portfolio.map((item, index) => {
                            if (index + 1 <= view) {
                              return (
                                <div className="portfolio-picture">
                                  <img
                                    src={
                                      item.fileDetails
                                        ? item.fileDetails
                                        : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/portfolio.jpg"
                                    }
                                  />
                                  <h3>Project Name</h3>
                                  <p> {item.projectName} </p>
                                  <h3>Description</h3>
                                  <p> {item.description} </p>
                                  <p>{item.projectUrl}</p>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                    <div className="profile-pic-area">
                      <div className="profile-pic">
                        <img
                          src={
                            profilePicture
                              ? profilePicture
                              : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/client_img.jpg"
                          }
                          title="Company logo"
                        />
                      </div>
                      <div className="profile-detail-area">
                        <span>Contact Person:</span>
                        <h6>{organizationDetail.contactFirstName}{" "}
                          {organizationDetail.contactLastName}</h6>
                        <p>
                          {
                            organizationDetail.addressInfo?.userCountry
                          }
                          {" "}
                          {
                            organizationDetail.addressInfo?.userCity
                          }
                        </p>
                        <div className="chat-button-area">
                          {languageType.CHAT_TEXT} <i className="fa fa-comment"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="profile-section-card customer-height-col">
                <div className="profile-section-right-side">
                  <div className="profile-section-right-top-heading">
                    <h3>
                      <img
                        src={
                          logo
                            ? logo
                            : "https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png"
                        }
                      />
                      <span> {organizationDetail.companyName} </span>
                      <div className="rating-area">
                                 <Rating name="size-small" size="small" value={organizationDetail.feedBackScore && organizationDetail.feedBackScore!=" " ? Number(organizationDetail.feedBackScore):0} readOnly  />
                                   </div>
                    </h3>
                    {/* <img src={logo} /> */}
                    {/*  <div className="profile-section-right-hire">Hire</div> */}
                  </div>
                  <div className="profile-section-heading-below-text">
                    {organizationDetail.companyIntroduction}
                  </div>
                  {introductionVideo && (
                    <div className="profile-video-description">
                      <ReactPlayer
                        url={
                          introductionVideo
                            ? introductionVideo
                            : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleVideos/AdobeStock_449354140_Video_HD_Preview.mov"
                        }
                        width="100%"
                        height="400px"
                        playing={Thumbnail ? true : false}
                        controls={Thumbnail ? true : false}
                      // playIcon={ <i className="fa fa-play"></i>}
                      // light={Thumbnail}
                      />
                      {/* <img src={kycProvePhoto} alt={"kycProvePhoto"} /> */}
                      {Thumbnail ? (
                        ""
                      ) : (
                        <i
                          onClick={() => setThumbnail(true)}
                          className="fa fa-play"
                        ></i>
                      )}
                    </div>
                  )}

                  <div className="profile-section-heading-below-text1">
                    {
                      organizationDetail.companyInfo
                        ?.companyIntroductionContents
                    }
                  </div>
                  <div hidden={false} className="project-detail-area">
                    <div className="project-detail-tab">
                      <div
                        onClick={() => setProjectType("completed")}
                        className={`project-tab ${
                          projectType === "completed" ? "active" : ""
                        }`}
                      >
                        {" "}
                        {languageType.COMPLETED_PROJECTS}
                      </div>
                      <div
                        onClick={() => setProjectType("ongoing")}
                        className={`project-tab ${
                          projectType === "ongoing" ? "active" : ""
                        }`}
                      >
                        {" "}
                        {languageType.ONGOING_PROJECT}
                      </div>
                    </div>
                    <Skeleton count={3} isSkeletonLoading={projectLoading} />
                    {projectType === "completed" && (
                      <div
                        hidden={projectLoading}
                        className="project-detail-tabs-area"
                      >
                        {projectData.map((item, index) => {
                          if (
                            item.projectStatus === "Closed" &&
                            projectType === "completed"
                          ) {
                            return (
                              <div className="project-detail-tabs-item">
                                <div className="project-detail-tabs-item-top">
                                  <h6
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>{
                                      setShowProjectHistoryReviewModal(true)
                                      setProjectDetail(item)
                                    }}
                                  >
                                    {item.jobTitle}
                                  </h6>
                                  <ProjectTypeBadge
                                    projectType={item.projectType || `Hourly`}
                                  />
                                </div>
                                <div className="project-detail-tabs-item-bottom">
                                  <p>
                                    Sonny has Completed his work at the best
                                  </p>
                                  <div className="rating-area">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                  </div>
                                  <div className="price-area">
                                    {item.projectType === "Milestone" ? (
                                      item.projectContracts[0]
                                        ?.finalizedMilestoneAmount ? (
                                        <Format
                                          currency={item.currencyCode || "USD"}
                                          number={
                                            item.projectContracts[0]
                                              .finalizedMilestoneAmount
                                          }
                                        />
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "OfficeWork" ? (
                                      item.projectContracts[0]
                                        .finalizedSalarayAmount ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedSalarayAmount
                                            }
                                          />
                                          /day
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "Hourly" ? (
                                      item.projectContracts[0]
                                        .finalizedHourlyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedHourlyRate
                                            }
                                          />
                                          /hr
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "FreeContract" ? (
                                      item.projectContracts[0]
                                        .finalizedHourlyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedHourlyRate
                                            }
                                          />
                                          /hr
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "FreeContract" ? (
                                      item.projectContracts[0]
                                        .finalizedDailyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedDailyRate
                                            }
                                          />
                                          /day
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}

                    {projectType === "ongoing" && (
                      <div
                        hidden={projectLoading}
                        className="project-detail-tabs-area"
                      >
                        {projectData.map((item, index) => {
                          if (
                            item.projectStatus != "Closed" &&
                            projectType === "ongoing"
                          ) {
                            return (
                              <div className="project-detail-tabs-item">
                                <div className="project-detail-tabs-item-top">
                                  <h6
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>{
                                      setShowProjectHistoryReviewModal(true)
                                      setProjectDetail(item)
                                    }}
                                  >
                                    {item.jobTitle}
                                  </h6>
                                  <ProjectTypeBadge
                                    projectType={item.projectType || `Hourly`}
                                  />
                                </div>
                                <div className="project-detail-tabs-item-bottom">
                                  <p>
                                    Sonny has Completed his work at the best
                                  </p>
                                  <div className="rating-area">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                  </div>
                                  <div className="price-area">
                                    {item.projectType === "Milestone" ? (
                                      item.projectContracts[0]
                                        ?.finalizedMilestoneAmount ? (
                                        <Format
                                          currency={item.currencyCode || "USD"}
                                          number={
                                            item.projectContracts[0]
                                              .finalizedMilestoneAmount
                                          }
                                        />
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "OfficeWork" ? (
                                      item.projectContracts[0]
                                        .finalizedSalarayAmount ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedSalarayAmount
                                            }
                                          />
                                          /day
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "Hourly" ? (
                                      item.projectContracts[0]
                                        .finalizedHourlyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedHourlyRate
                                            }
                                          />
                                          /hr
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "FreeContract" ? (
                                      item.projectContracts[0]
                                        .finalizedHourlyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedHourlyRate
                                            }
                                          />
                                          /hr
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {item.projectType === "FreeContract" ? (
                                      item.projectContracts[0]
                                        .finalizedDailyRate ? (
                                        <>
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
                                            number={
                                              item.projectContracts[0]
                                                .finalizedDailyRate
                                            }
                                          />
                                          /day
                                        </>
                                      ) : (
                                        "N/A"
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                    {!projectLoading && projectData?.length <= 0 && (
                      <NoDataAvailable
                        title="Sorry no project exists yet!"
                        buttonText="View more projects"
                        path="/all-projects"
                        color={"#0d2146"}
                        {...props}
                      />
                    )}
                    {projectData?.length > 0 && (
                      <Pagination
                        isPreviousPage={
                          pagination.pageNumber > 1 ? true : false
                        }
                        isNextPage={
                          pagination.pageNumber * pagination.pageSize <
                          pagination.total
                            ? true
                            : false
                        }
                        lastPkEvaluatedTrack={projectData}
                        pageNumber={pagination.pageNumber}
                        moveBack={() => getFreelancerProjects("prev")}
                        moveNext={() => getFreelancerProjects("next")}
                      />
                    )}
                  </div>
                  <div className="profile-section-member-area">
                    <Skeleton
                      count={1}
                      isSkeletonLoading={isSkeletonLoading1}
                    />
                  </div>
                  <div
                    /* hidden={isSkeletonLoading1} */ className="profile-section-member-area"
                  >
                    <h6>{languageType.MEMBERS_TEXT}</h6>
                    {members && members.length > 0 ? (
                      members.map((item) => (
                        <div className="freelancer-user-item">
                          <div className="freelancer-user-item-top">
                            <BootstrapTooltip
                              placement="top"
                              title={earnings()}
                            >
                              <div className="freelancer-user-item-profile">
                                <img
                                  src={getProfileImage(item.userProfileUrl)}
                                />
                                <div className="profile-detail">
                                  <p>{item.freelancerName}</p>
                                  <span>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                  </span>
                                </div>
                              </div>
                            </BootstrapTooltip>
                            <div className="freelancer-user-item-role">
                              <div>
                                <BootstrapTooltip
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  arrow
                                  placement="top"
                                  title={"Save role"}
                                >
                                  <p>{item.userTitle}</p>
                                </BootstrapTooltip>
                              </div>
                            </div>
                            {/* {item.team && (
                        <div className="freelancer-user-item-team">{item.team}</div>
                      )} */}
                          </div>
                          <div className="freelancer-profile-rate">
                            <div className="row">
                              <div className="col-12">
                                <p>{item.professionalOverview}</p>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="project-terms-item">
                                  <div className="project-terms-item-left">
                                    <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                                    {languageType.HOURLY_RATE} :
                                  </div>
                                  <div className="project-terms-item-right">
                                    US$ {item.hourlyRate || "0.00"}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="project-terms-item">
                                  <div className="project-terms-item-left">
                                    <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                                    {languageType.DAILY_RATE} :
                                  </div>
                                  <div className="project-terms-item-right">
                                    US$ {item.dailyRate || "0.00"}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="project-terms-item">
                                  <div className="project-terms-item-left">
                                    <img src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg" />
                                    {languageType.CONDITION_TEXT} :
                                  </div>
                                  <div className="project-terms-item-right">
                                    {item.attendHourOfWeek}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="member-view-card">
                        {languageType.NO_MEMBERS_EXISTS_YET}
                      </div>
                    )}
                  </div>

                  <div className="bottom-buttons-area">
                    <button
                      hidden={true}
                      onClick={() => { }}
                      className="back-button"
                    >
                      {languageType.BACK}
                    </button>
                    <button
                      hidden={true}
                      onClick={() => {
                        props.history.goBack();
                        window.scrollTo({
                          top: "0",
                          behavior: "smooth",
                        });
                      }}
                      className="next-button"
                    >
                      {languageType.BACK}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <SendInvitationModal
        {...props}
        showInvitation={showInvitation}
        type="company"
        organizationId={organizationDetail.organizationId}
        setShowInvitation={setShowInvitation}
      />
      <PortFolioModalDetail
        portfolio={portfolio}
        showPortfolio={showPortfolio}
        setShowPortfolio={setShowPortfolio}
        {...props}
      />
      <Modal
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content jungle-modal-content-custom"
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        backdrop={true}
      >
        <Modal.Header className={`position-relative jungle-modal-header`}>
          <div className="customer-invitation-header">
            <img
              src={"https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"}
              alt=""
            />
            <h3>Invite people to join company</h3>
          </div>

          <span onClick={() => setShow(false)} className="custom-close">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="hide_scroll_bar invitation_modal">
          <div className="people-invite-area">
            <label>
              {" "}
              <i className="fa fa-envelope"></i> Email address{" "}
            </label>
            <input type="text" placeholder="enter email address" />
          </div>
          <div className="invite-button-area ">
            <button>Invite</button>
          </div>
        </Modal.Body>
      </Modal>{" "}
            {/* Unhide to show review project history */}
            <ReviewProjectHistory
        show={showProjectHistoryReviewModal}
        setShowProjectHistoryReviewModal={setShowProjectHistoryReviewModal}
        projectDetail={projectDetail}
        
      />
            <OfficeModalDetail
        officePhoto={officePhoto}
        showOfficePhotos={showOfficePhotos}
        setShowOfficePhotos={setShowOfficePhotos}
        {...props}
      />
    </div>
  );
}

export default OrganizationProfile;

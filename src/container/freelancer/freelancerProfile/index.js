import React, { useState } from "react";
import "./freelancerProfile.scss";
import v4 from "uuid";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import SkeletonFreelancerProfile from "./skeletonFreelancerProfile";
import Skeleton from "../../../components/skeleton/skeleton";
import SkeletonProjectStatusTab from "./skeletonProjectStatusTab";
import request from "../../../utils/request";
import Format from "../../../components/numberFormat";
import { ENDPOINT } from "../../../utils/endpoint";
import ReactPlayer from "react-player";
import FormatDWH from "../../../components/formatDWH";
import SendInvitationModal from "../../../components/invitation/sendInvitation";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import ReviewProjectHistory from "../../../components/reviewProjectHistory";
import PortFolioModalDetail from "../../../components/invitation/portfolio";
import ShowMoreText from "react-show-more-text";
import Pagination from "../../../components/pagination";
import OfficeModalDetail from "../../../components/invitation/officePhotos";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import moment from "moment";
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

function FreelancerProfile(props) {
  const [projectStatusTab, setProjectStatusTab] = useState("completed"); //[projectType, setProjectType]
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [freelancerDetail, setFreelancerDetail] = useState({});
  const [kycProvePhoto, setKycProvePhoto] = useState("");
  const [showKYC, setShowKYC] = useState(false);
  const [officePhoto, setOfficePhoto] = useState("");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [introductionVideo, setIntroductionVideo] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [showInvitation, setShowInvitation] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [companyIndex, setCompanyIndex] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 1,
    total: 10,
  });
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const authReducer = useSelector((state) => state.authReducer);
  const [showProjectHistoryReviewModal, setShowProjectHistoryReviewModal] =
    useState(false);
  const [view, setView] = useState(1);

  React.useEffect(() => {
    getFreelancerDetail();
    getFreelancerProjects();
  }, []);

  const getFreelancerProjects = async (move) => {
    let freelancerId = props.match.params.freelancerId;
    if (freelancerId) {
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
        `${ENDPOINT["GetFreelancerProjectSummary"]}?individualFreelancerId=${freelancerId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
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

  const getFreelancerDetail = async () => {
    /* freelancerId */
    let freelancerId = props.match.params.freelancerId;
    if (freelancerId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${freelancerId}`,
        getOptions()
      );
      if (result.success && result.result) {
        setIsSkeletonLoading(false);
        setFreelancerDetail(result.result);
        getImageUrl(result.result.kycProvePhoto, "kycProvePhoto");
        getImageUrl(result.result.userProfileUrl, "userProfileUrl");
        if (result.result.introductionVideo) {
          getImageUrl(result.result.introductionVideo, "introductionVideo");
        }
        if (result.result.portfolios && result.result.portfolios.length > 0) {
          result.result.portfolios.map((item, index) => {
            getImageUrlPortFolio(item, index);
          });
        }
        if (result.result.officePhotos && result.result.officePhotos[0]) {
          setOfficePhoto(result.result.officePhotos);
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
        fileName: data.portfolioImage,
        selectedFile: data.portfolioUrl,
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
      if (type === "kycProvePhoto") {
        setKycProvePhoto(result.result);
      }
      if (type === "userProfileUrl") {
        setUserProfileUrl(result.result);
      }
      if (type === "introductionVideo") {
        setIntroductionVideo(result.result);
      }
    }
  };
  const handleIncrease = () => {
    setCompanyIndex(companyIndex + 1);
  };
  const handleDecrease = () => {
    if (companyIndex > 0) {
      setCompanyIndex(companyIndex - 1);
    }
  };
  return (
    <>
      <div className="freelancer-profile-area-page2">
        <div className="freelancer-profile-top-area">
          <div className="container">
            <div className="row">
              <div className="col-md-9 showMoreText_freelancerProfile">
                <h1 title={freelancerDetail.userTitle}>
                  {freelancerDetail.userTitle?.slice(0, 40)}{" "}
                  {freelancerDetail.userTitle?.length > 40 ? "..." : ""}
                </h1>
                <ShowMoreText
                  lines={3}
                  more={languageType.SHOW_MORE}
                  less={languageType.SHOW_LESS}
                  className="content-css"
                  anchorClass="view-more-less"
                  expanded={false}
                >
                  <span
                    title={freelancerDetail.professionalOverview}
                    style={{ maxWidth: "100ch" }}
                  >
                    {freelancerDetail.professionalOverview?.slice(0, 420)}{" "}
                    {freelancerDetail.professionalOverview?.length > 420
                      ? ""
                      : ""}
                  </span>
                </ShowMoreText>
                {/* <p>I am good developer</p> */}
              </div>
              <div
                hidden={sessionStorage.userType === "Freelancer"}
                className="col-md-3"
              >
                <div className="invite-button-area">
                  <button onClick={() => setShowInvitation(true)}>
                    {languageType.INVITE_TEXT}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
        
        <div hidden={!isSkeletonLoading} className="skeletonFreelancer_Pc">
          <SkeletonFreelancerProfile
            count={1}
            isSkeletonLoading={isSkeletonLoading}
          />
        </div>

        <div hidden={!isSkeletonLoading} className="container"> 
          <div className="skeletonLoading_mobile">
            <Skeleton count={4} isSkeletonLoading={isSkeletonLoading} />
          </div>
        </div>

        <div
          hidden={isSkeletonLoading}
          className="freelancer-profile-detail-area"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="profile-section-card customer-height-col">
                  <div
                    hidden={
                      authReducer?.freelancerAuth.individualFreelancerId !==
                      props.match.params.freelancerId
                    }
                    className="update-freelancer-profile-button"
                  >
                    <BootstrapTooltip
                      title="Update your profile"
                      placement="top"
                    >
                      <i
                        onClick={() => {
                          props.history.push("/create-freelancer?type=update");
                        }}
                        className="fa fa-pencil-square-o"
                      ></i>
                    </BootstrapTooltip>
                  </div>
                  <div className="profile-section-left">
                    <div className="top-profile-area">
                      <div className="profile-pic-area">
                        <div className="profile-pic">
                          <img
                            src={
                              userProfileUrl
                                ? userProfileUrl
                                : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                            }
                          />
                        </div>
                        <div className="profile-detail-area">
                          <h6 hidden={!freelancerDetail?.companies}>
                            <BootstrapTooltip
                              placement="top"
                              title={"Show more companies"}
                            >
                              <i
                                onClick={handleDecrease}
                                hidden={
                                  freelancerDetail?.companies?.length === 1
                                }
                                className="fa fa-angle-left"
                              ></i>
                            </BootstrapTooltip>
                            Member of{" "}
                            {freelancerDetail?.companies &&
                              freelancerDetail?.companies[companyIndex]
                                ?.companyName}{" "}
                            <BootstrapTooltip
                              placement="top"
                              title={"Show more companies"}
                            >
                              <i
                                onClick={handleIncrease}
                                hidden={
                                  freelancerDetail?.companies?.length === 1
                                }
                                className="fa fa-angle-right"
                              ></i>
                            </BootstrapTooltip>
                          </h6>

                          <p>
                            {freelancerDetail.firstName}{" "}
                            {freelancerDetail.lastName}
                          </p>
                          <div className="stats-profile-row">
                            <span>
                              {freelancerDetail.profileHourlyRate ? (
                                <Format
                                  currency={freelancerDetail.currencyCode}
                                  number={
                                    freelancerDetail.profileHourlyRate || "12"
                                  }
                                />
                              ) : (
                                ""
                              )}
                              /
                              <FormatDWH
                                hr
                                currency={freelancerDetail.currencyCode}
                              />
                            </span>{" "}
                            <span>
                              {freelancerDetail.profileDailyRate ? (
                                <Format
                                  currency={freelancerDetail.currencyCode}
                                  number={
                                    freelancerDetail.profileDailyRate || "100"
                                  }
                                />
                              ) : (
                                ""
                              )}
                              /
                              <FormatDWH
                                day
                                currency={freelancerDetail.currencyCode}
                              />
                            </span>
                          </div>
                          <div className="rating-area">
                          <Rating name="size-small" size="small" value={freelancerDetail.feedBackScore && freelancerDetail.feedBackScore!=" " ? Number(freelancerDetail.feedBackScore):0} readOnly  />
                                    </div>
                          <div className="stats-profile-row1">
                            <span>
                              {freelancerDetail.addressInfo?.userCity}
                            </span>{" "}
                            <span>
                              {freelancerDetail.addressInfo?.userCountry}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="chat-button-area">
                        {languageType.CHAT_TEXT}{" "}
                        <i className="fa fa-comment"></i>
                      </div>
                    </div>
                    <div className="profile-rating-stats-area">
                      <div className="profile-availability">
                        {languageType.AVAILABILITY_TEXT}
                      </div>
                      <div className="profile-availability-sub">
                        {/* <h6> Availability</h6> */}
                        <p>{freelancerDetail.availablePerWeek}</p>
                      </div>
                      <br />
                      <div className="profile-availability">
                        Registered Bearole.com Since
                      </div>
                      <div className="profile-availability-sub">
                        {/* <h6> Availability</h6> */}
                        <p>
                          {freelancerDetail.createdDateTime &&
                            moment(freelancerDetail.createdDateTime).format(
                              "ll"
                            )}
                        </p>
                      </div>
                      <br />
                      <div
                        hidden={!freelancerDetail.linkedInProfileUrl}
                        className="profile-availability"
                      >
                        Linkedin Profile Url:
                      </div>
                      <div className="profile-availability-sub">
                        {/* <h6> Availability</h6> */}
                        <p>{freelancerDetail.linkedInProfileUrl}</p>
                      </div>
                      <br />
                      {/* <div className="resume-confirmation-area">
                     <h6> Resume</h6>
                     <div className="resume-button" >
                       {
                         freelancerDetail.userResumes &&  freelancerDetail.userResumes.length>0?"View  PDF":"Register Resume"
                       }
                       
                     </div>
                    </div> */}
                      <br />
                      <div className="profile-availability-sub">
                        <h6>{languageType.LANGUAGE_TEXT}</h6>
                        {freelancerDetail.languages &&
                        freelancerDetail.languages.length > 0
                          ? freelancerDetail.languages.map((item) => (
                              <p>
                                <b>
                                  {item.language} {item.language ? ":" : ""}{" "}
                                </b>{" "}
                                {item.level}{" "}
                              </p>
                            ))
                          : ""}
                      </div>

                      <br />

                      <div className="portfolio-area-profile">
                        <div className="portfolio-area-profile-top">
                          <h6>
                            {languageType.PORTFOLIO_TEXT} ({portfolio.length})
                          </h6>
                          {portfolio.length > 0 && (
                            <p
                              onClick={() => {
                                setShowPortfolio(true);
                              }}
                            >
                              {languageType.VIEW_MORE}
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
                                    <h3>{languageType.INTRODUCTION_TEXT}</h3>
                                    <p> {item.description} </p>
                                    <p>{item.projectUrl}</p>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>

                      <div
                        hidden={officePhoto.length === 0}
                        className=" customer-height-col"
                      >
                        <div className="profile-section-left">
                          <div className="portfolio-area-profile-top">
                            <h6>Office Photos ({officePhoto.length})</h6>
                            {officePhoto && officePhoto.length > 0 && (
                              <p
                                onClick={() => {
                                  setShowOfficePhotos(true);
                                }}
                              >
                                {languageType.VIEW_MORE}
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

                      <div hidden={true} className="portfolio-area-profile">
                        <div className="portfolio-area-profile-top">
                          <h6>{languageType.KYC_PROVE_PHOTO}</h6>
                          <p
                            onClick={() => {
                              setShowKYC(showKYC ? false : true);
                            }}
                          >
                            {showKYC ? "Hide" : "Show"}{" "}
                          </p>
                          {showKYC && (
                            <div className="portfolio-picture">
                              <img
                                src={
                                  kycProvePhoto
                                    ? kycProvePhoto
                                    : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/portfolio.jpg"
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="time-tracker-application-download">
                    <h4>
                      <i className="	fa fa-clock-o"></i> Bearole time tracker app
                    </h4>
                    <a
                      href="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/timetrackerapplication/Bearole.exe"
                      download
                    >
                      <SystemUpdateAltIcon /> Click here to download
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="profile-section-card">
                  <div className="profile-section-right-side">
                    <div className="profile-section-right-top-heading">
                      <h3>
                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png" />
                        <span>
                          {" "}
                          {freelancerDetail.firstName +
                            " " +
                            freelancerDetail.lastName}{" "}
                        </span>
                        <div hidden={true} className="active-value-profile">
                          Active since : April 2020
                        </div>
                      </h3>
                      <div hidden={true} className="profile-section-right-hire">
                        Hire
                      </div>
                    </div>
                    <div className="profile-section-heading-below-text">
                      {freelancerDetail.userTitle}
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
                      {freelancerDetail.selfIntroduction}
                    </div>
                    <div className="skill-area">
                      <h2>{languageType.SKILLS_TEXT}</h2>
                      <div className="skill-area-detail">
                        {freelancerDetail.skills &&
                        freelancerDetail.skills.length > 0
                          ? freelancerDetail.skills.map((skill) => (
                              <div className="skill-single">
                                {skill.skillName}
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                    <div className="skill-area">
                      <h2>{languageType.BUSINESS_SCOPE}</h2>
                      <h3>
                        {languageType.BUSINESS_SCOPE} :{" "}
                        {freelancerDetail.serviceScopes &&
                          freelancerDetail.serviceScopes.length > 0 &&
                          freelancerDetail.serviceScopes[0].serviceScope}
                      </h3>
                      <div className="skill-area-detail">
                        {languageType.BUSINESS_SUB_SCOPE} :{" "}
                        {freelancerDetail.serviceScopes &&
                        freelancerDetail.serviceScopes.length > 0
                          ? freelancerDetail.serviceScopes[0].subServiceScope.map(
                              (item) => (
                                <div className="skill-single">{item}</div>
                              )
                            )
                          : ""}
                      </div>
                    </div>
                    <div hidden={false} className="project-detail-area">
                      <div className="project-detail-tab">
                        <div
                          onClick={() => setProjectStatusTab("completed")}
                          className={`project-tab ${
                            projectStatusTab === "completed" ? "active" : ""
                          }`}
                        >
                          {" "}
                          {languageType.COMPLETED_PROJECTS}
                        </div>
                        <div
                          onClick={() => setProjectStatusTab("ongoing")}
                          className={`project-tab ${
                            projectStatusTab === "ongoing" ? "active" : ""
                          }`}
                        >
                          {" "}
                          {languageType.ONGOING_PROJECT}
                        </div>
                      </div>
                      <SkeletonProjectStatusTab count={3} isSkeletonLoading={projectLoading} />
                      <div className="skeletonLoading_mobile">
                      <Skeleton count={3} isSkeletonLoading={projectLoading} />
                      </div>
                      {projectStatusTab === "completed" && (
                        <div
                          hidden={projectLoading}
                          className="project-detail-tabs-area"
                        >
                          {projectData.map((item, index) => {
                            if (
                              item.projectStatus === "Closed" &&
                              projectStatusTab === "completed"
                            ) {
                              return (
                                <div className="project-detail-tabs-item">
                                  <div className="project-detail-tabs-item-top">
                                    <h6
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowProjectHistoryReviewModal(true);
                                        setProjectDetail(item);
                                      }}
                                    >
                                      {item.jobTitle}
                                    </h6>
                                    <ProjectTypeBadge
                                      projectType={item.projectType || `Hourly`}
                                    />
                                  </div>
                                  <p>
                                    {item.jobDescription &&
                                      item.jobDescription.slice(0, 150)}
                                    {item.jobDescription &&
                                    item.jobDescription.length > 150
                                      ? "..."
                                      : ""}{" "}
                                  </p>
                                  <div className="project-detail-tabs-item-bottom">
                                    <BootstrapTooltip title="Feedback message">
                                      <p>
                                        {item.projectContracts[0]?.freelancerFeedback?.feedbackMessage.slice(
                                          0,
                                          25
                                        ) || "Not available"}
                                        {item.projectContracts[0]?.freelancerFeedback?.feedbackMessage?.slice(
                                          0,
                                          25
                                        ).length > 15
                                          ? "..."
                                          : ""}
                                      </p>
                                    </BootstrapTooltip>
                                    <div className="rating-area">
                                    <Rating name="size-small" size="small" value={(Number(item.projectContracts[0]
                                      ?.freelancerFeedback?.totalScore || "0")/20*5)} readOnly  />
                                    </div>
                                    <div className="price-area">
                                      {item.projectType === "Milestone" ? (
                                        item.projectContracts[0]
                                          ?.finalizedMilestoneAmount ? (
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
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
                                            /hr{"   "}
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
                                            /hr{"   "}
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

                      {projectStatusTab === "ongoing" && (
                        <div
                          hidden={projectLoading}
                          className="project-detail-tabs-area"
                        >
                          {projectData.map((item, index) => {
                            if (
                              item.projectStatus != "Closed" &&
                              projectStatusTab === "ongoing"
                            ) {
                              return (
                                <div className="project-detail-tabs-item">
                                  <div className="project-detail-tabs-item-top">
                                    <h6
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setShowProjectHistoryReviewModal(true);
                                        setProjectDetail(item);
                                      }}
                                    >
                                      {item.jobTitle}
                                    </h6>
                                    <ProjectTypeBadge
                                      projectType={
                                        item.projectType || `Hourly`
                                      }
                                    />
                                  </div>
                                  <div className="project-detail-tabs-item-bottom">
                                    <p>
                                      {item.jobDescription &&
                                        item.jobDescription.slice(0, 150)}
                                      {item.jobDescription &&
                                      item.jobDescription.length > 150
                                        ? "..."
                                        : ""}{" "}
                                    </p>
                                    <div className="price-area">
                                      {item.projectType === "Milestone" ? (
                                        item.projectContracts[0]
                                          ?.finalizedMilestoneAmount ? (
                                          <Format
                                            currency={
                                              item.currencyCode || "USD"
                                            }
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

                    <div className="bottom-buttons-area">
                      <button
                        hidden={true}
                        onClick={() => {}}
                        className="back-button"
                      >
                        {languageType.CANCEL_TEXT}
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
      <OfficeModalDetail
        officePhoto={officePhoto}
        showOfficePhotos={showOfficePhotos}
        setShowOfficePhotos={setShowOfficePhotos}
        {...props}
      />
      <PortFolioModalDetail
        portfolio={portfolio}
        showPortfolio={showPortfolio}
        setShowPortfolio={setShowPortfolio}
        {...props}
      />
      <SendInvitationModal
        {...props}
        showInvitation={showInvitation}
        individualFreelancerId={freelancerDetail.individualFreelancerId}
        type="freelancer"
        setShowInvitation={setShowInvitation}
      />
      {/* Unhide to show review project history */}
      <ReviewProjectHistory
        show={showProjectHistoryReviewModal}
        setShowProjectHistoryReviewModal={setShowProjectHistoryReviewModal}
        projectDetail={projectDetail}
        {...props}
        freelancerId={ props.match.params.freelancerId}
      />
    </div>
    </>
  );
}

export default FreelancerProfile;

import React, { useState } from "react";
import "./clientProfile.scss";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import request from "../../../utils/request";
import notifications from "../../../utils/notifications";
import { ENDPOINT } from "../../../utils/endpoint";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import Rating from "@material-ui/lab/Rating";
import SkeletonClientProfile from "./skeletonClientProfile";
import SkeletonProjectStatusTabClient from "./skeletonProjectStatusTabClient";
import Skeleton from "../../../components/skeleton/skeleton";
import Pagination from "../../../components/pagination";
import Format from "../../../components/numberFormat";
import { getProfileImage } from "../../../utils/getProfileUrl";
import PortFolioModalDetail from "../../../components/invitation/portfolio";
import OfficeModalDetail from "../../../components/invitation/officePhotos";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import ReviewProjectHistory from "../../../components/reviewProjectHistory";
import v4 from "uuid";
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
function CLientProfile(props) {
  const [projectStatusTab, setProjectStatusTab] = useState("completed"); //[projectType, setProjectType]
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [introductionVideo, setIntroductionVideo] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [clientDetail, setClientDetail] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [officePhoto, setOfficePhoto] = useState("");
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [view, setView] = useState(1);
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
    getClientProjects();
  }, []);
  const getClientProjects = async (move) => {
    let clientId = props.match.params.clientId;
    if (clientId) {
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
        `${ENDPOINT["GetClientProjectSummary"]}?clientId=${clientId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
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
  const getCompanyDetail = async () => {
    let clientId = props.match.params.clientId;
    if (clientId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetUserClient"]}?clientId=${clientId}`,
        getOptions()
      );
      if (result.success) {
        setClientDetail(result.result);
        if (result.result.portfolios && result.result.portfolios.length > 0) {
          result.result.portfolios.map((item, index) => {
            getImageUrlPortFolio(item, index);
          });
        }
        if (
          result.result.officePhotos &&
          result.result.officePhotos.length > 0
        ) {
          setOfficePhoto(result.result.officePhotos);
        }
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
  return (
    <div className="organization-freelancer-profile-area-page">
      <div className="freelancer-profile-top-area">
        <div className="container">
          <h1>Bearole.com</h1>
          <p>Your most trustable global outsourcing partner</p>
        </div>
      </div>

      
      <div hidden={!isSkeletonLoading} className="skeletonClient_Pc">
        <SkeletonClientProfile
          count={1}
          isSkeletonLoading={isSkeletonLoading}
        />
      </div>

      <div hidden={!isSkeletonLoading} className="container">
        <div className="skeletonLoading_mobile">
          <Skeleton count={4} isSkeletonLoading={isSkeletonLoading} />
        </div>
      </div>

      <div hidden={isSkeletonLoading} className="client-profile-detail-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12" style={{ paddingRight: "0px" }}>
              <div className="profile-section-card customer-height-col">
                <div className="profile-section-left">
                  <div className="top-profile-area">
                    <div className="profile-pic-area">
                      <div className="profile-pic">
                        <img
                          src={
                            clientDetail.userProfileUrl
                              ? getProfileImage(clientDetail.userProfileUrl)
                              : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/client_img.jpg"
                          }
                        />
                      </div>
                      <div className="profile-detail-area">
                        <h6 hidden={true}> ABC Company</h6>
                        <p>
                          {clientDetail.firstName + " " + clientDetail.lastName}{" "}
                        </p>
                        <div className="stats-profile-row">
                          <span>US$5.00/hr</span> <span>US$240.00/day</span>
                        </div>
                        <div className="rating-area">
                          <Rating name="size-small" size="small" value={clientDetail.feedBackScore && clientDetail.feedBackScore!=" " ? Number(clientDetail.feedBackScore):0} readOnly  />
                                    </div>
                        <div className="stats-profile-row1">
                          <span>{clientDetail.addressInfo?.userCity} </span>{" "}
                          <span>{clientDetail.country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="chat-button-area">
                      Chat <i className="fa fa-comment"></i>
                    </div>
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
                                <h3>Description</h3>
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
                    className="customer-height-col"
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
                    <div className="profile-members">
                      Total Transactions : US$90,000.000
                    </div>
                    <div className="profile-members">Total Contracts : 234</div>
                    <div className="profile-members">
                      Average hourly Rate: US$14.00
                    </div>
                    <div className="profile-members">
                      Average Daily Rate: US$140.00
                    </div>
                    <div className="profile-members">
                      Active since: April 2021
                    </div>
                    <hr />
                    <div className="profile-members">
                      {/*    IT Industry */} {clientDetail.businessType}
                    </div>
                    <div className="profile-members">
                      {/*    IT Industry */} {clientDetail.businessType}
                    </div>
                    <div className="profile-members">
                      No. of employees : {clientDetail.noOfEmployee}
                    </div>
                    <br />
                    <div
                      hidden={!clientDetail.linkedInProfileUrl}
                      className="profile-members"
                    >
                      Linkedin Profile Url:
                      {clientDetail.linkedInProfileUrl}
                    </div>
                    <div className="profile-members">
                      website: {clientDetail.website && "https://"}
                      {clientDetail.website}
                    </div>
                    <div className="profile-members">
                      Annual Sales: {clientDetail.annualSales}
                    </div>
                    <hr />
                    <div className="profile-members">
                      Store ID: 4154df5asdads
                    </div>
                    <div className="profile-members">
                      VISA CARD 1231 1232 **** ****
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 ">
              <div className="profile-section-card customer-height-col">
                <div className="profile-section-right-side">
                  <div className="profile-section-right-top-heading">
                    <h3>
                      <img src="https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png" />
                      <span> {clientDetail.userTitle} </span>
                    </h3>
                    <div className="profile-section-right-hire">Request</div>
                  </div>
                  {/* <div className="profile-section-heading-below-text">
                  {clientDetail.userTitle}
                  </div> */}

                  <div className="profile-section-heading-below-text1">
                    {clientDetail.professionalOverview}
                  </div>
                  {clientDetail.introductionVideo && (
                    <div className="profile-video-description">
                      <ReactPlayer
                        url={
                          clientDetail.introductionVideo
                            ? `https://dhihitu47nqhv.cloudfront.net/${clientDetail.introductionVideo}`
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
                  <div className="business-scope-profile-area ">
                    <h2>Business Area</h2>
                    <h3>
                      Business Scope :{" "}
                      {clientDetail.serviceScopes &&
                        clientDetail.serviceScopes.length > 0 &&
                        clientDetail.serviceScopes[0].serviceScope}
                    </h3>
                    {/* <div className="skill-area-detail">
                      Business Sub Scopes :{" "}
                      {clientDetail.serviceScopes &&
                      clientDetail.serviceScopes.length > 0
                        ? clientDetail.serviceScopes[0].subServiceScope.map(
                            (item) => <div className="skill-single">{item}</div>
                          )
                        : ""}
                    </div> */}
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
                    <SkeletonProjectStatusTabClient count={3} isSkeletonLoading={projectLoading} />
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
                                    style={{ cursor: "pointer" }}
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
                                      {item.projectContracts[0]?.clientFeedback?.feedbackMessage.slice(
                                        0,
                                        25
                                      ) || "Not available"}
                                      {item.projectContracts[0]?.clientFeedback?.feedbackMessage?.slice(
                                        0,
                                        25
                                      ).length > 15
                                        ? "..."
                                        : ""}
                                    </p>
                                  </BootstrapTooltip>
                                  <div className="rating-area">
                                    <Rating
                                      name="size-small"
                                      size="small"
                                      value={
                                        (Number(
                                          item.projectContracts[0]
                                            ?.clientFeedback?.totalScore || "0"
                                        ) /
                                          20) *
                                        5
                                      }
                                      readOnly
                                    />
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
                                      setProjectDetail(item);
                                      setShowProjectHistoryReviewModal(true);
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
                                    {" "}
                                    {item.jobDescription &&
                                      item.jobDescription.slice(0, 150)}
                                    {item.jobDescription &&
                                    item.jobDescription.length > 150
                                      ? "..."
                                      : ""}{" "}
                                  </p>
                                  {/* <div className="rating-area">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                  </div> */}
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
                                          {" "}
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
                        moveBack={() => getClientProjects("prev")}
                        moveNext={() => getClientProjects("next")}
                      />
                    )}
                  </div>

                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Office modal to show the office photos */}
      <OfficeModalDetail
        officePhoto={officePhoto}
        showOfficePhotos={showOfficePhotos}
        setShowOfficePhotos={setShowOfficePhotos}
        {...props}
      />
      {/* Office modal to show the portfolios */}
      <PortFolioModalDetail
        portfolio={portfolio}
        showPortfolio={showPortfolio}
        setShowPortfolio={setShowPortfolio}
        {...props}
      />
      {/* open modal to show the history of project 
       this modal is static yet
      */}
      <ReviewProjectHistory
        show={showProjectHistoryReviewModal}
        setShowProjectHistoryReviewModal={setShowProjectHistoryReviewModal}
        projectDetail={projectDetail}
        {...props}
      />
      <br />
      <br />
    </div>
  );
}

export default CLientProfile;

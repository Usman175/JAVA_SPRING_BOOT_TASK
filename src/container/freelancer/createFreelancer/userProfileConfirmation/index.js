import React, { useState } from "react";
import "./userProfileConfirmation.scss";
import v4 from "uuid";
import ProjectTypeBadge from "../../../../components/project/projectTypeBadge";
import Skeleton from "../../../../components/skeleton/skeleton";
import request from "../../../../utils/request";
import Format from "../../../../components/numberFormat";
import { ENDPOINT } from "../../../../utils/endpoint";
import ReactPlayer from "react-player";
import FormatDWH from "../../../../components/formatDWH";
import PortFolioModalDetail from "../../../../components/invitation/portfolio";
import OfficeModalDetail from "../../../../components/invitation/officePhotos";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../../utils/httpConfig";
import { getProfileImage } from "../../../../utils/getProfileUrl";
import notifications from "../../../../utils/notifications";


function FreelancerProfileConfirmation(props) {
  const [projectType, setProjectType] = useState("completed");
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [freelancerDetail, setFreelancerDetail] = useState({});
  const [officePhoto, setOfficePhoto] = useState("");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [kycProvePhoto, setKycProvePhoto] = useState("");
  const [showKYC, setShowKYC] = useState(false);
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [introductionVideo, setIntroductionVideo] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [loading,setLoading]=useState(false);

  const [view, setView] = useState(1);

  React.useEffect(() => {
    getFreelancerDetail();
  }, []);

  const getFreelancerDetail = async () => {
    if (props.userId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${props.userId}`,
        getOptions()
      );
      if (result.success && result.result) {
        setIsSkeletonLoading(false);
        setFreelancerDetail(result.result);
        getImageUrl(result.result.kycProvePhoto, "kycProvePhoto");
        if(result.result.introductionVideo){
          getImageUrl(result.result.introductionVideo, "introductionVideo");
        }
        if (result.result.portfolios && result.result.portfolios.length > 0) {
          result.result.portfolios.map((item, index) => {
            getImageUrlPortFolio(item, index);
          });
        }
        if (result.result.officePhotos && result.result.officePhotos.length>0) {
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


  const handleConfirmationProjectSubmit=async ()=>{
         setLoading(true)
    let result = await request(
      ENDPOINT["Confirm"] + "?individualFreelancerId="+freelancerDetail.individualFreelancerId,
      postOptions({})
    );
    if (result.success && result.result) {
      notifications.showSuccess("Congratulation! your registration is completed")
      props.handleNext("ConfirmationPage");
      window.scrollTo({
        top: "0",
        behavior: "smooth",
      });
      localStorage.removeItem(
        "IndividaulFreelancerRegistrationInfo"
      );
      setLoading(false)
    }else{
      notifications.showError("Some error occurred try again later!")
      setLoading(false)
    }
  }

  return (
    <div className="freelancer-profile-area-page2">
      <div hidden={!isSkeletonLoading} className="container">
        <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      </div>
      <div hidden={isSkeletonLoading} className="freelancer-profile-top-area">
        <div className="container">
          <h1 title={freelancerDetail.userTitle}>
            {freelancerDetail.userTitle?.slice(0, 40)}{" "}
            {freelancerDetail.userTitle?.length > 40 ? "..." : ""}
          </h1>
          <p
            title={freelancerDetail.professionalOverview}
            style={{ maxWidth: "100ch" }}
          >
            {freelancerDetail.professionalOverview?.slice(0, 420)}{" "}
            {freelancerDetail.professionalOverview?.length > 420 ? "..." : ""}
          </p>
          {/* <p>I am good developer</p> */}
        </div>
      </div>

      <div
        hidden={isSkeletonLoading}
        className="freelancer-profile-detail-area"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-4 col-md-12" /* style={{ paddingRight: "0px" }} */
            >
              <div className="profile-section-card customer-height-col">
                <div className="profile-section-left">
                  <div className="top-profile-area">
                    <div className="profile-pic-area">
                      <div className="profile-pic">
                        <img
                          src={getProfileImage(freelancerDetail.userProfileUrl)}
                        />
                      </div>
                      <div className="profile-detail-area">
                        <h6 hidden={true}>Member of ABC Company</h6>
                        <p>
                          {freelancerDetail.firstName}{" "}
                          {freelancerDetail.lastName}
                        </p>
                        <div className="stats-profile-row">
                          <span>
                            {freelancerDetail.profileHourlyRate ? (
                              <Format
                                currency={freelancerDetail.currencyCode}
                                number={freelancerDetail.profileHourlyRate}
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
                                number={freelancerDetail.profileDailyRate}
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
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <div className="stats-profile-row1">
                          <span>{freelancerDetail.addressInfo?.userCity}</span>{" "}
                          <span>
                            {freelancerDetail.addressInfo?.userCountry}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="chat-button-area">
                      Chat <i className="fa fa-comment"></i>
                    </div>
                  </div>
                  <div className="profile-rating-stats-area">
                    <div className="profile-availability">Availability</div>
                    <div className="profile-availability-sub">
                      <h6> Availability</h6>
                      <p>{freelancerDetail.availablePerWeek}</p>
                    </div>
                    <br />
                    <div className="resume-confirmation-area">
                      <h6> Resume</h6>
                      <div
                        className="resume-button"
                        onClick={() =>
                          freelancerDetail.userResumes?.length > 0
                            ? props.handleNext("ResumeRegister", "", true)
                            : props.handleNext("ResumeRegister", "", false)
                        }
                      >
                        {freelancerDetail.userResumes &&
                        freelancerDetail.userResumes.length > 0
                          ? "View  PDF"
                          : "Register Resume"}
                      </div>
                    </div>
                    <br />
                    <div className="profile-availability-sub">
                      <h6> Language</h6>
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

                    <br />
                    <div hidden={true} className="portfolio-area-profile">
                      <div className="portfolio-area-profile-top">
                        <h6>KYC Prove photo</h6>
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
                            ? `https://dhihitu47nqhv.cloudfront.net/${introductionVideo}`
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
                    <h2>Skills</h2>
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
                    <h2>Business Area</h2>
                    <h3>
                      Business Scope :{" "}
                      {freelancerDetail.serviceScopes &&
                        freelancerDetail.serviceScopes.length > 0 &&
                        freelancerDetail.serviceScopes[0].serviceScope}
                    </h3>
                    <div className="skill-area-detail">
                      Business Sub Scopes :{" "}
                      {freelancerDetail.serviceScopes &&
                      freelancerDetail.serviceScopes.length > 0
                        ? freelancerDetail.serviceScopes[0].subServiceScope.map(
                            (item) => <div className="skill-single">{item}</div>
                          )
                        : ""}
                    </div>
                  </div>
                  <div hidden={true} className="project-detail-area">
                    <div className="project-detail-tab">
                      <div
                        onClick={() => setProjectType("completed")}
                        className={`project-tab ${
                          projectType === "completed" ? "active" : ""
                        }`}
                      >
                        {" "}
                        Completed Projects
                      </div>
                      <div
                        onClick={() => setProjectType("ongoing")}
                        className={`project-tab ${
                          projectType === "ongoing" ? "active" : ""
                        }`}
                      >
                        {" "}
                        On-going Project
                      </div>
                    </div>
                    <div className="project-detail-tabs-area">
                      <div className="project-detail-tabs-item">
                        <div className="project-detail-tabs-item-top">
                          <h6>
                            Leave the message about all issue you faced ok i
                            will reply tomorrow
                          </h6>
                          <ProjectTypeBadge projectType={`Hourly`} />
                        </div>
                        <div className="project-detail-tabs-item-bottom">
                          <p>Sonny has Completed his work at the best</p>
                          <div className="rating-area">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <div className="price-area">US$60.00</div>
                        </div>
                      </div>
                      <div className="project-detail-tabs-item">
                        <div className="project-detail-tabs-item-top">
                          <h6>
                            Leave the message about all issue you faced ok i
                            will reply tomorrow
                          </h6>
                          <ProjectTypeBadge projectType={`Milestone`} />
                        </div>
                        <div className="project-detail-tabs-item-bottom">
                          <p>Sonny has Completed his work at the best</p>
                          <div className="rating-area">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <div className="price-area">US$60.00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bottom-buttons-area">
                    <button
                      onClick={() => {
                        props.handleBack("ResumeRegister");
                        window.scrollTo({
                          top: "0",
                          behavior: "smooth",
                        });
                      }}
                      className="back-button"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        handleConfirmationProjectSubmit()
                    
                      }}
                      className="next-button"
                    >
                      Next  {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
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
    </div>
  );
}

export default FreelancerProfileConfirmation;

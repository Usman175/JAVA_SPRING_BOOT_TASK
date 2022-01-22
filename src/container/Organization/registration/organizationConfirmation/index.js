import React, { useState } from "react";
import "./organizationConfirmation.scss";
import ReactPlayer from "react-player";
import ProjectTypeBadge from "../../../../components/project/projectTypeBadge";
import Skeleton from "../../../../components/skeleton/skeleton";
import request from "../../../../utils/request";
import v4 from "uuid";
import { ENDPOINT } from "../../../../utils/endpoint";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../../utils/httpConfig";
import PortFolioModalDetail from "../../../../components/invitation/portfolio";
import OfficeModalDetail from "../../../../components/invitation/officePhotos";

function ConfirmationStep(props) {
  const [projectType, setProjectType] = useState("completed");
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [organizationDetail, setOrganizationDetail] = useState({});
  const [officePhoto, setOfficePhoto] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [introductionVideo, setIntroductionVideo] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [view, setView] = useState(1);
  const [logo, setLogo] = useState("");
  React.useEffect(() => {
    getCompanyDetail();
  }, [props.CompanyId]);

  const getCompanyDetail = async () => {
    if (props.CompanyId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetOrganization"]}?organizationId=${props.CompanyId}`,
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
          result.result.profileImageUrl || result.result.companyLogo,
          "userProfileUrl"
        );

        if (
          result.result.officePhotos &&
          result.result.officePhotos.length > 0
        ) {
          setOfficePhoto(result.result.officePhotos);
        }

        getImageUrl(result.result.companyLogo, "logo");

        // console.log(result,"result")
        if(result.result.introductionVideo){
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

  return (
    <div className="freelancer-profile-area-page1">
      <div className="container">
        <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      </div>
      <div hidden={isSkeletonLoading} className="freelancer-profile-top-area">
        <div className="container">
          <h1>
            {" "}
            {organizationDetail.companyTitle?.slice(0, 40)}{" "}
            {organizationDetail.companyTitle?.length > 40 ? "..." : ""}
          </h1>
          <p style={{ maxWidth: "100ch" }}>
            {" "}
            {organizationDetail.companyIntroduction?.slice(0, 420)}
            {organizationDetail.companyIntroduction?.length > 420 ? "..." : ""}
          </p>
        </div>
      </div>

      <div
        hidden={isSkeletonLoading}
        className="freelancer-profile-detail-area"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12" style={{ paddingRight: "0px" }}>
              <div className="profile-section-card">
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
                    <div hidden={true} className="rating-stars">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div hidden={true} className="profile-members">
                      Members : 23 Members
                    </div>
                    {/* <br /> */}
                    <div hidden={true} className="profile-success-ratio-area">
                      <p>Successfully Rate : 60%</p>
                      <div className="profile-success-ratio-bar">
                        {" "}
                        <div
                          style={{ width: "60%" }}
                          className="profile-success-ratio-bar-inner"
                        ></div>
                      </div>
                    </div>
                    <div hidden={true} className="profile-success-ratio-area">
                      <p>Management Rate : 80%</p>
                      <div className="profile-success-ratio-bar">
                        {" "}
                        <div
                          style={{ width: "80%" }}
                          className="profile-success-ratio-bar-inner"
                        ></div>
                      </div>
                    </div>
                    <div hidden={true} className="profile-members">
                      Active since : April 2020
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
                        />
                      </div>
                      <div className="profile-detail-area">
                        <h6>{organizationDetail.positionType}</h6>
                        <p>
                          {organizationDetail.contactFirstName}{" "}
                          {organizationDetail.contactLastName}
                        </p>
                        <div hidden className="chat-button-area">
                          Chat <i className="fa fa-comment"></i>
                        </div>
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
                      <img
                        src={
                          logo
                            ? logo
                            : "https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png"
                        }
                      />
                      <span> {organizationDetail.companyName} </span>
                     <span hidden> <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i></span>
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
                  <div className="skill-area">
                    <h2>Business Area</h2>
                    <h3>
                      Business Scope :{" "}
                      {organizationDetail.serviceScopes &&
                        organizationDetail.serviceScopes.length > 0 &&
                        organizationDetail.serviceScopes[0].serviceScope}
                    </h3>
                    <div className="skill-area-detail">
                      Business Sub Scopes :{" "}
                      {organizationDetail.serviceScopes &&
                      organizationDetail.serviceScopes.length > 0
                        ? organizationDetail.serviceScopes[0].subServiceScope.map(
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
                  <div hidden={true} className="profile-section-member-area">
                    <h6>Members</h6>
                    <div className="member-view-card">
                      member view area I will add later
                    </div>
                  </div>

                  <div className="bottom-buttons-area">
                    <button
                      onClick={() => {
                        props.handleNext("userProfile");
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
                        props.handleNext("ConfirmationPage");
                        window.scrollTo({
                          top: "0",
                          behavior: "smooth",
                        });
                        localStorage.removeItem("CompanyRegistrationInfo");
                      }}
                      className="next-button"
                    >
                      Next
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

export default ConfirmationStep;

import React, { useState } from "react";
import "./clientRegistration.scss";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import request from "../../../utils/request";
import notifications from "../../../utils/notifications";
import { ENDPOINT } from "../../../utils/endpoint";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import Skeleton from "../../../components/skeleton/skeleton";
import { getProfileImage } from "../../../utils/getProfileUrl";
import PortFolioModalDetail from "../../../components/invitation/portfolio";
import OfficeModalDetail from "../../../components/invitation/officePhotos";
import v4 from "uuid";

function ConfirmationStep(props) {
  const [projectType, setProjectType] = useState("completed");
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [Thumbnail, setThumbnail] = useState("");
  const [clientDetail, setClientDetail] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [officePhoto, setOfficePhoto] = useState("");
  const [showOfficePhotos, setShowOfficePhotos] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [view, setView] = useState(1);

  React.useEffect(() => {
    getCompanyDetail();
  }, [props.clientId]);
  const getCompanyDetail = async () => {
    console.log(props.clientId, "clientId");
    if (props.clientId) {
      console.log(props.clientId, "props.clientId");
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetUserClient"]}?clientId=${props.clientId}`,
        getOptions()
      );
      if (result.success) {
        setClientDetail(result.result);
        if (result.result.portfolios && result.result.portfolios.length > 0) {
          result.result.portfolios.map((item, index) => {
            getImageUrlPortFolio(item, index);
          });
        }
        if (result.result.officePhotos && result.result.officePhotos.length>0) {
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
    <div className="freelancer-profile-area-page4">
      <div className="container">
        {" "}
        <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      </div>

      <div hidden={isSkeletonLoading} className="freelancer-profile-top-area">
        <div className="container">
          <h1>Bearole.com</h1>
          <p>Your most trustable global outsourcing partner</p>
          {/* <p>I am good developer</p> */}
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
                        <h6> {clientDetail.companyName}</h6>
                        <p>
                          {clientDetail.firstName + " " + clientDetail.lastName}{" "}
                        </p>
                        <div className="stats-profile-row">
                          {clientDetail.emailId}
                        </div>
                        <div className="stats-profile-row" hidden={true}>
                          <span>US$24.00/hr</span> <span>US$240.00/day</span>
                        </div>

                        <div className="rating-area">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
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
                      No. of employees : {clientDetail.noOfEmployee}
                    </div>
                    <br />
                    <div className="profile-members">
                      website: {clientDetail.website}
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
            <div className="col-lg-8 col-md-12">
              <div className="profile-section-card">
                <div className="profile-section-right-side">
                  <div className="profile-section-right-top-heading">
                    <h3>
                      <img src="https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png" />
                      <span> {clientDetail.companyName} </span>
                    </h3>
         
                    <div className="profile-section-right-hire">Request</div>
                  </div>
                  <div className="profile-section-heading-below-text">
                    {clientDetail.userTitle}
                  </div>
                  { clientDetail.introductionVideo && (
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
                  {/* <div className="profile-section-heading-below-text">
                  {clientDetail.userTitle}
                  </div> */}

                  <div className="profile-section-heading-below-text1">
                    {clientDetail.professionalOverview}
                  </div>
                  <div className="skill-area">
                    <h2>Business Area</h2>
                    <h3>
                      Business Scope :{" "}
                      {clientDetail.serviceScopes &&
                        clientDetail.serviceScopes.length > 0 &&
                        clientDetail.serviceScopes[0].serviceScope}
                    </h3>
                    <div className="skill-area-detail">
                      Business Sub Scopes :{" "}
                      {clientDetail.serviceScopes &&
                      clientDetail.serviceScopes.length > 0
                        ? clientDetail.serviceScopes[0].subServiceScope.map(
                            (item) => <div className="skill-single">{item}</div>
                          )
                        : ""}
                    </div>
                  </div>
                  <div hidden className="project-detail-area">
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

                  <div
                    className="create-freelancer-bottom-steps"
                    style={{ marginTop: "50px", paddingRight: "25px" }}
                  >
                    <button
                      onClick={() => {
                        props.handleBack("ClientRegistrationStep");
                      }}
                      className="create-freelancer-bottom-steps-back"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        props.handleNext("ConfirmationPage");
                        localStorage.removeItem("clientRegistrationInfo");
                        window.scrollTo({
                          top: "0",
                          behavior: "smooth",
                        });
                      }}
                      className="create-freelancer-bottom-steps-skip"
                    >
                      NEXT
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

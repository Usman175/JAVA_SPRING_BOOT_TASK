import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import "./freelancerContents.scss";
function RightFreelancerContent({ index, freelancer, ...props }) {
  const [isShortListed, setIsShortListed] = useState(false);
  const [showSKills, setShowSKills] = useState(4);

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  return (
    <>
      <div className="freelancer-card-right-area">
        <div className="freelancer_textArea_skillShow_mobile">
      <ShowMoreText
            lines={2}
            more="show more"
            less={"Show Less"}
            className="content-css"
            anchorClass="view-more-less"
            expanded={false}
          >
            <p>
              {freelancer.companyInfo?.companyIntroductionContents
                ? freelancer.companyInfo.companyIntroductionContents
                : freelancer.professionalOverview &&
                  freelancer.professionalOverview != " "
                ? freelancer.professionalOverview
                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"}
            </p>
          </ShowMoreText>
          <div
            hidden={freelancer.organizationId}
            className="freelancer-skills-area"
          >
            {freelancer.skills && freelancer.skills.length > 1 ? (
              <div className="d-flex  skills_btn custom-skills-area">
                {freelancer.skills.map((item, index) => {
                  if (index < showSKills) {
                    return <a key={index}> {item.skillName} </a>;
                  }
                })}
                {freelancer.skills.length > 4 ? (
                  showSKills === 4 ? (
                    <div
                      title={"Show more skills"}
                      className="custom-plus_btn"
                      onClick={() => setShowSKills(20)}
                    >
                      +
                    </div>
                  ) : (
                    <div
                      className="custom-plus_btn"
                      title={"Show less skills"}
                      onClick={() => setShowSKills(4)}
                    >
                      -
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-between skills_btn custom-skills-area">
                <a title="">JAVA</a>
                <a title="">C#</a>
                <a title="">HTML</a>
              </div>
            )}
          </div>
          </div>
        <div className="freelancer-id-shortlist-area">
          <h6>
            {" "}
            {freelancer.organizationId ? "Company" : "Freelancer"} ID :{" "}
            {freelancer.organizationId
              ? freelancer.organizationId
              : freelancer.individualFreelancerId}
          </h6>
          <i
            onClick={() => {
              setIsShortListed(isShortListed === index ? false : index);
            }}
            className={`fa fa-star ${isShortListed == index ? "active" : ""}`}
          ></i>
        </div>
        <div className="freelancer-available-area">
          <p style={{color:freelancer.availabilityStatus!="Available"?'#7337f2':''}}> {freelancer.availabilityStatus}</p>
          <label className="red_text">
            {freelancer?.noOfStars &&
              [
                ...Array(freelancer?.noOfStars * 1).fill(1),
                ...Array(5 - freelancer?.noOfStars * 1).fill(0),
              ].map((item, i) =>
                item === 1 ? (
                  <i
                    className="fa fa-star filled-star"
                    aria-hidden="true"
                    key={i}
                  />
                ) : (
                  <i
                    class="far fa-star"
                    style={{ color: "green" }}
                    aria-hidden="true"
                    key={i}
                  ></i>
                )
              )}
          </label>
        </div>
        <div className="freelancer-stats-area">
          <p>
            {languageType.BUSINESS_SCOPE} :{" "}
            {freelancer?.serviceScopes &&
              freelancer?.serviceScopes[0]?.serviceScope}
          </p>
          <p>{languageType.TOTAL_PROJECT_COMPLETE} : {freelancer.completedProjectsCount || "0"} </p>
          <p>
            {languageType.COUNTRY_TEXT} :{" "}
            {freelancer.addressInfo &&
            freelancer.addressInfo.userCountry &&
            freelancer.addressInfo.userCountry != " "
              ? freelancer.addressInfo.userCountry
              : ""}
            <img
              onClick={() => props.history.push("/freelancers-region")}
              style={{ width: "22px", marginTop: "-5px", cursor: "pointer" }}
              src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/map.svg"
            />
          </p>
        </div>
        <div className="right-area-score-freelancer">
          <div className="progress_bar">
            <div className="progress">
              <div
                className="progress-bar green_bar"
                role="progressbar"
                style={{
                  width: "60%" /*  `${freelancer?.jobSuccessRatio}%` */,
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="job-success-rate-label">Success Rate: 60%</div>
        </div>
      </div>
    </>
  );
}

export default RightFreelancerContent;

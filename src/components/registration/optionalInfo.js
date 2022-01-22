import React from "react";
import "./registration.scss";
import notifications from "../../utils/notifications";
import {useSelector} from "react-redux";
function OptionalInfo(props) {
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
    );
  return (
    <div className="freelance-registration-optional">
      <div className="form-section-title">
        <h1>{languageType.OPT_INFO_TEXT}</h1>
        <img width={18} src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus.svg"} />
      </div>
      <p className="form-notes">
        {languageType.OPT_INFO_EXPLAIN_TEXT}
      </p>

      <div className="form-group row mb-3">
        <label for="homepage" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={22}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/homepage.svg"}
            />
          </span>
          {languageType.HOME_PAGE_TEXT}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                value={`https://${props.optionalInfo.website}`}
                onChange={(e) => {
                  if (e.target.value != "https:/") {
                    props.handleOptionalInfo(
                      e.target.value?.replace("https://", ""),
                      "website"
                    );
                  }
                }}
                placeholder="Home Page Address"
                className="form-control "
                id="homepage"
                name="homepage"
              />
            </div>
            {/* <div className="col-lg-6">
                    <p className="mb-0 info-text">ex)Please, include prefix https://</p>
                  </div> */}
          </div>
        </div>
      </div>

      <div className="form-group row mb-3">
        <label for="no-employees" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img width={25} src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/users.svg"} />
          </span>
          {languageType.NO_OF_EMPLOYEES}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                placeholder={languageType.NO_OF_EMPLOYEES}
                className="form-control "
                id="no-employees"
                value={props.optionalInfo.noOfEmployee}
                onChange={(e) => {
                  props.handleOptionalInfo(e.target.value, "noOfEmployee");
                }}
                name="no-employees"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/business_growth_chart.svg"}
            />
          </span>
          {languageType.ANNUAL_SALES}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                placeholder={languageType.ANNUAL_SALES}
                className="form-control "
                id="annual-sales"
                value={props.optionalInfo.annualSales}
                onChange={(e) => {
                  props.handleOptionalInfo(e.target.value, "annualSales");
                }}
                name="annual-sales"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <i className="fa fa-linkedin-square"></i>
          </span>
          {languageType.LINKEDIN_PROFILE_URL}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control "
                id="linkedInProfileUrl"
                value={props.optionalInfo.linkedInProfileUrl}
                onChange={(e) => {
                  props.handleOptionalInfo(e.target.value, "linkedInProfileUrl");
                }}
                name="linkedInProfileUrl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group row mb-3">
        <label for="portfolio-description" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/business_finance.svg"}
            />
          </span>
          {languageType.PORTFOLIO_TEXT}
        </label>
        <div class="col-sm-9">
          {props.optionalInfo.portfolio.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-lg-6 mb-2 mb-md-2">
                <label
                  className="file-upload-area-label"
                  htmlFor={`portfolioPhotoClient${index}`}
                >
                  <div
                    title={item.fileName ? item.fileName : languageType.PORTFOLIO_BUTTON_TEXT }
                    className="btn btn-dark w-100"
                  >
                    {item.fileName ? item.fileName : languageType.PORTFOLIO_BUTTON_TEXT }
                  </div>
                </label>
                <input
                  id={`portfolioPhotoClient${index}`}
                  accept=".png, .jpg, .jpeg,.pdf"
                  onChange={(e) => {
                    let size = e.target.files[0] ? e.target.files[0].size : 0;
                    if (size < 1048576) {
                      props.handlePortfolioUpdate(
                        e.target.files[0],
                        index,
                        e.target?.files[0]?.name
                      );
                    } else {
                      notifications.showWarning(
                        "Please select a file size of less than 1 MB."
                      );
                    }
                  }}
                  type="file"
                  className="file-upload-area"
                />
              </div>

              <div className="col-lg-6">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    placeholder={languageType.DESCRIPTION}
                    value={item.description}
                    onChange={(e) =>
                      props.handleUpdatePortfolioDes(e.target.value, index)
                    }
                    className="form-control "
                    id="portfolio-description"
                    name="portfolio-description"
                  />
                  <a className="ml-3">
                    {index == 0 ? (
                      <img
                        width={20}
                        src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus-bold.svg"}
                        onClick={() => props.handleAddMorePortfolio()}
                        className="plus-icon"
                      />
                    ) : (
                      <i
                        onClick={() => props.handleRemoveMorePortfolio(index)}
                        className="fa fa-minus"
                      ></i>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="award-certificate" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/trophy.svg"}
            />
          </span>
          {languageType.AWARD_CERTIFICATE}
        </label>
        <div class="col-sm-9">
          {props.optionalInfo.certificates?.map((item, index) => (
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-10">
                <label
                  className="file-upload-area-label"
                  htmlFor={`AwardCertificate${index}`}
                >
                  <div className="btn btn-dark w-100">
                    {" "}
                    {item.fileName ? item.fileName : languageType.AWARD_CERTIFICATE_BUTTON}{" "}
                  </div>
                </label>
                <input
                  id={`AwardCertificate${index}`}
                  accept=".png, .jpg, .jpeg,.pdf"
                  onChange={(e) => {
                    let size = e.target.files[0] ? e.target.files[0].size : 0;
                    if (size < 1048576) {
                      props.handleAddCertificatePhoto(
                        e.target.files[0],
                        index,
                        e.target?.files[0]?.name
                      );
                    } else {
                      notifications.showWarning(
                        "Please select a file size of less than 1 MB."
                      );
                    }
                  }}
                  type="file"
                  className="file-upload-area"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-2">
                <a>
                  {index == 0 ? (
                    <img
                      width={18}
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus-bold.svg"}
                      onClick={() => props.handleAddMoreCertificate()}
                      className="plus-icon"
                    />
                  ) : (
                    <i
                      onClick={() => props.handleRemoveMoreCertificate(index)}
                      className="fa fa-minus"
                    ></i>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={28}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/company_chair.svg"}
            />
          </span>
          {languageType.OFFICE_PHOTO}
        </label>
        <div class="col-sm-9">
          {props.optionalInfo.officePhoto.map((item, index) => (
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-10">
                <label
                  className="file-upload-area-label"
                  htmlFor={`OfficePhoto${index}`}
                >
                  <div className="btn btn-dark w-100">
                    {" "}
                    {item.fileName ? item.fileName : languageType.OFFICE_PHOTO_UPLOAD}{" "}
                  </div>
                </label>
                <input
                  id={`OfficePhoto${index}`}
                  accept=".png, .jpg, .jpeg,.pdf"
                  onChange={(e) => {
                    let size = e.target.files[0] ? e.target.files[0].size : 0;
                    if (size < 1048576) {
                      props.handleOfficePhotoUpdate(
                        e.target.files[0],
                        index,
                        e.target?.files[0]?.name
                      );
                    } else {
                      notifications.showWarning(
                        "Please select a file size of less than 1 MB."
                      );
                    }
                  }}
                  type="file"
                  className="file-upload-area"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-2">
                <a>
                  {index == 0 ? (
                    <img
                      width={18}
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus-bold.svg"}
                      onClick={() => props.handleAddMoreOfficePhoto()}
                      className="plus-icon"
                    />
                  ) : (
                    <i
                      onClick={() => props.handleRemoveMoreOfficePhoto(index)}
                      className="fa fa-minus"
                    ></i>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/marker_pin.svg"}
            />
          </span>
          {languageType.ADDRESS_TEXT}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <button
                className="btn btn-dark w-100"
                onClick={() => props.history.push("/myregion")}
              >
                {languageType.ADDRESS_TEXT_BUTTON}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/play_video.svg"}
            />
          </span>
          {languageType.YOUTUBE_LINK}
        </label>
        <div class="col-sm-9">
          <div className="row">
            <div className="col-lg-6">
              <label
                className="file-upload-area-label"
                htmlFor="IntroductionVideo"
              >
                <div className="btn btn-dark w-100">
                  {props.optionalInfo.introductionVideo?.fileName
                    ? props.optionalInfo.introductionVideo.fileName
                    : languageType.INTRO_VIDEO_BUTTON}
                </div>
              </label>
              <input
                id="IntroductionVideo"
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(e) => {
                  let size = e.target.files[0] ? e.target.files[0].size : 0;
                  if (size < 5242880) {
                    props.handleIntroductionVideo(
                      e.target.files[0],
                      e.target?.files[0]?.name
                    );
                  } else {
                    notifications.showWarning(
                      "Please select a file size of less than 5 MB."
                    );
                  }
                }}
                type="file"
                className="file-upload-area"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label for="annual-sales" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={30}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/credit_card.svg"}
            />
          </span>
          {languageType.CREDIT_CARD_TEXT}
        </label>
        <div class="col-sm-9">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <button className="btn btn-dark w-100 mb-md-2">{languageType.VERIFY_TEXT_BUTTON}</button>
            </div>
            <div className="col-lg-6 mt-2 mt-md-0">
              <div className="d-flex align-items-center">
                <img
                  width={22}
                  className="mr-2"
                  src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/creativity_idea.svg"}
                />
                <div
                  style={{ color: "#811212", fontSize: 12, lineHeight: "16px" }}
                >
                  {languageType.VERIFY_EXPLAIN_TEXT}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionalInfo;

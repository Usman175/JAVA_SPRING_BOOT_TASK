import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Label from "../../../components/postProject/label";
import { v4 } from "uuid";
import DropdownList from "../../../components/dropdowns/dropdownList";
import notifications from "../../../utils/notifications";
import "../contest.scss";
const images = [];
const logo = [];
for (let i = 0; i < 16; i++) {
  images.push({
    id: v4(),
    img: `https://source.unsplash.com/collection/151521/200x170?${i}`,
  });
}

logo[0] = {
  id: v4(),
  img: `https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/client_img.jpg`,
};

logo[1] = {
  id: v4(),
  img: "https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png",
};

function BasicContestInfo(props) {
  const [errorMessage, setErrorMessage] = useState({});
  const [designValidate, setDesignValidate] = useState({
    currentData: 0,
    max: 5,
    min: 1,
  });
  const [isContestTitleHide, setIsContestTitleHide] = useState(false);
  let { contestDetail } = props;

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const handleChange = (field, e, value) => {
    if (field === "contestDesignStyles") {
      props.setContestDetail({
        ...contestDetail,
        contestDesignType: value,
        [field]:
          value === "Logo Design"
            ? logo
            : value === "Package Design"
            ? images
            : [],
        contestDesignStyleSamples: [],
      });
    } else {
      props.setContestDetail({ ...contestDetail, [field]: e.target.value });
    }
  };

  useEffect(() => {
    if (contestDetail.projectId) {
    } else {
      setIsContestTitleHide(false);
    }
  }, []);

  const checkValidationCheckbox = (event) => {
    let isSelected = event.currentTarget.checked;
    const styleImg = event.currentTarget.dataset.id;
    if (isSelected) {
      if (designValidate.currentData < designValidate.max) {
        setDesignValidate({
          ...designValidate,
          currentData: designValidate.currentData + 1,
        });
   props.setContestDetail({
          ...contestDetail,
          contestDesignStyleSamples: [
            ...contestDetail.contestDesignStyleSamples,
            contestDetail.contestDesignStyles.find((s) => s.img === styleImg) || [],
          ],
        });
      } else {
        event.preventDefault();
        event.currentTarget.checked = false;
        notifications.showError("You can only select maximum of 5 styles.");
      }
    } else {
      if (designValidate.currentData > designValidate.min) {
        setDesignValidate({
          ...designValidate,
          currentData: designValidate.currentData - 1,
        });
        props.setContestDetail({
          ...contestDetail,
          contestDesignStyleSamples:
            contestDetail.contestDesignStyleSamples.filter(
              (s) => s.img != styleImg
            ),
        });
      } else {
        setDesignValidate({
          ...designValidate,
          currentData: designValidate.currentData - 1,
        });
        props.setContestDetail({
          ...contestDetail,
          contestDesignStyleSamples:
            contestDetail.contestDesignStyleSamples.filter(
              (s) => s.img != styleImg
            ),
        });
      }
    }

    return;
  };
  const onFileChange = (e) => {
    props.setContestDetail({
      ...contestDetail,
      contestDesignPreferenceAttachFile: e.target.files[0],
      contestDesignPreferenceAttachFileName: e.target.files[0].name,
    });
  };
  const sliderCss = (field) => {
    return {
      left: `${
        parseInt(field || "50") - 4.6 * (0.9 - parseInt(field || "50") / 100)
      }%`,
      transform: `translateX(-${field || "50"}%)`,
    };
  };
  const handleValidation = () => {
    let errorMessage = {};
    let formIsValid = true;

    if (
      (contestDetail.projectId === "" ||
        contestDetail.projectId === null ||
        contestDetail.projectId === undefined) &&
      (contestDetail.jobTitle === null ||
        contestDetail?.jobTitle?.trim() === "" ||
        contestDetail.jobTitle === undefined ||
        contestDetail?.jobTitle?.match(/\S+/g).length < 3)
    ) {
      formIsValid = false;
      errorMessage["jobTitle"] =
        contestDetail?.jobTitle?.split(" ").length < 3
          ? "Minimum 3 words are required"
          : languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
    } else if (
      !contestDetail.contestDesignStyles ||
      contestDetail.contestDesignStyles.length <= 0
    ) {
      formIsValid = false;
      errorMessage["contestDesignStyles"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "120",
        behavior: "smooth",
      });
    } else if (
      contestDetail.contestDesignRequirement === null ||
      contestDetail.contestDesignRequirement === "" ||
      contestDetail.contestDesignRequirement === undefined ||
      contestDetail.contestDesignRequirement
        ?.replace(/<[^>]*>/g, "")
        .match(/\S+/g).length < 10
    ) {
      formIsValid = false;
      errorMessage["contestDesignRequirement"] =
        contestDetail?.contestDesignRequirement &&
        contestDetail?.contestDesignRequirement?.split(" ").length < 10 &&
        contestDetail?.contestDesignRequirement?.split(" ").length > 0
          ? "Minimum 10 words are required"
          : languageType.REQUIRED_MESSAGE;
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };

  const onHandlePage = () => {
    if (handleValidation()) {
      props.setTab("advance");
    }
  };

  return (
    <div className="contest_bodr">
      <div className="contest-field-area">
        <div className="contest-initial-guide">
          <h3>1.</h3>
          <h3>{languageType.CONTEST_STEP_TITLE_1}</h3>
          <p>{languageType.CONTEST_STEP_DESC_1}</p>
        </div>
        <div className="contest_width add-title" hidden={isContestTitleHide}>
          <Label
            title={languageType.CONTEST_TITLE}
            prefixBoxValid={errorMessage["jobTitle"] ? false : true}
            prefixBoxInValid={errorMessage["jobTitle"] ? true : false}
            compulsory={true}
            primary={true}
          />
          <div className="form-group">
            <input
              type="text"
              className="form-control h3"
              placeholder={languageType.CONTEST_TITLE}
              name="jobTitle"
              maxLength="100"
              value={contestDetail.jobTitle}
              onChange={(e) => handleChange("jobTitle", e)}
            />
            {errorMessage.jobTitle && (
              <p className="text-danger">{errorMessage.jobTitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="contest-field-area favorite-design-wrapper">
        <div className="contest-initial-guide">
          <h3>2.</h3>
          <h3>{languageType.CONTEST_STEP_TITLE_2}</h3>
          <p>{languageType.CONTEST_STEP_DESC_2}</p>
        </div>

        <div className="contest_width">
          <div className="form-group">
            <Label
              title={languageType.SELECT_DESIGN_STYLE}
              compulsory={true}
              prefixBoxValid={
                errorMessage["contestDesignStyles"] ? false : true
              }
              prefixBoxInValid={
                errorMessage["contestDesignStyles"] ? true : false
              }
              primary={true}
            />

            <DropdownList
              id="contestDesignStyles"
              name="contestDesignStyles"
              enableAutoCompleteSearch
              placeholder={languageType.SELECT_DESIGN_STYLE}
              value={contestDetail.contestDesignType}
              selectItem={(value) => {
                handleChange("contestDesignStyles", null, value);
              }}
              items={[
                {
                  text: "Logo/Branding",
                  value: "Logo Design",
                },
                {
                  text: "Package Design",
                  value: "Package Design",
                },
                {
                  text: "Naming",
                  value: "Naming",
                },
                {
                  text: "Product/3D",
                  value: "Product/3D",
                },
                {
                  text: "Printing",
                  value: "Printing",
                },
                {
                  text: "Web/Mobile",
                  value: "Web/Mobile",
                },
                {
                  text: "Character",
                  value: "Character",
                },
                {
                  text: "Graphic",
                  value: "Graphic",
                },
                {
                  text: "Others",
                  value: "Others",
                },
              ]}
            />
            <span className="error">{errorMessage.contestDesignStyles}</span>
          </div>
          {contestDetail.contestDesignStyles && (
            <div className="row">
              <div className="col-md-12">
                <div
                  className="style_box"
                  style={{ marginBottom: "25px", marginTop: "15px" }}
                >
                  <div
                    className="row align-items-center"
                    style={{
                      height: "250px",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    {contestDetail.contestDesignStyles.map((e, index) => {
                      let checked = false;
                      if (
                        contestDetail?.contestDesignStyleSamples?.filter(
                          (x) => x.id === e.id
                        ).length > 0
                      )
                        checked = true;
                      return (
                        <div className="col-md-3" key={e.id}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="contestDesignStyles"
                            data-id={e.img}
                            id={`contestDesignStyles${index}`}
                            checked={checked}
                            onChange={(e) => {
                              checkValidationCheckbox(e);
                            }}
                          />
                          <label
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                            className="form-check-label"
                            htmlFor={`contestDesignStyles${index}`}
                          >
                            <img src={e.img} alt="" />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <span className="error">{errorMessage.selectedStyles}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="contest-field-area">
        <div className="contest-initial-guide">
          <h3>3.</h3>
          <h3>{languageType.CONTEST_STEP_TITLE_3}</h3>
          <p>{languageType.CONTEST_STEP_DESC_3}</p>
          <br />
          <br />
          <h3>4.</h3>
          <h3>{languageType.CONTEST_STEP_TITLE_4}</h3>
          <p>{languageType.CONTEST_STEP_DESC_4}</p>
        </div>

        <div className="contest_width">
          <div className="form-group">
            <Label
              title={languageType.WRITE_YOUR_DESIGN_REQUIREMENT}
              compulsory={true}
              prefixBoxValid={
                errorMessage["contestDesignRequirement"] ? false : true
              }
              prefixBoxInValid={
                errorMessage["contestDesignRequirement"] ? true : false
              }
              primary={true}
            />

            <div className="row">
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  maxLength="500"
                  placeholder={languageType.WRITE_YOUR_DESIGN_REQUIREMENT}
                  rows="6"
                  name="contestDesignRequirement"
                  value={contestDetail.contestDesignRequirement}
                  onChange={(e) => handleChange("contestDesignRequirement", e)}
                />
                {errorMessage.contestDesignRequirement && (
                  <p className="text-danger">
                    {errorMessage.contestDesignRequirement}
                  </p>
                )}
              </div>
              <div className="col-md-12 pt-2">
                <div className="row">
                  <div className="col-md-10 col-10">
                    <p
                      style={{
                        font: "normal normal normal 14px/19px Roboto",
                        color: "#101010",
                        maxWidth: "100%",
                      }}
                    >
                      {languageType.ATTACH_ADDITIONAL_DESIGN}
                    </p>
                  </div>
                  <div className="col-md-2 col-2">
                    <div className="form-group upload_file">
                      <label
                        htmlFor="exampleFormControlFile1"
                        style={{
                          height: "10px",
                          paddingTop: "15px",
                        }}
                      >
                        <i
                          className="fa fa-upload"
                          style={{ fontSize: 15 }}
                          aria-hidden="true"
                        ></i>
                      </label>

                      <input
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        onChange={(e) => onFileChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pt-2 py-2">
                  {contestDetail.contestDesignPreferenceAttachFileName &&
                    contestDetail.contestDesignPreferenceAttachFileName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 contest_rangeMobileAlign">
        <div className="contest_range mt-4">
          <p
            style={{
              font: "normal normal normal 14px/19px Roboto",
              color: "#101010",
            }}
          >
            {languageType.DESIGN_PREFERENCE}:
          </p>
          <div className="row justify-content-between">
            <div className="col-md-6">
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.MALE}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.maleFemalePercentage}
                    className="slider"
                    id="gender"
                    onChange={(e) => handleChange("maleFemalePercentage", e)}
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.maleFemalePercentage)}
                  >
                    {" "}
                    {`${contestDetail.maleFemalePercentage}%`}{" "}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.FEMALE}
                </label>
              </div>
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.YOUNG}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.youngMaturePercentage}
                    className="slider"
                    id="age"
                    onChange={(e) => handleChange("youngMaturePercentage", e)}
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.youngMaturePercentage)}
                  >
                    {`${contestDetail.youngMaturePercentage}%`}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.MATURE}
                </label>
              </div>
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.MODERN}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.modernClassicPercentage}
                    className="slider"
                    id="modern"
                    onChange={(e) => handleChange("modernClassicPercentage", e)}
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.modernClassicPercentage)}
                  >
                    {`${contestDetail.modernClassicPercentage}%`}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.CLASSIC}
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.LUXURY}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.luxuryPublicPercentage}
                    className="slider"
                    id="luxury"
                    onChange={(e) => handleChange("luxuryPublicPercentage", e)}
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.luxuryPublicPercentage)}
                  >
                    {`${contestDetail.luxuryPublicPercentage}%`}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.PUBLIC}
                </label>
              </div>
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.SIMPLE}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.simpleComplexPercentage}
                    className="slider"
                    id="complexity"
                    onChange={(e) => handleChange("simpleComplexPercentage", e)}
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.simpleComplexPercentage)}
                  >
                    {`${contestDetail.simpleComplexPercentage}%`}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.COMPLEX}
                </label>
              </div>
              <div className="d-flex align-items-center custom_range">
                <label className="contest-preference">
                  {languageType.CONCRETE}
                </label>
                <div className="range_slider">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={contestDetail.abstractConcretePercentage}
                    className="slider"
                    id="abstract"
                    onChange={(e) =>
                      handleChange("abstractConcretePercentage", e)
                    }
                  />
                  <span
                    htmlFor="myRange"
                    className="slider-bubble"
                    style={sliderCss(contestDetail.abstractConcretePercentage)}
                  >
                    {`${contestDetail.abstractConcretePercentage}%`}
                  </span>
                </div>
                <label className="contest-preference">
                  {languageType.ABSTRACT}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="save_cancel btnSpaceTop proposal-submission-buttons NextBtnProjectPostMobileF">
        <span></span>
        <button
          onClick={() => onHandlePage()}
          type="button"
          className="btn contest-project-post-btn"
        >
          {languageType.NEXT_TEXT}
        </button>
      </div>
    </div>
  );
}

export default BasicContestInfo;

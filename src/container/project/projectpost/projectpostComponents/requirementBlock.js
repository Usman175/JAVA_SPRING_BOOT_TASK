import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions } from "../../../../utils/httpConfig";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import Label from "../../../../components/postProject/label";
const locationCOnst = [
  {
    text: "Any Location",
    value: "Any Location",
  },
  {
    text: "North America",
    value: "North America",
  },
  {
    text: "Asia",
    value: "Asia",
  },
  {
    text: "Europe",
    value: "Europe",
  },

  {
    text: "Africa",
    value: "Africa",
  },
  {
    text: "Middle East",
    value: "Middle East",
  },
  {
    text: "South America",
    value: "South America",
  },
];
const RequirementBlock = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [freelancerLocations, setFreelancerLocations] = useState(locationCOnst);

  useEffect(() => {
    const bindFreelancerLocations = async () => {
      let array = [];
      let result = await request(
        `${ENDPOINT["GeneralSettings"]}?settingName=FreelancerLocations`,
        getOptions({})
      );
      if (result.success) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[index];
          array.push({
            text: element.name,
            value: element.name.toString(),
          });
        }

        // setFreelancerLocations(array);
      }
    };

    bindFreelancerLocations();
  }, []);

  const { languageType, minimumRequirement, onFieldChange } = props;

  const renderStars = (number = 0) => {
    let container = [];
    for (let i = 0; i < number; i++)
      container.push(
        <i
          className="fa fa-star"
          style={{ color: "green" }}
          aria-hidden="true"
          key={i}
        />
      );
    return container;
  };

  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-home3"
        role="tabpanel"
        aria-labelledby="pills-home3-tab"
      >
        <div className="hourly_limit">
          <div className="position_rel">
            <h4 style={{ color: "#333333" }}>
              <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/resume1.png"} style={{ width: "40px" }} />{" "}
              {languageType.MIN_REQUIREMENT_FOR_FREELANCER}
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isActive ? "true" : "false"}
                  onClick={() => setIsActive(!isActive)}
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div
            className={
              isActive
                ? "collapse animaton-height show"
                : "collapse animaton-height"
            }
          >
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.MIN_NO_OF_STAR}
                    prefixBoxValid={true}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/experience.png"}
                    width="27px"
                    color="#333333"
                  >
                    {" "}
                  </Label>

                  <div className="stars-container">
                    <DropdownList
                      id="noOfStar"
                      name="noOfStar"
                      value={minimumRequirement.noOfStar}
                      selectItem={(value) => {
                        onFieldChange("noOfStar", value);
                      }}
                      items={[
                        {
                          text: renderStars(1),
                          value: "1",
                        },
                        {
                          text: renderStars(2),
                          value: "2",
                        },
                        {
                          text: renderStars(3),
                          value: "3",
                        },
                        {
                          text: renderStars(4),
                          value: "4",
                        },
                        {
                          text: renderStars(5),
                          value: "5",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.JOB_SUCCESS_SCORE}
                    prefixBoxValid={true}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobSuccess.svg"}
                    color="#333333"
                    width="22px"
                  >
                    {" "}
                  </Label>

                  <div className="">
                    <DropdownList
                      id="jobSuccessScore"
                      name="jobSuccessScore"
                      enableAutoCompleteSearch
                      value={minimumRequirement.jobSuccessScore}
                      selectItem={(value) => {
                        onFieldChange("jobSuccessScore", value);
                      }}
                      items={[
                        { text: "~60%", value: "~60%" },
                        {
                          text: "61~70%",
                          value: "61~70%",
                        },
                        {
                          text: "71~80%",
                          value: "71~80%",
                        },
                        {
                          text: "81~90%",
                          value: "81~90%",
                        },
                        { text: "90%~", value: "90%~" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.LOCATION_TEXT}
                    prefixBoxValid={true}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/addressIcon.svg"}
                    color="#333333"
                    width="28px"
                    marginLeft="-5px"
                  >
                    {" "}
                  </Label>
                  <div className="">
                    <DropdownList
                      id="freelancerLocation"
                      name="freelancerLocation"
                      enableAutoCompleteSearch
                      value={minimumRequirement.freelancerLocation}
                      selectItem={(value) => {
                        onFieldChange("freelancerLocation", value);
                      }}
                      items={props.languages}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.YEARS_OF_EXPERIENCE}
                    prefixBoxValid={true}
                    icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                    color="#333333"
                    width="28px"
                  >
                    {" "}
                  </Label>

                  <div className="">
                    <DropdownList
                      id="yearOfExperience"
                      name="yearOfExperience"
                      enableAutoCompleteSearch
                      value={minimumRequirement.yearOfExperience}
                      selectItem={(value) => {
                        onFieldChange("yearOfExperience", value);
                      }}
                      items={[
                        { text: languageType.LESS_THAN_2, value: "2" },
                        { text: languageType.LESS_THAN_3, value: "3" },
                        { text: languageType.LESS_THAN_5, value: "4" },
                        { text: languageType.LESS_THAN_10, value: "5" },
                        { text: languageType.Over_10, value: "10" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.REQUIRED_LANGUAGE_TEXT}
                    prefixBoxValid={true}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/languages_world_icon.png"}
                    color="#333333"
                    width="25px"
                  >
                    {" "}
                  </Label>
                  <div className="">
                    <DropdownList
                      id="requiredLanguage"
                      name="requiredLanguage"
                      value={minimumRequirement.requiredLanguage}
                      selectItem={(value) => {
                        onFieldChange("requiredLanguage", value);
                      }}
                      items={[
                        { text: languageType.ENGLISH, value: "english" },
                        { text: languageType.JAPANESE, value: "japanese" },
                        { text: languageType.KOREAN, value: "korean" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label
                    title={languageType.LANGUAGE_LEVEL}
                    prefixBoxValid={true}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/business_growth_chart.svg"}
                    width="26px"
                    color="#333333"
                  >
                    {" "}
                  </Label>
                  <div className="">
                    <DropdownList
                      id="englishLevel"
                      name="englishLevel"
                      value={minimumRequirement.englishLevel}
                      selectItem={(value) => {
                        onFieldChange("englishLevel", value);
                      }}
                      items={[
                        {
                          text: languageType.LANGUAGE_LEVEL_NATIVE,
                          value: "native",
                        },
                        {
                          text: languageType.LANGUAGE_LEVEL_BEGINNER,
                          value: "beginner",
                        },
                        {
                          text: languageType.LANGUAGE_LEVEL_INTERMEDIATE,
                          value: "intermediate",
                        },
                        {
                          text: languageType.LANGUAGE_LEVEL_ADVANCED,
                          value: "advanced",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    languageType: state.languageReducer.languageType,
    languages: state.languageReducer.languages,
  };
};

export default connect(mapStateToProps)(RequirementBlock);

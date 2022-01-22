import React from "react";
import "./advanceSearch.scss";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";
import DropdownList from "../dropdowns/dropdownList";
import { useDispatch, useSelector } from "react-redux";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  projectPost_updateField as updateField,
  projectPost_updateProjectType as updateProjectType,
  projectPost_updateProjectScope as updateProjectScope,
  projectPost_updateProjectSubScope as updateProjectSubScope,
  projectPost_updateMinimunRequirementField as updateMinimumRequirementField,
} from "../../store/action/Project/projectActions";

const { CountryList } = require("../../utils/countrylist");

export default function SearchHeader(props) {
  const [openSearch, setOpenSearch] = React.useState(false);
  const [skillTyping, setSkillTyping] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [noOfContracts, setNoOfContracts] = React.useState("");
  const [clientCity, setClientCity] = React.useState("");
  const [hourlyRateUpTO, setHourlyRateUpTO] = React.useState("");
  const [hourlyRateFrom, setHourlyRateFrom] = React.useState("");
  const [designStyle, setDesignStyle] = React.useState("");
  const [paymentFrom, setPaymentFrom] = React.useState("");
  const [paymentUpTo, setPaymentUpTo] = React.useState("");

  const [projectScope, setProjectScope] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const dispatch = useDispatch();
  // data from reducers
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const projectPost = useSelector((state) => state.projectStore.projectPost);

  const onProjectScopeChange = (projectScope) => {
    setProjectScope(projectScope);
    dispatch(updateProjectScope(projectScope));
  };
  const onSelectCountry = (country) => {
    setCountry(country);
  };

  return (
    <div className="all-project-advance-search-area">
      <div className="advance-search-area-top">
        <h2>
          {props.languageType.ALL_PROJECTS}{" "}
          {projectPost.projectType ? (
            <span>[{projectPost.projectType}]</span>
          ) : (
            ""
          )}
        </h2>
        {!openSearch ? (
          <img
            onClick={() => {
              if (window.innerWidth > 768) {
                document.getElementsByClassName(
                  "all-project-advance-search-area"
                )[0].style.height = "510px";
                setOpenSearch(true);
              } else {
                document.getElementsByClassName(
                  "all-project-advance-search-area"
                )[0].style.height = "750px";
                setOpenSearch(true);
              }
              setTimeout(() => {
                document.getElementsByClassName(
                  "all-project-advance-search-area"
                )[0].style.overflow = "visible";
              }, 1000);
            }}
            src={`https://${GET_IMAGE_PREFIX1}/optionSearch.svg`}
            alt="freelancer search icon"
          />
        ) : (
          <i
            onClick={() => {
              document.getElementsByClassName(
                "all-project-advance-search-area"
              )[0].style.height = "50px";
              setOpenSearch(false);
              document.getElementsByClassName(
                "all-project-advance-search-area"
              )[0].style.overflow = "hidden";
              setTimeout(() => {
                document.getElementsByClassName(
                  "all-project-advance-search-area"
                )[0].style.overflow = "hidden";
              }, 500);
              setTimeout(() => {
                document.getElementsByClassName(
                  "all-project-advance-search-area"
                )[0].style.overflow = "hidden";
              }, 1000);
            }}
            className="fa fa-close"
          ></i>
        )}
      </div>
      <div className="search-menu-area">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="search-drop-down-menu-area">
              {projectPost.projectType !=
              languageReducer.projectTypes[4].text ? (
                <div
                  className="down-menu-area-item"
                  onClick={() => {
                    if (!projectPost.projectType) {
                      store.addNotification({
                        title: "Select Project Type",
                        message:
                          "Please, select project type first on the left panel",
                        type: "warning",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true,
                        },
                      });
                    }
                  }}
                >
                  <DropdownList
                    id="projectScope"
                    name="projectScope"
                    placeHolder={props.languageType.SELECT_BUSINESS_SCOPE}
                    disabled={!projectPost.projectType}
                    value={projectPost.projectScope}
                    items={languageReducer.projectScopes}
                    selectItem={onProjectScopeChange}
                  />
                </div>
              ) : (
                <div className="down-menu-area-item">
                  <DropdownList
                    id="designStyle"
                    name="designStyle"
                    placeHolder={languageType.SELECT_DESIGN_STYLE}
                    value={designStyle}
                    selectItem={(value) => {
                      setDesignStyle(value);
                    }}
                    items={[
                      {
                        text: "Logo Design",
                        value: "Logo Design",
                      },
                      {
                        text: "Package Design",
                        value: "Package Design",
                      },
                    ]}
                  />
                </div>
              )}
              {projectPost.projectType === "Free Contract" ||
              projectPost.projectType === languageType.FREE_CONTRACT ? (
                <div className="down-menu-area-item">
                  <DropdownList
                    id="noOfContracts"
                    name="noOfContracts"
                    placeHolder={props.languageType.DAYS_OF_WORK}
                    value={noOfContracts}
                    items={[
                      {
                        text: "1",
                        value: "1",
                      },
                      {
                        text: "2",
                        value: "2",
                      },
                      {
                        text: "3",
                        value: "3",
                      },
                      {
                        text: "4",
                        value: "4",
                      },
                    ]}
                    selectItem={(value) => {
                      setNoOfContracts(value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="down-menu-area-item">
                <DropdownList
                  id="hourlyRateFrom"
                  name="hourlyRateFrom"
                  placeHolder={props.languageType.HOURLY_RATE_FROM}
                  value={hourlyRateFrom}
                  items={[
                    {
                      text: "1",
                      value: "1",
                    },
                    {
                      text: "2",
                      value: "2",
                    },
                    {
                      text: "3",
                      value: "3",
                    },
                    {
                      text: "4",
                      value: "4",
                    },
                  ]}
                  selectItem={(value) => {
                    setHourlyRateFrom(value);
                  }}
                />
              </div>
              {projectPost.projectType === "Free Contract" ||
              projectPost.projectType === languageType.FREE_CONTRACT ? (
                <div className="down-menu-area-item">
                  <DropdownList
                    id="paymentFrom"
                    name="paymentFrom"
                    placeHolder={props.languageType.DAILY_PAYMENT_FROM}
                    value={paymentFrom}
                    items={[
                      {
                        text: "1",
                        value: "1",
                      },
                      {
                        text: "2",
                        value: "2",
                      },
                      {
                        text: "3",
                        value: "3",
                      },
                      {
                        text: "4",
                        value: "4",
                      },
                    ]}
                    selectItem={(value) => {
                      setPaymentFrom(value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="search-drop-down-menu-area">
              <div className="down-menu-area-item">
                <DropdownList
                  id="countryList"
                  name="countryList"
                  placeHolder={props.languageType.COUNTRY_TEXT}
                  disabled={!projectPost.projectType}
                  value={country}
                  items={CountryList.map((item) => ({
                    value: item.name,
                    text: item.name,
                  }))}
                  selectItem={onSelectCountry}
                />
              </div>
              {projectPost.projectType === "Free Contract" ||
              projectPost.projectType === languageType.FREE_CONTRACT ? (
                <div className="down-menu-area-item">
                  <DropdownList
                    id="clientCity"
                    name="clientCity"
                    placeHolder={props.languageType.CLIENT_CITY}
                    value={clientCity}
                    items={[
                      {
                        text: "Seoul",
                        value: "Seoul",
                      },
                      {
                        text: "Busan",
                        value: "Busan",
                      },
                      {
                        text: "Incheon",
                        value: "Incheon",
                      },
                      {
                        text: "Daegu",
                        value: "Daegu",
                      },
                    ]}
                    selectItem={(value) => {
                      setClientCity(value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="down-menu-area-item">
                <DropdownList
                  id="hourlyRateUpTO"
                  name="hourlyRateUpTO"
                  placeHolder={props.languageType.HOURLY_RATE_UP_TO}
                  value={hourlyRateUpTO}
                  items={[
                    {
                      text: "1",
                      value: "1",
                    },
                    {
                      text: "2",
                      value: "2",
                    },
                    {
                      text: "3",
                      value: "3",
                    },
                    {
                      text: "4",
                      value: "4",
                    },
                  ]}
                  selectItem={(value) => {
                    setHourlyRateUpTO(value);
                  }}
                />
              </div>
              {projectPost.projectType === "Free Contract" ||
              projectPost.projectType === languageType.FREE_CONTRACT ? (
                <div className="down-menu-area-item">
                  <DropdownList
                    id="paymentUpTo"
                    name="paymentUpTo"
                    placeHolder={props.languageType.Daily_Payment_UP_TO}
                    value={paymentUpTo}
                    items={[
                      {
                        text: "1",
                        value: "1",
                      },
                      {
                        text: "2",
                        value: "2",
                      },
                      {
                        text: "3",
                        value: "3",
                      },
                      {
                        text: "4",
                        value: "4",
                      },
                    ]}
                    selectItem={(value) => {
                      setPaymentUpTo(value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12" style={{ padding: "0px 10px" }}>
            <div className="search-drop-down-menu-area">
              <div className="down-menu-area-item">
                <input
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      event.target.value.length > 0
                    ) {
                      setSkills([...skills, event.target.value]);
                      setSkillTyping("");
                    }
                  }}
                  onChange={(event) => {
                    setSkillTyping(event.target.value);
                  }}
                  value={skillTyping}
                  placeholder={props.languageType.SKILLS_TEXT}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ padding: "0px 10px" }}>
            <div className="all-project-skill-added-area">
              <div className="all-project-skill-added-box">
                {skills.length > 0 &&
                  skills.map((skill) => (
                    <div className="skill-item">
                      {skill}
                      <i
                        onClick={() => {
                          let newSkills = skills.filter(
                            (item) => item != skill
                          );
                          setSkills(newSkills);
                        }}
                        className="fa fa-close"
                      ></i>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="search-button-area">
          <button
            onClick={() => {
              if (!projectPost.projectType) {
                store.addNotification({
                  title: "Coming Soon",
                  message: "Advance is coming soon",
                  type: "success",
                  insert: "top",
                  container: "top-center",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 2000,
                    onScreen: true,
                  },
                });
              }
            }}
          >
            {props.languageType.SEARCH}
          </button>
        </div>
      </div>
    </div>
  );
}

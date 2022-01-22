import React, { useState } from "react";
import "./talentSearch.scss";
import DropdownList from "./../../components/dropdowns/dropdownList";
import Pagination from "../../components/pagination";
import SubHeader from "../../components/subHeader";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import Heading from "../../components/postProject/heading";
import languageReducer from "../../store/reducer/languageReducer/languageReducer";
import { useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from '@mui/material/styles';

function TalentSearch(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState("latestOrder");
  const [jobSearch, setJobSearch] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [checkContact, setCheckContact] = useState("");
  const [isShortListed, setIsShortListed] = useState("");
  const [each, setEach] = useState("30 each");
  const { CountryList } = require("../../utils/countrylist");
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const handleClick = (event) => {
    debugger;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  const country = CountryList;


  console.log({country});
  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-12 col-md-8">
              <section className="talent-search-page">
                <div className="bcknd_container  project_post">
                  <Heading
                    heading={languageType.TALENT_SEARCH_TEXT}
                    step={"T"}
                    shadow={true}
                  />
                  <div className="talent-search-detail">
                    <h1>
                      {languageType.TOTAL_TEXT}
                      <span>{" "}1,041,655</span> {languageType.PEOPLE_TEXT}
                    </h1>
                    <div className="top-filter-area">
                      <div
                        onClick={() => setActiveFilter("latestOrder")}
                        style={{ paddingLeft: "0px" }}
                        className={`top-filter-area-item   ${
                          activeFilter === "latestOrder" ? "active" : ""
                        }`}
                      >
                        {activeFilter === "latestOrder" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        {languageType.LATEST_ORDER}{" "}
                        {activeFilter === "latestOrder" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* <div
                        onClick={() => setActiveFilter("InOrderOfEducation")}
                        className={`top-filter-area-item  ${
                          activeFilter === "InOrderOfEducation" ? "active" : ""
                        }`}
                      >
                        {activeFilter === "InOrderOfEducation" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        In Order of Education{" "}
                        {activeFilter === "InOrderOfEducation" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                      </div> */}
                      <div
                        onClick={() => setActiveFilter("RegistrationDate")}
                        className={`top-filter-area-item  ${
                          activeFilter === "RegistrationDate" ? "active" : ""
                        }`}
                      >
                        {activeFilter === "RegistrationDate" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        {languageType.REGISTRATION_DATE}{" "}
                        {activeFilter === "RegistrationDate" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                      </div>

                      <div
                        onClick={() => setActiveFilter("Country")}
                        className={`top-filter-area-item  ${
                          activeFilter === "Country" ? "active" : ""
                        }`}
                      >
                        {activeFilter === "Country" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        <Button 
                        aria-describedby={id} 
                        className="countryTalentSearch_barMobile" 
                        onClick={handleClick}
                        >
                          {languageType.COUNTRY_TEXT}{" "}
                        </Button>
                        {activeFilter === "Country" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                        {activeFilter === "Country" ? (
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            {" "}
                          
                              {
                                country.map((country)=> 
                                <List>
                              <ListItem style={{maxWidth: "230px"}}>
                                <ListItemButton style = {{marginBottom:"-35px"}} >
                                  <ListItemText primary={country.name} />
                                </ListItemButton>
                              </ListItem>
                              
                          </List>
                              )
                              }

                            {/* )
                          } */}

                          </Popover>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        onClick={() => setActiveFilter("City")}
                        className={`top-filter-area-item  ${
                          activeFilter === "City" ? "active" : ""
                        }`}
                      >
                        {activeFilter === "City" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        {languageType.CITY_TEXT}{" "}
                        {activeFilter === "City" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="resume-table-detail">
                      <div className="resume-table-detail-header">
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-2">
                            <center>{languageType.NAME}</center>
                          </div>
                          <div className="col-lg-10 col-md-7 col-7">
                            {" "}
                            <center>{languageType.RESUME_SUMMARY}</center>
                          </div>
                          <div className="col-lg-2 col-md-3 col-3">
                            <center>{languageType.UPDATE_DATE}</center>
                          </div>
                        </div>
                      </div>
                      {["", "", "", "", "", "", "", "", "", ""].map(
                        (item, index) => (
                          <div className="resume-table-detail-item">
                            <div className="row">
                              <div className="col-12 col-md-3">
                                <div className="resume-left-side">
                                  <div>
                                    <p> male | 1998 </p>
                                    <p> 23 years old</p>
                                  </div>
                                  {isShortListed === index ? (
                                    <i
                                      className="fa fa-star"
                                      onClick={() => setIsShortListed("")}
                                    ></i>
                                  ) : (
                                    <i
                                      onClick={() => setIsShortListed(index)}
                                      className="fa fa-star-o"
                                    ></i>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-7">
                                <div className="resume-middle">
                                  <h3
                                    onClick={() =>
                                      props.history.push("/user-resume")
                                    }
                                  >
                                    Mechanical equipment supervision and
                                    supervision field
                                  </h3>
                                  <div className="education-area">
                                    Graduate (Master) Completion{" "}
                                    <span> | </span> O Mechanical Engineering
                                    Department of Mechanical Engineering
                                  </div>
                                  <div className="country-area">
                                    Vitcine, Koreau
                                  </div>
                                  <div className="business-categories">
                                    <div className="business-categories-item">
                                      Average of more than 15 years of service
                                    </div>
                                    <div className="business-categories-item">
                                      recent job search
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                              <div className="col-12 col-md-2">
                                <div className="resume-right-area">
                                  9 mins ago
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <br />

                <Pagination
                  isPreviousPage={false}
                  isNextPage={false}
                  lastPkEvaluatedTrack={[{}]}
                  pageNumber={1}
                  moveBack={() => {}}
                  moveNext={() => {}}
                />
              </section>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TalentSearch;

import React, { useState } from "react";
import "./talentSearch.scss";
import DropdownList from "./../../components/dropdowns/dropdownList";
import Pagination from "../../components/pagination";
import Heading from "../../components/postProject/heading";
import SubHeader from "../../components/subHeader";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import { useSelector } from "react-redux";

function MyTalent(props) {
  const [activeFilter, setActiveFilter] = useState("latestOrder");
  const [jobSearch, setJobSearch] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [checkContact, setCheckContact] = useState("");
  const [isShortListed, setIsShortListed] = useState("");
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const [each, setEach] = useState("30 each");
  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-12 col-md-2">
            </div>
            <div className="col-12 col-md-8">
              <section className="talent-search-page">
                <div className="bcknd_container project_post">
                  <Heading heading=
                  {languageType.MY_TALENT_TEXT}
                  step={"T"} 
                  shadow={true} 
                  />
                  <div className="talent-search-detail">
                    <h1>
                    {languageType.TOTAL_TEXT} <span>1,041,655</span> {languageType.PEOPLE_TEXT}
                    </h1>
                    <div className="top-filter-area">
                      <div
                        onClick={() => setActiveFilter("latestOrder")}
                        style={{ paddingLeft: "0px" }}
                        className={`top-filter-area-item   ${activeFilter === "latestOrder" ? "active" : ""
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


                      <div
                        onClick={() => setActiveFilter("InOrderOfEducation")}
                        className={`top-filter-area-item  ${activeFilter === "InOrderOfEducation" ? "active" : ""
                          }`}
                      >
                        {activeFilter === "InOrderOfEducation" ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          ""
                        )}{" "}
                        {languageType.IN_ORDER_OF_EDU}{" "}
                        {activeFilter === "InOrderOfEducation" ? (
                          <sup>
                            <i className="fa fa-long-arrow-up"></i>
                          </sup>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        onClick={() => setActiveFilter("RegistrationDate")}
                        className={`top-filter-area-item  ${activeFilter === "RegistrationDate" ? "active" : ""
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
                    </div>
                    {" "}
                    <div className="resume-table-detail">
                      <div className="resume-table-detail-header">
                        <div className="row">
                          <div className="col-lg-2 col-md-3 col-2">
                            <div className="resume-table-detail-heading">{languageType.NAME}</div>
                          </div>
                          <div className="col-lg-8 col-md-6 col-6">
                            {" "}
                            <div className="resume-table-detail-heading">
                              {languageType.RESUME_SUMMARY}
                              </div>
                          </div>
                          <div className="col-lg-2 col-md-3 col-4">
                            <div className="resume-table-detail-heading">{languageType.UPDATE_DATE}</div>
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
                                    <h6> Asim Ali </h6>
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
                                    {/* <span>
                                      {" "}
                                      Experience 21
                                    </span>{" "} */}
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
                                  <div className="offered-badge_top">
                                    <div className="offered-badge">Offered</div>
                                  </div>
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
                  moveBack={() => { }}
                  moveNext={() => { }}
                />
              </section>
            </div>
            <div className="col-12 col-md-2">
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyTalent;

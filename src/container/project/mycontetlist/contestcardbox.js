import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ShowMoreText from "react-show-more-text";
import "./mycontestList.scss";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../store/constants/constant";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
  onReduxSelcteProjectChange,
} from "../../../store/action/action";
import { ProjectType } from "../../../utils/projectConst";
import Currency from "../../../components/currency";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { postOptions } from "../../../utils/httpConfig";
import Format from "../../../components/numberFormat";
import moment from "moment";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormatDWH from "../../../components/formatDWH";
import "../../../components/project/project.scss";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
class ProjectCardbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.authUser?.myAuth?.user?.userId,
      openMileStone: "",
      showProjectTypeMobile: false,
      windowWidth: window.innerWidth,
      showSKills: 4,
    };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    let { location } = this.props;
    if (location && location.pathname) {
      this.props.onRouteChange(location.pathname);
    }

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
  }

  //#region Change Event Handle

  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  handleProjectTitleClick = (selectedProject) => {
    this.props.onSelcteProjectChange(selectedProject);
    if(sessionStorage.userType==="Client"){
      this.props.history.push(
        "/mycontest?projectId=" + selectedProject.projectId
      );
    }else{
      this.props.history.push(
        "/project-detail-for-freelancer?projectId=" + selectedProject.projectId
      );
    }

  };

  handleProjectTypeShowMobile = () => {
    this.setState({ showProjectTypeMobile: !this.state.showProjectTypeMobile });
  };

  handleValidation(selectedProject) {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;
    if (
      selectedProject.projectId === null ||
      selectedProject.projectId === ""
    ) {
      formIsValid = false;
      errorMessage["projectId"] = languageType.REQUIRED_MESSAGE;
    }
    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  projectShortList = async (selectedProject) => {
    if (this.handleValidation(selectedProject)) {
      let param = {
        projectId: selectedProject.projectId,
        userId: this.state.userId,
        isShortlisted: selectedProject.isShortlisted,
      };

      if (selectedProject.isShortlisted) selectedProject.isShortlisted = false;
      else selectedProject.isShortlisted = true;

      let result = await request(
        ENDPOINT["AddUserShortListedProject"],
        postOptions(param)
      );
      if (result.success) {
        if (result) {
        } else alert(result.message);
      }
    }
  };

  //#endregion Change Event Handle

  render() {
    let { selectedProject, languageType } = this.props;
    let { showSKills } = this.state;
    let isMilestone,
      isHourly,
      isFreeContract,
      isofficeWork,
      iscontest = false;
    if (selectedProject.projectType === ProjectType.Milestone)
      isMilestone = true;
    if (selectedProject.projectType === ProjectType.Hourly) isHourly = true;
    if (selectedProject.projectType === ProjectType.FreeContract)
      isFreeContract = true;
    if (selectedProject.projectType === ProjectType.OfficeWork)
      isofficeWork = true;
    if (selectedProject.projectType === ProjectType.Contest) iscontest = true;
    let lessText = "Show Less";

    let { openMileStone } = this.state;

    return (
      <>
        <div
          key={selectedProject.projectId}
          className="card_box"
          style={{ marginTop: this.props.index == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-8 myContest_listCardsCol">
              <div className="all-projects-card-title">
                {
                  selectedProject.isFeaturedContest &&  <img src={`https://${GET_IMAGE_PREFIX1}/icons/featuredDiamond.svg`} className="diamond_cardFeaturedContestImg" />
              
                }
                <h3
                  title={selectedProject.jobTitle}
                  className="underline_hover title-hide-more-line"
                  onClick={() => this.handleProjectTitleClick(selectedProject)}
                >
                  {selectedProject.jobTitle}
                </h3>
                <ProjectTypeBadge projectType={selectedProject.projectType} />
              </div>
              <div className="row">
                <div className="col-12 contestType_winningArea_topCol">
                  <h4>
                    {isMilestone && (
                      <>
                        {" "}
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.projectBudgetForMilestone}
                        />{" "}
                      </>
                    )}
                    {isHourly && (
                      <>
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.fromSalary}
                        />{" "}
                        {selectedProject.fromSalary ? "-" : ""}{" "}
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.toSalary}
                        />{" "}
                      </>
                    )}
                    {isFreeContract && (
                      <div>
                        {/*    Daily Range : */}{" "}
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          number={selectedProject.minDailyRate}
                          currency={selectedProject.currencyCode}
                        />
                        ~<Currency currency={selectedProject.currencyCode} />
                        <Format
                          number={selectedProject.maxDailyRate}
                          currency={selectedProject.currencyCode}
                        />
                        /
                        <FormatDWH
                          day
                          currency={selectedProject.currencyCode}
                        />
                      </div>
                    )}
                    {isofficeWork && (
                      <>
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.fromSalary}
                        />{" "}
                        - <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.toSalary}
                        />
                        /
                        <FormatDWH
                          day
                          currency={selectedProject.currencyCode}
                        />
                      </>
                    )}
                      {iscontest && (
                      <>
                        <span className="contest-type-winning-area">
                             <img
                              alt=""
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                              }
                            />{" "}
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          currency={selectedProject.currencyCode}
                          number={selectedProject.winningAmount}
                        /> {" "}
                        </span>
                         <span hidden={!selectedProject.secondPlacePrize} className="contest-type-winning-area">  
                         <img
                              alt=""
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/secondAward.svg"
                              }
                              />
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.secondPlacePrize}
                        /> {" "}
                        </span>
                          <span hidden={!selectedProject.thirdPlacePrize} className="contest-type-winning-area">  
                          <img
                              alt=""
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/thirdAward.svg"
                              }
                              />
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          number={selectedProject.thirdPlacePrize}
                        /> {" "}
                        </span>
                      </>
                    )}
                  </h4>
                </div>
                <div
                  className="col-lg-6 col-md-6"
                  hidden={
                    selectedProject.maximumWeekHours === "" ||
                    selectedProject.maximumWeekHours === "0"
                  }
                >
                  <h4>
                    {isHourly && (
                      <>
                        {selectedProject.maximumWeekHours}
                        {selectedProject.maximumWeekHours ? (
                          <>
                            <FormatDWH
                              hrs
                              currency={selectedProject.currencyCode}
                            />
                            /
                            <FormatDWH
                              week
                              currency={selectedProject.currencyCode}
                            />
                          </>
                        ) : (
                          ""
                        )}{" "}
                      </>
                    )}
                    {isFreeContract && selectedProject.minHourlyRate && (
                      <div>
                        {/*    Hourly Range : */}{" "}
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          number={selectedProject.minHourlyRate}
                          currency={selectedProject.currencyCode}
                        />
                        ~<Currency currency={selectedProject.currencyCode} />
                        <Format
                          number={selectedProject.maxHourlyRate}
                          currency={selectedProject.currencyCode}
                        />
                        /
                        <FormatDWH hr currency={selectedProject.currencyCode} />
                      </div>
                    )}
                  </h4>
                </div>
                {isMilestone &&
                  selectedProject.offeredMilestones &&
                  selectedProject.offeredMilestones.length > 0 && (
                    <div className="col-12">
                      <div
                        className={`project-post-confirmation-item-right Offer-Milestone-area  ${
                          selectedProject.projectId === openMileStone
                            ? "active"
                            : ""
                        }`}
                      >
                        <div className="Offer-Milestone-area-badge">
                          {languageType.Offered_Milestone}
                        </div>
                        {!openMileStone ? (
                          <i
                            title={"Show offered milestones"}
                            className="fa fa-plus"
                            onClick={() =>
                              this.setState({
                                openMileStone: selectedProject.projectId,
                              })
                            }
                          ></i>
                        ) : (
                          <i
                            title={"Hide offered milestones"}
                            onClick={() => this.setState({ openMileStone: "" })}
                            className="fa fa-minus"
                          ></i>
                        )}
                        <div
                          className={`offered-milestone-block ${
                            selectedProject.projectId === openMileStone
                              ? "active"
                              : ""
                          }`}
                        >
                          {(
                            selectedProject.offeredMilestones.length > 0 &&
                            selectedProject.offeredMilestones
                          ).map((item) => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexWrap: "wrap",
                                fontWeight: "600",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: "0px",
                                  minWidth: "150px",
                                }}
                              >
                                {item.milestoneTitle}
                              </p>
                              <p
                                style={{
                                  marginBottom: "0px",
                                  minWidth: "150px",
                                }}
                              >
                                <Currency
                                  currency={selectedProject.currencyCode}
                                />{" "}
                                <Format
                                  number={item.offerAmount}
                                  currency={selectedProject.currencyCode}
                                />{" "}
                              </p>
                              <p
                                style={{
                                  marginBottom: "0px",
                                  minWidth: "150px",
                                }}
                              >
                                {moment(item.milestoneDueDate).format("lll")}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>{" "}
              <ShowMoreText
                lines={2}
                more="show more"
                less={lessText}
                className="content-css showMorePc_featureContest"
                anchorClass="view-more-less"
                expanded={false}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedProject.contestDesignRequirement,
                  }}
                ></span>
              </ShowMoreText>
              <nav
                aria-label="breadcrumb"
                className="iconRight_showProjectTypeMobileTopClass"
              >
                <ol className="breadcrumb contestCardBox_adjustBottom">
                  <li className="breadcrumb-item">
                    <a>{selectedProject.projectType}</a>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    hidden={
                      selectedProject.projectType === ProjectType.FreeContract
                    }
                  >
                    {selectedProject.projectScope &&
                      selectedProject.projectScope.projectScope}
                  </li>
                  <li>
                    {selectedProject.skills &&
                    selectedProject.skills.length > 1 ? (
                      <div className="d-flex justify-content-flex-start skills_btn">
                        {selectedProject.skills &&
                          selectedProject.skills !== "" &&
                          selectedProject.skills.split(",").map(
                            (skill, index) =>
                              index < showSKills && (
                                <a key={"skill" + `${index}`} title="">
                                  {skill}
                                </a>
                              )
                          )}
                        {selectedProject.skills.split(",").length > 4 ? (
                          showSKills === 4 ? (
                            <div style={{ display: "flex" }}>
                              ... &nbsp;
                              <div
                                title={"Show more skills"}
                                className="custom-plus_btn"
                                onClick={() =>
                                  this.setState({ showSKills: 20 })
                                }
                              >
                                +
                              </div>
                            </div>
                          ) : (
                            <div
                              className="custom-plus_btn"
                              title={"Show less skills"}
                              onClick={() => this.setState({ showSKills: 4 })}
                            >
                              -
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                </ol>
                {/* mobile area iconRight project type show */}
                <div
                  onClick={() =>
                    this.state.windowWidth < 700 &&
                    this.handleProjectTypeShowMobile()
                  }
                  className="iconRight_showProjectType"
                >
                  {this.state.windowWidth < 700 && (
                    <>
                      {this.state.showProjectTypeMobile ? (
                        <>
                          <span>
                            <i className="fa fa-angle-down iconRight_showProjectType_button"></i>
                          </span>
                        </>
                      ) : (
                        <span>
                          <i className="fa fa-angle-right iconRight_showProjectType_button"></i>
                        </span>
                      )}
                    </>
                  )}
                </div>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="project_detail projects-card-detail-right-area projects-card-detail-right-areaPcView">
                <div className="justify-content-between project_no">
                  <div className="project-name">
                    {languageType.PROJECT_NO} {selectedProject.projectId}
                  </div>
                  <div className="project-shortList">
                    <span
                      onClick={() => this.projectShortList(selectedProject)}
                    >
                      <i
                        title={
                          selectedProject.isShortlisted
                            ? "shortlisted"
                            : "Not shortlisted"
                        }
                        className={
                          selectedProject.isShortlisted
                            ? "fa fa-star projectshortlist-icon-active"
                            : "fa fa-star projectshortlist-icon"
                        }
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="projects-card-detail-item-area">
                  <div>
                    <div className="projects-card-detail-item">
                      {languageType.APPLICANTS_TEXT} :{" "}
                      {selectedProject.proposalCount || "0"}
                    </div>
                    <div className="projects-card-detail-item">
                      {languageType.OFFER_VALID} :{" "}
                      {moment(selectedProject.postDateTime).format(
                        "DD-MMM-YYYY"
                      )}
                    </div>
                    {isFreeContract && (
                      <div className="projects-card-detail-item">
                        {languageType.CONDITION_TEXT} :{" "}
                        {selectedProject.maximumWeekHours}
                        <FormatDWH
                          hrs
                          currency={selectedProject.currencyCode}
                        />
                        /
                        <FormatDWH
                          week
                          currency={selectedProject.currencyCode}
                        />{" "}
                        , {selectedProject.noOfDayAttendance}
                        <FormatDWH
                          days
                          currency={selectedProject.currencyCode}
                        />
                        /
                        <FormatDWH
                          week
                          currency={selectedProject.currencyCode}
                        />
                      </div>
                    )}
                    <div className="projects-card-detail-item">
                      {languageType.PROJECT_PERIOD} :{" "}
                      {selectedProject.expectedCompletionDays
                        ? selectedProject.expectedCompletionDays
                        : "N/A"}{" "}
                      {/* {languageType.DAYS_TEXT} */}
                    </div>
                    <div className="projects-card-detail-item">
                      {languageType.COUNTRY_TEXT} :{selectedProject.country}
                      {(isFreeContract || isofficeWork) && (
                        <BootstrapTooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          arrow
                          placement="top"
                          title={"View Address"}
                        >
                          <img
                            onClick={() => this.props.history.push("/myregion")}
                            style={{
                              width: "25px",
                              marginTop: "-5px",
                              cursor: "pointer",
                            }}
                            src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/map.svg"
                          />
                        </BootstrapTooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile area project type show */}

              {this.state.showProjectTypeMobile && (
                <div className="project_detail projects-card-detail-right-area projects-card-detail-right-areaMobileView">
                  <div className="justify-content-between project_no">
                    <div className="project-name">
                      {languageType.PROJECT_NO} {selectedProject.projectId}
                    </div>
                    <div className="project-shortList">
                      <span
                        onClick={() => this.projectShortList(selectedProject)}
                      >
                        <i
                          title={
                            selectedProject.isShortlisted
                              ? "shortlisted"
                              : "Not shortlisted"
                          }
                          className={
                            selectedProject.isShortlisted
                              ? "fa fa-star projectshortlist-icon-active"
                              : "fa fa-star projectshortlist-icon"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="projects-card-detail-item-area">
                    <div>
                      <div className="projects-card-detail-item">
                        {languageType.APPLICANTS_TEXT} :{" "}
                        {selectedProject.proposalCount || "0"}
                      </div>
                      <div className="projects-card-detail-item">
                        {selectedProject.positionAvailableDate
                          ? moment(
                              selectedProject.positionAvailableDate
                            ).format("DD-MMM-YYYY")
                          : languageType.UNTIL_HIRE}
                      </div>
                      {isFreeContract && (
                        <div className="projects-card-detail-item">
                          {languageType.CONDITION_TEXT} :{" "}
                          {selectedProject.maximumWeekHours}
                          <FormatDWH
                            hrs
                            currency={selectedProject.currencyCode}
                          />
                          /
                          <FormatDWH
                            week
                            currency={selectedProject.currencyCode}
                          />{" "}
                          , {selectedProject.noOfDayAttendance}
                          <FormatDWH
                            days
                            currency={selectedProject.currencyCode}
                          />
                          /
                          <FormatDWH
                            week
                            currency={selectedProject.currencyCode}
                          />
                        </div>
                      )}
                      <div className="projects-card-detail-item">
                        {languageType.PROJECT_PERIOD} :{" "}
                        {selectedProject.expectedCompletionDays
                          ? selectedProject.expectedCompletionDays
                          : "N/A"}{" "}
                        {/* {languageType.DAYS_TEXT} */}
                      </div>
                      <div className="projects-card-detail-item">
                        {languageType.COUNTRY_TEXT} :{selectedProject.country}
                        {(isFreeContract || isofficeWork) && (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"View Address"}
                          >
                            <img
                              onClick={() =>
                                this.props.history.push("/myregion")
                              }
                              style={{
                                width: "25px",
                                marginTop: "-5px",
                                cursor: "pointer",
                              }}
                              src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/map.svg"
                            />
                          </BootstrapTooltip>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/*  */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    authUser: state.authReducer,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onSelcteProjectChange: (selectedProject) => {
      dispatch(onReduxSelcteProjectChange(selectedProject));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(ProjectCardbox)
);

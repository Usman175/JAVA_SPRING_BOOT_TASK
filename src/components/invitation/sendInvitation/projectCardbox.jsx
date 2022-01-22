import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ShowMoreText from "react-show-more-text";
import "./sendInvitation.scss";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
  onReduxSelcteProjectChange,
} from "../../../store/action/action";
import { ProjectType } from "../../../utils/projectConst";
import notifications from "../../../utils/notifications";
import Currency from "../../currency";
import request from "../../../utils/request";
import { getOptions } from "../../../utils/httpConfig";
import { ENDPOINT } from "../../../utils/endpoint";
import { postOptions } from "../../../utils/httpConfig";
import Format from "../../numberFormat";
import moment from "moment";
import ProjectTypeBadge from "../../project/projectTypeBadge";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormatDWH from "../../formatDWH";

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
      loading: false,
    };
  }

  componentDidMount() {
    let { location } = this.props;
    if (location && location.pathname) {
      this.props.onRouteChange(location.pathname);
    }
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
    this.props.history.push(
      "/project-detail-for-client?projectId=" + selectedProject.projectId
    );
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

  handleSendInvitation = async () => {
    this.setState({ loading: true });

    let params = {
      projectId: this.props.selectedProject.projectId,
      individualFreelancerId: this.props.individualFreelancerId,
      message:
        "I'd like to invite you to take a look at the job I've posted. Please submit a proposal if you're available and interested.",
    };
    let result = await request(
      `${ENDPOINT["InterviewInvitation"]}?projectId=${params.projectId}&individualFreelancerId=${params.individualFreelancerId}&message=${params.message}`,
      postOptions(params)
    );
    if (result.success) {
      notifications.showSuccess("Invitation sent to this freelancer ");
      this.props.handleClose()
      this.setState({ loading: false });
    } else {
      notifications.showWarning("some error occurred please try later! ");
      this.setState({ loading: false });
    }
  };

  render() {
    let { selectedProject, languageType } = this.props;
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

    let { openMileStone, loading } = this.state;

    // console.log(this.props.organizationId,this.props.individualFreelancerId,this.props.selectedProject.projectId,"this.props")

    return (
      <>
        <div
          key={selectedProject.projectId}
          className="card_box"
          style={{ marginTop: this.props.index == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-9">
              <div
                onClick={() => this.handleProjectTitleClick(selectedProject)}
                className="all-projects-card-title"
              >
                <h3
                  title={selectedProject.jobTitle}
                  className="underline_hover title-hide-more-line"
                >
                  {selectedProject.jobTitle}
                </h3>
                <ProjectTypeBadge projectType={selectedProject.projectType} />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
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
                        <Currency currency={selectedProject.currencyCode} />
                        <Format
                          currency={selectedProject.currencyCode}
                          currency={selectedProject.currencyCode}
                          number={selectedProject.winningAmount}
                        />{" "}
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
                className="content-css"
                anchorClass="view-more-less"
                expanded={false}
              >
                {/* {console.log(selectedProject.contestComment)} */}
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedProject.projectType === "Contest"
                        ? selectedProject.contestComment
                        : selectedProject.jobDescription,
                  }}
                ></span>
              </ShowMoreText>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
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
                    {/* {console.log(selectedProject.skills,"selectedProject.skills")} */}
                    <div className="d-flex justify-content-flex-start skills_btn">
                      {selectedProject.skills &&
                        selectedProject.skills !== "" &&
                        selectedProject.skills.split(",").map(
                          (skill, index) =>
                            index < 4 && (
                              <a key={"skill" + `${index}`} title="">
                                {skill}
                              </a>
                            )
                        )}
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-3">
              <div className="invite-button-area">{
                selectedProject.freelancersInvites.find((item)=>item===this.props.individualFreelancerId)?<button
                >
               Already  Invited{" "}
                {this.state.loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  ""
                )}
              </button>:<button onClick={this.handleSendInvitation}>
                Invite{" "}
                {this.state.loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  ""
                )}
              </button>
              }
                
              </div>
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

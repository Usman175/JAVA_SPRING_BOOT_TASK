import React, { Component } from "react";
import Pagination from "../../../../components/pagenation";
import { Link } from "react-router-dom";
import { JungleModal } from "../../../../components/modals/jungleModal";
import { AddManualTime } from "../../../../components/modals/addManualtime";
import "../contractDetail.scss";
import "./shared.scss";
import Heading from "../../../../components/postProject/heading";
import Label from "../../../../components/postProject/label";
import Skeleton from "../../../../components/skeleton/skeleton";
import moment from "moment";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import Button from '@material-ui/core/Button';
import ModalImage from "react-modal-image";
import NoDataAvailable from "../../../../shared/error/not-data-available-new";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AvTimerIcon from '@material-ui/icons/AvTimer';
class ScreenShotsCapturedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorkReportSectionExpanded: true,
      projectUserTimeTracking: [],
      dayNo: 2,
      hours: [],
      tableData: [],
      initialPage: 1,
      totalDaysCount: [],
      currentKey: 0,
      reportDate: new Date(),
      isSkeletonLoading: false,
      capturedData: [],
    };
  }

  componentDidMount() {
    let { projectContractId, userProfile } = this.props.contractData;
    this.GetFreelancerTimeSessionDetails(
      projectContractId,
      userProfile?.userId,
      this.state.reportDate
    );
  }

  GetFreelancerTimeSessionDetails = async (projectContractId, userId, date) => {
    if (projectContractId) {
      this.setState({ isSkeletonLoading: true });
      let newDate = new Date(date);
      let finaleDate = `${newDate.getFullYear()}/${newDate.getMonth() + 1
        }/${newDate.getDate()}`;
      let result = await request(
        `${ENDPOINT["GetFreelancerTimeSessionDetails"]}?contractId=${projectContractId}&userId=${userId}&date=${finaleDate}`,
        getOptions({})
      );
      if (result.success) {
        console.log(result, "result");
        this.setState({
          capturedData: result.result,
          isSkeletonLoading: false,
        });
      } else {
        this.setState({ isSkeletonLoading: false, capturedData: [] });
      }
    }
  };
  componentWillUnmount() {
  }

  getData = (data) => {
    let finalData = new Array(6).fill({ time: "10 am" });
    for (let i = 0; i < data.length; i++) {
      const minute = moment(data[i].startTime).format("mm");
      const index = Math.floor(minute / 10);
      finalData[index] = data[i];
    }
    return finalData;
  };

  handleNextReport = () => {
    let date = new Date(this.state.reportDate);
    date.setDate(date.getDate() + 1);
    this.setState({ reportDate: date });
    let { projectContractId, userProfile } = this.props.contractData;
    this.GetFreelancerTimeSessionDetails(
      projectContractId,
      userProfile?.userId,
      date
    );
  };

  handlePrevReport = () => {
    let date = new Date(this.state.reportDate);
    date.setDate(date.getDate() - 1);
    this.setState({ reportDate: date });
    let { projectContractId, userProfile } = this.props.contractData;
    this.GetFreelancerTimeSessionDetails(
      projectContractId,
      userProfile?.userId,
      date
    );
  };

  handlePageChange = (page) => {
    if (page[0] !== this.state.initialPage) {
      this.setState({ initialPage: 1 + page[0] / 5 });
    }
  };

  render() {
    let { isReportTableViewActive } = this.props;
    const {
      isWorkReportSectionExpanded,
      projectUserTimeTracking,
      hours,
      tableData,
      dayNo,
      initialPage,
      totalDaysCount,
      currentKey,
      reportDate,
      isSkeletonLoading,
      capturedData,
    } = this.state;

    let totalManualTime = 0;
    hours.forEach((k) => {
      totalManualTime +=
        tableData[k].filter((d) => !d?.screenshots?.capturedImage).length * 10;
    });
    let { timeSummary,contractData } = this.props;
    return (
      <>
        <div className="hourly_limit screen-shots-view-type">
          {/* this section is removed for now may be we will use later */}
          {/* <div className="position_rel">
            <h4>
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isWorkReportSectionExpanded}
                  onClick={() => {
                    this.setState({
                      isWorkReportSectionExpanded: !isWorkReportSectionExpanded,
                    });
                  }}
                >
                  +
                </a>
              </span>
            </h4>
          </div> */}
          <div
            className={
              isWorkReportSectionExpanded ? "collapse show" : "collapse"
            }
            id="collapseExample"
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="work_date">
                  <a title="">
                    <i
                      className={`fa fa-angle-left`}
                      aria-hidden="true"
                      onClick={this.handlePrevReport}
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                  <span>{moment(reportDate).format("dddd, MMM D, YYYY")}</span>
                  <a title="">
                    <i
                      className={`fa fa-angle-right`}
                      style={{
                        cursor:
                          reportDate.toISOString().toString().slice(0, 10) !=
                            new Date().toISOString().toString().slice(0, 10)
                            ? "pointer"
                            : "not-allowed",
                      }}
                      aria-hidden="true"
                      onClick={
                        reportDate.toISOString().toString().slice(0, 10) !=
                          new Date().toISOString().toString().slice(0, 10)
                          ? this.handleNextReport
                          : null
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="pause_dispute">
              <div className="row">
                <div className="col-12">
                  <div className="tracked_div">
                    <label>
                      Total:{" "}
                      {timeSummary?.totalHours?.totalHours
                        ? Number(timeSummary?.totalHours?.totalHours).toFixed(2)
                        : "0.00"}{" "}
                      hrs
                    </label>
                    <span>
                      <span className="blue_box" />
                      Tracked{" "}
                      {timeSummary?.totalHours?.totalHours
                        ? Number(timeSummary?.totalHours?.totalHours).toFixed(2)
                        : "0.00"}
                      hrs
                    </span>
                    <span> 
                      <span className="red_box" />
                      Manual  {timeSummary?.manualHours?.totalHours
                        ? Number(timeSummary?.manualHours?.totalHours).toFixed(2)
                        : "0.00"}hrs
                    </span>
                  </div>
                </div>
                <div className="col-12 text-right post_modal">
                  <div className="save_cancel button-design-custom-manual-time button-design_ManualTimeMobile">
                    <JungleModal
                      dialogClassName="jungle-modal"
                      contentClassName="jungle-modal-content"
                      customClose
                      Body={AddManualTime}
                      contractData={this.props.contractData}
                      OpenButton={({ handleClick }) => (
                        <Button
                        startIcon={<AccessAlarmIcon  />}
                        color="primary"
                        variant="outlined"
                        disabled={contractData.projectContractStatus==="OnHold" || contractData.projectContractStatus==="Completed"}
                          onClick={handleClick}
                        >
                          Add Manual Time
                        </Button>
                      )}
                      title="Add Manual Time"
                      size="md"
                    />
                    <Button 
                     startIcon={<AvTimerIcon  />}
                     disabled={contractData.projectContractStatus==="OnHold" || contractData.projectContractStatus==="Completed"}
                     style={{marginLeft:'10px'}}
                        color="secondary"
                        variant="outlined">
                      Dispute Hours
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="tracked_div candidate_reg">
              <div className="row screenShot_ActivitiesRow_alignedMob">
                <div className="col-md-7 col-8">
                  <Heading
                    heading={"Activities"}
                    icon={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/screenshot_camera_photo.png"
                    }
                    color="#333333"
                    fontSize="22px"
                    fontWeight="600"
                    fontFamily="Raleway"
                    nonBorder={true}
                  />
                </div>
                <div className="col-md-5 col-4 gridList_colMob">
                  <button
                    className={
                      !isReportTableViewActive
                        ? "grid-list animation ml-auto"
                        : "grid-list animation active ml-auto"
                    }
                    onClick={() => this.props.onReportViewChange()}
                  >
                    <div className="icon">
                      <div className="dots">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="lines">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                    <div className="text">
                      <span>Grid</span>
                      <span>List</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <Skeleton count={3} isSkeletonLoading={isSkeletonLoading} />
            <div hidden={isSkeletonLoading} className="screen-shots-captured-area">
              {capturedData.length > 0 ? capturedData.map((item, index) => {
                return (
                  <div className="screen-shots-captured-area-item">
                    <div className="screenshots-header">
                      <img src="https://dhihitu47nqhv.cloudfront.net/icons/fitness_race_running_tracking_workout_icon.svg" />
                      <h5> {moment(item.sessionStartTime).format("LT")}- {moment(item.sessionEndTime).format("LT")} ({item.sessionDurationMinutes === " " ? "0.00" : item.sessionDurationMinutes} mins) </h5>
                    </div>
                    <div className="screenshots-captured">
                      {
                        item.trackingDetails ? <Label
                          title={item.trackingDetails[0].screenshots && item.trackingDetails[0].screenshots != " " ? JSON.parse(item.trackingDetails[0].screenshots).Memo : "Memo N/A"}
                          primary={true}
                          icon={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobDocuments.svg"
                          }
                          color="#333333"
                        /> : null
                      }

                      {item.trackingDetails ? item.trackingDetails?.map((screen, index1) => {
                        return (
                          <div hidden={screen?.screenshots === " "} className="screenshots-captured-item">
                            <div className="screenshots-pic">
                              <ModalImage
                                small={
                                  screen?.screenshots && screen?.screenshots != " " ?
                                    JSON.parse(screen?.screenshots)
                                      ?.screenshotPublicUrl : "https://dhihitu47nqhv.cloudfront.net/captureimages/0c786c9d-08d1-452c-9782-cbd623824203.png"
                                }
                                large={
                                  screen?.screenshots && screen?.screenshots != " " ?
                                    JSON.parse(screen?.screenshots)
                                      ?.screenshotPublicUrl : "https://dhihitu47nqhv.cloudfront.net/captureimages/0c786c9d-08d1-452c-9782-cbd623824203.png"
                                }
                                alt="Bearole Activity screen captured"
                              />
                            </div>
                            <div className="screenshots-detail">
                              <>
                                {" "}
                                <input
                                  className="custom-checkbox-styled"
                                  onChange={(e) => { }}
                                  id={`screenshots-detail-checkbox${index + index1}`}
                                  type="checkbox"
                                />
                                <label
                                  for={`screenshots-detail-checkbox${index + index1}`}
                                >
                                  {" "}
                                  {screen.screenshots && screen.screenshots != " " ? moment(screen.stopTime)?.format("LT") : "N/A"}
                                </label>
                              </>
                              <p>{screen.screenshots && screen.screenshots != " " ?
                                JSON.parse(screen.screenshots)
                                  ?.ProgressValue.toFixed(0) : "0.00"}%</p>
                            </div>
                          </div>
                        );
                      }) : <div className="no-screen-available">
                        No captured screen available
                      </div>}
                    </div>
                  </div>
                );
              }) : <NoDataAvailable
                title="Sorry no captured screen shots"
                buttonText="Click here to see more"
                path="/my-contracts"
              />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ScreenShotsCapturedView;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import moment from "moment";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import Skeleton from "../../../../components/skeleton/skeleton";
import ShowMoreText from "react-show-more-text";
import NoDataAvailable from "../../../../shared/error/not-data-available-new";
class AtivitiesReportTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 2,
      currentKey: 0,
      userTimeTracking: [],
      dayNo: 3,
      totalDaysCount: [],
      initialPage: 1,
      tableData: [],
      isAreaExpanded: true,
      selectedTimeZone: "local",
      reportDate: new Date(),
      isSkeletonLoading: false,
      activitiesData: [],
    };
  }

  componentDidMount() {
    let { projectContractId, userProfile } = this.props.contractData;
    this.GetFreelancerActivityDetails(
      projectContractId,
      userProfile?.userId,
      this.state.reportDate
    );
  }

  GetFreelancerActivityDetails = async (projectContractId, userId, date) => {
    if (projectContractId) {
      this.setState({ isSkeletonLoading: true });
      let newDate = new Date(date);
      let finaleDate = `${newDate.getFullYear()}/${
        newDate.getMonth() + 1
      }/${newDate.getDate()}`;
      let result = await request(
        `${ENDPOINT["GetFreelancerActivityDetails"]}?contractId=${projectContractId}&userId=${userId}&date=${finaleDate}`,
        getOptions({})
      );
      if (result.success) {
        this.setState({
          activitiesData: result.result,
          isSkeletonLoading: false,
        });
      } else {
        this.setState({ isSkeletonLoading: false, activitiesData: [] });
      }
    }
  };

  handleNextReport = () => {
    let date = new Date(this.state.reportDate);
    date.setDate(date.getDate() + 1);
    this.setState({ reportDate: date });
    let { projectContractId, userProfile } = this.props.contractData;
    this.GetFreelancerActivityDetails(
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
    this.GetFreelancerActivityDetails(
      projectContractId,
      userProfile?.userId,
      date
    );
  };

  getSingleDayData = (day = this.state.dayNo) => {
    let { userTimeTracking } = this.state;
    let totalDaysCount = [];

    userTimeTracking.map((t) =>
      totalDaysCount.indexOf(moment(t.startTime).format("L")) === -1
        ? totalDaysCount.push(moment(t.startTime).format("L"))
        : null
    );
    this.setState({
      totalDaysCount,
      currentKey: day === this.state.dayNo ? totalDaysCount.length - 1 : day,
    });

    let records = (userTimeTracking || [])
      .filter(
        (d) =>
          totalDaysCount[day - 1] === moment(d.startTime).format("MM/DD/YYYY")
      )
      .map((r) => {
        let processList = r.processList.map((p) =>
          p.applicationTime.length && !isNaN(Number(p.applicationTime))
            ? parseFloat(p.applicationTime.replace(":", "."))
            : 0
        );
        let maxTimeIndex = processList.indexOf(Math.max(processList));
        return {
          ...r,
          maxProcessList: r.processList[maxTimeIndex],
        };
      })
      .sort((a, b) => moment(a.startTime) - moment(b.startTime));

    this.setState({ tableData: records });
  };

  handlePageChange = (page) => {
    if (page[0] !== this.state.initialPage) {
      this.setState({ initialPage: 1 + page[0] / 5 });
    }
  };

  render() {
    let { isReportTableViewActive } = this.props;
    const {
      currentKey,
      totalDaysCount,
      initialPage,
      tableData,
      isAreaExpanded,
      selectedTimeZone,
      isSkeletonLoading,
      activitiesData,
      reportDate
    } = this.state;

    let data = tableData.slice(
      (initialPage - 1) * 5,
      (initialPage - 1) * 5 + 5
    );

    let totalManualTime = (
      tableData.filter((d) => !d?.screenshots?.capturedImage)?.length * 10
    ).toFixed(2);
    let totalTrackedTime = (
      tableData.filter((d) => d?.screenshots?.capturedImage)?.length * 10
    ).toFixed(2);
    let totalTime = Number(totalManualTime) + Number(totalTrackedTime);

    return (
      <>
        <div className="hourly_limit post_form hourly_report">
          <div className="position_rel">
            <h4>
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isAreaExpanded}
                  onClick={() =>
                    this.setState({ isAreaExpanded: !isAreaExpanded })
                  }
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div
            className={isAreaExpanded ? "collapse show" : "collapse"}
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
              <div className="col-md-4">
                <div className="">
                  {/* <select className="form-control world_select">
                    <option>My Local Time</option>
                    <option>USD</option>
                  </select> */}
                  <DropdownList
                    id="localTime"
                    name="localTime"
                    enableAutoCompleteSearch
                    className="world_select"
                    placeHolder="country"
                    value={selectedTimeZone}
                    selectItem={(value) => {
                      this.setState({ selectedTimeZone: value });
                    }}
                    items={[
                      {
                        text: "My Local Time",
                        value: "local",
                      },
                      {
                        text: "UTC",
                        value: "utc",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="pause_dispute">
              <div className="row">
                <div className="col-md-7">
                  <div className="tracked_div">
                    <label>
                      Total: {Math.floor(totalTime / 60)}:{totalTime % 60}hrs
                    </label>
                    <span>
                      <span className="blue_box" />
                      Tracked {Math.floor(totalTrackedTime / 60)}:
                      {totalTrackedTime % 60}hrs
                    </span>
                    <span>
                      <span className="red_box" />
                      Manual {Math.floor(totalManualTime / 60)}:
                      {totalManualTime % 60}hrs
                    </span>
                  </div>
                </div>
                <div className="col-md-5 text-right">
                  <div className="candidate_reg">
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
            </div>
            <Skeleton count={3} isSkeletonLoading={isSkeletonLoading} />
            {
              activitiesData.length>0?
            <div
              hidden={activitiesData.length === 0}
              className="task_manage post_modal"
            >
              <div className="detail_tbl check_tble">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col" />
                      <th scope="col">Activity Time</th>
                      <th scope="col">Activity</th>
                      <th scope="col">Active Window</th>
                      <th scope="col">Activity Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activitiesData.map((data, index) =>
                      data.processList.map((activity, index1) => (
                        <tr className="selected" key={index1}>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`customcheck${index1}`}
                                  required=""
                                  checked
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`customcheck${index1}`}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            {activity.updatedDate
                              ? selectedTimeZone === "utc"
                                ? moment(activity.updatedDate)
                                    .utc()
                                    .format("hh:mm a")
                                : moment(activity.updatedDate).format("hh:mm a")
                              : "N/A"}
                          </td>
                          <td>
                            <Link className="text-dark">
                              <ShowMoreText
                                lines={1}
                                more="show more"
                                less={"show less"}
                                className="content-css"
                                width={180}
                                anchorClass="view-more-less"
                                expanded={false}
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: data?.memo || "N/A",
                                  }}
                                ></span>
                              </ShowMoreText>
                            </Link>
                          </td>
                          <td>
                            <ShowMoreText
                              lines={1}
                              more="show more"
                              less={"show less"}
                              className="content-css"
                              width={180}
                              anchorClass="view-more-less"
                              expanded={false}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: activity?.applicationName || "N/A",
                                }}
                              ></span>
                            </ShowMoreText>
                            {/* {`${activity?.applicationName}` || "N/A"}  */}
                          </td>
                          <td>
                            {data?.progressValue || "N/A"}{" "}
                            {data?.progressValue ? "%" : ""}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>:
            <NoDataAvailable
            title="No activities available"
            buttonText="Click here to see more"
            path="/my-contracts"
          />
            }
          </div>
        </div>
      </>
    );
  }
}

export default AtivitiesReportTableView;

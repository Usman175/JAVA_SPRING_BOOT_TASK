import React, { Component } from "react";
import WorkTableReportView from "./ViewType/workTableReportView";
import WorkGridReportView from "./ViewType/workGridReportView";
import Pagenation from "../../../components/pagenation";
import { UserView } from "../../../components/freelancer/userView";
import { WeeklyWorkGraph } from "../../../components/charts/weeklyWorkGraph";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import { connect } from "react-redux";
import moment from "moment";
import notifications from "../../../utils/notifications";
import SubHeader from "../../../components/subHeader/index";
import FormatDWH from "../../../components/formatDWH";
import "./hourly.scss";
class FreeContractDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 2,
      isReportTableViewActive: false,
      isRateEditable: false,
      isWeekLimitEditable: false,
      rate: 6,
      weekLimit: 40,
      isManualTimeAllow: false,
      projectId: new URLSearchParams(this.props.location.search).get(
        "projectId"
      ),
      freelancerUserId: props.authUser?.myAuth?.user?.userId,
      projectDetailResponse: {},
      projectResponse: {},
      isGraphSectionExpanded: true,
      isTaskManagementSectionExpanded: true,
      isContractDetailSectionExpanded: true,
      projectContractDetail: {},
      projectHistory: [],
      lastPkEvaluated: "",
      lastSkEvaluated: "",
      savedProjectHourlyDetailsData: {},
      savedHourlyDetailsData: {},
      projectUserTimeTracking: [],
      userTimeTracking: [],
      historyPkSkValues: [{ lastPkEvaluated: "", lastSkEvaluated: "" }],
      initialPage: 1,
      loading: false,
    };
  }

  componentDidMount() {
    this.bindProjectDetails();
    this.bindGetProjectContractDetail();
    this.bindGetProjectHistories();
    this.bindGetProjectUserTimeTracking();
    this.bindGetUserTimeTracking();
  }

  getProfileURL = async (url) => {
    if (url.includes("https://")) {
      this.setState({
        projectResponse: {
          ...this.state.projectResponse,
          userProfileUrl: url.split("?")[0],
        },
      });
    } else {
      let result = await request(
        ENDPOINT["S3KeyToURL"] + "?key=" + url,
        getOptions()
      );
      if (result.success) {
        this.setState({
          projectResponse: {
            ...this.state.projectResponse,
            userProfileUrl: result.result,
          },
        });
      }
    }
  };

  async bindProjectDetails() {
    if (this.state.projectId) {
      let result = await request(
        `${ENDPOINT["GetProjectDetails"]}?projectId=` +
          this.state.projectId +
          "&userId=" +
          this.state.freelancerUserId,
        getOptions({})
      );
      if (result.success) {
        if (result.result.data !== null && result.result.data !== "") {
          this.setState({
            projectDetailResponse: result.result.data.projectDetailResponse,
            projectResponse: result.result.data.projectResponse,
          });
          result.result.data.projectResponse?.userProfileUrl &&
            result.result.data.projectResponse?.userProfileUrl.trim() !== "" &&
            this.getProfileURL(
              result.result.data.projectResponse.userProfileUrl
            );
        }
      }
    }
  }

  async bindGetProjectContractDetail() {
    if (this.state.projectId) {
      let result = await request(
        `${ENDPOINT["GetProjectContractDetail"]}?projectId=` +
          this.state.projectId +
          "&freelancerUserId=" +
          this.state.freelancerUserId,
        getOptions({})
      );
      if (result.success) {
        if (result.result.data !== null && result.result.data !== "") {
          const { offerAmount, weeklyLimit, isManualTimeAllow } =
            result.result.data[0] || {};
          this.setState({
            projectContractDetail: result.result.data[0],
            rate:
              offerAmount !== null && offerAmount.trim() !== ""
                ? offerAmount
                : 0,
            weekLimit:
              weeklyLimit !== null && weeklyLimit.trim() !== ""
                ? weeklyLimit
                : 0,
            isManualTimeAllow: isManualTimeAllow,
          });
        }
        return result.result.data[0];
      }
    }
  }

  async bindGetProjectUserTimeTracking() {
    let result = await request(
      `${ENDPOINT["GetProjectUserTimeTracking"]}?userId=${this.state.freelancerUserId}&projectId=${this.state.projectId}`
    );
    if (result.success) {
      if (result.result.data !== null && result.result.data !== "") {
        this.setState({ projectUserTimeTracking: result.result });
      }
    }
  }

  async bindGetUserTimeTracking() {
    let result = await request(
      `${ENDPOINT["GetUserTimeTracking"]}?userId=${this.state.freelancerUserId}`
    );
    if (result.success) {
      if (result.result.data !== null && result.result.data !== "") {
        this.setState({ userTimeTracking: result.result });
      }
    }
  }

  async bindGetProjectHistories(
    lastPkEvaluated = "",
    lastSkEvaluated = "",
    pageIndex = 1
  ) {
    let params = {
      projectId: this.state.projectId,
      pageSize: 5,
      lastPkEvaluated,
      lastSkEvaluated,
    };
    let result = await request(
      `${ENDPOINT["GetProjectHistories"]}`,
      postOptions({ ...params })
    );
    if (result.success) {
      if (result.result.data !== null && result.result.data !== "") {
        this.setState({
          projectHistory: result.result.data,
          ...(result.result.lastPkEvaluated &&
          pageIndex >= this.state.historyPkSkValues.length
            ? {
                historyPkSkValues: [
                  ...this.state.historyPkSkValues,
                  {
                    lastPkEvaluated: result.result.lastPkEvaluated,
                    lastSkEvaluated: result.result.lastSkEvaluated,
                  },
                ],
              }
            : {}),
        });
      }
    }
  }

  onTabChangeHandle = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };
  onReportViewChange = () => {
    let { isReportTableViewActive } = this.state;
    this.setState({
      isReportTableViewActive: !isReportTableViewActive,
    });
  };

  onEditIconClick = (name) => {
    this.setState({ [name]: true }, () => {
      if (name === "isRateEditable")
        document.getElementsByName("rate")[0].focus();
      else if (name === "isWeekLimitEditable")
        document.getElementsByName("weekLimit")[0].focus();
    });
  };

  onTextHandleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  onExpansionChange = (key) => {
    this.setState({ [key]: !this.state[key] });
  };

  getDate = (dayNo, days) => {
    return moment(days[dayNo]).format("MM/DD");
  };

  getLoggedInHours = (dayNo, currentWeekData) => {
    const foundData = currentWeekData.find((d) => d.weekDay === dayNo);
    return foundData
      ? foundData.timeLogged
      : moment().weekday() <= dayNo
      ? ""
      : "--";
  };

  getClassName = (dayNo) => {
    return moment().weekday() <= dayNo ? "" : "bg_gray";
  };

  formatCurrency = (value = 0, currency = "USD") => {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(!isNaN(Number(value)) ? Number(value) : 0);
  };

  saveChanges = async (isContractPause = false) => {
    this.setState({ loading: true });
    const {
      offerAmount: amountPerHour,
      weeklyLimit: maximumWeekHours,
      currencyCode,
      isManualTimeAllow,
    } = this.state.projectContractDetail || {};
    const { rate, weekLimit } = this.state;
    const rateMsg = `${
      Number(rate) > Number(amountPerHour) ? "Increased" : "Decreased"
    } hourly rate from ${this.formatCurrency(
      amountPerHour,
      currencyCode
    )} to ${this.formatCurrency(rate, currencyCode)}`;
    const weekLimitMsg = `${
      Number(weekLimit) > Number(maximumWeekHours) ? "Increased" : "Decreased"
    } week limit from ${maximumWeekHours} to ${weekLimit}`;

    let inDataUpdated =
      isContractPause ||
      Number(rate) !== Number(amountPerHour) ||
      Number(weekLimit) > Number(maximumWeekHours) ||
      isManualTimeAllow !== this.state.isManualTimeAllow;

    const postParams = {
      projectId: this.state.projectId,
      freelancerUserId: this.state.freelancerUserId,
      offerAmount:
        Number(rate) !== Number(amountPerHour) ? rate : amountPerHour,
      weeklyLimit:
        Number(weekLimit) !== Number(maximumWeekHours)
          ? weekLimit
          : maximumWeekHours,
      isManualTimeAllow:
        isManualTimeAllow !== this.state.isManualTimeAllow
          ? this.state.isManualTimeAllow
          : isManualTimeAllow,
    };

    if (inDataUpdated) {
      let contractUpdateResult = await request(
        ENDPOINT["UpdateProjectContract"],
        postOptions(postParams)
      );
      if (contractUpdateResult.success) {
        this.setState({ loading: false });
        if (
          !isContractPause &&
          Number(amountPerHour) !== Number(rate) &&
          Number(weekLimit) !== Number(maximumWeekHours)
        ) {
          let param = {
            projectId: this.state.projectId,
            userId: this.state.freelancerUserId,
          };
          let result1 = await request(
            ENDPOINT["AddProjectHistory"],
            postOptions({ ...param, description: rateMsg })
          );
          let result2 = await request(
            ENDPOINT["AddProjectHistory"],
            postOptions({ ...param, description: weekLimitMsg })
          );
          if (result1.success && result2.success) {
            this.bindGetProjectHistories();
          } else notifications.showError(result1.message || result2.message);
          return;
        } else {
          let param = {
            projectId: this.state.projectId,
            userId: this.state.freelancerUserId,
            description:
              isManualTimeAllow !== this.state.isManualTimeAllow
                ? `Manual time ${
                    this.state.isManualTimeAllow ? "" : "not "
                  }allowed`
                : isContractPause
                ? "Contract paused"
                : Number(amountPerHour) !== Number(rate)
                ? rateMsg
                : Number(weekLimit) !== Number(maximumWeekHours)
                ? weekLimitMsg
                : "",
          };
          let result = await request(
            ENDPOINT["AddProjectHistory"],
            postOptions(param)
          );
          if (result.success) {
            this.bindGetProjectHistories();
          } else notifications.showError(result.message);
        }
        this.bindGetProjectContractDetail().then((data) => {
          this.setState({
            projectResponse: {
              ...this.state.projectResponse,
              amountPerHour: data.offerAmount,
              maximumWeekHours: data.weeklyLimit,
              isManualTimeAllow: data.isManualTimeAllow,
            },
          });
        });
      } else {
        notifications.showError(contractUpdateResult.message);
        this.setState({ loading: false });
      }
    }
  };

  handlePauseContract = (reasonForPause) => {
    this.saveChanges(true);
  };

  saveHourlyDetailsData = (data) => {
    this.setState({ savedHourlyDetailsData: data });
  };

  saveProjectHourlyDetailsData = (data) => {
    this.setState({ savedProjectHourlyDetailsData: data });
  };

  fetchHistoryData = (page) => {
    let pageIndex = page[0];
    let { historyPkSkValues, initialPage } = this.state;
    if (
      pageIndex !== initialPage &&
      historyPkSkValues[pageIndex - 1] !== undefined
    ) {
      this.bindGetProjectHistories(
        historyPkSkValues[pageIndex - 1].lastPkEvaluated,
        historyPkSkValues[pageIndex - 1].lastSkEvaluated,
        pageIndex
      ).then((r) => this.setState({ initialPage: pageIndex }));
    }
  };

  render() {
    let {
      activeTab,
      isReportTableViewActive,
      rate,
      weekLimit,
      isManualTimeAllow,
      isRateEditable,
      isWeekLimitEditable,
      isGraphSectionExpanded,
      isTaskManagementSectionExpanded,
      isContractDetailSectionExpanded,
      projectContractDetail,
      projectResponse,
      projectHistory,
      projectUserTimeTracking,
      userTimeTracking,
      savedHourlyDetailsData,
      savedProjectHourlyDetailsData,
      historyPkSkValues,
      initialPage,
      loading,
    } = this.state;

    let dailyWorkReport =
      projectContractDetail &&
      projectContractDetail.dailyWorkReport &&
      projectContractDetail.dailyWorkReport.trim()
        ? JSON.parse(projectContractDetail?.dailyWorkReport)
            .map((d) => {
              return {
                ...d,
                diffOfDays: moment().diff(moment(d.date), "days"),
                diffOfHours: moment().diff(moment(d.date), "hours"),
                formattedDate: moment(d.date).format("L"),
                timeLogged: Number(Number(d.timeLogged).toFixed(2)),
                week: moment(d.date).week(),
                weekDay: moment(d.date).weekday(),
              };
            })
            .sort((a, b) => {
              return moment(a.date).diff(moment(b.date));
            })
        : [];

    let currentWeekData = dailyWorkReport.filter(
      (d) => d.week === moment().week()
    );

    let days = [];
    let day = moment().startOf("isoWeek");
    while (day <= moment().endOf("isoWeek")) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }

    const thisWeekTotalHours = dailyWorkReport
      .reduce(
        (acc, curr) =>
          acc + (curr.week === moment().week() ? curr.timeLogged : 0),
        0
      )
      .toFixed(2);

    const { finalizedAmount, releasedAmount } = projectContractDetail;
    const unpaidAmount = this.formatCurrency(
      Number(finalizedAmount) - Number(releasedAmount),
      projectResponse.currencyCode
    );
    const arrayLength =
      historyPkSkValues.length < 2 ? 2 : historyPkSkValues.length;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-12 col-md-2"></div>
              <div className="col-12 col-md-8">
                <div className="project_post invoice_tab work_card contract-detail-page">
                  <ul className="nav nav-pills">
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChangeHandle(1)}
                    >
                      <a
                        className={
                          activeTab === 1 ? "nav-link active" : "nav-link"
                        }
                      >
                        Time & Payments
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChangeHandle(2)}
                    >
                      <a
                        className={
                          activeTab === 2 ? "nav-link active" : "nav-link"
                        }
                      >
                        Work Report
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => this.onTabChangeHandle(3)}
                    >
                      <a
                        className={
                          activeTab === 3 ? "nav-link active" : "nav-link"
                        }
                      >
                        Contract Detail
                      </a>
                    </li>
                  </ul>
                  <div
                    className="tab-content workDiary_tab"
                    id="pills-tabContent"
                  >
                    <div
                      className={
                        activeTab === 1
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                    >
                      <UserView
                        userProjectDetails={this.state.projectResponse}
                        handlePauseContract={this.handlePauseContract}
                        unpaidAmount={unpaidAmount}
                        projectContractDetail={this.state.projectContractDetail}
                        history={this.props.history}
                      />
                      <div className="hourly_limit">
                        <div className="position_rel">
                          <h4>
                            <span className="viewDetail">
                              <a
                                className="plus_btn"
                                aria-expanded={isGraphSectionExpanded}
                                onClick={() => {
                                  this.onExpansionChange(
                                    "isGraphSectionExpanded"
                                  );
                                }}
                              >
                                +
                              </a>
                            </span>
                          </h4>
                        </div>
                        <div
                          className={
                            isGraphSectionExpanded
                              ? "collapse show"
                              : "collapse"
                          }
                          id="collapseExample2"
                        >
                          <div className="work_hours">
                            <div className="row justify-content-between">
                              <div className="col-md-4">
                                <div className="row">
                                  <div className="col-6">
                                    <span>Last 24hrs</span>
                                    <label className="green_text">
                                      {dailyWorkReport
                                        .reduce(
                                          (acc, curr) =>
                                            acc +
                                            (curr.diffOfHours <= 24
                                              ? curr.timeLogged
                                              : 0),
                                          0
                                        )
                                        .toFixed(2)}{" "}
                                      hrs
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <span>This week</span>
                                    <label className="green_text">
                                      {thisWeekTotalHours}{" "}
                                      <FormatDWH
                                        hrs
                                        currency={projectResponse.currencyCode}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="row">
                                  <div className="col-6">
                                    <span>Last Week</span>
                                    <label className="green_text">
                                      {dailyWorkReport
                                        .reduce(
                                          (acc, curr) =>
                                            acc +
                                            (curr.week === moment().week() - 1
                                              ? curr.timeLogged
                                              : 0),
                                          0
                                        )
                                        .toFixed(2)}{" "}
                                      hrs
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <span>Since Start</span>
                                    <label className="green_text">
                                      {dailyWorkReport
                                        .reduce(
                                          (acc, curr) => acc + curr.timeLogged,
                                          0
                                        )
                                        .toFixed(2)}{" "}
                                      hrs
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="range_chart">
                              <WeeklyWorkGraph
                                height={300}
                                chartData={dailyWorkReport}
                                xAxisDataKey="formattedDate"
                                areaDataKey="timeLogged"
                              />
                            </div>
                            <div className="contract-profile-detail-period">
                              <div className="row">
                                <div className="col-12 col-md-3 col-lg-2">
                                  <div className="profile-detail">
                                    <img
                                      className="image-placement-contract"
                                      src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                    />
                                    <div className="profile-detail-content">
                                      <h4>Asim Ali</h4>
                                      <p>A team</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-9  col-lg-10">
                                  <div className="table-responsive detail_tbl member_tbl">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          {days.map((d, index) => (
                                            <th scope="col" key={index}>
                                              {moment(d)
                                                .format("ddd")
                                                .toUpperCase()}
                                              <span>
                                                {this.getDate(index, days)}
                                              </span>
                                            </th>
                                          ))}
                                          <th scope="col">HOURS</th>
                                          <th scope="col">RATE</th>
                                          <th scope="col">AMOUNT</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          {days.map((d, index) => (
                                            <td
                                              className={this.getClassName(
                                                index
                                              )}
                                              key={index}
                                            >
                                              {this.getLoggedInHours(
                                                index,
                                                currentWeekData
                                              )}
                                            </td>
                                          ))}
                                          <td>
                                            {currentWeekData
                                              .reduce(
                                                (acc, curr) =>
                                                  acc + curr.timeLogged,
                                                0
                                              )
                                              .toFixed(2)}
                                          </td>
                                          <td>
                                            {this.formatCurrency(
                                              projectResponse.amountPerHour,
                                              projectResponse.currencyCode
                                            )}
                                            /{" "}
                                            <FormatDWH
                                              hr
                                              currency={
                                                projectResponse.currencyCode
                                              }
                                            />
                                          </td>
                                          <td>
                                            {this.formatCurrency(
                                              Number(
                                                projectResponse.amountPerHour
                                              ) * thisWeekTotalHours,
                                              projectResponse.currencyCode
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="contract-profile-detail-period">
                              <div className="row">
                                <div className="col-12 col-md-3 col-lg-2">
                                  <div className="profile-detail">
                                    <img
                                      className="image-placement-contract"
                                      src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                    />
                                    <div className="profile-detail-content">
                                      <h4>Sonny Cho</h4>
                                      <p>B team</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-9  col-lg-10">
                                  <div className="table-responsive detail_tbl member_tbl">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">
                                            MON<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            TUE<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            WED<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            THU<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            FRI<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            SAT<span>7/23</span>
                                          </th>
                                          <th scope="col">
                                            SUN<span>7/23</span>
                                          </th>
                                          <th scope="col">HOURS</th>
                                          <th scope="col">RATE</th>
                                          <th scope="col">AMOUNT</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="bg_gray">
                                            <span className="not-complete-box-time-period">
                                              75%
                                            </span>
                                          </td>
                                          <td className="bg_gray">
                                            <span className="not-complete-box-time-period">
                                              65%
                                            </span>
                                          </td>
                                          <td className="bg_gray">
                                            <span className="not-complete-box-time-period">
                                              55%
                                            </span>
                                          </td>
                                          <td className="bg_gray">---</td>
                                          <td className="bg_gray  ">
                                            <span className="complete-box-time-period">
                                              100%
                                            </span>
                                          </td>
                                          <td></td>
                                          <td></td>
                                          <td>0.00</td>
                                          <td>$100.00/day</td>
                                          <td>$2,000.00</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hourly_limit">
                        <div className="position_rel">
                          <h4>
                            <span className="viewDetail">
                              <a
                                className="plus_btn"
                                aria-expanded={isTaskManagementSectionExpanded}
                                onClick={() =>
                                  this.onExpansionChange(
                                    "isTaskManagementSectionExpanded"
                                  )
                                }
                              >
                                +
                              </a>
                            </span>
                          </h4>
                        </div>
                        <div
                          className={
                            isTaskManagementSectionExpanded
                              ? "collapse show"
                              : "collapse"
                          }
                          id="collapseExample3"
                        >
                          <div className="task_manage post_modal post_form">
                            <div className="save_cancel d-flex align-items-center">
                              <label className="green_text">
                                Task Management
                              </label>
                              <button type="button" className="btn gray_btn">
                                Issue new task
                              </button>
                            </div>

                            <div className="table-responsive detail_tbl">
                              <table className="table text-center">
                                <thead>
                                  <tr>
                                    <th scope="col" className="text-left">
                                      Task
                                    </th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Key</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="text-left">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customcheck19"
                                          required=""
                                          checked
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customcheck19"
                                        >
                                          Login
                                        </label>
                                      </div>
                                    </td>
                                    <td>Completed</td>
                                    <td>NYA1</td>
                                    <td>03:45</td>
                                  </tr>
                                  <tr>
                                    <td className="text-left">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customcheck20"
                                          required=""
                                          checked
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customcheck20"
                                        >
                                          Forgot Password
                                        </label>
                                      </div>
                                    </td>
                                    <td>Completed</td>
                                    <td>NYA2</td>
                                    <td>03:45</td>
                                  </tr>
                                  <tr>
                                    <td className="text-left">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customcheck21"
                                          required=""
                                          checked
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customcheck21"
                                        >
                                          Search
                                        </label>
                                      </div>
                                    </td>
                                    <td>Completed</td>
                                    <td>NYA3</td>
                                    <td>03:45</td>
                                  </tr>
                                  <tr>
                                    <td className="text-left">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customcheck22"
                                          required=""
                                          checked
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customcheck22"
                                        >
                                          Push notification
                                        </label>
                                      </div>
                                    </td>
                                    <td>Completed</td>
                                    <td>NYA4</td>
                                    <td>03:45</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <Pagenation
                            items={new Array(25)}
                            onChangePage={() => {}}
                            initialPage={1}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        activeTab === 2
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                    >
                      <UserView
                        userProjectDetails={this.state.projectResponse}
                        handlePauseContract={this.handlePauseContract}
                        unpaidAmount={unpaidAmount}
                        projectContractDetail={this.state.projectContractDetail}
                        history={this.props.history}
                      />
                      {isReportTableViewActive ? (
                        <WorkTableReportView
                          onReportViewChange={this.onReportViewChange}
                          isReportTableViewActive={isReportTableViewActive}
                          userTimeTracking={userTimeTracking}
                          saveHourlyDetailsData={this.saveHourlyDetailsData}
                          savedHourlyDetailsData={savedHourlyDetailsData}
                        />
                      ) : (
                        <WorkGridReportView
                          onReportViewChange={this.onReportViewChange}
                          isReportTableViewActive={isReportTableViewActive}
                          projectUserTimeTracking={projectUserTimeTracking}
                          saveProjectHourlyDetailsData={
                            this.saveProjectHourlyDetailsData
                          }
                          savedProjectHourlyDetailsData={
                            savedProjectHourlyDetailsData
                          }
                        />
                      )}
                    </div>
                    <div
                      className={
                        activeTab === 3
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                    >
                      <UserView
                        userProjectDetails={this.state.projectResponse}
                        handlePauseContract={this.handlePauseContract}
                        unpaidAmount={unpaidAmount}
                        projectContractDetail={this.state.projectContractDetail}
                        history={this.props.history}
                      />
                      <div className="hourly_limit post_form hourly_report">
                        <div className="position_rel">
                          <h4>
                            <span className="viewDetail">
                              <a
                                className="plus_btn"
                                aria-expanded={isContractDetailSectionExpanded}
                                onClick={() =>
                                  this.onExpansionChange(
                                    "isContractDetailSectionExpanded"
                                  )
                                }
                              >
                                +
                              </a>
                            </span>
                          </h4>
                        </div>
                        <div
                          className={
                            isContractDetailSectionExpanded
                              ? "collapse show"
                              : "collapse"
                          }
                          id="collapseExample4"
                        >
                          <div className="work_date">
                            <a title="">
                              <i
                                className="fa fa-angle-left"
                                aria-hidden="true"
                              />
                            </a>
                            <span>
                              {moment(projectResponse.postDateTime).format(
                                "dddd, MMM D, YYYY"
                              )}
                            </span>
                            <a title="">
                              <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                          <div className="hourly_rate basic_font">
                            <div className="row align-items-end">
                              <div className="col-md-8">
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Rate:
                                  </label>
                                  {isRateEditable ? (
                                    <span className="rate_box">
                                      <input
                                        type="text"
                                        name="rate"
                                        value={rate}
                                        className="rate_box_select form-control border-0 py-0 font-weight-bold"
                                        onChange={(e) =>
                                          this.onTextHandleChange(e)
                                        }
                                      />
                                    </span>
                                  ) : (
                                    <span className="rate_box">${rate}</span>
                                  )}
                                  <span>Per Hour</span>
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.onEditIconClick("isRateEditable")
                                    }
                                  />
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Weekly Limit :
                                  </label>
                                  {isWeekLimitEditable ? (
                                    <span className="rate_box">
                                      <input
                                        type="text"
                                        name="weekLimit"
                                        value={weekLimit}
                                        className="rate_box_select form-control border-0 py-0 font-weight-bold"
                                        onChange={(e) =>
                                          this.onTextHandleChange(e)
                                        }
                                      />
                                    </span>
                                  ) : (
                                    <span className="rate_box">
                                      {weekLimit}
                                    </span>
                                  )}
                                  <span>Per Hour</span>
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.onEditIconClick(
                                        "isWeekLimitEditable"
                                      )
                                    }
                                  />
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl feedbk_lbl_manualTimeMobile">
                                    <i
                                      className="fa fa-question-circle"
                                      aria-hidden="true"
                                    />
                                    Manual Time :
                                  </label>
                                  {/* <span className="rate_box">Allowed</span> */}
                                  <span className="rate_box">
                                    <select
                                      name="manualTime"
                                      className="rate_box_select form-control border-0 py-0"
                                      style={{ padding: ".375rem 0.55rem" }}
                                      value={isManualTimeAllow}
                                      onChange={(e) => {
                                        this.setState({
                                          isManualTimeAllow:
                                            e.target.value === "true",
                                        });
                                      }}
                                    >
                                      <option value={true}>Allowed</option>
                                      <option value={false}>Disallowed</option>
                                    </select>
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Start Date:
                                  </label>
                                  <span>
                                    {moment(
                                      projectContractDetail.contractCreatedDateTime
                                    ).format("D MMM YYYY")}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Hired By :
                                  </label>
                                  <span>
                                    {projectResponse.userName || "Sonny Cho"}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <label className="green_text feedbk_lbl">
                                    Contract ID:
                                  </label>
                                  <span>
                                    {projectContractDetail.contractCode ||
                                      "00000000000"}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="save_cancel">
                                  <button
                                    type="button"
                                    className="btn save_btn"
                                    onClick={() => this.saveChanges()}
                                  >
                                    Save Changes{" "}
                                    {this.state.loading ? (
                                      <i className="fa fa-spinner fa-spin"></i>
                                    ) : (
                                      ""
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="work_detail contract_detail">
                            <h5>View History of Contract Changes</h5>
                            <div className="contract_tbl">
                              <div className="table-responsive detail_tbl">
                                <table
                                  hidden={projectHistory.length > 0}
                                  className="table text-center"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col" className="text-left">
                                        Date Time
                                      </th>
                                      <th scope="col" className="text-left">
                                        Description
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-left">
                                        21. Aug 2018
                                      </td>
                                      <td className="text-left">
                                        Increased hourly rate from $5 to $6
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left">
                                        21. Aug 2018
                                      </td>
                                      <td className="text-left">
                                        Manual Time is disallowed
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left">
                                        21. Aug 2018
                                      </td>
                                      <td className="text-left">
                                        Increased hourly rate from $5 to $6
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left">
                                        21. Aug 2018
                                      </td>
                                      <td className="text-left">
                                        Increased hourly rate from $5 to $6
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  hidden={projectHistory.length === 0}
                                  className="table text-center"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col" className="text-left">
                                        Date Time
                                      </th>
                                      <th scope="col" className="text-left">
                                        Description
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {projectHistory.map((h, index) => (
                                      <tr key={index}>
                                        <td className="text-left">
                                          {moment(h.entryDateTime).format(
                                            "DD MMM YYYY"
                                          )}
                                        </td>
                                        <td className="text-left">
                                          {h.description}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <Pagenation
                                items={new Array(arrayLength)
                                  .fill(1)
                                  .map((e, i) => i + 1)}
                                onChangePage={(page) =>
                                  this.fetchHistoryData(page)
                                }
                                initialPage={initialPage}
                                pageSize={1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authReducer,
    languageType: state.languageReducer.languageType,
  };
}

function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchProps)(FreeContractDetail);

import React, { useEffect, useState } from "react";
import "../contractDetail.scss";
import { useSelector, useDispatch } from "react-redux";
import Format from "../../../../components/numberFormat";
import { UserView } from "../../../../components/freelancer/userView";
import Pagenation from "../../../../components/pagenation";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import moment from "moment";
import FormatDWH from "../../../../components/formatDWH";
import { WeeklyWorkGraph } from "../../../../components/charts/weeklyWorkGraph";
import Skeleton from "../../../../components/skeleton/skeleton";
import { CreateMilelage } from "../../../../components/modals/createMilelage";
import { JungleModal } from "../../../../components/modals/jungleModal";

function TimeAndPayment(props) {
  const [unpaidAmount, setUnpaidAmount] = useState(0.0);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isGraphSectionExpanded, setIsGraphSectionExpanded] = useState(true);
  const [isTaskManagementSectionExpanded, setIsTaskManagementSectionExpanded] =
    useState(true);
  const [timeSummary, setTimeSummary] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState([]);

  let days = [];
  let day = moment().startOf("isoWeek");
  while (day <= moment().endOf("isoWeek")) {
    days.push(day.toDate());
    day = day.clone().add(1, "d");
  }

  const onExpansionChange = (key) => {
    setIsGraphSectionExpanded(!isGraphSectionExpanded);
  };
  useEffect(() => {
    console.log(props.contractDetail, "props.contractDetail");
    getTimeSummary(props.contractDetail?.projectContractId);
    getWeeklySummary(props.contractDetail?.projectContractId);
  }, [props.contractDetail]);
  const getTimeSummary = async (projectContractId) => {
    if (projectContractId) {
      let result = await request(
        `${ENDPOINT["GetTimeSummary"]}?contractId=${projectContractId}`,
        getOptions({})
      );
      if (result.success) {
        setTimeSummary(result.result);
      }
    }
  };
  const getWeeklySummary = async (projectContractId) => {
    if (projectContractId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetWeeklySummary"]}?contractId=${projectContractId}`,
        getOptions({})
      );
      if (result.success) {
        setWeeklySummary(result.result);
        setIsSkeletonLoading(false);
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  const getDate = (dayNo, days) => {
    return moment(days[dayNo]).format("MM/DD");
  };

  const getClassName = (dayNo) => {
    return moment().weekday() <= dayNo ? "" : "bg_gray";
  };
  const getLoggedInHours = (dayNo, currentWeekData) => {
    const foundData = currentWeekData.find(
      (d) => moment(d.trackingDate).day() - 1 === dayNo
    );
    return foundData
      ? Number(foundData.trackingTime.totalHours).toFixed(2)
      : moment().weekday() <= dayNo
        ? "--"
        : "--";
  };
  const formatCurrency = (value = 0, currency = "USD") => {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(!isNaN(Number(value)) ? Number(value) : 0);
  };
  return (
    <>
      <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      <div hidden={isSkeletonLoading}>
        <UserView
          projectDetail={props.projectDetail}
          // handlePauseContract={this.handlePauseContract}
          unpaidAmount={
            <Format
              number={unpaidAmount}
              currency={props.projectDetail.currencyCode}
            />
          }
          contractDetail={props.contractDetail}
          timeAndPaymentsTab={true}
          userProfile={props?.userProfile}
          {...props}
        />
        <div className="hourly_limit"   /*  hidden={props.projectDetail.projectType==="OfficeWork"} */>
          <div className="position_rel">
            <h4>
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isGraphSectionExpanded}
                  onClick={() => {
                    onExpansionChange("isGraphSectionExpanded");
                  }}
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div

            className={isGraphSectionExpanded ? "collapse show" : "collapse"}
            id="collapseExample2"
          >
            <div className="work_hours">
              {
                props.projectDetail.projectType === "Milestone" && <div>
                  <div className="row justify-content-between">
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-6">
                          <span>Budget</span>
                          <label className="green_text">
                            {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$50

                          </label>
                        </div>
                        <div className="col-6">
                          <span>In Escrow</span>
                          <label className="green_text">
                            {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */}  US$
                            20
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-6">
                          <span>Milestone Paid</span>
                          <label className="green_text">
                            {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$420

                          </label>
                        </div>
                        <div className="col-6">
                          <span>Remaining</span>
                          <label className="green_text">
                            {/* {userProjectDetails?.projectResponse
                                            ?.currencyCode + " "} */} US$ 80
                            {/* {projectContractDetail?.offerAmount -
                                            projectContractDetail?.releasedAmount} */}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="total_earn">
                        <span>Total Payments</span>
                        <label className="green_text">
                          {/* {userProjectDetails?.projectResponse
                                          ?.currencyCode + " "} */} US$
                          {/* {projectContractDetail?.releasedAmount} */} 500
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="current_milston">
                    <div className="row align-items-center">
                      <div className="col-sm-8">
                        <div className="escrow">
                          <span>Current Milestone</span>
                        </div>
                        <div className="escrow">
                          <span>Task Key :</span>{" "}
                          <span>NYA4</span>
                        </div>
                        <div className="escrow">
                          <span>In Escrow: $20.00</span>
                        </div>
                      </div>

                      <div className="col-sm-4 text-right">
                        <div className="save_cancel">
                          <JungleModal
                            dialogClassName="jungle-modal"
                            contentClassName="jungle-modal-content"
                            customClose
                            Body={CreateMilelage}
                            OpenButton={({ handleClick }) => (
                              <button
                                type="button"
                                className="btn save_btn"
                                onClick={handleClick}
                              >
                                Create New Milestone
                              </button>
                            )}
                            title="Create Milestone"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="task_manage milestone_tble">
                    <div className="table-responsive detail_tbl">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th scope="col" className="text-left">
                              Offered Milestone
                            </th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr>
                            <td
                              className="text-left"
                              style={{ maxWidth: 200 }}
                            >
                              UI Design completion
                            </td>
                            <td>
                              2021/12/08
                              {/* {moment(
                                                  milestone?.milestoneDateTime
                                                ).format("YYYY MMM DD")} */}
                            </td>
                            <td>
                              2021/12/28
                              {/* {moment(
                                                  milestone?.milestoneDueDate
                                                ).format("YYYY MMM DD")} */}
                            </td>
                            <td>
                              US$600
                              {/* {userProjectDetails
                                                  ?.projectResponse
                                                  ?.currencyCode + " "}
                                                {milestone?.milestoneAmount} */}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left"
                              style={{ maxWidth: 200 }}
                            >
                              Api implementation
                            </td>
                            <td>
                              2021/12/28
                              {/* {moment(
                                                  milestone?.milestoneDateTime
                                                ).format("YYYY MMM DD")} */}
                            </td>
                            <td>
                              2022/02/12
                              {/* {moment(
                                                  milestone?.milestoneDueDate
                                                ).format("YYYY MMM DD")} */}
                            </td>
                            <td>
                              US$1800
                              {/* {userProjectDetails
                                                  ?.projectResponse
                                                  ?.currencyCode + " "}
                                                {milestone?.milestoneAmount} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              }
              {
                (props.projectDetail.projectType === "FreeContract" || props.projectDetail.projectType === "Hourly") &&
                <div className="row justify-content-between">
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-6">
                        <span>Last 24hrs</span>
                        <label className="green_text">
                          {timeSummary?.lastDayHours?.totalHours
                            ? Number(
                              timeSummary?.lastDayHours?.totalHours
                            ).toFixed(2)
                            : "0.00"}{" "}
                          hrs
                        </label>
                      </div>
                      <div className="col-6">
                        <span>This week</span>
                        <label className="green_text">
                          {timeSummary?.thisWeekHours?.totalHours
                            ? Number(
                              timeSummary?.thisWeekHours?.totalHours
                            ).toFixed(2)
                            : "0.00"}{" "}
                          <FormatDWH
                            hrs
                            currency={props.projectDetail.currencyCode}
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
                          {timeSummary?.lastWeekHours?.totalHours
                            ? Number(
                              timeSummary?.lastWeekHours?.totalHours
                            ).toFixed(2)
                            : "0.00"}{" "}
                          hrs
                        </label>
                      </div>
                      <div className="col-6">
                        <span>Since Start</span>
                        <label className="green_text">
                          {timeSummary?.totalHours?.totalHours
                            ? Number(timeSummary?.totalHours?.totalHours).toFixed(
                              2
                            )
                            : "0.00"}{" "}
                          hrs
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                (props.projectDetail.projectType === "FreeContract" || props.projectDetail.projectType === "Hourly") &&
                <div className="range_chart">
                  <WeeklyWorkGraph
                    height={300}
                    chartData={weeklySummary}
                    xAxisDataKey="formattedDate"
                    areaDataKey="timeLogged"
                  />
                </div>
              }
              {
                (props.projectDetail.projectType === "FreeContract" || props.projectDetail.projectType === "Hourly") &&
                <div className="contract-profile-detail-period">
                  <div className="row">
                    <div className="col-12 col-md-3 col-lg-2">
                      <div className="profile-detail">
                        <img
                          className="image-placement-contract"
                          src={
                            props?.userProfile?.userProfileUrl
                              ? `https://dhihitu47nqhv.cloudfront.net/${props?.userProfile?.userProfileUrl}`
                              : "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                          }
                        />
                        <div className="profile-detail-content">
                          <h4>
                            {props?.userProfile?.firstName +
                              " " +
                              props?.userProfile?.lastName}
                          </h4>
                          <p>Freelancer</p>
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
                                  {moment(d).format("ddd").toUpperCase()}
                                  <span>{getDate(index, days)}</span>
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
                                <td className={getClassName(index)} key={index}>
                                  {getLoggedInHours(index, weeklySummary)}
                                </td>
                              ))}
                              <td>
                                {timeSummary?.thisWeekHours?.totalHours
                                  ? Number(
                                    timeSummary?.thisWeekHours?.totalHours
                                  ).toFixed(2)
                                  : "0.00"}{" "}
                              </td>
                              <td>
                                {formatCurrency(
                                  props.contractDetail?.finalizedHourlyRate,
                                  props.contractDetail?.project?.currencyCode
                                )}
                                /{" "}
                                <FormatDWH
                                  hr
                                  currency={props.projectDetail.currencyCode}
                                />
                              </td>
                              <td>
                                {formatCurrency(
                                  Number(
                                    props.contractDetail?.finalizedHourlyRate
                                  ) *
                                  (timeSummary?.thisWeekHours?.totalHours
                                    ? Number(
                                      timeSummary?.thisWeekHours?.totalHours
                                    ).toFixed(2)
                                    : 0),
                                  props.contractDetail?.project?.currencyCode
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                (props.projectDetail.projectType === "FreeContract" || props.projectDetail.projectType === "OfficeWork") &&
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
              }
            </div>
          </div>
        </div>
        <div className="hourly_limit" >
          <div className="position_rel">
            <h4>
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isTaskManagementSectionExpanded}
                  onClick={() =>
                    onExpansionChange("isTaskManagementSectionExpanded")
                  }
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div
            className={
              isTaskManagementSectionExpanded ? "collapse show" : "collapse"
            }
            id="collapseExample3"
          >
            <div className="task_manage post_modal post_form">
              <div className="save_cancel d-flex align-items-center">
                <label className="green_text">Task Management</label>
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
              onChangePage={() => { }}
              initialPage={1}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeAndPayment;

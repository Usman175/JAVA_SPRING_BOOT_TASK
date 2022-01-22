import React, { useEffect, useState } from "react";
import "../contractDetail.scss";
import Format from "../../../../components/numberFormat";
import { UserView } from "../../../../components/freelancer/userView";
import moment from "moment";
import { useSelector } from "react-redux";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import Skeleton from "../../../../components/skeleton/skeleton";
import Pagination from "../../../../components/pagination";
import notifications from "../../../../utils/notifications";
import NoDataAvailable from "../../../../shared/error/not-data-available-new";
function ContractDetail(props) {
  const [unpaidAmount, setUnpaidAmount] = useState(0.0);
  const [isContractDetailSectionExpanded, setIsContractDetailSectionExpanded] =
    useState(true);
  const [contractStats, setContractStats] = useState({
    rate: props.contractDetail?.finalizedHourlyRate
      ? props.contractDetail?.finalizedHourlyRate
      : 0,
    weekLimit: props.contractDetail?.finalizedHourOfWeek
      ? props.contractDetail?.finalizedHourOfWeek
      : 0,
    dailyRate: props.projectDetail.projectType === "OfficeWork" && props.contractDetail?.finalizedSalarayAmount
      ? props.contractDetail?.finalizedSalarayAmount
      : props.contractDetail.finalizedDailyRate ? props.contractDetail.finalizedDailyRate : 0,
    milestoneAmount: props.contractDetail.finalizedMilestoneAmount ? props.contractDetail.finalizedMilestoneAmount : '0'
  });
  const [isRateEditable, setIsRateEditable] = useState(false);
  const [isDailyRateEditable, setIsDailyRateEditable] = useState(false);
  const [isWeekLimitEditable, setIsWeekLimitEditable] = useState(false);
  const [isMilestoneAmountEditable, setIsMilestoneAmountEditable] = useState(false);
  const [isManualTimeAllow, setIsManualTimeAllow] = useState(true);
  const [projectHistory, setProjectHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
    total: 10,
  });
  const [contractHistoryData, setContractHistoryData] = useState([])
  const [contractHistoryLoading, setContractHistoryLoading] = useState(false);



  const user = useSelector((state) => state.authReducer);

  const onExpansionChange = () => {
    setIsContractDetailSectionExpanded(!isContractDetailSectionExpanded);
  };

  useEffect(() => {
    if (props.contractDetail.projectContractId) {
      setContractStats({
        ...contractStats, milestoneAmount: props.contractDetail.finalizedMilestoneAmount,
        dailyRate: props.projectDetail.projectType === "OfficeWork" && props.contractDetail?.finalizedSalarayAmount
          ? props.contractDetail?.finalizedSalarayAmount
          : props.contractDetail.finalizedDailyRate ? props.contractDetail.finalizedDailyRate : 0,
        rate: props.contractDetail.finalizedHourlyRate,
        weekLimit: props.contractDetail.finalizedHourOfWeek,
      })
    }
    if (props.contractDetail.projectContractId) {
      getContractHistory()
    }
  }, [props.contractDetail])

  const onEditIconClick = (name) => {
    if (name === "isRateEditable") {
      document.getElementsByName("rate")[0] &&
        document.getElementsByName("rate")[0].focus();
      setIsRateEditable(!isRateEditable);
      setIsDailyRateEditable(false);
    } else if (name === "isDailyRateEditable") {
      document.getElementsByName("dailyRate")[0] &&
        document.getElementsByName("dailyRate")[0].focus();
      setIsDailyRateEditable(!isRateEditable);
      setIsRateEditable(false);
    } else if (name === "isWeekLimitEditable") {
      document.getElementsByName("weekLimit")[0] &&
        document.getElementsByName("weekLimit")[0].focus();
      setIsWeekLimitEditable(!isWeekLimitEditable);
    }
  };
  const onTextHandleChange = (e, type) => {
    if (type === "weekLimit") {
      setContractStats({ ...contractStats, weekLimit: e.target.value });
    } else {
      setContractStats({ ...contractStats, [type]: e.target.value });
    }
  };


  const getContractHistory = async (move) => {
    let userId = props.userProfile?.userId;
    let projectContractId = props.contractDetail.projectContractId;
    let projectId = props.projectDetail.projectId;
    let pageNumber = pagination.pageNumber;
    setContractHistoryLoading(true)
    if (move === "next") {
      setPagination({
        ...pagination, pageNumber: pagination.pageNumber + 1
      })
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setPagination({
        ...pagination, pageNumber: pagination.pageNumber - 1
      })
      pageNumber = pageNumber - 1;
    }
    let result = await request(
      `${ENDPOINT["GetProjectContractHistory"]
      }?projectContractId=${projectContractId}&userId=${userId}&projectId=${projectId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
      getOptions({})
    );
    if (result.success) {
      setContractHistoryData(result.result.entries);
      setPagination({
        pageNumber: result.result.pageNumber || result.result.pageNumer,
        pageSize: result.result.pageSize,
        total: result.result.total,
      });
      setContractHistoryLoading(false)
    } else { }
    setContractHistoryLoading(false)
  }


  const saveChangesContract = async () => {
    let param
    if (props.projectDetail.projectType === "Hourly") {
      param = {
        projectId: props.projectDetail.projectId,
        projectContractId: props.contractDetail.projectContractId,
        finalizedHourlyRate: contractStats.rate,
        finalizedHourOfWeek: contractStats.weekLimit,
        allowManualTimeLog: isManualTimeAllow,
        finalizedMilestoneAmount: '',
        finalizedDailyRate: ''
      };
    }

    if (props.projectDetail.projectType === "FreeContract") {
      param = {
        projectId: props.projectDetail.projectId,
        projectContractId: props.contractDetail.projectContractId,
        finalizedHourlyRate: contractStats.rate,
        finalizedHourOfWeek: contractStats.weekLimit,
        allowManualTimeLog: isManualTimeAllow,
        finalizedMilestoneAmount: '',
        finalizedDailyRate: contractStats.dailyRate
      };
    }

    if (props.projectDetail.projectType === "Milestone") {
      param = {
        projectId: props.projectDetail.projectId,
        projectContractId: props.contractDetail.projectContractId,
        finalizedHourlyRate: '',
        finalizedHourOfWeek: '',
        finalizedMilestoneAmount: contractStats.milestoneAmount,
        finalizedDailyRate: ''
      };
    }


    if (props.projectDetail.projectType === "OfficeWork") {
      param = {
        projectId: props.projectDetail.projectId,
        projectContractId: props.contractDetail.projectContractId,
        finalizedHourlyRate: '',
        finalizedHourOfWeek: '',
        finalizedMilestoneAmount: '',
        finalizedDailyRate: contractStats.dailyRate
      };
    }

    setLoading(true);

    let result = await request(
      `${ENDPOINT["UpdateContractCondition"]}`,
      postOptions(param)
    );
    if (result.success) {
      notifications.showSuccess("Contract updated successfully")
      let contractDetailNew = props.contractDetail;
      contractDetailNew.finalizedHourlyRate = contractStats.rate;
      contractDetailNew.finalizedDailyRate = contractStats.dailyRate;
      contractDetailNew.finalizedHourOfWeek = contractStats.weekLimit;
      contractDetailNew.finalizedMilestoneAmount = contractStats.milestoneAmount
      contractDetailNew.allowManualTimeLog = isManualTimeAllow;
      if (props.projectDetail.projectType === "Hourly") {
        props.history.push({
          pathname: '/hourly-contract-detail-freelancer',
          state: contractDetailNew
        })
      }
      if (props.projectDetail.projectType === "OfficeWork") {
        props.history.push({
          pathname: '/office-contract-detail-freelancer',
          state: contractDetailNew
        })
      }
      if (props.projectDetail.projectType === "FreeContract") {
        props.history.push({
          pathname: '/free-contract-detail-freelancer',
          state: contractDetailNew
        })
      }
      if (props.projectDetail.projectType === "Milestone") {
        props.history.push({
          pathname: '/milestone-contract-detail-freelancer',
          state: contractDetailNew
        })
      }
      getContractHistory()

      setLoading(false);
    } else {
      setLoading(false)
      notifications.showError("Some Error occurred please try again later")
    }




  };
  return (
    <div>
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
      <div className="hourly_limit post_form hourly_report">
        <div className="position_rel">
          <h4>
            <span className="viewDetail">
              <a
                className="plus_btn"
                aria-expanded={isContractDetailSectionExpanded}
                onClick={() =>
                  onExpansionChange("isContractDetailSectionExpanded")
                }
              >
                +
              </a>
            </span>
          </h4>
        </div>
        <div
          className={
            isContractDetailSectionExpanded ? "collapse show" : "collapse"
          }
          id="collapseExample4"
        >
          <div hidden={true} className="work_date">
            <a title="">
              <i className="fa fa-angle-left" aria-hidden="true" />
            </a>
            <span>
              {moment(props.projectDetail.postDateTime).format(
                "dddd, MMM D, YYYY"
              )}
            </span>
            <a title="">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </a>
          </div>
          <div className="hourly_rate basic_font">
            <div className="row align-items-end">
              <div className="col-md-8">
                {(props.projectDetail.projectType != "OfficeWork" && props.projectDetail.projectType != "Milestone") && <div className="d-flex align-items-center">
                  <label className="green_text feedbk_lbl">Hourly Rate:</label>
                  {isRateEditable ? (
                    <span className="rate_box">
                      <input
                        type="text"
                        name="rate"
                        id="hourly-rate-update"
                        value={contractStats.rate}
                        autoFocus
                        className="rate_box_select form-control border-0 py-0 font-weight-bold"
                        onChange={(e) => onTextHandleChange(e, "rate")}
                      />
                    </span>
                  ) : (
                    <span className="rate_box">${contractStats.rate}</span>
                  )}
                  <span>Per Hour</span>
                  <i
                    className="fa fa-pencil"
                    aria-hidden="true"
                    onClick={() => onEditIconClick("isRateEditable")}
                  />
                </div>}

                {
                  (props.projectDetail.projectType != "Hourly" && props.projectDetail.projectType != "Milestone") &&
                  <div className="d-flex align-items-center">
                    <label className="green_text feedbk_lbl">Daily Rate:</label>
                    {isDailyRateEditable ? (
                      <span className="rate_box">
                        <input
                          type="text"
                          name="dailyRate"
                          autoFocus
                          value={contractStats.dailyRate}
                          className="rate_box_select form-control border-0 py-0 font-weight-bold"
                          onChange={(e) => onTextHandleChange(e, "dailyRate")}
                        />
                      </span>
                    ) : (
                      <span className="rate_box">
                        ${contractStats.dailyRate}
                      </span>
                    )}
                    <span>Per day</span>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => onEditIconClick("isDailyRateEditable")}
                    />
                  </div>
                }


                {((props.projectDetail.projectType === "FreeContract" ||
                  props.projectDetail.projectType === "Hourly") && props.projectDetail.projectType != "Milestone") && (
                    <div className="d-flex align-items-center">
                      <label className="green_text feedbk_lbl">
                        Weekly Limit :
                      </label>
                      {isWeekLimitEditable ? (
                        <span className="rate_box">
                          <input
                            type="text"
                            autoFocus
                            name="weekLimit"
                            value={contractStats.weekLimit}
                            className="rate_box_select form-control border-0 py-0 font-weight-bold"
                            onChange={(e) => onTextHandleChange(e, "weekLimit")}
                          />
                        </span>
                      ) : (
                        <span className="rate_box">
                          {contractStats.weekLimit}
                        </span>
                      )}
                      <span>Per Week</span>
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        onClick={() => onEditIconClick("isWeekLimitEditable")}
                      />
                    </div>
                  )}
                {props.projectDetail.projectType === "Milestone" && (
                  <div className="d-flex align-items-center">
                    <label className="green_text feedbk_lbl">
                      Milestone amount:
                    </label>
                    {isMilestoneAmountEditable ? (
                      <span className="rate_box">
                        <input
                          type="text"
                          name="weekLimit"
                          autoFocus
                          value={contractStats.milestoneAmount}
                          className="rate_box_select form-control border-0 py-0 font-weight-bold"
                          onChange={(e) => onTextHandleChange(e, "milestoneAmount")}
                        />
                      </span>
                    ) : (
                      <span className="rate_box">
                        US$ {contractStats.milestoneAmount}
                      </span>
                    )}
                    <span>{" "}</span>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => setIsMilestoneAmountEditable(true)}
                    />
                  </div>
                )}
                {
                  props.projectDetail.projectType != "Milestone" && props.projectDetail.projectType != "OfficeWork" && <div className="d-flex align-items-center">
                    <label className="green_text feedbk_lbl feedbk_lbl_manualTimeMobile">
                      <i className="fa fa-question-circle" aria-hidden="true" />
                      Manual Time :
                    </label>
                    {/* <span className="rate_box">Allowed</span> */}
                    <span className="rate_box">
                      <select
                        name="manualTime"
                        className="rate_box_select form-control border-0 py-0 font-weight-bold"
                        style={{ padding: ".375rem 0.55rem" }}
                        value={isManualTimeAllow}
                        onChange={(e) => {
                          setIsManualTimeAllow(e.target.value === "true");
                        }}
                      >
                        <option value={true}>Allowed</option>
                        <option value={false}>Disallowed</option>
                      </select>
                    </span>
                  </div>
                }

                <div className="d-flex align-items-center">
                  <label className="green_text feedbk_lbl">Start Date:</label>
                  <span>
                    {moment(
                      props.contractDetail.contractCreatedDateTime
                    ).format("D MMM YYYY")}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <label className="green_text feedbk_lbl">Hired By :</label>
                  <span>{(user.clientAuth?.firstName + " " + user.clientAuth?.lastName) || "Sonny Cho"}</span>
                </div>
                <div className="d-flex align-items-center">
                  <label className="green_text feedbk_lbl">Contract ID:</label>
                  <span>
                    {props.contractDetail.contractCode || "00000000000"}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="save_cancel">
                  <button
                    type="button"
                    className="btn save_btn"
                    onClick={() => saveChangesContract()}
                  >
                    Save Changes{" "}
                    {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="work_detail contract_detail">
            <h5>View History of Contract Changes</h5>
            <Skeleton
              count={2}
              isSkeletonLoading={contractHistoryLoading}
            />
            <div hidden={contractHistoryLoading} className="contract_tbl">
              <div className="table-responsive detail_tbl">
                {
                  contractHistoryData.length > 0 ?
                    <table
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
                        {
                          contractHistoryData.map((item, index) => (
                            <tr key={index} >
                              <td className="text-left">
                                {moment(item.createDateTime).format("DD MMM YYYY")}
                              </td>
                              <td className="text-left">
                                {item.description}
                              </td>
                            </tr>
                          ))
                        }

                      </tbody>
                    </table> :
                    <NoDataAvailable
                      title="Contract history not exist yet"
                      buttonText="View your other contracts"
                      path="/my-contracts"
                      color={"#0d2146"}
                      {...props}
                    />
                }
              </div>
              {contractHistoryData?.length > 0 && (
                <Pagination
                  isPreviousPage={pagination.pageNumber > 1 ? true : false}
                  isNextPage={
                    pagination.pageNumber * pagination.pageSize <
                      pagination.total
                      ? true
                      : false
                  }
                  lastPkEvaluatedTrack={contractHistoryData}
                  pageNumber={pagination.pageNumber}
                  moveBack={() =>
                    getContractHistory("prev")
                  }
                  moveNext={() =>
                    getContractHistory("next")
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractDetail;

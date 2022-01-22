import React, { Component } from "react"
import { Link } from "react-router-dom"
import DropdownList from "../../../../components/dropdowns/dropdownList"
import moment from "moment";
import Pagination from "../../../../components/pagenation";

class WorkTableReportView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 2,
      currentKey: 0,
      userTimeTracking: [],
      dayNo: 3,
      totalDaysCount: [],
      initialPage: 1,
      tableData: [],
      isAreaExpanded: true,
      selectedTimeZone: 'local'
    }
  }

  componentDidMount() {
    if(this.props.savedHourlyDetailsData && Object.keys(this.props.savedHourlyDetailsData).length) {
      this.setState({ ...this.props.savedHourlyDetailsData }, () => {
        this.getSingleDayData();
      })
    }
  }

  componentWillUnmount() {
    this.props.saveHourlyDetailsData(this.state);
  }

  componentDidUpdate(prevProps) {
    if((this.props.userTimeTracking || []).length && !this.state.userTimeTracking.length) {
      this.setState({userTimeTracking: this.props.userTimeTracking}, () => {
        this.getSingleDayData();
      })
    }
  }

  handleNextReport = () => {
    this.setState({
      currentKey: this.state.currentKey + 1,
      initialPage: 1,
      tableData: [],
    }, () => {
      this.getSingleDayData(this.state.currentKey)
    })
  }

  handlePrevReport = () => {
    this.setState({
      currentKey: this.state.currentKey - 1,
      initialPage: 1,
      tableData: [],
    }, () => {
      this.getSingleDayData(this.state.currentKey)
    })
  }

  getSingleDayData = (day = this.state.dayNo) => {
    let {userTimeTracking} = this.state;
    let totalDaysCount = [];

    userTimeTracking.map(t => totalDaysCount.indexOf(moment(t.startTime).format('L')) === -1 ?
        totalDaysCount.push(moment(t.startTime).format('L')) :
        null);
    this.setState({totalDaysCount, currentKey: day === this.state.dayNo ? totalDaysCount.length-1 : day});

    let records = (userTimeTracking || []).filter(d => totalDaysCount[day-1] === moment(d.startTime).format('MM/DD/YYYY'))
        .map(r => {
          let processList = r.processList.map(p => p.applicationTime.length && !isNaN(Number(p.applicationTime)) ? parseFloat(p.applicationTime.replace(':','.')) : 0);
          let maxTimeIndex = processList.indexOf(Math.max(processList));
          return {
            ...r,
            maxProcessList: r.processList[maxTimeIndex]
          }
        }).sort((a,b) => moment(a.startTime) - moment(b.startTime) );

    this.setState({ tableData: records });
  }

  handlePageChange = (page) => {
    if(page[0] !== this.state.initialPage) {
      this.setState({ initialPage: 1 + page[0] / 5 })
    }
  }

  render() {
    let { isReportTableViewActive } = this.props
    const {
      currentKey,
      totalDaysCount,
      initialPage,
      tableData,
      isAreaExpanded,
      selectedTimeZone,
    } = this.state

    let data = tableData.slice((initialPage -1) * 5,(initialPage -1) * 5 + 5);

    let totalManualTime = (tableData.filter(d => !d?.screenshots?.capturedImage)?.length * 10).toFixed(2);
    let totalTrackedTime = (tableData.filter(d => d?.screenshots?.capturedImage)?.length * 10).toFixed(2);
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
                  onClick={() => this.setState({isAreaExpanded: !isAreaExpanded})}
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div className={isAreaExpanded? "collapse show" : "collapse"} id="collapseExample">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="work_date">
                  <a title="">
                    <i
                      className={`fa fa-angle-left ${!currentKey ? "text-muted" : ""
                        }`}
                      style={{
                        cursor: !currentKey ? "not-allowed" : "pointer",
                      }}
                      aria-hidden="true"
                      onClick={
                        currentKey ? this.handlePrevReport : null
                      }
                    />
                  </a>
                  <span>{moment(totalDaysCount[currentKey]).format('dddd, MMM D, YYYY')}</span>
                  <a title="">
                    <i
                      className={`fa fa-angle-right ${currentKey+1 === totalDaysCount.length ? "text-muted" : ""
                        }`}
                      style={{
                        cursor: currentKey+1 === totalDaysCount.length ? "not-allowed" : "pointer",
                      }}
                      aria-hidden="true"
                      onClick={
                        currentKey+1 !== totalDaysCount.length ? this.handleNextReport : null
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
                    className="world_select"
                    placeHolder="country"
                    value={selectedTimeZone}
                    selectItem={(value) => { this.setState({ selectedTimeZone: value }) }}
                    items={
                      [{
                        text: 'My Local Time',
                        value: 'local'
                      }, {
                        text: 'UTC',
                        value: 'utc'
                      }]}
                  />
                </div>
              </div>
            </div>
            <div className="pause_dispute">
              <div className="row">
                <div className="col-md-7">
                  <div className="tracked_div">
                    <label>Total: {Math.floor(totalTime/60)}:{totalTime%60}hrs</label>
                    <span>
                      <span className="blue_box"/>Tracked {Math.floor(totalTrackedTime/60)}:{totalTrackedTime%60}hrs
                    </span>
                    <span>
                      <span className="red_box"/>Manual {Math.floor(totalManualTime/60)}:{totalManualTime%60}hrs
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
                          <i/>
                          <i/>
                          <i/>
                          <i/>
                        </div>
                        <div className="lines">
                          <i/>
                          <i/>
                          <i/>
                          <i/>
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
            <div  hidden={data.length===0} className="task_manage post_modal">
              <div className="detail_tbl check_tble">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col"/>
                      <th scope="col">Task</th>
                      <th scope="col">Type</th>
                      <th scope="col">Activity</th>
                      <th scope="col">Active Window</th>
                      <th scope="col">Activity Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data, index) => (
                      <tr className="selected" key={index}>
                        <td>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`customcheck${index}`}
                                required=""
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`customcheck${index}`}
                              />
                            </div>
                          </div>
                        </td>
                        <td>{data.startTime ?
                            selectedTimeZone === 'utc' ? moment(data.startTime).utc().format('hh:mm a')
                                : moment(data.startTime).format('hh:mm a') : 'N/A'}</td>
                        <td>
                          {data?.screenshots?.capturedImage ? (
                            <span className="blue_box"/>
                          ) : (
                              <span className="red_box"/>
                            )}
                        </td>
                        <td>
                          <Link
                            className="text-dark"
                            to={{
                              pathname: "/hourly-work-detail",
                              state: {
                                index: index,
                                key: currentKey,
                              },
                            }}
                          >
                            {data?.maxProcessList?.applicationType || 'N/A'}
                          </Link>
                        </td>
                        <td>{data?.maxProcessList?.applicationName || 'N/A'}</td>
                        <td>{data?.screenshots?.progressValue || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div hidden={data.length>0} className="task_manage post_modal">
                            <div className="detail_tbl check_tble">
                              <table className="table text-center">
                                <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Task</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Activity</th>
                                    <th scope="col">Active Window</th>
                                    <th scope="col">Activity Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="selected">
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck1"
                                            required=""
                                            checked
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck1"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck2"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck2"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck3"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck3"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck4"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck4"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>
                                      <a className="tool_tip blue_text">
                                        <b>70%</b>
                                        <span>
                                          This indicates the average activity in
                                          Key board and mouse movement
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck5"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck5"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="red_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck6"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck6"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck7"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck7"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>
                                      <a className="tool_tip red_text">
                                        <b>92%</b>
                                        <span>
                                          This indicates the low activity in Key
                                          board and mouse movement
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customcheck8"
                                            required=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="customcheck8"
                                          ></label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>6:30 pm</td>
                                    <td>
                                      <span className="blue_box"></span>
                                    </td>
                                    <td>New Candidate Registration</td>
                                    <td>New Candidate Registration</td>
                                    <td>92%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <ul hidden={data.length>0}  className="pagination justify-content-center mt-3 mb-3">
                            <li className=" page-item disabled">
                              <a className="page-link">First</a>
                            </li>
                            <li className=" page-item disabled">
                              <a className="page-link">Previous</a>
                            </li>
                            <li className=" page-item active">
                              <a className="page-link">1</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">2</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Next</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">Last</a>
                            </li>
                          </ul>
            <Pagination
                items={new Array(tableData.length).fill(1).map((r,i) => i)}
                onChangePage={(page) => this.handlePageChange(page)}
                initialPage={initialPage}
                pageSize={5}
            />
          </div>
        </div>
      </>
    )
  }
}

export default WorkTableReportView

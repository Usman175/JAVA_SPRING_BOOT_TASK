import React, { Component } from "react"
import Pagination from "../../../../components/pagenation"
import { Link } from "react-router-dom"
import { JungleModal } from "../../../../components/modals/jungleModal";
import { AddManualTime } from "../../../../components/modals/addManualtime";
import '../hourly.scss'
import moment from "moment";

class WorkGridReportView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isWorkReportSectionExpanded: true,
      projectUserTimeTracking: [],
      dayNo: 2,
      hours: [],
      tableData: [],
      initialPage: 1,
      totalDaysCount: [],
      currentKey: 0,
    }
  }

  componentDidMount() {
    if(this.props.savedProjectHourlyDetailsData && Object.keys(this.props.savedProjectHourlyDetailsData).length) {
      this.setState({ ...this.props.savedProjectHourlyDetailsData }, () => {
        this.getSingleDayData();
      })
    }
  }

  componentWillUnmount() {
    this.props.saveProjectHourlyDetailsData(this.state);
  }

  componentDidUpdate(prevProps) {
    if((this.props.projectUserTimeTracking || []).length && !this.state.projectUserTimeTracking.length) {
      this.setState({projectUserTimeTracking: this.props.projectUserTimeTracking}, () => {
        this.getSingleDayData();
      })
    }
  }

  getSingleDayData = (day = this.state.dayNo) => {

    let { projectUserTimeTracking } = this.state;

    let totalDaysCount = [];
    projectUserTimeTracking.map(t => totalDaysCount.indexOf(moment(t.startTime).format('L')) === -1 ?
        totalDaysCount.push(moment(t.startTime).format('L')) :
        null);
    this.setState({totalDaysCount, currentKey: day === this.state.dayNo ? totalDaysCount.length : day});

    let records = (projectUserTimeTracking || []).filter(d => totalDaysCount[day-1] === moment(d.startTime).format('MM/DD/YYYY'))
        .map(r => {
          return {
            ...r,
            hour: moment(r.startTime).format('h a'),
            time: moment(r.startTime).format('h:m a'),
          }
        }).sort((a,b) => moment(a.startTime) - moment(b.startTime) );

    let hours = [], tableData = {};
    records.map(r => hours.indexOf(r.hour) === -1 ? hours.push(r.hour) : null);

    hours.map((h, index) => tableData[h] = records.filter(r => r.hour === h));
    this.setState({ hours: hours, tableData, initialPage: day === this.state.dayNo ? totalDaysCount.length : day, dayNo: day })
  }

  getData = (data) => {
    let finalData = new Array(6).fill({time: '10 am'});
    for(let i = 0; i < data.length; i++) {
      const minute = moment(data[i].startTime).format('mm');
      const index = Math.floor(minute / 10);
      finalData[index] = data[i]
    }
    return finalData;
  }

  handleNextReport = () => {
    this.setState({
      currentKey: this.state.currentKey + 1,
      initialPage: 1,
      hours: [],
    }, () => {
      this.getSingleDayData(this.state.currentKey)
    })
  }

  handlePrevReport = () => {
    this.setState({
      currentKey: this.state.currentKey - 1,
      initialPage: 1,
      hours: [],
    }, () => {
      this.getSingleDayData(this.state.currentKey)
    })
  }

  handlePageChange = (page) => {
    if(page[0] !== this.state.initialPage) {
      this.setState({ initialPage: 1 + page[0] / 5 })
    }
  }

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
    } = this.state;

    let hoursData = hours.slice((initialPage -1) * 5,(initialPage -1) * 5 + 5);

    let totalTime = 0;
    hours.forEach(k =>  { totalTime += tableData[k].length * 10 })

    let totalTrackedTime = 0;
    hours.forEach(k =>  { totalTrackedTime += (tableData[k]).filter(d => d?.screenshots?.capturedImage).length * 10 })

    let totalManualTime = 0;
    hours.forEach(k =>  { totalManualTime += (tableData[k]).filter(d => !d?.screenshots?.capturedImage).length * 10 })
    return (
      <>
        <div className="hourly_limit">
          <div className="position_rel">
            <h4>
              <span className="viewDetail">
                <a
                  className="plus_btn"
                  aria-expanded={isWorkReportSectionExpanded}
                  onClick={() => { this.setState({isWorkReportSectionExpanded: !isWorkReportSectionExpanded})}}
                >
                  +
                </a>
              </span>
            </h4>
          </div>
          <div className={isWorkReportSectionExpanded ? "collapse show" : "collapse"} id="collapseExample">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="work_date">
                  <a title="">
                    <i
                        className={`fa fa-angle-left ${currentKey === 1 ? "text-muted" : ""
                        }`}
                        style={{
                          cursor: currentKey === 1 ? "not-allowed" : "pointer",
                        }}
                        aria-hidden="true"
                        onClick={
                          currentKey > 1 ? this.handlePrevReport : null
                        }
                    />
                  </a>
                  <span>{moment(totalDaysCount[currentKey]).format('dddd, MMM D, YYYY')}</span>
                  <a title="">
                    <i
                        className={`fa fa-angle-right ${currentKey === totalDaysCount.length ? "text-muted" : ""
                        }`}
                        style={{
                          cursor: currentKey === totalDaysCount.length ? "not-allowed" : "pointer",
                        }}
                        aria-hidden="true"
                        onClick={
                          currentKey !== totalDaysCount.length ? this.handleNextReport : null
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
                    <label>Total: {Math.floor(totalTime/60)}:{totalTime%60}hrs</label>
                    <span>
                      <span className="blue_box"/>Tracked {Math.floor(totalTrackedTime/60)}:{totalTrackedTime%60}hrs
                    </span>
                    <span>
                      <span className="red_box"/>Manual {Math.floor(totalManualTime/60)}:{totalManualTime%60}hrs
                    </span>
                  </div>
                </div>
                <div className="col-12 text-right post_modal">
                  <div className="save_cancel button-design-custom-manual-time">
                  <JungleModal
                      dialogClassName="jungle-modal"
                      contentClassName="jungle-modal-content"
                      customClose
                      Body={AddManualTime}
                      OpenButton={({ handleClick }) => (
                        <button
                          type="button"
                          className="btn white_btn"
                          onClick={handleClick}
                        >
                          Add Manual Time
                        </button>
                      )}
                      title="Add Manual Time"
                      size="md"
                    />
                    <button type="button" className="btn white_btn">
                      Pause
                    </button>
                    <button type="button" className="btn gray_btn">
                      Dispute Hours
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="tracked_div candidate_reg">
              <div className="row">
                <div className="col-md-7">
                  <label>Activity</label>
                  <span>New Candidate Registration</span>
                  <span>92%</span>
                </div>
                <div className="col-md-5">
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
    
            <div className="table-responsive post_form work_diary">
              <table className="table">
                <tbody>
                {hoursData.length ? hoursData.map(hour =>
                    <tr>
                      <th scope="col">{hour}</th>
                      {this.getData(tableData[hour]).map((v, i) => (
                          <td key={`${hour}-${i}`} style={{width: '15.5%'}}>
                           
                            <Link
                                to={{
                                  location:location => ({ ...location }),
                                  state: {
                                    key: i,
                                    index: i,
                                  },
                                }}
                                style={{width: '-webkit-fill-available', border: '1px solid #d6cfcf', height: '68px'}}
                            >
                              <img
                                  src={v?.screenshots?.capturedImage ? "https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/capture-view.png" : ""}
                                  alt=""
                                  style={{width: '-webkit-fill-available', border: '1px solid #d6cfcf'}}
                              />
                              <i
                                  className="fa fa-search-plus"
                                  aria-hidden="true"
                              />
                            </Link>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    required=""
                                    id={`customcheck${i}`}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor={`customcheck${i}`}
                                >
                                  {v.time}
                                </label>
                                <span>93%</span>
                              </div>
                            </div>
                          </td>
                      ))}
                    </tr>) : <tr>
                  <th scope="col">7am</th>
                  {new Array(6).fill("").map((v, i) => (
                      <td key={`7-am-${i}`}>
                        <Link
                            // to={{
                            //   // pathname: "/hourly-work-detail",
                            //   state: {
                            //     key: i,
                            //     index: i,
                            //   },
                            // }}
                            style={{width: '-webkit-fill-available', border: '1px solid #d6cfcf', height: '68px'}}
                        >
                          <img
                              src=""
                              alt=""
                              style={{width: '-webkit-fill-available', border: '1px solid #d6cfcf'}}
                          />
                          {/*<i
                              className="fa fa-search-plus"
                              aria-hidden="true"
                          />*/}
                        </Link>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`customcheck${i}`}
                                required=""
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={`customcheck${i}`}
                            >
                              7:00 am
                            </label>
                            <span>93%</span>
                          </div>
                        </div>
                      </td>
                  ))}
                </tr>}
                </tbody>
              </table>
            </div>
     
            <Pagination
                items={new Array(hours.length).fill(1).map((r,i) => i)}
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

export default WorkGridReportView

import React, { Component } from "react";
import { connect } from "react-redux";
import Popover from "@mui/material/Popover";
import SubHeader from "../../../components/subHeader";
import DateRangePicker from "../../../components/dateRangePicker";
import ProgressBar from "../../../components/progressBar/progressBar";
import moment from "moment";
import Rating from "@mui/material/Rating";
import { DocumentTypeSelector, FilePicker } from "../../../components/forms";
import "./feedback.scss";

class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claimTableData: [
        {
          contract_id: "EISMIKSS",
          subject: "He works good",
          reason: "I am hiring another resource",
          evaluation: 5,
          last_activity: "2021-10-20",
          status: "Completed",
        },
        {
          contract_id: "EISMIKSS",
          subject: null,
          reason: "I am hiring another resource",
          evaluation: null,
          last_activity: null,
          status: "Awaiting",
        },
        {
          contract_id: "EISMIKSS",
          subject: "He works good",
          reason: "I am hiring another resource",
          evaluation: 5,
          last_activity: "2021-10-20",
          status: "Completed",
        },
        {
          contract_id: "EISMIKSS",
          subject: "He works average",
          reason: "I am hiring another resource",
          evaluation: 1,
          last_activity: "2021-10-20",
          status: "Completed",
        },
      ],
    };
  }

  render() {
    const { claimTableData } = this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row m-0">
              <div className="col-12 col-md-2"></div>
              <div className="col-12 col-md-8 content-wrapper">
                <div className="project_post dispute-wrapper">
                  <div className="row header-wrapper">
                    <div className="col-6 flex flex-align-center pl-0 pr-0">
                      <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/feedback.svg"} alt="currencyIcon" />
                      <span className="ml-4">
                        <h5 className="mb-0">Feedbacks</h5>
                      </span>
                    </div>
                    <div className="col-6 pl-0 pr-0">
                      <DateRangePicker />
                    </div>
                  </div>
                  <div className="status-wrapper">
                    <div className="flex mb-2">
                      Status:
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        className="ml-2"
                      />
                    </div>
                    <div className="flex flex-align-center">
                      Project Success Rate:
                      <div className="ml-2">
                        <ProgressBar Milestone={50} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <table className="table">
                      <thead className="head-wrapper-feedback">
                        <tr>
                          <th scope="col" style={{ paddingLeft: 0 }}>
                            Contract Id
                          </th>
                          <th scope="col">Subject</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Evaluation</th>
                          <th scope="col">Last Activity</th>
                          <th scope="col"> Status</th>
                        </tr>
                      </thead>
                      <tbody className="body-wrapper">
                        {claimTableData && claimTableData?.length > 0
                          ? claimTableData?.map((data, idx) => (
                              <tr key={idx}>
                                <td>{data?.contract_id}</td>
                                <td className="fix-width">{data?.subject}</td>
                                <td className="fix-width">{data.reason}</td>
                                <td>
                                  {data.evaluation ? (
                                    <Rating
                                      name="read-only"
                                      value={data.evaluation}
                                      readOnly
                                    />
                                  ) : null}
                                </td>
                                <td>
                                  {data?.last_activity
                                    ? moment(
                                        moment(
                                          new Date(
                                            data.last_activity
                                          ).toString()
                                        )
                                      ).from(moment(new Date()))
                                    : ""}
                                </td>
                                <td>
                                  <button
                                    className={`btn status-btn status-btn-color-${data?.status?.toLowerCase()}`}
                                  >
                                    {data?.status}
                                  </button>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchProps)(Feedbacks);

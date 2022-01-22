import React, { Component } from "react";
import { connect } from "react-redux";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import { Link } from "react-router-dom";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";

class ReportMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: {},
    };
  }

  componentDidMount() {
    this.getProjectData();
  }

  async getProjectData() {
    let result;
    result = await request(
      `${ENDPOINT["GetProject"]}?projectId=${this.props.location.state.selectedProject}&userId=${this.props.authUser.myAuth.user.userId}`,
      getOptions({})
    );

    if (result.success) {
      this.setState({ projectData: result.result.data });
    }
  }

  render() {
    const { projectData } = this.state;
    let description = "";
    description = projectData?.jobDescription?.startsWith("<p>")
      ? projectData.jobDescription.slice(3)
      : projectData?.jobDescription;
    description = description?.endsWith("</p>")
      ? description.slice(0, -4)
      : description;

    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-10 col-md-12">
                <div className="project_post">
                  <div className="viewAl_project">
                    <div className="row align-items-end">
                      <div className="col-md-6">
                        <label>
                          {projectData.userName}
                          <span className="green_text">
                            {projectData.freelancerType}
                          </span>
                        </label>
                      </div>
                      <div className="col-md-6 text-right post_modal">
                        <div className="save_cancel">
                          <Link
                            to="/dispute-claims"
                            className="btn save_btn"
                            title=""
                          >
                            View dispute and claims
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="gray_box">
                      <p>{description}</p>
                    </div>
                    <div className="skill_btn language_btn">
                      {(projectData?.skills?.length
                        ? projectData.skills.split(",")
                        : []
                      ).map((s, index) => (
                        <a key={index}>{s}</a>
                      ))}
                    </div>
                    <div className="post_modal">
                      <div className="text-right save_cancel">
                        <button type="submit" className="btn cancel_btn">
                          Modify
                        </button>
                      </div>
                    </div>
                    <div className="total_income">
                      <div className="row">
                        <div className="col-md-6">
                          <label>
                            <span className="green_text">Total Income :</span>
                            <span className="black_text">
                              {projectData.projectAmount}
                              {projectData.currencyCode}
                            </span>
                            {projectData?.postDateTime?.trim() !== "" && (
                              <small>
                                {new Date(
                                  projectData.postDateTime
                                ).toDateString()}
                              </small>
                            )}
                          </label>
                          {/* <label>
                            <span className="green_text">This Month :</span>
                            <span className="black_text">US$940.00</span>
                          </label>
                          <label>
                            <span className="green_text">This Week :</span>
                            <span className="black_text">US$240.00</span>
                          </label> */}
                        </div>
                        {/* <div className="col-md-6 complate_rate">
                          <label>
                            <span className="green_text">My Evaluation :</span>
                            <span className="black_text">
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </span>
                          </label>
                          <label>
                            <span className="green_text">Complete Rate : </span>
                            <span className="black_text">72%</span>
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
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
  };
}

export default connect(mapStateToProps)(ReportMain);

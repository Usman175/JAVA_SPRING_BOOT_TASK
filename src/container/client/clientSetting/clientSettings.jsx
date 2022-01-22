import React, { Component } from "react";
import { connect } from "react-redux";
import notifications from "../../../utils/notifications";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import {
  ProjectTypeConst,
  ProjectStepConst,
} from "../../../utils/projectConst";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import "./clientSettings.scss"

class ClientSettings extends Component {
  constructor(props) {
    super(props);
    var editType =
      new URLSearchParams(this.props.location.search).get("type") !== null &&
      new URLSearchParams(this.props.location.search).get("type") !== ""
        ? new URLSearchParams(this.props.location.search).get("type")
        : "";
    this.state = {
      activeTab: "tab_1",
      headerText: "My Info",
      userData: null,
      userId: props.authUser?.myAuth?.user?.userId,
      organizationData: {},
    };
  }

  componentDidMount() {
    this.bindUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.userState.user &&
      this.props.userState.user &&
      !this.props.userState.isLoading &&
      !this.state.userData
    ) {
      this.setState(
        {
          userData: this.props.userState.user,
        },
        () => {
          const { userData } = this.state;
          userData.userProfileUrl &&
            userData.userProfileUrl.trim() &&
            this.getProfileURL();
          userData.organizationId &&
            userData.organizationId.trim() &&
            this.bindOrganizationDetails();
        }
      );
    }
  }

  async bindUser() {
    if (!this.props.userState.user && !this.props.userState.isLoading) {
      let result = await request(
        `${ENDPOINT["GetUser"]}?userId=` + this.state.userId,
        getOptions({})
      );
      if (result.success && Object.keys(result.result.data).length > 0) {
        this.setState({ userData: result.result.data }, () => {
          const { userData } = this.state;
          userData.userProfileUrl &&
            userData.userProfileUrl.trim() &&
            this.getProfileURL();
          userData.organizationId &&
            userData.organizationId.trim() &&
            this.bindOrganizationDetails();
        });
      }
    }
  }

  async bindOrganizationDetails() {
    let result = await request(
      `${ENDPOINT["GetOrganization"]}` +
        "?organizationId=" +
        this.state.userData.organizationId
    );
    if (result.success && Object.keys(result.result.data).length > 0) {
      this.setState({ organizationData: result.result.data[0] });
    }
  }

  getProfileURL = async () => {
    if (this.state.userData?.userProfileUrl.includes("https")) {
      this.setState({
        userData: {
          userProfileUrl: this.state.userData?.userProfileUrl.split("?")[0],
        },
      });
    } else {
      let result = await request(
        ENDPOINT["S3KeyToURL"] + "?key=" + this.state.userData?.userProfileUrl,
        getOptions()
      );
      if (result.success) {
        this.setState({ userData: { userProfileUrl: result.result } });
      }
    }
  };

  //#region Submit Method

  onPageRedirectHandle = async () => {
    let professions = JSON.stringify(this.state.selectedProfession);

    let param = {
      projectId: this.state.projectId,
      projectType: this.state.projectType,
      professions: professions,
    };
    let result = await request(
      ENDPOINT["UpdateFreeContractProfessions"],
      postOptions(param)
    );
    if (result.success)
      this.props.history.push(
        "/project-post-details?id=" + this.state.projectId
      );
    else notifications.showError(result.message);
  };

  //#endregion Submit Method

  render() {
    const { headerText, activeTab, userData } = this.state;
    const { userReducer } = this.props;
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post professio_nal clientSetting_query">
                  <h4>{headerText}</h4>
                  <div className="d-flex clientSetting_Mobile_query">
                    <ul className="aside_menu list-unstyled">
                      <li
                        className={activeTab === "tab_1" ? "active" : ""}
                        onClick={() =>
                          this.setState({
                            activeTab: "tab_1",
                            headerText: "My Info",
                          })
                        }
                      >
                        <a>
                          <i className="fa fa-user" />
                          &nbsp;&nbsp;My Info
                        </a>
                      </li>
                      <li
                        className={activeTab === "tab_2" ? "active" : ""}
                        onClick={() =>
                          this.setState({
                            activeTab: "tab_2",
                            headerText: "Billing & Payments",
                          })
                        }
                      >
                        <a>
                          <i className="fa fa-credit-card" />
                          &nbsp;&nbsp;Billing Methods
                        </a>
                      </li>
                      <li
                        className={activeTab === "tab_3" ? "active" : ""}
                        onClick={() =>
                          this.setState({
                            activeTab: "tab_3",
                            headerText: "Password & Security",
                          })
                        }
                      >
                        <a>
                          <i className="fa fa-lock" />
                          &nbsp;&nbsp;&nbsp;Password & Security
                        </a>
                      </li>
                    </ul>

                    <div
                      className="right_content post_form"
                      hidden={activeTab != "tab_1"}
                    >
                      <div
                        className="card_box"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Account</h5>
                          <button
                            type="button"
                            className="btn save_btn"
                            disabled={true}
                          >
                            {" "}
                            <i className="fa fa-edit" />{" "}
                          </button>
                        </div>
                        <hr />
                        <div
                          className="row justify-content-between align-items-center"
                          style={{
                            textAlign: "center",
                            display: "flow-root",
                            verticalAlign: "middle",
                          }}
                        >
                          {/*<i className="fa fa-user-circle fa-7x" style={{ color: "#a0a0a0" }} />*/}
                          {userData?.userProfileUrl?.trim() ? (
                            <img
                              src={userData?.userProfileUrl}
                              alt=""
                              height="98px"
                              width="98px"
                              style={{
                                borderRadius: "50%",
                                border: "1px solid #504f4f",
                              }}
                            />
                          ) : (
                            <i
                              className="fa fa-user-circle fa-7x"
                              style={{ color: "#a0a0a0" }}
                            />
                          )}
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <h6>
                              <b>Client {userData?.userName}</b>
                            </h6>
                            <p>
                              <b>Email</b>
                            </p>
                            <p>{userData?.emailId}</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card_box"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Company details</h5>
                          <button
                            type="button"
                            className="btn save_btn"
                            disabled={true}
                          >
                            {" "}
                            <i className="fa fa-edit"></i>{" "}
                          </button>
                        </div>
                        <hr />
                        <div
                          className="row justify-content-between align-items-center"
                          style={{
                            textAlign: "center",
                            display: "flow-root",
                            verticalAlign: "middle",
                          }}
                        >
                          <i
                            className="fa fa-building fa-7x"
                            style={{ color: "#a0a0a0" }}
                          ></i>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <h6>
                              <b>Organization ABC</b>
                            </h6>
                            <p>
                              <b>
                                <a className="green_text">www.org.com</a>
                              </b>
                            </p>
                            <p>
                              <b>Email</b>
                            </p>
                            <p>organizationabc@gmail.com</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card_box"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Company contacts</h5>
                          <button
                            type="button"
                            className="btn save_btn"
                            disabled={true}
                          >
                            {" "}
                            <i className="fa fa-edit"></i>{" "}
                          </button>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <p>
                              <b>Owner</b>
                            </p>
                            <p>Client XYZ</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <p>
                              <b>Phone</b>
                            </p>
                            <p>9825936369</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <p>
                              <b>Address</b>
                            </p>
                            <p>India</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card_box"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-12">
                            <p>
                              This is a <b>Client</b> account
                            </p>
                          </div>
                          <br />
                          <br />
                          <div className="col-md-12">
                            <h6>
                              <a className="green_text">Close Account</a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="right_content post_form"
                      hidden={activeTab != "tab_2"}
                    >
                      <div
                        className="card_box billingMethod_clientSetting"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-1 col-1">
                            <i className="fa fa-star fa-2x"></i>
                          </div>
                          <div className="col-md-11 col-11">
                            <p>You have already submitted a proposal.</p>
                            <a
                              className="green_text"
                              style={{ cursor: "pointer" }}
                            >
                              View Proposal
                            </a>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card_box billingMethod_clientSetting"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Balance Due</h5>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <p>
                            Your balance due is <b> $0.00 </b>
                          </p>
                          <div className="text-right save_cancel">
                            <button
                              type="button"
                              className="btn save_btn"
                              disabled={true}
                            >
                              {" "}
                              Pay Now{" "}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card_box billingMethod_clientSetting"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Billing Methods</h5>
                          <div className="text-right save_cancel">
                            <button
                              type="button"
                              className="btn save_btn"
                              disabled={true}
                            >
                              {" "}
                              Add Method{" "}
                            </button>
                          </div>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <p>
                            <b>You have not set up any billing methods yet.</b>
                          </p>
                        </div>
                        <div className="row justify-content-between align-items-center">
                          <p>
                            Set up your billing methods so you'll be able to
                            hire right away when you're ready.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="right_content post_form"
                      hidden={activeTab != "tab_3"}
                    >
                      <div
                        className="card_box"
                        style={{ marginLeft: 20, marginRight: 20 }}
                      >
                        <div className="row justify-content-between align-items-center">
                          <h5>Password</h5>
                          <button
                            type="button"
                            className="btn save_btn"
                            disabled={true}
                          >
                            {" "}
                            <i className="fa fa-edit"></i>{" "}
                          </button>
                        </div>
                        <hr />
                        <div className="row justify-content-between align-items-center">
                          <div className="col-md-1">
                            <i className="fa fa-check fa-2x"></i>
                          </div>
                          <div className="col-md-11">
                            <p>
                              <b>Password has been set</b>
                            </p>
                            <p>
                              Choose a strong, unique password that's at least 8
                              characters long.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
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

const mapStateToProps = (state) => {
  return {
    userState: state.userReducer,
    authUser: state.authReducer,
  };
};

export default connect(mapStateToProps, {})(ClientSettings);

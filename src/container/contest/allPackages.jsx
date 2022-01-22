import React, { Component } from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import BlobButton from "../../components/buttons/blobButton";
import {
  onReduxRouteChange,
  onReduxLangaugeChange,
} from "../../store/action/action";
import { connect } from "react-redux";
import DropdownList from "../../components/dropdowns/dropdownList";
import { PackageRequestStatusConst } from "../../utils/packageRequestConst";
import { UserTypeConst } from "../../utils/userTypeConst";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  postOptionsforFile,
} from "../../utils/httpConfig";

class AllPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAssignUserModelOpen: false,
      isUploadDocumentModelOpen: false,
      selectedRequestId: "",
      selectedPackageType: "",
      assignedUserId: "",
      selectedFile: null,
      users: [],
      packageData: [],
      pagination: { pageSize: 10, lastPkEvaluated: "", lastSkEvaluated: "" },
      errorMessage: {},
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);
    this.bindAllPackages("", "");
    this.bindAllUsers();
  }

  //#region Bind Events
  async bindAllUsers() {
    var array = [];
    let queryString = `?usertypes=` + UserTypeConst.Freelancer;
    let result = await request(
      `${ENDPOINT["GetAllUsers"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      result.result.data.map((user, index) => {
        array.push({
          value: user.userId.toString(),
          text: user.userName.toString(),
        });
      });
      this.setState({ users: array });
    }
  }

  async bindAllPackages(lastPkEvaluated, lastSkEvaluated) {
    let queryString =
      `?pageSize=` +
      this.state.pagination.pageSize +
      `&lastPkEvaluated=` +
      lastPkEvaluated +
      `&lastSkEvaluated=` +
      lastSkEvaluated;
    let result = await request(
      `${ENDPOINT["GetPackageRequests"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      let array = result.result.data;
      array.map((element, i) => {
        if (element.hasOwnProperty("requestDateTime"))
          element.requestDateTime = moment(element.requestDateTime).format(
            "DD-MMM-YYYY"
          );

        if (element.hasOwnProperty("designTypes"))
          element.designTypes =
            element.designTypes !== undefined &&
            element.designTypes !== null &&
            element.designTypes !== ""
              ? JSON.parse(element.designTypes)
              : [];
      });
      this.setState({
        packageData: array,
        pagination: {
          pageSize: this.state.pagination.pageSize,
          lastPkEvaluated: result.result.lastPkEvaluated,
        },
      });
    }
  }
  //#endregion Bind Events

  //#region Assign User
  onCloseAssignUserPopup = () => {
    this.setState({
      isAssignUserModelOpen: false,
      selectedRequestId: "",
      selectedPackageType: "",
      assignedUserId: "",
    });
    return;
  };

  onAssignUser = async () => {
    let { languageType } = this.props;
    let errorMessage = {};

    if (
      this.state.selectedRequestId === null ||
      this.state.selectedRequestId === "" ||
      this.state.selectedRequestId === undefined
    ) {
      errorMessage["selectedRequestId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (
      this.state.selectedPackageType === null ||
      this.state.selectedPackageType === "" ||
      this.state.selectedPackageType === undefined
    ) {
      errorMessage["selectedPackageType"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (
      this.state.assignedUserId === null ||
      this.state.assignedUserId === "0" ||
      this.state.assignedUserId === "" ||
      this.state.assignedUserId === undefined
    ) {
      errorMessage["assignedUserId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else {
      let param = {
        requestId: this.state.selectedRequestId,
        packageType: this.state.selectedPackageType,
        assignedUserId: this.state.assignedUserId,
      };

      let result = await request(
        ENDPOINT["UpdatePackageRequestAssignUser"],
        postOptions(param)
      );
      if (result.success) {
        this.bindAllPackages("", "");
        this.onCloseAssignUserPopup();
      } else notifications.showError(result.message);
    }
  };
  //#endregion Assign User

  //#region Upload Document
  onCloseUploadDocumentPopup = () => {
    this.setState({
      isUploadDocumentModelOpen: false,
      selectedRequestId: "",
      selectedPackageType: "",
      selectedFile: null,
    });
    return;
  };

  parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
  }

  getUploadFileKey = async (file) => {
    let formData = new FormData();
    formData.append("files", file);
    const response = await request(
      `${ENDPOINT["UploadFile"]}`,
      postMultipartFile(formData)
    );
    if (response.success) return response.result[0]?.s3Key;
  };

  onUploadDocument = async () => {
    let { languageType } = this.props;
    let errorMessage = {};

    if (
      this.state.selectedRequestId === null ||
      this.state.selectedRequestId === "" ||
      this.state.selectedRequestId === undefined
    ) {
      errorMessage["selectedRequestId"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (
      this.state.selectedPackageType === null ||
      this.state.selectedPackageType === "" ||
      this.state.selectedPackageType === undefined
    ) {
      errorMessage["selectedPackageType"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else if (this.state.selectedFile === null) {
      errorMessage["selectedFile"] = languageType.REQUIRED_MESSAGE;
      this.setState({ errorMessage: errorMessage });
    } else {
      let file = await this.getUploadFileKey(this.state.selectedFile);
      let formData = new FormData();
      formData.append("FileName", file);
      formData.append("requestId", this.state.selectedRequestId);
      formData.append("packageType", this.state.selectedPackageType);

      let result = await request(
        ENDPOINT["UpdatePackageRequestDocument"],
        postOptionsforFile(formData)
      );
      if (result.success) {
        this.bindAllPackages("", "");
        this.onCloseUploadDocumentPopup();
      } else notifications.showError(result.message);
    }
  };
  //#endregion Upload Document

  render() {
    let { languageType } = this.props;
    let { packageData, pagination, assignedUserId } = this.state;
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post">
                  <div className="business_category post_form">
                    <div className="own_contest">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="contain-heading">
                            <div className="col-md-9 r-padding"></div>
                            <div className="col-md-3">
                              <BlobButton
                                className={`nav-link contest-tab  contest-tab`}
                                id="contest-tab"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                content="Package Design"
                                onClick={() => {
                                  this.props.history.push("/package-design");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center display_select">
                      <label>{languageType.DISPLAY_LIST_TEXT}</label>
                      <div className="form-control-select mx-2">
                        <select className="form-control m-0 pl-3 mw-80">
                          <option>10</option>
                          <option>20</option>
                          <option>30</option>
                          <option>40</option>
                        </select>
                      </div>
                      <a className="filter_btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div className="table-responsive detail_tbl feedback_tbl">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">{languageType.REQUEST_ID}</th>
                            <th scope="col">{languageType.PACKAGE_TYPE}</th>
                            <th scope="col">{languageType.REQUEST_DATE_TIME}</th>
                            <th scope="col">{languageType.LOGO_PACKAGE_TYPE}</th>
                            <th scope="col">{languageType.ORGANIZATION_NAME}</th>
                            <th scope="col">{languageType.VIDEO_CLIP_DURATION}</th>
                            <th scope="col">{languageType.STATUS_TEXT}</th>
                            <th scope="col">{languageType.ACTION_TEXT}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData &&
                            packageData.length > 0 &&
                            packageData.map((request, index) => (
                              <>
                                <tr key={`package${index}`}>
                                  <td>{request.requestId}</td>
                                  <td>{request.packageType}</td>
                                  <td>{request.requestDateTime}</td>
                                  <td>{request.logoPackageType}</td>
                                  <td>{request.organizationName}</td>
                                  <td>{request.videoClipDuration}</td>
                                  <td>{request.requestStatus}</td>
                                  <td>
                                    <div
                                      hidden={
                                        request.requestStatus !==
                                        PackageRequestStatusConst.Created
                                      }
                                      className="green_text font_arial underline_hover"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        this.setState({
                                          selectedRequestId: request.requestId,
                                          selectedPackageType:
                                            request.packageType,
                                          isAssignUserModelOpen: true,
                                        });
                                      }}
                                    >
                                      Assign User
                                    </div>
                                    <div
                                      hidden={
                                        request.requestStatus !==
                                        PackageRequestStatusConst.Assigned
                                      }
                                      className="green_text font_arial underline_hover"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        this.setState({
                                          selectedRequestId: request.requestId,
                                          selectedPackageType:
                                            request.packageType,
                                          isUploadDocumentModelOpen: true,
                                        });
                                      }}
                                    >
                                      Upload Document
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          {this.state.errorMessage.selectedRequestId && (
                            <p className="text-danger">
                              {this.state.errorMessage.selectedRequestId}
                            </p>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <ul className="pagination justify-content-center mt-3 mb-3">
                      <li
                        className="page-item"
                        onClick={() =>
                          this.bindAllPackages(
                            pagination.lastPkEvaluated,
                            pagination.lastSkEvaluated
                          )
                        }
                      >
                        <a className="page-link">Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>

          {/* Assign User Popup */}
          <Modal
            dialogClassName="jungle-modal"
            contentClassName="jungle-modal-content lg"
            show={this.state.isAssignUserModelOpen}
            onHide={() => {
              this.onCloseAssignUserPopup();
            }}
            centered
          >
            <Modal.Header className="position-relative jungle-modal-header">
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                alt=""
              />
              <span className="position-absolute">Assign User</span>
              <span
                onClick={() => {
                  this.onCloseAssignUserPopup();
                }}
                className="custom-close"
              >
                x
              </span>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "887px",
                overflow: "auto",
                padding: "0px 0px",
              }}
            >
              <div
                className="project_post style_place"
                style={{ boxShadow: "none", marginTop: "0px" }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Select user</label>
                      <DropdownList
                        id="assignedUserId"
                        name="assignedUserId"
                        enableAutoCompleteSearch
                        value={assignedUserId}
                        selectItem={(value) => {
                          let errorMessage = {};
                          this.setState({ assignedUserId: value });
                          if (
                            this.state.assignedUserId !== 0 &&
                            this.state.assignedUserId !== "" &&
                            this.state.assignedUserId !== null &&
                            this.state.assignedUserId !== undefined
                          )
                            errorMessage["assignedUserId"] = null;
                          this.setState({ errorMessage: errorMessage });
                        }}
                        items={this.state.users}
                      />
                      {this.state.errorMessage.assignedUserId && (
                        <p className="text-danger">
                          {this.state.errorMessage.assignedUserId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right save_cancel">
                  <button
                    type="button"
                    className="btn cancel_btn"
                    onClick={() => {
                      this.onCloseAssignUserPopup();
                    }}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button
                    type="button"
                    className="btn save_btn"
                    onClick={() => this.onAssignUser()}
                  >
                    {" "}
                    Assign User{" "}
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* Upload Package Popup */}
          <Modal
            dialogClassName="jungle-modal"
            contentClassName="jungle-modal-content lg"
            show={this.state.isUploadDocumentModelOpen}
            onHide={() => {
              this.onCloseUploadDocumentPopup();
            }}
            centered
          >
            <Modal.Header className="position-relative jungle-modal-header">
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                alt=""
              />
              <span className="position-absolute">Upload Document</span>
              <span
                onClick={() => {
                  this.onCloseUploadDocumentPopup();
                }}
                className="custom-close"
              >
                x
              </span>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "887px",
                overflow: "auto",
                padding: "0px 0px",
              }}
            >
              <div
                className="project_post style_place"
                style={{ boxShadow: "none", marginTop: "0px" }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Select Document</label>
                      <div className="form-group upload_file">
                        <label htmlFor="fileDocument">
                          <i
                            className="fa fa-upload"
                            aria-hidden="true"
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Upload referential files{" "}
                        </label>
                        <input
                          id="fileDocument"
                          type="file"
                          className="form-control-file"
                          onChange={(event) => {
                            let errorMessage = {};
                            this.setState({
                              selectedFile: event.target.files[0],
                            });

                            if (this.state.selectedFile !== null)
                              errorMessage["selectedFile"] = null;
                            this.setState({ errorMessage: errorMessage });
                          }}
                        />
                      </div>
                      {this.state.selectedFile && (
                        <p>{this.state.selectedFile.name}</p>
                      )}
                      {this.state.errorMessage.selectedFile && (
                        <p className="text-danger">
                          {this.state.errorMessage.selectedFile}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right save_cancel">
                  <button
                    type="button"
                    className="btn cancel_btn"
                    onClick={() => {
                      this.onCloseUploadDocumentPopup();
                    }}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button
                    type="button"
                    className="btn save_btn"
                    onClick={() => this.onUploadDocument()}
                    style={{ width: "100%" }}
                  >
                    {" "}
                    Upload Document{" "}
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(AllPackages);

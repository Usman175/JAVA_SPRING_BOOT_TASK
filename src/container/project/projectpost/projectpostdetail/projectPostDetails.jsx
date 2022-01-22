import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";
import { Redirect } from "react-router-dom";
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../../../store/action/action";
import { getProjectDetails } from "../../../../store/middlewares/Project";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import {
  postMultipartFile,
  getOptions,
  postOptions,
} from "../../../../utils/httpConfig";
import { ProjectTypeConst } from "../../../../utils/projectConst";
import RightTop from "../../../../components/rightbar/rightTop";
import RightBottom from "../../../../components/rightbar/rightBottom";
import notifications from "../../../../utils/notifications";
import Heading from "../../../../components/postProject/heading";
import Label from "../../../../components/postProject/label";
import {
  projectPost_getProjectDetails,
  projectPost_jobTitleChanged,
  projectPost_jobDescriptionChanged,
  projectPost_addDocument,
  projectPost_removeDocument,
} from "../../../../store/action/Project/projectActions";
import FileList from "../../../../components/postProject/fileList";
import FileUploadLoader from "../../../../components/loader/fileUpload";
import SubHeader from "../../../../components/subHeader";
import "./projectpostdetail.scss";
class ProjectPostDetails extends Component {
  constructor(props) {
    super(props);

    const projectId = new URLSearchParams(this.props.location.search).get("id");

    this.state = {
      projectId: projectId,
      projectType: this.props.projectPost.projectType,
      errorMessage: {},
      loading: false,
      uploading: false,
    };
  }

  handleValidation() {
    const {
      projectPost: { jobTitle, jobDescription },
      languageType,
    } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (!jobTitle.trim().length) {
      formIsValid = false;
      errorMessage["title"] = languageType.REQUIRED_MESSAGE;
    } else if (!jobDescription.trim().length) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });

    return formIsValid;
  }

  getNextPageLink() {
    let redirectTo = "";
    const projectId = this.state.projectId;
    const projectType = this.state.projectType;

    if (projectType === ProjectTypeConst[3].value)
      redirectTo = "/project-post-milestone?id=" + projectId;
    else if (projectType === ProjectTypeConst[2].value)
      redirectTo = "/project-post-hourly?id=" + projectId;
    else if (projectType === ProjectTypeConst[1].value)
      redirectTo = "/project-post-free-contract?id=" + projectId;
    else if (projectType === ProjectTypeConst[4].value)
      redirectTo = "/project-post-office?id=" + projectId;
    else if (projectType === ProjectTypeConst[0].value)
      redirectTo = "/contest-detail?id=" + projectId;
    else redirectTo = "/project-post-hourly?id=" + projectId;

    return redirectTo;
  }

  handleNext = async () => {
    if (this.handleValidation()) {
      this.setState({ loading: true });
      const { jobTitle, jobDescription, documents } = this.props.projectPost;
      const projectId = this.state.projectId;
      // TODO: regionId, country ???
      let regionId = JSON.parse(localStorage.MY_AUTH)?.user?.regionId;
      let result = await request(
        ENDPOINT["UpdateProjectSecondStep"],
        postOptions({
          projectId,
          jobTitle,
          jobDescription,
          address: this.props.lookUp.lookUpData.isp,
          city: this.props.lookUp.lookUpData.city,
          regionId: regionId,
          country: this.props.lookUp.lookUpData.country,
          documents:
            documents.length > 0
              ? documents.map((item) => item.documentPath)
              : [],
          lastCompletedStep: "",
        })
      );

      if (result.success) {
        const redirectTo = this.getNextPageLink();
        var newRedirectTo =
          this.state.editType !== "edit"
            ? redirectTo
            : "/confirm-project?id=" + this.state.projectId;
        this.props.history.push(newRedirectTo);
      } else {
        notifications.showError(result.message);
      }
      this.setState({ loading: false });
    }
  };

  handleBack = () => {
    this.props.history.push(`/project-post?id=${this.state.projectId}`);
  };

  //#region File Upload Methods
  handleFileDelete = (documentId) => {
    this.props.removeDocument(documentId);
  };

  onDropHandler = async (acceptedFiles, fileRejections) => {
    const { documents } = this.props.projectPost;

    this.setState({
      errorMessage: {
        documents: "",
      },
      uploading: true,
    });

    if (
      acceptedFiles.length > 0 &&
      documents.length + acceptedFiles.length <= 5
    ) {
      let formData = new FormData();
      const file = acceptedFiles[0];
      formData.append("files", file);

      request(
        `${ENDPOINT["UploadFiles"]}?folderName=projects`,
        postMultipartFile(formData)
      ).then(
        (res) => {
          // console.log(res)
          if (res && res[0]) {
            this.props.addDocument({
              id: v4(),
              name: file.name,
              size: file.size,
              url: res[0]?.s3Key,
              documentName: res[0]?.s3Key,
              documentPath: res[0]?.s3Key,
              documentExtension:
                file.name.split(".")[file.name.split(".").length - 1],
            });
            this.setState({ uploading: false });
          }
        },
        (err) => {
          notifications.showError(err?.message || "Error uploading File.");
        }
      );
    } else if (documents.length + acceptedFiles.length > 5) {
      this.setState({
        errorMessage: {
          documents: "You can only upload up to 5 files",
        },
      });
    }

    if (fileRejections.length > 0) {
      this.setState({
        errorMessage: {
          documents:
            fileRejections[0].errors[0].code === "file-too-large"
              ? "Each file should be only 100 MB"
              : "You can only upload up to 5 files",
        },
      });
    }
  };
  //#endregion File Upload Methods

  // get detail of if existing set in props

  componentDidMount() {
    this.findProjectIfExist();
  }
  async findProjectIfExist() {
    let projectId = new URLSearchParams(this.props.location.search).get("id");
    if (projectId && !this.props.projectPost.jobTitle) {
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        this.props.jobTitleChanged(result.result.jobTitle);
        this.props.jobDescriptionChanged(result.result.jobDescription);
        if(result.result.documents && result.result.documents.length>0){
          result.result.documents.map((item)=>{
          this.props.addDocument({
            id: v4(),
            name: item,
            size:item,
            url: item,
            documentName: item,
            documentPath: item,
            documentExtension:
            item.split(".")[item.split(".").length - 1],
          });
        })
        }
        this.setState({ projectType: result.result.projectType });
      }
    }
  }
  render() {
    if (!this.state.projectId) {
      return <Redirect to="/" />;
    }
    const { uploading } = this.state;
    const { projectPost, jobTitleChanged, jobDescriptionChanged, lookUp } =
      this.props;
    let { languageType, languageReducer } = this.props;
    // console.log(projectPost,"projectPost")
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="project_post milestone_form post_milston">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <Heading
                        heading={`Post project - ${
                          this.state.projectType === "FreeContract"
                            ? "Free Contract"
                            : this.state.projectType == "OfficeWork"
                            ? "Office Work"
                            : this.state.projectType
                        }`}
                        icon={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/projetDetail.svg"
                        }
                        color="#333333"
                        fontSize="26px"
                        fontWeight="600"
                        fontFamily="Raleway"
                      />

                      <form
                        className="post_form border-top-0 pt-0"
                        onSubmit={(e) => e.preventDefault()}
                        style={{ paddingLeft: "0px" }}
                      >
                        <div className="row ">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <Label
                                title={languageType.JOB_TITLE}
                                compulsory={true}
                                prefixBoxValid={
                                  this.state.errorMessage["description"]
                                    ? false
                                    : true
                                }
                                prefixBoxInValid={
                                  this.state.errorMessage["description"]
                                    ? true
                                    : false
                                }
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"
                                }
                                color="#333333"
                              />

                              <input
                                type="text"
                                className="form-control h3"
                                maxLength="100"
                                value={projectPost.jobTitle}
                                onChange={(event) =>
                                  jobTitleChanged(event.target.value)
                                }
                              />

                              <p className="text-danger">
                                {this.state.errorMessage.title}
                              </p>
                            </div>

                            <div className="form-group">
                              <Label
                                title={languageType.JOB_DESCRIPTION}
                                compulsory={true}
                                prefixBoxValid={
                                  this.state.errorMessage["title"]
                                    ? false
                                    : true
                                }
                                prefixBoxInValid={
                                  this.state.errorMessage["title"]
                                    ? true
                                    : false
                                }
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobDetail.svg"
                                }
                                color="#333333"
                              />

                              <textarea
                                name="textarea"
                                rows="5"
                                className="form-control"
                                value={projectPost.jobDescription}
                                onChange={(event) =>
                                  jobDescriptionChanged(event.target.value)
                                }
                              ></textarea>

                              <p className="text-danger">
                                {this.state.errorMessage.description}
                              </p>
                            </div>

                            <div className="form-group">
                              <Label
                                title={languageType.ADDITIONAL_PROJECT_FILES}
                                prefixBoxValid={true}
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/jobDocuments.svg"
                                }
                                color="#333333"
                              ></Label>
                              <div className="d-flex flex-wrap">
                                {(projectPost.documents || []).map((file) => (
                                  <FileList
                                    key={file.id}
                                    name={file.name}
                                    size={file.size}
                                    id={file.id}
                                    handleFileDelete={this.handleFileDelete}
                                  />
                                ))}
                              </div>{" "}
                              {uploading ? (
                                <div
                                  className="form-group"
                                  style={{ marginBottom: "-1px" }}
                                >
                                  <i className="fa fa-spinner fa-spin"></i>{" "}
                                  Uploading file please wait
                                </div>
                              ) : (
                                ""
                              )}
                              <FileUploadLoader
                                title={" Uploading new file..."}
                                show={uploading}
                              />
                              <Dropzone
                                maxFiles={5}
                                maxSize={10240000}
                                multiple
                                onDrop={this.onDropHandler}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <>
                                    <div
                                      {...getRootProps()}
                                      className="skill_btn d-flex align-items-center"
                                    >
                                      <input {...getInputProps()} />
                                      <button
                                        type="button"
                                        className="btn btn-secondary bg-light text-dark font-weight-bold px-5"
                                      >
                                        {" "}
                                        {languageType.UPLOAD_YOURFILE}{" "}
                                      </button>
                                      <p className="ml-5">
                                        {languageType.DRAG_YOUR_FILE}
                                      </p>
                                    </div>
                                    <p className="text-muted my-1">
                                      {languageType.MAX_FILE_SIZE} &nbsp;&nbsp;
                                      <span className="font-weight-bold">
                                        &nbsp;&nbsp;100 MB&nbsp;&nbsp;
                                      </span>
                                      &nbsp; {languageType.EACH_TEXT}
                                    </p>
                                    <p className="text-danger my-1">
                                      {this.state.errorMessage.documents}
                                    </p>
                                  </>
                                )}
                              </Dropzone>
                            </div>

                            <div className="submission-buttons save_cancel">
                              <div
                                type="submit"
                                onClick={this.handleBack}
                                className="back-button"
                              >
                                <i className="fa fa-angle-left"></i>
                              </div>

                              <button
                                type="button"
                                className="btn contest-project-post-btn"
                                onClick={this.handleNext}
                              >
                                Next{" "}
                                <img
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"
                                  }
                                />
                                {this.state.loading ? (
                                  <i className="fa fa-spinner fa-spin"></i>
                                ) : (
                                  ""
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12"></div>
            </div>
          </div>
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

    projectPost: state.projectStore.projectPost,
    lookUp: state.lookUp,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
    onGetProjectDetail: (data) => {
      dispatch(getProjectDetails(data));
    },
    getProjectDetails: (projectId) => {
      dispatch(projectPost_getProjectDetails(projectId));
    },
    jobTitleChanged: (jobTitle) => {
      dispatch(projectPost_jobTitleChanged(jobTitle));
    },
    jobDescriptionChanged: (jobDescription) => {
      dispatch(projectPost_jobDescriptionChanged(jobDescription));
    },
    addDocument: (document) => {
      dispatch(projectPost_addDocument(document));
    },
    removeDocument: (documentId) => {
      dispatch(projectPost_removeDocument(documentId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ProjectPostDetails);

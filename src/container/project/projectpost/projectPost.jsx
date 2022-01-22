import React, { Component } from "react";
import { connect } from "react-redux";
import DropdownList from "../../../components/dropdowns/dropdownList";
import Heading from "../../../components/postProject/heading";
import HelpInfo from "../../../components/postProject/helpInfo";
import Label from "../../../components/postProject/label";
import PaymentInfo from "../../../components/postProject/paymentInfo";
import TipsInfo from "../../../components/postProject/tips";
import Radio from "../../../components/radioButton/radio";
import notifications from "../../../utils/notifications"; 
import RightBottom from "../../../components/rightbar/rightBottom";
import RightTop from "../../../components/rightbar/rightTop";
import {
  projectPost_updateField as updateField,
  projectPost_updateProjectScope as updateProjectScope,
  projectPost_updateProjectSubScope as updateProjectSubScope,
  projectPost_updateProjectType as updateProjectType,
  projectPost_updateSelectedServices as updateServices,
} from "../../../store/action/Project/projectActions";
import { GET_IMAGE_PREFIX } from "../../../store/constants/constant";
import { ENDPOINT } from "../../../utils/endpoint";
import { selectSubScopes } from "../../../utils/helpers";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import { ProjectType, ProjectTypeConst } from "../../../utils/projectConst";
import request from "../../../utils/request";
import SkeletonProjectPost from "./skeletonProjectPost";
import Skeleton from "../../../components/skeleton/skeleton";
import SubHeader from "../../../components/subHeader";
import "./projectPost.scss";
class ProjectPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postUserId: props.authUser?.myAuth?.user?.userId,
      clientId: this.props.authUser?.clientAuth?.clientId,
      postType: "newPost",
      projectType: "",
      sign:'',
      selectedProject: "",
      existingPost: "",
      errorMessage: {},
      projectTypes: [],
      isSkeletonLoading: false,

      existingProjects: [],
      projects: [],
      defaultRegion: null,
      projectScope: "",
      projectSubScope: "",
      projectSubScopes: [],
      loading: false,
      ExistingProjectOptionsFlag: false,
      services:[]
    };
  }
  setSign=(sign)=>{
    this.setState({sign})
  }

  componentWillMount() {
    this.bindExistingProjects();
    //Check Default Address and Get Region
    this.bindDefaultAddress();
  }

  componentDidMount() {
    if (this.props.projectPost.projectScope) {
      this.setState({
        projectSubScopes: selectSubScopes(
          this.props.projectPost.projectScope,
          this.props.languageReducer.projectScopes
        ),
      });
    }

    this.findProjectIfExist();
    this.getServicesByCategories()
  }

  // getting services from database
  getServicesByCategories=async ()=>{  
    let result = await request(
      `${ENDPOINT["GetServicesByCategory"]}?category=Project`,
      getOptions({})
    );
    if (result.success) {
      this.setState({services:result.result})
    }
  }


  async findProjectIfExist() {
    let projectId = new URLSearchParams(this.props.location.search).get("id");
    if (projectId && !this.props.projectPost.projectType) {
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        this.setState({
          postType: "useExisting",
          existingPost: projectId,
          ExistingProjectOptionsFlag: true,
        });
        this.props.updateProjectType(result.result.projectType);
        this.props.updateProjectScope(result.result.projectScope.projectScope);
        this.props.updateProjectSubScope(
          result.result.projectScope.projectSubscope
        );
        this.setState({
          projectSubScopes: selectSubScopes(
            result.result.projectScope.projectScope,
            this.props.languageReducer.projectScopes
          ),
        });
        this.props.updateField(
          "isNeededSearchAssistant",
          result.result.isNeededSearchAssistant
        );
        this.props.updateField("isNeededNDA", result.result.isNeededNDA);
        this.props.updateField("isNeededUrgent", result.result.isNeededUrgent);
      }
    }
  }
  //#region Bind Methods

  async bindDefaultAddress() {
    let param = {
      userId: this.state.postUserId,
    };

    let result = await request(ENDPOINT["GetUserAddress"], postOptions(param));

    if (result.success) {
      if (result.result.length > 0) {
        let defaultLocation = result.result.filter(
          (item) => item.isDefault === true
        );

        if (defaultLocation != null) {
          if (defaultLocation.length > 0) {
            this.setState({ defaultRegion: defaultLocation[0].regionId });
          }
        }
      }
    }
  }

  async bindExistingProjects() {
    this.setState({ isSkeletonLoading: true});
    let array = [];
    let result = await request(
      `${ENDPOINT["GetClientProjects"]}?postUserId=${this.state.postUserId}&projectTypes=&projectStatus=&projectStatus=&projectScope=&search=&pageNumber=1&pageSize=1000`,
      getOptions({})
    );
    if (result.success && result.result.entries) {
      for (let index = 0; index < result.result.entries.length; index++) {
        const element = result.result.entries[index];
        if (element.jobTitle && element.jobTitle != " " && element.projectId) {
          array.push({
            text: element.jobTitle,
            value: element.projectId.toString(),
          });
        }
      }
      this.setState({ projects: result.result.entries });
      this.setState({ existingProjects: array, isSkeletonLoading: false });
    } else{ 
    this.setState({ isSkeletonLoading: false });
    }
  }

  //#endregion Bind Methods

  //#region Validate Methods

  handleValidation() {
    let { languageType } = this.props;
    let postType = this.state.postType;
    let errorMessage = {};
    let formIsValid = true;

    const { projectType, projectScope, projectSubScope } =
      this.props.projectPost;

    if (!projectType) {
      formIsValid = false;
      errorMessage["projectType"] = languageType.REQUIRED_MESSAGE;
    } else if (
      !projectScope &&
      this.props.projectPost.projectType != ProjectType.Contest
    ) {
      formIsValid = false;
      errorMessage["projectScope"] = languageType.REQUIRED_MESSAGE;
    } else if (
      !projectSubScope &&
      this.props.projectPost.projectType != ProjectType.Contest
    ) {
      formIsValid = false;
      errorMessage["projectSubScope"] = languageType.REQUIRED_MESSAGE;
    } else if (
      postType === "useExisting" &&
      (!this.state.existingPost ||
        this.state.existingPost === null ||
        this.state.existingPost === "")
    ) {
      formIsValid = false;
      errorMessage["existingPost"] = languageType.REQUIRED_MESSAGE;
    } else if (
      !this.props.projectPost.selectedServices.find((service)=>service.subCategory==="Boost visibility")
    ) {
      formIsValid = false;
      notifications.showError("You must select at least one Service from boost visibility"); 
    } else if (
      !this.props.projectPost.isNeededNDA &&
      (!this.props.projectPost.isNeededNDA ||
        this.props.projectPost.isNeededNDA === null ||
        this.props.projectPost.isNeededNDA === "")
    ) {
      formIsValid = false; notifications.showError("You must sign up NDA form to move on"); 
    }

    this.setState({ errorMessage: errorMessage });

    return formIsValid;
  }

  onProjectTypeChange = (projectType) => {
    this.props.updateProjectType(projectType);
  };

  onProjectScopeChange = (projectScope) => {
    this.props.updateProjectScope(projectScope);
    this.setState({
      projectSubScopes: selectSubScopes(
        projectScope,
        this.props.languageReducer.projectScopes
      ),
    });
  };

  onProjectSubScopeChange = (projectSubScope) => {
    this.props.updateProjectSubScope(projectSubScope);
  };

  onHelpInfoFieldChange = (field, value) => {
    this.props.updateField(field, value);

  };

  handleChange(fieldData, e, value) {
    /* debugger; */
    let errorMessage = {};
    this.state.projectScope = "";
    if (fieldData === "existingPost") {
      this.state.existingPost = value || e.target.value;
      var selectedProject = this.state.projects.filter(
        (x) => x.projectId === this.state.existingPost
      );
      if (selectedProject.length > 0) {
        this.state.projectType = selectedProject[0].projectType;
        this.state.projectScope = selectedProject[0].projectScope;
      }
    }

    if (
      this.state.existingPost !== 0 &&
      this.state.existingPost !== "" &&
      this.state.existingPost !== null &&
      this.state.existingPost !== undefined
    )
      errorMessage["existingPost"] = null;

    this.setState({ errorMessage: errorMessage });
  }

  //#endregion Validate Methods

  async onPageRedirectHandle() { 
    const {
      projectType,
      projectScope,
      projectSubScope,
      isNeededSearchAssistant,
      isNeededNDA,
      isNeededUrgent,
      selectedServices
    } = this.props.projectPost;
    if (this.handleValidation()) {
      this.setState({ loading: true});
      if (this.props.projectPost.projectType != ProjectType.Contest) {
        if (this.state.postType === "useExisting") {
          let param = {
            projectId: this.state.existingPost,
            postUserId: this.state.clientId,
            projectType: projectType,
            projectScope: {
              projectScope: projectScope,
              projectSubScope: projectSubScope,
            },
            isNeededSearchAssistant,
            isNeededNDA,
            isNeededUrgent,
            // freelancersEmailAddresses:'',
            // offeredMilestones:'',
            regionId: this.state.defaultRegion
              ? this.state.defaultRegion
              : this.props.authUser?.myRegion?.regionName,
          };

          let result = await request(
            ENDPOINT["UpdateProjectInitStep"],
            postOptions(param)
          );

          let redirectTo =
            /*  this.state.postType === "useExisting"
              ? "/confirm-project?id=" + this.state.existingPost
              : */ this.props.projectPost.projectType != ProjectType.Contest
              ? "/project-post-details?id=" + this.state.existingPost
              : "/post-contest-project?id=" + this.state.existingPost;
          this.setState({ loading: false });
          this.props.history.push(redirectTo);
        } else {
          let param = {
            projectId: "",
            postUserId: this.state.clientId,
            projectType: projectType,
            projectScope: {
              projectScope: projectScope,
              projectSubScope: projectSubScope,
            },
            isNeededSearchAssistant,
            isNeededNDA,
            isNeededUrgent,
            services: !isNeededNDA?selectedServices:selectedServices.concat([this.state.services.NDA[0]])
          };

          let result = await request(
            ENDPOINT["CreateProject"],
            postOptions(param)
          );

          let redirectTo =
            this.state.postType === "useExisting"
              ? "/confirm-project?id=" + result.result
              : this.props.projectPost.projectType != ProjectType.Contest
                ? "/project-post-details?id=" + result.result
                : "/post-contest-project?id=" + result.result;
          this.setState({ loading: false });
          this.props.history.push(redirectTo);
        }
      } else {
        this.props.history.push("/post-contest-project");
      }
    }
  }

  postTypeHandle = (postType) => {
    this.setState({
      postType: postType,
    });
  };

  render() {
    let { languageType, languageReducer, authUser } = this.props;
    let { postType, ExistingProjectOptionsFlag, isSkeletonLoading,services } = this.state;
    const { projectPost } = this.props;
  return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-xl-2"></div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <SkeletonProjectPost
                count={1}
                isSkeletonLoading={isSkeletonLoading} 
                />

                <div className="skeletonLoading_mobile"> 
                  <Skeleton
                    count={4}
                    isSkeletonLoading={isSkeletonLoading}
                  />
                </div>
                <div hidden={isSkeletonLoading} className="project_post ">
                  <Heading
                    heading={languageType.POST_A_PROJECT}
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/post_sticky.svg"}
                    color="#333333"
                    fontSize="26px"
                    fontWeight="600"
                    fontFamily="Raleway"
                  />

                  <form className="post_form border-top-0">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label
                            title={languageType.SELECT_PROJECTY_TYPE}
                            compulsory={true}
                            question={true}
                            prefixBoxValid={
                              this.state.errorMessage["projectType"]
                                ? false
                                : true
                            }
                            prefixBoxInValid={
                              this.state.errorMessage["projectType"]
                                ? true
                                : false
                            }
                            primary={true}
                            icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/preferences_project.svg"}
                            color="#333333"
                          />
                          <div className="">
                            <DropdownList
                              id="projectType"
                              name="projectType"
                              enableAutoCompleteSearch
                              placeholder="projectType"
                              value={projectPost.projectType}
                              items={this.props.languageReducer.projectTypes}
                              selectItem={this.onProjectTypeChange}
                            />
                          </div>
                          <span className="error">
                            {this.state.errorMessage["projectType"]}
                          </span>
                        </div>
                        {projectPost.projectType != ProjectType.Contest ? (
                          <div className="form-group">
                            <Label
                              title={languageType.SELECT_BUSINESS_SCOPE}
                              compulsory={true}
                              prefixBoxValid={
                                this.state.errorMessage["projectScope"]
                                  ? false
                                  : true
                              }
                              prefixBoxInValid={
                                this.state.errorMessage["projectScope"]
                                  ? true
                                  : false
                              }
                              primary={true}
                              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/scope_target.svg"}
                              color="#333333"
                            />
                            <div className="">
                              <DropdownList
                                id="projectScope"
                                name="projectScope"
                                enableAutoCompleteSearch
                                placeholder="Select the scope of business"
                                value={projectPost.projectScope}
                                items={this.props.languageReducer.projectScopes?.filter(
                                  (item) => item.value != "others"
                                )}
                                selectItem={this.onProjectScopeChange}
                              />
                            </div>
                            <span className="error">
                              {this.state.errorMessage["projectScope"]}
                            </span>
                          </div>
                        ) : null}
                        {projectPost.projectType != ProjectType.Contest ? (
                          <div className="form-group">
                            <Label
                              title={languageType.SELECT_SUB_BUSINESS_SCOPE}
                              compulsory={true}
                              prefixBoxValid={
                                this.state.errorMessage["projectSubScope"]
                                  ? false
                                  : true
                              }
                              prefixBoxInValid={
                                this.state.errorMessage["projectSubScope"]
                                  ? true
                                  : false
                              }
                              primary={true}
                              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/subScopeIcon.svg"}
                              color="#333333"
                            />

                            <DropdownList
                              id="projectSubScope"
                              name="projectSubScope"
                              placeholder="Select the sub scope of business"
                              enableAutoCompleteSearch
                              disabled={!projectPost.projectScope}
                              value={projectPost.projectSubScope}
                              selectItem={this.onProjectSubScopeChange}
                              items={this.state.projectSubScopes}
                            />
                            <span className="error">
                              {this.state.errorMessage["projectSubScope"]}
                            </span>
                          </div>
                        ) : null}
                        <div className="form-group">
                          <Radio
                            handleSelect={this.postTypeHandle}
                            name="posType"
                            id="s-option"
                            value={"newPost"}
                            checked={postType === "newPost"}
                            label={languageType.CREATE_A_NEW_POST}
                            compulsory={false}
                          />
                        </div>
                        <div className="form-group custom-hidden-area">
                          <Radio
                            handleSelect={() => { }}
                            name="posType"
                            id="s-option8"
                            value={"newPost1"}
                            checked={false}
                            label={languageType.CREATE_A_NEW_POST}
                            compulsory={false}
                          />
                        </div>
                        <div className="form-group">
                          <Radio
                            handleSelect={this.postTypeHandle}
                            name="posType"
                            id="s-option1"
                            value={"useExisting"}
                            checked={postType === "useExisting"}
                            label={languageType.REUSING_EXISTING_A_POST}
                            compulsory={false}
                          />
                          <DropdownList
                            id="existingPost"
                            name="existingPost"
                            enableAutoCompleteSearch
                            value={this.state.existingPost}
                            selectItem={(value) => {
                              this.handleChange("existingPost", null, value);
                            }}
                            disabled={
                              postType !== "useExisting" ||
                              ExistingProjectOptionsFlag
                            }
                            items={this.state.existingProjects}
                          />
                          <span
                            className="error"
                            hidden={postType !== "useExisting"}
                          >
                            {this.state.errorMessage["existingPost"]}
                          </span>
                        </div>
                        <div className="btnSpaceTop save_cancel text-right NextBtnProjectPostPc">
                          <button
                            type="button"
                            className="btn contest-project-post-btn"
                            onClick={() => this.onPageRedirectHandle()}
                          >
                            {languageType.NEXT_TEXT}{" "}
                            <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} />
                            {this.state.loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <PaymentInfo
                          projectType={
                            projectPost.projectType === ""
                              ? ProjectTypeConst.Milestone
                              : projectPost.projectType
                          }
                        />
                        {projectPost.projectType === "" ? <TipsInfo /> : null}

                        <HelpInfo
                          isNeededSearchAssistant={
                            projectPost.isNeededSearchAssistant
                          } 
                          isNeededNDA={projectPost.isNeededNDA}
                          isNeededUrgent={projectPost.isNeededUrgent}
                          onFieldChange={this.onHelpInfoFieldChange}
                          setSign={this.setSign}
                          sign={this.state.sign}
                          services={services}
                          projectPost={projectPost}
                        />

                        <div className="btnSpaceTop save_cancel text-right NextBtnProjectPostMobile">
                          <button
                            type="button"
                            className="btn contest-project-post-btn"
                            onClick={() => this.onPageRedirectHandle()}
                          >
                            {languageType.NEXT_TEXT}{" "}
                            <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} />
                            {this.state.loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="yesno_box mt-5">
                      <div className="yesno_bodr">
                        <p>Test service cost you 10% of the</p>
                        <div className="yes_no d-flex">
                          <p>
                            total project value...You can read more&nbsp;&nbsp;
                            <a>detail here</a>. Would like to take this service?
                          </p>
                          <div className="yes_no_customControl_mobile">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="chkYes"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chkYes"
                            >
                              {languageType.YES_TEXT}
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="chkNo"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chkNo"
                            >
                              {languageType.NO_TEXT}
                            </label>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </form>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                {/* <RightTop />
                <RightBottom /> */}
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
    languageType: state.languageReducer.languageType,
    languageReducer: state.languageReducer,
    authUser: state.authReducer,
    projectPost: state.projectStore.projectPost,
  };
}

export default connect(mapStateToProps, {
  updateField,
  updateProjectType,
  updateProjectScope,
  updateProjectSubScope,
  updateServices
})(ProjectPost);

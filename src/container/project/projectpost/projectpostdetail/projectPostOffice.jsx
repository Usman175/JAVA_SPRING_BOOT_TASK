import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../../../store/action/action";
import notifications from "../../../../utils/notifications";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import { getUserProjectDetails } from "../../../../store/middlewares/Project";
import * as actions from "../../../../store/action/Project/projectActions";
import Radio from '../../../../components/radioButton/radio'
import {
  ProjectTypeConst,
  ProjectStepConst,
} from "../../../../utils/projectConst";
import Label from "../../../../components/postProject/label";
import RightTop from "../../../../components/rightbar/rightTop";
import RightBottom from "../../../../components/rightbar/rightBottom";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import Heading from "../../../../components/postProject/heading";
import ProjectLifeCycle from "../projectpostComponents/projectLifeCycle";
import RequirementBlock from "../projectpostComponents/requirementBlock";
import ScreeningQuestion from '../projectpostComponents/screeningQuestion';
import SearchBox from "../../../../components/searchBox";
import './projectpostdetail.scss'
import SubHeader from "../../../../components/subHeader";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class ProjectPostOffice extends Component {
  constructor(props) {
    super(props);
    var editType =
      new URLSearchParams(this.props.location.search).get("type") !== null &&
        new URLSearchParams(this.props.location.search).get("type") !== ""
        ? new URLSearchParams(this.props.location.search).get("type")
        : "";
    this.state =
      props.location?.state?.data &&
        Object.keys(props.location?.state?.data)?.length
        ? props.location.state.data
        : {
          isProjectEdit: editType === "edit" ? true : false,
          projectId: new URLSearchParams(this.props.location.search).get(
            "id"
          ),
          projectType: "",
          scopeOfBusiness: "",
          skillName: "",
          skills: [],
          vailableSkills: [],
          salaryType: "Monthly",
          currency: "",
          currencies: [],
          fromSalary: "",
          toSalary: "",
          isUntilHire: false,
          isCoverLetterRequired: true,
          project: {},
          errorMessage: {},
          loading:false
        };
  }

  componentWillMount() {
    this.bindCurrencies();
    this.bindSkills();

    this.props.updateSalaryType("Monthly");
  }

  onSkillAdd = (skill) => {
    if(skill){
      if(!this.props.projectPost.skills.includes(skill)) {
        this.props.addSkill(skill);
        let error=this.state.errorMessage;
        error.skills=''
        this.setState({errorMessage:error})
      }
    }

  };

  onSkillRemove = (skill) => {
    this.props.removeSkill(skill);
  }

  onSalaryTypeChange = (salaryType) => {
    this.props.updateSalaryType(salaryType);
  }

  onCurrencyChange = currency => {
    this.props.updateCurrency(currency);
    let error=this.state.errorMessage;
    error.currency=''
    this.setState({errorMessage:error})
  }

  onFromSalaryChange = (fromSalary) => {
    this.props.updateFromSalary(fromSalary);
    let error=this.state.errorMessage;
    error.fromSalary=''
    this.setState({errorMessage:error})
  }

  onToSalaryChange = (toSalary) => {
    this.props.updateToSalary(toSalary);
    let error=this.state.errorMessage;
    error.toSalary=''
    this.setState({errorMessage:error})
  }

  onPositionAvailableDate = (positionAvailableDate) => {
    this.props.updatePositionAvailableDate(positionAvailableDate);
  }

  //#region Bind Methods
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { lookUpData } = this.props;
    if (prevProps.lookUpData != lookUpData) {
      if (lookUpData) {
        this.bindCurrencies();
      }
    }
  }
  bindCurrencies() {
    const { lookUpData } = this.props;
    this.state.currencies = [
      {
        text: "USD",
        value: "USD",
      },
      {
        text: "원화결제",
        value: "KRW",
      },
      {
        text: "JPY",
        value: "JPY",
      },
      {
        text: "Jungle Points",
        value: "JP",
      },
    ];

    if (!this.props.location?.state?.data) {
      if (lookUpData.countryCode === "JP") this.setState({ currency: "JPY" });
      else if (lookUpData.countryCode === "KR")
        this.setState({ currency: "KRW" });
      else this.setState({ currency: "USD" });
    }
  }

  async bindSkills() {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=Skills`,
      getOptions({})
    );
    if (result.success) {
      for (let index = 0; index < result.result.data[0].data.length; index++) {
        const element = result.result.data[0].data[index];
        array.push({
          text: element.name,
          value: element.name.toString(),
        });
      }
      this.setState({ availableSkills: array });
    }
  }

  //#endregion Bind Methods

  //#region Validation Methods

  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    const { skills, salaryType, currency, fromSalary, toSalary, positionAvailableDate } = this.props.projectPost;
    // debugger
    if (skills.length <= 0) {
      formIsValid = false;
      errorMessage["skills"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'150',
        behavior:'smooth'
      })
    }
    // else if (!salaryType) {
    //   formIsValid = false;
    //   errorMessage["salaryType"] = languageType.REQUIRED_MESSAGE;
    // }
    else if (!currency) {
      formIsValid = false;
      errorMessage["currency"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'200',
        behavior:'smooth'
      })
    }
    else if (!fromSalary) {
      formIsValid = false;
      errorMessage["fromSalary"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }
    else if (!toSalary) {
      formIsValid = false;
      errorMessage["toSalary"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }
    else if (
      parseFloat(this.state.toSalary) <= parseFloat(this.state.fromSalary)
    ) {
      formIsValid = false;
      errorMessage["toSalary"] = "ToSalary should be greater then FromSalary";
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }
    else if (!positionAvailableDate && !this.state.isUntilHire) {
      formIsValid = false;
      errorMessage["positionAvailableDate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  handleChange(fieldData, e, value) {
    let errorMessage = {};
    if (fieldData === "salaryType")
      this.state.salaryType = value || e.target.value;
    else if (fieldData === "currency")
      this.state.currency = value || e.target.value;
    else if (fieldData === "fromSalary") {
      let fromSalary = value || e.target.value;
      if (fromSalary && fromSalary.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.fromSalary = fromSalary;
      else if (fromSalary === "") this.state.fromSalary = "";
    } else if (fieldData === "toSalary") {
      let toSalary = value || e.target.value;
      if (toSalary && toSalary.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.toSalary = toSalary;
      else if (toSalary === "") this.state.toSalary = "";

    } else if (fieldData === "isUntilHire")
    this.state.isUntilHire = this.state.isUntilHire?false:true;
    else if (fieldData === "screeningQuestion")
      this.state.screeningQuestion = value || e.target.value;
    else if (fieldData === "isCoverLetterRequired")
      this.state.isCoverLetterRequired = e.target.value !== "true";

    if (
      this.state.salaryType !== 0 &&
      this.state.salaryType !== "" &&
      this.state.salaryType !== null &&
      this.state.salaryType !== undefined
    )
      errorMessage["salaryType"] = null;
    else if (
      this.state.currency !== 0 &&
      this.state.currency !== "" &&
      this.state.currency !== null &&
      this.state.currency !== undefined
    )
      errorMessage["currency"] = null;
    else if (
      this.state.fromSalary !== 0 &&
      this.state.fromSalary !== "" &&
      this.state.fromSalary !== null &&
      this.state.fromSalary !== undefined
    )
      errorMessage["fromSalary"] = null;
    else if (
      this.state.toSalary !== 0 &&
      this.state.toSalary !== "" &&
      this.state.toSalary !== null &&
      this.state.toSalary !== undefined
    )
      errorMessage["toSalary"] = null;


    this.setState({ errorMessage: errorMessage });
  }

  //#endregion Validation Methods

  //#region Submit Method

  async onPageRedirectHandle() {
    if (this.handleValidation()) {
      this.setState({loading:true})
      const { skills, currency,projectType,lifecycleStage,minimumRequirement, salaryType, fromSalary, toSalary, positionAvailableDate, screeningQuestions } = this.props.projectPost;
      const { languageType } = this.props;

      let param = {
        projectId: this.state.projectId,
        skills: skills.join(","),
          // new
          projectType:"Office Work",
          projectStatus:'',
          projectLifeCycle:'',
          lifeCycleStage:'',
          amountPerHour:'',
          hourlyDetails:'',
          noOfDayAttendance:'',
          isAvailableForBidding:true,
          lastCompletedStep:'',
          maximumWeekHours:'',
          fromAmount:'',
          toAmount:'',
          freelancerType:'',
          noOfRequiredFreelancer:'',
          expectedCompletionDays:'',
          projectAmount:'',
          //
        currencyCode: currency,
        salaryType,
        fromSalary,
        toSalary,
        projectLifecycle:
        lifecycleStage === 1
          ? languageType.LIFE_CYCLE_1
          : lifecycleStage === 2
          ? languageType.LIFE_CYCLE_2
          : lifecycleStage === 3
          ? languageType.LIFE_CYCLE_3
          : lifecycleStage === 4
          ? languageType.LIFE_CYCLE_4
          : languageType.LIFE_CYCLE_5,
      noOfStar: minimumRequirement.noOfStar,
      jobSuccessScore: minimumRequirement.jobSuccessScore,
      freelancerLocation: minimumRequirement.freelancerLocation,
      yearsOfExperience: minimumRequirement.yearOfExperience,
      languageLevel: minimumRequirement.englishLevel,
      language: minimumRequirement.requiredLanguage,
      positionAvailableDate:!this.state.isUntilHire? positionAvailableDate:'',
        isUntilHire: this.state.isUntilHire,
        isCoverLetterRequired: this.state.isCoverLetterRequired,
        screeningQuestions: JSON.stringify(screeningQuestions),
      };

      // let result = await request(ENDPOINT["UpdateOfficeWorkProjectStep3"], postOptions(param));
      let result = await request(ENDPOINT["UpdateProjectThirdStep"], postOptions(param));
      this.setState({loading:false})
      if (result.success) {
        let redirectTo = "/confirm-project?id=" + this.state.projectId;
        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
      } else notifications.showError(result.message);
    }
  }

  //#endregion Submit Method

  onQuestionsChange = (questions) => {
    this.props.updateScreeningQuestions(questions);
  }

  
  onLifecycleStageChange = (stage) => {
    this.props.updateLifecycleStage(stage);
  };
  handleMinimumRequirementChange = (field, value) => {
    this.props.updateMinimumRequirementField(field, value);
  };
  componentDidMount() {
    this.findProjectIfExist()
  }
      // get detail of if existing set in props
  async findProjectIfExist(){
    let {languageType}=this.props
    let projectId = new URLSearchParams(this.props.location.search).get("id"); 
    if(projectId && !this.props.projectPost.projectType){
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        console.log(result,"result")
        this.setState({projectType:result.result.projectType})
         let skills=result.result.skills.split(',')
        this.props.projectPost.skills.length===0 && skills.length>0 && skills.map((skill)=>{
           if(skill){
            this.props.addSkill(skill);
           }
 
         })
         this.setState({isUntilHire:result.result.isUntilHire})
         if(result.result.positionAvailableDate){
          this.props.updatePositionAvailableDate(result.result.positionAvailableDate);
         }
         
         if(result.result.salaryType){
          this.props.updateSalaryType(result.result.salaryType);
         }
         let projectLifeCycle = result.result.projectLifeCycle;
         this.props.updateLifecycleStage(
          projectLifeCycle === languageType.LIFE_CYCLE_1
            ? 1
            : projectLifeCycle === languageType.LIFE_CYCLE_2
            ? 2
            : projectLifeCycle === languageType.LIFE_CYCLE_3
            ? 3
            : projectLifeCycle === languageType.LIFE_CYCLE_4
            ? 4
            : 5
        );
        if (result.result.noOfStar) {
          this.props.updateMinimumRequirementField(
            "noOfStar",
            result.result.noOfStar
          );
        }

        if (result.result.jobSuccessScore) {
          this.props.updateMinimumRequirementField(
            "jobSuccessScore",
            result.result.jobSuccessScore
          );
        }
        if (result.result.freelancerLocation) {
          this.props.updateMinimumRequirementField(
            "freelancerLocation",
            result.result.freelancerLocation
          );
        }
        if (result.result.yearsOfExperience) {
          this.props.updateMinimumRequirementField(
            "yearOfExperience",
            result.result.yearsOfExperience
          );
        }
        if (result.result.language) {
          this.props.updateMinimumRequirementField(
            "requiredLanguage",
            result.result.language
          );
        }
        if (result.result.languageLevel) {
          this.props.updateMinimumRequirementField(
            "englishLevel",
            result.result.languageLevel
          );
        }
         this.props.updateFromSalary(result.result.fromSalary);
         this.props.updateToSalary(result.result.toSalary);
         this.props.updateCurrency(result.result.currencyCode);
         let screeningQuestions=[]
         if(this.props.projectPost.screeningQuestions.length===0 ){
          let questions=JSON.parse(result.result.screeningQuestions)
          questions.map((Question)=>{
           screeningQuestions.push(Question)
          })
       this.props.updateScreeningQuestions(screeningQuestions);
         }
        

      }
    }
  }
  render() {
    const { skillName } = this.state;
    const { projectPost ,languageType} = this.props;
    return (
      <>
           <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
            <div className="col-xl-2 col-12 col-md-0 col-lg-1"></div>
              <div className="col-xl-8 col-12 col-md-12 col-lg-10">
                <div className="project_post milestone_form post_milston officeWork_form">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <Heading
                        heading={`Post project -  ${projectPost.projectType == "OfficeWork" || this.state.projectType == "OfficeWork" ? "Office Work" : projectPost.projectType}`}
                        icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/projectFreeContract.svg"}
                        color="#333333"
                        fontSize="26px"
                        fontWeight="600"
                        fontFamily="Raleway"
                     />

                      <form className="post_form">
                        <div className="contest_bodr">

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                              <Label title={"Add Required Skills"}  compulsory={true}
                              title={languageType.ADD_REQUIRED_SKILLS}
                              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"}
                              color="#333333"
                              ></Label>
                                <SearchBox
                                  id="skills"
                                  name="skills"
                                  placeholder="e.g C#"
                                  value={this.state.skills}
                                  items={this.state.availableSkills}
                                  selectItem={this.onSkillAdd}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                          <Label title={languageType.SKILLS_TEXT}
                      width="16px"
                           
                      icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                      color="#333333"
                          compulsory={true}></Label>
                            <div className="skill_btn">
                              {projectPost.skills.map((skill, index) => (
                                <a key={index} className="green_btn" title={skill} >
                                  {skill}
                                  <span className="float-right ml-1" style={{ cursor: 'pointer' }} onClick={() => this.onSkillRemove(skill)}>&times;</span>
                                </a>
                              ))}
                            </div>
                            <p className="text-danger">{this.state.errorMessage.skills}</p>
                          </div>

                          <div className="">
                          <Label title="Salary Type"
                           icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                           color="#333333"
                           width="28px"
                          compulsory={true}></Label>
                            <div className="row align-items-center salaryTypeOffice_colRadio_Mob">
                              <div className="col-3">
                              <Radio
                           handleSelect={(e)=>{
                            this.onSalaryTypeChange("Weekly")
                           }}
                           name="salary-type"
                           id="salary-type-weekly"
                           checked={projectPost.salaryType === "Weekly"}
                             label=  {"Weekly"}
                              compulsory={false}
                          />
                                
                              </div>
                              <div className="col-3">
                                <div className="">
                                <Radio
                           handleSelect={(e)=>{
                            this.onSalaryTypeChange("Monthly")
                           }}
                           name="salary-type"
                           id="salary-type-monthly"
                           checked={projectPost.salaryType === "Monthly"}
                             label=  {"Monthly"}
                              compulsory={false}
                          />
                               </div>
                              </div>
                              <div className="col-3">
                                <div className="">
                                <Radio
                           handleSelect={(e)=>{
                            this.onSalaryTypeChange("Yearly")
                           }}
                           name="salary-type"
                           id="salary-type-yearly"
                           checked={projectPost.salaryType === "Yearly"}
                             label=  {"Yearly"}
                              compulsory={false}
                          />
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="row align-items-center salaryOffice_colRadio_Mob">
                                   <div className="col-5 col-md-2">
                         <Label title="Salary "  compulsory={true}
                          icon="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                          color="#333333"

                          ></Label>    </div>
                          <div className="col-7 col-md-10 salaryInstructionText_col">
                            {languageType.SALARY_INSTRUCTION}
                          </div>
                     
                         </div>
                            <div className="row align-items-center">
                              <div className="col-12 col-lg-3 col-md-4" style={{marginLeft:'-5px'}}>
                                <div className="form-group">
                                  <DropdownList id="currency" name="currency" placeholder="Select currency"
                                    enableAutoCompleteSearch
                                    items={this.state.currencies}
                                    value={projectPost.currency}
                                    selectItem={this.onCurrencyChange}
                                  />
                                  <p className="text-danger">{this.state.errorMessage.currency}</p>
                                </div>
                              </div>
                              <div className="col-11 col-lg-3 col-md-4">
                                <div className="form-group">
                                  <input type="text" className="form-control" placeholder="From Salary" maxLength="10"
                                    value={projectPost.fromSalary}
                                    onChange={(e) => this.onFromSalaryChange(e.target.value)}
                                  />
                                  <p className="text-danger">{this.state.errorMessage.fromSalary}</p>
                                </div>
                              </div>
                              <div className="form-group">
                                <span>~</span>
                              </div>
                              <div className="col-12 col-lg-3 col-md-3">
                                <div className="form-group">
                                  <input type="text" className="form-control" placeholder="To Salary" maxLength="10"
                                    value={projectPost.toSalary}
                                    onChange={(e) => this.onToSalaryChange(e.target.value)}
                                    disabled={
                                      projectPost.fromSalary  ? false : true
                                    }
                                  />
                                  <p className="text-danger">{this.state.errorMessage.toSalary}</p>
                                </div>
                              </div>
                            </div>
                      

                          <div className="row">
                            <div className="col-lg-5">
                              <div className="form-group">
                                <div className="d-flex positionAvailable_formOfficeMob">
                            
                                  <Label title="Position Available "  compulsory={true}
                                    icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                                    color="#333333"
                                    width="28px"
                                  ></Label>
                                  <div className="custom-control custom-checkbox" style={{minWidth:'100px'}}>
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="chkIsUntilHire"
                                      value={this.state.isUntilHire}
                                      checked={this.state.isUntilHire}
                                      onChange={(e) =>
                                        this.handleChange("isUntilHire", e)
                                      }
                                    />
                                    <label className="custom-control-label" for="chkIsUntilHire">&nbsp;&nbsp;{languageType.UNTIL_HIRE}</label>
                                  </div>
                                </div>
                                {/* <input type="date" className="form-control"
                                disabled={this.state.isUntilHire}
                                  value={projectPost.positionAvailableDate}
                                  onChange={(e) => this.onPositionAvailableDate(e.target.value)}
                                /> */}
                                <div className="customer-date-picker">
                               <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  inputVariant="outlined"
                                  orientation="landscape"
                                  size="small"
                                  disabled={this.state.isUntilHire}
                                  fullWidth
                                  // format="MM/dd/yyyy"
                                  format="MM/DD/yyyy"
                                  value={projectPost.positionAvailableDate}
                                  onChange={(value)=>{
                                    this.onPositionAvailableDate(
                                      value
                                    );
                                  }}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                                </MuiPickersUtilsProvider>
                               </div>
                                <p className="text-danger">{this.state.errorMessage.positionAvailableDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="work_card freelancer_req">
                          <ProjectLifeCycle
                            selectedLifecycleStage={projectPost.lifecycleStage}
                            onLifecycleStageChange={this.onLifecycleStageChange}
                          />
                          <RequirementBlock
                            minimumRequirement={projectPost.minimumRequirement}
                            onFieldChange={this.handleMinimumRequirementChange}
                          />
                          </div>
                          <ScreeningQuestion questions={projectPost.screeningQuestions} onQuestionsChange={this.onQuestionsChange} />
                           <div className="submission-buttons save_cancel">   
                            <div
                                type="submit"
                                onClick={() =>
                                  this.props.history.push(
                                    "/project-post-details?type=back&id=" +
                                    this.state.projectId
                                  )
                                }
                                className="back-button"
                              >
                                <i className="fa fa-angle-left"></i>
                              </div>
                            <button
                              type="button"
                              className="btn contest-project-post-btn"
                              onClick={() => this.onPageRedirectHandle()}
                            >
                              {" "}
                              Next{" "} <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} />  {this.state.loading?<i className="fa fa-spinner fa-spin"></i>:''}
                            </button>


                          </div>
                        </div>
                      </form>
                    </div>
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
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    authUser: state.authReducer,
    userProjectDetails: state.projectStore.userProjectDetails,
    lookUpData: state.lookUp.lookUpData,
    projectPost: state.projectStore.projectPost,
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
    addSkill: skill => {
      dispatch(actions.projectPost_addSkill(skill));
    },
    removeSkill: skill => {
      dispatch(actions.projectPost_removeSkill(skill));
    },
    updateSalaryType: salaryType => {
      dispatch(actions.projectPost_updateSalaryType(salaryType));
    },
    updateCurrency: currency => {
      dispatch(actions.projectPost_updateCurrency(currency));
    },
    updateFromSalary: fromSalary => {
      dispatch(actions.projectPost_updateFromSalary(fromSalary));
    },
    updateToSalary: toSalary => {
      dispatch(actions.projectPost_updateToSalary(toSalary));
    },
    updateMinimumRequirementField: (field, value) => {
      dispatch(actions.projectPost_updateMinimunRequirementField(field, value));
    },
    updatePositionAvailableDate: positionAvailableDate => {
      dispatch(actions.projectPost_updatePositionAvailableDate(positionAvailableDate));
    },
    updateLifecycleStage: (stage) => {
      dispatch(actions.projectPost_updateLifecycleStage(stage));
    },
    updateScreeningQuestions: (screeningQuestions) => {
      dispatch(actions.projectPost_updateScreeningQuestions(screeningQuestions));
    }
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ProjectPostOffice);

import { Typography } from "@material-ui/core";
import classnames from "classnames";
import { isEmpty } from "lodash-es";
import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Currency from "../../../../components/currency";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import Heading from "../../../../components/postProject/heading";
import Label from "../../../../components/postProject/label";
import RightBottom from "../../../../components/rightbar/rightBottom";
import RightTop from "../../../../components/rightbar/rightTop";
import SearchBox from "../../../../components/searchBox";
import {
  onReduxProjectConfirmationDataHandle,
  onReduxRouteChange,
  saveProjectDataRedux,
} from "../../../../store/action/action";
import * as actions from "../../../../store/action/Project/projectActions";
import { GET_IMAGE_PREFIX } from "../../../../store/constants/constant";
import { getUserProjectDetails } from "../../../../store/middlewares/Project";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import request from "../../../../utils/request";
import ProjectLifeCycle from "../projectpostComponents/projectLifeCycle";
import RequirementBlock from "../projectpostComponents/requirementBlock";
import ScreeningQuestion from "../projectpostComponents/screeningQuestion";
import Format from '../../../../components/numberFormat/index'
import "./projectpostdetail.scss";
import SubHeader from "../../../../components/subHeader";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
class ProjectPostMileStone extends Component {
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
            isProjectEdit: editType === "edit",
            projectId: new URLSearchParams(props.location.search).get("id"),
            projectType: "",
            scopeOfBusiness: "",
            skills: [],
            availableSkills: [],
            skillName: "",
            freelancerType: "",
            freelancerTypes: [],
            noOfFreelancer: "",
            period: "",
            currency: "",
            isUntilHire: false,
            currencies: [],
            amount: "",
            screeningQuestionId: "",
            screeningQuestion: "",
            screeningQuestions: [],
            project: {},
            errorMessage: {},
            loading: false,
            mileStoleBid: false,
            mileStoneDetail: [
              {
                projectId: new URLSearchParams(props.location.search).get("id"),
                proposalId: "",
                projectContractId: "",
                milestoneTitle: "",
                milestoneDescription: "",
                offerAmount: "",
                milestoneDueDate: "",
              },
            ],
          };
  }

  componentWillMount() {
    this.bindSkills();
    this.bindFreelancerTypes();
    this.bindCurrencies();
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
    this.setState((state) => ({
      ...state,
      currencies: [
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
      ],
    }));
  }

  async bindFreelancerTypes() {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=FreelancerTypes`,
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
      this.setState({
        freelancerTypes: array,
      });
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

  handleAddSkill = (skill) => {
    if(skill){
      if (!this.props.projectPost.skills.includes(skill)) {
        this.props.addSkill(skill);
        let error=this.state.errorMessage;
        error.skills=''
        this.setState({errorMessage:error})
      }
    }
 
  };

  handleRemoveSkill = (skill) => {
    this.props.removeSkill(skill);
  };

  handleUpdateFreelancerType = (freelancerType) => {
    this.props.updateFreelancerType(freelancerType);
    let error=this.state.errorMessage;
    error.freelancerType=''
    this.setState({errorMessage:error})
  };

  handleUpdateFreelancerCount = (freelancerCount) => {
    this.props.updateFreelancerCount(freelancerCount);
    let error=this.state.errorMessage;
    error.noOfFreelancer=''
    this.setState({errorMessage:error})
    
  };
  onPositionAvailableDate = (positionAvailableDate) => {
    this.props.updatePositionAvailableDate(positionAvailableDate);
  }
  onMaximumWeekHoursChange = (selectedhours) => {
    this.props.updateMaxWeekHours(selectedhours);
    let error=this.state.errorMessage;
    error.maximumWeekHours=''
    this.setState({errorMessage:error})
  };
  handleUpdatePeriod = (value) => {
    this.props.updatePeriod(value);
    let error=this.state.errorMessage;
    error.period=''
    this.setState({errorMessage:error})
    
  };

  handleUpdateCurrency = (currency) => {
    this.props.updateCurrency(currency);
    let error=this.state.errorMessage;
    error.currency=''
    this.setState({errorMessage:error})
  };

  handleUpdateAmount = (event) => {
    this.props.updateAmount(event.target.value);
    let error=this.state.errorMessage;
    error.amount=''
    this.setState({errorMessage:error})
  };

  onMinimumRequirementSectionActive = () => {
    this.setState({
      isMinimumRequirementSectionActive: !this.state
        .isMinimumRequirementSectionActive,
    });
  };

  onLifecycleStageChange = (stage) => {
    this.props.updateLifecycleStage(stage);
  };

  onQuestionsChange = (questions) => {
    this.props.updateScreeningQuestions(questions);
  };

  onIsCoverLetterRequiredChange = (event) => {
    this.props.updateIsCoverLetterRequired(event.target.value !== "true");
  };

  //#region Validation Methods

  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    const {
      skills,
      freelancerType,
      freelancerCount,
      maximumWeekHours,
      period,
      currency,
      positionAvailableDate,
      amount,
    } = this.props.projectPost;

    if (skills.length <= 0) {
      formIsValid = false;
      errorMessage["skills"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'200',
        behavior:'smooth'
      })
    } else if (!freelancerType) {
      formIsValid = false;
      errorMessage["freelancerType"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }else if (!maximumWeekHours && freelancerType === "Company") {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'200',
        behavior:'smooth'
      })
    } else if (maximumWeekHours > 7 * 24 && freelancerType === "Company") {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.VALID_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    } else if (!freelancerCount && freelancerType !== "Headhunter") {
      formIsValid = false;
      errorMessage["noOfFreelancer"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    } else if (!period) {
      formIsValid = false;
      errorMessage["period"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'300',
        behavior:'smooth'
      })
    } else if (!currency) {
      formIsValid = false;
      errorMessage["currency"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'350',
        behavior:'smooth'
      })
    } else if (!amount || Number(amount) < 10) {
      if (
        this.state.mileStoneDetail.reduce(function (acc, obj) {
          return acc + Number(obj.offerAmount);
        }, 0) < 10 &&
        this.state.mileStoleBid
      ) {
        formIsValid = false;
        errorMessage["amount"] =
          Number(
            this.state.mileStoneDetail.reduce(function (acc, obj) {
              return acc + Number(obj.offerAmount);
            }, 0)
          ) < 10
            ? "Please Enter at least 10$"
            : languageType.REQUIRED_MESSAGE;
      } else if (!this.state.mileStoleBid) {
        formIsValid = false;
        errorMessage["amount"] =
          Number(amount) < 10
            ? "Please Enter at least 10$"
            : languageType.REQUIRED_MESSAGE;
      }
      window.scrollTo({
        top:'350',
        behavior:'smooth'
      })
      
    } else if (!positionAvailableDate && !this.state.isUntilHire) {
      formIsValid = false;
      errorMessage["positionAvailableDate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }
    // Validating milestoneDueDate

    this.state.mileStoneDetail.forEach(({ milestoneDueDate }, index) => {
      const nextMileStone = this.state.mileStoneDetail[index + 1];
      if (nextMileStone) {
        if (
          new Date(nextMileStone.milestoneDueDate).getTime() <
          new Date(milestoneDueDate).getTime()
        ) {
          formIsValid = false;
          errorMessage[`${"milestoneDueDate"}${index + 1}`] =
            "Date must be greater than previous date";
        }
      }
    });
 

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  handleMinimumRequirementChange = (field, value) => {
    this.props.updateMinimumRequirementField(field, value);
  };

  handleChange = (fieldData, e, value) => {
    let errorMessage = {};
    if (fieldData === "period") {
      let period = value || e.target.value;
      if (!period || period.match(/^[0-9\b]+$/)) this.state.period = period;
      else if (period === "") this.state.period = "";
    } else if (fieldData === "currency")
      this.state.currency = value || e.target.value;
    else if (fieldData === "amount") {
      let amount = value || e.target.value;
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.amount = amount;
      else if (amount === "") this.state.amount = "";
    } else if (fieldData === "isUntilHire"){
      this.state.isUntilHire = this.state.isUntilHire?false:true;
    }
     else if (fieldData === "screeningQuestion")
      this.state.screeningQuestion = value || e.target.value;
    else if (
      this.state.freelancerType !== 0 &&
      this.state.freelancerType !== "" &&
      this.state.freelancerType !== null &&
      this.state.freelancerType !== undefined
    )
      errorMessage["freelancerType"] = null;
    else if (
      this.state.noOfFreelancer !== 0 &&
      this.state.noOfFreelancer !== "" &&
      this.state.noOfFreelancer !== null &&
      this.state.noOfFreelancer !== undefined
    )
      errorMessage["noOfFreelancer"] = null;
    else if (
      this.state.period !== 0 &&
      this.state.period !== "" &&
      this.state.period !== null &&
      this.state.period !== undefined
    )
      errorMessage["period"] = null;
    else if (
      this.state.currency !== 0 &&
      this.state.currency !== "" &&
      this.state.currency !== null &&
      this.state.currency !== undefined
    )
      errorMessage["currency"] = null;
    else if (
      this.state.amount !== 0 &&
      this.state.amount !== "" &&
      this.state.amount !== null &&
      this.state.amount !== undefined &&
      Number(this.state.amount) > 10
    )
      errorMessage["amount"] = null;
    else if (
      this.state.screeningQuestion !== 0 &&
      this.state.screeningQuestion !== "" &&
      this.state.screeningQuestion !== null &&
      this.state.screeningQuestion !== undefined
    )
      errorMessage["screeningQuestion"] = null;

    this.setState({ errorMessage: errorMessage });
  };

  //#endregion Validation Methods

  //#region Submit Method
  handleBackClick = () => {
    let promise = new Promise((resolve) => {
      resolve(
        this.props.saveProjectDataRedux(
          this.props.location.pathname,
          this.state
        )
      );
    });
    promise.then(
      this.props.history.push(
        "/project-post-details?type=back&id=" + this.state.projectId
      )
    );
  };

  async onPageRedirectHandle() {
    if (this.handleValidation()) {
      this.setState({ loading: true });
      if (this.state.mileStoleBid) {
        this.props.updateOfferedMilestone(this.state.mileStoneDetail);
      }
      const {
        projectType,
        skills,
        freelancerType,
        freelancerCount,
        period,
        currency,
        amount,
        lifecycleStage,
        minimumRequirement,
        isCoverLetterRequired,
        screeningQuestions,
        positionAvailableDate,
        maximumWeekHours
      } = this.props.projectPost;
      const { languageType } = this.props;
      let param = {
        projectId: this.state.projectId,
        skills: skills.join(","),
        // new
        projectType: projectType || this.state.projectType,
        projectStatus: "",
        salaryType: "",
        amountPerHour: "",
        hourlyDetails: "",
        noOfDayAttendance: "",
        isUntilHire: this.state.isUntilHire,
        positionAvailableDate:!this.state.isUntilHire? positionAvailableDate:'',
        isAvailableForBidding: true,
        lastCompletedStep: "",
        maximumWeekHours: maximumWeekHours,
        fromAmount: "",
        toAmount: "",
        fromSalary: "",
        toSalary: "",
        offeredMilestones: this.state.mileStoleBid
          ? this.state.mileStoneDetail
          : [],
        //

        freelancerType: freelancerType,
        noOfRequiredFreelancer:
          freelancerType !== "Team" ? freelancerCount : "",
        expectedCompletionDays: period,
        currencyCode: currency,
        projectBudgetForMilestone: (this.state.mileStoleBid
          ? this.state.mileStoneDetail.reduce(function (acc, obj) {
              return acc + Number(obj.offerAmount);
            }, 0)
          : amount
        ).toString(),
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
        isCoverLetterRequired: isCoverLetterRequired,
        screeningQuestions: JSON.stringify(
          screeningQuestions.map((n) => n.question)
        ),
      };
      console.log(lifecycleStage, "lifecycleStage");
      // let result = await request(ENDPOINT['UpdateMilestoneProjectStep3'], postOptions(param));
      let result = await request(
        ENDPOINT["UpdateProjectThirdStep"],
        postOptions(param)
      );
      this.setState({ loading: false });
      if (result.success) {
        let redirectTo = "/confirm-project?id=" + this.state.projectId;
        // this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
        this.props.saveProjectDataRedux(this.props.location.pathname, {});
      } else notifications.showError(result.message);
    }
  }

  //#endregion Submit Method

  //#region Screenig Question
  renderStars = (number = 0) => {
    let container = [];
    for (let i = 0; i < number; i++)
      container.push(
        <i
          className="fa fa-star"
          style={{ color: "green" }}
          aria-hidden="true"
          key={i}
        />
      );
    return container;
  };

  //#endregion Screening Question

  // get detail of if existing set in props

  componentDidMount() {
    this.findProjectIfExist();
    let { offeredMilestones } = this.props.projectPost;
    if (offeredMilestones && offeredMilestones.length > 0) {
      this.setState({ mileStoleBid: true, mileStoneDetail: offeredMilestones });
      this.props.updateAmount(
        offeredMilestones.reduce(function (acc, obj) {
          return acc + Number(obj.offerAmount);
        }, 0)
      );
    }
  }
  async findProjectIfExist() {
    let { languageType } = this.props;
    let projectId = new URLSearchParams(this.props.location.search).get("id");
    if (projectId && !this.props.projectPost.projectType) {
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        // console.log(result,"result")
        this.setState({ projectType: result.result.projectType });
        let skills = result.result.skills.split(",");
        skills.length > 0 &&
          skills.map((skill) => {
            if (skill) {
              this.props.addSkill(skill);
            }
          });
        if (
          result.result.offeredMilestones &&
          result.result.offeredMilestones.length > 0
        ) {
          this.setState({
            mileStoleBid: true,
            mileStoneDetail: result.result.offeredMilestones,
          });
          this.props.updateAmount(
            result.result.offeredMilestones.reduce(function (acc, obj) {
              return acc + Number(obj.offerAmount);
            }, 0)
          );
        } else {
          this.props.updateAmount(result.result.projectBudgetForMilestone);
        }
        this.props.updateFreelancerType(result.result.freelancerType);
        this.props.updateFreelancerCount(result.result.noOfRequiredFreelancer);
        this.props.updateMaxWeekHours(result.result.maximumWeekHours);
        this.props.updatePeriod(result.result.expectedCompletionDays);
        this.props.updateCurrency(result.result.currencyCode);
        this.setState({isUntilHire:result.result.isUntilHire})
        if(result.result.positionAvailableDate){
          this.props.updatePositionAvailableDate(result.result.positionAvailableDate);
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
            : projectLifeCycle === languageType.LIFE_CYCLE_5
            ? 5
            : 1
        );
        if(result.result.noOfStar){
          this.props.updateMinimumRequirementField(
            "noOfStar",
            result.result.noOfStar
          );
        }
      
        if(result.result.jobSuccessScore){
          this.props.updateMinimumRequirementField(
            "jobSuccessScore",
            result.result.jobSuccessScore
          );
        }
       if(result.result.freelancerLocation){
        this.props.updateMinimumRequirementField(
          "freelancerLocation",
          result.result.freelancerLocation
        );
       }
        if(result.result.yearsOfExperience){
          this.props.updateMinimumRequirementField(
            "yearOfExperience",
            result.result.yearsOfExperience
          );
        }
      if(result.result.language){
        this.props.updateMinimumRequirementField(
          "requiredLanguage",
          result.result.language
        );
      }
     if(result.result.languageLevel){
      this.props.updateMinimumRequirementField(
        "englishLevel",
        result.result.languageLevel
      );
     }
       
    
        let screeningQuestions = [];
        let questions = JSON.parse(result.result.screeningQuestions);
        questions.map((Question) => {
          screeningQuestions.push({
            question: Question,
            id: v4(),
          });
        });
        this.props.updateScreeningQuestions(screeningQuestions);

        /*        this.props.updateScreeningQuestions(questions); screeningQuestions */
      }
    }
  }

  handleAddMileStoneDes = (value, index) => {
    let mileStoneData = this.state.mileStoneDetail;
    mileStoneData[index].milestoneTitle = value;

    this.setState({ mileStoneDetail: mileStoneData });
  };
  handleAddMileStoneAmount = (value, index) => {
    let mileStoneData = this.state.mileStoneDetail;
    mileStoneData[index].offerAmount = value;
    this.setState({ mileStoneDetail: mileStoneData });
  };
  handleAddMileStoneDate = (value, index) => {
    let mileStoneData = this.state.mileStoneDetail;
    mileStoneData[index].milestoneDueDate = value;

    this.setState({ mileStoneDetail: mileStoneData });
  };
  handleAddMileStoneItem = () => {
    this.setState({
      mileStoneDetail: [
        ...this.state.mileStoneDetail,
        {
          projectId: this.state.projectId,
          proposalId: "",
          projectContractId: "",
          milestoneTitle: "",
          milestoneDescription: "",
          offerAmount: "",
          milestoneDueDate: "",
        },
      ],
    });
  };
  handleRemoveMileStoneItem = (index) => {
    this.setState({
      mileStoneDetail: [
        ...this.state.mileStoneDetail.slice(0, index),
        ...this.state.mileStoneDetail.slice(index + 1),
      ],
    });
  };

  //#region helpers
  calculateMilestoneMinDate = (index) => {
    const lastMilestone = this.state.mileStoneDetail[index - 1];
    if (!isEmpty(lastMilestone)) {
      return lastMilestone.milestoneDueDate;
    }
    return "";
  };
  render() {
    const {
      skills,
      isMinimumRequirementSectionActive,
      mileStoneDetail,
    } = this.state;
    const { languageType, projectPost,freelancerTypes,ProjectPeriod } = this.props;
    // console.log(projectPost, "projectPost");
    return (
      <>
           <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
            <div className="col-xl-2 col-12 col-md-0 col-lg-1"></div>
              <div className="col-xl-8 col-12 col-md-12 col-lg-10">
                <div className="project_post milestone_form post_milston milestone_form_Org">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <Heading
                        heading={languageType.PROJECT_POST_MILESTONE}
                        icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/projectFreeContract.svg"}
                        color="#333333"
                        fontSize="26px"
                        fontWeight="600"
                        fontFamily="Raleway"
                      />
                      <form
                        className="post_form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.onPageRedirectHandle();
                  
                        }}
                      >
                        <div className="contest_bodr">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <Label
                                  title={languageType.ADD_REQUIRED_SKILLS}
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage["skills"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["skills"]
                                      ? true
                                      : false
                                  }
                                  icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"}
                                  color="#333333"
                                ></Label>
                                <SearchBox
                                  id="skills"
                                  name="skills"
                                  placeholder="e.g C#"
                                  value={this.state.skills}
                                  items={this.state.availableSkills}
                                  selectItem={this.handleAddSkill}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                          <Label
                              title={languageType.SKILLS_TEXT}
                              compulsory={true}
                              prefixBoxValid={
                                this.state.errorMessage["skills"] ? false : true
                              }
                              prefixBoxInValid={
                                this.state.errorMessage["skills"] ? true : false
                              }
                              width="16px"
                           
                              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                              color="#333333"
                            ></Label>
                            <div className="skill_btn">
                              {projectPost.skills.map((skill, index) => (
                                <a
                                  key={index}
                                  className="green_btn"
                                  title={skill}
                                >
                                  {skill}
                                  <span
                                    className="float-right ml-1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.handleRemoveSkill(skill)
                                    }
                                  >
                                    &times;
                                  </span>
                                </a>
                              ))}
                            </div>
                            <span className="error">
                              {this.state.errorMessage["skills"]}
                            </span>
                          </div>

                          <div className="row align-items-center custom-row-margin-post-project">
                            <div className="col-md-5">
                              <div className="form-group">
                                <Label
                                  title={languageType.PREFERRED_FREELANCER_TYPE}
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage["freelancerType"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["freelancerType"]
                                      ? true
                                      : false
                                  }
                                  icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/experience.png"}
                                  width="26px"
                                  color="#333333"
                                ></Label>
                                <DropdownList
                                  id="freelancerType"
                                  name="freelancerType"
                                  enableAutoCompleteSearch
                                  placeholder="Select freelancer type"
                                  value={projectPost.freelancerType}
                                  items={freelancerTypes}
                                  selectItem={this.handleUpdateFreelancerType}
                                />
                                 <span className="error">
                                {this.state.errorMessage["freelancerType"]}
                              </span>
                              </div>
                             
                            </div>
                            <div
                              className="col-md-5 col-lg-5 col-xl-4"
                              hidden={
                                this.state.freelancerType === "Individual"
                              }
                            >
                              {
                                projectPost.freelancerType !="Headhunter" && (    <div
                                  className="form-group"
                                  style={{
                                    marginTop: this.state.errorMessage
                                      .noOfFreelancer
                                      ? "18px"
                                      : "0px",
                                  }}
                                >
                                  <Label
                                    title={languageType.NO_OF_FREELANCER}
                                    compulsory={true}
                                    prefixBoxValid={
                                      this.state.errorMessage["noOfFreelancer"]
                                        ? false
                                        : true
                                    }
                                    prefixBoxInValid={
                                      this.state.errorMessage["noOfFreelancer"]
                                        ? true
                                        : false
                                    }
                                    icon="https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"
                                    color="#333333"
                                  ></Label>
                                  <DropdownList
                                    id="noOfFreelancer"
                                    name="noOfFreelancer"
                                    enableAutoCompleteSearch
                                    value={projectPost.freelancerCount}
                                    items={[
                                      {
                                        text: languageType.NO_ONE_TEXT,
                                        value: "1",
                                      },
                                      {
                                        text: languageType.NO_TWO_TEXT,
                                        value: "2",
                                      },
                                      {
                                        text: languageType.NO_THREE_TEXT,
                                        value: "3",
                                      },
                                      {
                                        text: languageType.NO_FOUR_TEXT,
                                        value: "4",
                                      },
                                      {
                                        text: languageType.NO_FIVE_TEXT,
                                        value: "5",
                                      },
                                      {
                                        text: languageType.NO_MORE_THAN_FIVE_TEXT,
                                        value: "6",
                                      },
                                    ]}
                                    selectItem={this.handleUpdateFreelancerCount}
                                  /> 
                                  <span className="error" >
                                    {this.state.errorMessage["noOfFreelancer"]}
                                  </span>
                                </div>
                            )
                              }
                            </div>
                            <div
                              className="col-md-6"
                              hidden={projectPost.freelancerType != "Company"}
                              // style={{marginTop:'20px'}}
                            >
                              <div className="form-group">
                                <Label
                                  title={languageType.MAX_WEEKLY_LIMIT}
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage["maximumWeekHours"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["maximumWeekHours"]
                                      ? true
                                      : false
                                  }
                                ></Label>
                                <div className="d-flex align-items-center">
                                  <DropdownList
                                    id="maximumHourPerWeek"
                                    name="maximumHourPerWeek"
                                    enableAutoCompleteSearch
                                    value={projectPost.maximumWeekHours}
                                    items={[
                                      {
                                        text: languageType.NO_TEN_TEXT,
                                        value: "10",
                                      },
                                      {
                                        text: languageType.NO_TWENTY_TEXT,
                                        value: "20",
                                      },
                                      {
                                        text: languageType.NO_THIRTY_TEXT,
                                        value: "30",
                                      },
                                      {
                                        text: languageType.NO_FOURTY_TEXT,
                                        value: "40",
                                      },
                                      {
                                        text: languageType.NO_FIFTY_TEXT,
                                        value: "50",
                                      },
                                      {
                                        text: languageType.NO_UNLIMITED_TEXT,
                                        value: "60",
                                      },
                                    ]}
                                    selectItem={this.onMaximumWeekHoursChange}
                                  />
                                </div>
                                {this.state.errorMessage.maximumWeekHours && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.maximumWeekHours}
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>

                          <div className="row align-items-center custom-row-margin-post-project1">
                            <div className="col-md-5">
                              <div className="form-group">
                                <Label
                                  title={languageType.PROJECT_PERIOD}
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage["period"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["period"]
                                      ? true
                                      : false
                                  }
                            icon="https://dhihitu47nqhv.cloudfront.net/icons/sixmonths.svg"
                            color="#333333"
                                ></Label>
                                <DropdownList
                                    id="ProjectPeriod"
                                    name="ProjectPeriod"
                                    enableAutoCompleteSearch
                                    value={projectPost.period}
                                    items={ProjectPeriod}
                                    selectItem={this.handleUpdatePeriod}
                                  />
                                <p className="text-danger">
                                  {this.state.errorMessage.period}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-3 align-self-end mb-1">
                              <div className="form-group">
                                {projectPost.period}{/*  {languageType.DAYS_TEXT} */}
                              </div>
                            </div>
                          </div>

                          <div className="row align-items-center custom-row-margin-post-project1">
                            <div className="col-md-12">
                              <div className="form-group">
                                <Label
                                  title={languageType.PROJECT_BUDGET}
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage["currency"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["currency"]
                                      ? true
                                      : false
                                  }
                                  icon="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                                  color="#333333"
                                ></Label>
                                <p className="text-danger text-dangerPayByPoint w-100 mw-100 my-1">
                                  {languageType.PAYING_BY_POINT}
                                </p>
                                <div className="d-flex align-items-center projectBudgetMob">
                                  <div
                                    className="col-md-3 col-12"
                                    style={{ margin: 0, padding: 0 }}
                                  >
                                    <DropdownList
                                      id="currency"
                                      name="currency"
                                      enableAutoCompleteSearch
                                      placeholder="Select currency"
                                      value={projectPost.currency}
                                      items={this.state.currencies}
                                      selectItem={this.handleUpdateCurrency}
                                    />
                                    <p className="text-danger">
                                      {this.state.errorMessage.currency}
                                    </p>
                                  </div>

                                  <div
                                    className="col-md-3 col-12  projectBudgetMobCol2"
                                    style={{
                                      marginTop: this.state.errorMessage.amount
                                        ? "14px"
                                        : "0px",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        languageType.TOTAL_PROJECT_BUDGET
                                      }
                                      maxLength="10"
                                      disabled={this.state.mileStoleBid}
                                      value={
                                        this.state.mileStoleBid
                                          ? mileStoneDetail.reduce(function (
                                              acc,
                                              obj
                                            ) {
                                              return (
                                                acc + Number(obj.offerAmount)
                                              );
                                            },
                                            0)
                                          : projectPost.amount
                                      }
                                      onChange={this.handleUpdateAmount}
                                    />
                                    <p className="text-danger">
                                      {this.state.errorMessage.amount}
                                    </p>
                                  </div>


                                {/* Format */}
                                  <div
                                    className={classnames("col-md-3", {
                                      "d-none":
                                        isEmpty(projectPost.currency) ||
                                        isEmpty(projectPost.amount),
                                    })}
                                  >
                                    <Typography className="font-weight-bold currency-custom-font-size">
                                      <Format  currency={projectPost.currency} number={
                                        this.state.mileStoleBid
                                          ? mileStoneDetail.reduce(function (
                                              acc,
                                              obj
                                            ) {
                                              return (
                                                acc + Number(obj.offerAmount)
                                              );
                                            },
                                            0)
                                          : projectPost.amount
                                      } />
                                      {/* <Currency
                                        currency={projectPost.currency}
                                      />
                                      {projectPost.amount} */}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12"
                              style={{
                                marginBottom: this.state.mileStoleBid
                                  ? ""
                                  : "20px",
                              }}
                            >

                              <div  className="checkbox_area_for_mile_stone_bid">
                              <input className="custom-checkbox-styled"
                                       type="checkbox"
                                       onChange={(e) =>
                                         this.setState({
                                           mileStoleBid: e.target.checked,
                                         })
                                       }
                                       checked={this.state.mileStoleBid}
                                 id="styled-checkbox-1" type="checkbox"  value={this.state.isAccept} />
                              <label for="styled-checkbox-1">  Please, check if you would like to offer
                                  milestones in detail or counter offer.</label>
                              </div>
                       
                            </div>
                            <div
                              className="col-md-12"
                              style={{ marginBottom: "20px" }}
                              hidden={!this.state.mileStoleBid}
                            >
                              {this.state.mileStoneDetail.map((item, index) => (
                                <div>
                                  <br />
                                  <div className="row">
                                    <div className="col-12 col-md-4">
                                      <div className="input_Milestone_offer_area_detail">
                                        <input
                                          type="text"
                                          required={this.state.mileStoleBid}
                                          placeholder="Milestone title"
                                          onChange={(e) =>{
                                            if(e.target.value.length<21){
                                              this.handleAddMileStoneDes(
                                                e.target.value,
                                                index
                                              )
                                            }else{
                                              notifications.showWarning("You can write maximum 20 characters")
                                            }
                                          }
                                          
                                          }
                                          value={item.milestoneTitle}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                      <div className="input_Milestone_offer_area_detail">
                                        <input
                                          type="number"
                                          required={this.state.mileStoleBid}
                                          placeholder="Offer Amount"
                                          onChange={(e) =>
                                            this.handleAddMileStoneAmount(
                                              e.target.value,
                                              index
                                            )
                                          }
                                          value={item.offerAmount}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                      <div className="input_Milestone_offer_area_detail">
                                        <input
                                          type="date"
                                          required={this.state.mileStoleBid}
                                          min={this.calculateMilestoneMinDate(
                                            index
                                          )}
                                          onChange={(e) =>
                                            this.handleAddMileStoneDate(
                                              e.target.value,
                                              index
                                            )
                                          }
                                          value={item.milestoneDueDate}
                                        />
                                        <span className="error">
                                          {
                                            this.state.errorMessage[
                                              `milestoneDueDate${index}`
                                            ]
                                          }
                                        </span>
                                      </div>
                                    </div>
                                    {index + 1 === mileStoneDetail.length &&
                                    mileStoneDetail.length < 5 ? (
                                      <div className="col-12 col-md-2 customer-plus-addition-icon">
                                        <i
                                          onClick={this.handleAddMileStoneItem}
                                          className="fa fa-plus"
                                        ></i>
                                      </div>
                                    ) : (
                                      <div
                                        onClick={() =>
                                          this.handleRemoveMileStoneItem(index)
                                        }
                                        className="col-12 col-md-2 customer-plus-addition-icon"
                                      >
                                        <i className="fa fa-minus"></i>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
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
                                {/* <input type="date" className="form-control"
                                disabled={this.state.isUntilHire}
                                  value={projectPost.positionAvailableDate}
                                  onChange={(e) => this.onPositionAvailableDate(e.target.value)}
                                /> */}
                                <p className="text-danger">{this.state.errorMessage.positionAvailableDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="work_card freelancer_req">
                            <ProjectLifeCycle
                              selectedLifecycleStage={
                                projectPost.lifecycleStage
                              }
                              onLifecycleStageChange={
                                this.onLifecycleStageChange
                              }
                            />

                            <RequirementBlock
                              minimumRequirement={
                                projectPost.minimumRequirement
                              }
                              onFieldChange={
                                this.handleMinimumRequirementChange
                              }
                            />
                          </div>

                          <ScreeningQuestion
                            questions={projectPost.screeningQuestions}
                            onQuestionsChange={this.onQuestionsChange}
                          />

                          <div className="submission-buttons save_cancel">
                          <div
                                type="submit"
                                onClick={this.handleBackClick}
                                className="back-button"
                              >
                                <i className="fa fa-angle-left"></i>
                              </div>
                            <button
                              type="submit"
                              className="btn contest-project-post-btn"
                            >
                              Next{" "} <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} /> 
                              {this.state.loading ? (
                                <i className="fa fa-spinner fa-spin"></i>
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
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
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    savedProjectData: state.projectStore.savedProjectData,
    authUser: state.authReducer,
    userProjectDetails: state.projectStore.userProjectDetails,
    lookUpData: state.lookUp.lookUpData,
    projectPost: state.projectStore.projectPost,
    freelancerTypes:state.languageReducer.freelancerTypes,
    ProjectPeriod:state.languageReducer.projectPeriod
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
    saveProjectDataRedux: (key, data) => {
      dispatch(saveProjectDataRedux(key, data));
    },
    onGetProjectDetail: (projectId, userId) => {
      dispatch(getUserProjectDetails(projectId, userId));
    },
    addSkill: (skill) => {
      dispatch(actions.projectPost_addSkill(skill));
    },
    removeSkill: (skill) => {
      dispatch(actions.projectPost_removeSkill(skill));
    },
    updateFreelancerType: (freelancerType) => {
      dispatch(actions.projectPost_updateFreelancerType(freelancerType));
    },
    updateFreelancerCount: (freelancerCount) => {
      dispatch(actions.projectPost_updateFreelancerCount(freelancerCount));
    },
    updatePeriod: (period) => {
      dispatch(actions.projectPost_updatePeriod(period));
    },
    updateMaxWeekHours: (maximumWeekHours) => {
      dispatch(actions.projectPost_updateMaxWeekHours(maximumWeekHours));
    },
    updateCurrency: (currency) => {
      dispatch(actions.projectPost_updateCurrency(currency));
    },
    updateAmount: (amount) => {
      dispatch(actions.projectPost_updateAmount(amount));
    },
    updateLifecycleStage: (lifecycleStage) => {
      dispatch(actions.projectPost_updateLifecycleStage(lifecycleStage));
    },
    updateMinimumRequirementField: (field, value) => {
      dispatch(actions.projectPost_updateMinimunRequirementField(field, value));
    },
    updateScreeningQuestions: (screeningQuestions) => {
      dispatch(
        actions.projectPost_updateScreeningQuestions(screeningQuestions)
      );
    },
    updateOfferedMilestone: (milestone) => {
      dispatch(actions.projectPost_updateOfferedMilestones(milestone));
    },
    updateIsCoverLetterRequired: (isCoverLetterRequired) => {
      dispatch(
        actions.projectPost_updateIsCoverLetterRequired(isCoverLetterRequired)
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ProjectPostMileStone);

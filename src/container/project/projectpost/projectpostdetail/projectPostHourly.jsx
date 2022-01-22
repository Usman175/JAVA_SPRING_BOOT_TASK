import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
  saveProjectDataRedux,
} from "../../../../store/action/action";
import { GetAmountPerDay, GetAmountPerHour } from "../../../../utils/currency";
import notifications from "../../../../utils/notifications";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import { getUserProjectDetails } from "../../../../store/middlewares/Project";
import * as actions from "../../../../store/action/Project/projectActions";
import "./projectpostdetail.scss";
import RightTop from "../../../../components/rightbar/rightTop";
import RightBottom from "../../../../components/rightbar/rightBottom";
import DropdownList from "../../../../components/dropdowns/dropdownList";

import Heading from "../../../../components/postProject/heading";
import ProjectLifeCycle from "../projectpostComponents/projectLifeCycle";
import RequirementBlock from "../projectpostComponents/requirementBlock";
import ScreeningQuestion from "../projectpostComponents/screeningQuestion";
import Radio from "../../../../components/radioButton/radio";
import SearchBox from "../../../../components/searchBox";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../../store/constants/constant";
import Label from "../../../../components/postProject/label";
import ProbationPeriod from "../projectpostComponents/probationPeriod";
import SubHeader from "../../../../components/subHeader";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
class ProjectPostHourly extends Component {
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
            teamFreelancer: {
              id: 1,
              freelancerSkill: "",
              fromAmount: "",
              toAmount: "",
              maximumHourPerWeek: "",
              noOfFreelancer: "",
              isAllowOverTracking: false,
              errorMessage: {},
            },
            teamFreelancers: [],
            isSetHourlyRange: true,
            isDontSetHourlyRange: false,
            projectId: new URLSearchParams(this.props.location.search).get(
              "id"
            ),
            projectType: "",
            scopeOfBusiness: "",
            skills: [],
            availableSkills: [],
            skillName: "",
            freelancerType: "",
            freelancerTypes: [],
            noOfFreelancer: "",
            maximumWeekHours: "",
            currency: "",
            currencies: [],
            fromAmount: "",
            toAmount: "",
            isUntilHire: false,
            screeningQuestionId: "",
            screeningQuestion: "",
            screeningQuestions: [],
            project: {},
            errorMessage: {},
            loading: false,
          };
  }

  componentWillMount() {
    this.bindCurrencies();
    this.bindFreelancerTypes();
    this.bindSkills();
  }

  handleBackClick = () => {
    let promise = new Promise((resolve) => {
      resolve(
        this.props.saveProjectDataRedux(this.props.location.pathname, {
          ...this.state,
        })
      );
    });
    promise.then(
      this.props.history.push(
        "/project-post-details?type=back&id=" + this.state.projectId
      )
    );
  };

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
    const { lookUpData, updateCurrency } = this.props;

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
      if (lookUpData.countryCode === "JP") {
        updateCurrency("JPY");
        this.setState({ currency: "JPY" });
      } else if (lookUpData.countryCode === "KR") {
        this.setState({ currency: "KRW" });
        updateCurrency("KRW");
      } else {
        updateCurrency("USD");
        this.setState({ currency: "USD" });
      }
    }
  }

  async bindFreelancerTypes() {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=FreelancerTypes`,
      getOptions({})
    );
    for (let index = 0; index < result.result.data[0].data.length; index++) {
      const element = result.result.data[0].data[index];
      array.push({
        text: element.name,
        value: element.name.toString(),
      });
    }
    !this.props.location?.state?.data &&
      this.setState({
        freelancerType: array.length > 0 ? array[0].value : "",
        freelancerTypes: array,
      });
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

  //#region Skill Methods

  onSkillAdd = (skill) => {
    if (skill && !this.props.projectPost.skills.includes(skill)) {
      this.props.addSkill(skill);
      let error = this.state.errorMessage;
      error.skills = "";
      this.setState({ errorMessage: error });
    }
  };

  onSkillRemove = (skill) => {
    this.props.removeSkill(skill);
  };

  onFreelancerTypeChange = (freelancerType) => {
    this.props.updateFreelancerType(freelancerType);
    let error = this.state.errorMessage;
    error.freelancerType = "";
    this.setState({ errorMessage: error });
  };
  onPositionAvailableDate = (positionAvailableDate) => {
    this.props.updatePositionAvailableDate(positionAvailableDate);
  }
  onFreelancerCountChange = (count) => {
    this.props.updateFreelancerCount(count);
    let error = this.state.errorMessage;
    error.noOfFreelancer = "";
    this.setState({ errorMessage: error });
  };

  onMaximumWeekHoursChange = (selectedhours) => {
    this.props.updateMaxWeekHours(selectedhours);
    let error = this.state.errorMessage;
    error.maximumWeekHours = "";
    this.setState({ errorMessage: error });
  };
  setPerHourAmount = (field, value) => {
    this.props.updatePerHourAmount(field, value);
  };
  //#endregion Skill Methods

  //#region Other Methods

  addClickTeamFreelancer = () => {
    let { languageType } = this.props;
    let formIsValid = true;
    this.state.teamFreelancers.forEach((teamFreelancer) => {
      teamFreelancer.errorMessage["freelancerSkill"] =
        teamFreelancer.errorMessage["fromAmount"] =
        teamFreelancer.errorMessage["toAmount"] =
        teamFreelancer.errorMessage["maximumHourPerWeek"] =
        teamFreelancer.errorMessage["noOfFreelancer"] =
          null;

      if (
        teamFreelancer.freelancerSkill === "" ||
        teamFreelancer.freelancerSkill === null ||
        teamFreelancer.freelancerSkill === undefined
      ) {
        formIsValid = false;
        teamFreelancer.errorMessage["freelancerSkill"] =
          languageType.REQUIRED_MESSAGE;
      } else if (
        teamFreelancer.fromAmount === 0 ||
        teamFreelancer.fromAmount === "0" ||
        teamFreelancer.fromAmount === "" ||
        teamFreelancer.fromAmount === null ||
        teamFreelancer.fromAmount === undefined
      ) {
        formIsValid = false;
        teamFreelancer.errorMessage["fromAmount"] =
          languageType.REQUIRED_MESSAGE;
      } else if (
        teamFreelancer.toAmount === 0 ||
        teamFreelancer.toAmount === "0" ||
        teamFreelancer.toAmount === "" ||
        teamFreelancer.toAmount === null ||
        teamFreelancer.toAmount === undefined
      ) {
        formIsValid = false;
        teamFreelancer.errorMessage["toAmount"] = languageType.REQUIRED_MESSAGE;
      } else if (
        teamFreelancer.maximumHourPerWeek === 0 ||
        teamFreelancer.maximumHourPerWeek === "0" ||
        teamFreelancer.maximumHourPerWeek === "" ||
        teamFreelancer.maximumHourPerWeek === null ||
        teamFreelancer.maximumHourPerWeek === undefined
      ) {
        formIsValid = false;
        teamFreelancer.errorMessage["maximumHourPerWeek"] =
          languageType.REQUIRED_MESSAGE;
      } else if (teamFreelancer.maximumHourPerWeek > 7 * 24) {
        formIsValid = false;
        teamFreelancer.errorMessage["maximumHourPerWeek"] =
          languageType.VALID_MESSAGE;
      } else if (
        parseFloat(teamFreelancer.toAmount) <=
        parseFloat(teamFreelancer.fromAmount)
      ) {
        formIsValid = false;
        teamFreelancer.errorMessage["toAmount"] =
          "ToAmount should be greater then FromAmount";
      }
    });
    let array = this.state.teamFreelancers;
    if (formIsValid) {
      const maxid = Math.max(
        ...this.state.teamFreelancers.map((item) => item.id)
      );
      array.push({
        id: maxid + 1,
        freelancerSkill: "",
        fromAmount: "",
        toAmount: "",
        maximumHourPerWeek: "",
        noOfFreelancer: "",
        isAllowOverTracking: false,
        errorMessage: {},
      });
      this.setState({ teamFreelancers: array });
    } else {
      this.setState({ teamFreelancers: array });
      return;
    }
  };

  removeClickTeamFreelancer = (index) => {
    let array = this.state.teamFreelancers;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ teamFreelancers: array });
    }
  };

  onLifecycleStageChange = (stage) => {
    this.props.updateLifecycleStage(stage);
  };

  onQuestionsChange = (questions) => {
    this.props.updateScreeningQuestions(questions);
  };

  onMinimumRequirementSectionActive = () => {
    let { isMinimumRequirementSectionActive } = this.state;
    this.setState({
      isMinimumRequirementSectionActive: !isMinimumRequirementSectionActive,
    });
  };

  onSkillValueChange = (event) => {
    let value = event.target.value;
    this.setState({
      skillName: value,
    });
  };

  onDontSetHourlyRangeChanged(e) {
    this.setState({
      isDontSetHourlyRange: true,
    });
    this.setState({
      isSetHourlyRange: false,
    });

    this.setPerHourAmount("fromAmount", "");
    this.setPerHourAmount("toAmount", "");
  }

  onSetHourlyRangeChanged(e) {
    this.setState({
      isSetHourlyRange: true,
    });
    this.setState({
      isDontSetHourlyRange: false,
    });
  }

  onIsCoverLetterRequiredChange = (event) => {
    this.props.updateIsCoverLetterRequired(event.target.value !== "true");
  };
  //#endregion Other Methods

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
      currency,
      fromAmount,
      toAmount,
      positionAvailableDate
    } = this.props.projectPost;

    if (skills.length <= 0) {
      formIsValid = false;
      errorMessage["skills"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "200",
        behavior: "smooth",
      });
    } else if (!freelancerType) {
      formIsValid = false;
      errorMessage["freelancerType"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "200",
        behavior: "smooth",
      });
    } else if (!maximumWeekHours && !this.state.isDontSetHourlyRange) {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "200",
        behavior: "smooth",
      });
    } else if (
      !this.state.isDontSetHourlyRange &&
      maximumWeekHours > 7 * 24 &&
      freelancerType !== "Headhunter"
    ) {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.VALID_MESSAGE;
      window.scrollTo({
        top: "250",
        behavior: "smooth",
      });
    } else if (
      (!currency || currency === "") &&
      freelancerType !== "Team" &&
      !this.state.isDontSetHourlyRange
    ) {
      formIsValid = false;
      errorMessage["currency"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "300",
        behavior: "smooth",
      });
    } else if (
      (!fromAmount ||
        fromAmount === "" ||
        fromAmount === "0" ||
        fromAmount === 0 ||
        fromAmount < 5) &&
      freelancerType !== "Team" &&
      !this.state.isDontSetHourlyRange
    ) {
      formIsValid = false;
      errorMessage["fromAmount"] =
        this.state.fromAmount < 5
          ? "From Amount should be greater or equal to 5$"
          : languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "300",
        behavior: "smooth",
      });
    } else if (
      (!toAmount || toAmount === "" || toAmount === "0" || toAmount === 0) &&
      freelancerType !== "Team" &&
      !this.state.isDontSetHourlyRange
    ) {
      formIsValid = false;
      errorMessage["toAmount"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "300",
        behavior: "smooth",
      });
    } else if (
      freelancerType !== "Team" &&
      !this.state.isDontSetHourlyRange &&
      parseFloat(toAmount) <= parseFloat(fromAmount)
    ) {
      formIsValid = false;
      errorMessage["toAmount"] = "To amount should be greater than from amount";
      window.scrollTo({
        top: "300",
        behavior: "smooth",
      });
    }    else if (!positionAvailableDate && !this.state.isUntilHire) {
      formIsValid = false;
      errorMessage["positionAvailableDate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top:'250',
        behavior:'smooth'
      })
    }
    /* console.log(errorMessage,"errorMessage") */
    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  handleMinimumRequirementChange = (field, value) => {
    this.props.updateMinimumRequirementField(field, value);
  };

  handleChange(fieldData, e, value) {
    let errorMessage = {};
    if (fieldData === "freelancerType")
      this.state.freelancerType = value || e.target.value;
    else if (fieldData === "noOfFreelancer")
      this.state.noOfFreelancer = value || e.target.value;
    else if (fieldData === "maximumWeekHours")
      this.state.maximumWeekHours = value || e.target.value;
      else if (fieldData === "isUntilHire")
      this.state.isUntilHire = this.state.isUntilHire?false:true;
      else if (fieldData === "currency")
      this.state.currency = value || e.target.value;
    else if (fieldData === "fromAmount") {
      let fromAmount = value || e.target.value;
      if (!fromAmount || fromAmount.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.fromAmount = fromAmount;
      else if (fromAmount === "") this.state.fromAmount = "";
    } else if (fieldData === "toAmount") {
      let toAmount = value || e.target.value;
      if (!toAmount || toAmount.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.toAmount = toAmount;
      else if (toAmount === "") this.state.toAmount = "";
    } else if (fieldData === "screeningQuestion")
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
      this.state.maximumWeekHours !== 0 &&
      this.state.maximumWeekHours !== "" &&
      this.state.maximumWeekHours !== null &&
      this.state.maximumWeekHours !== undefined
    )
      errorMessage["maximumWeekHours"] = null;
    else if (
      this.state.currency !== 0 &&
      this.state.currency !== "" &&
      this.state.currency !== null &&
      this.state.currency !== undefined
    )
      errorMessage["currency"] = null;
    else if (
      this.state.fromAmount !== 0 &&
      this.state.fromAmount !== "" &&
      this.state.fromAmount !== null &&
      this.state.fromAmount !== undefined
    )
      errorMessage["fromAmount"] = null;
    else if (
      this.state.toAmount !== 0 &&
      this.state.toAmount !== "" &&
      this.state.toAmount !== null &&
      this.state.toAmount !== undefined
    )
      errorMessage["toAmount"] = null;

    if (fieldData === "currency") {
      this.props.updateCurrency(value);
    }
    this.setState({ errorMessage: errorMessage });
  }

  handleHourlyDetailChange(teamFreelancer, fieldData, e, value) {
    let errorMessage = {};
    if (fieldData === "freelancerSkill")
      teamFreelancer.freelancerSkill = value || e.target.value;
    else if (fieldData === "fromAmount") {
      let fromAmount = value || e.target.value;
      if (!fromAmount || fromAmount.match(/^\d{1,}(\.\d{0,2})?$/))
        teamFreelancer.fromAmount = fromAmount;
      else if (fromAmount === "") teamFreelancer.fromAmount = "";
    } else if (fieldData === "toAmount") {
      let toAmount = value || e.target.value;
      if (!toAmount || toAmount.match(/^\d{1,}(\.\d{0,2})?$/))
        teamFreelancer.toAmount = toAmount;
      else if (toAmount === "") teamFreelancer.toAmount = "";
    } else if (fieldData === "maximumHourPerWeek") {
      let maximumHourPerWeek = value || e.target.value;
      if (!maximumHourPerWeek || maximumHourPerWeek.match(/^[0-9\b]+$/))
        teamFreelancer.maximumHourPerWeek = maximumHourPerWeek;
      else if (maximumHourPerWeek === "")
        teamFreelancer.maximumHourPerWeek = "";
    } else if (fieldData === "noOfFreelancer")
      teamFreelancer.noOfFreelancer = value || e.target.value;
    else if (fieldData === "isAllowOverTracking")
      teamFreelancer.isAllowOverTracking = value || e.target.value;

    if (
      teamFreelancer.freelancerSkill !== "" &&
      teamFreelancer.freelancerSkill !== null &&
      teamFreelancer.freelancerSkill !== undefined
    )
      teamFreelancer.errorMessage["freelancerSkill"] = null;
    else if (
      teamFreelancer.fromAmount !== 0 &&
      teamFreelancer.fromAmount !== "" &&
      teamFreelancer.fromAmount !== null &&
      teamFreelancer.fromAmount !== undefined
    )
      teamFreelancer.errorMessage["fromAmount"] = null;
    else if (
      teamFreelancer.toAmount !== 0 &&
      teamFreelancer.toAmount !== "" &&
      teamFreelancer.toAmount !== null &&
      teamFreelancer.toAmount !== undefined
    )
      teamFreelancer.errorMessage["toAmount"] = null;
    else if (
      teamFreelancer.maximumHourPerWeek !== 0 &&
      teamFreelancer.maximumHourPerWeek !== "" &&
      teamFreelancer.maximumHourPerWeek !== null &&
      teamFreelancer.maximumHourPerWeek !== undefined
    )
      teamFreelancer.errorMessage["maximumHourPerWeek"] = null;
    else if (
      teamFreelancer.noOfFreelancer !== 0 &&
      teamFreelancer.noOfFreelancer !== "" &&
      teamFreelancer.noOfFreelancer !== null &&
      teamFreelancer.noOfFreelancer !== undefined
    )
      teamFreelancer.errorMessage["noOfFreelancer"] = null;

    this.setState({ errorMessage: errorMessage });
  }

  onFormSubmitHandle = (event) => {
    event.preventDefault();
  };

  //#endregion Validation Methods

  //#region Submit Method

  onPageRedirectHandle = async () => {
    if (this.handleValidation()) {
      this.setState({ loading: true });
      const {
        skills,
        freelancerType,
        freelancerCount,
        maximumWeekHours,
        lifecycleStage,
        minimumRequirement,
        isCoverLetterRequired,
        screeningQuestions,
        fromAmount,
        toAmount,
        currency,
        projectType,
        probationPeriod,
        positionAvailableDate
      } = this.props.projectPost;
      const { languageType } = this.props;
      let param = {
        projectId: this.state.projectId,
        skills: skills.join(","),

        // new
        projectType: projectType || this.state.projectType,
        projectStatus: "",
        expectedCompletionDays: probationPeriod.projectPeriod,
        projectAmount: "",
        lifeCycleStage: `${lifecycleStage}`,
        salaryType: "",
        amountPerHour: "",
        hourlyDetails: "",
        noOfDayAttendance: "",
        positionAvailableDate:!this.state.isUntilHire? positionAvailableDate:'',
        isUntilHire: this.state.isUntilHire,
        isAvailableForBidding: true,
        lastCompletedStep: "",
        probationPeriod: probationPeriod.probationPeriod,
        // isApplyProbation:probationPeriod.isApply,
        //

        freelancerType: freelancerType,
        noOfRequiredFreelancer: freelancerCount,

        maximumWeekHours: maximumWeekHours,

        currencyCode: currency,
        fromAmount,
        toAmount,
        fromSalary: freelancerType !== "Team" ? fromAmount : "",
        toSalary: freelancerType !== "Team" ? toAmount : "",
        hourlyDetails:
          freelancerType === "Team" || freelancerType === "Company"
            ? JSON.stringify(this.state.teamFreelancers)
            : "",
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
      // let result = await request(
      //   ENDPOINT["UpdateHourlyProjectStep3"],
      //   postOptions(param)
      // );

      let result = await request(
        ENDPOINT["UpdateProjectThirdStep"],
        postOptions(param)
      );
      this.setState({ loading: false });
      if (result.success) {
        let redirectTo = "/confirm-project?id=" + this.state.projectId;
        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
        this.props.saveProjectDataRedux(this.props.location.pathname, {});
      } else notifications.showError(result.message);
    } else {
      return;
    }
  };

  //#endregion Submit Method

  //#region Screenig Question

  onAddScreeningQuestions(question) {
    let array = [];
    if (question === "" || question === null || question === undefined) {
      notifications.showWarning("Please add question.");
      return;
    } else {
      array = this.state.screeningQuestions;
      array.push({
        questionId: v4(),
        question: question,
      });
      this.setState({
        screeningQuestions: array,
        screeningQuestion: "",
      });
    }
  }

  onEditScreeningQuestion(questionId, question) {
    if (questionId === "" || questionId === null || questionId === undefined) {
      notifications.showWarning("Please add question.");
      return;
    } else if (question === "" || question === null || question === undefined) {
      notifications.showWarning("Please add question.");
      return;
    } else {
      let array = this.state.screeningQuestions;
      array.map((element, id) => {
        if (element.questionId === questionId) {
          element.question = question;
        }
      });
      this.setState({
        screeningQuestions: array,
        screeningQuestionId: "",
        screeningQuestion: "",
      });
    }
  }

  renderStars = (number = 0) => {
    let container = [];
    for (let i = 0; i < number; i++)
      container.push(
        <i
          className="fa fa-star"
          style={{ color: "green" }}
          aria-hidden="true"
        />
      );
    return container;
  };
  //#endregion Screening Question

  componentDidMount() {
    this.findProjectIfExist();
  }
  // get detail of if existing set in props
  async findProjectIfExist() {
    let { languageType } = this.props;
    let projectId = new URLSearchParams(this.props.location.search).get("id");
    if (projectId && !this.props.projectPost.projectType) {
      let result = await request(
        `${ENDPOINT["GetProject"]}?projectId=${projectId}`,
        getOptions({})
      );
      if (result.success) {
        console.log(result, "result");
        this.setState({ projectType: result.result.projectType });
        let skills = result.result.skills.split(",");
        skills.length > 0 &&
          skills.map((skill) => {
            if (skill) {
              this.props.addSkill(skill);
            }
          });
        this.props.updateFreelancerType(result.result.freelancerType);
        this.props.updateMaxWeekHours(result.result.maximumWeekHours);
        this.props.updateCurrency(result.result.currencyCode);
        this.setState({isUntilHire:result.result.isUntilHire})
        if(result.result.positionAvailableDate){
         this.props.updatePositionAvailableDate(result.result.positionAvailableDate);
        }
        this.props.projectPost_updateProbationPeriod(
          "projectPeriod",
          result.result.expectedCompletionDays
        );
        if (
          result.result.probationPeriod &&
          result.result.probationPeriod != " "
        ) {
          this.props.projectPost_updateProbationPeriod(
            "probationPeriod",
            result.result.probationPeriod
          );
        }
        if (
          result.result.fromSalary &&
          result.result.fromSalary != " " &&
          result.result.toSalary &&
          result.result.toSalary != " "
        ) {
          this.props.updatePerHourAmount(
            "fromAmount",
            result.result.fromSalary
          );
          this.props.updatePerHourAmount("toAmount", result.result.toSalary);
          this.setState({
            isDontSetHourlyRange: false,
            isSetHourlyRange: true,
          });
        } else {
        }
        /* isDontSetHourlyRange */
        this.props.projectPost_updateProbationPeriod("isApply", "yes");
        this.props.updateFreelancerCount(result.result.noOfRequiredFreelancer);
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

        let screeningQuestions = [];
        let questions = JSON.parse(result.result.screeningQuestions);
        questions.map((Question) => {
          screeningQuestions.push({
            question: Question,
            id: v4(),
          });
        });
        this.props.updateScreeningQuestions(screeningQuestions);

        /*            this.props.updateMaxWeekHours(result.result.maximumWeekHours); */
      }
    }
  }
  render() {
    let { currency } = this.state;
    let { languageType, projectPost, freelancerTypes } = this.props;
    // debugger;
    // console.log(projectPost,"projectPost")
    return (
      <>
           <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-xl-2 col-12 col-md-0 col-lg-1"></div>
              <div className="col-xl-8 col-12 col-md-12 col-lg-10">
                <div className="project_post milestone_form post_milston hourly_form">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                    >
                      <Heading
                        heading={languageType.PROJECT_POST_HOURLY}
                        icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/projectFreeContract.svg"}
                        color="#333333"
                        fontSize="26px"
                        fontWeight="600"
                        fontFamily="Raleway"
                      />
                      <form
                        className="post_form"
                        onSubmit={this.onFormSubmitHandle}
                      >
                        <div className="contest_bodr">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <Label
                                  title={languageType.ADD_REQUIRED_SKILLS}
                                  compulsory={true}
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
                                {/* <DropdownList
                                  id="skills"
                                  name="skills"
                                  placeholder="Add Requird Skills"
                                  value={this.state.availableSkills}
                                  items={this.state.availableSkills}
                                  selectItem={this.onSkillAdd}
                                  enableAutoCompleteSearch
                                /> */}
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
                              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                              color="#333333"
                              width="16px"
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
                                    onClick={() => this.onSkillRemove(skill)}
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
                            <div className="col-md-6 col-lg-5">
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
                                  selectItem={this.onFreelancerTypeChange}
                                />
                                <span className="error">
                                  {this.state.errorMessage["freelancerType"]}
                                </span>
                              </div>
                            </div>

                            <div
                              className="col-md-6 col-lg-5"
                              hidden={
                                projectPost.freelancerType === "Individual"
                              }
                            >
                              {projectPost.freelancerType != "Headhunter" && (
                                <div className="form-group">
                                  <Label
                                    title={languageType.NO_OF_FREELANCER}
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
                                  <div className="">
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
                                      selectItem={this.onFreelancerCountChange}
                                    />
                                  </div>
                                  <span className="error">
                                    {this.state.errorMessage["noOfFreelancer"]}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="row align-items-center custom-row-margin-post-project1">
                            <div
                              className="col-lg-5 col-md-6"
                              hidden={this.state.freelancerType === "Team"}
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
                                  icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                                  color="#333333"
                                  width="28px"
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
                                {/* <div className="d-flex align-items-center">
                                  <input type="text" className="form-control" placeholder={languageType.MAX_WEEKLY_LIMIT} maxLength="3"
                                    value={projectPost.maximumWeekHours}
                                    onChange={this.onMaximumWeekHoursChange}
                                  />
                                  <div style={{paddingLeft: "10px"}}>{this.state.maximumWeekHours} Hours Per Week</div>
                                </div> */}
                                <div
                                  style={{ paddingLeft: "5px", color: "grey" }}
                                >
                                  {projectPost.maximumWeekHours} Hours Per Week
                                </div>
                                {this.state.errorMessage.maximumWeekHours && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.maximumWeekHours}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div
                              className="col-lg-5 col-md-6"
                              hidden={this.state.freelancerType !== "Team"}
                            >
                              <div className="form-group">
                                <Label
                                  title={languageType.CURRENCY}
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
                                
                                ></Label>
                                <DropdownList
                                  id="currency"
                                  name="currency"
                                  enableAutoCompleteSearch
                                  placeholder="Select currency"
                                  value={
                                    this.state.currency || projectPost.currency
                                  }
                                  selectItem={(value) => {
                                    this.handleChange("currency", null, value);
                                  }}
                                  items={this.state.currencies}
                                />
                                {this.state.errorMessage.currency && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.currency}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className="row align-items-center"
                            hidden={this.state.freelancerType === "Team"}
                          >
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>{languageType.HOURLY_RATE}</label>
                                <br />
                                <Radio
                                  handleSelect={(e) => {
                                    this.onSetHourlyRangeChanged(e);
                                  }}
                                  name="hourly-option"
                                  id="s-option-hourly"
                                  value={this.state.isSetHourlyRange}
                                  checked={this.state.isSetHourlyRange}
                                  label={languageType.SET_HOURLY_RANGE}
                                  compulsory={false}
                                  disableCustomControl={true}
                                />{" "}
                                <div hidden={this.state.isDontSetHourlyRange}>
                                  <div className="d-flex align-items-center currecyList_hourlyProjet">
                                    <div className="">
                                      <DropdownList
                                        id="currency"
                                        name="currency"
                                        enableAutoCompleteSearch
                                        placeholder="Select currency"
                                        className="selectCurrency_projectHourly"
                                        value={
                                          this.state.currency ||
                                          projectPost.currency
                                        } 
                                        selectItem={(value) => {
                                          this.handleChange(
                                            "currency",
                                            null,
                                            value
                                          );
                                          this.setPerHourAmount(
                                            "currency",
                                            value
                                          );
                                        }}
                                        items={this.state.currencies}
                                      />
                                      {this.state.errorMessage.currency && (
                                        <p className="text-danger">
                                          {this.state.errorMessage.currency}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      style={{
                                        marginTop: this.state.errorMessage
                                          .fromAmount
                                          ? "14px"
                                          : "0px", 
                                      }}
                                      className="secondForm_currencyHourly"
                                    >
                                      {/* <input
                                        type="number"
                                        className="form-control mr-1"
                                        placeholder={languageType.FROM_AMOUNT}
                                        value={projectPost.fromAmount}
                                        style={{ height: 38, width: 159 }}
                                        onChange={(e) => {
                                          this.handleChange("fromAmount", e);
                                          this.setPerHourAmount(
                                            "fromAmount",
                                            e.target.value
                                          );
                                        }}
                                      /> */}
                                      <div className="hourlyInput_hourlyProject">
                                        <DropdownList
                                          id="fromAmount"
                                          name="fromAmount"
                                          enableAutoCompleteSearch
                                          placeholder="From Amount"
                                          value={projectPost.fromAmount}
                                          selectItem={(value) => {
                                            let e = {
                                              target: { value: value },
                                            };
                                            this.handleChange("fromAmount", e);
                                            this.setPerHourAmount(
                                              "fromAmount",
                                              value
                                            );
                                          }}
                                          items={
                                            projectPost.currency
                                              ? GetAmountPerHour(
                                                  projectPost.currency
                                                )
                                              : []
                                          }
                                        /> 
                                        {/* {console.log(GetAmountPerHour("USD"), "GetAmountPerHour")} */}
                                      </div>
                                      {this.state.errorMessage.fromAmount && (
                                        <p className="text-danger">
                                          {this.state.errorMessage.fromAmount}
                                        </p>
                                      )}
                                    </div>{" "}
                                    <b className="WeeklyHour_converterHr_mobtab">{languageType.HOUR_TO}</b>
                                    <div
                                      style={{
                                        marginTop: this.state.errorMessage
                                          .toAmount
                                          ? "14px"
                                          : "0px",
                                      }}
                                    >
                                      {/* <input
                                        type="number"
                                        className="form-control ml-1"
                                        placeholder={languageType.TO_AMOUNT}
                                        value={projectPost.toAmount}
                                        style={{ height: 38, width: 159 }}
                                        onChange={(e) => {
                                          this.handleChange("toAmount", e);
                                          this.setPerHourAmount(
                                            "toAmount",
                                            e.target.value
                                          );
                                        }}
                                      /> */}
                                      <div className="hourlyInput_hourlyProject">
                                        <DropdownList
                                          id="toAmount"
                                          name="toAmount"
                                          enableAutoCompleteSearch
                                          placeholder="To Amount"
                                          value={projectPost.toAmount}
                                          selectItem={(value) => {
                                            let e = {
                                              target: { value: value },
                                            };
                                            this.handleChange("toAmount", e);
                                            this.setPerHourAmount(
                                              "toAmount",
                                              value
                                            );
                                          }} 
                                          items={
                                            projectPost.currency
                                              ? GetAmountPerHour(
                                                  projectPost.currency
                                                ).filter( (item)=> Number(item.value) > Number(projectPost.fromAmount) )
                                              : []
                                          }
                                          disabled={
                                            !projectPost.fromAmount
                                          }
                                        />
                                      </div>
                                      {this.state.errorMessage.toAmount && (
                                        <p className="text-danger">
                                          {this.state.errorMessage.toAmount}
                                        </p>
                                      )}
                                    </div>{" "}
                                    <b className="pl-2">
                                      {languageType.SLASH_HOUR}
                                    </b>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="row align-items-center"
                            hidden={this.state.freelancerType === "Team"}
                          >
                            <div className="col-md-12">
                              <div className="form-group">
                                <Radio
                                  handleSelect={(e) => {
                                    this.onDontSetHourlyRangeChanged(e);
                                  }}
                                  name="hourly-option"
                                  id="s-option-hourly"
                                  value={this.state.isDontSetHourlyRange}
                                  checked={this.state.isDontSetHourlyRange}
                                  label={languageType.DONT_ADD_HOURLY_RANGE}
                                  compulsory={false}
                                  disableCustomControl={true}
                                />
                              </div>
                            </div>
                          </div>

                          <ProbationPeriod {...this.props} />
                          <div className="row align-tems-center">
                            <div className="col-md-12">
                              <div className="form-group">
                                <div
                                  style={{ color: "#4172B1" }}
                                  hidden={
                                    this.state.isDontSetHourlyRange == false
                                  }
                                >
                                  {languageType.SET_HOURLY_BETTER}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div hidden={projectPost.freelancerType !== "Team"}>
                          {this.state.teamFreelancers.map(
                            (teamFreelancer, index) => (
                              <div key={index} className="col-lg-12 col-md-12">
                                <div className="row align-items-center">
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>{languageType.SKILLS_TEXT}</label>
                                      <div className="">
                                        <DropdownList
                                          id="freelancerSkill"
                                          name="freelancerSkill"
                                          enableAutoCompleteSearch
                                          value={teamFreelancer.freelancerSkill}
                                          selectItem={(value) => {
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "freelancerSkill",
                                              null,
                                              value
                                            );
                                          }}
                                          items={this.state.skills}
                                        />
                                        {teamFreelancer.errorMessage
                                          .freelancerSkill && (
                                          <p className="text-danger">
                                            {
                                              teamFreelancer.errorMessage
                                                .freelancerSkill
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>{languageType.FROM_AMOUNT}</label>
                                      <div className="">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={languageType.FROM_AMOUNT}
                                          maxLength="10"
                                          value={teamFreelancer.fromAmount}
                                          onChange={(e) =>
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "fromAmount",
                                              e
                                            )
                                          }
                                        />
                                        {teamFreelancer.errorMessage
                                          .fromAmount && (
                                          <p className="text-danger">
                                            {
                                              teamFreelancer.errorMessage
                                                .fromAmount
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>To Amount</label>
                                      <div className="">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="To Amount"
                                          maxLength="10"
                                          value={teamFreelancer.toAmount}
                                          onChange={(e) =>
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "toAmount",
                                              e
                                            )
                                          }
                                        />
                                        {teamFreelancer.errorMessage
                                          .toAmount && (
                                          <p className="text-danger">
                                            {
                                              teamFreelancer.errorMessage
                                                .toAmount
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Maximum Week hours</label>
                                      <div className="">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Maximum Week Hours"
                                          maxLength="3"
                                          value={
                                            teamFreelancer.maximumHourPerWeek
                                          }
                                          onChange={(e) =>
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "maximumHourPerWeek",
                                              e
                                            )
                                          }
                                        />
                                        {teamFreelancer.errorMessage
                                          .maximumHourPerWeek && (
                                          <p className="text-danger">
                                            {
                                              teamFreelancer.errorMessage
                                                .maximumHourPerWeek
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>No. of Freelancer</label>
                                      <div>
                                        <DropdownList
                                          id="noOfFreelancer"
                                          name="noOfFreelancer"
                                          enableAutoCompleteSearch
                                          value={teamFreelancer.noOfFreelancer}
                                          selectItem={(value) => {
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "noOfFreelancer",
                                              null,
                                              value
                                            );
                                          }}
                                          items={[
                                            { text: "1", value: "1" },
                                            { text: "2", value: "2" },
                                            { text: "3", value: "3" },
                                            { text: "4", value: "4" },
                                            { text: "5", value: "5" },
                                          ]}
                                        />
                                        {teamFreelancer.errorMessage
                                          .noOfFreelancer && (
                                          <p className="text-danger">
                                            {
                                              teamFreelancer.errorMessage
                                                .noOfFreelancer
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Allow Over Tracking</label>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={index}
                                          value={
                                            teamFreelancer.isAllowOverTracking
                                          }
                                          checked={
                                            teamFreelancer.isAllowOverTracking
                                          }
                                          onChange={(e) =>
                                            this.handleHourlyDetailChange(
                                              teamFreelancer,
                                              "isAllowOverTracking",
                                              e
                                            )
                                          }
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor={index}
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                  {this.state.teamFreelancers.length !==
                                    index + 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        this.removeClickTeamFreelancer(index);
                                      }}
                                      className="btn save_btn"
                                    >
                                      {" "}
                                      <i
                                        className="fa fa-minus"
                                        aria-hidden="true"
                                      ></i>{" "}
                                    </button>
                                  )}
                                  {this.state.freelancerType === "Team" &&
                                    this.state.teamFreelancers.length ===
                                      index + 1 && (
                                      <button
                                        type="button"
                                        onClick={this.addClickTeamFreelancer}
                                        className="btn save_btn"
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-plus"
                                          aria-hidden="true"
                                        ></i>{" "}
                                      </button>
                                    )}
                                </div>
                              </div>
                            )
                          )}
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
                        {/* Life Cycle Start*/}
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

                        <ScreeningQuestion
                          questions={projectPost.screeningQuestions}
                          onQuestionsChange={this.onQuestionsChange}
                        />

                        {/* <div className="row align-items-center">
                          <div
                            className="col-md-12"
                            style={{ display: 'contents' }}
                          >
                            <label>
                              The cover letter is not required on this post?
                            </label>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="chkIsCoverLetterRequired"
                                required=""
                                value={projectPost.isCoverLetterRequired}
                                checked={projectPost.isCoverLetterRequired}
                                onChange={e => this.onIsCoverLetterRequiredChange(e)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="chkIsCoverLetterRequired"
                              >
                                &nbsp;&nbsp;
                              </label>
                            </div>
                            <div>
                              If you don't want the freelancers should submit
                              the cover letter on your job post only place their
                              bid and answer the Screening questions then click
                              on the check box.
                            </div>
                          </div>
                        </div> */}

                        <div className="submission-buttons save_cancel">
                        <div
                                type="submit"
                                onClick={this.handleBackClick}
                                className="back-button"
                              >
                                <i className="fa fa-angle-left"></i>
                              </div>
                          <button
                            type="button"
                            className="btn contest-project-post-btn"
                            onClick={() => this.onPageRedirectHandle()}
                          >
                            Next <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrowDirection.svg"} />
                            {this.state.loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
                          </button>
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
    savedProjectData: state.projectStore.savedProjectData,
    userProjectDetails: state.projectStore.userProjectDetails,
    authUser: state.authReducer,
    lookUpData: state.lookUp.lookUpData,
    projectPost: state.projectStore.projectPost,
    freelancerTypes: state.languageReducer.freelancerTypes,
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
    projectPost_updateProbationPeriod: (field, value) => {
      dispatch(actions.projectPost_updateProbationPeriod(field, value));
    },
    updateFreelancerType: (freelancerType) => {
      dispatch(actions.projectPost_updateFreelancerType(freelancerType));
    },
    updateFreelancerCount: (freelancerCount) => {
      dispatch(actions.projectPost_updateFreelancerCount(freelancerCount));
    },
    updateMaxWeekHours: (maximumWeekHours) => {
      dispatch(actions.projectPost_updateMaxWeekHours(maximumWeekHours));
    },
    updateCurrency: (currency) => {
      dispatch(actions.projectPost_updateCurrency(currency));
    },
    updateLifecycleStage: (stage) => {
      dispatch(actions.projectPost_updateLifecycleStage(stage));
    },
    updatePositionAvailableDate: positionAvailableDate => {
      dispatch(actions.projectPost_updatePositionAvailableDate(positionAvailableDate));
    },
    updatePerHourAmount: (field, value) => {
      dispatch(actions.projectPost_updatePerHourAmount(field, value));
    },
    updateMinimumRequirementField: (field, value) => {
      dispatch(actions.projectPost_updateMinimunRequirementField(field, value));
    },
    updateScreeningQuestions: (screeningQuestions) => {
      dispatch(
        actions.projectPost_updateScreeningQuestions(screeningQuestions)
      );
    },
    updateIsCoverLetterRequired: (isCoverLetterRequired) => {
      dispatch(
        actions.projectPost_updateIsCoverLetterRequired(isCoverLetterRequired)
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ProjectPostHourly);

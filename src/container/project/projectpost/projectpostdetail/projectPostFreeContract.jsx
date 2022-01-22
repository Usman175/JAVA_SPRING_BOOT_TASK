import { slice, toInteger } from "lodash-es";
import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import Heading from "../../../../components/postProject/heading";
import Label from "../../../../components/postProject/label";
import Radio from "../../../../components/radioButton/radio";
import { GetAmountPerDay, GetAmountPerHour } from "../../../../utils/currency";
import {
  onReduxProjectConfirmationDataHandle,
  onReduxRouteChange,
} from "../../../../store/action/action";
import SearchBox from "../../../../components/searchBox";
import * as actions from "../../../../store/action/Project/projectActions";
import { getUserProjectDetails } from "../../../../store/middlewares/Project";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import request from "../../../../utils/request";
import ProjectLifeCycle from "../projectpostComponents/projectLifeCycle";
import RequirementBlock from "../projectpostComponents/requirementBlock";
import ScreeningQuestion from "../projectpostComponents/screeningQuestion";
import "./projectpostdetail.scss";
import FormatDWH from "../../../../components/formatDWH";
import moment from "moment";
import SubHeader from "../../../../components/subHeader";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class ProjectFreeContractOffice extends Component {
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
            availableSkills: [],
            freelancerType: "",
            freelancerTypes: [],
            noOfFreelancer: "",
            currency: "",
            currencies: [],
            fromAmount: "",
            noOfDay: "",
            amountPerDay: "",
            noOfDayHourly: "",
            amountPerHour: "",
            isUntilHire: false,
            isSetHourlyRange: true,
            isDontSetHourlyRange: false,
            errorMessage: {},
            project: {},
            isCoverLetterRequired: true,
            loading: false,
          };
  }

  componentWillMount() {
    this.bindCurrencies();
    this.bindFreelancerTypes();
    this.bindSkills();
  }

  onSkillAdd = (skill) => {
    if (skill) {
      if (!this.props.projectPost.skills.includes(skill)) {
        this.props.addSkill(skill);
        let error = this.state.errorMessage;
        error.skills = "";
        this.setState({ errorMessage: error });
      }
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

  onFreelancerCountChange = (count) => {
    this.props.updateFreelancerCount(count);
    let error = this.state.errorMessage;
    error.noOfFreelancer = "";
    this.setState({ errorMessage: error });
  };

  onCurrencyChange = (currency) => {
    this.props.updateCurrency(currency);
    let error = this.state.errorMessage;
    error.currency = "";
    this.setState({ errorMessage: error });
  };

  onNoOfDayChange = (noOfDay) => {
    this.props.updateNoOfDay(noOfDay);
    let error = this.state.errorMessage;
    error.noOfDay = "";
    this.setState({ errorMessage: error });
  };

  onAmountPerDayChange = (amountPerDay) => {
    this.props.updateAmountPerDay(amountPerDay);
    let error = this.state.errorMessage;
    error.amountPerDay = "";
    this.setState({ errorMessage: error });
  };
  UpdateAmountFreeContract = (value, field) => {
    this.props.UpdateAmountFreeContract(field, value);
    let error = this.state.errorMessage;
    error.minHourlyRate = "";
    error.maxHourlyRate = "";
    error.minDailyRate = "";
    error.maxDailyRate = "";
    this.setState({ errorMessage: error });
  };

  onPositionAvailableDateChange = (date) => {
    this.props.updatePositionAvailableDate(date);
  };

  //#region Bind Methods

  onDontSetHourlyRangeChanged(e) {
    this.setState({
      isDontSetHourlyRange: true,
    });
    this.setState({
      isSetHourlyRange: false,
    });
    this.UpdateAmountFreeContract("", "maxHourlyRate");
    this.UpdateAmountFreeContract("", "minHourlyRate");
    this.UpdateAmountFreeContract("", "maximumWeekHours");
  }

  onSetHourlyRangeChanged(e) {
    this.setState({
      isSetHourlyRange: true,
    });
    this.setState({
      isDontSetHourlyRange: false,
    });
  }

  bindProjectDetails() {
    if (
      this.props.userProjectDetails.skills !== "" &&
      this.props.userProjectDetails.skills !== " "
    ) {
      this.state.skills = [];
      let skillList = this.props.userProjectDetails.skills.split(",");
      for (let i = 0; i < skillList.length; i++) {
        this.state.skillName = skillList[i];
        this.state.skills.push({ id: v4(), name: this.state.skillName });
        this.setState({
          skills: this.state.skills,
          skillName: "",
        });
      }
    }

    this.setState({
      freelancerType:
        this.props.userProjectDetails.freelancerType !== null &&
        this.props.userProjectDetails.freelancerType !== ""
          ? this.props.userProjectDetails.freelancerType
          : this.state.freelancerType,
    });
    this.setState({
      noOfFreelancer: this.props.userProjectDetails.noOfRequiredFreelancer,
    });
    this.setState({ currency: this.props.userProjectDetails.currencyCode });
    this.setState({ noOfDay: this.props.userProjectDetails.noOfDay });
    this.setState({ amountPerDay: this.props.userProjectDetails.amountPerDay });
    this.setState({
      noOfDayHourly: this.props.userProjectDetails.noOfDayHourly,
    });
    this.setState({
      amountPerHour: this.props.userProjectDetails.amountPerHour,
    });
    this.setState({ isUntilHire: this.props.userProjectDetails.isUntilHire });

    if (
      this.props.userProjectDetails.screeningQuestions !== "" &&
      this.props.userProjectDetails.screeningQuestions !== null &&
      this.props.userProjectDetails.screeningQuestions !== undefined
    ) {
      let screeningQuestions = JSON.parse(
        this.props.userProjectDetails.screeningQuestions
      );
      this.setState({ screeningQuestions: screeningQuestions });
    }

    this.isCoverLetterRequired =
      this.props.userProjectDetails.isCoverLetterRequired;
  }

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
    console.log("look", lookUpData);
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
    this.setState({
      ...(!this.props.location?.state?.data
        ? { freelancerType: array.length > 0 ? array[0].value : "" }
        : null),
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

  //#region Validation Methods

  handleValidation() {
    // debugger;
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;
    const {
      skills,
      freelancerType,
      currency,
      noOfDay,
      maximumWeekHours,
      toAmount,
      minDailyRate,
      maxDailyRate,
      minHourlyRate,
      maxHourlyRate,
      positionAvailableDate,
    } = this.props.projectPost;
    const { isDontSetHourlyRange, isUntilHire } = this.state;

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
        top: "230",
        behavior: "smooth",
      });
    } else if (!currency) {
      formIsValid = false;
      errorMessage["currency"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (!maximumWeekHours && !this.state.isDontSetHourlyRange) {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "250",
        behavior: "smooth",
      });
    } else if (
      !this.state.isDontSetHourlyRange &&
      maximumWeekHours > 7 * 24 &&
      freelancerType !== "Team"
    ) {
      formIsValid = false;
      errorMessage["maximumWeekHours"] = languageType.VALID_MESSAGE;
      window.scrollTo({
        top: "240",
        behavior: "smooth",
      });
    } else if (!noOfDay) {
      formIsValid = false;
      errorMessage["noOfDay"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (!minDailyRate) {
      formIsValid = false;
      errorMessage["minDailyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (!maxDailyRate) {
      formIsValid = false;
      errorMessage["maxDailyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (!minHourlyRate && !this.state.isDontSetHourlyRange) {
      formIsValid = false;
      errorMessage["minHourlyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (
      minDailyRate &&
      maxDailyRate &&
      toInteger(maxDailyRate) < toInteger(minDailyRate)
    ) {
      formIsValid = false;
      errorMessage["maxDailyRate"] =
        "Maximum hourly rate cannot be lower than minimum rate";
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (!maxHourlyRate && !this.state.isDontSetHourlyRange) {
      formIsValid = false;
      errorMessage["maxHourlyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    } else if (
      !isDontSetHourlyRange &&
      toInteger(maxHourlyRate) < toInteger(minHourlyRate)
    ) {
      formIsValid = false;
      errorMessage[
        "maxHourlyRate"
      ] = `${languageType.MUST_BE_GREATER_THAN} ${languageType.FROM_AMOUNT}`;
    } else if (!isUntilHire && !positionAvailableDate) {
      formIsValid = false;
      errorMessage["positionAvailableDate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "260",
        behavior: "smooth",
      });
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  handleChange(fieldData, e, value) {
    let errorMessage = {};
    // debugger;
    if (fieldData === "noOfDay") {
      let noOfDay = value || e.target.value;
      if (noOfDay && noOfDay.match(/^[0-9\b]+$/)) this.state.noOfDay = noOfDay;
      else if (noOfDay === "") this.state.noOfDay = "";
    } else if (fieldData === "amountPerDay") {
      let amountPerDay = value || e.target.value;
      if (amountPerDay && amountPerDay.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.amountPerDay = amountPerDay;
      else if (amountPerDay === "") this.state.amountPerDay = "";
    } else if (fieldData === "noOfDayHourly") {
      let noOfDayHourly = value || e.target.value;
      if (noOfDayHourly && noOfDayHourly.match(/^[0-9\b]+$/))
        this.state.noOfDayHourly = noOfDayHourly;
      else if (fieldData === "fromAmount") {
        let fromAmount = value || e.target.value;
        if (!fromAmount || fromAmount.match(/^\d{1,}(\.\d{0,2})?$/))
          this.state.fromAmount = fromAmount;
        else if (fromAmount === "") this.state.fromAmount = "";
      } else if (noOfDayHourly === "") this.state.noOfDayHourly = "";
    } else if (fieldData === "amountPerHour") {
      let amountPerHour = value || e.target.value;
      if (amountPerHour && amountPerHour.match(/^\d{1,}(\.\d{0,2})?$/))
        this.state.amountPerHour = amountPerHour;
      else if (amountPerHour === "") this.state.amountPerHour = "";
    } else if (fieldData === "isUntilHire")
      this.state.isUntilHire = this.state.isUntilHire ? false : true;
    else if (fieldData === "screeningQuestion")
      this.state.screeningQuestion = value || e.target.value;
    else if (fieldData === "isCoverLetterRequired")
      this.state.isCoverLetterRequired =
        e.target.value === "true" ? false : true;

    if (
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
      this.state.currency !== 0 &&
      this.state.currency !== "" &&
      this.state.currency !== null &&
      this.state.currency !== undefined
    )
      errorMessage["currency"] = null;
    else if (
      this.state.noOfDay !== 0 &&
      this.state.noOfDay !== "" &&
      this.state.noOfDay !== null &&
      this.state.noOfDay !== undefined
    )
      errorMessage["noOfDay"] = null;
    else if (
      this.state.amountPerDay !== 0 &&
      this.state.amountPerDay !== "" &&
      this.state.amountPerDay !== null &&
      this.state.amountPerDay !== undefined
    )
      errorMessage["amountPerDay"] = null;
    else if (
      this.state.noOfDayHourly !== 0 &&
      this.state.noOfDayHourly !== "" &&
      this.state.noOfDayHourly !== null &&
      this.state.noOfDayHourly !== undefined
    )
      errorMessage["noOfDayHourly"] = null;
    else if (
      this.state.amountPerHour !== 0 &&
      this.state.amountPerHour !== "" &&
      this.state.amountPerHour !== null &&
      this.state.amountPerHour !== undefined
    )
      errorMessage["amountPerHour"] = null;

    this.setState({ errorMessage: errorMessage });
  }

  //#endregion Validation Methods

  //#region Submit Method

  async onPageRedirectHandle() {
    if (this.handleValidation()) {
      this.setState({ loading: true });
      const {
        skills,
        projectType,
        noOfDay,
        fromAmount,
        toAmount,
        freelancerType,
        freelancerCount,
        currency,
        amountPerDay,
        screeningQuestions,
        minHourlyRate,
        maxHourlyRate,
        minDailyRate,
        maxDailyRate,
        maximumWeekHours,
        minimumRequirement,
        lifecycleStage,
        positionAvailableDate,
      } = this.props.projectPost;
      const { languageType } = this.props;
      let param = {
        projectId: this.state.projectId,
        // new params
        projectStatus: "",
        projectType: projectType || this.state.projectType,
        expectedCompletionDays: "",
        projectAmount: "",
        maximumWeekHours,
        fromAmount: "",
        toAmount: "",
        salaryType: "",
        minHourlyRate,
        maxHourlyRate,
        minDailyRate,
        maxDailyRate,
        fromSalary: freelancerType !== "Team" ? fromAmount : "",
        toSalary: freelancerType !== "Team" ? toAmount : "",
        hourlyDetails: "",
        noOfDayAttendance: noOfDay,
        isAvailableForBidding: true,
        lastCompletedStep: "",
        //
        skills: skills.join(","),
        freelancerType,
        noOfRequiredFreelancer: freelancerCount,
        currencyCode: currency,
        amountPerDay,
        amountPerHour: this.state.amountPerHour,
        noOfDayHourly: this.state.noOfDayHourly,
        isUntilHire: this.state.isUntilHire,
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
        positionAvailableDate: !this.state.isUntilHire
          ? positionAvailableDate
          : "",
        isCoverLetterRequired: this.state.isCoverLetterRequired,
        screeningQuestions: JSON.stringify(screeningQuestions),
      };
      // debugger;
      // let result = await request(ENDPOINT['UpdateFreeContractProjectStep3'], postOptions(param));
      let result = await request(
        ENDPOINT["UpdateProjectThirdStep"],
        postOptions(param)
      );
      this.setState({ loading: false });
      if (result.success) {
        let redirectTo = "/confirm-project?id=" + this.state.projectId;
        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
      } else notifications.showError(result.message);
    }
  }

  onLifecycleStageChange = (stage) => {
    this.props.updateLifecycleStage(stage);
  };
  handleMinimumRequirementChange = (field, value) => {
    this.props.updateMinimumRequirementField(field, value);
  };

  //#endregion Submit Method

  onQuestionsChange = (questions) => {
    this.props.updateScreeningQuestions(questions);
  };
  setPerHourAmount = (field, value) => {
    this.props.updatePerHourAmount(field, value);
  };

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
        let skills = result.result.skills?.split(",");
        skills?.length > 0 &&
          skills.map((skill) => {
            if (skill) {
              this.props.addSkill(skill);
            }
          });
        this.props.updateFreelancerType(result.result.freelancerType);
        this.props.updateCurrency(result.result.currencyCode);
        this.UpdateAmountFreeContract(
          result.result.maxHourlyRate,
          "maxHourlyRate"
        );
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
        this.UpdateAmountFreeContract(
          result.result.minHourlyRate,
          "minHourlyRate"
        );
        this.UpdateAmountFreeContract(
          result.result.minDailyRate,
          "minDailyRate"
        );
        this.UpdateAmountFreeContract(
          result.result.maxDailyRate,
          "maxDailyRate"
        );
        this.UpdateAmountFreeContract(
          result.result.maximumWeekHours,
          "maximumWeekHours"
        );
        this.props.updateNoOfDay(result.result.noOfDayAttendance);
        if (result.result.positionAvailableDate) {
          this.props.updatePositionAvailableDate(
            result.result.positionAvailableDate
          );
        }
        this.setState({
          isUntilHire: result.result.isUntilHire,
        });
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

        this.props.updateFreelancerCount(result.result.noOfRequiredFreelancer);
        let screeningQuestions = [];
        let questions = JSON.parse(result.result.screeningQuestions);
        if (questions) {
          questions.map((Question) => {
            screeningQuestions.push(Question);
          });
        }

        this.props.updateScreeningQuestions(screeningQuestions);

        /*            this.props.updateMaxWeekHours(result.result.maximumWeekHours); */
      }
    }
  }
  render() {
    const { skills, skillName, isUntilHire } = this.state;
    const { languageType, projectPost, lookUp, freelancerTypes } = this.props;

    // console.log(this.state.fromAmount, isUntilHire,"isUntilHire")
    // console.log(projectPost,"tretrterter")
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
                        heading={`Post a Project - ${
                          this.state.projectType
                            ? this.state.projectType == "FreeContract"
                              ? "Free Contract"
                              : "Free Contract"
                            : "Free Contract"
                        }`}
                        icon={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/projectFreeContract.svg"
                        }
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
                                <Label
                                  compulsory={true}
                                  prefixBoxValid={
                                    this.state.errorMessage[
                                      languageType.SKILLS_TEXT
                                    ]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage[
                                      languageType.SKILLS_TEXT
                                    ]
                                      ? true
                                      : false
                                  }
                                  title={languageType.ADD_REQUIRED_SKILLS}
                                  icon={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"
                                  }
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
                              icon={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                              }
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
                                    onClick={() => this.onSkillRemove(skill)}
                                  >
                                    &times;
                                  </span>
                                </a>
                              ))}
                            </div>
                            <p className="text-danger">
                              {this.state.errorMessage.skills}
                            </p>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-12">
                              <div
                                className="form-group"
                                style={{ marginLeft: "-5px" }}
                              >
                                {/* {console.log(lookUp, "lookUpData")} */}
                                <Label
                                  title={languageType.OFFICE_ADDRESS}
                                  prefixBoxValid={true}
                                  icon={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/addressIcon.svg"
                                  }
                                  marginLeft="-8px"
                                  width="28px"
                                  color="#333333"
                                ></Label>
                                <div className="address-related-selection-area">
                                  <Radio
                                    handleSelect={(e) => {}}
                                    name="hourly-option12"
                                    id="s-option-hourly12"
                                    checked={
                                      lookUp.defaultAddress.length > 0
                                        ? true
                                        : false
                                    }
                                    label={languageType.USE_REGIST_ADDRESS}
                                    compulsory={false}
                                    disableCustomControl={true}
                                  />
                                  <Radio
                                    handleSelect={(e) => {
                                      this.props.history.push("/myregion");
                                    }}
                                    name="hourly-option12"
                                    id="s-option-hourly122"
                                    checked={false}
                                    label={
                                      languageType.OR_NEW_ADDRESS_DIFFERENT_ADDRESS
                                    }
                                    compulsory={false}
                                    disableCustomControl={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row preferredFreelancer_alignItem"
                            style={{ marginTop: "15px" }}
                          >
                            <div className="col-md-4">
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
                                  icon={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/experience.png"
                                  }
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
                                <p className="text-danger">
                                  {this.state.errorMessage.freelancerType}
                                </p>
                              </div>
                            </div>

                            <div
                              className="col-md-4"
                              hidden={
                                projectPost.freelancerType === "Individual"
                              }
                            >
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
                                <p className="text-danger">
                                  {this.state.errorMessage.noOfFreelancer}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-4">
                              <div className="form-group">
                                <Label
                                  title={languageType.MIN_NO_ATTENDING_DAYS}
                                  prefixBoxValid={
                                    this.state.errorMessage["noOfDay"]
                                      ? false
                                      : true
                                  }
                                  prefixBoxInValid={
                                    this.state.errorMessage["noOfDay"]
                                      ? true
                                      : false
                                  }
                                  icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                                  color="#333333"
                                  width="28px"
                                ></Label>

                                <DropdownList
                                  id="noOfDay"
                                  name="No oF dAYS"
                                  enableAutoCompleteSearch
                                  placeholder="No Of Days"
                                  value={projectPost.noOfDay}
                                  items={slice(this.props.noOfDays, 0, 7)}
                                  selectItem={this.onNoOfDayChange}
                                />
                                <p className="text-danger">
                                  {this.state.errorMessage.noOfDay}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="" style={{ marginTop: "15px" }}>
                            <div className="row align-items-center">
                              <div
                                className="col-12 col-md-4"
                                // style={{ marginTop: "15px" }}
                              >
                                <div className="form-group">
                                  <Label
                                    title={languageType.SELECT_CURRENCY}
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
                                    width="26px"
                                    icon={
                                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/currencyIcon.svg"
                                    }
                                    color="#333333"
                                  ></Label>
                                  <DropdownList
                                    id="currency"
                                    name="currency"
                                    enableAutoCompleteSearch
                                    placeholder={languageType.SELECT_CURRENCY}
                                    value={projectPost.currency}
                                    selectItem={(value) => {
                                      this.handleChange(
                                        "currency",
                                        null,
                                        value
                                      );

                                      this.setPerHourAmount("currency", value);
                                      this.UpdateAmountFreeContract(
                                        "",
                                        "maxHourlyRate"
                                      );
                                      this.UpdateAmountFreeContract(
                                        "",
                                        "minHourlyRate"
                                      );
                                      this.UpdateAmountFreeContract(
                                        "",
                                        "minDailyRate"
                                      );
                                      this.UpdateAmountFreeContract(
                                        "",
                                        "maxDailyRate"
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
                              </div>
                              <div className="col-12 col-md-4">
                                <div className="form-group">
                                  <Label
                                    title={languageType.MIN_AMOUNT_PER_DAY}
                                    compulsory={true}
                                    prefixBoxValid={
                                      this.state.errorMessage["minDailyRate"]
                                        ? false
                                        : true
                                    }
                                    prefixBoxInValid={
                                      this.state.errorMessage["minDailyRate"]
                                        ? true
                                        : false
                                    }
                                    icon="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                                    color="#333333"
                                  ></Label>

                                  <DropdownList
                                    id="minDailyRate"
                                    name="minDailyRate"
                                    placeholder="Amount Per Day"
                                    value={projectPost.minDailyRate}
                                    selectItem={(value) => {
                                      this.UpdateAmountFreeContract(
                                        value,
                                        "minDailyRate"
                                      );
                                    }}
                                    items={
                                      projectPost.currency
                                        ? GetAmountPerDay(projectPost.currency)
                                        : []
                                    }
                                  />

                                  <p className="text-danger">
                                    {this.state.errorMessage.minDailyRate}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 col-md-4">
                                <div className="form-group">
                                  <Label
                                    title={languageType.MAX_AMOUNT_PER_DAY}
                                    compulsory={true}
                                    prefixBoxValid={
                                      this.state.errorMessage["maxDailyRate"]
                                        ? false
                                        : true
                                    }
                                    prefixBoxInValid={
                                      this.state.errorMessage["maxDailyRate"]
                                        ? true
                                        : false
                                    }
                                    icon="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                                    color="#333333"
                                  ></Label>

                                  <DropdownList
                                    id="maxDailyRate"
                                    name="maxDailyRate"
                                    placeholder="Amount Per Day"
                                    value={projectPost.maxDailyRate}
                                    selectItem={(value) => {
                                      this.UpdateAmountFreeContract(
                                        value,
                                        "maxDailyRate"
                                      );
                                    }}
                                    items={
                                      projectPost.currency
                                        ? GetAmountPerDay(
                                          projectPost.currency
                                          ).filter( (item)=> Number(item.value) > Number(projectPost.minDailyRate))
                                        : []
                                    }
                                    disabled={
                                      projectPost.minDailyRate  ? false : true
                                    }
                                  />

                                  <p className="text-danger">
                                    {this.state.errorMessage.maxDailyRate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="" style={{ marginTop: "15px" }}>
                            <div className="row align-items-center">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>{languageType.HOURLY_RATE} </label>
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
                                  />
                                </div>
                              </div>

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
                                  <p style={{ maxWidth: "none" }}>
                                    {
                                      languageType.SET_HOULY_RANGE_INCREASE_FREELANCER
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              hidden={this.state.isDontSetHourlyRange}
                              style={{ marginTop: "10px" }}
                            >
                              <div className="row HourlyRate_changeProjectPost_mobTab">
                                <div
                                  className="col-md-4"
                                  hidden={this.state.freelancerType === "Team"}
                                >
                                  <Label
                                    title={languageType.MAX_WEEKLY_LIMIT}
                                    compulsory={true}
                                    prefixBoxValid={
                                      this.state.errorMessage[
                                        "maximumWeekHours"
                                      ]
                                        ? false
                                        : true
                                    }
                                    prefixBoxInValid={
                                      this.state.errorMessage[
                                        "maximumWeekHours"
                                      ]
                                        ? true
                                        : false
                                    }
                                    icon={
                                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/available_icon.png"
                                    }
                                    color="#333333"
                                  ></Label>

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
                                    selectItem={(value) => {
                                      this.UpdateAmountFreeContract(
                                        value,
                                        "maximumWeekHours"
                                      );
                                    }}
                                  />
                                  {/* <div
                                    style={{
                                      paddingLeft: "5px",
                                      color: "grey",
                                    }}
                                  >
                                    {projectPost.maximumWeekHours}
                                    {languageType.HOURLY_PER_WEEK}
                                  </div> */}
                                  {this.state.errorMessage.maximumWeekHours && (
                                    <p className="text-danger">
                                      {this.state.errorMessage.maximumWeekHours}
                                    </p>
                                  )}
                                </div>
                                <div className="col-12 col-md-8">
                                  <div className="d-flex align-items-center currencySelectionMobile">
                                    <div className="currencyDropDownMobile">
                                      <div
                                        style={{
                                          marginTop: this.state.errorMessage
                                            .fromAmount
                                            ? "14px"
                                            : "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            minWidth: "180px",
                                            marginTop: "5px",
                                          }}
                                          className="currencyDropDownWidth_Mobile"
                                        >
                                          <DropdownList
                                            id="minHourlyRate"
                                            name="minHourlyRate"
                                            placeholder="From Amount"
                                            value={projectPost.minHourlyRate}
                                            selectItem={(value) => {
                                              this.UpdateAmountFreeContract(
                                                value,
                                                "minHourlyRate"
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
                                        </div>
                                        {this.state.errorMessage
                                          .minHourlyRate && (
                                          <p className="text-danger">
                                            {
                                              this.state.errorMessage
                                                .minHourlyRate
                                            }
                                          </p>
                                        )}
                                      </div>{" "}
                                      <b className="WeeklyHour_converterHr_mobtab">
                                        /{" "}
                                        <FormatDWH
                                          hr
                                          currency={projectPost.currency}
                                        />{" "}
                                        {languageType.TO_TEXT}
                                      </b>
                                    </div>
                                    <div className="currencyDropDownMobile">
                                      <div
                                        style={{
                                          marginTop: this.state.errorMessage
                                            .toAmount
                                            ? "14px"
                                            : "0px",
                                        }}
                                      >
                                        <div
                                          className="currencyDropDownWidth_Mobile"
                                          style={{ minWidth: "180px" }}
                                        >
                                          <DropdownList
                                            id="maxHourlyRate"
                                            name="maxHourlyRate"
                                            placeholder={languageType.TO_AMOUNT}
                                            value={projectPost.maxHourlyRate}
                                            selectItem={(value) => {
                                              this.UpdateAmountFreeContract(
                                                value,
                                                "maxHourlyRate"
                                              );
                                            }}
                                            items={
                                              projectPost.currency
                                                ? GetAmountPerHour(
                                                    projectPost.currency
                                                  ).filter( (item)=> Number(item.value) > Number(projectPost.minHourlyRate))
                                                : []
                                            }
                                            disabled={
                                              projectPost.minHourlyRate  ? false : true
                                            }
                                          />
                                        </div>
                                        {this.state.errorMessage
                                          .maxHourlyRate && (
                                          <p className="text-danger">
                                            {
                                              this.state.errorMessage
                                                .maxHourlyRate
                                            }
                                          </p>
                                        )}
                                      </div>{" "}
                                      <b className="pl-1">
                                        / {languageType.PER_HR}
                                      </b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <div className="d-flex">
                                  <Label
                                    title={languageType.POSITION_AVAILABLE}
                                    compulsory={true}
                                    prefixBoxValid={true}
                                    icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
                                    color="#333333"
                                    width="28px"
                                  ></Label>
                                  <div
                                    className="custom-control custom-checkbox UnitHireControlMob"
                                    style={{ width: "120px"}}
                                  >
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
                                    <label
                                      className="custom-control-label"
                                      for="chkIsUntilHire"
                                    >
                                      {" "}
                                      &nbsp;&nbsp;{languageType.UNTIL_HIRE}{" "}
                                    </label>
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
                                    this.onPositionAvailableDateChange(
                                      value
                                    );
                                  }}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                                </MuiPickersUtilsProvider>
                               </div>
                                {/* <input
                                  type="date"
                                  className="form-control"
                                  disabled={this.state.isUntilHire}
                                  value={projectPost.positionAvailableDate}
                                  onChange={(e) => {
                                    this.onPositionAvailableDateChange(
                                      e.target.value
                                    );
                                  }}
                                /> */}
                                {this.state.errorMessage
                                  .positionAvailableDate && (
                                  <p className="text-danger">
                                    {" "}
                                    {
                                      this.state.errorMessage
                                        .positionAvailableDate
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Life Cycle Start*/}
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
                              {languageType.NEXT_DAUM}{" "}
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
                      </form>
                    </div>
                  </div>
                </div>
                <div className="project_blog project_post text-right">
                  <button
                    className="btn black_btn"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/project-blog",
                        search: null,
                        state: {
                          prevUrl: `${this.props.location.pathname}`,
                          search: this.props.location.search,
                          data: this.state,
                        },
                      });
                    }}
                  >
                    {languageType.PROJECT_BLOG_TEXT}
                  </button>
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
    authUser: state.authReducer,
    noOfDays: state.languageReducer.noOfDays,
    freelancerTypes: state.languageReducer.freelancerTypes,
    userProjectDetails: state.projectStore.userProjectDetails,
    lookUpData: state.lookUp.lookUpData,
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
    updateCurrency: (currency) => {
      dispatch(actions.projectPost_updateCurrency(currency));
    },
    updateNoOfDay: (noOfDay) => {
      dispatch(actions.projectPost_updateNoOfDay(noOfDay));
    },
    updateLifecycleStage: (stage) => {
      dispatch(actions.projectPost_updateLifecycleStage(stage));
    },
    updatePerHourAmount: (field, value) => {
      dispatch(actions.projectPost_updatePerHourAmount(field, value));
    },
    updatePositionAvailableDate: (field, value) => {
      dispatch(actions.projectPost_updatePositionAvailableDate(field, value));
    },
    UpdateAmountFreeContract: (field, value) => {
      dispatch(actions.projectPost_UpdateAmountFreeContract(field, value));
    },
    updateMinimumRequirementField: (field, value) => {
      dispatch(actions.projectPost_updateMinimunRequirementField(field, value));
    },
    updateAmountPerDay: (amountPerDay) => {
      dispatch(actions.projectPost_updateAmountPerDay(amountPerDay));
    },
    updateScreeningQuestions: (screeningQuestions) => {
      dispatch(
        actions.projectPost_updateScreeningQuestions(screeningQuestions)
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(ProjectFreeContractOffice);

import React, { Component } from "react";
import DropdownList from "../../components/dropdowns/dropdownList";
import v4 from "uuid";
import { CountryList } from "../../utils/countrylist";
import { isNumeric, isValidString } from "../../utils/validationConfig";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import Heading from "../../components/postProject/heading";
import Label from "../../components/postProject/label";
import Skeleton from "../../components/skeleton/skeleton";
import { connect } from "react-redux";
import SubHeader from "../../components/subHeader";
import { GetSpecificYearsList } from "../../utils/years";
import "./resumePage.scss";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";

// import './documentType.scss'
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../utils/httpConfig";
import "./talentSearch.scss";
class ResumePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certifications: [],
      languageProficiency: [],
      portfolio: [],
      certifications: [],
      educations: [],
      employments: [],
      employmentHistory: [],
      selfIntroduction: "",
      introductionTitle: "",
      languageTests: [],
      wouldLikeToGetJobProposal: false,
      countryList: CountryList,
      country: "",
      errorMessage: {},
      loading: false,
      cities: [],
      countries: [],
      programmingLanguage: [{ id: v4(), language: "", proficiency: "" }],
      isSkeletonLoading: false,
      wishedWorkingConditionCountry: "",
      wishedWorkingConditionCity: "",
      wishedWorkingConditionAreaOfWork: "",
      wishedWorkingConditionFromSalary: "",
      wishedWorkingConditionToSalary: "",
      selectedImg: "", 
    };

    /* hhhhhhhhhhhhhhhh */
    this.state.certifications.push({
      id: v4(),
      yearIssued: "",
      certificate: "",
      level: "",
      issuedBy: "",
    });
    this.state.educations.push({
      id: v4(),
      fromYear: "",
      toYear: "",
      areaOfStudy: "",
      qualification: "",
      shoolName: "",
    });
    this.state.employments.push({
      id: v4(),
      fromYear: "",
      toYear: "",
      company: "",
      department: "",
      dutyOfWork: "",
      status: "",
    });
  }
  onSelectCountry = (country) => {
    this.setState({
      country: country,
    });
  };

  onResumeValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (!isValidString(this.state.selfIntroduction)) {
      formIsValid = false;
      errorMessage["selfIntroduction"] = languageType.REQUIRED_MESSAGE;
      notifications.showWarning("self Introduction is Required ");
    } else if (!isValidString(this.state.introductionTitle)) {
      formIsValid = false;
      errorMessage["introductionTitle"] = languageType.REQUIRED_MESSAGE;
      notifications.showWarning("Introduction Title is Required ");
    } else if (!isValidString(this.state.wishedWorkingConditionCountry)) {
      formIsValid = false;
      errorMessage["wishedWorkingConditionCountry"] =
        languageType.REQUIRED_MESSAGE;
    } else if (!isValidString(this.state.wishedWorkingConditionCity)) {
      formIsValid = false;
      errorMessage["wishedWorkingConditionCity"] =
        languageType.REQUIRED_MESSAGE;
    } else if (!isValidString(this.state.wishedWorkingConditionAreaOfWork)) {
      formIsValid = false;
      errorMessage["wishedWorkingConditionAreaOfWork"] =
        languageType.REQUIRED_MESSAGE;
    } else if (!isValidString(this.state.wishedWorkingConditionFromSalary)) {
      formIsValid = false;
      errorMessage["wishedWorkingConditionFromSalary"] =
        languageType.REQUIRED_MESSAGE;
    } else if (!isValidString(this.state.wishedWorkingConditionToSalary)) {
      formIsValid = false;
      errorMessage["wishedWorkingConditionToSalary"] =
        languageType.REQUIRED_MESSAGE;
    }
    // else if (!isValidString(this.state.programmingLanguage)) {
    //   formIsValid = false;
    //   errorMessage["programmingLanguage"] = languageType.REQUIRED_MESSAGE;
    // }
    // else if (!isValidString(this.state.programmingLanguageLevel)) {
    //   formIsValid = false;
    //   errorMessage["programmingLanguageLevel"] = languageType.REQUIRED_MESSAGE;
    // }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }
  onSubmitProfessionalArea = async () => {
    if (this.onResumeValidation()) {
      let {
        selfIntroduction,
        introductionTitle,
        wishedWorkingConditionCountry,
        wishedWorkingConditionCity,
        wishedWorkingConditionAreaOfWork,
        wishedWorkingConditionFromSalary,
        wishedWorkingConditionToSalary,
      } = this.state;

      /* hhhhhhhhhhhhhhhh */

      this.setState({ loading: true });
      let CertificateArray = [];
      this.state.certifications.map((item) => {
        if (
          (item.yearIssued && item.certificate) ||
          item.level ||
          item.issuedBy
        ) {
          let object = {
            instruction: "",
            type: "Certificate",
            yearStart: item.yearIssued.toString(),
            yearEnd: item.yearIssued.toString(),
            qualification: "",
            studyDepartment: "",
            schoolName: "",
            companyName: "",
            workDepartment: "",
            dutyOfWork: "",
            status: "",
            certificate: item.certificate,
            level: item.level,
            issuedBy: item.issuedBy,
          };
          CertificateArray.push(object);
        }
      });

      let EmploymentArray = [];
      this.state.employments.map((item) => {
        if (
          (item.fromYear && item.toYear && item.company) ||
          item.department ||
          item.dutyOfWork ||
          item.status
        ) {
          let object = {
            instruction: "",
            type: "Employment",
            yearStart: item.fromYear.toString(),
            yearEnd: item.toYear.toString(),
            qualification: "",
            studyDepartment: "",
            schoolName: "",
            companyName: item.company,
            workDepartment: item.department,
            dutyOfWork: item.dutyOfWork,
            status: item.status,
            certificate: "",
            level: "",
            issuedBy: "",
          };
          EmploymentArray.push(object);
        }
      });
      let EducationArray = [];
      this.state.educations.map((item) => {
        if (
          (item.fromYear && item.toYear) ||
          item.areaOfStudy ||
          item.qualification ||
          item.shoolName
        ) {
          let object = {
            instruction: "",
            type: "Education",
            yearStart: item.fromYear.toString(),
            yearEnd: item.toYear.toString(),
            qualification: item.qualification,
            studyDepartment: item.areaOfStudy,
            schoolName: item.shoolName,
            companyName: "",
            workDepartment: "",
            dutyOfWork: "",
            status: "",
            certificate: "",
            level: "",
            issuedBy: "",
          };
          EducationArray.push(object);
        }
      });

      let param = {
        individualFreelancerId: this.props.userId,
        userResumes: [
          ...EducationArray,
          ...CertificateArray,
          ...EmploymentArray,
        ],
        selfIntroduction: selfIntroduction,
        introductionTitle: introductionTitle,
        wishedWorkingCondition: {
          wishedCountry: wishedWorkingConditionCountry,
          wishedCity: wishedWorkingConditionCity,
          areaOfWork: wishedWorkingConditionAreaOfWork,
          wishedMinSalary: wishedWorkingConditionFromSalary,
          wishedMaxSalary: wishedWorkingConditionToSalary,
        },
      };

      let result = await request(
        ENDPOINT["UpdateFreelancerResume"],
        postOptions(param)
      );
      if (result.success) {
        this.props.handleNext("FreelancerProfileConfirmation");
        localStorage.setItem(
          "IndividaulFreelancerRegistrationInfo",
          JSON.stringify({
            step: "FreelancerProfileConfirmation",
            userId: result.result.individualFreelancerId,
          })
        );
        window.scrollTo({
          top: "0",
          behavior: "smooth",
        });
      } else notifications.showError(result.message);
    }
  };
  componentDidMount() {
    this.bindCountry();
    this.getFreelancerDetail();
  }

  getFreelancerDetail = async () => {
    if (this.props.userId) {
      this.setState({ isSkeletonLoading: true });
      let result = await request(
        `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${this.props.userId}`,
        getOptions()
      );
      if (result.success && result.result) {
        if (result.result.wishedWorkingCondition) {
          this.setState({
            selfIntroduction: result.result.selfIntroduction,
            introductionTitle: result.result.introductionTitle,
            wishedWorkingConditionCountry:
              result.result.wishedWorkingCondition.wishedCountry,
            wishedWorkingConditionCity:
              result.result.wishedWorkingCondition.wishedCity,
            wishedWorkingConditionAreaOfWork:
              result.result.wishedWorkingCondition.areaOfWork,
            wishedWorkingConditionFromSalary:
              result.result.wishedWorkingCondition.wishedMinSalary,
            wishedWorkingConditionToSalary:
              result.result.wishedWorkingCondition.wishedMaxSalary,
          });
        }

        this.setState({ isSkeletonLoading: false });
        if (result.result.userResumes && result.result.userResumes.length > 0) {
          let certificatesArray = [];
          let EducationsArray = [];
          let employmentArray = [];
          result.result.userResumes.map((item) => {
            if (item.type === "Certificate") {
              certificatesArray.push({
                id: v4(),
                yearIssued: item.yearStart || item.yearEnd,
                certificate: item.certificate,
                level: item.level,
                issuedBy: item.issuedBy,
              });
            }
            if (item.type === "Employment") {
              employmentArray.push({
                id: v4(),
                fromYear: item.yearStart,
                toYear: item.yearEnd,
                company: item.companyName,
                department: item.workDepartment,
                dutyOfWork: item.dutyOfWork,
                status: item.status,
              });
            }
            if (item.type === "Education") {
              EducationsArray.push({
                id: v4(),
                fromYear: item.yearStart,
                toYear: item.yearEnd,
                areaOfStudy: item.studyDepartment,
                qualification: item.qualification,
                shoolName: item.schoolName,
              });
            }
          });
          if (certificatesArray.length > 0) {
            this.setState({
              certifications: certificatesArray,
            });
          }
          if (EducationsArray.length > 0) {
            this.setState({
              educations: EducationsArray,
            });
          }
          if (employmentArray.length > 0) {
            this.setState({
              employments: employmentArray,
            });
          }
        }

        /* userResumes: [{instruction: "", type: "Education", yearStart: "1981", yearEnd: "1985",…},…]
0: {instruction */
        // console.log(result,"result")
        if (result.result.wishedWorkingCondition) {
          setTimeout(() => {
            if (this.state.countries && this.state.countries.length > 0) {
              let countryId = this.state.countries.find(
                (item) =>
                  item.name ===
                  result.result.wishedWorkingCondition.wishedCountry
              );
              if (countryId) {
                this.bindCities(countryId.id);
                this.setState({
                  wishedWorkingConditionCity:
                    result.result.wishedWorkingCondition.wishedCity,
                });
              }
            }
          }, 1000);
        }
      } else {
        this.setState({ isSkeletonLoading: false });
      }
    }

    /* printable */

    if (this.props.printable) {
      this.handlePrintAble();
    }
  };
  bindCountry = async () => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=Countries`,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data.length > 0) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[index];
          array.push({
            id: element.id,
            name: element.name,
          });
        }
        this.setState({ countries: array });
      } else {
        alert("No Country");
      }
    } else {
      alert("No Country");
    }
  };
  bindCities = async (countryId) => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=city_country_` + countryId,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data.length > 0) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[index];
          array.push({
            id: element.id,
            name: element.name,
          });
        }
        this.setState({ cities: array });
      } else {
        alert("No City");
      }
    } else {
      alert("No City");
    }
  };
  handlePrintAble = () => {
    /* printable-area */
    var printContents = document.getElementById("printable-area").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;
  };
  render() {
    let {
      selfIntroduction,
      introductionTitle,
      programmingLanguageLevel,
      loading,
      isSkeletonLoading,
    } = this.state;
    let { languageReducer, languageType } = this.props;
    let {
      imgUrl,
      professionalFields,
      firstName,
      lastName,
      country,
      countryCode,
      phoneNo,
      address,
      city,
      postalCode,
      selectedImg,
    } = this.state;
    return (
      <>
        <SubHeader />
        <section className="talent-search-page">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-12 col-md-1 col-lg-2"></div>
              <div className="col-12 col-md-10 col-lg-8">
                <div
                  id="printable-area"
                  className="hourly_limit resume-registration-new   project_post card_sec"
                >
                  <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
                  <div hidden={isSkeletonLoading} className="position_rel Img_heading_userResume">
                    <Heading
                      heading={languageType.USER_RESUME_REGISTRATION_TEXT}
                      icon={
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/resume1.png"
                      }
                      color="#333333"
                      fontSize="26px"
                      fontWeight="600"
                      fontFamily="Raleway"
                    />
                    <div className="download_sampleExcel_pc">
                    <i class="fas fa-cloud-download-alt"></i>  Download Sample Excel form
                    </div>
                    <div className="download_sampleExcel_mobile">
                    <i class="fas fa-cloud-download-alt"></i> 
                    </div>
                  </div>
                  <form className="post_form" style={{ maxWidth: "100%" }}>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="save_cancel profile_userResume_mobile">
                          <span className="profile_box">
                            {selectedImg && selectedImg !== null && (
                              <img
                                src={
                                  this.state.selectedImg
                                    ? URL.createObjectURL(
                                        this.state.selectedImg
                                      )
                                    : this.state.profilePicture
                                }
                                alt="profile"
                              />
                            )}
                            {((selectedImg && selectedImg !== null) ||
                              this.state.profilePicture) &&
                              !this.state.uploading1 && (
                                <div
                                  onClick={() => {
                                    this.setState({
                                      selectedImg: null,
                                      profilePicture: "",
                                      imgUrl: {},
                                    });
                                  }}
                                  className="trash-bin-icon-for-image-change"
                                >
                                  <i className="fa fa-trash"></i>
                                </div>
                              )}
                          </span>
                          <div className="form-group upload_file">
                            <label
                              htmlFor="addAphoto"
                              style={{ width: "124px" }}
                              className="btn create-freelancer-file-btn"
                            >
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              />
                              {languageType.ADD_PHOTO}
                            </label>
                            <input
                              type="file"
                              className="form-control-file"
                              id="addAphoto"
                              onChange={async (e) => {
                                let errorMessage = {};
                                if (
                                  e.target.files[0] &&
                                  e.target.files[0].name &&
                                  !e.target.files[0].name.match(
                                    /\.(jpg|jpeg|png|PNG|gif)$/
                                  )
                                ) {
                                  this.setState({
                                    invalidFile: "Please select valid image",
                                  });
                                  return false;
                                }
                                let size = e.target.files[0]
                                  ? e.target.files[0].size
                                  : 0;
                                if (size < 1048576) {
                                  this.setState({
                                    selectedImg: e.target.files[0],
                                  });
                                  // this.uploadImage(e.target.files[0],"imgUrl")
                                  if (this.state.selectedImg !== null)
                                    errorMessage["selectedImg"] = null;

                                  this.setState({
                                    invalidFile: null,
                                    errorMessage: errorMessage,
                                  });
                                  if (this.props.userId) {
                                    this.setState({ updatesProfile: true });
                                  }
                                } else {
                                  notifications.showWarning(
                                    languageType.IMAGE_UPLOADING_SIZE_TEXT
                                  );
                                  return false;
                                }
                              }}
                            />
                            {this.state.invalidFile && (
                              <p className="text-danger">
                                {" "}
                                {this.state.invalidFile}{" "}
                              </p>
                            )}
                            {this.state.errorMessage.selectedImg && (
                              <p className="text-danger">
                                {" "}
                                {this.state.errorMessage.selectedImg}{" "}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9">
                        {/* <i className="fa fa-question-circle" aria-hidden="true" />
              </label> */}
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <Label
                              title={languageType.FIRST_NAME}
                              compulsory={true}
                              icon={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/nameIcon.svg"
                              }
                              color="#333333"
                              width="20px"
                              primary={true}
                            ></Label>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                maxLength="100"
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (!isValidString(e.target.value))
                                    errorMessage["firstName"] = null;

                                  this.setState({
                                    firstName: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                                placeholder={languageType.EX_JOHN}
                              />
                              {this.state.errorMessage.firstName && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.firstName}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                          <div
                            className="col-12 col-md-6" 
                          >
                            <Label
                              title={languageType.LAST_NAME}
                              compulsory={true}
                              icon={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/nameIcon.svg"
                              }
                              color="#333333"
                              width="20px"
                              primary={true}
                            ></Label>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                maxLength="100"
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (!isValidString(e.target.value))
                                    errorMessage["lastName"] = null;

                                  this.setState({
                                    lastName: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                                placeholder={languageType.EX_CARRY}
                              />
                              {this.state.errorMessage.lastName && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.lastName}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="form-group">
                              <Label
                                title={languageType.COUNTRY_TEXT}
                                compulsory={true}
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/languages_world_icon.png"
                                }
                                color="#333333"
                                width="21px"
                                prefixBoxInValid={
                                  this.state.errorMessage["country"]
                                    ? true
                                    : false
                                }
                                primary={true}
                              ></Label>
                              <DropdownList
                                id={`CountryList}`}
                                gray_bg 
                                name={`CountryList`}
                                className={`${ this.state.country ? "countryListActive" : "countryListnotactive" } "countryList_userResume"`}
                                enableAutoComplete
                                enableAutoCompleteSearch
                                placeHolder={languageType.COUNTRY_TEXT}
                                value={country} 
                                selectItem={this.onSelectCountry}
                                items={CountryList.map((country) => ({
                                  text: country.name,
                                  value: country.name,
                                }))}
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (!isValidString(e.target.value))
                                    errorMessage["country"] = null;
                                  this.setState({
                                    country: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                              />
                              {this.state.errorMessage.country && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.country}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="form-group">
                              <Label
                                title={languageType.COUNTRY_CODE}
                                compulsory={true}
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/countryCode.svg"
                                }
                                color="#333333"
                                width="20px"
                                primary={true}
                              ></Label>
                              <input
                                type="text"
                                className="form-control gray_bg"
                                placeholder="Country Code"
                                value={countryCode}
                                maxLength="10"
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (!isValidString(e.target.value))
                                    errorMessage["countryCode"] = null;
                                  this.setState({
                                    countryCode: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                              />
                              {this.state.errorMessage.countryCode && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.countryCode}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                              <Label
                                title={languageType.MOBILE_NO}
                                compulsory={true}
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/call_phone.svg"
                                }
                                color="#333333"
                                width="18px"
                                primary={true}
                              ></Label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={languageType.MOBILE_NO}
                                maxLength="10"
                                value={phoneNo}
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (e.target.value.trim() === "") {
                                    this.setState({ phoneNo: e.target.value });
                                  }

                                  if (!isNumeric(e.target.value)) {
                                    errorMessage["phoneNo"] = null;
                                    return false;
                                  }

                                  this.setState({
                                    phoneNo: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                              />
                              {this.state.errorMessage.phoneNo && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.phoneNo}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* <div
                            className="col-md-2" 
                          > */}
                            {/* <div className="form-group">
                              <div className="">
                                <button
                                  type="button"
                                  className="btn cancel_btn verify_btn"
                                  style={{ position: "relative", top: "24px" }}
                                >
                                  Verify
                                </button>
                              </div>
                            </div> */}
                          {/* </div> */}
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            <div className="form-group custom-form-top-margin">
                              <Label
                                title={languageType.ADDRESS}
                                compulsory={true}
                                icon={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/addressIcon.svg"
                                }
                                color="#333333"
                                width="21px"
                                primary={true}
                              ></Label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={languageType.ADDRESS}
                                value={address}
                                maxLength="500"
                                onChange={(e) => {
                                  let errorMessage = {};
                                  if (!isValidString(e.target.value))
                                    errorMessage["address"] = null;
                                  this.setState({
                                    address: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                              />
                              {this.state.errorMessage.address && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.errorMessage.address}{" "}
                                </p>
                              )}
                            </div>
                            <div className="row">
                              <div className="col-md-7">
                                <div className="form-group">
                                  <Label
                                    title={languageType.CITY_TEXT}
                                    compulsory={true}
                                    icon={
                                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/education.png"
                                    }
                                    color="#333333"
                                    width="21px"
                                    primary={true}
                                  ></Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={languageType.CITY_TEXT}
                                    value={city}
                                    maxLength="100"
                                    onChange={(e) => {
                                      let errorMessage = {};
                                      if (!isValidString(e.target.value))
                                        errorMessage["city"] = null;
                                      this.setState({
                                        city: e.target.value,
                                        errorMessage: errorMessage,
                                      });
                                    }}
                                  />
                                  {this.state.errorMessage.city && (
                                    <p className="text-danger">
                                      {" "}
                                      {this.state.errorMessage.city}{" "}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div className="form-group">
                                  <Label
                                    title={languageType.POST_CODE}
                                    compulsory={true}
                                    icon={
                                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/postalCode.svg"
                                    }
                                    color="#333333"
                                    width="21px"
                                    primary={true}
                                  ></Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={languageType.POST_CODE}
                                    value={postalCode}
                                    maxLength="10"
                                    onChange={(e) => {
                                      let errorMessage = {};
                                      if (e.target.value.trim() === "") {
                                        this.setState({
                                          postalCode: e.target.value,
                                        });
                                      }

                                      if (!isNumeric(e.target.value)) {
                                        errorMessage["postalCode"] = null;
                                        return false;
                                      }

                                      this.setState({
                                        postalCode: e.target.value,
                                        errorMessage: errorMessage,
                                      });
                                    }}
                                  />
                                  {this.state.errorMessage.postalCode && (
                                    <p className="text-danger">
                                      {" "}
                                      {this.state.errorMessage.postalCode}{" "}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 ExcelArea_userResumeTopMob">
                            <div className="ExcelArea_userResume">
                              <div 
                                className="proposal-team-link-area"
                              >
                                <b
                                  className="EXCEL_BULK_TextGreen" 
                                >
                                  {languageType.EXCEL_BULK_LOAD}
                                </b>
                                <img
                                  src={ 
                                    "https://dhihitu47nqhv.cloudfront.net/icons/excelIcon.svg" 
                                  }
                                  alt=""
                                  height={32}
                                  width={32}
                                />
                              </div>

                              <div>
                                <a className="bulkBold_textUser_resume">
                                  {languageType.USER_RESUME_BULK}
                                </a>
                              </div>
                            </div>

                            <div
                              className="ExcelArea_userResume"
                              style={{
                                marginTop: "10px",
                                textAlign:'center'
                              }}
                            >
                              <a className="bulkBold_textUser_resume2">
                                {languageType.UPGRADE_SERVICE}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div
                    hidden={isSkeletonLoading}
                    className="collapse animaton-height show"
                  >
                    <form
                      className="post_form post_form_resumePage"
                      style={{ padding: "0px 15px 0px 0px", maxWidth: "100%" }}
                    >
                      <>
                        {/*Education*/}
                        <div className="addMore_detail create_freelancer">
                          <Label
                            title={languageType.EDUCATION_TEXT}
                            icon={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/educationIcon.svg"
                            }
                            color="#333333"
                            width="21px"
                            primary={true}
                            bold={true}
                          ></Label>
                          <div className="table-responsive">
                          <table className="table text-center">
                            <thead>
                              <tr>
                                <th scope="col">{languageType.YEAR_FROM}</th>
                                <th scope="col">{languageType.YEAR_TO}</th>
                                <th scope="col">
                                  {languageType.QUALIFICATION_TEXT}
                                </th>
                                <th scope="col">
                                  {languageType.AREA_TO_STUDY}
                                </th>
                                <th scope="col">{languageType.SCHOOL_NAME}</th>
                                <th scope="col" style={{ width: "50px" }}>
                                  {languageType.ACTION}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.educations.map((el, i) => (
                                <tr key={i}>
                                  <td className="text-left p-0  customer-col-width">
                                    <DropdownList
                                      id={`educationFromYear${el.id}`}
                                      name={`educationFromYear${el.id}`}
                                      placeHolder="From Year"
                                      value={el.fromYear}
                                      enableAutoCompleteSearch
                                      noborder
                                      selectItem={(value) => {
                                        el.fromYear = value;
                                        this.setState({
                                          educations: this.state.educations,
                                        });
                                      }}
                                      items={GetSpecificYearsList(
                                        1980,
                                        new Date().getFullYear()
                                      )}
                                    />
                                  </td>
                                  <td className="text-left p-0 customer-col-width">
                                    <DropdownList
                                      id={`educationToYear${el.id}`}
                                      name={`educationToYear${el.id}`}
                                      placeHolder="To Year"
                                      value={el.toYear}
                                      enableAutoCompleteSearch
                                      noborder
                                      selectItem={(value) => {
                                        if (value > el.fromYear) {
                                          el.toYear = value;
                                          this.setState({
                                            educations: this.state.educations,
                                          });
                                        } else {
                                          notifications.showWarning(
                                            "To year should be greater than from year"
                                          );
                                        }
                                      }}
                                      items={GetSpecificYearsList(
                                        1980,
                                        new Date().getFullYear()
                                      )}
                                    />
                                  </td>
                                  <td
                                    className="text-left p-0"
                                    style={{ minWidth: "200px" }}
                                  >
                                    <DropdownList
                                      id={`qualification${el.id}`}
                                      name={`qualification${el.id}`}
                                      placeHolder="Qualification"
                                      enableAutoCompleteSearch
                                      value={el.qualification}
                                      noborder
                                      selectItem={(value) => {
                                        el.qualification = value;
                                        this.setState({
                                          educations: this.state.educations,
                                        });
                                      }}
                                      items={languageReducer.educationType}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={el.areaOfStudy}
                                      placeholder="Enter department"
                                      maxLength="100"
                                      onChange={(e) => {
                                        let errorMessage = {};
                                        el.areaOfStudy = e.target.value;

                                        this.setState({
                                          educations: this.state.educations,
                                          errorMessage: errorMessage,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={el.schoolName}
                                      maxLength="500"
                                      placeholder="Enter school name"
                                      onChange={(e) => {
                                        let errorMessage = {};
                                        el.schoolName = e.target.value;

                                        this.setState({
                                          educations: this.state.educations,
                                          errorMessage: errorMessage,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    {i == 0 ? (
                                      <i
                                        onClick={() => {
                                          let educations =
                                            this.state.educations;
                                          educations.push({
                                            id: v4(),
                                            fromYear: "",
                                            toYear: "",
                                            areaOfStudy: "",
                                            qualification: "",
                                            shoolName: "",
                                          });
                                          this.setState({
                                            educations: educations,
                                          });
                                        }}
                                        className="fa fa-plus customer-table-icon"
                                      ></i>
                                    ) : (
                                      <i
                                        onClick={() => {
                                          let educationList =
                                            this.state.educations.filter(
                                              (x) => x.id !== el.id
                                            );
                                          this.setState({
                                            educations: educationList,
                                          });
                                        }}
                                        className="fa fa-trash customer-table-icon"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </div>
                        </div>

                        {/*Employment*/}
                        <br />
                        <div className="addMore_detail create_freelancer">
                          <Label
                            title={"Employment History "}
                            icon={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/employment.png"
                            }
                            color="#333333"
                            width="21px"
                            primary={true}
                            bold={true}
                          ></Label>
                          <div className="table-responsive">
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  <th scope="col">{languageType.YEAR_FROM}</th>
                                  <th scope="col">{languageType.YEAR_TO}</th>
                                  <th scope="col">
                                    {languageType.COMPANY_NAME}
                                  </th>
                                  <th scope="col">
                                    {languageType.DEPARTMENT_TEXT}
                                  </th>
                                  <th scope="col">
                                    {languageType.DUTY_OF_WORK}
                                  </th>
                                  <th scope="col">
                                    {languageType.CURRENT_STATUS}
                                  </th>
                                  <th scope="col" style={{ width: "50px" }}>
                                    {languageType.ACTION}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.employments.map((el, i) => (
                                  <tr key={i}>
                                    <td className="text-left p-0  customer-col-width1">
                                      <DropdownList
                                        id={`employmentYearFrom${el.id}`}
                                        name={`employmentYearFrom${el.id}`}
                                        placeHolder="Year From"
                                        enableAutoCompleteSearch
                                        noborder
                                        value={el.fromYear}
                                        selectItem={(value) => {
                                          el.fromYear = value;
                                          this.setState({
                                            employments: this.state.employments,
                                          });
                                        }}
                                        items={GetSpecificYearsList(
                                          1980,
                                          new Date().getFullYear()
                                        )}
                                      />
                                    </td>
                                    <td className="text-left p-0  customer-col-width1">
                                      <DropdownList
                                        id={`employmentToYear${el.id}`}
                                        name={`employmentToYear${el.id}`}
                                        placeHolder="Year To"
                                        enableAutoCompleteSearch
                                        noborder
                                        value={el.toYear}
                                        selectItem={(value) => {
                                          if (value > el.fromYear) {
                                            el.toYear = value;
                                            this.setState({
                                              employments:
                                                this.state.employments,
                                            });
                                          } else {
                                            notifications.showWarning(
                                              "To year should be greater than from year"
                                            );
                                          }
                                        }}
                                        items={GetSpecificYearsList(
                                          1980,
                                          new Date().getFullYear()
                                        )}
                                      />
                                    </td>
                                    <td
                                      className="text-left p-0"
                                      style={{ width: "140px" }}
                                    >
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={el.company}
                                        placeholder="Enter company "
                                        maxLength="500"
                                        onChange={(e) => {
                                          let errorMessage = {};
                                          el.company = e.target.value;

                                          this.setState({
                                            employments: this.state.employments,
                                            errorMessage: errorMessage,
                                          });
                                        }}
                                      />
                                    </td>
                                    <td
                                      className="text-left p-0"
                                      style={{ width: "140px" }}
                                    >
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={el.department}
                                        placeholder="Enter Department"
                                        maxLength="500"
                                        onChange={(e) => {
                                          let errorMessage = {};
                                          el.department = e.target.value;

                                          this.setState({
                                            employments: this.state.employments,
                                            errorMessage: errorMessage,
                                          });
                                        }}
                                      />
                                    </td>
                                    <td className="text-left p-0">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={el.dutyOfWork}
                                        maxLength="500"
                                        placeholder="Enter Duty"
                                        onChange={(e) => {
                                          let errorMessage = {};
                                          el.dutyOfWork = e.target.value;

                                          this.setState({
                                            employments: this.state.employments,
                                            errorMessage: errorMessage,
                                          });
                                        }}
                                      />
                                    </td>
                                    <td className="customer-col-width">
                                      <DropdownList
                                        id="currentStatus"
                                        name="DropdownList"
                                        value={el.status}
                                        enableAutoCompleteSearch
                                        noborder
                                        selectItem={(value) => {
                                          el.status = value;
                                          this.setState({
                                            employments: this.state.employments,
                                          });
                                        }}
                                        items={[
                                          { text: "Working", value: "Working" },
                                          {
                                            text: "Resigned",
                                            value: "Resigned",
                                          },
                                        ]}
                                      />
                                    </td>
                                    <td>
                                      {i == 0 ? (
                                        <i
                                          onClick={() => {
                                            let employments =
                                              this.state.employments;
                                            employments.push({
                                              id: v4(),
                                              fromYear: "",
                                              toYear: "",
                                              company: "",
                                              department: "",
                                              dutyOfWork: "",
                                              status: "",
                                            });
                                            this.setState({
                                              employments: employments,
                                            });
                                          }}
                                          className="fa fa-plus customer-table-icon"
                                        ></i>
                                      ) : (
                                        <i
                                          onClick={() => {
                                            let employmentList =
                                              this.state.employments.filter(
                                                (x) => x.id !== el.id
                                              );
                                            this.setState({
                                              employments: employmentList,
                                            });
                                          }}
                                          className="fa fa-trash customer-table-icon"
                                          aria-hidden="true"
                                        ></i>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <br />
                        {/*Certificate*/}
                        <div className="addMore_detail create_freelancer">
                          <Label
                            title={"Certification "}
                            color="#333333"
                            width="21px"
                            icon={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/trophy.png"
                            }
                            primary={true}
                            bold={true}
                          ></Label>
                          <div className="table-responsive">
                          <table className="table text-center">
                            <thead>
                              <tr>
                                <th scope="col">{languageType.YEAR_ISSUED}</th>
                                <th scope="col">
                                  {languageType.CERTIFICATE_TEXT}
                                </th>
                                <th scope="col">{languageType.LEVEL_RESULT}</th>
                                <th scope="col">{languageType.ISSUED_BY}</th>
                                <th scope="col" style={{ width: "50px" }}>
                                  {languageType.ACTION}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.certifications.map((el, i) => (
                                <tr key={i}>
                                  <td className="text-left p-0 customer-col-width">
                                    <DropdownList
                                      id={`YearIssued${el.id}`}
                                      name={`YearIssued${el.id}`}
                                      placeHolder="Year Issued"
                                      enableAutoCompleteSearch
                                      value={el.yearIssued}
                                      noborder
                                      selectItem={(value) => {
                                        el.yearIssued = value;
                                        this.setState({
                                          certifications:
                                            this.state.certifications,
                                        });
                                      }}
                                      items={GetSpecificYearsList(
                                        1980,
                                        new Date().getFullYear()
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={el.certificate}
                                      maxLength="500"
                                      onChange={(e) => {
                                        let errorMessage = {};
                                        el.certificate = e.target.value;
                                        this.setState({
                                          certifications:
                                            this.state.certifications,
                                          errorMessage: errorMessage,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={el.level}
                                      maxLength="50"
                                      onChange={(e) => {
                                        let errorMessage = {};
                                        el.level = e.target.value;
                                        this.setState({
                                          certifications:
                                            this.state.certifications,
                                          errorMessage: errorMessage,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={el.issuedBy}
                                      maxLength="100"
                                      onChange={(e) => {
                                        let errorMessage = {};
                                        el.issuedBy = e.target.value;
                                        this.setState({
                                          certifications:
                                            this.state.certifications,
                                          errorMessage: errorMessage,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    {i == 0 ? (
                                      <i
                                        onClick={() => {
                                          let certifications =
                                            this.state.certifications;
                                          certifications.push({
                                            id: v4(),
                                            yearIssued: "",
                                            certificate: "",
                                            level: "",
                                            issuedBy: "",
                                          });
                                          this.setState({
                                            certifications: certifications,
                                          });
                                        }}
                                        className="fa fa-plus customer-table-icon"
                                      ></i>
                                    ) : (
                                      <i
                                        onClick={() => {
                                          let certificationList =
                                            this.state.certifications.filter(
                                              (x) => x.id !== el.id
                                            );
                                          this.setState({
                                            certifications: certificationList,
                                          });
                                        }}
                                        className="fa fa-trash customer-table-icon"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </div>
                        </div>

                        {/*EmploymentHistory*/}
                      </>

                      <br />
                      <div className="addMore_detail">
                        <div className="form-group">
                          <Label
                          title ={languageType.INTRODUCTION_TITLE_TEXT}
                          icon={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/favorite_page.svg"
                          }
                          color="#333333"
                          width="22px" 
                          primary={true}
                          > </Label>  
                          <input
                                type="text"
                                className="form-control"
                                maxLength="100"
                                value={introductionTitle}
                                onChange={(e) => {
                                  let errorMessage = {};

                                  if (!isValidString(e.target.value))
                                    errorMessage["introductionTitle"] = null;

                                  this.setState({
                                    introductionTitle: e.target.value,
                                    errorMessage: errorMessage,
                                  });
                                }}
                                placeholder={languageType.INTRODUCTION_TITLE_TEXT}
                          />
                          {this.state.errorMessage.introductionTitle && (
                            <p className="text-danger">
                              {" "}
                              {this.state.errorMessage.introductionTitle}{" "}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <Label
                            title={languageType.SELF_INTRO}
                            icon={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/experience.png"
                            }
                            color="#333333"
                            width="26px"
                            primary={true}
                          ></Label>

                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder={languageType.ENTER_SELF_INTRO}
                            value={selfIntroduction}
                            maxLength="1000"
                            onChange={(e) => {
                              let errorMessage = {};

                              if (!isValidString(e.target.value))
                                errorMessage["selfIntroduction"] = null;
                              this.setState({
                                selfIntroduction: e.target.value,
                                errorMessage: errorMessage,
                              });
                            }}
                          ></textarea>
                          {this.state.errorMessage.selfIntroduction && (
                            <p className="text-danger">
                              {" "}
                              {this.state.errorMessage.selfIntroduction}{" "}
                            </p>
                          )}
                        </div>
                      </div>

                      <br />
                      <br />
                      <div className="resume-view-pdf-link">
                        <h3
                          onClick={() => {
                            this.handlePrintAble();
                          }}
                        >
                          {languageType.VIEW_IN_PDF}
                        </h3>
                      </div>
                      <div
                        className="create-freelancer-bottom-steps"
                        style={{ paddingRight: "0px" }}
                      >
                        <button
                          onClick={(e) => {}}
                          className="create-freelancer-bottom-steps-back"
                        >
                          {languageType.SAVE}
                        </button>
                        <button
                          disabled={loading}
                          onClick={(e) => {}}
                          className="create-freelancer-bottom-steps-skip"
                        >
                          Offer{" "}
                          {loading ? (
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
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageReducer: state.languageReducer,
    languageType: state.languageReducer.languageType,
  };
}

export default connect(mapStateToProps)(ResumePage);

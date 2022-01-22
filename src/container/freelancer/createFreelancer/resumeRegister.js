import React, { Component } from "react";
import DropdownList from "../../../components/dropdowns/dropdownList";
import v4 from "uuid";
import { CountryList } from "../../../utils/countrylist";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import notifications from "../../../utils/notifications";
import FileUploadLoader from "../../../components/loader/fileUpload";
import Heading from "../../../components/freelancerCreation/heading";
import Label from "../../../components/postProject/label";
import Skeleton from "../../../components/skeleton/skeleton";
import { connect } from "react-redux";
import { GetSpecificYearsList } from "../../../utils/years";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { uploadImage, deleteImage } from "../../../services/uploadImages";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./createFreelancer.scss";
class ResumeRegister extends Component {
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
      languageTests: [],
      wouldLikeToGetJobProposal: false,
      countryList: CountryList,
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
    };

    /* hhhhhhhhhhhhhhhh */
    this.state.certifications.push({
      id: v4(),
      yearIssued: "",
      certificate: "",
      level: "",
      issuedBy: "",
      certificateFile:'',
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
      uploading:false
    });
  }
  setFileUploading=(flag)=>{
       this.setState({uploading:flag})
  }
   handleDeleteImage = async (key) => {
    if (key.slice(0, 5) != "https") {
      await deleteImage(key);
    }
  };
  onResumeValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (!isValidString(this.state.selfIntroduction)) {
      formIsValid = false;
      errorMessage["selfIntroduction"] = languageType.REQUIRED_MESSAGE;
      notifications.showWarning("self Introduction is Required ");
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
            certificateFile:item.certificateFile,
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
        notifications.showSuccess("Congratulation! you have successfully registered your resume!")
      } else
        notifications.showError(
          result.message || "Error! while update your resume, Try again"
        );
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
                certificateFile:item.certificateFile
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
    // html2canvas(document.querySelector(".printable-area"), {
    //   logging: true,
    //   letterRendering: 1,
    //   allowTaint: false,
    //   useCORS: true,
    // }).then((canvas) => {
    //   var imgData = canvas.toDataURL("image/jpeg", 1);
    //   var pdf = new jsPDF("p", "mm", "a4");
    //   var pageWidth = pdf.internal.pageSize.getWidth() - 22;
    //   var pageHeight = pdf.internal.pageSize.getHeight() - 22;
    //   var imageWidth = canvas.width;
    //   var imageHeight = canvas.height;

    //   var ratio =
    //     imageWidth / imageHeight >= pageWidth / pageHeight
    //       ? pageWidth / imageWidth
    //       : pageHeight / imageHeight;
    //   pdf.addImage(
    //     imgData,
    //     "JPEG",
    //     10,
    //     10,
    //     imageWidth * ratio,
    //     imageHeight * ratio
    //   );
    //   pdf.save("resume.pdf");
    // });

  };
  render() {
    let {
      wouldLikeToGetJobProposal,
      wishedWorkingConditionCountry,
      wishedWorkingConditionCity,
      wishedWorkingConditionAreaOfWork,
      wishedWorkingConditionFromSalary,
      wishedWorkingConditionToSalary,
      programmingLanguage,
      selfIntroduction,
      programmingLanguageLevel,
      loading,
      isSkeletonLoading,
    } = this.state;
    let { languageReducer } = this.props;
    return (
      <>
        <div
          id="printable-area"
          className="hourly_limit resume-registration-new printable-area"
        >
          <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
          <div hidden={isSkeletonLoading} className="position_rel">
            <div className="resume-heading-icon">
              <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/resume1.png"} />
              <h3>Resume Registration </h3>
            </div>
          </div>
          <br />
          <br />
          <div
            hidden={isSkeletonLoading}
            className="collapse animaton-height show"
          >
            <form className="post_form" style={{ padding: "0px 15px 0px 0px" }}>
              <>
                {/*Education*/}
                <div className="addMore_detail create_freelancer">
                  <div className="heading-icon-label">
                    <img
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/education.png"}
                    />
                    <h5>Education</h5>
                  </div>

                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Year From</th>
                        <th scope="col">Year To</th>
                        <th scope="col">Qualification</th>
                        <th scope="col">Area to study/Department</th>
                        <th scope="col">School Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.educations.map((el, i) => (
                        <tr key={i}>
                          <td className="text-left p-0  customer-col-width">
                            <DropdownList
                              id={`educationFromYear${el.id}`}
                              name={`educationFromYear${el.id}`}
                              enableAutoCompleteSearch
                              placeHolder="From Year"
                              value={el.fromYear}
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
                              enableAutoCompleteSearch
                              placeHolder="To Year"
                              value={el.toYear}
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
                              enableAutoCompleteSearch
                              placeHolder="Qualification"
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
                                  let educations = this.state.educations;
                                  educations.push({
                                    id: v4(),
                                    fromYear: "",
                                    toYear: "",
                                    areaOfStudy: "",
                                    qualification: "",
                                    shoolName: "",
                                  });
                                  this.setState({ educations: educations });
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
                                  this.setState({ educations: educationList });
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

                {/*Employment*/}
                <br />
                <div className="addMore_detail create_freelancer">
                  <div className="heading-icon-label">
                    <img
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/employment.png"}
                    />
                    <h5>Employment History</h5>
                  </div>

                  <div className="">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th scope="col">Year From</th>
                          <th scope="col">Year To</th>
                          <th scope="col">Company</th>

                          <th scope="col">Department</th>
                          <th scope="col">Duty of Work</th>
                          <th scope="col">Current Status</th>
                          <th scope="col" style={{ width: "50px" }}>
                            Action
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
                                enableAutoCompleteSearch
                                placeHolder="Year From"
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
                                enableAutoCompleteSearch
                                placeHolder="Year To"
                                noborder
                                value={el.toYear}
                                selectItem={(value) => {
                                  if (value > el.fromYear) {
                                    el.toYear = value;
                                    this.setState({
                                      employments: this.state.employments,
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
                                  { text: "Resigned", value: "Resigned" },
                                ]}
                              />
                            </td>
                            <td>
                              {i == 0 ? (
                                <i
                                  onClick={() => {
                                    let employments = this.state.employments;
                                    employments.push({
                                      id: v4(),
                                      fromYear: "",
                                      toYear: "",
                                      company: "",
                                      department: "",
                                      dutyOfWork: "",
                                      status: "",
                                    });
                                    this.setState({ employments: employments });
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
                  <div className="heading-icon-label">
                    <img
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/trophy.png"}
                    />
                    <h5>Certification</h5>
                  </div>

                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Year Issued</th>
                        <th scope="col">Certificate</th>
                        <th scope="col">Level/Result</th>
                        <th scope="col">Issued By</th>
                        <th scope="col">Certificate_File</th>
                        <th scope="col">Action</th>
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
                                  certifications: this.state.certifications,
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
                                  certifications: this.state.certifications,
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
                                  certifications: this.state.certifications,
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
                                  certifications: this.state.certifications,
                                  errorMessage: errorMessage,
                                });
                              }}
                            />
                          </td>
                          <td style={{maxWidth:'120px'}}>
                            <label for="file-upload-button-resume">
                            <div className="file-upload-button-resume">
                            
                            {
                               el.certificateFile?el.certificateFile.split("/")
                               [el.certificateFile.split("/").length - 1].substr(
                                el.certificateFile.split("/")[el.certificateFile.split("/").length - 1]
                                   .length - 12
                               ):"upload file"
                            }
                            </div>
                            </label>
                           
                            <input
                           type="file"
                         name="user-photo"
                         id="file-upload-button-resume"
                         accept="jpg jpeg png PNG gif"
                         style={{visibility:'hidden',height:'0px'}}
                         onChange={async (e) => {
                          let size = e.target.files[0]
                            ? e.target.files[0].size
                            : 0;
                          if (size < 1048576) {
                            this.setFileUploading(true);
                            if(el.certificateFile){
                              this.handleDeleteImage(el.certificateFile)
                            }
                            
                            let response = await uploadImage(e.target.files[0], "profileimage");
                            if (response.success) {
                              el.certificateFile=response.result.s3Key
                              this.setFileUploading(false);
                            } else {
                              notifications.showError(response || "Error uploading image.");
                              this.setFileUploading(false);
                            }
                          } else {
                            notifications.showWarning(
                              "Please select a file size of less than 1 MB."
                            );
                          }
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

                {/*EmploymentHistory*/}
              </>

              <br />
              <div className="addMore_detail">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Enter Self Introduction"
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
              <div className="addMore_detail">
                <div className="dev_box">
                  <label className="wished_lbl">
                    Write your wished working condition
                  </label>
                  <div className="row">
                    <div className="col-md-4 country_select">
                      <div className="d-flex align-items-center lavel_select form-group">
                        <label>Country :</label>
                        <DropdownList
                          id="ddlWishedWorkingConditionCountry"
                          name="ddlWishedWorkingConditionCountry"
                          value={wishedWorkingConditionCountry}
                          enableAutoCompleteSearch
                          enableAutoComplete
                          selectItem={(value) => {
                            let errorMessage = {};
                            if (!isValidString(value))
                              errorMessage["wishedWorkingConditionCountry"] =
                                null;

                            let countryId = this.state.countries.find(
                              (item) => item.name === value
                            );
                            if (countryId) {
                              this.bindCities(countryId.id);
                            }
                            this.setState({
                              wishedWorkingConditionCountry: value,
                              errorMessage: errorMessage,
                            });
                          }}
                          items={this.state.countryList.map((country) => ({
                            text: country.name,
                            value: country.name,
                          }))}
                        />
                      </div>
                      {this.state.errorMessage
                        .wishedWorkingConditionCountry && (
                        <p className="text-danger">
                          {" "}
                          {
                            this.state.errorMessage
                              .wishedWorkingConditionCountry
                          }{" "}
                        </p>
                      )}
                      <div className="d-flex align-items-center lavel_select form-group">
                        <label>City :</label>
                        <DropdownList
                          enableAutoComplete
                          id="ddlWishedWorkingConditionCity"
                          name="ddlWishedWorkingConditionCity"
                          enableAutoCompleteSearch
                          value={wishedWorkingConditionCity}
                          placeHolder={
                            wishedWorkingConditionCity
                              ? wishedWorkingConditionCity
                              : ""
                          }
                          selectItem={(value) => {
                            let errorMessage = {};
                            console.log(value, "value value");
                            if (value && !isValidString(value))
                              errorMessage["wishedWorkingConditionCity"] = null;
                            this.setState({
                              wishedWorkingConditionCity: value,
                              errorMessage: errorMessage,
                            });
                          }}
                          items={this.state.cities.map((city) => ({
                            text: city.name,
                            value: city.name,
                          }))}
                        />
                      </div>
                      {this.state.errorMessage.wishedWorkingConditionCity && (
                        <p className="text-danger">
                          {" "}
                          {
                            this.state.errorMessage.wishedWorkingConditionCity
                          }{" "}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center lavel_select">
                        <label>Area of Work :</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Area Of Work"
                          value={wishedWorkingConditionAreaOfWork}
                          maxLength="100"
                          onChange={(e) => {
                            let errorMessage = {};
                            if (!isValidString(e.target.value))
                              errorMessage["wishedWorkingConditionAreaOfWork"] =
                                null;
                            this.setState({
                              wishedWorkingConditionAreaOfWork: e.target.value,
                              errorMessage: errorMessage,
                            });
                          }}
                        />
                      </div>
                      {this.state.errorMessage
                        .wishedWorkingConditionAreaOfWork && (
                        <p className="text-danger">
                          {" "}
                          {
                            this.state.errorMessage
                              .wishedWorkingConditionAreaOfWork
                          }{" "}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 text-right">
                      <div className="lavel_select yearly_sal">
                        <label>Yearly Salary Expectation in US$</label>
                      </div>
                      <div className="country_select">
                        <div className="d-flex align-items-center lavel_select form-group">
                          <label>From :</label>
                          <input
                            type="text"
                            className="form-control"
                            value={wishedWorkingConditionFromSalary}
                            maxLength="50"
                            onChange={(e) => {
                              let errorMessage = {};

                              let fromSalary = "";
                              if (
                                !e.target.value ||
                                e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)
                              )
                                fromSalary = e.target.value;
                              else if (e.target.value === "") fromSalary = "";

                              if (!isValidString(fromSalary))
                                errorMessage[
                                  "wishedWorkingConditionFromSalary"
                                ] = null;
                              this.setState({
                                wishedWorkingConditionFromSalary: fromSalary,
                                errorMessage: errorMessage,
                              });
                            }}
                          />
                        </div>
                        {this.state.errorMessage
                          .wishedWorkingConditionFromSalary && (
                          <p className="text-danger">
                            {" "}
                            {
                              this.state.errorMessage
                                .wishedWorkingConditionFromSalary
                            }{" "}
                          </p>
                        )}
                        <div className="d-flex align-items-center lavel_select form-group">
                          <label>To :</label>
                          <input
                            type="text"
                            className="form-control"
                            value={wishedWorkingConditionToSalary}
                            maxLength="50"
                            onChange={(e) => {
                              let errorMessage = {};

                              let toSalary = "";
                              if (
                                !e.target.value ||
                                e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)
                              )
                                toSalary = e.target.value;
                              else if (e.target.value === "") toSalary = "";

                              if (!isValidString(toSalary))
                                errorMessage["wishedWorkingConditionToSalary"] =
                                  null;
                              this.setState({
                                wishedWorkingConditionToSalary: toSalary,
                                errorMessage: errorMessage,
                              });
                            }}
                          />
                        </div>
                        {this.state.errorMessage
                          .wishedWorkingConditionToSalary && (
                          <p className="text-danger">
                            {" "}
                            {
                              this.state.errorMessage
                                .wishedWorkingConditionToSalary
                            }{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
                  View in PDF
                </h3>
              </div>
              <div
                className="create-freelancer-bottom-steps"
                style={{ paddingRight: "0px" }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.handleBack("SkillAndBusinessStep");
                  }}
                  className="create-freelancer-bottom-steps-back"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    this.onSubmitProfessionalArea();
                  }}
                  className="create-freelancer-bottom-steps-skip"
                >
                  Next{" "}
                  {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
                </button>
              </div>
            </form>
          </div>
          <FileUploadLoader title={" Uploading new file..."} show={this.state.uploading} />
        </div>
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

export default connect(mapStateToProps)(ResumeRegister);

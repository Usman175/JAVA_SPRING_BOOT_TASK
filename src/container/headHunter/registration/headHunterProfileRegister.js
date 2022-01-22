import React, { useState, useEffect } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import DropdownList from "../../../components/dropdowns/dropdownList";
import { CountryList } from "../../../utils/countrylist";
import Label from "../../../components/postProject/label";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import OptionalInfo from "../../../components/registration/optionalInfo";
import OptionalInfoHeadHunter from '../../../components/registration/headHunterOptionalInfo'
import FileUploadLoader from "../../../components/loader/fileUpload";
import request from "../../../utils/request";
import notifications from "../../../utils/notifications";
import { ENDPOINT } from "../../../utils/endpoint";
import { updateHeadHunterRegisterValue } from "../../../store/action/freelancer/headhunter";
import { useSelector, useDispatch } from "react-redux";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  postMultipartFileNew,
} from "../../../utils/httpConfig";
import Skeleton from "../../../components/skeleton/skeleton";

import "./headHunter.scss";

function HeadHunterProfile(props) {
  const [errorMessage, setErrorMessage] = useState({});

  const [uploading, setUploading] = useState(false); 
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);

  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [workingConditions, setWorkingConditions] = useState({
    wishedWorkingConditionCountry: "",
    wishedWorkingConditionCity: "",
    wishedWorkingConditionAreaOfWork: "",
  });
  const [loading, setLoading] = useState(false);

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const lookUpData = useSelector((state) => state.lookUp.lookUpData);
  const headhunterRegistration = useSelector(
    (state) => state.headhunterRegistration
  );

  useEffect(() => {
    bindCountry();
    getCompanyDetail();
  }, []);

  const getCompanyDetail = async () => {
    if (props.headhunterId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetUserClient"]}?headhunterId=${props.headhunterId}`,
        getOptions()
      );
      if (result.success) {
        setIsSkeletonLoading(false);
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (props.location?.state?.phoneVerified) {
      let obj = {
        type: "phoneVerified",
        value: true,
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  }, []);
  const bindCountry = async () => {
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
        // setCountries(array);
        const country = CountryList.find(
          (cl) => cl.code === lookUpData?.shortCode
        );
        handleUpdateClientRegistrationValue(country?.dial_code, "countryCode");
        handleUpdateClientRegistrationValue(country?.name, "country");
      } else {
        alert("No Country");
      }
    } else {
      alert("No Country");
    }
  };
  const bindCities = async (countryId) => {
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
        setCities(array);
      } else {
        alert("No City");
      }
    } else {
      alert("No City");
    }
  };

  const handleValidate = () => {
    let formIsValid = true;
    let errorMessage = {};
    if (!headhunterRegistration.userPhoto.url) {
      formIsValid = false;
      errorMessage["userPhoto"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.COMPANY_LOGO_REQUIRED);
    } else if (!headhunterRegistration.companyName) {
      formIsValid = false;
      errorMessage["companyName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Company name is Required!");
    } else if (!headhunterRegistration.firstName) {
      formIsValid = false;
      errorMessage["contactFirstName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact first name is Required!");
    } else if (!headhunterRegistration.lastName) {
      formIsValid = false;
      errorMessage["contactLastName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact last name is Required!");
    } else if (!headhunterRegistration.country) {
      formIsValid = false;
      errorMessage["country"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Country is Required!");
    } else if (!headhunterRegistration.countryCode) {
      formIsValid = false;
      errorMessage["countryCode"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("country Code is Required!");
    } else if (!headhunterRegistration.phoneNo) {
      formIsValid = false;
      errorMessage["mobileNumber"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Mobile number is Required!");
    } else if (!headhunterRegistration.phoneVerified) {
      formIsValid = false;
      errorMessage["mobileNumber"] = "Phone number verification Required";
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Phone number verification Required!");
    } else if (!headhunterRegistration.businessType) {
      formIsValid = false;
      errorMessage["businessCategory"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Business area is Required!");
    } else if (!headhunterRegistration.userTitle) {
      formIsValid = false;
      errorMessage["title"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Title is Required!");
    } else if (!headhunterRegistration.professionalOverview) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Description is Required!");
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (handleValidate()) {
      const userData = JSON.parse(localStorage.getItem("MY_AUTH"));
      setLoading(true);

      let data = new FormData();
      data.append("userId", userData.user.userId);
      data.append(
        "emailId",
        userData.logindetails.emailId || userData.user.email
      );
      data.append("companyName", headhunterRegistration.companyName);
      data.append("contactFirstName", headhunterRegistration.firstName);
      data.append("contactLastName", headhunterRegistration.lastName);
      data.append(
        "userName",
        headhunterRegistration.firstName + " " + headhunterRegistration.lastName
      );
      data.append("country", headhunterRegistration.country);
      data.append("phoneNo", headhunterRegistration.phoneNo);
      data.append("userTitle", headhunterRegistration.userTitle);
      data.append(
        "professionalOverview",
        headhunterRegistration.professionalOverview
      );
      data.append("businessType", headhunterRegistration.businessType);
      if(headhunterRegistration.businessType === "others"){ 
      data.append("businessArea", headhunterRegistration.businessArea);
      }
      data.append("website", headhunterRegistration.optionalInfo.website);
      data.append(
        "noOfEmployee",
        headhunterRegistration.optionalInfo.noOfEmployee
      );
      data.append(
        "annualSales",
        headhunterRegistration.optionalInfo.annualSales
      );

      let userProfileFile = await createFile(
        headhunterRegistration.userPhoto.url,
        headhunterRegistration.userPhoto.fileName
      );
      data.append("userProfileFile", userProfileFile);
      if (headhunterRegistration.optionalInfo?.certificates[0]?.fileName) {
        data.append("certificates", "");
      }

      data.append("addressInfo.phoneNo", headhunterRegistration.phoneNo);

      data.append("addressInfo.addressId", lookUpData?.placeId);
      data.append("addressInfo.addressInfoId", lookUpData?.placeId);
      data.append("addressInfo.isMainAddress", true);
      data.append("addressInfo.address", lookUpData?.address);
      data.append("addressInfo.userCountry", lookUpData?.country);
      data.append("addressInfo.userCountryCode",lookUpData?.shortCode);
      data.append("addressInfo.userState", lookUpData.state);
      data.append("addressInfo.userCity", lookUpData.city);
      data.append("addressInfo.userPostalCode", "");
      

      if (headhunterRegistration.optionalInfo?.introductionVideo?.fileName) {
        data.append(
          "introductionVideo",
          headhunterRegistration.optionalInfo?.introductionVideo.fileDetail
        );
      }

      if (
        headhunterRegistration?.optionalInfo?.portfolio[0].fileName &&
        headhunterRegistration?.optionalInfo?.portfolio[0].portfolioImageFile
      ) {
        let newPortfolio = [...headhunterRegistration?.optionalInfo.portfolio];
        let array = [];

        await Promise.all(
          newPortfolio.map(async (item) => {
            if (item.fileName || item.portfolioImageFile) {
              let newFile = await createFile(
                item.portfolioImageFile,
                item.fileName
              );

              array.push({
                portfolioImageFile: newFile,
                description: item.description,
              });
            }
          })
        );

        // data.append("portfolios",array)

        array.map((item, index) => {
          data.append(
            `portfolios[${index}].portfolioImageFile`,
            item.portfolioImageFile
          );
          data.append(`portfolios[${index}].description`, item.description);
        });
      }

      if (headhunterRegistration.optionalInfo?.officePhoto[0]?.fileName) {
        let newOfficePhoto = [
          ...headhunterRegistration.optionalInfo.officePhoto,
        ];
        let filesArray = [];

        await Promise.all(
          newOfficePhoto.map(async (item) => {
            if (item.fileName) {
              let newFile = await createFile(item.fileDetail, item.fileName);
              filesArray.push({ newFile: newFile, fileName: item.fileName });
            }
          })
        );
        // data.append("officePhotos",filesArray)
        filesArray.map((item, index) => {
          data.append(`officePhotoFiles[${index}].file`, item.newFile);
          data.append(`officePhotoFiles[${index}].fileName`, item.fileName);
        });
      }

      if (!props.headhunterId) {
        let result = await request(
          ENDPOINT["CreateHeadhunter"],
          postMultipartFile(data)
        );
        if (result.success) {
          notifications.showSuccess("Your information saved successfully !");
          localStorage.setItem(
            "headhunterRegistrationInfo",
            JSON.stringify({
              step: "ConditionSetup",
              headhunterId: result.result,
            })
          );
          setLoading(false);
          props.handleNext("ConditionSetup", result.result);
          window.scrollTo({
            top: "0",
            behavior: "smooth",
          });
        } else {
          setLoading(false);
          notifications.showError(
            result.message || "Error while registering your account, Try again"
          );
        }
      } else {
        let result = await request(
          ENDPOINT["UpdateUserClient"],
          postOptions(data)
        );
        if (result.success) {
          notifications.showSuccess("Your information updated successfully !");
          localStorage.setItem(
            "headhunterRegistrationInfo",
            JSON.stringify({
              step: "CreateFreelancerBasicInfo",
              headhunterId: result.result.headhunterId,
            })
          );
          setLoading(false);
          props.handleNext("CreateFreelancerBasicInfo");
          window.scrollTo({
            top: "0",
            behavior: "smooth",
          });
        } else {
          setLoading(false);
          notifications.showError(
            result.message || "Error while update your account info, Try again"
          );
        }
      }
    }
  };

  const handleOptionalInfo = (value, type) => {
    let optionalInfo = headhunterRegistration.optionalInfo;
    if (type === "website") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, website: value },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }

    if (type === "noOfEmployee") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, noOfEmployee: value },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
    if (type === "annualSales") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, annualSales: value },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  const handleAddMorePortfolio = () => {
    if (headhunterRegistration?.optionalInfo?.portfolio?.length < 5) {
      let optionalInfo = headhunterRegistration.optionalInfo;

      let obj = {
        type: "optionalInfo",
        value: {
          ...optionalInfo,
          portfolio: optionalInfo.portfolio.concat([
            { description: "", portfolioImageFile: {}, fileName: "" },
          ]),
        },
      };
      console.log(obj, "optionalInfo.portfolio");
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };

  const handleRemoveMorePortfolio = (index) => {
    let newPortfolio = [...headhunterRegistration?.optionalInfo?.portfolio];
    newPortfolio.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };

  const handleRemoveMoreCertificate = (index) => {
    let newCertificates = [
      ...headhunterRegistration?.optionalInfo?.certificates,
    ];
    newCertificates.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        certificates: newCertificates,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };

  const handleRemoveClientCompany = (index) => {
    let newClientCompanies = [
      ...headhunterRegistration?.optionalInfo?.clientCompanies,
    ];
    newClientCompanies.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        clientCompanies: newClientCompanies,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };

  const handleAddMoreCertificate = () => {
    if (headhunterRegistration?.optionalInfo?.certificates.length < 5) {
      let optionalInfo = headhunterRegistration.optionalInfo;
      let obj = {
        type: "optionalInfo",
        value: {
          ...optionalInfo,
          certificates: [
            ...optionalInfo.certificates,
            ...[{ fileName: "", fileDetail: "" }],
          ],
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  
  const handleAddMoreClientCompany = () => {
    if (headhunterRegistration?.optionalInfo?.clientCompanies.length < 10) {
      let optionalInfo = headhunterRegistration.optionalInfo;
      let obj = {
        type: "optionalInfo",
        value: {
          ...optionalInfo,
          clientCompanies: [
            ...optionalInfo.clientCompanies,
            ...[ { companyName: "",
            companyUrl: "",
           companyLogo:''
           }],
          ],
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }else{
      notifications.showWarning("You can only add maximum 10 client companies ")
    }
  };
  const handleAddMoreOfficePhoto = () => {
    if (headhunterRegistration?.optionalInfo?.officePhoto?.length < 5) {
      let optionalInfo = headhunterRegistration.optionalInfo;
      let obj = {
        type: "optionalInfo",
        value: {
          ...optionalInfo,
          officePhoto: [
            ...optionalInfo.officePhoto,
            ...[{ fileName: "", fileDetail: "" }],
          ],
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  const handleRemoveMoreOfficePhoto = (index) => {
    let newOfficePhoto = [...headhunterRegistration?.optionalInfo?.officePhoto];
    newOfficePhoto.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        officePhoto: newOfficePhoto,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };
  const handleUpdatePortfolioDes = (value, index) => {
    let newPortfolio = [...headhunterRegistration?.optionalInfo?.portfolio];

    let objPor = {
      fileName: newPortfolio[index].fileName,
      portfolioImageFile: newPortfolio[index].portfolioImageFile,
      description: value,
    };
    newPortfolio.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };

  const handleUpdateClientName = (value, index) => {
    let newClientCompanies = [...headhunterRegistration?.optionalInfo?.clientCompanies];

    let objPor = {
      companyLogo: newClientCompanies[index].companyLogo,
      companyUrl: newClientCompanies[index].companyUrl,
      companyName: value,
    };
    newClientCompanies.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        clientCompanies: newClientCompanies,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };

  const handleUpdateClientCompanyUrl = (value, index) => {
    let newClientCompanies = [...headhunterRegistration?.optionalInfo?.clientCompanies];

    let objPor = {
      companyLogo: newClientCompanies[index].companyLogo,
      companyName: newClientCompanies[index].companyName,
      companyUrl: value,
    };
    newClientCompanies.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: {
        ...headhunterRegistration.optionalInfo,
        clientCompanies: newClientCompanies,
      },
    };
    dispatch(updateHeadHunterRegisterValue(obj));
  };


  const handlePortfolioUpdate = async (file, index, name) => {
    if (file || name) {
      let newPortfolio = [...headhunterRegistration?.optionalInfo?.portfolio];

      let objPor = {
        description: newPortfolio[index].description,
        portfolioImageFile: URL.createObjectURL(file),
        fileName: name,
      };

      newPortfolio.splice(index, 1, objPor);

      let obj = {
        type: "optionalInfo",
        value: {
          ...headhunterRegistration.optionalInfo,
          portfolio: newPortfolio,
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };

  const handleAddCertificatePhoto = async (file, index, name) => {
    if (file || name) {
      let newCertificates = [
        ...headhunterRegistration?.optionalInfo?.certificates,
      ];

      let objPor = {
        fileDetail: URL.createObjectURL(file),
        fileName: name,
      };

      newCertificates.splice(index, 1, objPor);

      let obj = {
        type: "optionalInfo",
        value: {
          ...headhunterRegistration.optionalInfo,
          certificates: newCertificates,
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  const handleAddCLientCompaniesLogo = async (file, index, name) => {
    if (file || name) {
      let newClientCompanies = [
        ...headhunterRegistration?.optionalInfo?.clientCompanies,
      ];

      let objPor = {
        companyLogo: URL.createObjectURL(file),
        companyName: newClientCompanies[index].companyName,
        companyName: newClientCompanies[index].companyUrl,
      };

      newClientCompanies.splice(index, 1, objPor);

      let obj = {
        type: "optionalInfo",
        value: {
          ...headhunterRegistration.optionalInfo,
          clientCompanies: newClientCompanies,
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };

  const handleOfficePhotoUpdate = async (file, index, name) => {
    if (file || name) {
      let newOfficePhoto = [
        ...headhunterRegistration?.optionalInfo?.officePhoto,
      ];

      let objPor = {
        fileDetail: URL.createObjectURL(file),
        fileName: name,
      };

      newOfficePhoto.splice(index, 1, objPor);

      let obj = {
        type: "optionalInfo",
        value: {
          ...headhunterRegistration.optionalInfo,
          officePhoto: newOfficePhoto,
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  const handleIntroductionVideo = async (file, name) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    let res = await request(
      `${ENDPOINT["UpdateVideo"]}`,
      postMultipartFile(formData)
    );
    if (res) {
      console.log(res, "res.result");
      setUploading(false);
      let introductionVideo = {
        fileName: name,
        fileDetail: res.s3Key,
      };
      let obj = {
        type: "optionalInfo",
        value: {
          ...headhunterRegistration.optionalInfo,
          introductionVideo: introductionVideo,
        },
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    } else {
      setUploading(false);
      notifications.showError("Error uploading image.");
    }
  };

  const handleUpdateClientRegistrationValue = (value, type) => {
    if (type === "userPhoto") {
      if (value) {
        let URLValue = URL.createObjectURL(value);
        let obj = {
          type: type,
          value: {
            fileName: value.name,
            url: URLValue,
          },
        };
        dispatch(updateHeadHunterRegisterValue(obj));
      } else {
        let obj = {
          type: type,
          value: {
            fileName: "",
            url: "",
          },
        };
        dispatch(updateHeadHunterRegisterValue(obj));
      }
    } else {
      let obj = {
        type: type,
        value: value,
      };
      dispatch(updateHeadHunterRegisterValue(obj));
    }
  };
  async function createFile(url, fileName) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], fileName, metadata);
    return file;
  } 

  return (
    <>
      <Skeleton count={10} isSkeletonLoading={isSkeletonLoading} />
      <section
        hidden={isSkeletonLoading}
        className="card_sec company-register-page post_form"
        style={{ padding: "0px" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="row mb-3">
              <div className="col-lg-3 col-md-3 user-profile-pic_headhunter_mobile">
                <div className="user-profile-pic">
                  {headhunterRegistration.userPhoto?.url ? (
                    <>
                      <img src={headhunterRegistration?.userPhoto?.url} />{" "}
                      <div
                        onClick={() => {
                          handleUpdateClientRegistrationValue("", "userPhoto");
                        }}
                        className="trash-bin-icon-for-image-change"
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </>
                  ) : (
                    <>
                      <label for="upload-photo">{languageType.COMPANY_LOGO_TEXT}</label>
                      <input
                        type="file"
                        name="user-photo"
                        id="upload-photo"
                        accept="jpg jpeg png PNG gif"
                        onChange={(e) => {
                          let errorMessage = {};

                          let size = e.target.files[0]
                            ? e.target.files[0].size
                            : 0;
                          if (size < 1048576) {
                            handleUpdateClientRegistrationValue(
                              e.target.files[0],
                              "userPhoto"
                            );
                            setErrorMessage({
                              ...errorMessage,
                              userPhoto: null,
                            });
                          } else {
                            notifications.showWarning(
                              "Please select a file size of less than 1 MB."
                            );
                          }
                          setErrorMessage({ ...errorMessage, userPhoto: null });
                        }}
                      />
                    </>
                  )}
                </div>
                {errorMessage.userPhoto && (
                  <div className="text-danger">{errorMessage.userPhoto}</div>
                )}
              </div>
              <div className="col-lg-9 col-md-9">
              <div className="form-group row mb-2">
                  <label className="col-sm-9 col-form-label yesno_box_headhunter_label"> 
                  Do you have any registered company in bearole? Please check yes<br/>
                  if you already have and use the company here to register as a headhunter
                  </label>
                  <div class="col-sm-3">
                    <div className="yesno_box_headhunter">
                      <div className="yesno_bodr_headhunter"> 
                        <div className="yes_no_headhunter d-flex"> 

                          <div className="yes_no_headhunter_customControl">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="registered-company"
                              name="registered-company"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="registered-company"
                            >
                              {languageType.YES_TEXT}
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="registered-company_one"
                              name="registered-company"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="registered-company_one"
                            >
                              {languageType.NO_TEXT}
                            </label>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label for="company-name" class="col-sm-4 col-form-label">
                    <span className="form-label-icon">
                      <img
                        width={32}
                        src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/company_chair.svg"}
                      />
                    </span>
                    {languageType.COMPANY_NAME}
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control "
                      id="company-name"
                      value={headhunterRegistration?.companyName}
                      name="company-name"
                      placeholder={languageType.COMPANY_NAME}
                      onChange={(e) => {
                        handleUpdateClientRegistrationValue(
                          e.currentTarget.value,
                          "companyName"
                        );
                        setErrorMessage({ ...errorMessage, companyName: null });
                      }}
                    />
                    {errorMessage.companyName && (
                      <div className="text-danger">
                        {errorMessage.companyName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="first-name" class="col-sm-4 col-form-label">
                    <span className="form-label-icon">
                      <img
                        width={20}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/add_contact_person.svg"
                        }
                      />
                    </span>
                    {languageType.CONTACT_PERSON}
                  </label>
                  <div class="col-sm-8">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 pr-lg-1 mb-3 mb-md-2">
                        <input
                          type="text"
                          placeholder={languageType.FIRST_NAME}
                          className="form-control "
                          id="first-name"
                          name="first-name"
                          value={headhunterRegistration?.firstName}
                          onChange={(e) => {
                            handleUpdateClientRegistrationValue(
                              e.currentTarget.value,
                              "firstName"
                            );
                            setErrorMessage({
                              ...errorMessage,
                              contactFirstName: null,
                            });
                          }}
                        />
                        {errorMessage.contactFirstName && (
                          <div className="text-danger">
                            {errorMessage.contactFirstName}
                          </div>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 pl-lg-1">
                        <input
                          type="text"
                          placeholder={languageType.LAST_NAME}
                          className="form-control "
                          id="last-name"
                          name="last-name"
                          value={headhunterRegistration?.lastName}
                          onChange={(e) => {
                            handleUpdateClientRegistrationValue(
                              e.currentTarget.value,
                              "lastName"
                            );
                            setErrorMessage({
                              ...errorMessage,
                              contactLastName: null,
                            });
                          }}
                        />
                        {errorMessage.contactLastName && (
                          <div className="text-danger">
                            {errorMessage.contactLastName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="country" class="col-sm-3 col-form-label headHunterCol_labelMobile">
                <span className="form-label-icon text-left">
                  <img
                    width={20}
                    src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/call_phone.svg"}
                  />
                </span>
                {languageType.MOBILE_NO}
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-lg-4 mb-3 mb-md-2">
                    <DropdownList
                      id={`CountryList}`} 
                      gray_bg 
                      className={`${ headhunterRegistration?.country ? "countryListActive" : "countryListnotactive" } `}
                      name={`CountryList`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder= {languageType.COUNTRY_TEXT}
                      value={headhunterRegistration?.country}
                      selectItem={(value) => {
                        handleUpdateClientRegistrationValue(value, "country");
                        setErrorMessage({ ...errorMessage, country: null });
                      }}
                      items={CountryList.map((country) => ({
                        text: country.name,
                        value: country.name,
                      }))}
                    /> 
                    {errorMessage["country"] && (
                      <div className="text-danger">
                        {errorMessage["country"]}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-2 mb-3 mb-md-2">
                    <input
                      type="text"
                      placeholder="+82"
                      className="form-control gray_bg  readonly"
                      id="country-code"
                      value={headhunterRegistration?.countryCode}
                      onChange={(e) => {
                        handleUpdateClientRegistrationValue(
                          e.target.value,
                          "countryCode"
                        );
                        setErrorMessage({
                          ...errorMessage,
                          countryCode: null,
                        });
                      }}
                      name="country-code"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control custom-form-control"
                        name="mobile-number"
                        id="mobile-number"
                        placeholder={languageType.MOBILE_NO}
                        value={headhunterRegistration?.phoneNo}
                        onChange={(e) => {
                          handleUpdateClientRegistrationValue(
                            e.target.value,
                            "phoneNo"
                          );
                          setErrorMessage({
                            ...errorMessage,
                            mobileNumber: null,
                          });
                        }}
                      />
                      <div class="input-group-append">
                        <button
                          onClick={() => {
                            if (props.location?.state?.phoneVerified) {
                            } else {
                              props.history.push({
                                pathname: "/mobile-verify",
                                state: {
                                  mobileNumber: headhunterRegistration?.phoneNo,
                                  path: "client-registration",
                                  country: headhunterRegistration.country,
                                  countryCode:
                                    headhunterRegistration.countryCode,
                                },
                              });
                            }
                          }}
                          class="btn btn-dark"
                          type="button"
                        >
                          {props.location?.state?.phoneVerified
                            ? "Verifies"
                            : "Verify"}
                        </button>
                      </div>
                    </div>
                    {errorMessage["mobileNumber"] && (
                      <div className="text-danger">
                        {errorMessage["mobileNumber"]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="business-category" class="col-sm-3 col-form-label headHunterCol_labelBusScope">
                <span className="form-label-icon text-left">
                  <img
                    width={25}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/briefcase.svg"
                    }
                  />
                </span>
                {languageType.BUSINESS_SCOPE}
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-lg-6">
                    <DropdownList
                      id={`business-category}`}
                      name={`business-category`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder={languageType.BUSINESS_SCOPE}
                      value={headhunterRegistration?.businessType}
                      selectItem={(value) => {
                        handleUpdateClientRegistrationValue(
                          value,
                          "businessType"
                        );
                        setErrorMessage({
                          ...errorMessage,
                          businessCategory: null,
                        });
                      }}
                      items={languageReducer.projectScopes}
                    />
                    {errorMessage.businessCategory && (
                      <div className="text-danger">
                        {errorMessage.businessCategory}
                      </div>
                    )}
                  </div>

                  {headhunterRegistration.businessType === "others" &&(
                  <div className="col-lg-6">
                    <input
                          type="text"
                          placeholder="Business Area"
                          className="form-control "
                          id={`businessArea`}
                          name={`businessArea`}
                          value={headhunterRegistration?.businessArea}
                          onChange={(e) => {
                            handleUpdateClientRegistrationValue(
                              e.currentTarget.value,
                              "businessArea"
                            ); 
                          }}
                      />  
                  </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="org-title" class="col-sm-3 col-form-label headHunterCol_labelTitle">
                <span className="form-label-icon text-left">
                  <img
                    width={22}
                    src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/favorite_page.svg"}
                  />
                </span>
                {languageType.TITLE_TEXT_PROFILE}
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  placeholder={languageType.DESCRIBE_YOURSELF_ORGANIZATION}
                  className="form-control"
                  id="org-title"
                  value={headhunterRegistration.userTitle}
                  name="org-title"
                  onChange={(e) => {
                    handleUpdateClientRegistrationValue(
                      e.target.value,
                      "userTitle"
                    );
                    setErrorMessage({ ...errorMessage, title: null });
                  }}
                />
                {errorMessage.title && (
                  <div className="text-danger">{errorMessage.title}</div>
                )}
                <textarea
                  placeholder={languageType.WRITE_INTRO_YOU_ORGANIZATION}
                  className="form-control mt-3"
                  id="org-introduction"
                  rows={"5"}
                  name="org-introduction"
                  value={headhunterRegistration?.professionalOverview}
                  onChange={(e) => {
                    handleUpdateClientRegistrationValue(
                      e.target.value,
                      "professionalOverview"
                    );
                    setErrorMessage({ ...errorMessage, description: null });
                  }}
                ></textarea>
                {errorMessage.description && (
                  <div className="text-danger">{errorMessage.description}</div>
                )}
              </div>
            </div>
            <OptionalInfoHeadHunter
             optionalInfo={headhunterRegistration?.optionalInfo}
             handleAddMoreClientCompany={handleAddMoreClientCompany}
             handleRemoveClientCompany={handleRemoveClientCompany}
             handleUpdateClientName={handleUpdateClientName}
             handleUpdateClientCompanyUrl={handleUpdateClientCompanyUrl}
             handleAddCLientCompaniesLogo={handleAddCLientCompaniesLogo}
            />
            <br />
            <OptionalInfo
              optionalInfo={headhunterRegistration?.optionalInfo}
              handleOptionalInfo={handleOptionalInfo}
              handleAddMorePortfolio={handleAddMorePortfolio}
              handleRemoveMorePortfolio={handleRemoveMorePortfolio}
              handleRemoveMoreCertificate={handleRemoveMoreCertificate}
          
              handleAddMoreCertificate={handleAddMoreCertificate}
          
              handleAddMoreOfficePhoto={handleAddMoreOfficePhoto}
              handleRemoveMoreOfficePhoto={handleRemoveMoreOfficePhoto}
              handleUpdatePortfolioDes={handleUpdatePortfolioDes}
              handlePortfolioUpdate={handlePortfolioUpdate}
              handleOfficePhotoUpdate={handleOfficePhotoUpdate}
              handleAddCertificatePhoto={handleAddCertificatePhoto}
              handleIntroductionVideo={handleIntroductionVideo}
            />
            <div className="text-right mt-5 upSaveBtn_headhunter">
              <button onClick={handleSubmit} className="btn btn-dark px-5">
                SAVE {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
              </button>
            </div>
          </div>
        </div>
      </section>
      <FileUploadLoader title={" Uploading new file..."} show={uploading} />
    </>
  );
}

export default HeadHunterProfile;

import React, { useState, useEffect } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import DropdownList from "../../../components/dropdowns/dropdownList";
import { CountryList } from "../../../utils/countrylist";
import Label from "../../../components/postProject/label";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import OptionalInfo from "../../../components/registration/optionalInfo";
import FileUploadLoader from "../../../components/loader/fileUpload";
import request from "../../../utils/request";
import { selectSubScopes } from "../../../utils/helpers";
import notifications from "../../../utils/notifications";
import { ENDPOINT } from "../../../utils/endpoint";
import { updateClientRegisterValue } from "../../../store/action/Client/registerClient";
import { useSelector, useDispatch } from "react-redux";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  postMultipartFileNew,
} from "../../../utils/httpConfig";
import { stockMarketsList } from "../../../utils/stockMarkets";
import Skeleton from "../../../components/skeleton/skeleton";
import { uploadImage, deleteImage } from "../../../services/uploadImages";
import { uploadVideo } from "../../../services/uploadVideo";
import { getProfileImage } from "../../../utils/getProfileUrl";

import "./clientRegistration.scss";

function ClientRegistrationStep(props) {
  const [errorMessage, setErrorMessage] = useState({});
  const [subScope, setSubScope] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const dispatch = useDispatch();

  const [fileUploading, setFileUploading] = useState({
    userProfileUrl: false,
  });

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
  const clientRegistration = useSelector((state) => state.clientRegistration);

  useEffect(() => {
    getClientDetail();
  }, [props.clientId]);

  // set default country and country code by location
  React.useEffect(() => {
    if (lookUpData?.country) {
      handleUpdateClientRegistrationValue(lookUpData?.country, "country");
      if (lookUpData?.shortCode) {
        let shortCode = CountryList.find(
          (item) => item.name === lookUpData?.country
        );
        if (shortCode) {
          handleUpdateClientRegistrationValue(
            shortCode.dial_code,
            "countryCode"
          );
        }
      }
    }
  }, [lookUpData]);

  const getClientDetail = async () => {
    if (props.clientId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetUserClient"]}?clientId=${props.clientId}`,
        getOptions()
      );
      if (result.success) {
        let clientDetail = result.result;
        setIsSkeletonLoading(false);
        handleUpdateClientRegistrationValue(
          clientDetail.userProfileUrl,
          "userProfileUrl"
        );
        handleUpdateClientRegistrationValue(
          clientDetail.firstName,
          "firstName"
        );
        handleUpdateClientRegistrationValue(clientDetail.lastName, "lastName");
        handleUpdateClientRegistrationValue(
          clientDetail.companyName,
          "companyName"
        );
        handleUpdateClientRegistrationValue(clientDetail.phoneNo, "phoneNo");
        handleUpdateClientRegistrationValue(
          clientDetail.userTitle,
          "userTitle"
        );
        handleUpdateClientRegistrationValue(
          clientDetail.professionalOverview,
          "professionalOverview"
        );
        handleUpdateClientRegistrationValue(
          clientDetail.serviceScopes &&
            clientDetail.serviceScopes[0]?.serviceScope,
          "businessType"
        );
        setSubScope(
          selectSubScopes(
            clientDetail.serviceScopes &&
              clientDetail.serviceScopes[0]?.serviceScope,
            languageReducer.projectScopes
          )
        );
        handleOptionalInfoFromResponse(
          clientDetail.linkedInProfileUrl,
          clientDetail.annualSales,
          clientDetail.noOfEmployee,
          clientDetail.website || "",
          clientDetail.portfolios,
          clientDetail.officePhotos,
          clientDetail.awardCertificates,
          clientDetail.introductionVideo
        );
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  const handleOptionalInfoFromResponse = (
    linkedInProfileUrl,
    annualSales,
    noOfEmployee,
    website,
    portfolios,
    officePhotos,
    awardCertificates,
    introductionVideo
  ) => {
    let optionalInfo = clientRegistration.optionalInfo;
    let obj = {
      type: "optionalInfo",
      value: {
        ...optionalInfo,
        linkedInProfileUrl,
        annualSales,
        noOfEmployee,
        website,
        portfolio:
          portfolios && portfolios.length > 0
            ? portfolios.map((item) => ({
                fileName: item.portfolioImage
                  .split("/")
                  [item.portfolioImage.split("/").length - 1].substr(
                    item.portfolioImage.split("/")[
                      item.portfolioImage.split("/").length - 1
                    ].length - 12
                  ),
                portfolioImage: item.portfolioImage,
                description: item.description,
              }))
            : clientRegistration.optionalInfo.portfolio,
        officePhoto:
          officePhotos && officePhotos.length > 0
            ? officePhotos.map((item) => ({
                fileName: item
                  .split("/")
                  [item.split("/").length - 1].substr(
                    item.split("/")[item.split("/").length - 1].length - 12
                  ),
                fileDetail: item,
              }))
            : clientRegistration.optionalInfo.officePhoto,
        certificates:
          awardCertificates && awardCertificates.length > 0
            ? awardCertificates.map((item) => ({
                fileName: item
                  .split("/")
                  [item.split("/").length - 1].substr(
                    item.split("/")[item.split("/").length - 1].length - 12
                  ),
                fileDetail: item,
              }))
            : clientRegistration.optionalInfo.certificates,
        introductionVideo: introductionVideo
          ? {
              fileName: introductionVideo
                .split("/")
                [introductionVideo.split("/").length - 1].substr(
                  introductionVideo.split("/")[
                    introductionVideo.split("/").length - 1
                  ].length - 12
                ),
              fileDetail: introductionVideo,
            }
          : "",
      },
    };

    dispatch(updateClientRegisterValue(obj));
  };

  React.useEffect(() => {
    if (props.location?.state?.phoneVerified) {
      let obj = {
        type: "phoneVerified",
        value: true,
      };
      dispatch(updateClientRegisterValue(obj));
    }
    getLocation();
    if (JSON.parse(localStorage.MY_AUTH)?.user?.profileImage) {
      handleUpdateClientRegistrationValue(
        JSON.parse(localStorage.MY_AUTH)?.user?.profileImage,
        "userProfileUrl"
      );
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((showPosition) => {
        let longitude = showPosition.coords.longitude;
        let latitude = showPosition.coords.latitude;
        setCurrentLocation(`${latitude},${longitude}`);
      });
    } else {
    }
  };

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
          (cl) => cl.code === lookUpData.shortCode
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
    if (!clientRegistration.userProfileUrl) {
      formIsValid = false;
      errorMessage["userProfileUrl"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("User Photo is Required!");
    } else if (!clientRegistration.companyName) {
      formIsValid = false;
      errorMessage["companyName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Company name is Required!");
    } else if (!clientRegistration.firstName) {
      formIsValid = false;
      errorMessage["contactFirstName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact first name is Required!");
    } else if (!clientRegistration.lastName) {
      formIsValid = false;
      errorMessage["contactLastName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact last name is Required!");
    } else if (!clientRegistration.country) {
      formIsValid = false;
      errorMessage["country"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Country is Required!");
    } else if (!clientRegistration.countryCode) {
      formIsValid = false;
      errorMessage["countryCode"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("country Code is Required!");
    } else if (!clientRegistration.phoneNo) {
      formIsValid = false;
      errorMessage["mobileNumber"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Mobile number is Required!");
    } else if (!clientRegistration.phoneVerified) {
      formIsValid = false;
      errorMessage["mobileNumber"] = "Phone number verification Required";
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Phone number verification Required!");
    }  else if (!clientRegistration.userTitle) {
      formIsValid = false;
      errorMessage["title"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Title is Required!");
    } else if (!clientRegistration.businessType) {
      formIsValid = false;
      errorMessage["businessType"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "110",
        behavior: "smooth",
      });
      notifications.showWarning("Business area is Required!");
    } else if (!clientRegistration.professionalOverview) {
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
      let params = {
        clientId: props.clientId?props.clientId:'',
        userId: userData.user.userId,
        emailId: userData.logindetails.emailId || userData.user.email,
        companyName: clientRegistration.companyName,
        firstName: clientRegistration.firstName,
        lastName: clientRegistration.lastName,
        country: clientRegistration.country,
        phoneNo: clientRegistration.phoneNo,
        userTitle: clientRegistration.userTitle,
        professionalOverview: clientRegistration.professionalOverview,
        userProfileUrl: clientRegistration.userProfileUrl,
        website: clientRegistration.optionalInfo.website,
        noOfEmployee: clientRegistration.optionalInfo.noOfEmployee,
        annualSales: clientRegistration.optionalInfo.annualSales,
        linkedInProfileUrl: clientRegistration.optionalInfo.linkedInProfileUrl,
        addressInfo: {
          addressId: lookUpData?.placeId,
          addressInfoId: lookUpData?.placeId,
          isMainAddress: true,
          phoneNo: clientRegistration.phoneNo,
          address: lookUpData?.address,
          userCountry: lookUpData?.country,
          userCountryCode: clientRegistration.countryCode,
          userState: lookUpData.state,
          userCity: lookUpData.city,
          userPostalCode: "",
        },
        introductionVideo:
          clientRegistration.optionalInfo?.introductionVideo?.fileDetail,
        location: currentLocation,
        awardCertificates:
          clientRegistration?.optionalInfo?.certificates[0].fileName &&
          clientRegistration?.optionalInfo?.certificates[0].fileDetail
            ? clientRegistration?.optionalInfo.certificates.map(
                (item) => item.fileDetail
              )
            : [],
        officePhotos: clientRegistration.optionalInfo?.officePhoto[0]?.fileName
          ? clientRegistration.optionalInfo?.officePhoto.map(
              (item) => item.fileDetail
            )
          : [],
        portfolios:
          clientRegistration?.optionalInfo?.portfolio[0].fileName &&
          clientRegistration?.optionalInfo?.portfolio[0].portfolioImage
            ? clientRegistration?.optionalInfo.portfolio
            : [],
        serviceScopes: [
          {
            serviceScope: clientRegistration.businessType,
            subServiceScope: [],
          },
        ],
      };

      if (!props.clientId) {
        let result = await request(
          ENDPOINT["CreateUserClient"],
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess("Your information saved successfully !");
          localStorage.setItem(
            "clientRegistrationInfo",
            JSON.stringify({
              step: "ConfirmationStep",
              clientId: result.result,
            })
          );
          setLoading(false);
          props.handleNext("ConfirmationStep", result.result);
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
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess("Your information updated successfully !");
          localStorage.setItem(
            "clientRegistrationInfo",
            JSON.stringify({
              step: "ConfirmationStep",
              clientId: result.result.clientId,
            })
          );
          setLoading(false);
          props.handleNext("ConfirmationStep");
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
    let optionalInfo = clientRegistration.optionalInfo;
    if (type === "website") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, website: value },
      };
      dispatch(updateClientRegisterValue(obj));
    }

    if (type === "noOfEmployee") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, noOfEmployee: value },
      };
      dispatch(updateClientRegisterValue(obj));
    }
    if (type === "annualSales") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, annualSales: value },
      };
      dispatch(updateClientRegisterValue(obj));
    }
    if (type === "linkedInProfileUrl") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, linkedInProfileUrl: value },
      };
      dispatch(updateClientRegisterValue(obj));
    }
  };
  const handleAddMorePortfolio = () => {
    if (clientRegistration?.optionalInfo?.portfolio?.length < 5) {
      let optionalInfo = clientRegistration.optionalInfo;

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
      dispatch(updateClientRegisterValue(obj));
    }
  };

  const handleRemoveMorePortfolio = async (index) => {
    let newPortfolio = [...clientRegistration?.optionalInfo?.portfolio];
    if (newPortfolio[index].portfolioImage) {
      await deleteImage(newPortfolio[index].portfolioImage);
    }
    newPortfolio.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: { ...clientRegistration.optionalInfo, portfolio: newPortfolio },
    };
    dispatch(updateClientRegisterValue(obj));
  };

  const handleRemoveMoreCertificate = async (index) => {
    let newCertificates = [...clientRegistration?.optionalInfo?.certificates];
    if (newCertificates[index].fileDetail) {
      await deleteImage(newCertificates[index].fileDetail);
    }
    newCertificates.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...clientRegistration.optionalInfo,
        certificates: newCertificates,
      },
    };
    dispatch(updateClientRegisterValue(obj));
  };

  const handleAddMoreCertificate = () => {
    if (clientRegistration?.optionalInfo?.certificates.length < 5) {
      let optionalInfo = clientRegistration.optionalInfo;
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
      dispatch(updateClientRegisterValue(obj));
    }
  };
  const handleAddMoreOfficePhoto = () => {
    if (clientRegistration?.optionalInfo?.officePhoto?.length < 5) {
      let optionalInfo = clientRegistration.optionalInfo;
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
      dispatch(updateClientRegisterValue(obj));
    }
  };
  const handleRemoveMoreOfficePhoto = async (index) => {
    let newOfficePhoto = [...clientRegistration?.optionalInfo?.officePhoto];
    if (newOfficePhoto[index].fileDetail) {
      await deleteImage(newOfficePhoto[index].fileDetail);
    }
    newOfficePhoto.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...clientRegistration.optionalInfo,
        officePhoto: newOfficePhoto,
      },
    };
    dispatch(updateClientRegisterValue(obj));
  };
  const handleUpdatePortfolioDes = (value, index) => {
    let newPortfolio = [...clientRegistration?.optionalInfo?.portfolio];

    let objPor = {
      fileName: newPortfolio[index].fileName,
      portfolioImageFile: newPortfolio[index].portfolioImageFile,
      description: value,
    };
    newPortfolio.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: { ...clientRegistration.optionalInfo, portfolio: newPortfolio },
    };
    dispatch(updateClientRegisterValue(obj));
  };

  const handlePortfolioUpdate = async (file, index, name) => {
    if (file || name) {
      let newPortfolio = [...clientRegistration?.optionalInfo?.portfolio];
      setUploading(true);
      let response = await uploadImage(file, "portfolio");
      if (response.success) {
        setUploading(false);
        let objPor = {
          description: newPortfolio[index].description,
          portfolioImage: response.result.s3Key,
          fileName: name,
        };

        newPortfolio.splice(index, 1, objPor);

        let obj = {
          type: "optionalInfo",
          value: {
            ...clientRegistration.optionalInfo,
            portfolio: newPortfolio,
          },
        };
        dispatch(updateClientRegisterValue(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleAddCertificatePhoto = async (file, index, name) => {
    if (file || name) {
      let newCertificates = [...clientRegistration?.optionalInfo?.certificates];

      setUploading(true);

      let response = await uploadImage(file, "portfolio");
      if (response.success) {
        setUploading(false);
        let objPor = {
          fileDetail: response.result.s3Key,
          fileName: name,
        };

        newCertificates.splice(index, 1, objPor);

        let obj = {
          type: "optionalInfo",
          value: {
            ...clientRegistration.optionalInfo,
            certificates: newCertificates,
          },
        };
        dispatch(updateClientRegisterValue(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleOfficePhotoUpdate = async (file, index, name) => {
    if (file || name) {
      let newOfficePhoto = [...clientRegistration?.optionalInfo?.officePhoto];
      setUploading(true);
      let response = await uploadImage(file, "photos");
      if (response.success) {
        setUploading(false);
        let objPor = {
          fileDetail: response.result.s3Key,
          fileName: name,
        };

        newOfficePhoto.splice(index, 1, objPor);

        let obj = {
          type: "optionalInfo",
          value: {
            ...clientRegistration.optionalInfo,
            officePhoto: newOfficePhoto,
          },
        };
        dispatch(updateClientRegisterValue(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleIntroductionVideo = async (file, name) => {
    setUploading(true);
    let response = await uploadImage(file, "profilevideo");
    if (response) {
      setUploading(false);
      let introductionVideo = {
        fileName: name,
        fileDetail: response.result.s3Key,
      };
      let obj = {
        type: "optionalInfo",
        value: {
          ...clientRegistration.optionalInfo,
          introductionVideo: introductionVideo,
        },
      };
      dispatch(updateClientRegisterValue(obj));
    } else {
      notifications.showError(response || "Error uploading video.");
      setUploading(false);
    }
  };

  const handleUpdateClientRegistrationValue = (value, type) => {
    let obj = {
      type: type,
      value: value,
    };
    dispatch(updateClientRegisterValue(obj));
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

  const handleUploadImage = async (file) => {
    setFileUploading({ ...fileUploading, userProfileUrl: true });
    let response = await uploadImage(file, "profileimage");
    if (response.success) {
      handleUpdateClientRegistrationValue(
        response.result.s3Key,
        "userProfileUrl"
      );
      setFileUploading({ ...fileUploading, userProfileUrl: false });
    } else {
      notifications.showError(response || "Error uploading image.");
      setFileUploading({ ...fileUploading, userProfileUrl: false });
    }
  };

  const handleDeleteImage = async (key) => {
    if (key.slice(0, 5) != "https") {
      await deleteImage(key);
    }
  };


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
              <div className="col-lg-3 col-md-4">
                <div className="user-profile-pic">
                  {clientRegistration.userProfileUrl ? (
                    <>
                      <img
                        style={{ cursor: "pointer" }}
                        src={getProfileImage(
                          clientRegistration?.userProfileUrl
                        )}
                      />{" "}
                      <div
                        onClick={() => {
                          handleDeleteImage(clientRegistration?.userProfileUrl);
                          handleUpdateClientRegistrationValue(
                            "",
                            "userProfileUrl"
                          );
                        }}
                        className="trash-bin-icon-for-image-change"
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </>
                  ) : (
                    <>
                      <label for="upload-photo">
                        {languageType.USER_PHOTO}
                      </label>
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
                            handleUploadImage(e.target.files[0]);
                            setErrorMessage({
                              ...errorMessage,
                              userProfileUrl: null,
                            });
                          } else {
                            notifications.showWarning(
                              "Please select a file size of less than 1 MB."
                            );
                          }
                          setErrorMessage({
                            ...errorMessage,
                            userProfileUrl: null,
                          });
                        }}
                      />
                    </>
                  )}
                </div>
                {fileUploading.userProfileUrl && (
                  <div>
                    Uploading <i className="fa fa-spinner fa-spin"></i>
                  </div>
                )}
                {errorMessage.userProfileUrl && (
                  <div className="text-danger">
                    {errorMessage.userProfileUrl}
                  </div>
                )}
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="form-group row mb-3">
                  <label for="company-name" class="col-sm-4 col-form-label">
                    <span className="form-label-icon">
                      <img
                        width={32}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/company_chair.svg"
                        }
                      />
                    </span>
                    {languageType.COMPANY_NAME}
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control "
                      id="company-name"
                      value={clientRegistration?.companyName}
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
                      <div className="col-lg-6 col-md-6 pr-lg-1 mb-2 mb-md-0">
                        <input
                          type="text"
                          placeholder={languageType.FIRST_NAME}
                          className="form-control "
                          id="first-name"
                          name="first-name"
                          value={clientRegistration?.firstName}
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
                          value={clientRegistration?.lastName}
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
              <label for="country" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={20}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/call_phone.svg"
                    }
                  />
                </span>
                {languageType.MOBILE_NO}
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-lg-4 mb-2 mb-md-0">
                    <DropdownList
                      id={`CountryList}`}
                      gray_bg
                      style={{ background: "#f3f2f2" }}
                      name={`CountryList`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder="Country"
                      value={clientRegistration?.country}
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
                  <div className="col-lg-2 mb-2 mb-md-0">
                    <input
                      type="text"
                      placeholder="+82"
                      className="form-control gray_bg  readonly"
                      id="country-code"
                      value={clientRegistration?.countryCode}
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
                        value={clientRegistration?.phoneNo}
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
                                  mobileNumber: clientRegistration?.phoneNo,
                                  path: "client-registration",
                                  country: clientRegistration.country,
                                  countryCode: clientRegistration.countryCode,
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
              <label for="business-category" class="col-sm-3 col-form-label">
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
                      enableAutoCompleteSearch
                      enableAutoComplete
                      placeHolder={languageType.BUSINESS_SCOPE}
                      value={clientRegistration?.businessType}
                      selectItem={(value) => {
                        handleUpdateClientRegistrationValue(
                          value,
                          "businessType"
                        );
                        setSubScope(
                          selectSubScopes(value, languageReducer.projectScopes)
                        );
                        setErrorMessage({
                          ...errorMessage,
                          businessCategory: null,
                        });
                      }}
                      items={languageReducer.projectScopes}
                    />
                    {errorMessage.businessType && (
                      <div className="text-danger">
                        {errorMessage.businessType}
                      </div>
                    )}
                  </div>
                </div>
                <br />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="org-title" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={22}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/favorite_page.svg"
                    }
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
                  value={clientRegistration.userTitle}
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
                  value={clientRegistration?.professionalOverview}
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
            <OptionalInfo
              optionalInfo={clientRegistration?.optionalInfo}
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
            <div className="text-right mt-5">
              <button onClick={handleSubmit} className="btn btn-dark px-5">
                {languageType.SAVE}{" "}
                {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
              </button>
            </div>
          </div>
        </div>
      </section>
      <FileUploadLoader title={" Uploading new file..."} show={uploading} />
    </>
  );
}

export default ClientRegistrationStep;

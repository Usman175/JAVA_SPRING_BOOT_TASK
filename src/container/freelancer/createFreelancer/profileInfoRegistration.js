import React, { useState, useEffect } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import DropdownList from "../../../components/dropdowns/dropdownList";
import { CountryList } from "../../../utils/countrylist";
import Label from "../../../components/postProject/label";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import OptionalInfo from "../../../components/registration/optionalInfo";
import { GetAmountPerDay, GetAmountPerHour } from "../../../utils/currency";
import FileUploadLoader from "../../../components/loader/fileUpload";
import request from "../../../utils/request";
import notifications from "../../../utils/notifications";
import v4 from "uuid";
import { DocumentTypeSelector } from "../../../components/forms/index.js";
import { ENDPOINT } from "../../../utils/endpoint";
import { updateFreelancerProfileRegister } from "../../../store/action/freelancer/freelancerRegistration";
import { useSelector, useDispatch } from "react-redux";
import CreateFreelancerDocumentPicker from "../../../components/freelancer/createFreelancerDocumentPicker";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  postMultipartFileNew,
} from "../../../utils/httpConfig";
import { stockMarketsList } from "../../../utils/stockMarkets";
import ProfileInfoRegSkeleton from "./profileInfoRegSkeleton";
import Skeleton from "../../../components/skeleton/skeleton";
import { uploadImage, deleteImage } from "../../../services/uploadImages";
import { getProfileImage } from "../../../utils/getProfileUrl";
import { uploadVideo } from "../../../services/uploadVideo";

import "./createFreelancer.scss";

function FreelancerProfile(props) {
  const [errorMessage, setErrorMessage] = useState({});
  const [languageProficiency, setLanguageProficiency] = useState([
    {
      id: v4(),
      language: "",
      level: "",
      languageTestCertificate: "",
    },
  ]);
  const [flag, setFlag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
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
  const authUser = useSelector((state) => state.authReducer?.myAuth);
  const freelancerRegistration = useSelector(
    (state) => state.freelancerRegistration
  );

  const addMoreLanguageProficiency = () => {
    let newLanguageProficiency = [
      ...freelancerRegistration?.languageProficiency,
    ];
    newLanguageProficiency.push({
      id: v4(),
      language: "",
      level: "",
      languageTestCertificate: "",
    });
    let obj = {
      type: "languageProficiency",
      value: newLanguageProficiency,
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const deleteLanguageProficiency = (index) => {
    let newLanguageProficiency = [
      ...freelancerRegistration?.languageProficiency,
    ];
    newLanguageProficiency.splice(index, 1);
    let obj = {
      type: "languageProficiency",
      value: newLanguageProficiency,
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };
  useEffect(() => {
    // bindCountry();
    getFreelancerDetail();
  }, []);
  const getFreelancerDetail = async () => {
    if (props.userId || authUser?.user?.userId) {
      setIsSkeletonLoading(true);
      let result;
      if (!localStorage.IndividaulFreelancerRegistrationInfo) {
        result = await request(
          `${ENDPOINT["GetIndividualFreelancerByUserId"]}?userId=${authUser?.user?.userId}`,
          getOptions()
        );
      } else {
        result = await request(
          `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${props.userId}`,
          getOptions()
        );
      }

      if (result.success && result.result) {
        let freelancerDetail = result.result;
        setIsRegistered(freelancerDetail?.individualFreelancerId);
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.userProfileUrl,
          "userProfileUrl"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.firstName,
          "firstName"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.lastName,
          "lastName"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.iDType,
          "documentType"
        );

        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.userTitle,
          "userTitle"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.professionalOverview,
          "professionalOverview"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.country,
          "country"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail?.addressInfo?.phoneNo,
          "phoneNo"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.currencyCode,
          "currencyCode"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.profileDailyRate,
          "profileDailyRate"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.profileHourlyRate,
          "profileHourlyRate"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.availablePerWeek,
          "availablePerWeek"
        );
        handleUpdateFreelancerRegistrationValue(
          freelancerDetail.kycProvePhoto,
          "kycProvePhoto"
        );
        if (
          freelancerDetail.languages &&
          freelancerDetail.languages.length > 0
        ) {
          handleUpdateFreelancerRegistrationValue(
            freelancerDetail.languages,
            "languageProficiency"
          );
        }
        handleOptionalInfoFromResponse(
          freelancerDetail.linkedInProfileUrl,
          freelancerDetail.annualSales,
          freelancerDetail.noOfEmployee,
          freelancerDetail.website || "",
          freelancerDetail.portfolios,
          freelancerDetail.officePhotos,
          freelancerDetail.awardCertificates,
          freelancerDetail.introductionVideo
        );

        setIsSkeletonLoading(false);
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
    let optionalInfo = freelancerRegistration.optionalInfo;
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
            : freelancerRegistration.optionalInfo.portfolio,
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
            : freelancerRegistration.optionalInfo.officePhoto,
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
            : freelancerRegistration.optionalInfo.certificates,
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

    dispatch(updateFreelancerProfileRegister(obj));
  };

  React.useEffect(() => {
    if (props.location?.state?.phoneVerified) {
      let obj = {
        type: "phoneVerified",
        value: true,
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }
    getLocation();
    if (JSON.parse(localStorage.MY_AUTH)?.user?.profileImage) {
      handleUpdateFreelancerRegistrationValue(
        JSON.parse(localStorage.MY_AUTH)?.user?.profileImage,
        "userProfileUrl"
      );
    }
  }, []);

  // set default country and country code by location
  React.useEffect(() => {
    if (lookUpData?.country) {
      handleUpdateFreelancerRegistrationValue(lookUpData?.country, "country");
      if (lookUpData?.shortCode) {
        let shortCode = CountryList.find(
          (item) => item.name === lookUpData?.country
        );
        if (shortCode) {
          handleUpdateFreelancerRegistrationValue(
            shortCode.dial_code,
            "countryCode"
          );
        }
      }
    }
  }, [lookUpData]);

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
        handleUpdateFreelancerRegistrationValue(
          country?.dial_code,
          "countryCode"
        );
        handleUpdateFreelancerRegistrationValue(country?.name, "country");
      } else {
        alert(languageType.NO_COUNTRY);
      }
    } else {
      alert(languageType.NO_COUNTRY);
    }
  };

  const handleValidate = () => {
    let formIsValid = true;
    let errorMessage = {};
    if (!freelancerRegistration.userProfileUrl) {
      formIsValid = false;
      errorMessage["userProfileUrl"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.USER_PHOTO_REQUIRED);
    } else if (!freelancerRegistration.firstName) {
      formIsValid = false;
      errorMessage["contactFirstName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.CONTACT_FIRST_NAME_REQUIRED_TEXT);
    } else if (!freelancerRegistration.lastName) {
      formIsValid = false;
      errorMessage["contactLastName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.CONTACT_LAST_NAME_REQUIRED_TEXT);
    } else if (!freelancerRegistration.country) {
      formIsValid = false;
      errorMessage["country"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.COUNTRY_REQUIRED_TEXT);
    } else if (!freelancerRegistration.countryCode) {
      formIsValid = false;
      errorMessage["countryCode"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.COUNTRY_CODE_REQUIRED_TEXT);
    } else if (!freelancerRegistration.phoneNo) {
      formIsValid = false;
      errorMessage["mobileNumber"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.MOBILE_NO_REQUIRED_TEXT);
    } /* else if (!freelancerRegistration.phoneVerified) {
      formIsValid = false;
      errorMessage["mobileNumber"] = "Phone number verification Required";
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Phone number verification Required!");
    } */ else if (!freelancerRegistration.currencyCode) {
      formIsValid = false;
      errorMessage["currencyCode"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.CURRENCY_REQUIRED_TEXT);
    } else if (!freelancerRegistration.profileDailyRate) {
      formIsValid = false;
      errorMessage["profileDailyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.PROFILE_DAILY_RATE_REQUIRED);
    } else if (!freelancerRegistration.profileHourlyRate) {
      formIsValid = false;
      errorMessage["profileHourlyRate"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.PROFILE_HOURLY_RATE_REQUIRED);
    } else if (!freelancerRegistration.availablePerWeek) {
      formIsValid = false;
      errorMessage["availablePerWeek"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.AVAILABLE_PER_WEEK_REQUIRED);
    } else if (!freelancerRegistration.userTitle) {
      formIsValid = false;
      errorMessage["title"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.TITLE_TEXT_PROFILE_REQUIRED);
    } else if (!freelancerRegistration.professionalOverview) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.DESCRIBE_REQUIRED_TEXT);
    } else if (!freelancerRegistration.documentType) {
      formIsValid = false;
      errorMessage["documentType"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.DOCUMENT_TYPE_REQUIRED);
    } else if (!freelancerRegistration.kycProvePhoto) {
      formIsValid = false;
      errorMessage["kycProvePhoto"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning(languageType.KYC_PHOTO_REQUIRED);
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (handleValidate()) {
      const userData = JSON.parse(localStorage.getItem("MY_AUTH"));
      setLoading(true);
      let params = {
        individualFreelancerId: props.userId
          ? props.userId
          : isRegistered
          ? isRegistered
          : "",
        userId: userData.user.userId,
        emailId: userData.logindetails?.emailId || userData.user.email,
        firstName: freelancerRegistration.firstName,
        lastName: freelancerRegistration.lastName,
        userName:
          freelancerRegistration.firstName +
          " " +
          freelancerRegistration.lastName,
        iDType: freelancerRegistration.documentType,
        userTitle: freelancerRegistration.userTitle,
        professionalOverview: freelancerRegistration.professionalOverview,
        country: freelancerRegistration.country,
        phoneNo: freelancerRegistration.phoneNo,
        currencyCode: freelancerRegistration.currencyCode,
        profileDailyRate: freelancerRegistration.profileDailyRate,
        profileHourlyRate: freelancerRegistration.profileHourlyRate,
        website: freelancerRegistration.optionalInfo.website,
        noOfEmployee: freelancerRegistration.optionalInfo.noOfEmployee,
        annualSales: freelancerRegistration.optionalInfo.annualSales,
        linkedInProfileUrl:
          freelancerRegistration.optionalInfo.linkedInProfileUrl,
        introductionVideo:
          freelancerRegistration.optionalInfo?.introductionVideo?.fileDetail,
        location: currentLocation,
        availablePerWeek: freelancerRegistration.availablePerWeek,
        kycProvePhoto: freelancerRegistration.kycProvePhoto,
        userProfileUrl: freelancerRegistration.userProfileUrl,
        languages:
          freelancerRegistration.languageProficiency?.length > 0
            ? freelancerRegistration.languageProficiency
            : "",
        officePhotos: freelancerRegistration.optionalInfo?.officePhoto[0]
          ?.fileName
          ? freelancerRegistration.optionalInfo?.officePhoto.map(
              (item) => item.fileDetail
            )
          : [],
        awardCertificates:
          freelancerRegistration?.optionalInfo?.certificates[0].fileName &&
          freelancerRegistration?.optionalInfo?.certificates[0].fileDetail
            ? freelancerRegistration?.optionalInfo.certificates.map(
                (item) => item.fileDetail
              )
            : [],
        addressInfo: {
          addressId: lookUpData?.placeId,
          addressInfoId: lookUpData?.placeId,
          isMainAddress: true,
          phoneNo: freelancerRegistration.phoneNo,
          address: lookUpData?.address,
          userCountry: lookUpData?.country,
          userCountryCode: freelancerRegistration.countryCode,
          userState: lookUpData.state,
          userCity: lookUpData.city,
          userPostalCode: "",
        },
        portfolios:
          freelancerRegistration?.optionalInfo?.portfolio[0].fileName &&
          freelancerRegistration?.optionalInfo?.portfolio[0].portfolioImage
            ? freelancerRegistration?.optionalInfo.portfolio
            : [],
      };

      if (!props.userId && !isRegistered) {
        let result = await request(
          ENDPOINT["CreateFreelancerUser"],
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess(languageType.INFO_SAVED_SUCCESS_TEXT);
          localStorage.setItem(
            "IndividaulFreelancerRegistrationInfo",
            JSON.stringify({
              step: "SkillAndBusinessStep",
              userId: result.result,
            })
          );
          props.handleNext("SkillAndBusinessStep", result.result);
          setLoading(false);
          window.scrollTo({
            top: "0",
            behavior: "smooth",
          });
        } else {
          setLoading(false);
          notifications.showError(
            result.message || languageType.ERROR_REGIST_ACCOUNT_TEXT
          );
        }
      } else {
        let result = await request(
          ENDPOINT["UpdateFreelancer"],
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess(languageType.INFO_UPDATED_SUCCESS_TEXT);
          localStorage.setItem(
            "IndividaulFreelancerRegistrationInfo",
            JSON.stringify({
              step: "SkillAndBusinessStep",
              userId: result.result.individualFreelancerId,
            })
          );
          setLoading(false);
          props.handleNext(
            "SkillAndBusinessStep",
            result.result.individualFreelancerId
          );
          window.scrollTo({
            top: "0",
            behavior: "smooth",
          });
        } else {
          setLoading(false);
          notifications.showError(
            result.message || languageType.ERROR_UPDATE_ACCOUNT_TEXT
          );
        }
      }
    }
  };

  const handleOptionalInfo = (value, type) => {
    let optionalInfo = freelancerRegistration.optionalInfo;
    if (type === "website") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, website: value },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }

    if (type === "noOfEmployee") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, noOfEmployee: value },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }
    if (type === "annualSales") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, annualSales: value },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }
    if (type === "linkedInProfileUrl") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, linkedInProfileUrl: value },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }
  };
  const handleAddMorePortfolio = () => {
    if (freelancerRegistration?.optionalInfo?.portfolio?.length < 5) {
      let optionalInfo = freelancerRegistration.optionalInfo;

      let obj = {
        type: "optionalInfo",
        value: {
          ...optionalInfo,
          portfolio: optionalInfo.portfolio.concat([
            { description: "", portfolioImage: {}, fileName: "" },
          ]),
        },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    }
  };

  const handleRemoveMorePortfolio = async (index) => {
    let newPortfolio = [...freelancerRegistration?.optionalInfo?.portfolio];

    if (newPortfolio[index].portfolioImage) {
      await deleteImage(newPortfolio[index].portfolioImage);
    }

    newPortfolio.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...freelancerRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const handleRemoveMoreCertificate = async (index) => {
    let newCertificates = [
      ...freelancerRegistration?.optionalInfo?.certificates,
    ];
    if (newCertificates[index].fileDetail) {
      await deleteImage(newCertificates[index].fileDetail);
    }
    newCertificates.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...freelancerRegistration.optionalInfo,
        certificates: newCertificates,
      },
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const handleAddMoreCertificate = () => {
    if (freelancerRegistration?.optionalInfo?.certificates.length < 5) {
      let optionalInfo = freelancerRegistration.optionalInfo;
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
      dispatch(updateFreelancerProfileRegister(obj));
    }
  };
  const handleAddMoreOfficePhoto = () => {
    if (freelancerRegistration?.optionalInfo?.officePhoto?.length < 5) {
      let optionalInfo = freelancerRegistration.optionalInfo;
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
      dispatch(updateFreelancerProfileRegister(obj));
    }
  };

  const handleRemoveMoreOfficePhoto = async (index) => {
    let newOfficePhoto = [...freelancerRegistration?.optionalInfo?.officePhoto];
    if (newOfficePhoto[index].fileDetail) {
      await deleteImage(newOfficePhoto[index].fileDetail);
    }
    newOfficePhoto.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...freelancerRegistration.optionalInfo,
        officePhoto: newOfficePhoto,
      },
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const handleUpdateLanguage = (value, index) => {
    let newLanguageProficiency = [
      ...freelancerRegistration?.languageProficiency,
    ];

    let objPor = {
      id: newLanguageProficiency[index]?.id,
      language: value,
      level: newLanguageProficiency[index].level,
      languageTestCertificate: "",
    };
    newLanguageProficiency.splice(index, 1, objPor);

    let obj = {
      type: "languageProficiency",
      value: newLanguageProficiency,
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };
  const handleUpdateLanguageProficiency = (value, index) => {
    let newLanguageProficiency = [
      ...freelancerRegistration?.languageProficiency,
    ];

    let objPor = {
      id: newLanguageProficiency[index]?.id,
      language: newLanguageProficiency[index].language,
      level: value,
      languageTestCertificate: "",
    };
    newLanguageProficiency.splice(index, 1, objPor);

    let obj = {
      type: "languageProficiency",
      value: newLanguageProficiency,
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const handleUpdatePortfolioDes = (value, index) => {
    let newPortfolio = [...freelancerRegistration?.optionalInfo?.portfolio];

    let objPor = {
      fileName: newPortfolio[index].fileName,
      portfolioImage: newPortfolio[index].portfolioImage,
      description: value,
    };
    newPortfolio.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: {
        ...freelancerRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateFreelancerProfileRegister(obj));
  };

  const handlePortfolioUpdate = async (file, index, name) => {
    if (file || name) {
      let newPortfolio = [...freelancerRegistration?.optionalInfo?.portfolio];
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
            ...freelancerRegistration.optionalInfo,
            portfolio: newPortfolio,
          },
        };
        dispatch(updateFreelancerProfileRegister(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleAddCertificatePhoto = async (file, index, name) => {
    if (file || name) {
      let newCertificates = [
        ...freelancerRegistration?.optionalInfo?.certificates,
      ];

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
            ...freelancerRegistration.optionalInfo,
            certificates: newCertificates,
          },
        };
        dispatch(updateFreelancerProfileRegister(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleOfficePhotoUpdate = async (file, index, name) => {
    if (file || name) {
      let newOfficePhoto = [
        ...freelancerRegistration?.optionalInfo?.officePhoto,
      ];

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
            ...freelancerRegistration.optionalInfo,
            officePhoto: newOfficePhoto,
          },
        };
        dispatch(updateFreelancerProfileRegister(obj));
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
          ...freelancerRegistration.optionalInfo,
          introductionVideo: introductionVideo,
        },
      };
      dispatch(updateFreelancerProfileRegister(obj));
    } else {
      notifications.showError(response || "Error uploading video.");
      setUploading(false);
    }
  };

  const handleUpdateFreelancerRegistrationValue = (value, type) => {
    let obj = {
      type: type,
      value: value,
    };
    dispatch(updateFreelancerProfileRegister(obj));
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

  const handleKYCPhotoChange = async (e) => {
    let size = e.target.files[0] ? e.target.files[0].size : 0;
    if (size < 1048576) {
      setFileUploading({ ...fileUploading, kycProvePhoto: true });
      let fileObj = {
        fileName: e.target?.files[0].name,
        url: URL.createObjectURL(e.target?.files[0]),
      };
      let errorMessage = {};
      errorMessage.kycProvePhoto = "";
      setErrorMessage(errorMessage);

      let response = await uploadImage(e.target?.files[0], "kycproveimage");
      if (response.success) {
        if (freelancerRegistration.kycProvePhoto) {
          handleDeleteImage(freelancerRegistration.kycProvePhoto);
        }
        handleUpdateFreelancerRegistrationValue(
          response.result.s3Key,
          "kycProvePhoto"
        );
        setFileUploading({ ...fileUploading, kycProvePhoto: false });
      } else {
        notifications.showError(response || "Error uploading image.");
        setFileUploading({ ...fileUploading, kycProvePhoto: false });
      }
    } else {
      notifications.showWarning(languageType.IMAGE_UPLOADING_SIZE_TEXT);
    }
  };

  const handleUploadImage = async (file) => {
    setFileUploading({ ...fileUploading, userProfileUrl: true });
    let response = await uploadImage(file, "profileimage");
    if (response.success) {
      handleUpdateFreelancerRegistrationValue(
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
      <ProfileInfoRegSkeleton count={1} isSkeletonLoading={isSkeletonLoading} />

      <div className="skeletonLoading_mobile">
        <Skeleton count={10} isSkeletonLoading={isSkeletonLoading} />
      </div>

      <section
        hidden={isSkeletonLoading}
        className="card_sec freelancer-profile-register-page post_form"
        style={{ padding: "0px" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3 col-md-3 user-profile-pic_ColMobile">
                <div className="user-profile-pic">
                  {freelancerRegistration.userProfileUrl ? (
                    <>
                      <img
                        src={getProfileImage(
                          freelancerRegistration?.userProfileUrl,
                          "profileimage"
                        )}
                      />{" "}
                      <div
                        onClick={() => {
                          handleDeleteImage(
                            freelancerRegistration?.userProfileUrl
                          );
                          handleUpdateFreelancerRegistrationValue(
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
                      <label for="upload-photo" className="user-photo">
                        {" "}
                        {languageType.USER_PHOTO}{" "}
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
                              languageType.IMAGE_UPLOADING_SIZE_TEXT
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
              <div className="col-lg-9 col-md-9">
                <div className="form-group row  mb-4">
                  <label for="first-name" class="col-sm-3 col-form-label">
                    <span className="form-label-icon">
                      <img
                        width={20}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/add_contact_person.svg"
                        }
                      />
                    </span>
                    {languageType.YOUR_NAME}
                  </label>
                  <div class="col-sm-9">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 pr-lg-1 mb-2 mb-md-0">
                        <input
                          type="text"
                          placeholder={languageType.FIRST_NAME}
                          className="form-control "
                          id="first-name"
                          name="first-name"
                          value={freelancerRegistration?.firstName}
                          onChange={(e) => {
                            handleUpdateFreelancerRegistrationValue(
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
                          value={freelancerRegistration?.lastName}
                          onChange={(e) => {
                            handleUpdateFreelancerRegistrationValue(
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
                <div className="form-group row mb-4">
                  <label
                    style={{ whiteSpace: "nowrap" }}
                    for="country"
                    class="col-sm-3 col-form-label"
                  >
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
                      <div className="col-md-4 mb-2 mb-md-0">
                        <DropdownList
                          id={`CountryList}`}
                          gray_bg
                          style={{ background: "#f3f2f2" }}
                          name={`CountryList`}
                          enableAutoComplete
                          enableAutoCompleteSearch
                          placeHolder="Country"
                          value={freelancerRegistration?.country}
                          selectItem={(value) => {
                            handleUpdateFreelancerRegistrationValue(
                              value,
                              "country"
                            );
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
                      <div className="col-md-2 mb-2 mb-md-0">
                        <input
                          type="text"
                          placeholder="+82"
                          className="form-control gray_bg  readonly"
                          id="country-code"
                          value={freelancerRegistration?.countryCode}
                          onChange={(e) => {
                            handleUpdateFreelancerRegistrationValue(
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
                      <div className="col-md-6">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control custom-form-control"
                            name="mobile-number"
                            id="mobile-number"
                            placeholder="Phone No"
                            value={freelancerRegistration?.phoneNo}
                            onChange={(e) => {
                              handleUpdateFreelancerRegistrationValue(
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
                                      mobileNumber:
                                        freelancerRegistration?.phoneNo,
                                      path: "client-registration",
                                      country: freelancerRegistration.country,
                                      countryCode:
                                        freelancerRegistration.countryCode,
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
              </div>
            </div>

            <div className="form-group row   mb-3">
              <label for="business-category" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={25}
                    src={
                      "https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg"
                    }
                  />
                </span>
                <span>{languageType.PROFILE_RATE}</span>
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-md-4 mb-2 mb-md-0">
                    <DropdownList
                      id={`currencyCode`}
                      name={`currency`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder="Currency"
                      value={freelancerRegistration?.currencyCode}
                      selectItem={(value) => {
                        handleUpdateFreelancerRegistrationValue(
                          value,
                          "currencyCode"
                        );
                        handleUpdateFreelancerRegistrationValue(
                          "",
                          "profileHourlyRate"
                        );
                        handleUpdateFreelancerRegistrationValue(
                          "",
                          "profileDailyRate"
                        );
                        setErrorMessage({
                          ...errorMessage,
                          currencyCode: null,
                        });
                      }}
                      items={[
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
                        // {
                        //   text: "Jungle Points",
                        //   value: "JP",
                        // },
                      ]}
                    />
                    {errorMessage.currencyCode && (
                      <div className="text-danger">
                        {errorMessage.currencyCode}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-2 mb-md-0">
                    <DropdownList
                      id={`hourlyRate`}
                      name={`hourlyRate`}
                      enableAutoCompleteSearch
                      enableAutoComplete
                      placeHolder="Hourly Rate"
                      value={freelancerRegistration?.profileHourlyRate}
                      selectItem={(value) => {
                        handleUpdateFreelancerRegistrationValue(
                          value,
                          "profileHourlyRate"
                        );
                        setErrorMessage({
                          ...errorMessage,
                          profileHourlyRate: null,
                        });
                      }}
                      items={
                        freelancerRegistration?.currencyCode
                          ? GetAmountPerHour(
                              freelancerRegistration?.currencyCode
                            )
                          : []
                      }
                    />
                    {errorMessage.profileHourlyRate && (
                      <div className="text-danger">
                        {errorMessage.profileHourlyRate}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <DropdownList
                      id={`profileDailyRate`}
                      name={`profileDailyRate`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder="Daily Rate"
                      value={freelancerRegistration?.profileDailyRate}
                      selectItem={(value) => {
                        handleUpdateFreelancerRegistrationValue(
                          value,
                          "profileDailyRate"
                        );
                        setErrorMessage({
                          ...errorMessage,
                          profileDailyRate: null,
                        });
                      }}
                      items={
                        freelancerRegistration?.currencyCode
                          ? GetAmountPerDay(
                              freelancerRegistration?.currencyCode
                            )
                          : []
                      }
                    />
                    {errorMessage.profileDailyRate && (
                      <div className="text-danger">
                        {errorMessage.profileDailyRate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row   mb-3">
              <label for="business-category" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={25}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/available_icon.png"
                    }
                  />
                </span>
                {languageType.AVAILABLE_PER_WEEK}
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-lg-6">
                    <DropdownList
                      id="availablePerWeek"
                      name="availablePerWeek"
                      enableAutoCompleteSearch
                      placeHolder="Availability"
                      value={freelancerRegistration.availablePerWeek}
                      selectItem={(value) => {
                        setErrorMessage({
                          ...errorMessage,
                          availablePerWeek: null,
                        });
                        handleUpdateFreelancerRegistrationValue(
                          value,
                          "availablePerWeek"
                        );
                      }}
                      items={[
                        {
                          text: "More Than 10 hrs/week",
                          value: "More Than 10 hrs/week",
                        },
                        {
                          text: "More Than 20 hrs/week",
                          value: "More Than 20 hrs/week",
                        },
                        {
                          text: "More Than 30 hrs/week",
                          value: "More Than 30 hrs/week",
                        },
                        {
                          text: "As needed-open to offers",
                          value: "As needed-open to offers",
                        },
                      ]}
                    />
                    {errorMessage.availablePerWeek && (
                      <p className="text-danger">
                        {errorMessage.availablePerWeek}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row   mb-3">
              <label for="business-category" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={25}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/languages_world_icon.png"
                    }
                  />
                </span>
                {languageType.LANGUAGE_PROFICIENCY}
              </label>
              <div class="col-sm-9">
                <div className="row">
                  <div className="col-md-12">
                    {freelancerRegistration.languageProficiency.map(
                      (languageproficiency, index) => (
                        <div key={index}>
                          <div className="row align-items-end">
                            <div className="col-md-5 py-1">
                              <div className="form-group">
                                <DropdownList
                                  id={`language${index}`}
                                  name={`language${index}`}
                                  placeHolder="Language"
                                  enableAutoCompleteSearch
                                  value={languageproficiency.language}
                                  selectItem={(value) => {
                                    let checkFirst =
                                      freelancerRegistration.languageProficiency.find(
                                        (item) => item.language === value
                                      );
                                    if (!checkFirst) {
                                      handleUpdateLanguage(value, index);
                                    } else {
                                      notifications.showWarning(
                                        "Already added please another"
                                      );
                                    }
                                  }}
                                  items={[
                                    { text: "Hindi", value: "Hindi" },
                                    { text: "English", value: "English" },
                                    { text: "Korean", value: "Korean" },
                                    { text: "Gujarati", value: "Gujarati" },
                                  ]}
                                />
                              </div>
                            </div>
                            <div className="col-md-5 py-1">
                              <div className="form-group">
                                <DropdownList
                                  id={`proficiency${index}`}
                                  name={`proficiency${index}`}
                                  enableAutoCompleteSearch
                                  placeHolder="Proficiency"
                                  value={languageproficiency.level}
                                  selectItem={(value) => {
                                    handleUpdateLanguageProficiency(
                                      value,
                                      index
                                    );
                                  }}
                                  items={[
                                    {
                                      text: "Basic Knowledge",
                                      value: "Basic Knowledge",
                                    },
                                    { text: "Conversant", value: "Conversant" },
                                    { text: "Proficient", value: "Proficient" },
                                    { text: "Fluent", value: "Fluent" },
                                    { text: "Bilingual", value: "Bilingual" },
                                  ]}
                                />
                              </div>
                            </div>
                            <div className="col-md-2 edit_freelance_profile__baseAction">
                              {freelancerRegistration.languageProficiency &&
                                freelancerRegistration.languageProficiency
                                  .length > 1 &&
                                ((freelancerRegistration.languageProficiency &&
                                  freelancerRegistration.languageProficiency
                                    .length !=
                                    index + 1) ||
                                  index === 3) && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteLanguageProficiency(index);
                                    }}
                                    className="btn save_btn customer-delete-button"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              {(freelancerRegistration.languageProficiency
                                .length ===
                                index + 1 ||
                                freelancerRegistration.languageProficiency
                                  .length === 1) &&
                              index < 3 ? (
                                <i
                                  style={{
                                    padding: "14px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    addMoreLanguageProficiency();
                                  }}
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
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
                  placeholder="Describe the best of yourself or organization in short"
                  className="form-control"
                  id="org-title"
                  value={freelancerRegistration.userTitle}
                  name="org-title"
                  onChange={(e) => {
                    handleUpdateFreelancerRegistrationValue(
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
                  placeholder="Write the introduction of yourself or organization"
                  className="form-control mt-4"
                  id="org-introduction"
                  rows={"5"}
                  name="org-introduction"
                  value={freelancerRegistration?.professionalOverview}
                  onChange={(e) => {
                    handleUpdateFreelancerRegistrationValue(
                      e.target.value,
                      "professionalOverview"
                    );
                    setErrorMessage({ ...errorMessage, description: null });
                  }}
                ></textarea>
                {errorMessage.description && (
                  <div className="text-danger">{errorMessage.description}</div>
                )}
                <br />
                <DocumentTypeSelector
                  selectedValue={freelancerRegistration.documentType}
                  onSelect={(documentType) => {
                    let errorMessage = {};
                    errorMessage.documentType = "";
                    handleUpdateFreelancerRegistrationValue(
                      documentType,
                      "documentType"
                    );
                    setErrorMessage({ ...errorMessage, documentType: "" });
                  }}
                  disableHeading={true}
                  errorMessage={errorMessage.documentType}
                />
                <br />

                <CreateFreelancerDocumentPicker
                  type={"freelancer"}
                  KYCPhoto={freelancerRegistration.kycProvePhoto}
                  handleKYCPhotoChange={handleKYCPhotoChange}
                  fileUploading={fileUploading}
                />

                {errorMessage.kycProvePhoto && (
                  <p className="text-danger"> {errorMessage.kycProvePhoto} </p>
                )}
              </div>
            </div>
            <OptionalInfo
              optionalInfo={freelancerRegistration?.optionalInfo}
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
            <div className="text-right mt-5 saveCancelBtn_mobile">
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

export default FreelancerProfile;

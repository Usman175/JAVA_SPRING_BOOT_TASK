import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Heading from "../../../components/freelancerCreation/heading";
import DropdownList from "../../../components/dropdowns/dropdownList";
import { CountryList } from "../../../utils/countrylist";
import Label from "../../../components/postProject/label";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import OptionalInfo from "../../../components/registration/optionalInfo";
import FileUploadLoader from "../../../components/loader/fileUpload";
import request from "../../../utils/request";
import notifications from "../../../utils/notifications";
import { DocumentTypeSelector } from "../../../components/forms/index.js";
import { selectSubScopes } from "../../../utils/helpers";
import { ENDPOINT } from "../../../utils/endpoint";
import { updateOrganizationProfileRegister } from "../../../store/action/freelancer/organizatinoRegistration";
import { useSelector, useDispatch } from "react-redux";
import CreateFreelancerDocumentPicker from "../../../components/freelancer/createFreelancerDocumentPicker";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  postMultipartFileNew,
} from "../../../utils/httpConfig";
import { uploadImage, deleteImage } from "../../../services/uploadImages";
import { getProfileImage } from "../../../utils/getProfileUrl";

import { stockMarketsList } from "../../../utils/stockMarkets";
import Skeleton from "../../../components/skeleton/skeleton";

import "./organization.scss";

function CompanyProfile(props) {
  const [errorMessage, setErrorMessage] = useState({});

  const [uploading, setUploading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [subScope, setSubScope] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [workingConditions, setWorkingConditions] = useState({
    wishedWorkingConditionCountry: "",
    wishedWorkingConditionCity: "",
    wishedWorkingConditionAreaOfWork: "",
  });
  const [organizationId, setOrganizationId] = useState(new URLSearchParams(props.location.search).get(
    "id"
  ));
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState({
    companyLogo: false,
  });
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const lookUpData = useSelector((state) => state.lookUp.lookUpData);
  const OrganizationRegistration = useSelector(
    (state) => state.OrganizationRegistration
  );

  useEffect(() => {
    getCompanyDetail();
  }, []);
  const getCompanyDetail = async () => {
    if (props.CompanyId || organizationId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetOrganization"]}?organizationId=${props.CompanyId || organizationId}`,
        getOptions()
      );
      if (result.success) {
        let organizationDetail = result.result;
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.companyLogo,
          "companyLogo"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.companyName,
          "companyName"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.contactFirstName,
          "firstName"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.contactLastName,
          "lastName"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.contactNumber,
          "phoneNo"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.companyTitle,
          "userTitle"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.companyIntroduction,
          "professionalOverview"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.companyCertificateUrl,
          "companyCertificateUrl"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.iDType,
          "documentType"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.kycProvePhoto,
          "kycProvePhoto"
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.serviceScopes &&
          organizationDetail.serviceScopes[0]?.serviceScope,
          "businessType"
        );
        setSubScope(
          selectSubScopes(
            organizationDetail.serviceScopes &&
            organizationDetail.serviceScopes[0]?.serviceScope,
            languageReducer.projectScopes
          )
        );
        handleUpdateOrganizationRegistrationValue(
          organizationDetail.serviceScopes &&
          organizationDetail.serviceScopes[0]?.subServiceScope,
          "subServiceScope"
        );
        handleOptionalInfoFromResponse(
          organizationDetail.linkedInProfileUrl,
          organizationDetail.annualSales,
          organizationDetail.noOfEmployee,
          organizationDetail.website || "",
          organizationDetail.portfolios,
          organizationDetail.officePhotos,
          organizationDetail.awardCertificates,
          organizationDetail.introductionVideo
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
    let optionalInfo = OrganizationRegistration.optionalInfo;
    let obj = {
      type: "optionalInfo",
      value: {
        ...optionalInfo,
        annualSales,
        linkedInProfileUrl,
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
            : OrganizationRegistration.optionalInfo.portfolio,
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
            : OrganizationRegistration.optionalInfo.officePhoto,
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
            : OrganizationRegistration.optionalInfo.certificates,
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

    dispatch(updateOrganizationProfileRegister(obj));
  };
  React.useEffect(() => {
    if (props.location?.state?.phoneVerified) {
      let obj = {
        type: "phoneVerified",
        value: true,
      };
      dispatch(updateOrganizationProfileRegister(obj));
    }
    getLocation();
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
  // set default country and country code by location
  React.useEffect(() => {
    if (lookUpData?.country) {
      handleUpdateOrganizationRegistrationValue(lookUpData?.country, "country");
      if (lookUpData?.shortCode) {
        let shortCode = CountryList.find(
          (item) => item.name === lookUpData?.country
        );
        if (shortCode) {
          handleUpdateOrganizationRegistrationValue(
            shortCode.dial_code,
            "countryCode"
          );
        }
      }
    }
  }, [lookUpData]);

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
        handleUpdateOrganizationRegistrationValue(
          country?.dial_code,
          "countryCode"
        );
        handleUpdateOrganizationRegistrationValue(country?.name, "country");
      } else {
        alert("No Country");
      }
    } else {
      alert("No Country");
    }
  };

  const handleValidate = () => {
    let formIsValid = true;
    let errorMessage = {};
    if (!OrganizationRegistration.companyLogo) {
      formIsValid = false;
      errorMessage["companyLogo"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("User Photo is Required!");
    } else if (!OrganizationRegistration.companyName) {
      formIsValid = false;
      errorMessage["companyName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact first name is Required!");
    } else if (!OrganizationRegistration.firstName) {
      formIsValid = false;
      errorMessage["contactFirstName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact first name is Required!");
    } else if (!OrganizationRegistration.lastName) {
      formIsValid = false;
      errorMessage["contactLastName"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Contact last name is Required!");
    } else if (!OrganizationRegistration.country) {
      formIsValid = false;
      errorMessage["country"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Country is Required!");
    } else if (!OrganizationRegistration.countryCode) {
      formIsValid = false;
      errorMessage["countryCode"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("country Code is Required!");
    } else if (!OrganizationRegistration.phoneNo) {
      formIsValid = false;
      errorMessage["mobileNumber"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Mobile number is Required!");
    } /* else if (!OrganizationRegistration.phoneVerified) {
      formIsValid = false;
      errorMessage["mobileNumber"] = "Phone number verification Required";
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Phone number verification Required!");
    } */ else if (!OrganizationRegistration.businessType) {
      formIsValid = false;
      errorMessage["businessCategory"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Business area is Required!");
    } else if (OrganizationRegistration.subServiceScope.length == 0) {
      formIsValid = false;
      errorMessage["subServiceScope"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "110",
        behavior: "smooth",
      });
      notifications.showWarning("At least one Business Sub Scope  is Required");
    } else if (!OrganizationRegistration.userTitle) {
      formIsValid = false;
      errorMessage["title"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Title is Required!");
    }
    // else if (!OrganizationRegistration.adminPassword) {
    //   formIsValid = false;
    //   errorMessage["adminPassword"] = languageType.REQUIRED_MESSAGE;
    //   window.scrollTo({
    //     top: "100",
    //     behavior: "smooth",
    //   });
    //   notifications.showWarning("Admin Password is Required!");
    // }
    else if (!OrganizationRegistration.professionalOverview) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Description is Required!");
    } else if (!OrganizationRegistration.documentType) {
      formIsValid = false;
      errorMessage["documentType"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Document Type is Required!");
    } /* else if (!OrganizationRegistration.kycProvePhoto) {
      formIsValid = false;
      errorMessage["kycProvePhoto"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("KYC Photo  is Required!");
    } */
    setErrorMessage(errorMessage);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (handleValidate()) {
      const userData = JSON.parse(localStorage.getItem("MY_AUTH"));
      setLoading(true);

      let params = {
        organizationId: props.CompanyId ? props.CompanyId : organizationId ? organizationId : '',
        userId: userData.user.userId,
        companyName: OrganizationRegistration.companyName,
        contactFirstName: OrganizationRegistration.firstName,
        contactLastName: OrganizationRegistration.lastName,
        country: OrganizationRegistration.country,
        contactNumber: OrganizationRegistration.phoneNo,
        companyTitle: OrganizationRegistration.userTitle,
        companyIntroduction: OrganizationRegistration.professionalOverview,
        emailAddress: userData.logindetails.emailId || userData.user.email,
        companyLogo: OrganizationRegistration.companyLogo,
        iDType: OrganizationRegistration.documentType,
        website: OrganizationRegistration.optionalInfo.website,
        noOfEmployee: OrganizationRegistration.optionalInfo.noOfEmployee,
        annualSales: OrganizationRegistration.optionalInfo.annualSales,
        linkedInProfileUrl: OrganizationRegistration.optionalInfo.linkedInProfileUrl,
        officePhotos: OrganizationRegistration.optionalInfo?.officePhoto[0]
          ?.fileName
          ? OrganizationRegistration.optionalInfo?.officePhoto.map(
            (item) => item.fileDetail
          )
          : [],
        awardCertificates:
          OrganizationRegistration?.optionalInfo?.certificates[0].fileName &&
            OrganizationRegistration?.optionalInfo?.certificates[0].fileDetail
            ? OrganizationRegistration?.optionalInfo.certificates.map(
              (item) => item.fileDetail
            )
            : [],
        addressInfo: {
          addressId: lookUpData?.placeId,
          addressInfoId: lookUpData?.placeId,
          isMainAddress: true,
          phoneNo: OrganizationRegistration.phoneNo,
          address: lookUpData?.address,
          userCountry: lookUpData?.country,
          userCountryCode: OrganizationRegistration.countryCode,
          userState: lookUpData.state,
          userCity: lookUpData.city,
          userPostalCode: "",
        },
        portfolios:
          OrganizationRegistration?.optionalInfo?.portfolio[0].fileName &&
            OrganizationRegistration?.optionalInfo?.portfolio[0].portfolioImage
            ? OrganizationRegistration?.optionalInfo.portfolio
            : [],
        serviceScopes: [
          {
            serviceScope: OrganizationRegistration.businessType,
            subServiceScope: OrganizationRegistration.subServiceScope,
          },
        ],
        introductionVideo: OrganizationRegistration.optionalInfo?.introductionVideo.fileDetail,
        location: currentLocation,
        companyCertificateUrl: OrganizationRegistration.companyCertificateUrl,
      };

      if (!props.CompanyId && !organizationId) {
        let result = await request(
          ENDPOINT["CreateOrganization"],
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess(
            "Company profile  info saved successfully !"
          );
          localStorage.setItem(
            "CompanyRegistrationInfo",
            JSON.stringify({
              step: "ConfirmationStep",
              organizationId: result.result,
            })
          );
          props.handleNext("ConfirmationStep", result.result);

          window.scrollTo({
            top: "0",
            behavior: "smooth",
          });
          setLoading(false);
        } else {
          setLoading(false);
          notifications.showError(
            result.message || "Error while registering your account, Try again"
          );
        }
      } else {
        let result = await request(
          ENDPOINT["UpdateOrganization"],
          postOptions(params)
        );
        if (result.success) {
          notifications.showSuccess("Your information updated successfully !");
          localStorage.setItem(
            "CompanyRegistrationInfo",
            JSON.stringify({
              step: "ConfirmationStep",
              organizationId: result.result.organizationId,
            })
          );
          setLoading(false);
          props.handleNext("ConfirmationStep", result.result.organizationId);
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
    let optionalInfo = OrganizationRegistration.optionalInfo;
    if (type === "website") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, website: value },
      };
      dispatch(updateOrganizationProfileRegister(obj));
    }

    if (type === "noOfEmployee") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, noOfEmployee: value },
      };
      dispatch(updateOrganizationProfileRegister(obj));
    }
    if (type === "annualSales") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, annualSales: value },
      };
      dispatch(updateOrganizationProfileRegister(obj));
    }
    if (type === "linkedInProfileUrl") {
      let obj = {
        type: "optionalInfo",
        value: { ...optionalInfo, linkedInProfileUrl: value },
      };
      dispatch(updateOrganizationProfileRegister(obj));
    }
  };
  const handleAddMorePortfolio = () => {
    if (OrganizationRegistration?.optionalInfo?.portfolio?.length < 5) {
      let optionalInfo = OrganizationRegistration.optionalInfo;

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
      dispatch(updateOrganizationProfileRegister(obj));
    }
  };

  const handleRemoveMorePortfolio = async (index) => {
    let newPortfolio = [...OrganizationRegistration?.optionalInfo?.portfolio];

    if (newPortfolio[index].portfolioImage) {
      await deleteImage(newPortfolio[index].portfolioImage);
    }
    newPortfolio.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...OrganizationRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateOrganizationProfileRegister(obj));
  };

  const handleRemoveMoreCertificate = async (index) => {
    let newCertificates = [
      ...OrganizationRegistration?.optionalInfo?.certificates,
    ];
    if (newCertificates[index].fileDetail) {
      await deleteImage(newCertificates[index].fileDetail);
    }
    newCertificates.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...OrganizationRegistration.optionalInfo,
        certificates: newCertificates,
      },
    };
    dispatch(updateOrganizationProfileRegister(obj));
  };

  const handleAddMoreCertificate = () => {
    if (OrganizationRegistration?.optionalInfo?.certificates.length < 5) {
      let optionalInfo = OrganizationRegistration.optionalInfo;
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
      dispatch(updateOrganizationProfileRegister(obj));
    }
  };
  const handleAddMoreOfficePhoto = () => {
    if (OrganizationRegistration?.optionalInfo?.officePhoto?.length < 5) {
      let optionalInfo = OrganizationRegistration.optionalInfo;
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
      dispatch(updateOrganizationProfileRegister(obj));
    }
  };
  const handleRemoveMoreOfficePhoto = async (index) => {
    let newOfficePhoto = [
      ...OrganizationRegistration?.optionalInfo?.officePhoto,
    ];
    if (newOfficePhoto[index].fileDetail) {
      await deleteImage(newOfficePhoto[index].fileDetail);
    }
    newOfficePhoto.splice(index, 1);
    let obj = {
      type: "optionalInfo",
      value: {
        ...OrganizationRegistration.optionalInfo,
        officePhoto: newOfficePhoto,
      },
    };
    dispatch(updateOrganizationProfileRegister(obj));
  };
  const handleUpdatePortfolioDes = (value, index) => {
    let newPortfolio = [...OrganizationRegistration?.optionalInfo?.portfolio];

    let objPor = {
      fileName: newPortfolio[index].fileName,
      portfolioImageFile: newPortfolio[index].portfolioImageFile,
      description: value,
    };
    newPortfolio.splice(index, 1, objPor);

    let obj = {
      type: "optionalInfo",
      value: {
        ...OrganizationRegistration.optionalInfo,
        portfolio: newPortfolio,
      },
    };
    dispatch(updateOrganizationProfileRegister(obj));
  };

  const handlePortfolioUpdate = async (file, index, name) => {
    if (file || name) {
      let newPortfolio = [...OrganizationRegistration?.optionalInfo?.portfolio];
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
            ...OrganizationRegistration.optionalInfo,
            portfolio: newPortfolio,
          },
        };
        dispatch(updateOrganizationProfileRegister(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleAddCertificatePhoto = async (file, index, name) => {
    if (file || name) {
      let newCertificates = [
        ...OrganizationRegistration?.optionalInfo?.certificates,
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
            ...OrganizationRegistration.optionalInfo,
            certificates: newCertificates,
          },
        };
        dispatch(updateOrganizationProfileRegister(obj));
      } else {
        notifications.showError(response || "Error uploading image.");
        setUploading(false);
      }
    }
  };

  const handleOfficePhotoUpdate = async (file, index, name) => {
    if (file || name) {
      let newOfficePhoto = [
        ...OrganizationRegistration?.optionalInfo?.officePhoto,
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
            ...OrganizationRegistration.optionalInfo,
            officePhoto: newOfficePhoto,
          },
        };
        dispatch(updateOrganizationProfileRegister(obj));
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
          ...OrganizationRegistration.optionalInfo,
          introductionVideo: introductionVideo,
        },
      };
      dispatch(updateOrganizationProfileRegister(obj));
    } else {
      notifications.showError(response || "Error uploading video.");
      setUploading(false);
    }
  };

  const handleUpdateOrganizationRegistrationValue = (value, type) => {
    let obj = {
      type: type,
      value: value,
    };
    dispatch(updateOrganizationProfileRegister(obj));
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
        if (OrganizationRegistration.kycProvePhoto) {
          handleDeleteImage(OrganizationRegistration.kycProvePhoto);
        }
        handleUpdateOrganizationRegistrationValue(
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

  const handleAddSubScope = (flag, value) => {
    if (flag) {
      let newSubServiceScope = [...OrganizationRegistration.subServiceScope];
      newSubServiceScope.push(value);
      handleUpdateOrganizationRegistrationValue(
        newSubServiceScope,
        "subServiceScope"
      );
    } else {
      let newSubServiceScope = [...OrganizationRegistration.subServiceScope];
      handleUpdateOrganizationRegistrationValue(
        newSubServiceScope.filter((item) => item != value),
        "subServiceScope"
      );
    }
  };

  const handleUploadImage = async (file, field) => {
    if (field === "companyLogo") {
      setFileUploading({ ...fileUploading, companyLogo: true });
    } else {
      setFileUploading({ ...fileUploading, companyCertificateUrl: true });
    }

    let response = await uploadImage(file, "profileimage");
    if (response.success) {
      handleUpdateOrganizationRegistrationValue(response.result.s3Key, field);
      setFileUploading({
        ...fileUploading,
        companyLogo: false,
        companyCertificateUrl: false,
      });
    } else {
      notifications.showError(response || "Error uploading image.");
      setFileUploading({
        ...fileUploading,
        companyLogo: false,
        companyCertificateUrl: false,
      });
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
        className="card_sec organization-profile-register-page post_form"
        style={{ padding: "0px" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="row mb-3">
              <div className="col-lg-3 col-md-3 user-profile-pic_organization_mobile">
                <div className="user-profile-pic">
                  {OrganizationRegistration.companyLogo ? (
                    <>
                      <img
                        src={getProfileImage(
                          OrganizationRegistration?.companyLogo
                        )}
                      />{" "}
                      <div
                        onClick={() => {
                          handleDeleteImage(
                            OrganizationRegistration?.companyLogo
                          );
                          handleUpdateOrganizationRegistrationValue(
                            "",
                            "companyLogo"
                          );
                        }}
                        className="trash-bin-icon-for-image-change"
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </>
                  ) : (
                    <>
                      <label for="upload-photo" style={{ cursor: "pointer" }}>
                        {languageType.COMPANY_LOGO_TEXT}
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
                            handleUploadImage(e.target.files[0], "companyLogo");
                            setErrorMessage({
                              ...errorMessage,
                              companyLogo: null,
                            });
                          } else {
                            notifications.showWarning(
                              languageType.IMAGE_UPLOADING_SIZE_TEXT
                            );
                          }
                          setErrorMessage({
                            ...errorMessage,
                            companyLogo: null,
                          });
                        }}
                      />
                    </>
                  )}
                </div>
                {fileUploading.companyLogo && (
                  <div>
                    Uploading <i className="fa fa-spinner fa-spin"></i>
                  </div>
                )}
                {errorMessage.companyLogo && (
                  <div className="text-danger">{errorMessage.companyLogo}</div>
                )}
              </div>
              <div className="col-lg-9 col-md-9">
              <div className="form-group row mb-2">
                  <label className="col-sm-9 col-form-label yesno_box_organization_label"> 
                  Do you have any registered company in bearole? Please check yes<br/>
                  if you already have and use the company here to register as a headhunter
                  </label>
                  <div class="col-sm-3">
                    <div className="yesno_box_organization">
                      <div className="yesno_bodr_organization"> 
                        <div className="yes_no_organization d-flex"> 

                          <div className="yes_no_organization_customControl">
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
                      value={OrganizationRegistration?.companyName}
                      name="company-name"
                      placeholder={languageType.COMPANY_NAME}
                      onChange={(e) => {
                        handleUpdateOrganizationRegistrationValue(
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
                      <div className="col-lg-6 col-md-6 pr-lg-1 mb-3 mb-md-0">
                        <input
                          type="text"
                          placeholder={languageType.FIRST_NAME}
                          className="form-control "
                          id="first-name"
                          name="first-name"
                          value={OrganizationRegistration?.firstName}
                          onChange={(e) => {
                            handleUpdateOrganizationRegistrationValue(
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
                          value={OrganizationRegistration?.lastName}
                          onChange={(e) => {
                            handleUpdateOrganizationRegistrationValue(
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
              <label for="country" class="col-sm-3 col-form-label organizationCol_labelMobile">
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
                  <div className="col-lg-4 col-md-4 mb-3 mb-md-0">
                    <DropdownList
                      id={`CountryList}`}
                      gray_bg
                      style={{ background: "#f3f2f2" }}
                      name={`CountryList`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder="Country"
                      value={OrganizationRegistration?.country}
                      selectItem={(value) => {
                        handleUpdateOrganizationRegistrationValue(
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
                  <div className="col-lg-2 col-md-2 mb-3 mb-md-0">
                    <input
                      type="text"
                      placeholder="+82"
                      className="form-control gray_bg  readonly"
                      id="country-code"
                      value={OrganizationRegistration?.countryCode}
                      onChange={(e) => {
                        handleUpdateOrganizationRegistrationValue(
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
                  <div className="col-lg-6 col-md-6">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control custom-form-control"
                        name="mobile-number"
                        id="mobile-number"
                        placeholder={languageType.MOBILE_NO}
                        value={OrganizationRegistration?.phoneNo}
                        onChange={(e) => {
                          handleUpdateOrganizationRegistrationValue(
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
                                    OrganizationRegistration?.phoneNo,
                                  path: "client-registration",
                                  country: OrganizationRegistration.country,
                                  countryCode:
                                    OrganizationRegistration.countryCode,
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

            <div className="form-group row   mb-3">
              <label for="business-category" class="col-sm-3 col-form-label organizationCol_labelBusScope">
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
                  <div className="col-lg-6 col-md-6">
                    <DropdownList
                      id={`business-category}`}
                      name={`business-category`}
                      enableAutoComplete
                      enableAutoCompleteSearch
                      placeHolder={languageType.SELECT_BUSINESS_CATEGORY}
                      value={OrganizationRegistration?.businessType}
                      selectItem={(value) => {
                        handleUpdateOrganizationRegistrationValue(
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
                    {errorMessage.businessCategory && (
                      <div className="text-danger">
                        {errorMessage.businessCategory}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label
                      className="file-upload-area-label"
                      htmlFor="companyCertificateUrl"
                    >
                      <div className="btn btn-dark w-100">
                        {OrganizationRegistration.companyCertificateUrl
                          ? OrganizationRegistration.companyCertificateUrl
                          : languageType.UPLOAD_COMPANY_CERTIFICATE}
                      </div>
                    </label>
                    <input
                      id="companyCertificateUrl"
                      accept=".png, .jpg, .jpeg,.pdf"
                      onChange={(e) => {
                        let size = e.target.files[0]
                          ? e.target.files[0].size
                          : 0;
                        if (size < 5242880) {
                          if (OrganizationRegistration.companyCertificateUrl) {
                            handleDeleteImage(
                              OrganizationRegistration.companyCertificateUrl
                            );
                          }
                          handleUploadImage(
                            e.target.files[0],
                            "companyCertificateUrl"
                          );
                        } else {
                          notifications.showWarning(
                            languageType.IMAGE_UPLOADING_SIZE_TEXT
                          );
                        }
                      }}
                      type="file"
                      className="file-upload-area"
                    />
                    {fileUploading.companyCertificateUrl && (
                      <div>
                        Uploading <i className="fa fa-spinner fa-spin"></i>
                      </div>
                    )}
                  </div>

                  {OrganizationRegistration.businessType === "others" &&(
                  <div className="col-lg-12 mb-0 mt-2">
                    <input
                          type="text"
                          placeholder="Business Area"
                          className="form-control "
                          id={`businessArea}`}
                          name={`businessArea`}
                          value={OrganizationRegistration?.businessArea}
                          // onChange={(e) => {
                          //   handleUpdateOrganizationRegistrationValue(
                          //     e.currentTarget.value,
                          //     "businessArea"
                          //   ); 
                          // }}
                      />  
                  </div>
                  )}
                </div>
                <br />
                <div class="dev_box">
                  <div class="d-flex align-items-center business-scope-area-12">
                    {subScope.length > 0
                      ? subScope.map((item, index) => (
                        <div class="checkbox-for-business-scope">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleAddSubScope(e.target.checked, item.value)
                            }
                            checked={OrganizationRegistration.subServiceScope.includes(
                              item.value
                            )}
                            className="custom-checkbox-styled"
                            id={`styled-checkbox-organization-registration${index}`}
                            required
                          />
                          <label
                            for={`styled-checkbox-organization-registration${index}`}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))
                      : languageType.BUSINESS_SUB_SCOPE}
                  </div>
                </div>
                {errorMessage.subServiceScope && (
                  <p className="text-danger">
                    {" "}
                    {errorMessage.subServiceScope}{" "}
                  </p>
                )}
              </div>
            </div>
            <div hidden className="form-group row mb-3">
              <label for="org-title" class="col-sm-3 col-form-label">
                <span className="form-label-icon text-left">
                  <img
                    width={22}
                    src={
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/password.png"
                    }
                  />
                </span>
                {languageType.ADMIN_PASSWORD}
              </label>
              <div class="col-sm-9">
                <input
                  type="password"
                  placeholder="Admin password"
                  className="form-control"
                  id="org-title"
                  value={OrganizationRegistration.adminPassword}
                  name="org-title"
                  onChange={(e) => {
                    handleUpdateOrganizationRegistrationValue(
                      e.target.value,
                      "adminPassword"
                    );
                    setErrorMessage({ ...errorMessage, title: null });
                  }}
                />
                {errorMessage.adminPassword && (
                  <div className="text-danger">
                    {errorMessage.adminPassword}
                  </div>
                )}
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
                  value={OrganizationRegistration.userTitle}
                  name="org-title"
                  onChange={(e) => {
                    handleUpdateOrganizationRegistrationValue(
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
                  className="form-control mt-4"
                  id="org-introduction"
                  rows={"5"}
                  name="org-introduction"
                  value={OrganizationRegistration?.professionalOverview}
                  onChange={(e) => {
                    handleUpdateOrganizationRegistrationValue(
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
                  selectedValue={OrganizationRegistration.documentType}
                  onSelect={(documentType) => {
                    let errorMessage = {};
                    errorMessage.documentType = "";
                    handleUpdateOrganizationRegistrationValue(
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
                  KYCPhoto={OrganizationRegistration.kycProvePhoto}
                  handleKYCPhotoChange={handleKYCPhotoChange}
                />

                {errorMessage.kycProvePhoto && (
                  <p className="text-danger"> {errorMessage.kycProvePhoto} </p>
                )}
              </div>
            </div>
            <OptionalInfo
              optionalInfo={OrganizationRegistration?.optionalInfo}
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
            <div className="text-right mt-5 upSaveBtn_organization">
              <button
                onClick={handleSubmit}
                style={{ width: "250px" }}
                className="btn btn-dark px-5"
              >
                {props.CompanyId || organizationId ? "Update" : "Save"}  {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
              </button>
            </div>
          </div>
        </div>
      </section>
      <FileUploadLoader title={" Uploading new file..."} show={uploading} />
    </>
  );
}

export default withRouter(CompanyProfile);

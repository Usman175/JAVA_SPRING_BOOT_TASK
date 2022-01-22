import * as types from "../../action/types";
import v4 from "uuid";

const initialState = {
  clientId: "",
  firstName: "",
  lastName: "",
  currencyCode: "",profileHourlyRate:"",
  profileDailyRate :"",
  documentType:"",
  organizationType: "",
  companyType: "",
  businessType: "",
  officeLocation: "",
  availablePerWeek:"",
  country: "",
  professionalOverview: "",
  languageProficiency:[
    {
      id: v4(),
      language: "",
      level: "",
      languageTestCertificate: "",
    },
  ],
  countryCode: "",
  userTitle: "",
  phoneVerified:false,
  phoneNo:"",
  ndaId: "",
  kycProvePhoto:"",
  userProfileUrl:"",
  optionalInfo: {
    introductionVideo: {},
    website: "",
    noOfEmployee: "",
    annualSales: "",
    linkedInProfileUrl:"",
    creditCard: {},
    officePhoto: [{ fileName: "", fileDetail: "" }],
    portfolio: [
        {
          fileName: "",
          portfolioImage: "",
          description: "",
        },
      ],
      certificates: [
        {
          fileName: "",
          fileDetail: "",
        },
      ],
      introductionVideo: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FREELANCER_REGISTRATION_PROFILE:
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };

    default:
      return state;
  }
};

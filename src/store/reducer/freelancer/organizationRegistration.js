import * as types from "../../action/types";

const initialState = {
  clientId: "",
  companyName:"",
  firstName: "",
  lastName: "",
  documentType:"",
  organizationType: "",
  companyType: "",
  businessType: "",
  officeLocation: "",
  country: "",
  professionalOverview: "",
  countryCode: "",
  adminPassword:"",
  userTitle: "",
  phoneVerified:false,
  subServiceScope:[],
  phoneNo:"",
  ndaId: "",
  kycProvePhoto:'',
  companyCertificateUrl:"",
  companyLogo: "",
  optionalInfo: {
    introductionVideo: {},
    website: "",
    noOfEmployee: "",
    annualSales: "",
    linkedInProfileUrl:'',
    creditCard: {},
    officePhoto: [{ fileName: "", fileDetail: "" }],
    portfolio: [
        {
          fileName: "",
          portfolioImageFile: "",
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
    case types.ORGANIZATION_REGISTRATION_PROFILE:
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };

    default:
      return state;
  }
};

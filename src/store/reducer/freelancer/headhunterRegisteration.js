import * as types from "../../action/types";

const initialState = {
  clientId: "",
  firstName: "",
  lastName: "",
  companyName: "",
  organizationType: "",
  companyType: "",
  businessType: "",
  officeLocation: "",
  country: "",
  professionalOverview: "",
  countryCode: "",
  userTitle: "",
  phoneVerified: true,
  phoneNo: "",
  ndaId: "",
  userPhoto: {
    url: "",
    fileName: "",
  },
  optionalInfo: {
    introductionVideo: {},
    website: "",
    noOfEmployee: "",
    annualSales: "",
    linkedInProfileUrl:"",
    creditCard: {},
    clientCompanies: [
      { companyName: "",
      companyUrl: "",
      companyLogo:''
      }
    ],
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
    case types.CLIENT_REGISTRATION_SINGLE_PARAM:
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };

    default:
      return state;
  }
};

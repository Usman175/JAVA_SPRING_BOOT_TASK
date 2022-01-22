import * as types from "../../action/types";

const initialState = {
  clientId: "",
  firstName: "",
  lastName: "",
  companyName: "",
  organizationType: "",
  companyType: "",
  businessType: "",
  subServiceScope:[],
  officeLocation: "",
  country: "",
  professionalOverview: "",
  countryCode: "",
  userTitle: "",
  phoneVerified:true,
  phoneNo:"",
  ndaId: "",
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

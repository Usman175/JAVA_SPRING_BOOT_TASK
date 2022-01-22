import { GET_BUSINESS_TYPES, GET_PROFESSIONAL_FIELDS, GET_COMPANY_TYPES, GET_COUNTRIES, GET_STATES, GET_CITIES, GET_REGISTRATION_PROOF, UPLOAD_IMAGE } from "../../constants/constant";

const INITIAL_STATE = {
    businessTypes: null,
    professionalFeilds: null,
    companyTypes: null,
    countries: [],
    countryStates: [],
    cities: [],
    registrationProof: null,
    tempUploadedImages: null
};

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUSINESS_TYPES:
            return {
                ...states,
                businessTypes: action.payload,
            };
            case  GET_PROFESSIONAL_FIELDS:
                return {
                ...states,
                professionalFeilds: action.payload,
            };
            case  GET_COMPANY_TYPES:
                return {
                ...states,
                companyTypes: action.payload,
            };
            case  GET_COUNTRIES:
                return {
                ...states,
                countries: action.payload,
            };
            case  GET_STATES:
                return {
                ...states,
                countryStates: action.payload,
            };
            case  GET_CITIES:
                return {
                ...states,
                cities: action.payload,
            };
            case  GET_REGISTRATION_PROOF:
                return {
                ...states,
                registrationProof: action.payload,
            };
            case  UPLOAD_IMAGE:
                return {
                ...states,
                tempUploadedImages: action.payload.result
            };
        default:
            return states;
    }
};

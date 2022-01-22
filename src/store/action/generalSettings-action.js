import { GET_BUSINESS_TYPES, GET_PROFESSIONAL_FIELDS, GET_COMPANY_TYPES, GET_COUNTRIES, GET_STATES, GET_CITIES, GET_REGISTRATION_PROOF, UPLOAD_IMAGE, UPLOAD_FILES } from "../constants/constant";
import request from "../../utils/request";
import { postOptions, getOptions, postMultipartFile } from "../../utils/httpConfig";
import { ENDPOINT } from "../../utils/endpoint";

export function getBuisnesTypes(data) {
    return (dispatch) => {
        dispatch({
            type: GET_BUSINESS_TYPES,
            payload: data
        })
    }
}

export function getProfessionalFeilds(data) {
    return (dispatch) => {
        dispatch({
            type: GET_PROFESSIONAL_FIELDS,
            payload: data
        })
    }
}

export function getCompanyTypes(data) {
    return (dispatch) => {
        dispatch({
            type: GET_COMPANY_TYPES,
            payload: data
        })
    }
}

export function getCountries(data) {
    return (dispatch) => {
        dispatch({
            type: GET_COUNTRIES,
            payload: data
        })
    }
}

export function getCountryStates(data) {
    return (dispatch) => {
        dispatch({
            type: GET_STATES,
            payload: data
        })
    }
}

export function getCities(data) {
    return (dispatch) => {
        dispatch({
            type: GET_CITIES,
            payload: data
        })
    }
}

export function getRegistrationProof(data) {
    return (dispatch) => {
        dispatch({
            type: GET_REGISTRATION_PROOF,
            payload: data
        })
    }
}

export const uploadImages = (data, callbackAction) => async (dispatch, getState) => {
    const formData = new FormData();
    formData.append('ImageBytes', data);
    await dispatch({
      type: UPLOAD_IMAGE,
      payload: await request(`${ENDPOINT["UpdateImage"]}`, postMultipartFile(formData))
    });
  };

export function uploadFiles(data) {
    return async (dispatch) => {
        dispatch({
            type: UPLOAD_FILES,
            payload: await request(`${ENDPOINT["UploadFile"]}`, postMultipartFile(data))
        })
    }
}

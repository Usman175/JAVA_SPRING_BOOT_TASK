import {
    SELECTED_CHANNEL,
    MY_CHANNEL_LIST,
    LANGUAGE_CONST,
    ROUTE_CONST,
    SETTINGS_CONST,
    PROJECT_SELECT_CONST,
    PROJECT_CONFIRMATION_DATA_CONST,
    SET_CROSS_DOMAIN_DATA,
    SET_REGISTERED_USER_TYPES,SET_ACTIVE_USER_TYPE,
    UPDATE_REGISTER_USER_FLAG,
    GUEST_USER,
    REMOVE_CROSS_DOMAIN_DATA,
    GET_USER,
    GET_USER_SUCCESSFULL,
    GET_USER_ERROR,
    REMOVE_USER,
    GET_USER_LOADING,
    GET_USER_PROFILE_IMAGE,
    UPDATE_USER_PROFILE_IMAGE,
    FREELANCER_CLIENT_AUTH_DATA,
    SAVE_PROJECT_DATA_CONST
} from "../constants/constant";
import { postOptions, getOptions, postMultipartFile } from "../../utils/httpConfig";
import { ENDPOINT } from "../../utils/endpoint";
import request from "../../utils/request";

export function onReduxLangaugeChange(langauge) {
    return (dispatch) => {
        dispatch({
            type: LANGUAGE_CONST,
            payload: langauge
        })
    }
}

export function changeSettings(settings){
    return(dispatch)=>{
        dispatch({
            type: SETTINGS_CONST,
            payload:settings
        }) 
    }
}


export function onGuestUserChange(settings){
    return(dispatch)=>{
        dispatch({
            type: GUEST_USER,
            payload:settings
        }) 
    }
}



export function onSetCrossDomainData(data) {
    
    return(dispatch)=> {
        dispatch({
            type:SET_CROSS_DOMAIN_DATA,
            payload:data,
        })
    }
}
export function setRegisteredUserTypes(data) {
    
    return(dispatch)=> {
        dispatch({
            type:SET_REGISTERED_USER_TYPES,
            payload:data,
        })
    }
}
export function setActiveUserType(userType) {
    
    return(dispatch)=> {
        dispatch({
            type:SET_ACTIVE_USER_TYPE,
            payload:userType,
        })
    }
}
export function updateRegisteredUserFlag(data) {
    
    return(dispatch)=> {
        dispatch({
            type:UPDATE_REGISTER_USER_FLAG,
            payload:data,
        })
    }
}
export function onSetClientFreelancerData(data) {
    
    return(dispatch)=> {
        dispatch({
            type:FREELANCER_CLIENT_AUTH_DATA,
            payload:data,
        })
    }
}

export function onRemoveCrossDomainData() {
    
    return(dispatch)=> {
        dispatch({
            type:REMOVE_CROSS_DOMAIN_DATA,
        })
    }
}

export function onReduxRouteChange(route) {
    return (dispatch) => {
        dispatch({
            type: ROUTE_CONST,
            payload: route
        })
    }
}
export function onReduxSelcteProjectChange(selectedProject) {
    return (dispatch) => {
        dispatch({
            type: PROJECT_SELECT_CONST,
            payload: selectedProject
        })
    }
}

export function onReduxProjectConfirmationDataHandle(data) {
    return (dispatch) => {
        dispatch({
            type: PROJECT_CONFIRMATION_DATA_CONST,
            payload: data
        })
    }
}

export function saveProjectDataRedux(key, data) {
    return (dispatch) => {
        dispatch({
            type: SAVE_PROJECT_DATA_CONST,
            payload: {key, data}
        })
    }
}

export function onSelectedChannelHandle(selected){
  return(dispatch)=>{
      dispatch({
          type: SELECTED_CHANNEL,
          payload:selected
      }) 
  }
}

export function onMyChannelListHandle(list){
  return(dispatch)=>{
      dispatch({
          type: MY_CHANNEL_LIST,
          payload:list
      }) 
  }
}

export function onGetUserDataSuccess(data) {
    return (dispatch) => {
        dispatch({
            type: GET_USER_SUCCESSFULL,
            payload: data
        })
    }
}

export function onGetUserDataError(data) {
    return (dispatch) => {
        dispatch({
            type: GET_USER_ERROR,
            payload: data
        })
    }
}

export function onRemoveUserData() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_USER,
        })
    }
}

export function onGetUserDataLoading() {
    return (dispatch) => {
        dispatch({
            type: GET_USER_LOADING,
        })
    }
}

export function getUserProfileImage() {
    return (dispatch) => {
        dispatch({
            type: GET_USER_PROFILE_IMAGE,
        })
    }
}

export const updateUserProfileImage = (url) => async (dispatch, getState) => {
    return dispatch({
        type: UPDATE_USER_PROFILE_IMAGE,
        payload: url
    });
}

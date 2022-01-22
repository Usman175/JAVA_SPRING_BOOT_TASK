import * as types from "../../../constants/constant.js"


// actions for get general settings

export function getGeneralSettingRequest() {
    return {
        type: types.GET_GENERAL_SETTING_REQUEST
    }
}

export function getGeneralSettingRequestSuccess(data) {
    return {
        type: types.GET_GENERAL_SETTING_REQUEST_SUCCESS,
        payload: data
    }
}

export function getGeneralSettingRequestFailure(data) {
    return{
        type: types.GET_GENERAL_SETTING_REQUEST_FAILED,
        payload: data
    }
}

export function getGeneralSettingRequestCleanUp() {
    return {
        type: types.GET_GENERAL_SETTING_REQUEST_CLEANUP
    }
}



// actions for add general settings

export function addGeneralSettingRequest() {
    return {
        type: types.ADD_GENERAL_SETTING_REQUEST
    }
}

export function addGeneralSettingRequestSuccess(data) {
    return {
        type: types.ADD_GENERAL_SETTING_REQUEST_SUCCESS,
        payload: data
    }
}

export function addGeneralSettingRequestFailure(data) {
    return{
        type: types.ADD_GENERAL_SETTING_REQUEST_FAILED,
        payload: data
    }
}
export function addGeneralSettingRequestCleanUp() {
    return {
        type: types.ADD_GENERAL_SETTING_REQUEST_CLEANUP
    }
}





// actions for update general settings

export function updateGeneralSettingRequest() {
    return {
        type: types.UPDATE_GENERAL_SETTING_REQUEST
    }
}

export function updateGeneralSettingRequestSuccess(data) {
    return {
        type: types.UPDATE_GENERAL_SETTING_REQUEST_SUCCESS,
        payload: data
    }
}

export function updateGeneralSettingRequestFailure(data) {
    return{
        type: types.UPDATE_GENERAL_SETTING_REQUEST_FAILED,
        payload: data
    }
}

export function updateGeneralSettingRequestCleanUp() {
    return {
        type: types.UPDATE_GENERAL_SETTING_REQUEST_CLEANUP
    }
}



// actions for delete general settings

export function deleteGeneralSettingRequest() {
    return {
        type: types.DELETE_GENERAL_SETTING_REQUEST
    }
}

export function deleteGeneralSettingRequestSuccess(data) {
    return {
        type: types.DELETE_GENERAL_SETTING_REQUEST_SUCCESS,
        payload: data
    }
}

export function deleteGeneralSettingRequestFailure(data) {
    return{
        type: types.DELETE_GENERAL_SETTING_REQUEST_FAILED,
        payload: data
    }
}
export function deleteGeneralSettingRequestCleanUp() {
    return {
        type: types.DELETE_GENERAL_SETTING_REQUEST_CLEANUP
    }
}
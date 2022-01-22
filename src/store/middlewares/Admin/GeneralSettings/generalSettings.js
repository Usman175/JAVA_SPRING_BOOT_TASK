import {ENDPOINT} from "../../../../utils/endpoint.js";
import {getOptions, postOptions} from "../../../../utils/httpConfig.js";
import request from "../../../../utils/request.js";
import {
    getGeneralSettingRequest,
    getGeneralSettingRequestFailure,
    getGeneralSettingRequestSuccess,
    updateGeneralSettingRequest,
    updateGeneralSettingRequestFailure,
    updateGeneralSettingRequestSuccess,
    addGeneralSettingRequest,
    addGeneralSettingRequestFailure,
    addGeneralSettingRequestSuccess,
    deleteGeneralSettingRequest,
    deleteGeneralSettingRequestFailure,
    deleteGeneralSettingRequestSuccess,
} from "../../../action/Admin/GeneralSettings/generalSettingsActions.js";

export const getGeneralSettingByName = (settingName) => {
    return async function (dispatch) {
        dispatch(getGeneralSettingRequest());
        return await request(`${ENDPOINT["GeneralSettings"]}?settingName=${settingName}`, getOptions({})).then(response => response)
            .then(data => {
                return (dispatch(getGeneralSettingRequestSuccess(data.result.data[0])))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getGeneralSettingRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getGeneralSettingRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(getGeneralSettingRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getGeneralSettingRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}





// to update the setting
export const UpdateGeneralSettingData = (setting) => {
    return async function (dispatch) {
        dispatch(updateGeneralSettingRequest());
        return await request(`${ENDPOINT["UpdateGeneralSetting"]}`, postOptions(setting)).then(response => response)
            .then(data => {
                return (dispatch(updateGeneralSettingRequestSuccess(data.result)))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(updateGeneralSettingRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(updateGeneralSettingRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(updateGeneralSettingRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(updateGeneralSettingRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}



// to add the setting
export const AddNewGeneralSetting = (setting) => {
    return async function (dispatch) {
        dispatch(addGeneralSettingRequest());
        return await request(`${ENDPOINT["AddGeneralSetting"]}`, postOptions({...setting})).then(response => response)
            .then(data => {
                return (dispatch(addGeneralSettingRequestSuccess(data.result)))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(addGeneralSettingRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(addGeneralSettingRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(addGeneralSettingRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(addGeneralSettingRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}





// to delete the setting
export const DeleteExistingGeneralSettingByName = (settingName) => {
    return async function (dispatch) {
        dispatch(deleteGeneralSettingRequest());
        return await request(`${ENDPOINT["DeleteGeneralSetting"]}?settingName=${settingName}`, getOptions({})).then(response => response)
            .then(data => {
                return (dispatch(deleteGeneralSettingRequestSuccess(data.result)))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(deleteGeneralSettingRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(deleteGeneralSettingRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(deleteGeneralSettingRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(deleteGeneralSettingRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}

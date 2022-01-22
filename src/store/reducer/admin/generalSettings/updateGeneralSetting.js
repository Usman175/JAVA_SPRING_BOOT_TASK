import * as types from '../../../constants/constant.js'

const initialState = {
    updateGeneralSettingPending: false,
    updateGeneralSettingSuccess: false,
    updateGeneralSettingFailure: false,
    updateGeneralSettingFailurePayload: {},
    updateGeneralSettingSuccessPayload: {},
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.UPDATE_GENERAL_SETTING_REQUEST:
            return {
                ...state,
                updateGeneralSettingPending: true,
                updateGeneralSettingSuccess: false,
                updateGeneralSettingFailure: false,
            }
        case types.UPDATE_GENERAL_SETTING_REQUEST_SUCCESS:
            return {
                ...state,
                updateGeneralSettingPending: false,
                updateGeneralSettingSuccess: true,
                updateGeneralSettingFailure: false,
                updateGeneralSettingSuccessPayload: action.payload,
            }
        case types.UPDATE_GENERAL_SETTING_REQUEST_FAILED:
            return {
                ...state,
                updateGeneralSettingFailure: true,
                updateGeneralSettingSuccess: false,
                updateGeneralSettingPending: false,
                updateGeneralSettingFailurePayload: action.payload,
            }
        case types.UPDATE_GENERAL_SETTING_REQUEST_CLEANUP:
            return {
                ...state,
                updateGeneralSettingPending: false,
                updateGeneralSettingSuccess: false,
                updateGeneralSettingFailure: false,
                updateGeneralSettingFailurePayload: {},
                updateGeneralSettingSuccessPayload: {},
            }
        default :
            return state;
    }
}

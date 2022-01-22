import * as types from '../../../constants/constant.js'

const initialState = {
    addGeneralSettingPending: false,
    addGeneralSettingSuccess: false,
    addGeneralSettingFailure: false,
    addGeneralSettingFailurePayload: {},
    addGeneralSettingSuccessPayload: {},
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.ADD_GENERAL_SETTING_REQUEST:
            return {
                ...state,
                addGeneralSettingPending: true,
                addGeneralSettingSuccess: false,
                addGeneralSettingFailure: false,
            }
        case types.ADD_GENERAL_SETTING_REQUEST_SUCCESS:
            return {
                ...state,
                addGeneralSettingPending: false,
                addGeneralSettingSuccess: true,
                addGeneralSettingFailure: false,
                addGeneralSettingSuccessPayload: action.payload,
            }
        case types.ADD_GENERAL_SETTING_REQUEST_FAILED:
            return {
                ...state,
                addGeneralSettingFailure: true,
                addGeneralSettingSuccess: false,
                addGeneralSettingPending: false,
                addGeneralSettingFailurePayload: action.payload,
            }
        case types.ADD_GENERAL_SETTING_REQUEST_CLEANUP:
            return {
                ...state,
                addGeneralSettingPending: false,
                addGeneralSettingSuccess: false,
                addGeneralSettingFailure: false,
                addGeneralSettingFailurePayload: {},
                addGeneralSettingSuccessPayload: {},
            }
        default :
            return state;
    }
}

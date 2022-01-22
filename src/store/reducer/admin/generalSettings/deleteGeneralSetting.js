import * as types from '../../../constants/constant.js'

const initialState = {
    deleteGeneralSettingPending: false,
    deleteGeneralSettingSuccess: false,
    deleteGeneralSettingFailure: false,
    deleteGeneralSettingFailurePayload: {},
    deleteGeneralSettingSuccessPayload: {},
}

export default (state = {...initialState}, action) => {
    switch(action.type){
        case types.DELETE_GENERAL_SETTING_REQUEST:
            return {
                ...state,
                deleteGeneralSettingPending: true,
                deleteGeneralSettingSuccess: false,
                deleteGeneralSettingFailure: false,
            }
        case types.DELETE_GENERAL_SETTING_REQUEST_SUCCESS:
            return {
                ...state,
                deleteGeneralSettingPending: false,
                deleteGeneralSettingSuccess: true,
                deleteGeneralSettingFailure: false,
                deleteGeneralSettingSuccessPayload: action.payload,
            }
        case types.DELETE_GENERAL_SETTING_REQUEST_FAILED:
            return {
                ...state,
                deleteGeneralSettingFailure: true,
                deleteGeneralSettingSuccess: false,
                deleteGeneralSettingPending: false,
                deleteGeneralSettingFailurePayload: action.payload,
            }
        case types.DELETE_GENERAL_SETTING_REQUEST_CLEANUP:
            return {
                ...state,
                deleteGeneralSettingPending: false,
                deleteGeneralSettingSuccess: false,
                deleteGeneralSettingFailure: false,
                deleteGeneralSettingFailurePayload: {},
                deleteGeneralSettingSuccessPayload: {},
            }
        default :
            return state;
    }
}

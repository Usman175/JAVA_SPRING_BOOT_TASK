import * as types from '../../../constants/constant.js'

const initialState = {
    getGeneralSettingPending: false,
    getGeneralSettingSuccess: false,
    getGeneralSettingFailure: false,
    getGeneralSettingFailurePayload: {},
    generalSettingObj: {},
}

export default (state = {...initialState}, action) => {
    switch(action.type){
        case types.GET_GENERAL_SETTING_REQUEST:
            return {
                ...state,
                getGeneralSettingPending: true,
                getGeneralSettingSuccess: false,
                getGeneralSettingFailure: false,
            }
        case types.GET_GENERAL_SETTING_REQUEST_SUCCESS:
            return {
                ...state,
                getGeneralSettingPending: false,
                getGeneralSettingSuccess: true,
                getGeneralSettingFailure: false,
                generalSettingObj: action.payload,
            }
        case types.GET_GENERAL_SETTING_REQUEST_FAILED:
            return {
                ...state,
                getGeneralSettingFailure: true,
                getGeneralSettingSuccess: false,
                getGeneralSettingPending: false,
                getGeneralSettingFailurePayload: action.payload,
            }
        case types.GET_GENERAL_SETTING_REQUEST_CLEANUP:
            return {
                ...state,
                getGeneralSettingPending: false,
                getGeneralSettingSuccess: false,
                getGeneralSettingFailure: false,
                getGeneralSettingFailurePayload: {},
                generalSettingObj: {},
            }
        default :
            return state;
    }
}

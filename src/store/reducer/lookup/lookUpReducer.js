import * as types from '../../constants/constant.js'

const initialState = {
    getLookUpDataPending: false,
    getLookUpDataSuccess: false,
    getLookUpDataFailure: false,
    getLookUpDataFailurePayload: {},
    lookUpData: {},
    getDefaultAddressDataPending: false,
    getDefaultAddressSuccess: false,
    getDefaultAddressFailure: false,
    getDefaultAddressFailurePayload: {},
    defaultAddress: [],
}

export default (state = {...initialState}, action) => {
    switch(action.type){
        case types.GET_IP_LOOKUP_DATA_REQUEST:
            return {
                ...state,
                getLookUpDataPending: true,
                getLookUpDataSuccess: false,
                getLookUpDataFailure: false,
            }
        case types.GET_IP_LOOKUP_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                getLookUpDataPending: false,
                getLookUpDataSuccess: true,
                getLookUpDataFailure: false,
                lookUpData: action.payload,
            }
        case types.GET_IP_LOOKUP_DATA_REQUEST_FAILED:
            return {
                ...state,
                getLookUpDataFailure: true,
                getLookUpDataSuccess: false,
                getLookUpDataPending: false,
                getLookUpDataFailurePayload: action.payload,
            }
        case types.GET_IP_LOOKUP_DATA_REQUEST_CLEANUP:
            return {
                ...state,
                getLookUpDataPending: false,
                getLookUpDataSuccess: false,
                getLookUpDataFailure: false,
                getLookUpDataFailurePayload: {},
                lookUpData: {},
            }
            case types.GET_DEFAULT_ADDRESS_DATA_REQUEST:
            return {
                ...state,
                getDefaultAddressDataPending: true,
                getDefaultAddressDataSuccess: false,
                getDefaultAddressDataFailure: false,
            }
        case types.GET_DEFAULT_ADDRESS_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                getDefaultAddressDataPending: false,
                getDefaultAddressDataSuccess: true,
                getDefaultAddressDataFailure: false,
                defaultAddress: action.payload,
            }
        case types.GET_DEFAULT_ADDRESS_DATA_REQUEST_FAILED:
            return {
                ...state,
                getDefaultAddressDataFailure: true,
                getDefaultAddressDataSuccess: false,
                getDefaultAddressDataPending: false,
                getDefaultAddressFailurePayload: action.payload,
            }
        case types.GET_DEFAULT_ADDRESS_DATA_REQUEST_CLEANUP:
            return {
                ...state,
                getDefaultAddressDataPending: false,
                getDefaultAddressDataSuccess: false,
                getDefaultAddressDataFailure: false,
                getDefaultAddressFailurePayload: {},
                defaultAddress: {},
            }
        default :
            return state;
    }
}

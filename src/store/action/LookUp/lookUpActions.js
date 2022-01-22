import * as types from "../../constants/constant.js"

export function getLookUpDataRequest() {
    return {
        type: types.GET_IP_LOOKUP_DATA_REQUEST
    }
}

export function getLookUpDataRequestSuccess(data) {
    return {
        type: types.GET_IP_LOOKUP_DATA_REQUEST_SUCCESS,
        payload: data
    }
}

export function getLookUpDataRequestFailure(data) {
    return{
        type: types.GET_IP_LOOKUP_DATA_REQUEST_FAILED,
        payload: data
    }
}


export function getLookUpDataRequestCleanUp() {
    return{
        type: types.GET_IP_LOOKUP_DATA_REQUEST_CLEANUP,
    }
}

export function getDefaultAddressDataRequest(data) {
    return {
        type: types.GET_DEFAULT_ADDRESS_DATA_REQUEST,
        payload: data
    }
}

export function getDefaultAddressDataRequestSuccess(data) {
    return {
        type: types.GET_DEFAULT_ADDRESS_DATA_REQUEST_SUCCESS,
        payload: data
    }
}

export function getDefaultAddressDataRequestFailure(data) {
    return{
        type: types.GET_DEFAULT_ADDRESS_DATA_REQUEST_FAILED,
        payload: data
    }
}


export function getDefaultAddressDataCleanUp() {
    return{
        type: types.GET_DEFAULT_ADDRESS_DATA_REQUEST_CLEANUP,
    }
}

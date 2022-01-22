import * as types from "../types"

export function getClientDetailByUserIdRequest() {
    return {
        type: types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST
    }
}

export function getClientDetailByUserIdRequestSuccess(data) {
    return {
        type: types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_SUCCESS,
        payload: data
    }
}

export function getClientDetailByUserIdRequestFailure(data) {
    return{
        type: types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_FAILED,
        payload: data
    }
}


// export function getClientDetailByUserIdRequestCleanUp() {
//     return{
//         type: types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_CLEANUP,
//     }
// }

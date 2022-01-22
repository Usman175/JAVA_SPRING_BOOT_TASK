import * as types from "../../constants/constant.js"

export function getContestByIdRequest() {
    return {
        type: types.GET_CONTEST_BY_PROJECT_ID_REQUEST
    }
}

export function getContestByIdRequestSuccess(data) {
    return {
        type: types.GET_CONTEST_BY_PROJECT_ID_REQUEST_SUCCESS,
        payload: data
    }
}

export function getContestByIdRequestFailure(data) {
    return{
        type: types.GET_CONTEST_BY_PROJECT_ID_REQUEST_FAILED,
        payload: data
    }
}


export function getContestByIdRequestCleanUp() {
    return{
        type: types.GET_CONTEST_BY_PROJECT_ID_REQUEST_CLEANUP,
    }
}

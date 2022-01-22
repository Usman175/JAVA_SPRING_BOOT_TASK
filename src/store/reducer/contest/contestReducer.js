import * as types from '../../constants/constant.js'

const initialState = {
    getContestByIdPending: false,
    getContestByIdSuccess: false,
    getContestByIdFailure: false,
    getContestByIdFailurePayload: {},
    singleContestObj: {},
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.GET_CONTEST_BY_PROJECT_ID_REQUEST:
            return {
                ...state,
                getContestByIdPending: true,
                getContestByIdSuccess: false,
                getContestByIdFailure: false,
            }
        case types.GET_CONTEST_BY_PROJECT_ID_REQUEST_SUCCESS:
            return {
                ...state,
                getContestByIdPending: false,
                getContestByIdSuccess: true,
                getContestByIdFailure: false,
                singleContestObj: action.payload,
            }
        case types.GET_CONTEST_BY_PROJECT_ID_REQUEST_FAILED:
            return {
                ...state,
                getContestByIdFailure: true,
                getContestByIdSuccess: false,
                getContestByIdPending: false,
                getContestByIdFailurePayload: action.payload,
            }
        case types.GET_CONTEST_BY_PROJECT_ID_REQUEST_CLEANUP:
            return {
                ...state,
                getContestByIdPending: false,
                getContestByIdSuccess: false,
                getContestByIdFailure: false,
                getContestByIdFailurePayload: {},
                singleContestObj: {},
            }
        default :
            return state;
    }
}

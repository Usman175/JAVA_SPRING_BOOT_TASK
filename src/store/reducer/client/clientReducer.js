import * as types from '../../action/types'

const initialState = {
    getClientDetailByUserIdPending: false,
    getClientDetailByUserIdSuccess: false,
    getClientDetailByUserIdFailure: false,
    getClientDetailByUserIdFailurePayload: {},
    clientDetailByUserId: [],
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST:
            return {
                ...state,
                getClientDetailByUserIdPending: true,
                getClientDetailByUserIdSuccess: false,
                getClientDetailByUserIdFailure: false,
            }
        case types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_SUCCESS:
            return {
                ...state,
                getClientDetailByUserIdPending: false,
                getClientDetailByUserIdSuccess: true,
                getClientDetailByUserIdFailure: false,
                clientDetailByUserId: action.payload,
            }
        case types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_FAILED:
            return {
                ...state,
                getClientDetailByUserIdFailure: true,
                getClientDetailByUserIdSuccess: false,
                getClientDetailByUserIdPending: false,
                getClientDetailByUserIdFailurePayload: action.payload,
            }
        case types.GET_CLIENT_DETAIL_BY_USER_ID_REQUEST_CLEANUP:
            return {
                ...state,
                getClientDetailByUserIdPending: false,
                getClientDetailByUserIdSuccess: false,
                getClientDetailByUserIdFailure: false,
                getClientDetailByUserIdFailurePayload: {},
                clientDetailByUserId: [],
            }
        default :
            return state;
    }
}

import { GET_USER_LOADING, GET_USER_SUCCESSFULL, GET_USER_ERROR, REMOVE_USER, GET_USER_PROFILE_IMAGE } from '../../constants/constant';

const INITIAL_STATE = {
    user: null,
    isLoading: null,
    error: null,
    profileImage: null
};

export default (states = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case GET_USER_LOADING:
            return {
                ...states,
                isLoading: true
            };
         case GET_USER_SUCCESSFULL:
            return {
                ...states,
                isLoading: false,
                user: action.payload,
                error: ""
            };
        case REMOVE_USER:
            return {
                user: null,
                isLoading: false,
                error: null,
            };
        case GET_USER_ERROR:
            return {
                ...states,
                isLoading: false,
                user: null,
                error: action.payload
            }
        case GET_USER_PROFILE_IMAGE:
            return {
                ...states,
                profileImage: action.payload
            }
        default:
            return states;
    }
};
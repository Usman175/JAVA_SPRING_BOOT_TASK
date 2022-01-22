import { SET_ORG_PROFILE_IMAGE, SET_ORG_OTHER_IMAGES, REMOVE_ORG_OTHER_IMAGE, REMOVE_ORG_PROFILE_IMAGE, GET_ORGANIZATION} from '../../constants/constant';

const initialState = {
    orgProfileImage: null,
    orgOtherImage: [],
    organization: null,
    prefixUrl: null,
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case GET_ORGANIZATION:
            return {
                ...state,
                organization: action.payload,
                isLoading: false,
            };
        case SET_ORG_PROFILE_IMAGE:
            return {
                ...state,
                orgProfileImage: action.payload,
                isLoading: false,
            };
        case SET_ORG_OTHER_IMAGES:
            return {
                ...state,
                orgOtherImage: [...state.orgOtherImage, action.payload],
                isLoading: false,
        };
        case REMOVE_ORG_OTHER_IMAGE:
            return {
                ...state,
                orgOtherImage: action.payload,
                isLoading: false,
        };
        case REMOVE_ORG_PROFILE_IMAGE:
            return {
                ...state,
                orgProfileImage: action.payload,
                isLoading: false,
        };

        default:
            return state;
    }
};
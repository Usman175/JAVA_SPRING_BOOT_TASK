import { SET_ORG_PROFILE_IMAGE, SET_ORG_OTHER_IMAGES, REMOVE_ORG_OTHER_IMAGE, REMOVE_ORG_PROFILE_IMAGE, GET_ORGANIZATION } from "../constants/constant";


export const uploadOrgProfileImages = (data) => async (dispatch, getState) => {
    await dispatch({
        type: SET_ORG_PROFILE_IMAGE,
        payload: data
    });
};

export const uploadOrgOtherImages = (data) => async (dispatch, getState) => {
    await dispatch({
        type: SET_ORG_OTHER_IMAGES,
        payload: data
    });
};

export function removeOrgOtherImage(data){
    return(dispatch, getState)=> {
        dispatch({
            type: REMOVE_ORG_OTHER_IMAGE,
            payload: data
        }) 
    }
}

export function removeOrgProfileImage(){
    return(dispatch)=> {
        dispatch({
            type: REMOVE_ORG_PROFILE_IMAGE,
            payload: null
        }) 
    }
}

export const getOrganization = (data) => async (dispatch, getState) => {
    await dispatch({
        type: GET_ORGANIZATION,
        payload: data
    });
}


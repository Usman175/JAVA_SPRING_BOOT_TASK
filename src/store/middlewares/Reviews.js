import {ENDPOINT} from "../../utils/endpoint";
import {getOptions} from "../../utils/httpConfig";
import request from "../../utils/request";

import {
    getProjectReviewsClientWise,
    getProjectReviewsClientWiseSuccess,
    getProjectReviewsClientWiseFailure,

    getProjectReviewsFreelancerWise,
    getProjectReviewsFreelancerWiseSuccess,
    getProjectReviewsFreelancerWiseFailure
} from "../action/Reviews/ReviewsActions";

export const getProjectReviewClientWise = ({clientUserId}) => {
    return async function (dispatch) {
        dispatch(getProjectReviewsClientWise())
        return await request(
            `${ENDPOINT["GetProjectReviewClientWise"]}?clientUserId=${clientUserId}`,
            getOptions({})
        ).then(response => response)
            .then(data => {return (dispatch(getProjectReviewsClientWiseSuccess(data.result)))})
            .catch((error) => {
                console.log(error);
                if(error.toString().includes('Network Error') || error.toString().includes('TypeError')){
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getProjectReviewsClientWiseFailure(errorData)))
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 400 || error.response.data.code === 401){
                                return (dispatch(getProjectReviewsClientWiseFailure(error.response.data)))
                            }
                            if(error.response.data.code === 409){
                                const errorData = {code:409, message: error.response.data.message}
                                return (dispatch(getProjectReviewsClientWiseFailure(errorData)))
                            }
                            if(error.response.data.code === 500){
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getProjectReviewsClientWiseFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}

export const getProjectReviewFreelancerWise = ({freelancerUserId}) => {
    return async function (dispatch) {
        dispatch(getProjectReviewsFreelancerWise())
        return await request(
            `${ENDPOINT["GetProjectReviewFreeLancerWise"]}?freelancerUserId=${freelancerUserId}`,
            getOptions({})
        ).then(response => response)
            .then(data => {return (dispatch(getProjectReviewsFreelancerWiseSuccess(data.result)))})
            .catch((error) => {
                console.log(error);
                if(error.toString().includes('Network Error') || error.toString().includes('TypeError')){
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getProjectReviewsFreelancerWiseFailure(errorData)))
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 400 || error.response.data.code === 401){
                                return (dispatch(getProjectReviewsFreelancerWiseFailure(error.response.data)))
                            }
                            if(error.response.data.code === 409){
                                const errorData = {code:409, message: error.response.data.message}
                                return (dispatch(getProjectReviewsFreelancerWiseFailure(errorData)))
                            }
                            if(error.response.data.code === 500){
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getProjectReviewsFreelancerWiseFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}

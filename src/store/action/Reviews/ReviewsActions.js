import * as types from "../types"

export function getProjectReviewsClientWise() {
    return {
        type: types.GET_PROJECT_REVIEWS_CLIENT_WISE
    }
}

export function getProjectReviewsClientWiseSuccess(data) {
    return {
        type: types.GET_PROJECT_REVIEWS_CLIENT_WISE_SUCCESS,
        payload: data
    }
}

export function getProjectReviewsClientWiseFailure(data) {
    return{
        type: types.GET_PROJECT_REVIEWS_CLIENT_WISE_FAILED,
        payload: data
    }
}

export function getProjectReviewsFreelancerWise() {
    return {
        type: types.GET_PROJECT_REVIEWS_FREELANCER_WISE
    }
}

export function getProjectReviewsFreelancerWiseSuccess(data) {
    return {
        type: types.GET_PROJECT_REVIEWS_FREELANCER_WISE_SUCCESS,
        payload: data
    }
}

export function getProjectReviewsFreelancerWiseFailure(data) {
    return{
        type: types.GET_PROJECT_REVIEWS_FREELANCER_WISE_FAILED,
        payload: data
    }
}

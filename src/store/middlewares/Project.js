import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";
import request from "../../utils/request";
import {
    getUserProjectDetail,
    getUserProjectDetailSuccess,
    getUserProjectDetailFailure,
    getProjectDetail,

    getProjectDetailFailure,
    getProjectDetailSuccess,

    getUserProjectContractDetail,
    getUserProjectContractDetailSuccess,
    getUserProjectContractDetailFailure
} from "../action/Project/projectActions";

export const getUserProjectDetails = (projectId, userId) => {
    return async function (dispatch) {
        dispatch(getUserProjectDetail())
        return await request(
            `${ENDPOINT["GetProjectDetails1"]}?projectId=${projectId}&userId=${userId}`,
            getOptions({})
        ).then(response => response)
            .then(data => { return (dispatch(getUserProjectDetailSuccess(data.result.data.projectResponse))) })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = { code: 503, message: "Network Error" }
                    return (dispatch(getUserProjectDetailFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getUserProjectDetailFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = { code: 409, message: error.response.data.message }
                                return (dispatch(getUserProjectDetailFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = { code: 500, message: "Internal Server Error" }
                                return (dispatch(getUserProjectDetailFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}


export const getProjectDetails = (projectId) => {
    console.log("id in action", projectId)
    return async function (dispatch) {
        dispatch(getProjectDetail())
        return await request(
            `${ENDPOINT["GetProjectDetails"]}?projectId=` + projectId, getOptions({})
        ).then(response => response)
            .then(data => { return (dispatch(getProjectDetailSuccess(data.result.data.projectResponse))) })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = { code: 503, message: "Network Error" }
                    return (dispatch(getProjectDetailFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getProjectDetailFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = { code: 409, message: error.response.data.message }
                                return (dispatch(getProjectDetailFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = { code: 500, message: "Internal Server Error" }
                                return (dispatch(getProjectDetailFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}


export const getProjectContractDetail = ({ projectId, freelancerUserId }) => {
    return async function (dispatch) {
        dispatch(getUserProjectContractDetail())
        return await request(
            `${ENDPOINT["GetProjectContractDetail"]}?projectId=${projectId}&freelancerUserId=${freelancerUserId}`,
            getOptions({})
        ).then(response => response)
            .then(data => { return (dispatch(getUserProjectContractDetailSuccess(data.result))) })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = { code: 503, message: "Network Error" }
                    return (dispatch(getUserProjectContractDetailFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getUserProjectContractDetailFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = { code: 409, message: error.response.data.message }
                                return (dispatch(getUserProjectContractDetailFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = { code: 500, message: "Internal Server Error" }
                                return (dispatch(getUserProjectContractDetailFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
}

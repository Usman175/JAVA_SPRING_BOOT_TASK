import {ENDPOINT} from "../../../utils/endpoint.js";
import {getOptions} from "../../../utils/httpConfig.js";
import request from "../../../utils/request.js";
import {
    getContestByIdRequest,
    getContestByIdRequestFailure,
    getContestByIdRequestSuccess
} from "../../action/Contest/contestActions.js";

export const getContestById = (contestId) => {
    // alert("Middleware called 1")
    return async function (dispatch) {
        // alert("Middleware called 2")
        dispatch(getContestByIdRequest());
        // alert("Middleware called 3")
        return await request(`${ENDPOINT["GetProjectBidding"]}?projectId=${contestId}&pageNumber=1&pageSize=1000`, getOptions({})).then(response => response)
            .then(data => {
                return (dispatch(getContestByIdRequestSuccess(data.result.data)))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getContestByIdRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getContestByIdRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(getContestByIdRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getContestByIdRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
        // alert("Middleware called 4")
    }
}

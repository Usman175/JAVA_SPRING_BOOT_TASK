import {ENDPOINT} from "../../../utils/endpoint.js";
import {getOptions} from "../../../utils/httpConfig.js";
import request from "../../../utils/request.js";
import {
    getClientDetailByUserIdRequest,
    getClientDetailByUserIdRequestFailure,
    getClientDetailByUserIdRequestSuccess
} from "../../action/Client/getClientDetailsActions.js";

export const getClientDetail = ({userId}) => {
    // alert("Middleware called 1")
    return async function (dispatch) {
        // alert("Middleware called 2")
        dispatch(getClientDetailByUserIdRequest());
        // alert("Middleware called 3")
        return await request(`${ENDPOINT["GetClientDetails"]}?userId=${userId}`, getOptions({})).then(response => response)
            .then(data => {
                return (dispatch(getClientDetailByUserIdRequestSuccess(data.result.data)))
            })
            .catch((error) => {
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getClientDetailByUserIdRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getClientDetailByUserIdRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(getClientDetailByUserIdRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getClientDetailByUserIdRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
        // alert("Middleware called 4")
    }
}

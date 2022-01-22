import {getOptions} from "../utils/httpConfig";
import request from "../utils/request";
import {ENDPOINT} from "../utils/endpoint"; 

export const hitApiGetUser = async (userId) => {
    try {
        let result = await request(`${ENDPOINT["GetAccount"]}?accountId=` + userId, getOptions({}));
        if (result && result.success) {
            return result;
        } else {
            return "Server Error"
        }
    } catch (ex) {
        return ex + "Server Error"
    }
}
export const getRegisterUserTypes = async (userId) => {
    try {
        let result = await request(`${ENDPOINT["GetRegisteredUserTypes"]}?accountId=` + userId, getOptions({}));
        if (result && result.success) {
            return result;
        } else {
            return "Server Error"
        }
    } catch (ex) {
        return ex + "Server Error"
    }
}
export const getUserToken = async (userId) => {
    try {
        let result = await request(`${ENDPOINT["GetToken"]}?accountId=` + userId, getOptions({}));
        if (result && result.success) {
               localStorage.setItem('USER_TOKEN',result.result)
              return result;
        } else {
            return "Server Error"
        }
    } catch (ex) {
        return ex + "Server Error"
    }
}
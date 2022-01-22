import {combineReducers} from 'redux';
import addGeneralSetting from "./addGeneralSetting.js";
import deleteGeneralSetting from "./deleteGeneralSetting.js";
import getGeneralSetting from "./getGeneralSetting.js";
import updateGeneralSetting from "./updateGeneralSetting.js";

export default combineReducers({
    getGeneralSetting: getGeneralSetting,
    updateGeneralSetting: updateGeneralSetting,
    addGeneralSetting: addGeneralSetting,
    deleteGeneralSetting: deleteGeneralSetting,
})
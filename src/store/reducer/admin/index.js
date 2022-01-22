import {combineReducers} from 'redux';
import generalSettingReducers from "./generalSettings/index.js";

export default combineReducers({
    generalSettings: generalSettingReducers
})

import contestReducer from "./contest/contestReducer.js";
import LanguageReducer  from './languageReducer/languageReducer';
import lookUpReducer from "./lookup/lookUpReducer.js";
import RouteStore from "./route";
import ProjectStore from "./project";
import ChannelReducer from './channelReducer/channelReducer';
import SettingReducer from './SettingReducer/SettingReducer';
import authReducer from './authReducer/authReducer';
import userReducer from './userReducer/userReducer';
import reviewsReducer from './reviews'
import generalSettingsReducer from './generalSettingsReducer/generalSettingsReducer';
import organizationReducer from './organizationReducer/organizationReducer'
import clientReducer from './client/clientReducer'
import clientRegistration from './client/clientRegistration'
import headhunterRegistration from './freelancer/headhunterRegisteration'
import freelancerRegistration from './freelancer/freelancerRegistration'
import OrganizationRegistration from './freelancer/organizationRegistration'
import adminReducers from "./admin"
import {combineReducers} from 'redux';

export default combineReducers({
    settingReducer:SettingReducer,
    languageReducer: LanguageReducer,
    routeStore: RouteStore,
    projectStore: ProjectStore,
    contest: contestReducer,
    channelReducer:ChannelReducer,
    clientReducer,
    clientRegistration,
    headhunterRegistration,
    freelancerRegistration,
    OrganizationRegistration,
    reviews:reviewsReducer,
    authReducer,
    userReducer,
    generalSettingsReducer,
    organizationReducer,
    admin: adminReducers,
    lookUp: lookUpReducer
})


import {
  GetRegion,
  GetLocation,
  GetCountry,
  GetAuth,
  GetFreelancerAuth,
  GetOrganizationAuth,
  GetClientAuth,
} from "./../../../utils/auth";
import {
  SET_CROSS_DOMAIN_DATA,
  GUEST_USER,
  REMOVE_CROSS_DOMAIN_DATA,
  FREELANCER_CLIENT_AUTH_DATA,
  SET_REGISTERED_USER_TYPES,
  SET_ACTIVE_USER_TYPE,
  UPDATE_REGISTER_USER_FLAG
} from "./../../constants/constant";

const INITIAL_STATE = {
  myAuth: GetAuth(),
  freelancerAuth: GetFreelancerAuth(),
  organizationAuth: GetOrganizationAuth(),
  clientAuth: GetClientAuth(),
  myRegion: GetRegion(),
  myCountry: GetCountry(),
  myLocation: GetLocation(),
  registeredUserTypes:[],
  activeUserType:"",
  isRegisterAsClient:false,
  isRegisterAsFreelancer:false,
  isRegisterAsOrganization:false,
  isRegisterAsHeadhunter:false, 
  isLoading:true,
  isGuest: true,
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CROSS_DOMAIN_DATA:
      return {
        ...states,
        myAuth: GetAuth(),
        myRegion: GetRegion(),
        myCounty: GetCountry(),
        myLocation: GetLocation(),
      };
      case SET_REGISTERED_USER_TYPES:
        return {
          ...states,
          registeredUserTypes:action.payload,
          isLoading:false
        };
      case SET_ACTIVE_USER_TYPE:
          return {
            ...states,
            activeUserType:action.payload,
       };
       case UPDATE_REGISTER_USER_FLAG:
        return {
          ...states,
          [action.payload.type]:action.payload.flag,
     };  
    case FREELANCER_CLIENT_AUTH_DATA:
      return {
        ...states,
        freelancerAuth: GetFreelancerAuth(),
        organizationAuth: GetOrganizationAuth(),
        clientAuth: GetClientAuth(),
      };
    case GUEST_USER:
      return {
        ...states,
        isGuest: action.payload,
      };
    case REMOVE_CROSS_DOMAIN_DATA:
      return {
        myAuth: GetAuth(),
        myRegion: GetRegion(),
        myCountry: GetCountry(),
        myLocation: GetLocation(),
        isGuest: true,
      };
    default:
      return states;
  }
};

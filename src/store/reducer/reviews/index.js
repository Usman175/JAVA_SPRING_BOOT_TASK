

import {
  GET_PROJECT_REVIEWS_CLIENT_WISE,
  GET_PROJECT_REVIEWS_CLIENT_WISE_SUCCESS,
  GET_PROJECT_REVIEWS_CLIENT_WISE_FAILED,

  GET_PROJECT_REVIEWS_FREELANCER_WISE,
  GET_PROJECT_REVIEWS_FREELANCER_WISE_SUCCESS,
  GET_PROJECT_REVIEWS_FREELANCER_WISE_FAILED
} from "../../action/types"


const INITIAL_STATE = {

  getProjectReviewsClientWisePending: false,
  getProjectReviewsClientWiseSuccess: false,
  getProjectReviewsClientWiseFailure: false,
  getProjectReviewsClientWise: [],

  getProjectReviewsFreelancerWisePending: false,
  getProjectReviewsFreelancerWiseSuccess: false,
  getProjectReviewsFreelancerWiseFailure: false,
  getProjectReviewsFreelancerWise: [],
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {


    case GET_PROJECT_REVIEWS_CLIENT_WISE:
      return {
        ...states,
        getProjectReviewsClientWisePending: true,
        getProjectReviewsClientWiseSuccess: false,
        getProjectReviewsClientWiseFailure: false,
      }
    case GET_PROJECT_REVIEWS_CLIENT_WISE_SUCCESS:
      return {
        ...states,
        getProjectReviewsClientWisePending: false,
        getProjectReviewsClientWiseSuccess: true,
        getProjectReviewsClientWiseFailure: false,
        getProjectReviewsClientWise: action.payload.data,
      }
    case GET_PROJECT_REVIEWS_CLIENT_WISE_FAILED:
      return {
        ...states,
        getProjectReviewsClientWiseFailure: true,
        getProjectReviewsClientWiseSuccess: false,
        getProjectReviewsClientWisePending: false,
      }

    case GET_PROJECT_REVIEWS_FREELANCER_WISE:
      return {
        ...states,
        getProjectReviewsFreelancerWisePending: true,
        getProjectReviewsFreelancerWiseSuccess: false,
        getProjectReviewsFreelancerWiseFailure: false,
      }
    case GET_PROJECT_REVIEWS_FREELANCER_WISE_SUCCESS:
      return {
        ...states,
        getProjectReviewsFreelancerWisePending: false,
        getProjectReviewsFreelancerWiseSuccess: true,
        getProjectReviewsFreelancerWiseFailure: false,
        getProjectReviewsFreelancerWise: action.payload.data,
      }
    case GET_PROJECT_REVIEWS_FREELANCER_WISE_FAILED:
      return {
        ...states,
        getProjectReviewsFreelancerWiseFailure: true,
        getProjectReviewsFreelancerWiseSuccess: false,
        getProjectReviewsFreelancerWisePending: false,
      }

    default:
      return states;
  }
};



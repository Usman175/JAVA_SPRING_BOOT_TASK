import * as types from '../types';
import { ENDPOINT } from '../../../utils/endpoint';
import { getOptions } from '../../../utils/httpConfig';
import request from '../../../utils/request';

// Get project detail
export function getUserProjectDetail() {
  return {
    type: types.GET_USER_PROJECT_DETAILS_REQUEST,
  };
}
export function getProjectDetail() {
  return {
    type: types.GET_PROJECT_DETAILS_REQUEST,
  };
}
export function getUserProjectDetailSuccess(data) {
  return {
    type: types.GET_USER_PROJECT_DETAILS_REQUEST_SUCCESS,
    payload: data,
  };
}
export function getProjectDetailSuccess(data) {
  return {
    type: types.GET_PROJECT_DETAILS_REQUEST_SUCCESS,
    payload: data,
  };
}
export function getUserProjectDetailFailure(data) {
  return {
    type: types.GET_USER_PROJECT_DETAILS_REQUEST_FAILED,
    payload: data,
  };
}

//Get project contract detail
export function getProjectDetailFailure(data) {
  return {
    type: types.GET_PROJECT_DETAILS_REQUEST_FAILED,
    payload: data,
  };
}
export function getUserProjectContractDetail() {
  return {
    type: types.GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST,
  };
}

export function getUserProjectContractDetailSuccess(data) {
  return {
    type: types.GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_SUCCESS,
    payload: data,
  };
}

export function getUserProjectContractDetailFailure(data) {
  return {
    type: types.GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_FAILED,
    payload: data,
  };
}

//#region  Project Post - Post
export const projectPost_updateField = (field, value) => {
  return {
    type: types.PROJECT_POST_UPDATE_FIELD,
    payload: { [field]: value },
  };
};

export const projectPost_updateProjectType = (projectType) => {
  return {
    type: types.PROJECT_POST_UPDATE_PROJECT_TYPE,
    payload: { projectType },
  };
};

export const projectPost_updateProjectScope = (projectScope) => {
  return {
    type: types.PROJECT_POST_UPDATE_PROJECT_SCOPE,
    payload: { projectScope },
  };
};
export const projectPost_updateSelectedServices = (services) => {
  return {
    type: types.PROJECT_POST_UPDATE_SELECTED_SERVICES,
    payload: services,
  };
};

export const projectPost_updateProjectSubScope = (projectSubScope) => {
  return {
    type: types.PROJECT_POST_UPDATE_PROJECT_SUB_SCOPE,
    payload: { projectSubScope },
  };
};

export const projectPost_getProjectDetails = (projectId) => async (dispatch) => {
  const result = await request(`${ENDPOINT['GetProjectDetails']}?projectId=` + projectId, getOptions({}));
  const { projectType, jobTitle, jobDescription } = result.result.data.projectResponse;

  dispatch({
    type: types.PROJECT_POST_GET_PROJECT_DETAILS,
    payload: {
      projectId,
      projectType,
      jobTitle,
      jobDescription,
    },
  });
};

export const projectPost_jobTitleChanged = (jobTitle) => {
  return {
    type: types.PROJECT_POST_JOB_TITLE_CHANGED,
    payload: {
      jobTitle,
    },
  };
};

export const projectPost_jobDescriptionChanged = (jobDescription) => {
  return {
    type: types.PROJECT_POST_JOB_DESCRIPTION_CHANGED,
    payload: {
      jobDescription,
    },
  };
};

export const projectPost_addDocument = (document) => {
  return {
    type: types.PROJECT_POST_ADD_DOCUMENT,
    payload: { document },
  };
};

export const projectPost_removeDocument = (documentId) => {
  return {
    type: types.PROJECT_POST_REMOVE_DOCUMENT,
    payload: { documentId },
  };
};

export const projectPost_addSkill = (skill) => {
  return {
    type: types.PROJECT_POST_ADD_SKILL,
    payload: { skill },
  };
};

export const projectPost_removeSkill = (skill) => {
  return {
    type: types.PROJECT_POST_REMOVE_SKILL,
    payload: { skill },
  };
};

export const projectPost_updateFreelancerType = (freelancerType) => {
  return {
    type: types.PROJECT_POST_UPDATE_FREELANCER_TYPE,
    payload: { freelancerType },
  };
};

export const projectPost_updateFreelancerCount = (freelancerCount) => {
  return {
    type: types.PROJECT_POST_UPDATE_FREELANCER_COUNT,
    payload: { freelancerCount },
  };
};

export const projectPost_updatePeriod = (period) => {
  return {
    type: types.PROJECT_POST_UPDATE_PERIOD,
    payload: { period },
  };
};

export const projectPost_updateCurrency = (currency) => {
  return {
    type: types.PROJECT_POST_UPDATE_CURRENCY,
    payload: { currency },
  };
};

export const projectPost_updateAmount = (amount) => {
  return {
    type: types.PROJECT_POST_UPDATE_AMOUNT,
    payload: { amount },
  };
};

export const projectPost_updateMaxWeekHours = (maximumWeekHours) => {
  return {
    type: types.PROJECT_POST_UPDATE_MAX_WEEK_HOURS,
    payload: { maximumWeekHours },
  };
};

export const projectPost_updateNoOfDay = (noOfDay) => {
  return {
    type: types.PROJECT_POST_UPDATE_NO_OF_DAY,
    payload: { noOfDay },
  };
};

export const projectPost_updateAmountPerDay = (amountPerDay) => {
  return {
    type: types.PROJECT_POST_UPDATE_AMOUNT_PER_DAY,
    payload: { amountPerDay },
  };
};

export const projectPost_updateSalaryType = (salaryType) => {
  return {
    type: types.PROJECT_POST_UPDATE_SALARY_TYPE,
    payload: { salaryType },
  };
};

export const projectPost_updateFromSalary = (fromSalary) => {
  return {
    type: types.PROJECT_POST_UPDATE_FROM_SALARY,
    payload: { fromSalary },
  };
};

export const projectPost_updateToSalary = (toSalary) => {
  return {
    type: types.PROJECT_POST_UPDATE_TO_SALARY,
    payload: { toSalary },
  };
};

export const projectPost_updatePositionAvailableDate = (positionAvailableDate) => {
  return {
    type: types.PROJECT_POST_UPDATE_POSITION_AVAILABLE_DATE,
    payload: { positionAvailableDate },
  };
};
export const projectPost_UpdateAmountFreeContract=(field, value) => {
  return {
    type: types.PROJECT_POST_UPDATE_AMOUNT_FREE_CONTRACT,
    payload: { [field]: value },
  };
};
export const projectPost_updateLifecycleStage = (lifecycleStage) => {
  return {
    type: types.PROJECT_POST_UPDATE_LIFECYCLE_STAGE,
    payload: { lifecycleStage },
  };
};

export const projectPost_updateMinimunRequirementField = (field, value) => {
  return {
    type: types.PROJECT_POST_UPDATE_MINIMUM_REQUIREMENT_FIELD,
    payload: { [field]: value },
  };
};
export const projectPost_updatePerHourAmount = (field, value) => {
  return {
    type: types.PROJECT_POST_UPDATE_PER_HOUR_AMOUNT,
    payload: { [field]: value },
  };
};
export const projectPost_updateProbationPeriod = (field, value) => {
  return {
    type: types.PROJECT_POST_UPDATE_PROBATION_PERIOD,
    payload: { [field]: value },
  };
};
export const projectPost_updateSuccessfully = () => {
  return {
    type: types.PROJECT_POST_SUCCESSFULLY_DONE,
    payload: {success:true},
  };
};

export const projectPost_updateScreeningQuestions = (screeningQuestions) => {
  return {
    type: types.PROJECT_POST_UPDATE_SCREENING_QUESTIONS,
    payload: { screeningQuestions },
  };
};
export const  projectPost_updateOfferedMilestones= (milestones) => {
  return {
    type: types.PROJECT_POST_UPDATE_OFFERED_MILESTONE,
    payload: milestones,
  };
};
export const projectPost_updateIsCoverLetterRequired = (isCoverLetterRequired) => {
  return {
    type: types.PROJECT_POST_UPDATE_IS_COVER_LETTER_REQUIRED,
    payload: { isCoverLetterRequired },
  };
};
//#endregion

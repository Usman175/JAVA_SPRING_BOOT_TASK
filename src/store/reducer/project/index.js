import { PROJECT_SELECT_CONST, PROJECT_CONFIRMATION_DATA_CONST, SAVE_PROJECT_DATA_CONST } from '../../constants/constant';

import {
  GET_USER_PROJECT_DETAILS_REQUEST,
  GET_USER_PROJECT_DETAILS_REQUEST_SUCCESS,
  GET_USER_PROJECT_DETAILS_REQUEST_FAILED,
  GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_FAILED,
  GET_PROJECT_DETAILS_REQUEST,
  GET_PROJECT_DETAILS_REQUEST_SUCCESS,
  GET_PROJECT_DETAILS_REQUEST_FAILED,
  GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST,
  GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_SUCCESS,
  PROJECT_POST_UPDATE_FIELD,
  PROJECT_POST_UPDATE_PROJECT_TYPE,
  PROJECT_POST_UPDATE_PROJECT_SCOPE,
  PROJECT_POST_UPDATE_SELECTED_SERVICES,
  PROJECT_POST_UPDATE_PROJECT_SUB_SCOPE,
  PROJECT_POST_GET_PROJECT_DETAILS,
  PROJECT_POST_JOB_TITLE_CHANGED,
  PROJECT_POST_JOB_DESCRIPTION_CHANGED,
  PROJECT_POST_ADD_DOCUMENT,
  PROJECT_POST_REMOVE_DOCUMENT,
  PROJECT_POST_ADD_SKILL,
  PROJECT_POST_REMOVE_SKILL,
  PROJECT_POST_UPDATE_FREELANCER_TYPE,
  PROJECT_POST_UPDATE_FREELANCER_COUNT,
  PROJECT_POST_UPDATE_PERIOD,
  PROJECT_POST_UPDATE_CURRENCY,
  PROJECT_POST_UPDATE_AMOUNT,
  PROJECT_POST_UPDATE_MAX_WEEK_HOURS,
  PROJECT_POST_UPDATE_NO_OF_DAY,
  PROJECT_POST_UPDATE_AMOUNT_PER_DAY,
  PROJECT_POST_UPDATE_SALARY_TYPE,
  PROJECT_POST_UPDATE_FROM_SALARY,
  PROJECT_POST_UPDATE_TO_SALARY,
  PROJECT_POST_UPDATE_POSITION_AVAILABLE_DATE,
  PROJECT_POST_UPDATE_LIFECYCLE_STAGE,
  PROJECT_POST_UPDATE_MINIMUM_REQUIREMENT_FIELD,
  PROJECT_POST_UPDATE_AMOUNT_FREE_CONTRACT,
  PROJECT_POST_UPDATE_PROBATION_PERIOD,
  PROJECT_POST_UPDATE_PER_HOUR_AMOUNT,
  PROJECT_POST_UPDATE_SCREENING_QUESTIONS,
  PROJECT_POST_UPDATE_OFFERED_MILESTONE,
  PROJECT_POST_UPDATE_IS_COVER_LETTER_REQUIRED,
  PROJECT_POST_SUCCESSFULLY_DONE
} from '../../action/types';

let byDefaultDate=new Date(new Date().setDate(new Date().getDate() +60)).toISOString();
const INITIAL_STATE = {
  selectedProject: '',
  projectConfirmData: '',
  savedProjectData: {},

  projectDetails: {},
  getProjectDetailPending: false,
  getProjectDetailSuccess: false,
  getProjectDetailFailure: false,
  getUserProjectDetailPending: false,
  getUserProjectDetailSuccess: false,
  getUserProjectDetailFailure: false,
  userProjectDetails: {},

  getUserProjectContractDetailPending: false,
  getUserProjectContractDetailSuccess: false,
  getUserProjectContractDetailFailure: false,
  userProjectContractDetails: {},

  projectPost: {
    projectType: '',
    projectScope: '',
    projectSubScope: '',

    isNeededNDA: false,
    isNeededSearchAssistant: false,
    isNeededUrgent: false,

    jobTitle: '',
    jobDescription: '',
    documents: [],
    selectedServices:[],
    skills: [],
    freelancerType: '',
    freelancerCount: '',
    period: '',
    currency: '',
    amount: '',

    minHourlyRate:'',
    maxHourlyRate:'',
    minDailyRate:'',
    maxDailyRate:'',
    
    salaryType: '',
    fromSalary: '',
    toSalary: '',
    positionAvailableDate: byDefaultDate,
     probationPeriod:{
     projectPeriod:"",
     isApply:"no",
     probationPeriod:""
     },
    maximumWeekHours: '',
    toAmount:"",
    fromAmount:"",
    lifecycleStage: '',
    offeredMilestones:[],
    minimumRequirement: {
      noOfStar: '3',
      jobSuccessScore: '71~80%',
      freelancerLocation: 'North America',
      freelancerLocations: [],
      yearOfExperience: '4',
      englishLevel: 'native',
      englishLevels: [],
      requiredLanguage: 'english',
    },
    screeningQuestions: [],
    isCoverLetterRequired: true,
  },
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_SELECT_CONST:
      return {
        ...states,
        selectedProject: action.payload,
      };
    case PROJECT_CONFIRMATION_DATA_CONST:
      return {
        ...states,
        projectConfirmData: action.payload,
      };
    case SAVE_PROJECT_DATA_CONST:
      return {
        ...states,
        savedProjectData: { [action.payload.key]: action.payload.data },
      };

    // get project detail
    case GET_USER_PROJECT_DETAILS_REQUEST:
      return {
        ...states,
        getUserProjectDetailPending: true,
        getUserProjectDetailSuccess: false,
        getUserProjectDetailFailure: false,
      };
    case GET_USER_PROJECT_DETAILS_REQUEST_SUCCESS:
      return {
        ...states,
        getUserProjectDetailPending: false,
        getUserProjectDetailSuccess: true,
        getUserProjectDetailFailure: false,
        userProjectDetails: action.payload,
      };
    case GET_USER_PROJECT_DETAILS_REQUEST_FAILED:
      return {
        ...states,
        getUserProjectDetailFailure: true,
        getUserProjectDetailSuccess: false,
        getUserProjectDetailPending: false,
        userProjectDetails: action.payload,
      };
    case GET_PROJECT_DETAILS_REQUEST:
      return {
        ...states,
        getrProjectDetailPending: true,
        getProjectDetailSuccess: false,
        getProjectDetailFailure: false,
      };

    case GET_PROJECT_DETAILS_REQUEST_SUCCESS:
      return {
        ...states,
        getProjectDetailPending: false,
        getProjectDetailSuccess: true,
        getProjectDetailFailure: false,
        projectDetails: action.payload,
      };
    case GET_PROJECT_DETAILS_REQUEST_FAILED:
      return {
        ...states,
        getProjectDetailFailure: true,
        getProjectDetailSuccess: false,
        getProjectDetailPending: false,
        projectDetails: action.payload,
      };

    // get project contract detail
    case GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST:
      return {
        ...states,
        getUserProjectContractDetailPending: true,
        getUserProjectContractDetailSuccess: false,
        getUserProjectContractDetailFailure: false,
      };
    case GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_SUCCESS:
      return {
        ...states,
        getUserProjectContractDetailPending: false,
        getUserProjectContractDetailSuccess: true,
        getUserProjectContractDetailFailure: false,
        userProjectContractDetails: action.payload,
      };
    case GET_USER_PROJECT_CONTRACT_DETAILS_REQUEST_FAILED:
      return {
        ...states,
        getUserProjectContractDetailFailure: true,
        getUserProjectContractDetailSuccess: false,
        getUserProjectContractDetailPending: false,
        userProjectContractDetails: action.payload,
      };

    // Project Post
    case PROJECT_POST_ADD_DOCUMENT:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          documents: [...states.projectPost.documents, action.payload.document],
        },
      };
    case PROJECT_POST_REMOVE_DOCUMENT:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          documents: states.projectPost.documents.filter((document) => document.id !== action.payload.documentId),
        },
      };
    case PROJECT_POST_ADD_SKILL:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          skills: [...states.projectPost.skills, action.payload.skill],
        },
      };
    case PROJECT_POST_REMOVE_SKILL:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          skills: states.projectPost.skills.filter((skill) => skill !== action.payload.skill),
        },
      };
    case PROJECT_POST_UPDATE_FIELD:
    case PROJECT_POST_UPDATE_PROJECT_TYPE:
    case PROJECT_POST_UPDATE_PROJECT_SCOPE:
    case PROJECT_POST_UPDATE_PROJECT_SUB_SCOPE:
    case PROJECT_POST_GET_PROJECT_DETAILS:
    case PROJECT_POST_JOB_TITLE_CHANGED:
    case PROJECT_POST_JOB_DESCRIPTION_CHANGED:
    case PROJECT_POST_UPDATE_FREELANCER_TYPE:
    case PROJECT_POST_UPDATE_FREELANCER_COUNT:
    case PROJECT_POST_UPDATE_PERIOD:
    case PROJECT_POST_UPDATE_CURRENCY:
    case PROJECT_POST_UPDATE_AMOUNT:
    case PROJECT_POST_UPDATE_MAX_WEEK_HOURS:
    case PROJECT_POST_UPDATE_NO_OF_DAY:
    case PROJECT_POST_UPDATE_AMOUNT_PER_DAY:
    case PROJECT_POST_UPDATE_SALARY_TYPE:
    case PROJECT_POST_UPDATE_FROM_SALARY:
    case PROJECT_POST_UPDATE_TO_SALARY:
    case PROJECT_POST_UPDATE_POSITION_AVAILABLE_DATE:
    case PROJECT_POST_UPDATE_LIFECYCLE_STAGE:
    case PROJECT_POST_UPDATE_SCREENING_QUESTIONS:
    case PROJECT_POST_UPDATE_IS_COVER_LETTER_REQUIRED:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          ...action.payload,
        },
      };
      case PROJECT_POST_UPDATE_SELECTED_SERVICES:
        return {
          ...states,
          projectPost: {
            ...states.projectPost,
            selectedServices:action.payload,
          },
     };
    case PROJECT_POST_UPDATE_OFFERED_MILESTONE:
      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          offeredMilestones: action.payload
        },
      };
    case PROJECT_POST_UPDATE_MINIMUM_REQUIREMENT_FIELD:

      return {
        ...states,
        projectPost: {
          ...states.projectPost,
          minimumRequirement: {
            ...states.projectPost.minimumRequirement,
            ...action.payload,
          },
        },
      };
      case PROJECT_POST_UPDATE_AMOUNT_FREE_CONTRACT:

        return {
          ...states,
          projectPost: {
            ...states.projectPost,
            ...action.payload,
          },
        };
      case PROJECT_POST_UPDATE_PROBATION_PERIOD:
        return {
          ...states,
          projectPost: {
            ...states.projectPost,
            probationPeriod: {
              ...states.projectPost.probationPeriod,
              ...action.payload,
            },
          },
        };
        case PROJECT_POST_UPDATE_PER_HOUR_AMOUNT:
        return {
          ...states,
          projectPost: {
            ...states.projectPost,
            ...action.payload,
          },
        };
        case PROJECT_POST_SUCCESSFULLY_DONE:
          return {
            ...states,
            projectPost: {
              projectType: '',
              projectScope: '',
              projectSubScope: '',
          
              isNeededNDA: false,
              isNeededSearchAssistant: false,
              isNeededUrgent: false,
          
              jobTitle: '',
              jobDescription: '',
              documents: [],
              selectedServices:[],
              skills: [],
              freelancerType: '',
              freelancerCount: '',
              period: '',
              currency: '',
              amount: '',
          
              salaryType: '',
              fromSalary: '',
              toSalary: '',
              positionAvailableDate: byDefaultDate,
               probationPeriod:{
               projectPeriod:"",
               isApply:"no",
               probationPeriod:""
               },
              maximumWeekHours: '',
              toAmount:"",
              fromAmount:"",
              lifecycleStage: '',
              offeredMilestones:[],
              minimumRequirement: {
                noOfStar: '',
                jobSuccessScore: '',
                freelancerLocation: '',
                freelancerLocations: [],
                yearOfExperience: '',
                englishLevel: '',
                englishLevels: [],
                requiredLanguage: '',
              },
              screeningQuestions: [],
              isCoverLetterRequired: true,
            },
          };
    default:
      return states;
  }
};

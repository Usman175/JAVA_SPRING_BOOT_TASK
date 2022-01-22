import {
  LANGUAGE_CONST
} from "../../constants/constant";
import {
  MainTextEnglish, MainTextKorean, MainTextJapanese
} from "../../../utils/languageConst";
import {GetPositionTypes} from "../../../utils/postitionType";
import {GetProjectCompletedTimeTypes,GetCurrencyTypes,GetProjectScopes,GetContractTypes,GetEducationTypes,GetPeriodTypes,GetApplyProbationTypes,GetPurposalSearchTypes,GetProjectLanguages} from "../../../utils/projectConst";
import {GetProjectTypes,ProjectScopeConst} from "../../../utils/projectConst";
import {GetProjectStatuses} from "../../../utils/projectConst";
import {GetJobOfferStatuses} from "../../../utils/jobOfferConst";
import {GetNoOfDaysTypes} from "../../../utils/noOfDaysConst";
import {GetFreelancerTypeConst} from "../../../utils/freelancerConst";
const initialstate = {
  languageType: MainTextEnglish,
  language: 'english',
  projectTypes: GetProjectTypes("english"),
  noOfDays: GetNoOfDaysTypes("english"),
  freelancerTypes: GetFreelancerTypeConst("english"),
  projectStatuses:GetProjectStatuses("english"),
  jobOfferStatuses:GetJobOfferStatuses("english"),
  projectScopes: GetProjectScopes("english"),
  noOfContracts:GetContractTypes("english"),
  educationType:GetEducationTypes("english"),
  projectPeriod:GetPeriodTypes("english"),
  applyProbationPeriod:GetApplyProbationTypes("english"),
  purposalSearchTypes:GetPurposalSearchTypes("english"),
  currencies:GetCurrencyTypes("english"),
  projectCompletionTime:GetProjectCompletedTimeTypes("english"),
  positionType:GetPositionTypes("english"),
  languages:GetProjectLanguages("english"),
}

export default (state = initialstate, action) => {
  if (action.type === LANGUAGE_CONST) {
    let lang = {};
    if (action.payload === "english") {
      lang = MainTextEnglish;
    } else if (action.payload === 'korean') {
      lang = MainTextKorean;
    } else if (action.payload === 'japanese') {
      lang = MainTextJapanese;
    }
      
    return { ...state, 
    languageType: lang, 
    language: action.payload, 
    projectTypes: GetProjectTypes(action.payload), 
    noOfDays: GetNoOfDaysTypes(action.payload),
    freelancerTypes:GetFreelancerTypeConst(action.payload),
    projectStatuses:GetProjectStatuses(action.payload),
    jobOfferStatuses:GetJobOfferStatuses(action.payload),
    projectScopes:GetProjectScopes(action.payload),
    noOfContracts:GetContractTypes(action.payload),
    educationType:GetEducationTypes(action.payload),
    projectPeriod:GetPeriodTypes(action.payload),
    applyProbationPeriod:GetApplyProbationTypes(action.payload),
    purposalSearchTypes:GetPurposalSearchTypes(action.payload),
    currencies:GetCurrencyTypes(action.payload),
    projectCompletionTime:GetProjectCompletedTimeTypes(action.payload),
    positionType:GetPositionTypes(action.payload),
    languages:GetProjectLanguages(action.payload)
  };
    
  } 
  return state;
}


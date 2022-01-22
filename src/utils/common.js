export function GenerateRandomId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const PROD_API = {
  CHANNEL_MICROSERVICE:
    "https://k3s4biyi76.execute-api.ap-northeast-2.amazonaws.com/Prod",
  CHATTING_MICROSERVICE:
    "https://qhjblrm9o4.execute-api.ap-northeast-2.amazonaws.com/Prod",
  INVOICE_MICROSERVICE:
    "https://5g6g4oz80d.execute-api.ap-northeast-2.amazonaws.com/Prod",

  LOGIN_MICROSERVICE:
    "https://wuttk32v64.execute-api.ap-northeast-2.amazonaws.com/Prod",
  PAYMENT_MICROSERVICE:
    "https://50xc2x8030.execute-api.ap-northeast-2.amazonaws.com/Prod",
  UTILITY_MICROSERVICE:
    "https://b5l9fginck.execute-api.ap-northeast-2.amazonaws.com/Prod",
    UTILITY_MICROSERVICE_NEW: 
      "https://zqu5dhjxnd.execute-api.ap-northeast-2.amazonaws.com/Prod",
  SETTING_MICROSERVICE:
    "https://jgflw6b7s5.execute-api.ap-northeast-2.amazonaws.com/Prod",
  SOCIALMEDIA_MICROSERVICE: "https://1i9emsqe5l.execute-api.ap-northeast-2.amazonaws.com/Prod",
 // PROJECT_MICROSERVICE: "https://m1xcuuo0i7.execute-api.ap-northeast-2.amazonaws.com/Prod",
  // USER_MICROSERVICE: "https://yxuxb22v83.execute-api.ap-northeast-2.amazonaws.com/Prod",
  // CONTRACT_MICROSERVICE: "https://fngj7gwzm2.execute-api.ap-northeast-2.amazonaws.com/Prod",
  DISPUTE_MICROSERVICE:
    // "https://00ka94e54h.execute-api.ap-northeast-2.amazonaws.com/Prod",
    "https://api.bearole.com/dispute",
    USER_ADDRESS:"https://zqu5dhjxnd.execute-api.ap-northeast-2.amazonaws.com/Prod",
    TIME_TRACKER_MICROSERVICE:
    "https://tgf71wifo8.execute-api.ap-northeast-2.amazonaws.com/Prod",



    // New micro services
    // Users (Freelancer/Contractor)
    USER_MICROSERVICE:"https://api.bearole.com/users/",
    // Project
    PROJECT_MICROSERVICE:"https://api.bearole.com/projects",
    //  Project Contract
    CONTRACT_MICROSERVICE:"https://api.bearole.com/project-contracts",
    //  Reports
    REPORTS_MICROSERVICE:"https://api.bearole.com/reports",
    // images service 
    IMAGES_MICROSERVICE:"https://api.bearole.com/common/",
    // user token getting service
    AUTH_TOKEN_IMAGES_MICROSERVICE:"https://c514g228h5.execute-api.ap-northeast-2.amazonaws.com/Prod"

};

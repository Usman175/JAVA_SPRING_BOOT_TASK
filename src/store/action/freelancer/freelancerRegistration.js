import * as types from "../types";

export function updateFreelancerProfileRegister(data) {
  return {
    type: types.FREELANCER_REGISTRATION_PROFILE,
    payload:data
  };
}

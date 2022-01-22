import * as types from "../types";

export function updateHeadHunterRegisterValue(data) {
  return {
    type: types.CLIENT_REGISTRATION_SINGLE_PARAM,
    payload:data
  };
}

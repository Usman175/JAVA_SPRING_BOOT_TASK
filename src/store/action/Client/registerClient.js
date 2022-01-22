import * as types from "../types";

export function updateClientRegisterValue(data) {
  return {
    type: types.CLIENT_REGISTRATION_SINGLE_PARAM,
    payload:data
  };
}

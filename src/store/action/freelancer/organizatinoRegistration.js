import * as types from "../types";

export function updateOrganizationProfileRegister(data) {
  return {
    type: types.ORGANIZATION_REGISTRATION_PROFILE,
    payload:data
  };
}

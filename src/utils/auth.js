const AUTH_TOKEN = "MY_AUTH";
const MY_LOCATION = "MY_LOCATION";
const MY_REGION = "MY_REGION";
const MY_COUNTRY = "MY_COUNTRY";

export function SetCrossData(data) {
  try {
    let crossDataObj = JSON.parse(data);
    localStorage.setItem(AUTH_TOKEN, crossDataObj[AUTH_TOKEN]);
    localStorage.setItem(MY_COUNTRY, crossDataObj[MY_COUNTRY]);
    localStorage.setItem(MY_REGION, crossDataObj[MY_REGION]);
    localStorage.setItem(MY_LOCATION, crossDataObj[MY_LOCATION]);
    return true;
  } catch (ex) {
    return false;
  }
}

export function RemoveCrossData() {
  try {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(MY_COUNTRY);
    localStorage.removeItem(MY_REGION);
    localStorage.removeItem(MY_LOCATION);
    sessionStorage.removeItem("userType");
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("freelancer_auth");
    localStorage.removeItem("clientRegistrationInfo");
    localStorage.removeItem("CompanyRegistrationInfo");
    localStorage.removeItem("IndividaulFreelancerRegistrationInfo")
    localStorage.removeItem("isSetDefaultLanguage")
    
    return true;
  } catch (ex) {
    return false;
  }
}

export function GetAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_TOKEN));
    return auth;
  } catch (ex) {
    return null;
  }
}
export function GetFreelancerAuth() {
  try {
    const auth = localStorage.freelancer_auth
      ? JSON.parse(localStorage.getItem("freelancer_auth"))?.freelancerData
      : null;
    return auth;
  } catch (ex) {
    return null;
  }
}
export function GetOrganizationAuth() {
  try {
    const auth = localStorage.freelancer_auth
      ? JSON.parse(localStorage.getItem("freelancer_auth"))?.organizationData
      : null;
    return auth;
  } catch (ex) {
    return null;
  }
}
export function GetClientAuth() {
  try {
    const auth = localStorage.freelancer_auth
      ? JSON.parse(localStorage.getItem("freelancer_auth"))?.clientData
      : null;
    return auth;
  } catch (ex) {
    return null;
  }
}
export function GetLocation() {
  try {
    const mylocation = JSON.parse(localStorage.getItem(MY_LOCATION));
    return mylocation;
  } catch (ex) {
    return null;
  }
}
export function GetRegion() {
  try {
    const region = JSON.parse(localStorage.getItem(MY_REGION));
    return region;
  } catch (ex) {
    return null;
  }
}

export function GetCountry() {
  try {
    const myCountry = JSON.parse(localStorage.getItem(MY_COUNTRY));
    return myCountry;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(MY_REGION);
  localStorage.removeItem(MY_LOCATION);
  localStorage.removeItem(MY_COUNTRY);
  localStorage.clear();
}

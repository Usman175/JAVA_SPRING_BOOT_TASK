export function postOptions(data) {
  return {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
export function putOptions(data) {
  return {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
export function deleteOptions(data) {
  return {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
export function getOptions(data) {
  return {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
}

export function postLoginOptions(data) {
  //
  return {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: data,
  };
}

export function LineProfileOptions(token) {
  return {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
}

export function putOptionsforFile(data) {
  return {
    method: "put",
    headers: {
      Accept: "application/json",
    },
    body: data,
  };
}

export function postOptionsforFile(data) {
  return {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: data,
  };
}

export function postMultipartFile(data) {
  return {
    method: "post",
    body: data,
  };
}

export function postMultipartFileNew(data) {
  return {
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    body: data,
  };
}

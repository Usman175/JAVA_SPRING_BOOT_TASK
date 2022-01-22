// Common helpers functions used at multiple places inside the app

import { find, get } from "lodash-es";

export const handleCompanyDocumentsChange = (e, type) => {
  let fileObj = {
    name: e.target?.files[0]?.name,
    size: e.target?.files[0]?.size,
    preview: URL.createObjectURL(e.target?.files[0]),
  };
  let obj = {
    fileObj: e.target?.files[0],
    fileDetails: { ...fileObj },
    fileName: fileObj.name,
  };
  return { [type]: obj };
};

export const selectSubScopes = (selectedScope, projectSubScopes) => {
  return get(
    find(projectSubScopes, ({ value }) => value === selectedScope),
    "subScopes",
    []
  );
};

import React from "react";
import { handleCompanyDocumentsChange } from "../../../utils/helpers";
import Label from "../../postProject/label";
const FilePicker = ({
  label,
  fileName,
  onSelect,
  id,
  accept,
  NotCompulsory,
}) => {
  return (
    <>
      <Label
        title={label}
        compulsory={NotCompulsory ? false : true}
        prefixBoxValid={true}
        prefixBoxInValid={false}
        primary={true}
        bold={true}
      >
        {" "}
        <i className="fa fa-question-circle" aria-hidden="true" />
      </Label>
      <div className="form-group ">
        <input
          type="text"
          className="form-control"
          style={{ paddingRight: "25px" }}
          value={fileName ? fileName : "upload"}
          readOnly
        />
        <input
          id={id}
          type="file"
          accept={accept ? accept : "image/*"}
          className="form-control"
          onChange={(e) => {
            onSelect(handleCompanyDocumentsChange(e, id));
          }}
          hidden
        />
        <button
          type="button"
          className="plusBtn btn"
          onClick={() => {
            document.getElementById(id).click();
          }}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default FilePicker;

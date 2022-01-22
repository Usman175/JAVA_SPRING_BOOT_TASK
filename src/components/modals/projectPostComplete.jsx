import React from "react";
import { useHistory } from "react-router-dom";
import congo from "../../assets/img/congo.svg";

export const ProjectPostComplete = () => {
  const history = useHistory();
  return (
    <div className="mt-4 mb-3 mx-3">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <img src={congo} alt="" style={{ width: "45px" }} />
        <h4 className="mb-0 ml-3 font-weight-600">Congratulation!</h4>
      </div>
      <h6 className="mb-5" style={{ textAlign: "center" }}>
        Your project has been successfully saved and posted.
      </h6>
      <div
        className="save_cancel text-center font-weight-500"
        onClick={() => history.push("/all-projects")}
      >
        <button className="btn cancel_btn">OK</button>
      </div>
    </div>
  );
};

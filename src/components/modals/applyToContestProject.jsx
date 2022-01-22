import React, { Component } from "react";
import { useHistory } from "react-router-dom";

export const ApplyToContestProject = ({ handleClose }) => {
  const history = useHistory();
  return (
    <>
      <div className="job_offer">
        <span className="h6 font-weight-bold text-muted">Applying to</span>
        <div className="job_detail" style={{ paddingRight: 35 }}>
          <div className="logo_detail">
            <h3 className="text-center font-weight-bold text-muted d-flex align-items-center">
              Logo Design{" "}
              <span className="green_text">
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </span>
            </h3>
            <label>
              <span>1st Winning Amount : </span>
              <span>US$1,500.00</span>
            </label>
            <label>
              <span>2nd Winning Amount : </span>
              <span>US$500.00</span>
            </label>
            <label>
              <span>3nd Winning Amount : </span>
              <span>US$500.00</span>
            </label>
          </div>
          <label className="dueDateLbl">
            <span>Due date :</span>
            <span>23rd Aug 2019</span>
          </label>
        </div>
        <div className="save_cancel text-center">
          <button
            onClick={() => history.push("/all-projects")}
            type="button"
            className="btn save_btn"
          >
            Apply
          </button>
          <button
            type="button"
            className="btn cancel_btn"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ApplyToContestProject;

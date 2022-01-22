

import React from "react";
import { useHistory } from "react-router-dom";

export const PreviousProjectsModal = ({ handleClose }) => {
  const history = useHistory();
  const handlePay = () => {
    history.push("/evaluation");
  };
  return (
    <>
      <div className="end_contract">
        <h4 className="h3" style={{ fontWeight: "bolder" }}>
          End Contract
        </h4>
        <p>
          Are you sure you want to end this contract?
          <br />
          You'll be prompted to provide feedback and make any final payments in
          the following steps
        </p>
        <div className="save_cancel text-center mb-0">
          <button type="button" className="btn save_btn" onClick={handlePay}>
            Pay
          </button>
          <button
            type="button"
            className="btn cancel_btn"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

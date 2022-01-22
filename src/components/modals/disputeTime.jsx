import React from "react";

export const DisputeTime = ({ handleClose }) => {
  return (
    <>
      <div className="end_contract">
        <h4 className="h3" style={{ fontWeight: "bolder" }}>
          Dispute hours
        </h4>
        <p>Would you like to claim selected times?</p>
        <p>
          <span>A201,</span>
          <span>A320,</span>
          <span>A330,</span>
          <span>A345,</span>
          <span>A334,</span>
          <span>A232</span>
        </p>
        <p className="text-danger w-75">
          You are not able to set it 0 when the activity is more than 50%
        </p>
        <div className="save_cancel text-center">
          <button type="button" className="btn save_btn">
            Claim
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

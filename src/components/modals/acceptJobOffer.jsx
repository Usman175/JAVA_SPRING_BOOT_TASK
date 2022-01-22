import React, { Component } from "react";

class AcceptJobOffer extends Component {
  render() {
    return (
      <>
        <div className="job_offer">
          <span className="green_text">
            Accept Job offer{" "}
            <i className="fa fa-question-circle" aria-hidden="true"></i>
          </span>
          <div className="job_detail">
            <h2>Web Development ...</h2>
            <label>
              <span>Amount : </span>
              <span>US$1,500.00</span>
            </label>
            <label>
              <span>1st Milestone :</span>
              <span>US$300.00</span>
            </label>
            <label>
              <span>Due date :</span>
              <span>23rd Aug 2019</span>
            </label>
          </div>
        </div>
        <div className="save_cancel mt-5 mb-1 float-right">
          <button type="button" className="btn save_btn">
            Accept
          </button>
          <button type="button" className="btn cancel_btn" data-dismiss="modal">
            Cancel
          </button>
        </div>
      </>
    );
  }
}

export default AcceptJobOffer;

import React, { Component } from "react";

class MobileVerificationModal extends Component {
  render() {
    return (
      <>
        <div
          className="modal fade post_modal mob_modal"
          id="mobilem_verification"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <a className="footer_logo">
                  <img
                    src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">x</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <h4 className="green_text">Mobile Verification</h4>
                <p>
                  Please, enter 6 digits of number to verify your mobile number
                </p>
                <div className="digit_no d-flex">
                  <input type="text" maxlength="1" className="form-control" />
                  <input type="text" maxlength="1" className="form-control" />
                  <input type="text" maxlength="1" className="form-control" />
                  <input type="text" maxlength="1" className="form-control" />
                  <input type="text" maxlength="1" className="form-control" />
                  <input type="text" maxlength="1" className="form-control" />
                </div>
                <small className="red_text">
                  You have entered the wrong number
                </small>
                <div className="save_cancel">
                  <button type="button" className="btn save_btn">
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn cancel_btn"
                    data-dismiss="modal"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MobileVerificationModal;

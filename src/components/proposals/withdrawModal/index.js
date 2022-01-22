import React from 'react'
import Modal from "react-bootstrap/Modal";
import './withdrawModal.scss'
function WithDrawModal(props) {
    return (
        <Modal
        dialogClassName = "jungle-modal withdraw-proposal-modal"
        contentClassName="jungle-modal-content lg"
        show={props.isWithdrawalProposalModelOpen}
        onHide={() =>props.handleClose()}
        centered
        size="lg"
      >
        <Modal.Header className="position-relative jungle-modal-header">
          <img
            src ="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/bearoleIcon.png"
            alt=""
          />
          <span
            onClick={()=>props.handleClose()}
            className="custom-close"
          >
            {' '}
            x{' '}
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className = "withdraw-proposal-modal-content" >
            <div className = "withdraw-proposal-modal-desc d-flex justify-content-center align-items-center">
              We Will politely notify the client that you are not
              interested. The client will be able to view the reason you've
              withdrawn your proposal.
            </div>
            <div className = "withdraw-proposal-modal-content-list justify-content-between align-items-center" >
              <div className="left_card">
                {props.projectProposalWithdrawReasons &&
                  props.projectProposalWithdrawReasons.map(
                    (reason, index) => (
                      <div
                        className="withdraw-proposal-modal-content-list-item"
                        key={`radioWithdrawReason${index}`}
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="projectProposalWithdrawReasons"
                          id={`${props.modalKey}radioReason${reason.id}`}
                          value={reason.name}
                          onChange={(e) => {
                            const proposalWithdraw = props.proposalWithdraw;
                            if (!e.target.checked) {
                              proposalWithdraw.withdrawReason = "";
                              props.handleUpdateProposalWithdraw(proposalWithdraw)
                            } else {
                              proposalWithdraw.withdrawReason =e.target.value;
                              props.handleUpdateProposalWithdraw(proposalWithdraw)
                            }
                          }}
                          checked={
                            props.proposalWithdraw.withdrawReason !==
                              "" &&
                            props.proposalWithdraw.withdrawReason ===
                              reason.name
                          }
                        />
                        <label
                          style={{ width: "auto", height: "auto" }}
                          className="form-check-label"
                          htmlFor={`${props.modalKey}radioReason${reason.id}`}
                        >
                          {" "}
                          {reason.name}{" "}
                        </label>
                      </div>
                    )
                  )}
                {props.errorMessage.withdrawReason && (
                  <p className="text-danger">
                    {props.errorMessage.withdrawReason}
                  </p>
                )}
              </div>
            </div>

            <div
              className="row justify-content-between align-items-center mb-4"
              hidden={
                props.proposalWithdraw.withdrawReason !== "Other"
              }
            >
              <div className="col-md-12 left_card">
                <h6>
                  Message<span className="compulsory">*</span>
                </h6>
                <div className="d-flex justify-content-center align-items-center mb-2">
                  Add an optional message to share with the client when we
                  notify them that this proposal has been withdrawan.
                </div>
                <textarea
                  className="form-control"
                  placeholder="Message"
                  name="withdrawMessage"
                  value={props.proposalWithdraw.withdrawMessage}
                  maxLength="500"
                  onChange={(e) => {
                    let errorMessage = {};
                    const { proposalWithdraw } = props;
                    proposalWithdraw.withdrawMessage = e.target.value;
                    if (
                      proposalWithdraw.withdrawMessage !== undefined &&
                      proposalWithdraw.withdrawMessage !== null &&
                      proposalWithdraw.withdrawMessage !== ""
                    )
                      errorMessage["withdrawMessage"] = null;
                      props.setErrorMessage(errorMessage)
                      props.handleUpdateProposalWithdraw(proposalWithdraw)
                  }}
                ></textarea>
                {props.errorMessage.withdrawMessage && (
                  <p className="text-danger">
                    {props.errorMessage.withdrawMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name={`isBlockFutureInvitation${props.modalKey}`}
                id={`chkIsBlockFutureInvitation${props.modalKey}`}
                onChange={(e) => {
                  const proposalWithdraw = props.proposalWithdraw;
                  proposalWithdraw.isBlockFutureInvitation =
                    e.target.checked;
                    props.handleUpdateProposalWithdraw(proposalWithdraw)
                }}
                checked={
                  props.proposalWithdraw.isBlockFutureInvitation
                }
              />
              <label
                className="custom-control-label"
                htmlFor={`chkIsBlockFutureInvitation${props.modalKey}`}
              >
                {" "}
                Block future invitations from this client{" "}
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="withdrawlProposal_savebtn">
          <div>
          <button
            type="button"
            disabled={props.loading}
            onClick={() => props.onPageRedirectHandle("/my-proposals")}
            className="btn save_btn"
          >
            {" "}
            Withdraw{" "}  {props.loading ? (
                            <i className="fa fa-spinner fa-spin"></i>
                          ) : (
                            ""
                          )}
          </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
}

export default WithDrawModal

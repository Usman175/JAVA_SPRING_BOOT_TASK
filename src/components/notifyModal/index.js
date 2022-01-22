import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./notifyModal.scss";

function NotifyModal(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <Modal
      dialogClassName="jungle-modal"
      contentClassName="jungle-modal-content"
      show={props.show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop={true}
    >
      <Modal.Body className="hide_scroll_bar invitation_modal notify_modal">
        <center>
          <img
            className="nav-logo "
            src="https://dhihitu47nqhv.cloudfront.net/bearole.png"
            alt=""
          />
          <h3>Notification</h3>
          <p>
            Dear Investors, regional partners and visitors <br /> <br /> We are
            in the process of the final testing before launching the site. We
            expect that the beta site will be open to the public in the middle
            Feb. 2022 or earlier<br /> <br /> We will notify you again individually in case
            of any further progress or event
            <br /> <br />
            We sincerely appreciate your visit and thanks you for your support
            <br />   <br />
            Bearole Team
            <br />   <br />
            <br />   <br />
            <span onClick={handleClose}>
              Close
            </span>
   
          </p>
        </center>
      </Modal.Body>
    </Modal>
  );
}

export default NotifyModal;

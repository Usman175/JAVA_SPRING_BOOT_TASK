import React from "react";
import Modal from "react-bootstrap/Modal";
import "./loader.scss";
function FileUploadLoader(props) {
  return (
    <Modal
      show={props.show}
      dialogClassName="file-upload-modal"
      centered
      onHide={() => {}}
    >
      <Modal.Body>
        <center>
          <div className="file-upload-text">{props.title}</div>
        </center>
      </Modal.Body>
    </Modal>
  );
}

export default FileUploadLoader;

import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  const {
    showModal,
    ModalTitle,
    ModalMessage,
    emitToHideDeleteModal,
    emitTheDeleteAction,
  } = props;

  return (
    <Modal
      show={showModal}
      dialogClassName="jungle-modal"
      centered
      onHide={() => emitToHideDeleteModal(false)}
    >
      <Modal.Header>
        <Modal.Title>{ModalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete_setting__modalText">{ModalMessage}</div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn save_btn"
          onClick={() => {
            emitToHideDeleteModal(false);
            emitTheDeleteAction();
          }}
        >
          Yes, Delete it
        </button>
        <button
          className="btn btn-outline-danger br-0"
          variant="secondary"
          onClick={() => emitToHideDeleteModal(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;

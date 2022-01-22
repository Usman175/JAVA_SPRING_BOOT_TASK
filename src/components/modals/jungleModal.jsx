import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

export const JungleModal = ({
  OpenButton,
  CustomHeader,
  CustomFooter,
  Body,
  size,
  title,
  dialogClassName,
  contentClassName,
  customClose,
  noHeader,
  backdrop,
  defaultOpen,
  noClose,
  nextModalClass,
  ...rest
}) => {
  const [show, setShow] = useState(defaultOpen || false);
  const [addCustomClassHeader, setCustomClassHeader] = useState("");
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    if (nextModalClass) {
      setCustomClassHeader(nextModalClass);
    }
    setShow(true);
  };
  return (
    <>
      {OpenButton && <OpenButton handleClick={handleOpen} />}
      <Modal
        dialogClassName={dialogClassName + " " + addCustomClassHeader}
        contentClassName={contentClassName}
        show={show}
        onHide={handleClose}
        centered
        size={size || null}
        backdrop={backdrop || true}
      >
        {!noHeader && (
          <Modal.Header
            className={`position-relative jungle-modal-header`}
            closeButton={!customClose && !noClose}
          >
            {CustomHeader ? (
              <CustomHeader />
            ) : (
              <img
                src="https://dhihitu47nqhv.cloudfront.net/bearole.png"
                // src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                alt=""
              />
            )}
            {title && <span className="position-absolute">{title}</span>}{" "}
            {customClose && !noClose && (
              <span onClick={handleClose} className="custom-close">
                x
              </span>
            )}
          </Modal.Header>
        )}
        <Modal.Body
          style={{
            maxHeight: "70vh",
            overflowX: "hidden",
            overflow: "scroll",
            marginBottom: 20,
          }}
          className="hide_scroll_bar"
        >
          <Body handleClose={handleClose} {...rest} />
        </Modal.Body>
        {CustomFooter ? (
          <Modal.Footer>
            <CustomFooter />
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
};

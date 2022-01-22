import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function ITExpertModalContent(props) {
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  return (
    <Container className="p-4 iTExpertModalContent_leftMobile">
      <div className="h2 text-center iTExpertModalContent_leftMobile_heading">{languageType.IT_EXPERT_TITLE}</div>
      <div className="text-justify  mb-20">{languageType.IT_EXPERT_BODY}</div>

      <br />
      <br />
      <div className="save_cancel text-right">
        <button
          type="button"
          className="btn cancel_btn contest-project-back-btn"
          onClick={() => {
            props.handleClose();
          }}
        >
          {languageType.CANCEL_TEXT}
        </button>
        <button
          type="button"
          className="btn contest-project-post-btn"
          onClick={() => {
            props.handleClose();
          }}
        >
          {languageType.NEXT_TEXT}{" "}
        </button>
      </div>
    </Container>
  );
}

export default ITExpertModalContent;

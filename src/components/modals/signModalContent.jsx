import { Container } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const SignModalBody = ({ handleClose, languageType, onSave }) => {
  const canvas = useRef();
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <p>Signup your signature here</p>
          <SignatureCanvas
            ref={canvas}
            penColor="black"
            canvasProps={{ width: 350, height: 200, className: "sigCanvas" }}
          />

          <button
            type="button"
            className="btn contest-project-post-btn text-white"
            onClick={() => {
              if (canvas.current) {
                const signBase64 = canvas.current.toDataURL();
                onSave(signBase64);
              }
              handleClose();
            }}
          >
            {languageType.SAVE}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default SignModalBody;

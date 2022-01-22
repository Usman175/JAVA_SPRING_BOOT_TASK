import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserTypeConst } from "../../utils/userTypeConst";
import { ClientConst } from "../../utils/sessionConst";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./modalResponsive.scss";

const WelcomeModal = ({ defaultOpen, authUser, onGoClick, onCloseModal }) => {
  const [show, setShow] = useState(defaultOpen || false);
  const [option, setOption] = useState("FindTenant");
  const [userType, setUserType] = useState("");
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const handleClose = () => {
    setShow(false);
    onCloseModal();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    var usType =
      option === "FindTenant" ? UserTypeConst.Client : UserTypeConst.Freelancer;
    sessionStorage.setItem("registeredUserType", usType);
    setUserType(usType);
    setShow(false);
    option === "FindTenant" && onGoClick();
  };

  if (userType === UserTypeConst.Freelancer) {
    //setShow(false);
    return <Redirect to="/user-registration" />;
  } else if (userType == UserTypeConst.Client) {
  }
  return (
   
    <>
      <Modal
        show={show}
        centered
        size={"md"}
        backdrop={true}
        contentClassName="jungle-modal-content p-0 w-100"
      >
        <Modal.Header
          className="position-relative d-flex align-items-center bg-black"
          closeButton={false}
        >
          <img
            src="https://dhihitu47nqhv.cloudfront.net/icons/bearolewhite.png"
            alt=""
            className="w-100p"
          />
          <h5 className="font-weight-bold text-white fontAdjustMobile_ModalHeader">
            Welcome {authUser?.myAuth?.user?.profileName}!
          </h5>
          <span onClick={handleClose} className="custom-close custom-position">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="p-0 welcome-body">
          <div>
            <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/u2.png"} alt="Welcome Image" />
          </div>
          <div className="px-3 pb-3 px-md-5">
            <h5 className="text-info font-weight-600 mb-1">
              Select an account
            </h5>
            <Form.Group as={Row}>
              <Col md={6}>
                <Form.Check custom type="radio" className="my-2">
                  <Form.Check.Input
                    readOnly
                    checked={option === "FindTenant"}
                  />
                  <Form.Check.Label
                    onClick={() => {
                      setOption("FindTenant");
                    }}
                    className="ml-2 cursor-pointer"
                  >
                    I want to find a talent 
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check custom type="radio">
                  <Form.Check.Input
                    readOnly
                    checked={option === "LookingForJob"}
                  />
                  <Form.Check.Label
                    onClick={() => {
                      setOption("LookingForJob");
                    }}
                    className="ml-2 cursor-pointer"
                  >
                    I am looking for a job
                  </Form.Check.Label>
                </Form.Check>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <button
                  className="btn btn-info btn-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Go
                </button>
              </Col>
            </Form.Group>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

function mapStateToProps(state) {
  return {
    authUser: state.authReducer,
  };
}
export default connect(mapStateToProps)(WelcomeModal);

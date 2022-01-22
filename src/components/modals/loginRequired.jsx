import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { UserTypeConst } from "../../utils/userTypeConst";
import { ClientConst } from "../../utils/sessionConst";
import { connect } from "react-redux";

const LoginRequired = (props) => {
  const [show, setShow] = useState(props.defaultOpen || false);
  const [option, setOption] = useState("FindTenant");
  const handleClose = () => {
    setShow(false);
    props.history.push("/");
  };

  useEffect(() => {
    setShow(props.defaultOpen);
  }, [props.defaultOpen]);

  //이 코드는 사용되고 있지 않습니다. 
  const handleSubmit = () => {
    var userType =
      option === "FindTenant" ? UserTypeConst.Client : UserTypeConst.Freelancer;
    sessionStorage.setItem("registeredUserType", userType);
    if (userType == UserTypeConst.Freelancer)
      window.location.href = "/user-registration";
    else if (userType == UserTypeConst.Client)
      window.location.href =
        "/client-registration?clientId=" +
        ClientConst.clientId +
        "&clientFirstName=" +
        ClientConst.clientFirstName +
        "&clientLastName=" +
        ClientConst.clientLastName +
        "&clientUserName=" +
        ClientConst.clientUserName +
        "&clientUserPassword=" +
        ClientConst.clientUserPassword +
        "&clientEmailId=" +
        ClientConst.clientEmailId +
        "&clientPhoneNo=" +
        ClientConst.clientPhoneNo +
        "&clientCountry=" +
        ClientConst.clientCountry;
  };

  const signUpButton = () => {
    if (props.simpleLogin) {
      let redirectURl = window.location.href.replace(
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ],
        ""
      );
      if (window.location.pathname === "/report-main") {
        redirectURl = window.location.origin + "/report";
      }
      if (window.location.pathname === "/project-detail-for-freelancer") {
        redirectURl = window.location.origin + "/my-proposals";
      }
      if (window.location.pathname === "/project-detail-for-client") {
        redirectURl = window.location.origin + "/my-contracts";
      }
      localStorage.setItem(
        "startRegisterWith",
        sessionStorage.userType.toLowerCase()
      );
      window.location.href = `https://www.syncbench.com/#/sign-in?callback=${redirectURl}&storeid=HOQF9I`;
    }
    if (props.isClientRegister) {
      props.history.push("/client-registration");
    }
    if (props.isFreelancerRegister) {
      props.history.push("/user-registration");
    }
  };

  return (
    <>
      <Modal
        show={show}
        centered
        size={"md"}
        backdrop={true}
        onHide={handleClose}
        contentClassName="jungle-modal-content p-0 w-100"
        animation={false}
      >
        {/*  animation={false} - https://github.com/react-bootstrap/react-bootstrap/issues/5075 */}
        <Modal.Header
          className="position-relative d-flex align-items-center bg-black"
          closeButton={false}
        >
          <img
            src="https://dhihitu47nqhv.cloudfront.net/icons/bearolewhite.png"
            alt=""
            className="w-100p"
          />
          {/*<h5 className="font-weight-bold text-white">Login</h5>*/}
          <button
            type="button"
            className="button-close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          >
            <span aria-hidden="true">x</span>
          </button>
          {/*<span onClick={handleClose} className="custom-close custom-position">*/}
          {/*  x*/}
          {/*</span>*/}
        </Modal.Header>
        <Modal.Body className="welcome-body login-body">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <div className="mb-3 login-header">
              {props.isFreelancerRegister && "Freelancer Registration Required"}
              {props.isClientRegister && "Client Registration Required"}
              {props.simpleLogin && "  Login Required"}
            </div>
            <button onClick={() => signUpButton()} className="btn green_btn">
              {props.isFreelancerRegister && "Register"}
              {props.isClientRegister && "Register"}
              {props.simpleLogin && props.languageType.LOGIN}
            </button>
          </div>
          {/*<div>*/}
          {/*    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/u2.png"} alt="Welcome Image" />*/}
          {/*</div>*/}
          {/*<div className="px-3 pb-3 px-md-5">*/}
          {/*    <h5 className="text-info font-weight-600 mb-1">*/}
          {/*        Select an account*/}
          {/*    </h5>*/}
          {/*    <Form.Group as={Row}>*/}
          {/*        <Col md={6}>*/}
          {/*            <Form.Check custom type="radio" className="my-2">*/}
          {/*                <Form.Check.Input readOnly checked={option === "FindTenant"} />*/}
          {/*                <Form.Check.Label*/}
          {/*                    onClick={() => {setOption("FindTenant")}}*/}
          {/*                    className="ml-2 cursor-pointer"*/}
          {/*                >*/}
          {/*                    I want to find a talent*/}
          {/*                </Form.Check.Label>*/}
          {/*            </Form.Check>*/}
          {/*            <Form.Check custom type="radio">*/}
          {/*                <Form.Check.Input readOnly checked={option === "LookingForJob"} />*/}
          {/*                <Form.Check.Label*/}
          {/*                    onClick={() => {setOption("LookingForJob")}}*/}
          {/*                    className="ml-2 cursor-pointer"*/}
          {/*                >*/}
          {/*                    I am looking for a job*/}
          {/*                </Form.Check.Label>*/}
          {/*            </Form.Check>*/}
          {/*        </Col>*/}
          {/*        <Col md={6} className="d-flex justify-content-end">*/}
          {/*            <button className="btn btn-info btn-lg" onClick={handleSubmit}>Register</button>*/}
          {/*        </Col>*/}
          {/*    </Form.Group>*/}
          {/*</div>*/}
        </Modal.Body>
      </Modal>
    </>
  );
};

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}

export default withRouter(connect(mapStateToProps)(LoginRequired));

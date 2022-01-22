import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { UserTypeConst } from "../../utils/UserTypeConst";
import { ClientConst } from "../../utils/SessionConst";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const WelcomeModal1 = ({ defaultOpen, authUser }) => {
  const [show, setShow] = useState(defaultOpen || false);
  const [option, setOption] = useState("FindTenant");
  const [userType, setUserType] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(defaultOpen);
  }, [defaultOpen]);

  const handleSubmit = () => {
    var usType =
      option === "FindTenant" ? UserTypeConst.Client : UserTypeConst.Freelancer;
    sessionStorage.setItem("registeredUserType", usType);
    setUserType(usType);
    setShow(false);
    // if (usType == UserTypeConst.Freelancer) {

    //   console.log("in redirect");
    // }
    // else if (userType == UserTypeConst.Client)
    //   window.location.href = "/client-registration?clientId=" + ClientConst.clientId + '&clientFirstName=' + ClientConst.clientFirstName
    //     + '&clientLastName=' + ClientConst.clientLastName + '&clientUserName=' + ClientConst.clientUserName
    //     + '&clientUserPassword=' + ClientConst.clientUserPassword + '&clientEmailId=' + ClientConst.clientEmailId
    //     + '&clientPhoneNo=' + ClientConst.clientPhoneNo + '&clientCountry=' + ClientConst.clientCountry;
  };

  if (userType === UserTypeConst.Freelancer) {
    //setShow(false);
    return <Redirect to="/user-registration" />;
  } else if (userType == UserTypeConst.Client) {
    return <Redirect to="/client-registration" />;
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
          className="position-relative d-flex align-items-center "
          closeButton={false}
        >
          <span onClick={handleClose} className="custom-close custom-position">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="p-0 welcome-body">
          <div className="px-3 pb-3 px-md-5">
            <h5 className="headeraddress">Add your location</h5>
            <h5 className="addressbox ">Country</h5>
            <h5 className="addressbox ">City</h5>
            <h5 className="addressbox ">Address Detail</h5>
            <div className="save_cancel form-group">
              <button
                type="submit"
                className="btn cancel_btn "
                onClick={() => {
                  alert("good");
                }}
              >
                Confirm
              </button>
            </div>
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
export default connect(mapStateToProps)(WelcomeModal1);

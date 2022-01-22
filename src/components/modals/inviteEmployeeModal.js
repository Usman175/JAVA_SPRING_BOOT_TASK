import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import validator from "validator";
import { DeleteExistingGeneralSettingByName } from "../../store/middlewares/Admin/GeneralSettings/generalSettings.js";
import { isValidString } from "../../utils/validationConfig.js";

function InviteEmployeeModal(props) {
  const { openModal, languageType, organizationData, emitToCloseModal } = props;

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [singleEmail, setSingleEmail] = useState("");
  const [emailError, setEmailErrors] = useState({
    hasError: false,
    errorMsg: "",
  });

  function addEmailAddress(email) {
    let { languageType } = props;
    let errorMessage = {};
    let formIsValid = true;

    if (!isValidString(email)) {
      formIsValid = false;
      setEmailErrors({
        hasError: true,
        errorMsg: languageType.REQUIRED_MESSAGE,
      });
    } else if (isValidString(email) && !validator.isEmail(email)) {
      formIsValid = false;
      setEmailErrors({
        hasError: true,
        errorMsg: "Please enter valid email address.",
      });
    }

    if (formIsValid) {
      let emailArray = [...selectedEmployees];
      if (!emailArray.includes(email)) {
        emailArray.push(email);
      }
      setEmailErrors({
        hasError: false,
        errorMsg: "",
      });
      setSelectedEmployees([...emailArray]);
      setSingleEmail("");
    }
  }

  function handleRemoveEmail(index) {
    let emailArray = [...selectedEmployees];
    emailArray.splice(index, 1);
    setSelectedEmployees([...emailArray]);
  }

  return (
    <Modal show={openModal} centered onHide={() => emitToCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>
          Invite Employee
          <p className="invite_employee__headerDesc">
            Invite freelancers or others to join your company.
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="invite_employee__modalBody">
          <div className="form-group">
            <label>Employee email address</label>
            <div className="d-flex justify-content-between">
              <div className="col-md-10 m-0 p-0">
                <input
                  type="email"
                  required
                  value={singleEmail}
                  onChange={(e) => {
                    setSingleEmail(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Email address"
                />
                {emailError.hasError && (
                  <p className="text-danger"> {emailError.errorMsg} </p>
                )}
              </div>
              <div className="col-md-2 pr-0">
                <button
                  className="btn save_btn"
                  onClick={() => addEmailAddress(singleEmail)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {selectedEmployees && selectedEmployees.length > 0 ? (
            <div>
              <label className="font-weight-bold">Selected Employees</label>
              <div className="table-responsive detail_tbl feedback_tbl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Email Address</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployees &&
                      selectedEmployees.length > 0 &&
                      selectedEmployees.map((email, index) => (
                        <tr key={`package${index}`}>
                          <td>{index + 1}</td>
                          <td>{email}</td>
                          <td>
                            <i
                              onClick={() => handleRemoveEmail(index)}
                              className="fa fa-trash"
                              style={{ color: "#690", cursor: "pointer" }}
                              aria-hidden="true"
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-content-center my-5">
              <label className="font-weight-bold">
                Enter at least one email to invite freelancers.
              </label>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`btn save_btn ${
            selectedEmployees.length <= 0 ? "cursor-NA" : ""
          }`}
          disabled={selectedEmployees.length <= 0}
          onClick={() => {
            emitToCloseModal();
          }}
        >
          Send Invites
        </button>
        <button
          className="btn btn-outline-danger br-0"
          variant="secondary"
          onClick={() => {
            emitToCloseModal();
          }}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}

export default connect(mapStateToProps, null)(InviteEmployeeModal);

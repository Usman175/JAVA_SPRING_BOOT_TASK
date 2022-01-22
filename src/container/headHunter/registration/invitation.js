import React, { useState } from "react";
import validator from "validator";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import Heading from "../../../components/freelancerCreation/heading";
import Label from "../../../components/postProject/label";
import Radio from "../../../components/radioButton/radio";
import "./headHunter.scss";
function Invitation(props) {
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [isAllow, setIsAllow] = useState(false);

  const addEmailAddress = (email) => {
    let errorMessage = {};
    let formIsValid = true;

    if (!isValidString(email)) {
      formIsValid = false;
      errorMessage["employeeEmailAddress"] = "Sorry this field is required!";
    } else if (isValidString(email) && !validator.isEmail(email)) {
      formIsValid = false;
      errorMessage["employeeEmailAddress"] = "Please Enter Valid Email";
    }
    setErrorMessage(errorMessage);

    if (formIsValid) {
      setEmployeeEmailAddress("");
      setEmailAddresses([...emailAddresses, email]);
    }
  };
  const handleRemoveEmail = (index) => {
    let emailArray = [...emailAddresses];
    emailArray.splice(index, 1);
    setEmailAddresses([...emailArray]);
  };
  return (
    <div className="send-invitation-to-employment post_form ">
      <Heading
        heading={" Send Invitation to Consultants"}
        step={"4"}
        shadow={true}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8">
              <br />
              <Label
                title={" Employee Email Address"}
                compulsory={true}
                prefixBoxValid={
                  errorMessage["employeeEmailAddress"] ? false : true
                }
                prefixBoxInValid={
                  errorMessage["employeeEmailAddress"] ? true : false
                }
                primary={true}
                bold={true}
              ></Label>
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                value={employeeEmailAddress}
                maxLength={100}
                onChange={(e) => setEmployeeEmailAddress(e.target.value)}
              />
              {errorMessage.employeeEmailAddress && (
                <p className="text-danger">
                  {" "}
                  {errorMessage.employeeEmailAddress}{" "}
                </p>
              )}
            </div>
            <div className="col-md-4">
              <div
                style={{ marginTop: "50px" }}
                onClick={() => addEmailAddress(employeeEmailAddress)}
                className="send0invitation-button"
              >
                Send
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              <div className="table-responsive detail_tbl feedback_tbl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailAddresses &&
                      emailAddresses.length > 0 &&
                      emailAddresses.map((email, index) => (
                        <tr key={`package${index}`}>
                          <td>{index + 1}</td>
                          <td>{email}</td>
                          <td>{"Sent"}</td>
                          <td>
                            <i
                              onClick={() => handleRemoveEmail(index)}
                              className="fa fa-trash"
                              style={{
                                color: "#690",
                                cursor: "pointer",
                              }}
                              aria-hidden="true"
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />

          <div className="custom-control custom-checkbox">
            <label>
              Would you like to set the terms in your offer that the employee
              cannot work on the same Bearole.com?
            </label>
            <br />
            <div style={{ margin: "10px 0px" }}>
              <span style={{ marginRight: "30px" }}>
                <Radio
                  handleSelect={(value) => {
                    setIsAllow(true);
                  }}
                  name="period-option"
                  id="s-option-hourly-period"
                  checked={isAllow ? true : false}
                  label={"Yes"}
                  compulsory={false}
                  disableCustomControl={true}
                />
              </span>
              <span style={{ marginRight: "30px" }}>
                <Radio
                  handleSelect={(value) => {
                    setIsAllow(false);
                  }}
                  name="period-option"
                  id="s-option-hourly-period1"
                  checked={!isAllow ? true : false}
                  label={"No"}
                  compulsory={false}
                  disableCustomControl={true}
                />
              </span>
            </div>
          </div>
          <br />
          <div className="create-freelancer-bottom-steps">
            <button
              onClick={() => {
                props.handleBack("ConditionSetup");
              }}
              className="create-freelancer-bottom-steps-back"
            >
              Back
            </button>
            <button
              onClick={() => {
                props.handleNext("HeaderHunterRegistration");
                window.scrollTo({
                  top: "0",
                  behavior: "smooth",
                });
              }}
              className="create-freelancer-bottom-steps-skip"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invitation;

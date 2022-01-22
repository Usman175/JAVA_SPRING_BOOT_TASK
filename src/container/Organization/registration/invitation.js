import React, { useState, useEffect } from "react";
import validator from "validator";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import Heading from "../../../components/freelancerCreation/heading";
import Label from "../../../components/postProject/label";
import Radio from "../../../components/radioButton/radio";
import Skeleton from "../../../components/skeleton/skeleton";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import notifications from "../../../utils/notifications";
import {
  getOptions,
  postMultipartFile,
  postOptions,
  deleteOptions,
} from "../../../utils/httpConfig";
import FileUploadLoader from "../../../components/loader/fileUpload";
import "./organization.scss";

function Invitation(props) {
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [isAllow, setIsAllow] = useState(false);
  const [InviteSending, setInviteSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);

  useEffect(() => {
    getInvitedPeopleInCompany();
  }, []);

  const getInvitedPeopleInCompany = async () => {
    if (props.CompanyId) {
      let result = await request(
        `${ENDPOINT["GetInvitedFreelancersByOrganization"]}?organizationId=${props.CompanyId}`,
        postOptions()
      );
      if (result.success) {
        setEmailAddresses(result.result);
        setIsSkeletonLoading(false);
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };

  //  https://yxuxb22v83.execute-api.ap-northeast-2.amazonaws.com/Prod/api/OrganizationFreelancer/GetInvitedFreelancersByOrganization?organizationId=X44N104BQ39XKON
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
      handleSendInvitation(email);
    }
  };

  const handleSendInvitation = async (email) => {
    setInviteSending(true);
    let params = {
      organizationId: props.CompanyId,
      email: email,
      appBasesUrl: window.location.origin.toString(),
    };
    let result = await request(
      ENDPOINT["InviteFreelancerToJoinCompany"],
      postOptions(params)
    );
    if (result.success) {
      setInviteSending(false);

      let obj = {
        ...result.result,
        email: email,
      };
      setEmployeeEmailAddress("");
      setEmailAddresses([...emailAddresses, obj]);
    } else {
      setInviteSending(false);
      notifications.showError(
        result.message || "Some problems occur please try again later"
      );
    }
  };
console.log( props.CompanyId)
  const handleRemoveEmail = async (index) => {
    setShow(true);
    let params = {
      organizationId: emailAddresses[index].organizationId,
      email: emailAddresses[index].email,
    };
    let result = await request(
      ENDPOINT["DeleteOrganizationFreelancerInvite"],
      deleteOptions(params)
    );
    if (result.success) {
      setShow(false);
      notifications.showSuccess("Successfully deleted!");
      let emailArray = [...emailAddresses];
      emailArray.splice(index, 1);
      setEmailAddresses([...emailArray]);
    } else {
      setShow(false);
      notifications.showError(
        result.message || "Some problems occur please try again later"
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (emailAddresses.length > 0) {
      localStorage.setItem(
        "CompanyRegistrationInfo",
        JSON.stringify({
          step: "ConfirmationStep",
          organizationId: props.CompanyId,
        })
      );
      props.handleNext("ConfirmationStep");
      window.scrollTo({
        top: "0",
        behavior: "smooth",
      });
    } else {
      notifications.showWarning("At least one invitation is required!");
      setLoading(false);
    }
  };
  return (
    <div className="send-invitation-to-employment post_form ">
      <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      <div hidden={isSkeletonLoading}>
        <br />
        <div className="resume-heading-icon">
          <img
            src={
              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/invitation.svg"
            }
          />
          <h3>Invitation to employees</h3>
        </div>
      </div>
      <br />
      <div hidden={isSkeletonLoading} className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8">
              <br />
              <div className="email-label">
                <h3>@</h3> <p>Email Address </p>
              </div>
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
                style={{
                  marginTop: "62px",
                  color: "black",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  !InviteSending ? addEmailAddress(employeeEmailAddress) : {}
                }
                className="send0invitation-button"
              >
                Send
              </div>
            </div>
            {InviteSending ? (
              <div
                className="form-group"
                style={{ marginBottom: "2px", marginLeft: "10px" }}
              >
                <i className="fa fa-spinner fa-spin"></i> Sending please wait
              </div>
            ) : (
              ""
            )}
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
                          <td>{email.email}</td>
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
                if (props.type && props.type === "profile") {
                  props.history.goBack();
                } else {
                  props.handleBack("userProfile");
                }
              }}
              className="create-freelancer-bottom-steps-back"
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              hidden={props.type && props.type === "profile"}
              className="create-freelancer-bottom-steps-skip"
            >
              Next {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
          </div>
        </div>
      </div>
      <FileUploadLoader title={`Deleting please wait...`} show={show} />
    </div>
  );
}

export default Invitation;

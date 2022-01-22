import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";

export const EndContract = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handlePay =async () => {
    setLoading(true);
    let individualFreelancerId = props.userProfile?.individualFreelancerId;
    let projectContractId = props.contractDetail.projectContractId;
    let clientId = props.contractDetail.client.clientId;
    let projectId=props.projectDetail.projectId
    let type=sessionStorage.userType==="Client"?props.userProfile?.individualFreelancerId?'freelancer':'company':'client'
    let result = await request(
      `${ENDPOINT["EndContract"]}?projectContractId=${projectContractId}&clientId=${clientId}`,
      getOptions({})
    );
    if (result.success) {
      setLoading(false);
      notifications.showSuccess("Contract is successfully closed");
      history.push(`/evaluation?projectId=${projectId}&type=${type}`, {
        contractDetail: props.contractDetail,
      });
      props.handleClose();
    } else {
      setLoading(false);
      notifications.showError("Error occurred please try again later");
    }
  };
  return (
    <>
      <div className="end_contract">
        <h4 className="h3" style={{ fontWeight: "bolder" }}>
          End Contract
        </h4>
        <p>
          Are you sure you want to end this contract?
          <br />
          You'll be prompted to provide feedback and make any final payments in
          the following steps
        </p>
        <div className="save_cancel text-center mb-0">
          <button type="button" className="btn save_btn" onClick={handlePay}>
            Pay {" "}
                    {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
          </button>
          <button
            type="button"
            className="btn cancel_btn"
            onClick={props.handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

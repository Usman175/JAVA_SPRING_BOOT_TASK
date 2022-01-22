import React, { useState } from "react";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";

export const ResumeContractModal = (props) => {
  const [reason, setReason] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    if (e.target.value === "") {
      setInvalid(true);
    }
    setReason(e.target.value);
  };

  const handleSubmit =async () => {
    if (reason === "") {
      setInvalid(true);
    } else {
      setLoading(true)
      let individualFreelancerId=props.userProfile?.individualFreelancerId;
      let projectContractId=props.contractDetail.projectContractId;
      let clientId=props.contractDetail.client.clientId;
      let contractDetailNew=props.contractDetail;

      let result = await request(
        `${
          ENDPOINT["ResumeContract"]
        }?projectContractId=${projectContractId}&clientId=${clientId}&individualFreelancerId=${individualFreelancerId}`,
        getOptions({})
      );
     if(result.success){
      setLoading(false) 
      notifications.showSuccess("You have resumed the contract")
        setReason("");

        contractDetailNew.projectContractStatus="Accepted"
        if(props.projectDetail.projectType==="Hourly"){ 
            props.history.push({
              pathname:'/hourly-contract-detail-client',
              state:contractDetailNew
            })
          }
          if(props.projectDetail.projectType==="OfficeWork"){ 
            props.history.push({
              pathname:'/office-contract-detail-client',
              state:contractDetailNew
            })
          }
          if(props.projectDetail.projectType==="FreeContract"){ 
            props.history.push({
              pathname:'/free-contract-detail-client',
              state:contractDetailNew
            })
          }
          if(props.projectDetail.projectType==="Milestone"){ 
            props.history.push({
              pathname:'/milestone-contract-detail-client',
              state:contractDetailNew
            })
          }
      props.handleClose();

     }else{
      setLoading(false) 
     notifications.showError("Error occurred please try again later")
     }
   

    }
  };
  return (
    <>
      <div className="end_contract pause_project">
        <div className="post_form">
          <h4 className="font-weight-bold">Re Activate Contract</h4>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Write the reason of pause"
              onChange={handleChange}
              value={reason}
            />
            {invalid && (
              <small className="red_text">You must enter the reason</small>
            )}
          </div>

          <div className="save_cancel text-center">
            <button
              type="button"
              className="btn save_btn"
              onClick={handleSubmit}
            >
              Activate {" "}
                    {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
            <button
              type="button"
              className="btn cancel_btn"
              data-dismiss="modal"
              onClick={props.handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

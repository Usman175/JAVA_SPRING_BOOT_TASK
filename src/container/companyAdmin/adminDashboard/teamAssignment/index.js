import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Avatar from "@mui/material/Avatar";
import { Select } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import "./teamAssignment.scss";
import notifications from "../../../../utils/notifications";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../../utils/httpConfig";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";


function TeamAssignment(props) {
  let selectFreelancer=props.selectFreelancer;
  let organizationTeams=props.organizationTeams
  const [index, setIndex] = useState(0);
  const { onHideCallBack, show } = props;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState({});

  const onTeamChange = (value) => {
    setSelectedTeam(value);
  };

  const handleValidation=()=>{
    let formIsValid = true;
    let errorMessage = {};
    if (!selectedTeam) {
      formIsValid = false;
      errorMessage["teamName"] = "This field is required!";
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Team name is required!");
      return;
    }
    setErrorMessage(errorMessage)
    return formIsValid;
  }

  const handleAssignTeam=async ()=>{
    if(handleValidation()){
      setLoading(true)

      let organization=organizationTeams.find((item)=>item.teamId===selectedTeam)

      let result = await request(
        `${ENDPOINT["AddOrganizationFreelancerToTeam"]}?organizationId=${organization.organizationId}&individualFreelancerId=${selectFreelancer.individualFreelancerId}&teamId=${selectedTeam}`,
        postOptions()
      );
      if (result.success) {

        notifications.showSuccess("Team is successfully assigned")
        setLoading(false)
        props.onHideCallBack()
        setSelectedTeam('')
      }else{
        setLoading(false)
        notifications.showError("Already assigned this team to this freelancer")
      }


    }
  }

  return (
    <Modal show={show} onHide={() => onHideCallBack()} centered backdrop={true}>
       <Modal.Header
          className="modal-body-content-team-assignment-header modal-header"
          closeButton={false}
          title="Team Assignment"
        >
          <Modal.Title 
             className="position-relative d-flex"
          >
            Team Assignment
          </Modal.Title>
          <span onClick={() => onHideCallBack()} className="custom-close" >
            x
          </span>
        </Modal.Header>
      <Modal.Body className="modal-body-content-team-assignment">
        <div className="title">
          <h6>Assign a team member</h6>
        </div>
        <div className="user-info-wrapper">
          <Avatar
            alt="user"
            src={selectFreelancer.userProfileUrl?`https://dhihitu47nqhv.cloudfront.net/${selectFreelancer.userProfileUrl}`:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"}
          />
          <p>{selectFreelancer.freelancerName}</p>
        </div>
        <div className="dropdown-list">
          <DropdownList
            id="team"
            name="team"
            enableAutoCompleteSearch
            placeHolder="Select a team"
            value={selectedTeam}
            items={organizationTeams.map((item)=>({text:item.teamName,value:item.teamId}))}
            selectItem={onTeamChange}
          />
        </div>
        <div className="text-center button-assign">
          <button   onClick={handleAssignTeam}  disabled={loading} className="button" type="button">
            {" "}
            Assign{" "}  {loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TeamAssignment;

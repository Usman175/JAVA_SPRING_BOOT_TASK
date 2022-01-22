import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import "./teamCreation.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import notifications from "../../../../utils/notifications";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../../utils/httpConfig";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function TeamCreation(props) {
  let OrganizationFreelancers=props.OrganizationFreelancers
  const [index, setIndex] = useState(0);
  const { onHideCallBack, show } = props;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [errorMessage,setErrorMessage] = useState({});
  const [loading,setLoading] = useState(false);
  const onTeamChange = (value) => {
    setSelectedTeam(value);
  };

  const handleSelectTeamMember=(value)=>{
    setSelectedMember(value)
    let preSelectedTeamMembers=selectedTeamMembers;
      let Member=preSelectedTeamMembers.find((item)=>item.individualFreelancerId===value)
    if(!Member){
      let newMember=OrganizationFreelancers.find((item)=>item.individualFreelancerId===value)
      setSelectedTeamMembers([...preSelectedTeamMembers,newMember])
    }
  }
  const handleValidation=()=>{
    let formIsValid = true;
    let errorMessage = {};
    if (!teamName) {
      formIsValid = false;
      errorMessage["teamName"] = "This field is required!";
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Team name is required!");
      return;
    }
    if (!selectedTeam) {
      formIsValid = false;
      errorMessage["selectedTeam"] = "This field is required!";
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("Team leader is required!");
      return;
    }
    if (selectedTeamMembers.length===0) {
      formIsValid = false;
      errorMessage["selectedTeam"] = "This field is required!";
      window.scrollTo({
        top: "198",
        behavior: "smooth",
      });
      notifications.showWarning("At least one team member is required");
      return;
    }

    if (!selectedTeamMembers.find((item)=>item.individualFreelancerId===selectedTeam)){
      formIsValid = false;
      errorMessage["selectedTeam"] = "This field is required!";
      notifications.showWarning("Team leader should be a member of team");
      return;
    }
    setErrorMessage(errorMessage)
    return formIsValid;
  }

  const handleCreateTeam=async ()=>{
    if(handleValidation()){
      setLoading(true)

      let params={
        organizationId:selectedTeamMembers[0].organizationId,
        teamName:teamName,
        teamLeaderId:selectedTeam,
        freelancerMemberIds:selectedTeamMembers.map((item)=>item.individualFreelancerId)
      }

      let result = await request(
        `${ENDPOINT["CreateOrganizationTeam"]}`,
        postOptions(params)
      );
      if (result.success) {

        notifications.showSuccess("Team is successfully created")
        props.handleSuccess()
        setLoading(false)
        props.onHideCallBack()
        setTeamName('')
        setSelectedTeam('')
        setSelectedTeamMembers([])
      }else{
        setLoading(false)
      }


    }
  }

  return (
    <Modal show={show} onHide={() => onHideCallBack()} centered backdrop={true}>
      <Modal.Body className="modal-body-content-team-creation">
        <div className="title">
          <h3>Team Creation</h3>
        </div>

        <div className="input-id-wrapper">
          <input placeholder="Team name" value={teamName} onChange={(e)=>setTeamName(e.target.value)} className="input-id" />
        </div>

        <div className="dropdown-list">
          <DropdownList
            id="team"
            name="team"
            placeHolder="Select a lead"
            value={selectedTeam}
            items={props.OrganizationFreelancers.map((item)=>({value:item.individualFreelancerId,text:item.freelancerName}))}
            selectItem={onTeamChange}
          />
        </div>

        <div className="dropdown-list">
          <DropdownList
            id="team"
            name="team"
            placeHolder="Members"
            value={selectedMember}
            items={props.OrganizationFreelancers.map((item)=>({value:item.individualFreelancerId,text:item.freelancerName}))}
            selectItem={handleSelectTeamMember}
          />
        </div>
        { 
          OrganizationFreelancers && OrganizationFreelancers.length>0 && selectedTeam &&  <div className="stack">
          <Stack direction="row">
          <div className="role-wrapper">
                  <div className="team-leader">
                    <Avatar alt="user1" src={`https://dhihitu47nqhv.cloudfront.net/${OrganizationFreelancers.find((item)=>item.individualFreelancerId===selectedTeam).userProfileUrl}`} /> {" "} <span> {OrganizationFreelancers.find((item)=>item.individualFreelancerId===selectedTeam).freelancerName}</span>
                  </div>
               <div className="role-title"> Team Lead</div>
                </div>
          </Stack>
        </div>
        }
        {
          selectedTeamMembers.length>0 &&         <div className="stack">
          <Stack direction="row">
            {selectedTeamMembers.map((item, index) => {
              return (
                <div className="role-wrapper">
                  <div className="team-leader">
                  <BootstrapTooltip placement="top" title={item.freelancerName}>
                    <Avatar alt="user1" src={`https://dhihitu47nqhv.cloudfront.net/${item.userProfileUrl}`} />
                    </BootstrapTooltip>
                  </div>
                  {index == 1 && <div className="role-title">Team members</div>}
                </div>
              );
            })}
          </Stack>
        </div>
        }

        <div className="text-center button-assign">
          <button
            className="button"
            type="button"
            onClick={handleCreateTeam}
            disabled={loading}
          >
            {" "}
            Create a team{" "}
            {loading ? (
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

export default TeamCreation;

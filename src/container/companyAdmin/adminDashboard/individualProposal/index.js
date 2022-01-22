import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import "./individualProposal.scss";
import notifications from "../../../../utils/notifications";
import project from "../../../../store/reducer/project";
function IndividualProposal(props) {
  const [index, setIndex] = useState(0);
  const [projectId, setProjectId] = useState('');
  const { onHideCallBack, show, team } = props;
  const handleRedirect=()=>{
    if(projectId){
      if(!team){
        // props.history.push({pathname:`/project-detail-for-freelancer?projectId=${projectId}`,state:props.selectFreelancer})
      }else{
        // props.history.push({pathname:`/project-detail-for-freelancer?projectId=${projectId}`,state:props.team})
      }
      props.history.push(`/project-detail-for-freelancer?projectId=${projectId}`)
    }else{
      notifications.showWarning("Project is required!")
    }
  }
  return (
    <Modal show={show} onHide={() => onHideCallBack()} centered backdrop={true}>
      <Modal.Body className="modal-body-content-proposal">
        <div className="title">
          <h3>Individual Proposal</h3>
        </div>
        {!team && (
          <div className="user-info-wrapper">
            <Avatar
              alt="user"
              src={props.selectFreelancer?.userProfileUrl?`https://dhihitu47nqhv.cloudfront.net/${props.selectFreelancer?.userProfileUrl}`:"https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"}
            />
            <p>{props.selectFreelancer?.freelancerName}</p>
          </div>
        )}
        {team && <div className="team-title">{props.team?.teamName}</div>}
        <div className="input-id-wrapper">
          <input placeholder="Project Id" value={projectId} onChange={(e)=>setProjectId(e.target.value)} className="input-id" />
        </div>
        <div className="text-center button-assign">
          <button onClick={handleRedirect} className="button" type="button">
            {" "}
            Go To Proposal Page{" "}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default IndividualProposal;

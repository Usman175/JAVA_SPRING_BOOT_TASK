import React from "react";
import "./project.scss";
function ProjectStatusIcon(props) {
  return (
    <div className="project-status-icon">
      {props.completed === "completed" && (
        <img
          src="https://dhihitu47nqhv.cloudfront.net/icons/approvedcheckbox.svg"
          className="completed"
        />
      )}
      {props.completed === "in-progress" && (
        <img
          src="https://dhihitu47nqhv.cloudfront.net/icons/fitness_race_running_tracking_workout_icon.svg"
          className="in-progress"
        />
      )}
      {props.completed === "stopped" && (
        <img
          src="https://dhihitu47nqhv.cloudfront.net/icons/colorStop.svg"
          className="stopped"
        />
      )}
      {props.Milestone === "paid" && (
        <img
          src="https://dhihitu47nqhv.cloudfront.net/icons/approvedcheckbox.svg"
          className="completed"
        />
      )}
      {props.completed === "InWaiting" && (
        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/waitingIcon.png"} className="completed" />
      )}
    </div>
  );
}

export default ProjectStatusIcon;

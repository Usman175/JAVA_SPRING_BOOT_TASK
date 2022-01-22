import React from "react";
import "./project.scss";
export default function ProjectStatusBadge(props) {
  return (
    <div
      className={`project-status-badge-${props.projectBadge.replace(
        /\s/g,
        ""
      )}`}
    >
      {props.projectBadge && props.projectBadge === "WaitingForInitialDeposit"
        ? "Waiting For Initial Deposit"
        : props.projectBadge}
    </div>
  );
}

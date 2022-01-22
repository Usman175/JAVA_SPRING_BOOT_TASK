import React from "react";
import "./project.scss";
export default function ProjectTypeBadge(props) {
  return (
    <div
      className={`project-type-badge-${props.projectType?.replace(" ", "")} `}
    >
      {props.projectType &&
        props.projectType.replace(/([A-Z]+)/g, " $1").replace(/^ /, "")}
    </div>
  );
}

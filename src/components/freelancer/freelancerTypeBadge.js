import React from "react";
import "./freelancer.scss";
export default function FreelancerTypeBadge(props) {
  return (
    <div
      className={`freelancer-type-badge-${props.freelancerType?.replace(" ", "")} `}
    >
      {props.freelancerType &&
        props.freelancerType.replace(/([A-Z]+)/g, " $1").replace(/^ /, "")}
    </div>
  );
}
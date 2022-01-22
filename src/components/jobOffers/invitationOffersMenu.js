import React from "react";

function JobOfferMenuItems({ onMenuItemClick }) {
  const onLocalMenuItemClick = (type) => {
    onMenuItemClick(type);
  };

  return (
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <span
        className="dropdown-item"
        onClick={() => onLocalMenuItemClick("Accepted")}
      >
        {" "}
        <i className="fa fa-check-square-o"></i> Accept{" "}
      </span>
      <span
        className="dropdown-item"
        onClick={() => onLocalMenuItemClick("Rejected")}
      >
        {" "}
        <i className="fa fa-window-close" aria-hidden="true"></i> Decline
      </span>
    </div>
  );
}

export default JobOfferMenuItems;

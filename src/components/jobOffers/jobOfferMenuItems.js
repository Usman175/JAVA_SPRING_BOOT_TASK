import React from "react";

function JobOfferMenuItems({ id, applied, offered, onMenuItemClick }) {
  const onLocalMenuItemClick = (type) => {
    onMenuItemClick(type, id);
  };

  return (
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <span
        className="dropdown-item"
        onClick={() => onLocalMenuItemClick("save")}
      >
        {" "}
        <i className="fa fa-heart-o"></i> Save{" "}
      </span>
      <span
        className="dropdown-item"
        onClick={() => onLocalMenuItemClick("apply")}
      >
        {" "}
        <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> Apply
      </span>
      <span
        className="dropdown-item"
        onClick={() => onLocalMenuItemClick("report")}
      >
        {" "}
        <i className="fa fa-flag-o"></i> Report{" "}
      </span>
      {applied && (
        <span
          className="dropdown-item"
          onClick={() => onLocalMenuItemClick("accept")}
        >
          {" "}
          <i className="fa fa-check"></i> Accept{" "}
        </span>
      )}
      {offered && (
        <span
          className="dropdown-item"
          onClick={() => onLocalMenuItemClick("withdraw")}
        >
          {" "}
          <i className="fa fa-times"></i> Withdraw{" "}
        </span>
      )}
    </div>
  );
}

export default JobOfferMenuItems;

import React from "react";

export default function Radio(props) {
  return (
    <div
      className={`custom-control post-project-custom-radio`}
      onClick={() => props.handleSelect(props.value)}
    >
      <input
        type="radio"
        value={props.value}
        name={props.name}
        id={props.id}
        className="custom-control-input"
        checked={props.checked}
      />
      <label htmlFor={props.id}>
        {props.label}
        <span className="compulsory" hidden={!props.compulsory}>
          *
        </span>
      </label>
      <div className="check">
        <div className="inside"></div>
      </div>
    </div>
  );
}

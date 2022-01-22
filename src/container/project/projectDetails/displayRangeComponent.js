import React from "react";

function DisplayRangeComponent(props) {
  const sliderCss = (field) => {
    return {
      left: `${
        parseInt(field || "50") - 4.6 * (0.9 - parseInt(field || "50") / 100)
      }%`,
      transform: `translateX(-${field || "50"}%)`,
      display: "inline",
    };
  };
  return (
    <div className="d-flex align-items-center custom_range customer-rang-width-bar">
      <label className="contest-preference">{props.type1}</label>
      <div className="range_slider">
        <input
          type="range"
          min="1"
          max="100"
          value={props.percentage}
          className="slider"
          id="gender"
        />
        <span
          htmlFor="myRange"
          className="slider-bubble"
          style={sliderCss(props.percentage)}
        >
          {" "}
          {`${props.percentage}%`}{" "}
        </span>
      </div>
      <label className="contest-preference">{props.type2}</label>
    </div>
  );
}

export default DisplayRangeComponent;

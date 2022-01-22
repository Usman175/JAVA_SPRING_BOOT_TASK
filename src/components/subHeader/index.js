import React from "react";
import "./subHeader.scss";
function SubHeader() {
  return (
    <div className="freelancer-profile-top-area-general">
      <div className="bcknd_container sub-header-meanu">
        <img
          src={
            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icon-bulb.svg"
          }
        /> 
        <p>
          {" "}
          Tips! You may find full time jobs nearby under full time job menu
        </p>
        <div className="subHeader-button">Go!</div>
      </div>
    </div>
  );
}

export default SubHeader;

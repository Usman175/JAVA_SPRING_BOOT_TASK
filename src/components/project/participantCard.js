import React, { useEffect, useState } from "react";
import v4 from "uuid";

import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";
import request from "../../utils/request";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function ParticipantCard({ pictureS3Key, userName }) {
  const [imageUrl, setImageUrl] = useState("");

  //Get image url

  const getData = async () => {
    let result = await request(
      ENDPOINT["S3KeyToURL"] + "?key=" + pictureS3Key,
      getOptions()
    );
    if (result.success) {
      setImageUrl(result.result);
    }
  };

  useEffect(() => {
    if (
      pictureS3Key &&
      pictureS3Key.trim() != "" &&
      pictureS3Key !== undefined &&
      pictureS3Key != null
    ) {
      getData();
    }
  }, [pictureS3Key]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {userName}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        {pictureS3Key === " " || pictureS3Key === "" ? (
          <span key={`${v4()}`}>{userName && userName.charAt(0)}</span>
        ) : (
          // <span className="freelancer_img">
          //     <img
          //         src={imageUrl}
          //         alt=""
          //     />
          // </span>
          <span className="freelancer_img">
            <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/createmember.svg"} alt="" />
          </span>
        )}
      </OverlayTrigger>
    </>
  );
}

export default ParticipantCard;

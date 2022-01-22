import React, { useEffect, useState } from "react";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import Skeleton from "@material-ui/lab/Skeleton";
import Status from "../../../components/status/status";
import "./freelancerContents.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { getProfileImage } from "../../../utils/getProfileUrl";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
function LeftFreelancerContent({ freelancer, ...props }) {

  return (
    <>
      <div className="client_profile">
        <div className="freelancer-profile-box">
          <span className="freelancer-profile-area">
            {freelancer?.userProfileUrl || freelancer.companyLogo ? (
              <img
                src={getProfileImage(freelancer.userProfileUrl || freelancer.companyLogo)}
                alt=""
                className="freelancer-profile-img"
              />
            ) : (
              <Skeleton
                width="100%"
                style={{ height: "113px", marginTop: "-30px" }}
              />
              // <i class="fa fa-4x fa-user" aria-hidden="true"></i>
            )}
            <Status status={freelancer.onlineStatus?.toLowerCase() || "offline"} />
            {freelancer.companyName ? (
              <div className="company-label"> Company</div>
            ) : (
              <div className="individual-label">Individual</div>
            )}
          </span>
          <BootstrapTooltip
            PopperProps={{
              disablePortal: true,
            }}
            arrow
            placement="left"
            title={
              freelancer.companyName
                ? freelancer.companyName
                : freelancer.userName && freelancer.userName != " "
                ? freelancer.userName
                : "Not Available"
            }
          >
            <h4
              onClick={() => {
                if (freelancer.organizationId) {
                  props.history.push(
                    `/organization-profile/${freelancer.organizationId}`
                  );
                }
                if (freelancer.individualFreelancerId) {
                  props.history.push(
                    `/freelancer-profile/${freelancer.individualFreelancerId}`
                  );
                }
              }}
            >
              {" "}
              {freelancer.companyName
                ? freelancer.companyName
                : freelancer.userName && freelancer.userName != " "
                ? freelancer.userName
                : "Not Available"}{" "}
            </h4>
          </BootstrapTooltip>
        </div>
      </div>
    </>
  );
}

export default LeftFreelancerContent;

import React, { useState } from "react";
import { JungleModal } from "../modals/jungleModal";
import { PauseModal } from "../modals/pauseModal";
import { ResumeContractModal } from "../modals/resumeContract";
import Button from "@material-ui/core/Button";
import { EndContract } from "../modals/endContract";
import { DisputeTime } from "../modals/disputeTime";
import DeleteIcon from "@material-ui/icons/Delete";
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ProjectStatusBadge from "../project/projectStatusBadge";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import "./freelancer.scss";
import moment from "moment";
import Popover from "@mui/material/Popover";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CompanyView from './companyView'

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

export const UserView = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    userProjectDetails,
    contractDetail,
    handlePauseContract,
    unpaidAmount,
    timeAndPaymentsTab,
    userProfile,
  } = props;

  const handleOnRefund = () => {
    props.history.push("/freelancer-refund");
  };
  const handleRedirectFreelancer = (data) => {
    if (data.individualFreelancerId) {
      props.history.push(`/freelancer-profile/${data.individualFreelancerId}`);
    } else if (data.organizationId) {
      props.history.push(`/organization-profile/${data.organizationId}`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className="pause_end user-contract-profile-view">
      <div className="row">
        <div className="col-md-7 col-lg-6">
          <div className="media align-items-center">
            <div className="media-left d-flex align-items-center justify-content-center">
              <img
                className="image-placement-contract"
                src={
                  userProfile?.userProfileUrl
                    ? `https://dhihitu47nqhv.cloudfront.net/${userProfile?.userProfileUrl}`
                    : "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                }
                alt="profile"
                style={{ fontSize: "15px" }}
              />
            </div>
            <div className="media-body post_modal">
              <BootstrapTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                arrow
                placement="top"
                title={"Open freelancer profile"}
              >
                <h5
                  onClick={() => handleRedirectFreelancer(userProfile)}
                  className="profile-name-contact"
                >
                  {userProfile?.firstName + " " + userProfile?.lastName}
                </h5>
              </BootstrapTooltip>
              <div className="contract-profile-content-rating">
              <Rating
                name="User rating"
                value={3}
                readOnly
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
              </div>
              <p className="contract-profile-content">
                {" "}
               <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/icons/location_pin_icon.svg" />&nbsp;
               {userProfile?.addressInfo?.userCity}&nbsp; &nbsp;
                {userProfile?.addressInfo?.userCountry} 
              </p>
              {/* Not using this may in future */}
              <p hidden className="contract-profile-content">
                Contract Status:
                {contractDetail?.projectContractStatus ? (
                  <ProjectStatusBadge
                    projectBadge={contractDetail?.projectContractStatus}
                  />
                ) : (
                  "Working Now"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-lg-6 text-right">
          <h6>The amount to pay</h6>
          <div className="popover-menu-area">
            {/* <i onClick={handleClick} className="fa fa-ellipsis-v"></i> */}
            <MoreVertIcon onClick={handleClick} />
            <Popover
              id={"simple-popover"}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div
                className="popover-wapper"
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                <li 
                style={{position:'relative'}} 
                onClick={()=> props.history.push('freelancer-refund')}
                >
                <i class="fas fa-balance-scale popoverRefund_icon"></i> Request Refund
                </li>
                <li style={{position:'relative'}}  onClick={()=> props.history.push('contact-us')}>
                <i class="fas fa-file-signature"></i> Claim
                </li>
                <li style={{position:'relative'}}>
                  <i class="far fa-envelope"></i> Message
                </li>
              </div>
            </Popover>
          </div>
          <label className="green_text">{unpaidAmount}</label>
          {timeAndPaymentsTab && (
            <div
              hidden={
                props.contractDetail.projectContractStatus === "OnHold" ||
                props.contractDetail.projectContractStatus === "Completed" ||
                true
              }
              className="save_cancel"
            >
              <Button
                hidden={sessionStorage.userType === "Freelancer"}
                variant="outlined"
                startIcon={<PaymentOutlinedIcon />}
              >
                Pay
              </Button>
              <Button
                variant="outlined"
                startIcon={<SwapHorizOutlinedIcon />}
                onClick={handleOnRefund}
                color="secondary"
                className="contract-detail-refund-button"
              >
                Refund
              </Button>
              {/* <JungleModal
                dialogClassName="jungle-modal"
                contentClassName="jungle-modal-content"
                customClose
                Body={DisputeTime}
                OpenButton={({ handleClick }) => (
                  <button
                    type="button"
                    className="btn cancel_btn"
                    onClick={handleClick}
                  >
                    Refund
                  </button>
                )}
                title="Dispute Hours"
              /> */}
            </div>
          )}
          <br />
          {props.contractDetail.projectContractStatus === "Completed" ? (
            <Button
              variant="outlined"
              hidden={sessionStorage.userType === "Freelancer"}
              onClick={() => {
                props.history.push(
                  "/hire-freelancer?id=" +
                    props.contractDetail?.project?.projectId +
                    "&userId=" +
                    props.contractDetail?.userProfile?.individualFreelancerId +
                    "&projectProposalId=" +
                    props.contractDetail?.projectProposalId
                );
              }}
              startIcon={<AccessibilityIcon />}
            >
              ReHire
            </Button>
          ) : (
            <div className="save_cancel">
              <div hidden={sessionStorage.userType === "Freelancer"}>
                {props.contractDetail.projectContractStatus === "OnHold" ? (
                  <JungleModal
                    dialogClassName="jungle-modal"
                    contentClassName="jungle-modal-content"
                    customClose
                    Body={(propsData) => (
                      <ResumeContractModal
                        contractDetail={props.contractDetail}
                        userProfile={props.userProfile}
                        projectDetail={props.projectDetail}
                        handleClose={propsData.handleClose}
                        {...props}
                      />
                    )}
                    OpenButton={({ handleClick }) => (
                      <Button
                        variant="outlined"
                        onClick={handleClick}
                        startIcon={<PanToolOutlinedIcon />}
                      >
                        Resume
                      </Button>
                    )}
                    title="Pause Contract"
                    size="sm"
                  />
                ) : (
                  <JungleModal
                    dialogClassName="jungle-modal"
                    contentClassName="jungle-modal-content"
                    customClose
                    Body={(propsData) => (
                      <PauseModal
                        contractDetail={props.contractDetail}
                        userProfile={props.userProfile}
                        projectDetail={props.projectDetail}
                        handleClose={propsData.handleClose}
                        {...props}
                      />
                    )}
                    OpenButton={({ handleClick }) => (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClick}
                        startIcon={<PanToolOutlinedIcon />}
                      >
                        Hold
                      </Button>
                    )}
                    title="Pause Contract"
                    size="sm"
                  />
                )}
           
              </div>
              <div className="contract-no-client-contract-detail"> {/* removed this for contract detail */}
                {/* Contract No: <span>{contractDetail?.projectContractId}</span>  */} 
              </div>
            </div>
          )}
               <JungleModal
                  dialogClassName="jungle-modal"
                  contentClassName="jungle-modal-content"
                  customClose
                  Body={(propsData) => (
                    <EndContract
                      contractDetail={props.contractDetail}
                      userProfile={props.userProfile}
                      projectDetail={props.projectDetail}
                      handleClose={propsData.handleClose}
                      {...props}
                    />
                  )}
                  OpenButton={({ handleClick }) => (
                    <Button
                      color="default"
                      variant="contained"
                      onClick={handleClick}
                      className="complete-contract-button"
                      startIcon={<CheckCircleOutlineIcon />}
                    >
                      Complete
                    </Button>
                  )}
                  title="End Contract"
                />
        </div>
      </div>
      <div
        hidden={true} className="freelancer-select-area"
      >
        <span>
          <i className="fa fa-angle-left "></i>
        </span>
        <span>{moment().format("dddd, MMM D, YYYY")}</span>
        <span>
          <i className="fa fa-angle-right "></i>
        </span>
      </div>
      <CompanyView {...props}  contractDetail={contractDetail}  userProfile={userProfile} />
    </div>
  );
};

import React from "react";
import { useStyles } from "./myprojectsCardsStyle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ProjectStatusBadge from "../projectStatusBadge";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../store/constants/constant";
const myPic =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
    fontSize: "12px",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const ContractInfo = ({ type, completed, Milestone, status, contractData }) => {
  const classes = useStyles();
  /* contractData projectContractId */
  return (
    <div className={classes.ContractInfoContainer}>
      {type === "Hourly" ||
      type === "Milestone" ||
      type === "FreeContract" ||
      type === "OfficeWork" ? (
        <h4 className={classes.ContractNoTitle}>
          <span>
            {" "}
            Contract No :{" "}
            <span style={{ marginRight: "30px" }}>
              {contractData?.projectContractId}
            </span>{" "}
          </span>{" "}
          <ProjectStatusBadge projectBadge={status} />
        </h4>
      ) : (
        <h4 className={classes.ContractNoTitle}>
          Project No :{" "}
          <span style={{ marginRight: "30px" }}>
            {contractData?.project?.projectId}
          </span>{" "}
          <ProjectStatusBadge projectBadge={status} />
        </h4>
      )}
      {(type === "Hourly" && (
        <>
          {contractData?.userProfile &&
            contractData.userProfile?.individualFreelancerId && (
              <div className={classes.ContractWrapper}>
                {completed === "completed" ? (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top-start"
                    title="Micheal Jackson"
                  >
                    <img src={myPic} className={classes.Avatar} />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    placement="top-start"
                    title={contractData.userProfile.userName}
                  >
                    <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.Avatar}
                    />
                  </BootstrapTooltip>
                )}
                <p className={classes.ContractTitle}>
                  Contract :{" "}
                  <span>
                    US$
                    {contractData.finalizedHourlyRate
                      ? contractData.finalizedHourlyRate
                      : "0"}
                    .OO/hr
                  </span>
                </p>
              </div>
            )}
        </>
      )) ||
        (type === "Milestone" && (
          <>
            {" "}
            {contractData?.userProfile &&
            contractData.userProfile?.individualFreelancerId &&  (
              <>
                <div>
                <BootstrapTooltip
                    title={contractData?.userProfile?.userName}
                    placement="top-start"
                    arrow
                  >
                  <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.Avatar} 
                    />
                    </BootstrapTooltip>
                  {Milestone === "Released" ? (
                    <>
                      <h4 className={classes.EscrowedAmountText}>
                        Escrowed Amount: <span>$US400.00</span>
                      </h4>
                      <Button
                        variant="contained"
                        className={classes.ReleaseBtn}
                      >
                        Release Milestone
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {Milestone === "desposit" ? (
                  <Button variant="contained" className={classes.DepositBtn}>
                    Deposit New Milestone
                  </Button>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )) ||
        (type === "FreeContract" &&
          contractData?.userProfile &&
          contractData.userProfile?.individualFreelancerId && (
            <>
              <div className={classes.houlryWrapper}>
                {completed === "completed" ? (
                  <BootstrapTooltip
                    title={contractData?.freelancer?.userName}
                    placement="top-start"
                    arrow
                  >
                    <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.AvatarFreeContract}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    title={contractData?.freelancer?.userName}
                    placement="top-start"
                    arrow
                  >
                    <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.AvatarFreeContract}
                    />
                  </BootstrapTooltip>
                )}
                <div>
                  <p className={classes.dailyRate}>
                    US$
                    {contractData.finalizedHourlyRate
                      ? contractData.finalizedHourlyRate
                      : "0"}
                    .00/hr
                  </p>
                  <p className={classes.dailyRate}>
                    US$
                    {contractData.finalizedDailyRate
                      ? contractData.finalizedDailyRate
                      : "0"}
                    .00/day
                  </p>
                </div>
              </div>
            </>
          )) ||
        (type === "OfficeWork" &&
          contractData?.userProfile &&
          contractData.userProfile?.individualFreelancerId && (
            <>
              <div className={classes.houlryWrapper}>
                {completed === "completed" ? (
                  <BootstrapTooltip
                  title={contractData?.userProfile?.userName}
                    placement="top-start"
                    arrow
                  >
                    <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.AvatarFreeContract}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    title={contractData?.freelancer?.userName}
                    placement="top-start"
                    arrow
                  >
                    <img
                      src={
                        contractData.userProfile?.individualFreelancerId &&
                        contractData.userProfile?.userProfileUrl
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.userProfileUrl}`
                          : contractData.userProfile?.organizationId &&
                            contractData.userProfile?.companyLogo
                          ? `https://${GET_IMAGE_PREFIX1}/${contractData.userProfile?.companyLogo}`
                          : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                      }
                      className={classes.AvatarFreeContract}
                    />
                  </BootstrapTooltip>
                )}
                <div>
                  <p className={classes.dailyRate}>
                    US$
                    {contractData.finalizedSalarayAmount
                      ? contractData.finalizedSalarayAmount
                      : "0"}
                    .00/day
                  </p>
                </div>
              </div>

              {/* <div className={classes.houlryWrapper}>
              <BootstrapTooltip
                title="Micheal Jackson"
                placement="top-start"
                arrow
              >
                <div className={classes.TextAvatar}>J</div>
              </BootstrapTooltip>
              <div>
                <p className={classes.dailyRate}>US$120.00/day</p>
              </div>
            </div> */}
            </>
          )) ||
        (type === "Contest" &&
          (completed === "completed" ? (
            <>
              <div className={classes.houlryWrapper}>
                <img
                  className={classes.awardedIcon}
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/awardIcon2.png"
                  }
                />
                {completed === "completed" ? (
                  <BootstrapTooltip
                    title="Asim Ali"
                    placement="top-start"
                    arrow
                  >
                    <img src={myPic} className={classes.AvatarFreeContract} />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    title="Asim Ali"
                    placement="top-start"
                    arrow
                  >
                    <img src={myPic} className={classes.AvatarFreeContract} />
                  </BootstrapTooltip>
                )}
                <div>
                  <p className={classes.dailyRate}> Awarded : US$1000.00</p>
                </div>
              </div>
              <div className={classes.houlryWrapper}>
                <img
                  className={classes.awardedIcon}
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/awardIcon3.png"
                  }
                />
                <BootstrapTooltip
                  title="Micheal Jackson"
                  placement="top-start"
                  arrow
                >
                  <div className={classes.TextAvatar}>J</div>
                </BootstrapTooltip>
                <div>
                  <p className={classes.dailyRate}>Awarded : US$1000.00</p>
                </div>
              </div>
            </>
          ) : completed === "InWaiting" ? (
            <div>
              <p className={classes.awardedNoApplicantText}>
                Sorry. <br /> You don't have any applicants yet.
              </p>
            </div>
          ) : (
            <div>
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <span style={{ display: "inline-block" }}>
                <div
                  style={{ marginTop: "-5px" }}
                  className={classes.TextAvatar}
                >
                  J
                </div>
              </span>
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <span style={{ display: "inline-block" }}>
                <div className={classes.TextAvatar}>J</div>
              </span>
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
              <img src={myPic} className={classes.DummyImg} />
            </div>
          )))}
    </div>
  );
};

export default ContractInfo;

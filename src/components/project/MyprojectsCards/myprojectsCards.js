import React, { useState, useEffect } from "react";
import ContractInfo from "./contractInfo";
import ProgressBar from "../../progressBar/progressBar";
import { useStyles } from "./myprojectsCardsStyle";
import ProjectStatusIcon from "../projectStatusIcon";
import clsx from "clsx";
import ProjectTypeBadge from "../projectTypeBadge";
import ShowMoreText from "react-show-more-text";
import {useSelector} from "react-redux";
import Format from "../../../components/numberFormat";
const myPic =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";
const MyProjectsCards = ({
  type,
  completed,
  Milestone,
  Contest,
  status,
  contractData,
  ...props
}) => {
  const classes = useStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showProjectTypeMobile, setShowProjectTypeMobile] = useState(false);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProjectTypeShowMobile = () => {
    setShowProjectTypeMobile(!showProjectTypeMobile);
  };

  const handleRedirectDetail = () => {
    if (type === "Hourly") {
      props.history.push({
        pathname: "/hourly-contract-detail-client",
        state: contractData,
      });
    }
    if (type === "Milestone") {
      props.history.push({
        pathname: "/milestone-contract-detail-client",
        state: contractData,
      });
    }
    if (type === "FreeContract") {
      props.history.push({
        pathname: "/free-contract-detail-client",
        state: contractData,
      });
    }

    if (type === "OfficeWork") {
      props.history.push({
        pathname: "/office-contract-detail-client",
        state: contractData,
      });
    }

    if (type === "Contest") {
      props.history.push(`/my-contest?projectId=${contractData?.project?.projectId}`);
    }
  };
  return (
    <>
      {completed === "stopped" ? (
        <div className={classes.Alretwrapper}>
          <p className={classes.AlertText}>
            Contract with{" "}
            {contractData?.client?.firstName +
              " " +
              contractData?.client?.lastName}{" "}
            is in Hold
          </p>
        </div>
      ) : (
        ""
      )}
      <div style={{boxShadow:props.isDisableRight?'none':''}} className={classes.Container}>
        <div className={classes.MainContainer}>
          <div>
            <div
              className={clsx(
                type === "Milestone" ||
                  type === "FreeContract" ||
                  type === "Contest"
                  ? classes.MileStonWrapper
                  : classes.HeaderWrapper
              )}
            >
              <div className={classes.HeadingWrapper}>
                <ProjectStatusIcon
                  Milestone={Milestone}
                  completed={completed}
                  classes={classes}
                />

                <h1
                  className={clsx(
                    type === "Milestone"
                      ? classes.MileStoneHeader
                      : classes.Mainheader
                  )}
                  onClick={handleRedirectDetail}
                >
                  {contractData?.project?.jobTitle}
                </h1>
              </div>
              <div
                className={clsx(
                  (type === "Hourly" && classes.HourlyBtnWrapper) ||
                    (type === "Milestone" && classes.MilestoneBtnWrapper) ||
                    (type === "FreeContract" && classes.FreeBtnWrapper) ||
                    (type === "Contest" && classes.ContestbtnWrapper)
                )}
              >
                <ProjectTypeBadge projectType={type} />
              </div>
            </div>
            {type === "Milestone" ? (
              <div className={classes.ContractAmount}>
                <h4 className={classes.AmountText}>
                  Contract Amount:{" "}
                  <span>
                    <Format
                      currency={contractData?.project?.currencyCode}
                      number={contractData?.finalizedMilestoneAmount || "0.00"}
                    />
                  </span>{" "}
                </h4>
              </div>
            ) : null}
            <div className={classes.AboutProject}>
              <p className={classes.ProjectInfo}>
                <ShowMoreText
                  lines={3}
                  more="show more"
                  less="Show Less"
                  className={`${classes.contentCssContractCards} "content-css"`}
                  anchorClass="view-more-less"
                  expanded={false}
                >
                  <span
                    style={{ color: "#333333 !important" }}
                    dangerouslySetInnerHTML={{
                      __html: contractData?.project?.jobDescription || contractData?.project?.contestDesignRequirement,
                    }}
                  ></span>
                </ShowMoreText>
              </p>
            </div>
            {type === "OfficeWork" && (
              <div className={classes.Wrapper}>
                <div className={classes.PaidWrapper}>
                  <h4 className={classes.PaidText}>
                    {languageType.PAID_TOTAL_TEXT} : <span>US$0.00</span>{" "}
                  </h4>
                </div>
                <h4 className={classes.AttendanceText}>
                  {languageType.ATTENDANCE} : <span>0 Days</span>{" "}
                </h4>
              </div>
            )}
            {type === "Hourly" || type === "FreeContract" ? (
              <div className={classes.Wrapper}>
                <div className={classes.PaidWrapper}>
                  <h4 className={classes.PaidText}>
                  {languageType.PAID_TOTAL_TEXT} : <span>US$0.00</span>{" "}
                  </h4>
                </div>
                <div className={classes.HoursWrapper}>
                  <h4 className={classes.HoursText}>
                    Hours Total : <span>0 hours</span>{" "}
                  </h4>
                </div>
                {type === "FreeContract" ? (
                  <h4 className={classes.AttendanceText}>
                    {languageType.ATTENDANCE} : <span>0 Days</span>{" "}
                  </h4>
                ) : null}
              </div>
            ) : (
              <>
                {type === "Milestone" && (
                  <div className={classes.ProgressBarWrapper}>
                    <ProgressBar Milestone={Milestone} />
                    <h5 className={classes.PaidMilestone}>
                      Paid Milestone : <span>$0.00</span>{" "}
                    </h5>
                  </div>
                )}

                {type === "Contest" && completed === "completed" ? (
                  <div className={classes.contestWrapper1}>
                    <div className={classes.TextWrapper}>
                      <img
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/awardIcon1.png"
                        }
                        className={classes.awardedIcon}
                      />
                      <h4 className={classes.SelectedText}>Awarded US$0.00</h4>
                    </div>
                    <div className={classes.ImgWrapper1}>
                      <img src={myPic} className={classes.Avatar} />
                      <span className={classes.SelectedText}>
                        Winner : Asim Ali
                      </span>
                    </div>
                  </div>
                ) : type === "Contest" && completed === "InWaiting" ? (
                  <div className={classes.contestWaitingMessage}>
                    <img
                      className={classes.awardedWaitingIcon}
                      src={
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/bulbIcon.png"
                      }
                    />
                    <div>
                      <p className={classes.awardedWaitingText}>
                        {languageType.PLEASE_MORE_PATIENT}
                        <br /> {languageType.NORMALLY_DESIGNERS_LAST_MOMENT}
                      </p>
                    </div>
                  </div>
                ) : type === "Contest" && completed === "in-progress" ? (
                  <div className={classes.contestWrapper}>
                    <div className={classes.TextWrapper}>
                      <img
                        src="https://dhihitu47nqhv.cloudfront.net/icons/approvecheckok.svg"
                        className={classes.verifiedIcon}
                      />
                      <h4 className={classes.SelectedText}>
                        First Selected Candidates
                      </h4>
                    </div>
                    <div className={classes.ImgWrapper}>
                      <img src={myPic} className={classes.Avatar} />
                      <img src={myPic} className={classes.Avatar} />
                      <img src={myPic} className={classes.Avatar} />
                      <img src={myPic} className={classes.Avatar} />
                      <img src={myPic} className={classes.Avatar} />
                      <img src={myPic} className={classes.Avatar} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>

          {/* mobile area iconRight project type show */}
          <div
            onClick={() => windowWidth < 700 && handleProjectTypeShowMobile()}
            className={classes.iconRight_showProjectType_MyContractsCardClient}
          >
            {windowWidth < 700 && (
              <>
                {showProjectTypeMobile ? (
                  <>
                    <span>
                      <i
                        className={`${classes.iconRight_showProjectType_button} fa fa-angle-down`}
                      ></i>
                    </span>
                  </>
                ) : (
                  <span>
                    <i
                      className={`${classes.iconRight_showProjectType_button} fa fa-angle-right`}
                    ></i>
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* <span className={classes.horizantalLine}></span> */}
        <div hidden={props.isDisableRight} className={classes.contractsCardDetailRightAreaPcView}>
          <ContractInfo
            type={type}
            status={status}
            completed={completed}
            Milestone={Milestone}
            contractData={contractData}
          />
        </div>
        {showProjectTypeMobile && (
          <div className={classes.contractsCardDetailRightAreaMobileView}>
            <ContractInfo
              type={type}
              status={status}
              completed={completed}
              Milestone={Milestone}
              contractData={contractData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjectsCards;

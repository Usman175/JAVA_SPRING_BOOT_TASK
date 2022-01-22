import React, { useState } from "react";
import "./adminDashboard.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@mui/material/Popover";
import MenuItems from "./menuItem";
import TeamAssignment from "./teamAssignment";
import IndividualProposal from "./individualProposal";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import Skeleton from "../../../components/skeleton/skeleton";
import { getProfileImage } from "../../../utils/getProfileUrl";
import notifications from "../../../utils/notifications";
import FileUploadLoader from "../../../components/loader/fileUpload";

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
function GeneralTab(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [partTime, setPartTime] = useState(null);
  const [isSkeletonLoading1, setIsSkeletonLoading1] = useState(false);
  const [showTeamAssignmentModal, setShowTeamAssignmentModal] = useState(false);
  const [selectFreelancer, setSelectFreelancer] = useState({});
  const [showIndividualProposalModal, setShowIndividualProposalModal] =
    useState(false);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorMenuEl);
  const id = open ? "simple-popover" : undefined;
  const idMenu = openMenu ? "simple-popover-menu" : undefined;
  const [companyFreelancers, setCompanyFreelancers] = useState([]);
  const [proposalDetail, setProposalDetail] = useState({
    hourlyRate: "14.00",
    dailyRate: "200.00",
    availablePerWeek: "30",
    daysPerWeek: "5",
    noOfFreelancer: "3",
  });
  const [organizationStats,setOrganizationStats]=useState({})
  const [activeFields, setActiveFields] = useState([]);

  const authReducer = useSelector((state) => state.authReducer);

  // console.log(authReducer?.organizationAuth,"authReducer?.organizationAuth?.organizationId")

  React.useEffect(() => {
    getCompanyMembers();
    getAllTeamsOfOrganization();
    GetOrganizationStatsByOrganizationId()
  }, []);

  const getCompanyMembers = async () => {
    let organizationId = authReducer?.organizationAuth?.organizationId;
    if (organizationId) {
      setIsSkeletonLoading1(true);
      let result = await request(
        `${ENDPOINT["GetFreelancersByOrganization"]}?organizationId=${organizationId}`,
        postOptions()
      );
      if (result.success) {
        setIsSkeletonLoading1(false);
        setCompanyFreelancers(result.result);
        props.setOrganizationFreelancers(result.result);
      } else {
        setIsSkeletonLoading1(false);
      }
    }
  };

  const GetOrganizationStatsByOrganizationId = async () => {
    let organizationId = authReducer?.organizationAuth?.organizationId;
    if (organizationId) {
      let result = await request(
        `${ENDPOINT["GetOrganizationStatsByOrganizationId"]}?organizationId=${organizationId}`,
        postOptions()
      );
      if (result.success) {
        setOrganizationStats(result.result)
      } else {
      }
    }
  };
  const getAllTeamsOfOrganization = async () => {
    let organizationId = authReducer?.organizationAuth?.organizationId;
    if (organizationId) {
      let result = await request(
        `${ENDPOINT["GetAllOrganizationTeams"]}?organizationId=${organizationId}`,
        getOptions()
      );
      if (result.success) {
        props.handleSetOrganizationTeam(result.result);
      }
    }
  };

  const handleActive = (field) => {
    let newActiveFields = [...activeFields];
    newActiveFields.push(field);
    setActiveFields(newActiveFields);
  };
  const handleDeActive = (field) => {
    let newActiveFields = [...activeFields];
    let newElements = newActiveFields.filter((item) => item != field);
    setActiveFields(newElements);
  };

  const earnings = () => {
    return (
      <div className="tooltip-wrapper">
        <p>Total: $3900.00</p>
        <p>This week: $350.00</p>
      </div>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, freelancer) => {
    setAnchorMenuEl(event.currentTarget);
    setSelectFreelancer(freelancer);
  };

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  const selectedByPopoverContent = () => {
    return (
      <div
        className="popover-wapper"
        onClick={() => {
          setAnchorEl(null);
        }}
      >
        <li style={{position:'relative'}} ><i class="fas fa-file-signature"></i> Available Only</li>
        <li style={{position:'relative'}} ><i class="far fa-clock"></i> Part time only</li>
        <li style={{position:'relative'}} ><i class="fas fa-user-shield"></i> Authorize admin staff</li>
      </div>
    );
  };

  const handleFullTimeChange = (data) => {
    updateFreelancerAvailableStatus(data)
  };


  const handlePartTimeChange = (data) => {
    updateFreelancerAvailableStatus(data)
  };

  const updateFreelancerAvailableStatus=async (data)=>{
    setLoading(true)
    let result = await request(
      `${ENDPOINT["UpdateFullTimeAvailability"]}?organizationId=${data.organizationId}&individualFreelancerId=${data.individualFreelancerId}&isFullTime=${!data.isFullTime}`,
      postOptions({})
    );
    if (result.success) {
     notifications.showSuccess("Freelancer availability status updated successfully ")
     getCompanyMembers();
     setLoading(false)
     }else{
      notifications.showError("An error occurred please again later!")
      setLoading(false)
    }

  }

  const menuPopoverContent = (data) => {
    return (
      <ul
        className="popover-wapper"
        onClick={() => {
          setAnchorMenuEl(null);
        }}
      >
        <li
          onClick={() => {
            setShowTeamAssignmentModal(true);
          }}
        >
          Assign a team
        </li>
        <li
          onClick={() => {
            setShowIndividualProposalModal(true);
          }}
        >
          Purpose
        </li>
        <li>Set Availiblity</li>
        <li onClick={()=>handlePartTimeChange(data)} className="inline-flex">
          <div className="align-center">
            <input
              type="radio"
              // checked={data.isFullTime}
              onChange={()=>handleFullTimeChange(data)}
            />
          </div>
          <p>Full Time</p>
        </li>
        <li onClick={()=>handlePartTimeChange(data)} className="inline-flex">
          <div className="align-center">
            <input
              type="radio"
              // checked={!data.isFullTime}
              onChange={()=>handlePartTimeChange(data)}
            />
          </div>
          <p>Part Time</p>
        </li>
        <li>View Profile</li>
        <li className="text-red">Deactivate</li>
      </ul>
    );
  }; 
  return (
    <>
      <TeamAssignment
        show={showTeamAssignmentModal}
        onHideCallBack={() => setShowTeamAssignmentModal(false)}
        organizationTeams={props.organizationTeams}
        selectFreelancer={selectFreelancer}
      />
      <IndividualProposal
        show={showIndividualProposalModal}
        onHideCallBack={() => setShowIndividualProposalModal(false)}
        {...props}
        selectFreelancer={selectFreelancer}
      />

      <div className="admin-dashboard-general-tab">
        <div className="disable-client-section">
          <div>
            <input
              className="custom-checkbox-styled"
              id={`termsConditions`}
              type="checkbox"
            />
            <label for={`termsConditions`}>Disable client section</label>
          </div>
        </div>
        <div className="earning-stats">
          <h4>Total: US$3,500.00</h4>
          <h4>This week earning: US$1,500.00</h4>
        </div>
        <div className="general-stats">
          <p><i className="fa fa-users" aria-hidden="true" style={{marginRight:"5px"}}></i>Teams : {organizationStats.totalTeams?organizationStats.totalTeams:'0'}</p>
          <p><i className="fa fa-user" aria-hidden="true" style={{marginRight:"5px"}}></i>Active members : {organizationStats.totalActiveFreelancers?organizationStats.totalActiveFreelancers:'0'}</p>
          <p className="color-stats-green"><i className="fa fa-clock-o" aria-hidden="true" style={{marginRight:"5px"}}></i>Available Full Time Members : {organizationStats.totalFullTimeFreelancrs?organizationStats.totalFullTimeFreelancrs:'0'}</p>
          <p className="color-stats-blue"><i className="fa fa-clock-o" aria-hidden="true" style={{marginRight:"5px"}}></i>Available Part Time Members : {organizationStats.totalPartTimeFreelancers?organizationStats.totalPartTimeFreelancers:'0'}</p>
        </div>
        <div className="freelancer-users-area-top">
          <div>
            <input
              className="custom-checkbox-styled"
              id="Allow-to-change-participants"
              type="checkbox"
            />
            <label for="Allow-to-change-participants"></label>
          </div>
          
          <p onClick={handleClick} style={{cursor:"pointer"}}> <i className="fa fa-sliders" aria-hidden="true"></i> Sort by </p>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {selectedByPopoverContent()}
          </Popover>
        </div>
        <Skeleton count={4} isSkeletonLoading={isSkeletonLoading1} />
        <div hidden={isSkeletonLoading1} className="freelancer-users-area">
          {companyFreelancers.length > 0 ? (
            companyFreelancers.map((item, index) => {
              return (
                <div className="freelancer-user-item">
                  <div className="freelancer-user-item-top">
                    <BootstrapTooltip placement="top" title={earnings()}>
                      <div className="freelancer-user-item-profile">
                        <img
                          src={
                            getProfileImage(item.userProfileUrl)  }
                        />
                        <div className="profile-detail">
                          <p>{item.freelancerName}</p>
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </span>
                        </div>
                      </div>
                    </BootstrapTooltip>
                    <div className="freelancer-user-item-role">
                      <div>
                        <input
                          readOnly={
                            activeFields.includes(`roleFreelancer${index}`)
                              ? false
                              : true
                          }
                          placeholder="set a role"
                          className={`${
                            activeFields.includes(`roleFreelancer${index}`)
                              ? "active"
                              : ""
                          }`}
                        />
                        {activeFields.includes(`roleFreelancer${index}`) ? (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"Save role"}
                          >
                            <img
                              onClick={() =>
                                handleDeActive(`roleFreelancer${index}`)
                              }
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                              }
                            />
                          </BootstrapTooltip>
                        ) : (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            title={"Edit role "}
                            arrow
                            placement="top"
                          >
                            <img
                              onClick={() =>
                                handleActive(`roleFreelancer${index}`)
                              }
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                              }
                            />
                          </BootstrapTooltip>
                        )}
                      </div>
                    </div>
                    <div className="freelancer-user-item-team">
                       {item.isFullTime?"Full time available":'Part time available'} 
                      </div>
                    {item.team && (
                      <div className="freelancer-user-item-team">
                        {item.team}
                      </div>
                    )}
                    <div className="select-freelancer-area">
                      <input
                        className="custom-checkbox-styled"
                        id={`select-freelancer${index}`}
                        type="checkbox"
                      />
                      <label for={`select-freelancer${index}`}></label>
                    </div>
                    <div
                      onClick={(e) => handleMenuClick(e, item)}
                      className="freelancer-menu-area"
                    >
                      <i className="fa fa-ellipsis-v"></i>
                    </div>
                    <Popover
                      id={idMenu}
                      open={openMenu}
                      anchorEl={anchorMenuEl}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      {menuPopoverContent(item)}
                    </Popover>
                  </div>
                  <div className="freelancer-profile-rate">
                    <div className="row">
                      <div className="col-12">
                        <p>
                          <ShowMoreText
                            lines={3}
                            more="show more"
                            less={"show less"}
                            className="content-css"
                            anchorClass="view-more-less"
                            expanded={false}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.professionalOverview,
                              }}
                            ></span>
                          </ShowMoreText>
                        </p>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="project-terms-item">
                          <div className="project-terms-item-left">
                            <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                            Hourly Rate :
                          </div>
                          <div className="project-terms-item-right">
                            US${" "}
                            <input
                              readOnly={
                                activeFields.includes(
                                  "`hourlyRateFreelancer${index}`"
                                )
                                  ? false
                                  : true
                              }
                              defaultValue={item.hourlyRate}
                              className={`${
                                activeFields.includes(
                                  `hourlyRateFreelancer${index}`
                                )
                                  ? "active"
                                  : ""
                              }`}
                            />
                            {activeFields.includes(
                              `hourlyRateFreelancer${index}`
                            ) ? (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                arrow
                                placement="top"
                                title={"Save Hourly Rate"}
                              >
                                <img
                                  onClick={() =>
                                    handleDeActive(
                                      `hourlyRateFreelancer${index}`
                                    )
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                  }
                                />
                              </BootstrapTooltip>
                            ) : (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                title={"Edit Hourly Rate"}
                                arrow
                                placement="top"
                              >
                                <img
                                  onClick={() =>
                                    handleActive(`hourlyRateFreelancer${index}`)
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                  }
                                />
                              </BootstrapTooltip>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="project-terms-item">
                          <div className="project-terms-item-left">
                            <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                            Daily Rate :
                          </div>
                          <div className="project-terms-item-right">
                            US${" "}
                            <input
                              readOnly={
                                activeFields.includes(
                                  `dailyRateFreelancer${index}`
                                )
                                  ? false
                                  : true
                              }
                              className={`${
                                activeFields.includes(
                                  `dailyRateFreelancer${index}`
                                )
                                  ? "active"
                                  : ""
                              }`}
                              defaultValue={item.dailyRate}
                            />
                            {activeFields.includes(
                              `dailyRateFreelancer${index}`
                            ) ? (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                arrow
                                placement="top"
                                title={"Save Daily Rate"}
                              >
                                <img
                                  onClick={() =>
                                    handleDeActive(
                                      `dailyRateFreelancer${index}`
                                    )
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                  }
                                />
                              </BootstrapTooltip>
                            ) : (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                title={"Edit Hourly Rate"}
                                arrow
                                placement="top"
                              >
                                <img
                                  onClick={() =>
                                    handleActive(`dailyRateFreelancer${index}`)
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                  }
                                />
                              </BootstrapTooltip>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="project-terms-item">
                          <div className="project-terms-item-left">
                            <img src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg" />
                            Condition :
                          </div>
                          <div className="project-terms-item-right">
                            <input
                              className={`${
                                activeFields.includes(
                                  `availablePerWeek${index}`
                                )
                                  ? "active"
                                  : ""
                              } custom-width`}
                              value={item.attendHourOfWeek?.slice(10, 12)}
                            />{" "}
                            hrs/week
                            {activeFields.includes(
                              `availablePerWeek${index}`
                            ) ? (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                arrow
                                placement="top"
                                title={"Save Available hours per week"}
                              >
                                <img
                                  onClick={() =>
                                    handleDeActive(`availablePerWeek${index}`)
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"
                                  }
                                />
                              </BootstrapTooltip>
                            ) : (
                              <BootstrapTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                title={"Edit Available hours per week"}
                                arrow
                                placement="top"
                              >
                                <img
                                  onClick={() =>
                                    handleActive(`availablePerWeek${index}`)
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                  }
                                />
                              </BootstrapTooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataAvailable
              title=" No freelancer exists yet!"
              buttonText="Invite more freelancer"
              path={`/organization-profile/${authReducer?.organizationAuth?.organizationId}`}
              color={"#0d2146"}
              {...props}
            />
          )}
        </div>
        <FileUploadLoader title={"Updating freelancer availability status..."} show={loading} />
      </div>
    </>
  );
}

export default GeneralTab;

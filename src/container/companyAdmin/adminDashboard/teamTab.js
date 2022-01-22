import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@mui/material/Popover";
import TeamCreation from "./teamCreation";
import TeamProposal from "./individualProposal";
import { useSelector } from "react-redux";
import "./adminDashboard.scss";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import Skeleton from "../../../components/skeleton/skeleton";
import notifications from "../../../utils/notifications";
import FileUploadLoader from "../../../components/loader/fileUpload";

const dummyImage =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";

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

function TeamTab(props) {
  const [showTeamCreationModal, setShowTeamCreationModal] = useState(false);
  const [showTeamProposalModal, setShowTeamProposalModal] = useState(false);
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);
  const [isSkeletonLoading1, setIsSkeletonLoading1] = useState(false);
  const [organizationTeams, setOrganizationTeams] = useState([]);
  const [team, setTeam] = useState("");
  const openMenu = Boolean(anchorMenuEl);
  const idMenu = openMenu ? "simple-popover-menu" : undefined;
  const [loading, setLoading] = useState(false);

  const authReducer = useSelector((state) => state.authReducer);

  const handleMenuClick = (event, team) => {
    setAnchorMenuEl(event.currentTarget);
    setTeam(team);
  };

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  useEffect(() => {
    getAllTeamsOfOrganization();
  }, []);

  const getAllTeamsOfOrganization = async () => {
    let organizationId = authReducer?.organizationAuth?.organizationId;
    if (organizationId) {
      setIsSkeletonLoading1(true);
      let result = await request(
        `${ENDPOINT["GetAllOrganizationTeams"]}?organizationId=${organizationId}`,
        getOptions()
      );
      if (result.success) {
        setIsSkeletonLoading1(false);
        setOrganizationTeams(result.result);
        props.handleSetOrganizationTeam(result.result);
      } else {
        setIsSkeletonLoading1(false);
      }
    }
  };

  const popoverMenuContent = (item, index) => {
    return (
      <div
        className="popover-wapper"
        key={index}
        onClick={() => {
          setAnchorMenuEl(null);
        }}
      >
        <li onClick={() => setShowTeamProposalModal(true)}>Propose</li>
        <li
          onClick={() => handleActivateAndDeactivateTeam(team)}
          className="text-red"
        >
          {team.activeStatus === "Active" && "Deactivate a team"}
          {team.activeStatus === "Deactive" && "Active a team"}{" "}
        </li>
      </div>
    );
  };

  const handleActivateAndDeactivateTeam = async (team) => {
    setLoading(true);
    let result = await request(
      `${ENDPOINT["ActivateOrDeactivateTeam"]}?organizationId=${
        team.organizationId
      }&status=${
        team.activeStatus === "Active" ? "Deactive" : "Active"
      }&teamId=${team.teamId}`,
      postOptions()
    );
    if (result.success) {
      notifications.showSuccess(
        `Team is successfully ${
          team.activeStatus === "Active" ? "Deactived" : "Actived"
        }`
      );
      setLoading(false);
      getAllTeamsOfOrganization();
    } else {
      setLoading(false);
      notifications.showError("Some error occurred from backend");
    }
  };

  const userInfo = () => {
    return (
      <div className="tooltip-info-wrapper">
        <p>Sonny Cho</p>
      </div>
    );
  };

  return (
    <>
      <TeamCreation
        show={showTeamCreationModal}
        onHideCallBack={() => setShowTeamCreationModal(false)}
        OrganizationFreelancers={props.OrganizationFreelancers}
        handleSuccess={getAllTeamsOfOrganization}
        {...props}
      />
      <TeamProposal
        show={showTeamProposalModal}
        onHideCallBack={() => setShowTeamProposalModal(false)}
        team={true}
        team={team}
        {...props}
      />
      <div className="admin-dashboard-general-tab">
        <div className="disable-client-section">
          <button
            onClick={() => {
              setShowTeamCreationModal(true);
            }}
            className="create-button"
          >
            Create a team
          </button>
        </div>
        <Skeleton count={4} isSkeletonLoading={isSkeletonLoading1} />
        <div hidden={isSkeletonLoading1} className="freelancer-users-area">
          <div className="freelancer-user-item-top">
            <div className="freelancer-user-item">
              <div className="checkbox-wrapper-top">
                <input
                  className="custom-checkbox-styled"
                  id="Allow-to-change-participants"
                  type="checkbox"
                />
                <label for="Allow-to-change-participants"></label>
              </div>
            </div>
          </div>
          {organizationTeams.length > 0 ? (
            organizationTeams.map((item, index) => {
              return (
                <div className="freelancer-user-item">
                  <div className="freelancer-user-item-top">
                    <div className="checkbox-wrapper">
                      <input
                        className="custom-checkbox-styled"
                        id={`select-freelancer${index}`}
                        type="checkbox"
                      />
                      <label for={`select-freelancer${index}`}></label>
                    </div>

                    {item.freelancerMembers.find(
                      (member) =>
                        member.individualFreelancerId === item.teamLeaderId
                    ) && (
                      <div className="freelancer-user-item-profile">
                        <img src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png" />
                        <div className="profile-detail">
                          <p>
                            {
                              item.freelancerMembers.find(
                                (member) =>
                                  member.individualFreelancerId ===
                                  item.teamLeaderId
                              ).freelancerName
                            }
                          </p>
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="freelancer-user-item-team">
                      {item.teamName}
                    </div>
                    <div className="freelancer-user-item-stack">
                      <Stack direction="row">
                        {item.freelancerMembers.map((item1, index1) => {
                          return (
                            <BootstrapTooltip
                              placement="top"
                              title={item1.freelancerName}
                            >
                              <Avatar
                                alt="user1"
                                src={
                                  item1.userProfileUrl
                                    ? `https://dhihitu47nqhv.cloudfront.net/${item1.userProfileUrl}`
                                    : "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                                }
                              />
                            </BootstrapTooltip>
                          );
                        })}
                      </Stack>
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
                      {popoverMenuContent(item, index)}
                    </Popover>
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataAvailable
              title=" No team exists yet!"
              buttonText="Invite more freelancer"
              path={`/organization-profile/${authReducer?.organizationAuth?.organizationId}`}
              color={"#0d2146"}
              {...props}
            />
          )}
        </div>
        <FileUploadLoader title={"Updating team status..."} show={loading} />
      </div>
    </>
  );
}

export default TeamTab;

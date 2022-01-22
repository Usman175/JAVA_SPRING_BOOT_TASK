import React, { useState } from "react";
import DropdownList from "../../../../../components/dropdowns/dropdownList";
import notifications from "../../../../../utils/notifications";
import Modal from "react-bootstrap/Modal";
import "./proposalCompnents.scss";
import Label from "../../../../../components/customLabel/label";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { getProfileImage } from "../../../../../utils/getProfileUrl";

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
function FreelancerSelection(props) {
  const [show, setShow] = useState(false);
  const [openTeam, setOpenTeam] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [activeFields, setActiveFields] = useState([]);
  const [modalType, setModalType] = useState("");
  const handleAddMore = () => {
    let newSelectedTeams = [...props.selectedTeams];
    let obj = {
      teamName: "",
      teamMembers: [],
    };
    newSelectedTeams.push(obj);
    props.setSelectedTeams(newSelectedTeams);
  };
  const handleRemoveItem = (index) => {
    let newSelectedTeams = [...props.selectedTeams];
    newSelectedTeams.splice(index, 1);
    props.setSelectedTeams(newSelectedTeams);
  };

  /* setSelectedTeams */
  const handleSelectTeam = (value, index) => {
    let findValue = props.selectedTeams.filter(
      (item) => item.teamName === value
    );
    if (findValue.length === 0) {
      let newSelectedTeams = [...props.selectedTeams];
      newSelectedTeams[index].teamName = value;
      props.setSelectedTeams(newSelectedTeams);
    } else {
      notifications.showWarning("This team is already selected");
    }
  };
  const handleSelectMember = (member, index) => {
    if (modalType === "team") {
      let newSelectedTeams = [...props.selectedTeams];
      let findData = newSelectedTeams[index].teamMembers.findIndex(
        (item) => item.name === member.name
      );
      if (findData === -1) {
        newSelectedTeams[index].teamMembers.push(member);
        props.setSelectedTeams(newSelectedTeams);
      } else {
        newSelectedTeams[index].teamMembers.splice(findData, 1);
        props.setSelectedTeams(newSelectedTeams);
      }
    } else {
      let newSSelectedFreelancer = [...props.SelectedFreelancer];
      let findData = newSSelectedFreelancer.findIndex(
        (item) => item.name === member.name
      );
      if (findData === -1) {
        newSSelectedFreelancer.push(member);
        props.setSelectedFreelancer(newSSelectedFreelancer);
      } else {
        newSSelectedFreelancer.splice(findData, 1);
        props.setSelectedFreelancer(newSSelectedFreelancer);
      }
    }
  };
  const handleRemoveMember = (index, index1) => {
    if (modalType === "team") {
      let newSelectedTeams = [...props.selectedTeams];
      newSelectedTeams[index].teamMembers.splice(index1, 1);
      props.setSelectedTeams(newSelectedTeams);
    } else {
      let newSSelectedFreelancer = [...props.SelectedFreelancer];
      newSSelectedFreelancer.splice(index1, 1);
      props.setSelectedFreelancer(newSSelectedFreelancer);
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
  const handleUpdateValue = (value, field, index) => {
    let newSSelectedFreelancer = [...props.SelectedFreelancer];
    newSSelectedFreelancer[index][field] = value;

    props.setSelectedFreelancer(newSSelectedFreelancer);
  };
  return (
    <div className="freelancer-select-design">
      {/* <Label title={"Choose team and team members"} compulsory={true} /> */}
      <div hidden={true}>
        {props.selectedTeams.map((item, index) => (
          <div className="row">
            <div className="col-12 col-md-4">
              <DropdownList
                id="team"
                name="team"
                enableAutoCompleteSearch
                placeHolder="Select a Team"
                value={item.teamName}
                items={props.teams}
                selectItem={(value) => {
                  handleSelectTeam(value, index);
                  setOpenTeam(props.teamMembers);
                }}
              />
            </div>
            <div className="col-12 col-md-4">
              <div
                className="select-freelancer-button"
                onClick={() => {
                  if (item.teamName) {
                    setShow(true);
                    setModalType("team");
                    setSelectedIndex(index);
                  } else {
                    notifications.showWarning("Please select team first!");
                  }
                }}
              >
                Select freelancer{" "}
                {item.teamMembers.length > 0
                  ? `(${item.teamMembers.length})`
                  : ""}
              </div>
            </div>
            <div className="col-2 col-md-1">
              <div className="increment-dec-icon">
                {index === props.selectedTeams.length - 1 ? (
                  <i onClick={handleAddMore} className="fa fa-plus"></i>
                ) : (
                  <i
                    onClick={() => handleRemoveItem(index)}
                    className="fa fa-minus"
                  ></i>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="selected-teams-members">
        {props.selectedTeams.map((item, index) => {
          if (item.teamName) {
            return (
              <div className="row">
                <div className="col-12 col-md-2">
                  <h3>{item.teamName}</h3>
                </div>
                <div className="col-12 col-md-10">
                  <div className="selected-members">
                    <div className="row">
                      {item.teamMembers.map((item1, index1) => {
                        return (
                          <div className="col-12">
                            <div className="freelancer-user-item">
                              <div className="freelancer-user-item-top">
                                <div className="freelancer-user-item-profile">
                                  <img src="https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png" />
                                  <div className="profile-detail">
                                    <p>Sonny Cho</p>
                                    <span>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                  </div>
                                </div>
                                <div className="freelancer-user-item-role">
                                  <div>
                                    <input
                                      readOnly={
                                        activeFields.includes(
                                          `roleFreelancer${index1}`
                                        )
                                          ? false
                                          : true
                                      }
                                      placeholder="set a role"
                                      className={`${
                                        activeFields.includes(
                                          `roleFreelancer${index1}`
                                        )
                                          ? "active"
                                          : ""
                                      }`}
                                    />
                                    {activeFields.includes(
                                      `roleFreelancer${index1}`
                                    ) ? (
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
                                            handleDeActive(
                                              `roleFreelancer${index1}`
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
                                        title={"Edit role "}
                                        arrow
                                        placement="top"
                                      >
                                        <img
                                          onClick={() =>
                                            handleActive(
                                              `roleFreelancer${index1}`
                                            )
                                          }
                                          src={
                                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                          }
                                        />
                                      </BootstrapTooltip>
                                    )}
                                  </div>
                                </div>
                                <div className="select-freelancer-area">
                                  <div
                                    onClick={() =>
                                      handleRemoveMember(index, index1)
                                    }
                                    className="remove-member"
                                  >
                                    X
                                  </div>
                                </div>
                              </div>
                              <div className="freelancer-profile-rate">
                                <div
                                  className="row"
                                  hidden={props.type === "Milestone"}
                                >
                                  <div className="col-12 col-lg-6">
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
                                              `hourlyRateFreelancer${index1}`
                                            )
                                              ? false
                                              : true
                                          }
                                          defaultValue={item1.hourlyRate}
                                          className={`${
                                            activeFields.includes(
                                              `hourlyRateFreelancer${index1}`
                                            )
                                              ? "active"
                                              : ""
                                          }`}
                                        />
                                        {activeFields.includes(
                                          `hourlyRateFreelancer${index1}`
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
                                                  `hourlyRateFreelancer${index1}`
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
                                                handleActive(
                                                  `hourlyRateFreelancer${index1}`
                                                )
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
                                  <div className="col-12 col-lg-6">
                                    <div className="project-terms-item">
                                      <div className="project-terms-item-left">
                                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg" />
                                        Condition :
                                      </div>
                                      <div className="project-terms-item-right">
                                        <input
                                          className={`${
                                            activeFields.includes(
                                              `availablePerWeek${index1}`
                                            )
                                              ? "active"
                                              : ""
                                          } custom-width`}
                                          value={item1.availablePerWeek}
                                        />{" "}
                                        hrs/week
                                        {activeFields.includes(
                                          `availablePerWeek${index1}`
                                        ) ? (
                                          <BootstrapTooltip
                                            PopperProps={{
                                              disablePortal: true,
                                            }}
                                            arrow
                                            placement="top"
                                            title={
                                              "Save Available hours per week"
                                            }
                                          >
                                            <img
                                              onClick={() =>
                                                handleDeActive(
                                                  `availablePerWeek${index1}`
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
                                            title={
                                              "Edit Available hours per week"
                                            }
                                            arrow
                                            placement="top"
                                          >
                                            <img
                                              onClick={() =>
                                                handleActive(
                                                  `availablePerWeek${index1}`
                                                )
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
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="individual-freelancer-selection">
        <Label title={"Assign freelancers"} compulsory={true} />
        <div className="row">
          <div className="col-4">
            <div className="add-freelancer-button">
              <button
                onClick={() => {
                  if (props.teamMembers && props.teamMembers.length > 0) {
                    setModalType("individual");
                    setShow(true);
                    setOpenTeam(props.teamMembers);
                  } else {
                    notifications.showWarning(
                      "Company should be at least freelancer to submit proposal got to your profile and invite"
                    );
                  }
                }}
              >
                Select freelancers
              </button>{" "}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="selected-members">
            <div className="row">
              {props.SelectedFreelancer.map((item1, index1) => {
                return (
                  <div className="col-12">
                    <div className="freelancer-user-item">
                      <div className="freelancer-user-item-top">
                        <div className="freelancer-user-item-profile">
                          <img
                            src={getProfileImage(item1.userProfileUrl)}
                          />
                          <div className="profile-detail">
                            <p>{item1.name}</p>
                            <span>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                          </div>
                        </div>
                        <div className="freelancer-user-item-role">
                          <div>
                            <input
                              readOnly={
                                activeFields.includes(`roleFreelancer${index1}`)
                                  ? false
                                  : true
                              }
                              placeholder="set a role"
                              className={`${
                                activeFields.includes(`roleFreelancer${index1}`)
                                  ? "active"
                                  : ""
                              }`}
                            />
                            {activeFields.includes(
                              `roleFreelancer${index1}`
                            ) ? (
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
                                    handleDeActive(`roleFreelancer${index1}`)
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
                                    handleActive(`roleFreelancer${index1}`)
                                  }
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"
                                  }
                                />
                              </BootstrapTooltip>
                            )}
                          </div>
                        </div>
                        <div className="select-freelancer-area">
                          <div
                            onClick={() => handleRemoveMember("", index1)}
                            className="remove-member"
                          >
                            X
                          </div>
                        </div>
                      </div>
                      <div className="freelancer-profile-rate">
                        <div
                          className="row"
                          hidden={props.type === "Milestone"}
                        >
                          <div
                            className="col-12 col-lg-6"
                            hidden={props.type === "OfficeWork"}
                          >
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
                                      `hourlyRateFreelancer${index1}`
                                    )
                                      ? false
                                      : true
                                  }
                                  onChange={(e) =>
                                    handleUpdateValue(
                                      e.target.value,
                                      "hourlyRate",
                                      index1
                                    )
                                  }
                                  value={item1.hourlyRate}
                                  className={`${
                                    activeFields.includes(
                                      `hourlyRateFreelancer${index1}`
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                />
                                {activeFields.includes(
                                  `hourlyRateFreelancer${index1}`
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
                                          `hourlyRateFreelancer${index1}`
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
                                        handleActive(
                                          `hourlyRateFreelancer${index1}`
                                        )
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
                          <div
                            className="col-12 col-lg-6"
                            hidden={
                              props.type === "FreeContract"
                                ? false
                                : props.type == "OfficeWork"
                                ? false
                                : true
                            }
                          >
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
                                      `dailyRateFreelancer${index1}`
                                    )
                                      ? false
                                      : true
                                  }
                                  className={`${
                                    activeFields.includes(
                                      `dailyRateFreelancer${index1}`
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                  onChange={(e) =>
                                    handleUpdateValue(
                                      e.target.value,
                                      "dailyRate",
                                      index1
                                    )
                                  }
                                  value={item1.dailyRate}
                                />
                                {activeFields.includes(
                                  `dailyRateFreelancer${index1}`
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
                                          `dailyRateFreelancer${index1}`
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
                                        handleActive(
                                          `dailyRateFreelancer${index1}`
                                        )
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content"
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        backdrop={true}
      >
        <Modal.Header className={`position-relative jungle-modal-header`}>
          <div className="customer-invitation-header">
            <img
              src={"https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg"}
              alt=""
            />
            <h3>
              {" "}
              {modalType === "team"
                ? "Members of Company"
                : "Select individual freelancer"}{" "}
            </h3>
          </div>

          <span onClick={() => setShow(false)} className="custom-close">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="hide_scroll_bar invitation_modal">
          <div className="freelancer-select-proposal">
            {openTeam.map((item, index) => (
              <div className="freelancer-select-proposal-item">
                <div className="selection-area-and-profile">
                  <div>
                    <input
                      className="custom-checkbox-styled"
                      checked={
                        modalType === "team"
                          ? props.selectedTeams[
                              selectedIndex
                            ]?.teamMembers.filter(
                              (member) => member.name === item.name
                            ).length > 0
                          : props.SelectedFreelancer.filter(
                              (member) => member.name === item.name
                            ).length > 0
                      }
                      id={`freelancer-selection-proposal${index}`}
                      type="checkbox"
                      onClick={() => {
                        handleSelectMember(item, selectedIndex);
                      }}
                    />
                    <label
                      for={`freelancer-selection-proposal${index}`}
                    ></label>
                  </div>
                  <div className="profile-detail">
                    <div className="profile-picture">
                      <img
                        src={getProfileImage(item.userProfileUrl)}
                      />
                    </div>{" "}
                    <div className="profile-detail-content">
                      {" "}
                      <h3>{item.freelancerName}</h3>
                      <p>{item.userTitle}</p>
                    </div>
                  </div>
                </div>
                <div className="freelancer-available">
                  {item.available === "Part Time" ? (
                    <div className="partTime">Part Time</div>
                  ) : (
                    <div className="fullTime">Full Time</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              className="select-freelancer-button"
              onClick={() => setShow(false)}
            >
              ok
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FreelancerSelection;

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import SubHeader from "../../../components/subHeader";
import LeftFreelancerContent from "../../freelancer/freelancerContents/leftFreelancerContent";
import MiddleFreelancerContent from "../../freelancer/freelancerContents/middleFreelancerContent";
import RightFreelancerContent from "../../freelancer/freelancerContents/rightFreelancerContent";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import { ProjectType } from "../../../utils/projectConst";
import "./hire.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {useSelector} from "react-redux";

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

let freelancer = {
  organizationId: "293QYVMRRM2DGGP",
  userId: "102907512529330721352",
  createdDateTime: "2021-10-21T19:32:18.061Z",
  positionType: null,
  contactFirstName: "Asim",
  contactLastName: "Ali",
  companyName: "WOW IT",
  iDType: null,
  kycProvePhoto: null,
  organizationType: null,
  companyType: null,
  businessType: "web",
  profileImageUrl: null,
  companyImages: null,
  contactNumber: "3026046119",
  emailAddress: null,
  website: "asimportfolio-6fd1d.web.app",
  noOfEmployee: "1542",
  officeLocation: null,
  isActive: false,
  isAgent: false,
  isAllowToWorkAsIndividualFreelancer: false,
  employeeInvitation: null,
  ndaId: null,
  stockExchange: null,
  registeredUserType: null,
  location: "Pakistan Telecommuication company limited",
  companyCertificateUrl:
    "kycproveimage/50966655-55bb-4b4c-8151-2724cffce371.png",
  companyLogo: "profileimage/64205290-20ef-4083-8d04-02033194bf73.png",
  companyTitle: "ReactJs developer",
  companyIntroduction:
    "ReactJS developers are front-end developers who build modern-day UI components to improvise application performance. They leverage their knowledge about JavaScript, HTML, CSS and work closely with testers, designers, web designers, and project managers to create a robust and effective application.30-Apr-2021",
  introductionVideo: null,
  annualSales: "900",
  addressInfo: {
    addressId: "Pakistan Telecommuication company limited",
    addressInfoId: "Pakistan Telecommuication company limited",
    isMainAddress: true,
    phoneNo: "3026046119",
    address: "Pakistan Telecommuication company limited",
    userCountry: "Pakistan",
    userCountryCode: "PK",
    userState: "Punjab",
    userCity: "Lahore",
    userPostalCode: null,
  },
  officePhotos: [],
  portfolios: [],
  certificates: [],
  serviceScopes: [
    {
      serviceScope: "web",
      subServiceScope: ["website", "application"],
    },
  ],
  individualfreelancerIds: [],
  invitations: [],
  companyOfferTerms: {
    organizationId: "293QYVMRRM2DGGP",
    defaultTermAccepted: false,
    extendedTerms: [
      {
        description: "",
        acceptedNo: "",
      },
    ],
  },
};

function HireCompany(props) {
  const [proposalDetail, setProposalDetail] = useState({
    hourlyRate: "14.00",
    dailyRate: "200.00",
    availablePerWeek: "30",
    daysPerWeek: "5",
    noOfFreelancer: "3",
  });
  const [flag, setFlag] = useState(false);
  const [activeFields, setActiveFields] = useState([]);
  const [show, setShow] = useState(false);
  const projectType = "Milestone";
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);

  const [companyFreelancers, setCompanyFreelancers] = useState([
    {
      profile: "",
      name: "",
      rating: "",
      role: "Set a role",
      selected: false,
      hourlyRate: "12.00",
      dailyRate: "100.00",
      availablePerWeek: "30",
    },

    {
      profile: "",
      name: "",
      rating: "",
      role: "Set a role",
      selected: false,
      hourlyRate: "14.00",
      dailyRate: "140.00",
      availablePerWeek: "20",
    },
    {
      profile: "",
      name: "",
      rating: "",
      role: "Set a role",
      selected: false,
      hourlyRate: "16.00",
      dailyRate: "150.00",
      availablePerWeek: "30",
    },
  ]);
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
  const handleUpdateProposal = (value, field) => {
    setProposalDetail({
      ...proposalDetail,
      [field]: value,
    });
  };
  return (
    <div>
      <SubHeader />
      <div className="row">
        <div className="col-12 col-lg-1 col-xl-2"></div>
        <div className="col-12 col-lg-10 col-xl-8 hire-container client_detail">
          <div className="hire-heading">
            <img
              src={
                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/greet_hello.svg"
              }
              alt="greet_hello"
              className="hire-heading-img"
            />
            <h4 className="hire-heading-text">{languageType.HIRE_COMPANY}</h4>
          </div>
          <br /> <br />
          <div className="row justify-content-between">
            <div className="col-md-2 col_3">
              <LeftFreelancerContent freelancer={freelancer} {...props} />
            </div>
            <div className="col-md-6 col_5">
              <MiddleFreelancerContent freelancer={freelancer} {...props} />
            </div>
            <div className="col-md-4 text-right">
              <RightFreelancerContent
                freelancer={freelancer}
                index={1}
                {...props}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="hire-company-terms">
            <div className="hire-company-terms-heading">
              <img
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/storage.svg"
                }
                alt="storage"
                className="storage"
              />
              <h4 className="hire-terms-text">{languageType.TERMS_TEXT}</h4>
            </div>
            <div className="hire-terms-about">
              <div className="hire-terms-about-sec1">
                <span>{languageType.PROJECT_TYPE} : </span>
                <ProjectTypeBadge projectType={projectType} />
              </div>
              <div className="hire-terms-about-sec2">
                <div className="row">
                  {/* <div className="col-12 col-md-6">
                    <div className="project-terms-item">
                      <div className="project-terms-item-left">
                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                        Hourly Rate :
                      </div>
                      <div className="project-terms-item-right">
                        US${" "}
                        <input
                          onChange={(e) =>
                            handleUpdateProposal(e.target.value, "hourlyRate")
                          }
                          readOnly={
                            activeFields.includes("hourlyRate") ? false : true
                          }
                          className={`${
                            activeFields.includes("hourlyRate") ? "active" : ""
                          }`}
                          value={proposalDetail.hourlyRate}
                        />
                        {activeFields.includes("hourlyRate") ? (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"Save Hourly Rate"}
                          >
                            <img
                              onClick={() => handleDeActive("hourlyRate")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
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
                              onClick={() => handleActive("hourlyRate")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                            />
                          </BootstrapTooltip>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="project-terms-item">
                      <div className="project-terms-item-left">
                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/dollar_hourly_rate_icon.svg" />
                        Daily Rate :
                      </div>
                      <div className="project-terms-item-right">
                        US${" "}
                        <input
                          onChange={(e) =>
                            handleUpdateProposal(e.target.value, "dailyRate")
                          }
                          readOnly={
                            activeFields.includes("dailyRate") ? false : true
                          }
                          className={`${
                            activeFields.includes("dailyRate") ? "active" : ""
                          }`}
                          value={proposalDetail.dailyRate}
                        />
                        {activeFields.includes("dailyRate") ? (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"Save Daily Rate"}
                          >
                            <img
                              onClick={() => handleDeActive("dailyRate")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                            />
                          </BootstrapTooltip>
                        ) : (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            title={"Edit Daily Rate"}
                            arrow
                            placement="top"
                          >
                            <img
                              onClick={() => handleActive("dailyRate")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                            />
                          </BootstrapTooltip>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="project-terms-item">
                      <div className="project-terms-item-left">
                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg" />
                        Condition :
                      </div>
                      <div className="project-terms-item-right">
                        <input
                          onChange={(e) =>
                            handleUpdateProposal(
                              e.target.value,
                              "availablePerWeek"
                            )
                          }
                          readOnly={
                            activeFields.includes("availablePerWeek")
                              ? false
                              : true
                          }
                          className={`${
                            activeFields.includes("availablePerWeek")
                              ? "active"
                              : ""
                          } custom-width`}
                          value={proposalDetail.availablePerWeek}
                        />{" "}
                        hrs/week,{" "}
                        <input
                          onChange={(e) =>
                            handleUpdateProposal(e.target.value, "daysPerWeek")
                          }
                          readOnly={
                            activeFields.includes("availablePerWeek")
                              ? false
                              : true
                          }
                          className={`${
                            activeFields.includes("availablePerWeek")
                              ? "active"
                              : ""
                          } custom-width1`}
                          value={proposalDetail.daysPerWeek}
                        />{" "}
                        days/week
                        {activeFields.includes("availablePerWeek") ? (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"Save Available hours per week"}
                          >
                            <img
                              onClick={() => handleDeActive("availablePerWeek")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
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
                              onClick={() => handleActive("availablePerWeek")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                            />
                          </BootstrapTooltip>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div className="col-12 col-md-6">
                    <div className="project-terms-item">
                      <div className="project-terms-item-left">
                        <img src="https://dhihitu47nqhv.cloudfront.net/icons/threePeople.svg" />
                        {languageType.NO_OF_FREELANCER} :
                      </div>
                      <div className="project-terms-item-right">
                        <input
                          onChange={(e) =>
                            handleUpdateProposal(
                              e.target.value,
                              "noOfFreelancer"
                            )
                          }
                          readOnly={
                            activeFields.includes("noOfFreelancer")
                              ? false
                              : true
                          }
                          className={`${
                            activeFields.includes("noOfFreelancer")
                              ? "active"
                              : ""
                          }`}
                          value={proposalDetail.noOfFreelancer}
                        />
                        {/* {activeFields.includes("noOfFreelancer") ? (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            placement="top"
                            title={"Save no Of freelancer"}
                          >
                            <img
                              onClick={() => handleDeActive("noOfFreelancer")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/check.png"}
                            />
                          </BootstrapTooltip>
                        ) : (
                          <BootstrapTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            title={"Edit no Of freelancer"}
                            arrow
                            placement="top"
                          >
                            <img
                              onClick={() => handleActive("noOfFreelancer")}
                              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/edit.png"}
                            />
                          </BootstrapTooltip>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="checkbox-allow-area">
                      <div>
                        <input
                          className="custom-checkbox-styled"
                          id="Allow-to-change-participants"
                          type="checkbox"
                        />
                        <label for="Allow-to-change-participants">
                          {languageType.ALLOW_CHANGE_PARTICIPANTS}
                        </label>
                      </div>
                      <div>
                        <input
                          className="custom-checkbox-styled"
                          id="Allow-freelancer"
                          type="checkbox"
                        />
                        <label for="Allow-freelancer">
                          {languageType.ALLOW_FREELANCER_LOG_TIME_MANU}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-freelancer-button">
                <button onClick={() => setShow(true)}>{languageType.ADD_FREELANCER}</button>
              </div>

              <div className="freelancer-users-area">
                {companyFreelancers.map((item, index) => {
                  return (
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
                        <div className="select-freelancer-area">
                          <input
                            className="custom-checkbox-styled"
                            id={`select-freelancer${index}`}
                            type="checkbox"
                          />
                          <label for={`select-freelancer${index}`}></label>
                        </div>
                      </div>
                      {projectType === "Hourly" && (
                        <div className="freelancer-profile-rate">
                          <div className="row">
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
                                          handleActive(
                                            `hourlyRateFreelancer${index}`
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
                                          handleActive(
                                            `dailyRateFreelancer${index}`
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
                                    value={proposalDetail.availablePerWeek}
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
                                          handleDeActive(
                                            `availablePerWeek${index}`
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
                                      title={"Edit Available hours per week"}
                                      arrow
                                      placement="top"
                                    >
                                      <img
                                        onClick={() =>
                                          handleActive(
                                            `availablePerWeek${index}`
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
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="term-conditions">
                <input
                  className="custom-checkbox-styled"
                  id={`termsConditions`}
                  type="checkbox"
                />
                <label for={`termsConditions`}>
                  {languageType.YES_UNDERSTAND_POLICY}
                </label>
              </div>
              <div className="process-button">
                <button>{languageType.PROCEED_TEXT}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-1 col-xl-2"></div>
      </div>
      <br />
      <br />
      <br />
      <br />
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
            <h3>Members of ABC Company </h3>
          </div>

          <span onClick={() => setShow(false)} className="custom-close">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="hide_scroll_bar invitation_modal">
          <div className="other-freelancers-area">
            <div className="other-freelancer-area-item">
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
              <div className="other-freelancer-area-item-middle">
                I am the best developer ever you have worked with
              </div>
              <div className="add-button">
                <button>Add</button>
              </div>
            </div>
            <div className="other-freelancer-area-item">
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
              <div className="other-freelancer-area-item-middle">
                I am the best developer ever you have worked with
              </div>
              <div className="add-button">
                <button>Add</button>
              </div>
            </div>
            <div className="other-freelancer-area-item">
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
              <div className="other-freelancer-area-item-middle">
                I am the best developer ever you have worked with
              </div>
              <div className="add-button">
                <button>Add</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HireCompany;

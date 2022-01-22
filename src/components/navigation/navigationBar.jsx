import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
  onRemoveCrossDomainData,
  onGetUserDataSuccess,
  onGetUserDataLoading,
  onGetUserDataError,
  onRemoveUserData,
  onSetClientFreelancerData,
  setActiveUserType,
  updateRegisteredUserFlag,
} from "../../store/action/action";
import "./navigation.scss";
import { getOrganization } from "../../store/action/organization-action";
import { connect } from "react-redux";
import { UserTypeConst } from "../../utils/userTypeConst";
import { isValidString } from "../../utils/validationConfig";
import { hitApiGetUser,getUserToken } from "../../services/userService";
import { RemoveCrossData } from "../../utils/auth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import NotifyModal from "../notifyModal";
import notifications from "../../utils/notifications";
import authReducer from "../../store/reducer/authReducer/authReducer";

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

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      isToggleActive: false,
      activeDropdownColleps: false,
      pendingFreelancer:false
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
  }

  async hitApiGetUser() {
    if (
      this.props.myAuth &&
      !this.props.userState.user &&
      !this.props.userState.isLoading &&
      !this.props.userState.error
    ) {
      const userId = this.props.myAuth.user.userId;
      if(!localStorage.USER_TOKEN){
        getUserToken(userId)
       }
      const result = await hitApiGetUser(userId);
      if (result.success && result.result != null) {
        localStorage.setItem("freelancer_auth", JSON.stringify(result.result));
    
          
        // checking if Freelancer is registered or not
        if (
          result.result?.freelancerData?.individualFreelancerId &&
          !localStorage.IndividaulFreelancerRegistrationInfo
        ) {
          if (result.result?.freelancerData?.activeStatus === "Active") {
            //  set data in redux is freelancer is registered
            this.props.updateRegisteredUserFlag({
              type: "isRegisterAsFreelancer",
              flag: true,
            });
          }else{
            this.setState({pendingFreelancer:true})
          }
        }
        // checking if Organization is registered or not
        if (
          result.result?.organizationData?.organizationId &&
          !localStorage.CompanyRegistrationInfo
        ) {
          this.props.updateRegisteredUserFlag({
            type: "isRegisterAsOrganization",
            flag: true,
          });
        }
        // checking if Client is registered or not
        if (
          result.result?.clientData?.clientId &&
          !localStorage.clientRegistrationInfo
        ) {
          this.props.updateRegisteredUserFlag({
            type: "isRegisterAsClient",
            flag: true,
          });
        }
        this.props.onSetClientFreelancerData("");
      } else {
        sessionStorage.removeItem("userType");
      }
    }
  }

  async componentDidMount() {
    await this.hitApiGetUser();

    if(sessionStorage.userType){
    this.props.setActiveUserType(sessionStorage.userType)
    }
  
    let {isRegisterAsClient,isRegisterAsFreelancer} =this.props.authReducer
    if (
      isRegisterAsFreelancer ||
      isRegisterAsClient
    ) {
      if (!localStorage.isSetDefaultLanguage) {
        localStorage.setItem("isSetDefaultLanguage", true);
        if (this.props.lookUpData?.country === "South Korea") {
          this.onLangaugeDataChange("korean");
        } else if (this.props.lookUpData?.country === "Japan") {
          this.onLangaugeDataChange("japanese");
        } else {
          this.onLangaugeDataChange("english");
        }
      }
    }
  }

  //#region Change Methods

  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  onToggleCollepsHandle = (isActive) => {
    const { isToggleActive } = this.state;
    this.setState({
      isToggleActive: !isToggleActive,
    });
  };

  onDropDownMenuSelectHandle = (id) => {
    let { activeDropdownColleps } = this.state;
    const { isToggleActive } = this.state;
    if (activeDropdownColleps === id) {
      this.setState({
        activeDropdownColleps: null,
      });
    } else {
      this.setState({
        activeDropdownColleps: id,
      });
    }

    if (activeDropdownColleps === id && window.innerWidth < 950) {
      this.setState({
        activeDropdownColleps: null,
        isToggleActive: !isToggleActive,
      });
    } else {
      this.setState({
        activeDropdownColleps: id,
      });
    }
  };



  handlelogout = () => {
    RemoveCrossData();
    this.props.onRemoveCrossDomainData();
    this.props.onRemoveUserData();
    this.props.setActiveUserType("")
    this.props.updateRegisteredUserFlag({type:'isRegisterAsClient',flag:false})
    this.props.updateRegisteredUserFlag({type:'isRegisterAsOrganization',flag:false})
    this.props.updateRegisteredUserFlag({type:'isRegisterAsFreelancer',flag:false})
    this.props.updateRegisteredUserFlag({type:'isRegisterAsHeadhunter',flag:false})
  };

  handleUpdateActiveUser = (value) => {
  sessionStorage.setItem("userType", value);
  this.props.setActiveUserType(value)
  this.props.history.push("/");
  };

  renderNavigationItem = () => {
    let {
      isToggleActive,
      activeDropdownColleps,
    } = this.state;
    let {activeUserType,isRegisterAsClient,isRegisterAsFreelancer,isRegisterAsOrganization,isRegisterAsHeadhunter} =this.props.authReducer
    let {
      languageType,
      language,
      activeRoute,
      location,
      onRouteChange,
      lookUpData,
    } = this.props;
    let user = this.props.myAuth;
    let userinfo;
    if (user) {
      userinfo = user["user"];
    }
    if (location && location.pathname) {
      if (activeRoute !== location.pathname) onRouteChange(location.pathname);
    }
    let {authReducer}=this.props;
     let   freelancerDetail=authReducer.freelancerAuth?authReducer.freelancerAuth:{}
     let   organizationDetail=authReducer.organizationAuth?authReducer.organizationAuth:{}
     let   clientDetail=authReducer.clientAuth?authReducer.clientAuth:{}
    return (
      <div
        className={
          isToggleActive ? "navbar-collapse active" : "collapse navbar-collapse"
        }
        id="navbarSupportedContent"
      >
        <div className="user-profile-view d-flex   p-1"></div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn">
            <i className="fa fa-search" aria-hidden="true" type="submit"></i>
          </button>
        </form>
        <ul className="navbar-nav mr-auto">
          <li
            className={
              activeDropdownColleps === 1
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown "
            }
            onClick={() => this.onDropDownMenuSelectHandle(1)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label">{languageType.PROJECT}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div
              className="dropdown-menu"
              hidden={!activeUserType}
              aria-labelledby="navDropdown"
            >
              <Link
                to="/all-projects"
                className="dropdown-item"
                onClick={() => onRouteChange("/all-projects")}
                hidden={
                  activeUserType === UserTypeConst.Client &&
                  isRegisterAsFreelancer
                }
              >
                {languageType.ALL_PROJECTS}
              </Link>
              <Link
                to="/my-contracts"
                className="dropdown-item"
                onClick={() => onRouteChange("/my-contracts")}
              >
                {languageType.MY_CONTRACTS}
              </Link>
              <Link
                to="/invitations-offers"
                className="dropdown-item"
                onClick={() => onRouteChange("/invitations-offers")}
                hidden={
                  activeUserType === UserTypeConst.Client &&
                  isRegisterAsFreelancer
                }
              >
                {languageType.INVITATIONS_OFFERS}
              </Link>
              <Link
                to="/my-proposals"
                className="dropdown-item"
                onClick={() => onRouteChange("/my-proposals")}
                hidden={activeUserType === UserTypeConst.Client}
              >
                {languageType.MY_PROPOSAL}
              </Link>
              <Link
                to="/all-my-posts"
                className="dropdown-item"
                onClick={() => onRouteChange("/all-my-posts")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.ALL_MY_POSTS}
              </Link>
              <Link
                to="/project-post"
                className="dropdown-item"
                onClick={() => onRouteChange("/project-post")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.POST_A_PROJECT}
              </Link>
              <Link
                to="/post-contest-project"
                className="dropdown-item"
                onClick={() =>
                  this.props.onRouteChange("/post-contest-project")
                }
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.DESIGN_CONTEST}
              </Link>
              <Link
                to="/interested-projects"
                className="dropdown-item"
                hidden={activeUserType === UserTypeConst.Client}
              >
                {languageType.INTERESTING_PROJECTS}
              </Link>
            </div>
          </li>
          <li
            className={
              activeDropdownColleps === 2
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(2)}
            hidden={activeUserType === UserTypeConst.Freelancer}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label"> {languageType.FREELANCER}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div
              className="dropdown-menu"
              hidden={!activeUserType}
              aria-labelledby="navDropdown2"
            >
              <Link
                to="/all-freelancer"
                className="dropdown-item"
                onClick={() => onRouteChange("/all-freelancer")}
              >
                {languageType.ALL_FREELANCERS}
              </Link>

              <Link
                to="/my-freelancers"
                className="dropdown-item"
                onClick={() => onRouteChange("/my-freelancers")}
              >
                {languageType.MY_FREELANCERS}
              </Link>
            </div>
          </li>
          <li
            className={
              activeDropdownColleps === 2
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(2)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label"> {languageType.CONTEST}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navDropdown2"
              hidden={!activeUserType}
            >
              <Link
                to="/featured-contest"
                className="dropdown-item"
                onClick={() => onRouteChange("/featured-contest")}
                hidden={activeUserType === UserTypeConst.Client}
              >
                {languageType.FEATURED_CONTESTS_TEXT}
              </Link>

              <Link
                to="/mycontest-list"
                className="dropdown-item"
                onClick={() => onRouteChange("/mycontest-list")}
              >
                {languageType.MY_CONTEST_TEXT}
              </Link>
            </div>
          </li>{" "}
          <li
            className={
              activeDropdownColleps === 12
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(12)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label"> {languageType.FULL_TIME_JOBS}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div
              className="dropdown-menu custom-drop-down"
              aria-labelledby="navDropdown2"
              hidden={!activeUserType}
            >
              <Link
                to="/job-positions-available"
                className="dropdown-item"
                onClick={() => {
                  onRouteChange("/job-positions-available");
                }}
                hidden={activeUserType === UserTypeConst.Client}
              >
                {languageType.POSITIONS_TEXT}
                {/* {languageType.ALL_FREELANCERS} */}
              </Link>
              <Link
                to="/talent-search"
                className="dropdown-item"
                onClick={() => onRouteChange("/talent-search")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.TALENT_SEARCH_TEXT}
              </Link>

              <Link
                to="/job-applications"
                className="dropdown-item"
                onClick={() => onRouteChange("/job-applications")}
                hidden={activeUserType === UserTypeConst.Client}
              >
                {languageType.MY_APPLICATIONS}
              </Link>

              <Link
                to="/my-talent"
                className="dropdown-item"
                onClick={() => onRouteChange("/my-talent")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.MY_TALENT_TEXT}
              </Link>

              <Link
                to="/profession"
                className="dropdown-item"
                onClick={() => onRouteChange("/profession")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.CREATE_NEW_OFFER}
              </Link>
              <Link
                to="/user-resume"
                className="dropdown-item"
                onClick={() => onRouteChange("/profession")}
                hidden={activeUserType === UserTypeConst.Freelancer}
              >
                {languageType.RESUME_ENTRY_HEAD}
              </Link>
            </div>
          </li>
          <li
            className={
              activeDropdownColleps === 3
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(3)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown3"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label"> {languageType.HOW_IT_WORKS}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navDropdown3">
              <Link
                to="/how-to-post-a-project"
                className="dropdown-item"
                onClick={() => onRouteChange("/how-to-post-a-project")}
              >
                {languageType.HOW_TO_POST_PROJECT}
              </Link>
              <Link
                to="/how-to-register-a-freelancer"
                className="dropdown-item"
                onClick={() => onRouteChange("/how-to-register-a-freelancer")}
              >
                {languageType.HOW_TO_REGISTER_A_FREELANCER}
              </Link>
              <Link
                to="/how-to-register-a-headhunter"
                className="dropdown-item"
                onClick={() => onRouteChange("/how-to-register-a-headhunter")}
              >
                {languageType.HOW_TO_REGISTER_A_HEADHUNTER}
              </Link>
              <Link
                to="/manager-work"
                className="dropdown-item"
                onClick={() => onRouteChange("/manager-work")}
              >
                {languageType.WORK_WITH_MANAGER}
              </Link>
              <Link
                to="/pricing"
                className="dropdown-item"
                onClick={() => onRouteChange("/pricing")}
              >
                {languageType.PRICING_TEXT}
              </Link>
              <Link
                to="/dispute-work"
                className="dropdown-item"
                onClick={() => onRouteChange("/dispute-work")}
              >
                {languageType.DISPUTEANDCLAIMS}
              </Link>
            </div>
          </li>
          {user && (
            <li
              className={
                activeDropdownColleps === 4
                  ? "nav-item dropdown active-colleps"
                  : "nav-item dropdown"
              }
              hidden={true}
              onClick={() => this.onDropDownMenuSelectHandle(4)}
            >
              <a
                className="nav-link dropdown-toggle"
                id="navDropdown4"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="link_label"> {languageType.REPORTS} </span>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <div className="dropdown-menu" aria-labelledby="navDropdown4">
                <Link
                  to={
                    activeUserType === "Client"
                      ? "/myreport_client"
                      : "/myreport_freelancer"
                  }
                  className="dropdown-item"
                  onClick={() =>
                    onRouteChange(
                      activeUserType === "Client"
                        ? "/myreport_client"
                        : "/myreport_freelancer"
                    )
                  }
                >
                  {languageType.MY_REPORTS}
                </Link>
                <Link
                  to="/payment-transactions"
                  className="dropdown-item"
                  onClick={() => onRouteChange("/payment-transactions")}
                >
                  {languageType.PAYMENT_INFO}
                </Link>
                <Link
                  to="/dispute-claims"
                  className="dropdown-item"
                  onClick={() => onRouteChange("/dispute-claims")}
                >
                  {languageType.FEEDBACK}
                </Link>
                {activeUserType === "Freelancer" && (
                  <Link
                    to="/mycoupon"
                    className="dropdown-item"
                    onClick={() => onRouteChange("/mycoupon")}
                  >
                    {languageType.MY_COUPON}
                  </Link>
                )}
              </div>
            </li>
          )}
          <li
            className={
              activeDropdownColleps === 5
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(5)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown5"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label">{languageType.SERVICES}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navDropdown5">
              <Link
                to="/"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/")}
              >
                {languageType.COMMUNICATION_MANAGER}
              </Link>
              <Link
                to="/"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/")}
              >
                {languageType.HEADHUNTING_MANAGER}
              </Link>
              <Link
                to="/help-center"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/help-center")}
              >
                {languageType.HELP_CENTER}
              </Link>
            </div>
          </li>
          <li
            className={
              activeDropdownColleps === 6
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            hidden={true}
            onClick={() => this.onDropDownMenuSelectHandle(6)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown6"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label"> {languageType.COMMUNITY}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navDropdown6">
              <Link
                to="/"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/")}
              >
                {languageType.CHANNEL}
              </Link>
              <Link
                to="/help-center"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/help-center")}
              >
                {languageType.HELP_CENTER}
              </Link>
              <Link
                to="/contact-us"
                className="dropdown-item"
                onClick={() => this.props.onRouteChange("/contact-us")}
              >
                {languageType.CONTACT_US}
              </Link>
            </div>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {user === null ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={() => this.handleLoginRegister("login")}
              >
                <span className="link_label">
                  {" "}
                  {languageType.POST_PROJECT}{" "}
                </span>
              </Link>
            </li>
          ) : (
            ""
          )}

          <li>
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => notifications.showWarning("Coming soon!")}
            >
              <span className="link_label">
                <i
                  className="fa fa-bell navigation-notification-icon"
                  aria-hidden="true"
                ></i>{" "}
                <sub className="navigation-notification-count">5</sub>
              </span>
            </a>
          </li>
          <li
            className={
              activeDropdownColleps === 7
                ? "nav-item dropdown active-colleps"
                : "nav-item dropdown"
            }
            onClick={() => this.onDropDownMenuSelectHandle(7)}
          >
            <a
              className="nav-link dropdown-toggle"
              id="navDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="link_label">{languageType.LANGAUGE}</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navDropdown">
              <span
                className={
                  language === "english"
                    ? "dropdown-item active  cursor-pointer"
                    : "dropdown-item cursor-pointer"
                }
                onClick={() => this.onLangaugeDataChange("english")}
              >
                {languageType.ENGLISH}
              </span>
              <span
                className={
                  language === "korean"
                    ? "dropdown-item active cursor-pointer"
                    : "dropdown-item cursor-pointer"
                }
                onClick={() => this.onLangaugeDataChange("korean")}
              >
                {languageType.KOREAN}
              </span>
              <span
                className={
                  language === "japanese"
                    ? "dropdown-item active cursor-pointer"
                    : "dropdown-item cursor-pointer"
                }
                onClick={() => this.onLangaugeDataChange("japanese")}
              >
                {languageType.JAPANESE}
              </span>
            </div>
          </li>
          {user === null ? (
            <li
              className={
                activeDropdownColleps === 8
                  ? "nav-item dropdown active-colleps"
                  : "nav-item dropdown"
              }
              onClick={() => this.onDropDownMenuSelectHandle(8)}
            >
              <a
                className="nav-link dropdown-toggle"
                id="navDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => this.handleLoginRegister("login")}
              >
                <span className="link_label">{languageType.LOGIN}</span>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
            </li>
          ) : (
            ""
          )}

          {user === null ? (
            <li
              className={
                activeDropdownColleps === 8
                  ? "nav-item dropdown active-colleps"
                  : "nav-item dropdown"
              }
              onClick={() => this.onDropDownMenuSelectHandle(8)}
            >
              <a
                className="nav-link dropdown-toggle"
                id="navDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => this.handleLoginRegister("register")}
              >
                <span className="link_label">{languageType.REGISTER_TEXT}</span>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
            </li>
          ) : (
            ""
          )}
          {user ? (
            <li
              className={` ${
                activeDropdownColleps === 5
                  ? "nav-item dropdown active-colleps "
                  : "nav-item dropdown "
              } d-lg-block `}
              onClick={() => this.onDropDownMenuSelectHandle(5)}
            >
              <a
                className="nav-link dropdown-toggle  "
                id="navDropdown5"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="profile-picture-area-nav">
                  <img
                    src={userinfo ? userinfo.profileImage : ""}
                    alt={"img"}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "20px",
                      marginRight: "20px",
                    }}
                  />
                  <div title="active" className="online"></div>
                </div>
                <span className="link_label">
                  {userinfo ? userinfo.profileName : ""}{" "}
                  <div
                    hidden={!isRegisterAsClient && !isRegisterAsFreelancer}
                    className="freelancer-avatar"
                  >
                    {isRegisterAsClient && activeUserType === "Client" && (
                      <BootstrapTooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        arrow
                        placement="bottom-end"
                        title={"You are logged in as Client"}
                      >
                        <div className="client"> C</div>
                      </BootstrapTooltip>
                    )}
                    {isRegisterAsFreelancer && activeUserType === "Freelancer" && (
                      <BootstrapTooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        arrow
                        placement="bottom-end"
                        title={"You are logged in as Freelancer"}
                      >
                        <div className="freelancer"> F</div>
                      </BootstrapTooltip>
                    )}
                    {isRegisterAsFreelancer && activeUserType === "headhunter" && (
                       <BootstrapTooltip
                       PopperProps={{
                         disablePortal: true,
                       }}
                       arrow
                       placement="bottom-end"
                       title={"You are logged in as headhunter"}
                     >
                      <div className="headhunter"> H</div>
                      </BootstrapTooltip>
                    )}
                      {isRegisterAsOrganization && activeUserType === "Organization" && (    <BootstrapTooltip
                       PopperProps={{
                         disablePortal: true,
                       }}
                       arrow
                       placement="bottom-end"
                       title={"You are logged in as Organization"}
                     >
                      <div className="headhunter"> O</div></BootstrapTooltip>
                    )}
                  </div>
                </span>
                <i className="fa fa-angle-down" aria-hidden="true" />
              </a>
              <div className="dropdown-menu" aria-labelledby="navDropdown5">
               
                {isRegisterAsFreelancer &&
                activeUserType === "Freelancer" ? (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (
                          freelancerDetail?.individualFreelancerId
                        ) {
                          this.props.history.push(
                            `/freelancer-profile/${freelancerDetail.individualFreelancerId}`
                          );
                        }
                      }}
                    >
                      {languageType.MY_INFO_TEXT}
                    </div>
                  </div>
                ) : null}

                   {isRegisterAsOrganization &&
                  activeUserType === "Organization" ? (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (
                          organizationDetail?.organizationId
                        ) {
                          this.props.history.push(
                            `/organization-profile/${organizationDetail.organizationId}`
                          );
                        }
                      }}
                    >
                      {languageType.MY_INFO_TEXT}
                    </div>
                  </div>
                ) : null}

                {isRegisterAsClient &&
                activeUserType === "Client" ? (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (clientDetail?.clientId) {
                          this.props.history.push(
                            `/client-profile/${clientDetail?.clientId}`
                          );
                        }
                      }}
                    >
                      {languageType.MY_INFO_TEXT}
                    </div>
                  </div>
                ) : null}

                {isRegisterAsFreelancer ? (
                  activeUserType === "Client" ||   activeUserType === "Organization" || !activeUserType? (
                    <div className="dropdown-item cursor-pointer dropdown-item-switch">
                      <div
                        onClick={() => {
                          this.handleUpdateActiveUser("Freelancer");
                        }}
                      >
                        {languageType.GO_TO_FREELANCER}
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (this.state.pendingFreelancer) {
                          this.props.history.push("/create-freelancer");
                        } else {
                          this.props.history.push("/user-registration?type=IndividualFreelancer");
                        }
                      }}
                    >
                      {languageType.JOIN_FREELANCER}
                    </div>
                  </div>
                )}

                  {isRegisterAsOrganization ? (
                  activeUserType === "Client" ||   activeUserType === "Freelancer" || !activeUserType? (
                    <div className="dropdown-item cursor-pointer dropdown-item-switch">
                      <div
                        onClick={() => {
                          this.handleUpdateActiveUser("Organization");
                        }}
                      >
                       Continue as a Organization
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (this.state.pendingFreelancer) {
                          this.props.history.push("/organization-registration");
                        } else {
                          this.props.history.push("/user-registration?type=Organization");
                        }
                      }}
                    >
                      Register as a organization
                    </div>
                  </div>
                )}


                {isRegisterAsClient ? (
                  activeUserType === "Freelancer" ||
                  activeUserType === "Organization" || !activeUserType ? (
                    <div className="dropdown-item cursor-pointer dropdown-item-switch">
                      <div
                        onClick={() => {
                          this.handleUpdateActiveUser("Client");
                        }}
                      >
                        {languageType.CONTINUE_AS_CLIENT}
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        this.props.history.push("/client-registration");
                      }}
                    >
                      {languageType.JOIN_CLIENT}
                    </div>
                  </div>
                )}

                <div className="dropdown-item cursor-pointer dropdown-item-switch">
                  <div
                    onClick={() => {
                      this.props.history.push("/register-headhunter");
                    }}
                  >
                    {languageType.CREATE_A_HEAD_HUNTER_ACCOUNT}
                  </div>
                </div>

                {isRegisterAsOrganization && (
                  <div className="dropdown-item cursor-pointer dropdown-item-switch">
                    <div
                      onClick={() => {
                        if (
                          organizationDetail?.organizationId
                        ) {
                          this.props.history.push(`/company-dashboard`);
                        }
                      }}
                    >
                      Organization admin
                    </div>
                  </div>
                )}
                {this.props.userState?.user &&
                  Object.keys(this.props.userState.user)?.length &&
                  isValidString(this.props.mandatoryFeild) &&
                  !isValidString(this.props.userState?.user?.organizationId) &&
                  (activeUserType === "Freelancer" ||
                    activeUserType === "Company" ||
                    activeUserType === "Client") && (
                    <Link
                      className="dropdown-item"
                      to={
                        activeUserType === "Client"
                          ? "/client-settings"
                          : "/profile"
                      }
                      onClick={() =>
                        onRouteChange(
                          activeUserType === "Client"
                            ? "/client-settings"
                            : "/profile"
                        )
                      }
                    >
                      <span className="link_label">
                        {" "}
                        {languageType.VIEW_PROFILE}
                      </span>
                    </Link>
                  )}
                {this.props.userState?.user &&
                  isValidString(this.props.userState?.user?.organizationId) &&
                  (activeUserType === "Freelancer" ||
                    activeUserType === "Company") && (
                    <Link
                      className="dropdown-item"
                      to={`/organization-profile/${this.props.userState?.user?.organizationId}`}
                      onClick={() =>
                        onRouteChange(
                          `/organization-profile/${this.props.userState?.user?.organizationId}`
                        )
                      }
                    >
                      <span className="link_label">
                        {" "}
                        {languageType.VIEW_PROFILE}
                      </span>
                    </Link>
                  )}
                {user && (
                  <>
                    <Link
                      to={
                        activeUserType === "Client"
                          ? "/myreport_client"
                          : "/myreport_freelancer"
                      }
                      className="dropdown-item"
                      onClick={() =>
                        onRouteChange(
                          activeUserType === "Client"
                            ? "/myreport_client"
                            : "/myreport_freelancer"
                        )
                      }
                    >
                      {languageType.MY_REPORTS}
                    </Link>
                    <Link
                      to="/payment-transactions"
                      className="dropdown-item"
                      onClick={() => onRouteChange("/payment-transactions")}
                    >
                      {languageType.PAYMENT_INFO}
                    </Link>
                    <Link
                      to="/dispute-claims"
                      className="dropdown-item"
                      onClick={() => onRouteChange("/dispute-claims")}
                    >
                      {languageType.DISPUTEANDCLAIMS}
                    </Link>
                    {activeUserType === "Freelancer" && (
                      <Link
                        to="/mycoupon"
                        className="dropdown-item"
                        onClick={() => onRouteChange("/mycoupon")}
                      >
                        {languageType.MY_COUPON}
                      </Link>
                    )}
                  </>
                )}
                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={() => this.props.onRouteChange("/")}
                >
                  {languageType.CHANNEL}
                </Link>

                <Link
                  to="/contact-us"
                  className="dropdown-item"
                  onClick={() => this.props.onRouteChange("/contact-us")}
                >
                  {languageType.CONTACT_US}
                </Link>
                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={this.handlelogout}
                >
                  {languageType.LOGOUT}
                </Link>
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  };

  handleLoginRegister = (type) => {
    let redirectURl = window.location.href.replace("start-with", "");
    if (type === "login") {
      window.location.href = `https://www.syncbench.com/#/sign-in?callback=${redirectURl}&storeid=HOQF9I`;
    } else {
      window.location.href = `https://www.syncbench.com/#/sign-up?callback=${redirectURl}&storeid=HOQF9I`;
    }
  };

  // https://www.syncbenchf.com/#/
  // http://localhost:8080/#/

  render() {
    let { isToggleActive } = this.state;
    let { activeRoute, location, onRouteChange, authReducer } = this.props;
    let user = this.props.myAuth;
    let userinfo;
    if (user) {
      userinfo = user["user"];
    }
    if (location && location.pathname) {
      if (activeRoute !== location.pathname) onRouteChange(location.pathname);
    }
    return (
      <>
        <header className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link
              to="/"
              className="navbar-brand"
              onClick={() => onRouteChange("/")}
            >
              <img
                className="nav-logo "
                //src="https://dhihitu47nqhv.cloudfront.net/icons/bearolewhite.png"
                src="https://dhihitu47nqhv.cloudfront.net/icons/bearolewhite.png"
                alt=""
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => this.onToggleCollepsHandle()}
            >
              {/* <span className="navbar-toggler-icon">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </span> */}

              <div
                className={
                  isToggleActive ? "hamburger-menu active" : "hamburger-menu"
                }
                id="hamburger-menu"
              >
                <div className="hamburger"></div>
              </div>
            </button>

            <ul
              className={isToggleActive ? "nav-menu active" : "nav-menu"}
              id="nav-menu"
            >
              {this.renderNavigationItem()}
            </ul>

            {!isToggleActive && this.renderNavigationItem()}
          </nav>
        </header>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    myAuth: state.authReducer.myAuth,
    userState: state.userReducer,
    mandatoryFeild: state.userReducer?.user?.professionalField,
    userType: state.userReducer?.user?.userType,
    lookUpData: state.lookUp.lookUpData,
    authReducer: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onRemoveCrossDomainData: () => {
      dispatch(onRemoveCrossDomainData());
    },
    onGetUserDataSuccess: (data) => {
      dispatch(onGetUserDataSuccess(data));
    },
    onGetUserDataError: (data) => {
      dispatch(onGetUserDataError(data));
    },
    onRemoveUserData: () => {
      dispatch(onRemoveUserData());
    },
    onGetUserDataLoading: () => {
      dispatch(onGetUserDataLoading());
    },
    setActiveUserType: (type) => {
      dispatch(setActiveUserType(type));
    },
    updateRegisteredUserFlag: (data) => {
      dispatch(updateRegisteredUserFlag(data));
    },
    getOrganization: (id) => {
      dispatch(getOrganization(id));
    },
    onSetClientFreelancerData: (data) => {
      dispatch(onSetClientFreelancerData(data));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(NavigationBar)
);

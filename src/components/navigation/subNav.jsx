import React, { Component } from "react";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
} from "../../store/action/action";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";
import { isValidString } from "../../utils/validationConfig";

const imageUrl = "https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/";

class SubNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProject:
        new URLSearchParams(this.props.location.search).get("searchProject") ===
        null
          ? ""
          : new URLSearchParams(this.props.location.search).get(
              "searchProject"
            ),
      selectedCategory:
        new URLSearchParams(this.props.location.search).get("category") === null
          ? ""
          : new URLSearchParams(this.props.location.search).get("category"),
      projectCategories: [],
      pageTitle: "Client",
      designIcon: "DesignBlack.svg",
      webIcon: "WebBlack.svg",
      accountingIcon: "LawBlack.svg",
      marketingBlackIcon: "marketingBlack.svg",
      videoPhotIcon: "VideoGoodBlack.svg",
      engineeringIcon: "compassBlack.svg",
      translationIcon: "TranslationBlack.svg",
      planingIcon: "WritingBlack.svg",
      realestateIcon: "realestateblack.svg",
      adminIcon: "ClipBlack.svg",
      internationalTradeIcon: "InternationalTradeBlack.svg",
      customerServiceIcon: "headsetBlack.svg",
      teachingIcon: "onlineTeachingBlack.svg",
      highBudgetIcon: "BudgetWhite.svg",
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);
    this.bindProjectCategories();
  }

  //#region Bind Contest Categories
  async bindProjectCategories() {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=ProjectScopes`,
      getOptions({})
    );
    /*   console.log("result",result) */
    if (result && result.result && result.result.data) {
      for (let index = 0; index < result.result.data[0].data.length; index++) {
        const element = result.result.data[0].data[index];
        array.push({
          text: element.name,
          value: element.name.toString(),
        });
      }
      this.setState({ projectCategories: array });
    }
  }
  //#endregion Bind Contest Categories

  //#region LangaugeData/Icon Change Method
  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  onIconChange(name, icon) {
    this.setState({ [name]: icon });
  }
  //#endregion LangaugeData/Icon Change Method

  userData = JSON.parse(localStorage.getItem("MY_AUTH"));

  //#region Get/Set Page Title Method
  getPageTitle = () => {
    let { languageType, activeRoute } = this.props;
    let pageTitle = "Client";
    if (activeRoute) {
      if (activeRoute === "/client-detail") {
        pageTitle = languageType.CLIENT_INFO;
      } else if (activeRoute === "/confirm-project") {
        pageTitle = languageType.CONFIRM_PROJECT;
      } else if (activeRoute === "/mycontest") {
        pageTitle = languageType.MY_CONTEST;
      } else if (activeRoute === "/mycoupon") {
        pageTitle = languageType.MY_COUPON;
      } else if (activeRoute === "/my-contracts") {
        pageTitle = languageType.MY_PROJECT;
      } else if (activeRoute === "/my-proposals") {
        pageTitle = languageType.MY_PROPOSAL;
      } else if (activeRoute === "/my-offers") {
        pageTitle = languageType.MY_OFFERS;
      } else if (activeRoute === "/offer-detail") {
        pageTitle = languageType.OFFER_DETAIL;
      } else if (activeRoute === "/my-freelancers") {
        pageTitle = languageType.MY_FREELANCERS;
      } else if (activeRoute === "/package-design") {
        pageTitle = languageType.PACKAGE_DESIGN;
      } else if (activeRoute === "/package-design-detail") {
        pageTitle = languageType.PACKAGE_DESIGN_DETAIL;
      } else if (activeRoute === "/all-projects") {
        pageTitle = languageType.ALL_PROJECTS;
      } else if (activeRoute === "/invitations-offers") {
        pageTitle = languageType.INVITATIONS_OFFERS;
      } else if (activeRoute === "/invitations-offers") {
        pageTitle = languageType.HIRE;
      } else if (activeRoute === "/hire") {
        pageTitle = languageType.ALL_PACKAGES;
      } else if (activeRoute === "/all-freelancer") {
        pageTitle = languageType.ALL_FREELANCERS;
      } else if (activeRoute === "/project-blog") {
        pageTitle = languageType.PROJECT_BLOG;
      } else if (activeRoute === "/profession") {
        pageTitle = languageType.PROFESSION_TEXT;
      } else if (activeRoute === "/project-post") {
        pageTitle = languageType.POST_NEW_PROJECT;
      } else if (activeRoute === "/project-post-hourly") {
        pageTitle = languageType.POST_A_PROJECT_HOURLY;
      } else if (activeRoute === "/project-post-milestone") {
        pageTitle = languageType.POST_A_PROJECT_MILESTONE;
      } else if (activeRoute === "/project-post-office") {
        pageTitle = languageType.POST_A_PROJECT_INOFFICE;
      } else if (activeRoute === "/project-post-proposal") {
        pageTitle = languageType.POST_A_PROJECT_PROPOSAL;
      } else if (activeRoute === "/project-proposal-detail") {
        pageTitle = languageType.PROJECT_PROPOSAL_DETAIL;
      } else if (activeRoute === "/hire-freelancer") {
        pageTitle = languageType.HIRE_FREELANCER;
      } else if (activeRoute === "/user-registration") {
        pageTitle = languageType.USER_REGISTRATION;
      } else if (activeRoute === "/organization-registration") {
        pageTitle = languageType.ORGANIZATION_REGISTRATION;
      } else if (activeRoute === "/report-main") {
        pageTitle = languageType.REPORTS;
      } else if (activeRoute === "/report") {
        pageTitle = languageType.REPORTS;
      } else if (activeRoute === "/dispute-main") {
        pageTitle = languageType.DISPUTE;
      } else if (activeRoute === "/freelancer-registration") {
        pageTitle = languageType.FREELANCER_REGISTRATION;
      } else if (activeRoute === "/contest-detail") {
        pageTitle = languageType.CONTEST_DETAIL;
      } else if (activeRoute === "/contest-design") {
        pageTitle = languageType.CONTEST_DESIGN;
      } else if (activeRoute === "/contract-detail") {
        pageTitle = languageType.HOURLY_REPORT;
      } else if (activeRoute === "/milestone-report") {
        pageTitle = languageType.MILESTONE_REPORT;
      } else if (activeRoute === "/work-detail") {
        pageTitle = languageType.WORK_DETAIL;
      } else if (activeRoute === "/contract-detail") {
        pageTitle = languageType.HOURLY_REPORT;
      } else if (activeRoute === "/project-detail-for-freelancer") {
        pageTitle = languageType.PROJECT_DETAIL;
      } else if (activeRoute === "/project-detail-for-client") {
        pageTitle = languageType.PROJECT_DETAIL;
      } else if (activeRoute === "/invoice") {
        pageTitle = languageType.INVOICE;
      } else if (activeRoute === "/dispute-claims") {
        pageTitle = languageType.FEEDBACK;
      } else if (activeRoute === "/myregion") {
        pageTitle = languageType.MY_REGION;
      } else if (activeRoute === "/help-center") {
        pageTitle = languageType.HELP_CENTER;
      } else if (activeRoute === "/help-detail") {
        pageTitle = languageType.HELP_DETAIL;
      } else if (activeRoute === "/evaluation") {
        pageTitle = languageType.EVALUATION;
      } else if (activeRoute === "/invoiceDetail") {
        pageTitle = languageType.INVOICE_DETAIL;
      } else if (activeRoute === "/preferred-design") {
        pageTitle = languageType.PREFERRED_DESIGN;
      } else if (activeRoute === "/contact-us") {
        pageTitle = "Contact Us";
      } else if (activeRoute === "/create-freelancer") {
        pageTitle = languageType.CREATE_FREELANCER;
      } else if (activeRoute === "/register-headhunter") {
        pageTitle = languageType.HEADHUNTER_REGISTRATION;
      } else if (activeRoute === "/freelancer-profile") {
        pageTitle = languageType.FREELANCER_PROFILE;
      } else if (activeRoute === "/client-registration") {
        pageTitle = languageType.CLIENT_REGISTRATION;
      } else if (activeRoute === "/client-settings") {
        pageTitle = languageType.CLIENT_SETTINGS;
      } else if (activeRoute === "/my-disputes") {
        pageTitle = languageType.MY_DISPUTES;
      } else if (activeRoute === "/admin") {
        pageTitle = languageType.DASHBOARD;
      } else if (activeRoute.includes("edit-freelancer")) {
        pageTitle = languageType.EDIT_FREELANCER;
      } else if (activeRoute === "/project-detail-for-client") {
        pageTitle = "Project";
      } else if (activeRoute.includes("/organization-profile")) {
        if (this.props.userState?.user?.userType === "Company") {
          pageTitle = languageType.VIEW_ORGANIZATION_COMPANY;
        } else {
          pageTitle = languageType.VIEW_ORGANIZATION_AGENCY;
        }
      } else if (activeRoute.includes("/edit-organization-registration")) {
        if (this.props.userState?.user?.userType === "Company") {
          pageTitle = languageType.EDIT_ORGANIZATION_COMPANY;
        } else {
          pageTitle = languageType.EDIT_ORGANIZATION_AGENCY;
        }
      } else {
        pageTitle = "Home";
      }
    }

    return pageTitle;
  };

  getSubTitle() {
    let { languageType, activeRoute } = this.props;
    let subTitle = "Client";
    if (activeRoute) {
      if (activeRoute === "/client-detail") {
        subTitle = languageType.CLIENT_INFO;
      } else if (activeRoute === "/confirm-project") {
        subTitle = languageType.CONFIRM_PROJECT;
      } else if (activeRoute === "/mycontest") {
        subTitle = "My Contest";
      } else if (activeRoute === "/mycoupon") {
        subTitle = "My Coupon";
      } else if (activeRoute === "/my-contracts") {
        subTitle = "My Contracts";
      } else if (activeRoute === "/my-proposals") {
        subTitle = "My Proposals";
      } else if (activeRoute === "/my-offers") {
        subTitle = "My Offers";
      } else if (activeRoute === "/offer-detail") {
        subTitle = "Offer Detail";
      } else if (activeRoute === "/my-freelancers") {
        subTitle = languageType.MY_FREELANCERS;
      } else if (activeRoute === "/package-design") {
        subTitle = "Package Design : Logo, Illustration, Packaging, Video Clip";
      } else if (activeRoute === "/package-design-detail") {
        subTitle = languageType.PACKAGE_DESIGN_DETAIL;
      } else if (activeRoute === "/all-projects") {
        subTitle = languageType.ALL_PROJECTS_SUB;
      } else if (activeRoute === "/all-packages") {
        subTitle = languageType.ALL_PACKAGES;
      } else if (activeRoute === "/all-freelancer") {
        subTitle = "Find the most suitable project type";
      } else if (activeRoute === "/project blog") {
        subTitle = "Contest Blog";
      } else if (activeRoute === "/profession") {
        subTitle = "Profession";
      } else if (activeRoute === "/project-post") {
        subTitle = "Project Post";
      } else if (activeRoute === "/project-post-hourly") {
        subTitle = "Contest Post Hourly";
      } else if (activeRoute === "/project-post-milestone") {
        subTitle = "Contest Post Milestone";
      } else if (activeRoute === "/project-post-office") {
        subTitle = "Contest Post InOffice";
      } else if (activeRoute === "/project-post-proposal") {
        subTitle = "Contest Post Proposal";
      } else if (activeRoute === "/project-proposal-detail") {
        subTitle = "Contest Proposal Detail";
      } else if (activeRoute === "/project-post-hourly") {
        subTitle = "Contest Post Hourly";
      } else if (activeRoute === "/hire-freelancer") {
        subTitle = "Hire Freelancer";
      } else if (activeRoute === "/user-registration") {
        subTitle = "User Registration";
      } else if (activeRoute === "/organization-registration") {
        subTitle = "Register your company on Bearole";
      } else if (activeRoute === "/report") {
        subTitle = "Report";
      } else if (activeRoute === "/dispute-main") {
        subTitle = "Dispute";
      } else if (activeRoute === "/freelancer-registration") {
        subTitle = "Freelancer Registration";
      } else if (activeRoute === "/contest-detail") {
        subTitle = "Contest Detail";
      } else if (activeRoute === "/contest-design") {
        subTitle = "Post Contest Design";
      } else if (activeRoute === "/hourly-report") {
        subTitle = languageType.HOURLY_REPORT;
      } else if (activeRoute === "/milestone-report") {
        subTitle = languageType.MILESTONE_REPORT;
      } else if (activeRoute === "/work-detail") {
        subTitle = "Work Detail";
      } else if (activeRoute === "/hourly-report") {
        subTitle = "Hourly Report";
      } else if (activeRoute === "/project-detail-for-freelancer") {
        subTitle = languageType.PROJECT_DETAIL;
      } else if (activeRoute === "/project-detail-for-client") {
        subTitle = languageType.PROJECT_DETAIL;
      } else if (activeRoute === "/invoice") {
        subTitle = "Invoice";
      } else if (activeRoute === "/myregion") {
        subTitle = "My Region";
      } else if (activeRoute === "/dispute-claims") {
        subTitle = languageType.FEEDBACK;
      } else if (activeRoute === "/help-center") {
        subTitle = "Help Center";
      } else if (activeRoute === "/help-detail") {
        subTitle = "Help Detail";
      } else if (activeRoute === "/evaluation") {
        subTitle = "Evaluation";
      } else if (activeRoute === "/invoiceDetail") {
        subTitle = "Invoice Detail";
      } else if (activeRoute === "/preferred-design") {
        subTitle = "Preferred Design";
      } else if (activeRoute === "/contact-us") {
        subTitle = "Contact Us";
      } else if (activeRoute === "/create-freelancer") {
        subTitle = languageType.CREATE_FREELANCER;
      } else if (activeRoute === "/register-headhunter") {
        subTitle = languageType.CREATE_A_HEAD_HUNTER_ACCOUNT;
      } else if (activeRoute === "/freelancer-profile") {
        subTitle = languageType.FREELANCER_PROFILE;
      } else if (activeRoute === "/client-registration") {
        subTitle = languageType.CLIENT_REGISTRATION;
      } else if (activeRoute === "/client-settings") {
        subTitle = languageType.CLIENT_SETTINGS;
      } else if (activeRoute === "/my-disputes") {
        subTitle = languageType.MY_DISPUTES;
      } else if (activeRoute.includes("edit-freelancer")) {
        subTitle = languageType.EDIT_FREELANCER;
      } else if (activeRoute === "/project-detail-for-client") {
        subTitle = "Project";
      } else if (activeRoute === "/admin") {
        subTitle =
          languageType.HELLO +
          ", " +
          (!this.userData ? "Admin" : this.userData.user.profileName);
      } else if (
        activeRoute.includes("/organization-profile") ||
        activeRoute.includes("/edit-organization-registration")
      ) {
        subTitle = this.props?.organizationState?.companyName;
      } else {
        subTitle = "Home";
      }
    }

    return subTitle;
  }
  //#endregion Get/Set Page Title Method

  //#region AllProject/my-contracts Page Filter Method
  onSearchProject = () => {
    let projectTypes = new URLSearchParams(this.props.location.search).get(
      "type"
    );
    let projectTypeArray = isValidString(projectTypes)
      ? projectTypes.split(",")
      : [];

    let projectStatuses = new URLSearchParams(this.props.location.search).get(
      "status"
    );
    let projectStatusArray = isValidString(projectStatuses)
      ? projectStatuses.split(",")
      : [];

    let selectedProjectType =
      projectTypeArray.length > 0 ? projectTypeArray.join() : "";
    let selectedProjectStatus =
      projectStatusArray.length > 0 ? projectStatusArray.join() : "";

    let redirectTo = "";
    if (this.state.searchProject !== "")
      redirectTo += "?searchProject=" + this.state.searchProject;
    if (this.state.selectedCategory !== "")
      redirectTo +=
        (redirectTo !== "" ? "&category=" : "?category=") +
        this.state.selectedCategory;
    if (selectedProjectType !== "")
      redirectTo +=
        (redirectTo !== "" ? "&type=" : "?type=") + selectedProjectType;
    if (selectedProjectStatus !== "")
      redirectTo +=
        (redirectTo !== "" ? "&status=" : "?status=") + selectedProjectStatus;

    redirectTo += redirectTo === "" ? this.props.location.pathname : "";

    this.props.history.push(redirectTo);
  };
  //#endregion AllProject/my-contracts Page Filter Method

  render() {
    /*    console.log(this.state.projectCategories) */
    let { languageType, language } = this.props;
    let {
      designIcon,
      highBudgetIcon,
      webIcon,
      accountingIcon,
      marketingBlackIcon,
      videoPhotIcon,
      engineeringIcon,
      translationIcon,
      planingIcon,
      realestateIcon,
      adminIcon,
      internationalTradeIcon,
      customerServiceIcon,
      teachingIcon,
      projectCategories,
    } = this.state;

    let pageTitle = this.getPageTitle();
    let subTitle = this.getSubTitle();

    let isDisplayProjectNavMenu = false;
    if (
      pageTitle === languageType.ALL_PROJECTS ||
      pageTitle === languageType.MY_PROJECT ||
      pageTitle === languageType.MY_PROPOSAL
    )
      isDisplayProjectNavMenu = true;

    return (
      <>
        <div className="back_end">
          <div className="bcknd_container">
            <div className="project_head">
              <h1 className={language === "korean" ? "korean" : ""}>
                {pageTitle}
              </h1>
              <h4 className={language === "korean" ? "korean" : ""}>
                {subTitle}
              </h4>
            </div>
            <nav
              className={`navbar navbar-expand-lg category_nav ${
                isDisplayProjectNavMenu
                  ? "visibility-visible"
                  : "visibility-hidden"
              }`}
            >
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupported"
                aria-controls="navbarSupported"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupported">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown product_search dropdown-toggle">
                    <a
                      className="nav-link"
                      id="navbarDropdown2"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="link_label">
                        {languageType.PROJECT_SEARCH}
                      </span>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown2"
                    >
                      <li className="nav-item dropdown">
                        <a className="nav-link">
                          {" "}
                          {/* <span><img src={imageUrl + highBudgetIcon} alt="" /></span> */}{" "}
                          {languageType.HIGH_BUDGET}
                        </a>
                      </li>
                      <li>
                        <a>
                          {/* <span> <img src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/lowBudgetBlack.svg" alt="" /> </span> */}{" "}
                          {languageType.LOW_BUDGET}{" "}
                        </a>
                      </li>
                      <li>
                        <a>
                          {/* <span><img src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/CountdownBlack.svg" alt="" /></span> */}
                          {languageType.END_SOON}
                        </a>
                      </li>
                      <li>
                        <Link to="/myregion">
                          {/* <span><img src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/CountdownBlack.svg" alt="" /></span> */}
                          {languageType.JOBS_NEARBY}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown product_search dropdown-toggle">
                    <a
                      className="nav-link"
                      id="navbarDropdownCategory"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="link_label">
                        {projectCategories.filter((x) => {
                          return x.value === this.state.selectedCategory;
                        }).length > 0
                          ? projectCategories.filter((x) => {
                              return x.value === this.state.selectedCategory;
                            })[0].text
                          : languageType.CATEGORY_TEXT}
                      </span>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownCategory"
                    >
                      <li key={`category`}>
                        <a
                          className="nav-link"
                          onClick={() => {
                            this.state.selectedCategory = "";
                            this.onSearchProject();
                          }}
                        >
                          {languageType.CATEGORY_TEXT}
                        </a>
                      </li>
                      {projectCategories &&
                        projectCategories.length > 0 &&
                        projectCategories.map((category, i) => (
                          <li key={`category${i}`}>
                            <a
                              className="nav-link"
                              onClick={() => {
                                this.state.selectedCategory = category.value;
                                this.onSearchProject();
                              }}
                            >
                              {category.text}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
                <form className="form-inline">
                  <input
                    className="form-control"
                    type="search"
                    placeholder=" Search Project"
                    aria-label="Search"
                    value={this.state.searchProject}
                    onChange={(e) => {
                      this.setState({ searchProject: e.target.value });
                    }}
                  />
                  <button
                    onClick={() => this.onSearchProject()}
                    className="btn blue_btn"
                    type="button"
                  >
                    View
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

// export default SubNav;
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
    userState: state.userReducer,
    organizationState: state.organizationReducer.organization,
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
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchProps)(SubNav));

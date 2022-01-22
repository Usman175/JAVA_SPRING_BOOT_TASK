import React, { Component } from "react";
import { Link } from "react-router-dom";
import { onReduxLangaugeChange } from "../../store/action/action";
import { connect } from "react-redux";
import { Carousel } from "@trendyol-js/react-carousel";

import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";
import SearchBar from "./searchBar";
const imageUrl = "https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/";
const matchingScop = [
  {
    name: "designIcon",
    icon: "DesignBlack.svg",
  },
  {
    name: "webIcon",
    icon: "WebBlack.svg",
  },
  {
    name: "LawBlack",
    icon: "LawBlack.svg",
  },
  {
    name: "marketingBlackIcon",
    icon: "marketingBlack.svg",
  },
  {
    name: "videoPhotIcon",
    icon: "VideoGoodBlack.svg",
  },
  {
    name: "engineeringIcon",
    icon: "compassBlack.svg",
  },
  {
    name: "marketingBlackIcon",
    icon: "marketingBlack.svg",
  },
  {
    name: "translationIcon",
    icon: "TranslationBlack.svg",
  },
  {
    name: "planingIcon",
    icon: "WritingBlack.svg",
  },
  {
    name: "teachingIcon",
    icon: "onlineTeachingBlack.svg",
  },
  {
    name: "realestateIcon",
    icon: "realestateblack.svg",
  },
  {
    name: "adminIcon",
    icon: "ClipBlack.svg",
  },
  {
    name: "customerServiceIcon",
    icon: "headsetBlack.svg",
  },
  {
    name: "internationalTradeIcon",
    icon: "InternationalTradeBlack.svg",
  },
];
class BearoleIconBar extends Component {
  constructor(props) {
    super(props);
    let { languageType } = this.props;
    this.state = {
      projectCategories: [],
      designIcon: "DesignBlack.svg",
      designRedirect: "/all-projects?category=" + languageType.DESIGN_TEXT,
      webIcon: "WebBlack.svg",
      webRedirect: "/all-projects?category=" + languageType.WEB_DEVELOPMENT,
      accountingIcon: "LawBlack.svg",
      accountingRedirect:
        "/all-projects?category=" + languageType.ACCOUNTING_TEXT,
      marketingBlackIcon: "marketingBlack.svg",
      marketingBlackRedirect:
        "/all-projects?category=" + languageType.MARKETING_TEXT,
      videoPhotIcon: "VideoGoodBlack.svg",
      videoPhotRedirect: "/all-projects?category=" + languageType.PHOTO_VIDEO,
      engineeringIcon: "compassBlack.svg",
      engineeringRedirect:
        "/all-projects?category=" + languageType.ENGINEERING_TEXT,
      translationIcon: "TranslationBlack.svg",
      translationRedirect: "/all-projects?category=" + languageType.TRANSLATION,
      planingIcon: "WritingBlack.svg",
      planingRedirect: "/all-projects?category=" + languageType.PLANNING,
      realestateIcon: "realestateblack.svg",
      realestateRedirect: "/all-projects?category=" + languageType.REAL_ESTATE,
      // legalAssistantRedirect: "/all-projects?category=" + languageType.REAL_ESTATE,
      adminIcon: "ClipBlack.svg",
      adminRedirect: "/all-projects?category=" + languageType.ADMIN,
      internationalTradeIcon: "InternationalTradeBlack.svg",
      internationalTradeRedirect:
        "/all-projects?category=" + languageType.INTERNATIONAL_TRADE,
      customerServiceIcon: "headsetBlack.svg",
      customerServiceRedirect:
        "/all-projects?category=" + languageType.CUSTOMER_SERVICE,
      teachingIcon: "onlineTeachingBlack.svg",
      teachingRedirect: "/all-projects?category=" + languageType.TEACHING_TEXT,
      selectedProjectScope: null,
      selectedSubScop: [],
      isActiveSub: false,
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
    // this.bindProjectCategories();
  }

  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  onIconChange(name, icon) {
    this.setState({ [name]: icon });
    let filterScope = matchingScop.filter((item) => item.name != name);
    filterScope.forEach((element) => {
      this.setState({ [element.name]: element.icon });
    });
  }

  async handleMenuItemMouseEnter(projectScopeKey) {
    let selectedProjectScope = this.props.projectScopes.find(
      (n) => n.value === projectScopeKey
    );

    this.setState({
      selectedSubScop: [],
      selectedProjectScope: selectedProjectScope,
    });
  }

  handleMenuItemMouseLeave() {
    this.setState({
      selectedProjectScope: null,
      isActiveSub: false,
    });
    // setTimeout(()=>{
    //   this.setState({
    //     selectedProjectScope: null,isActiveSub:false
    //   });
    // },800)
  }

  renderProjectSubScopes() {
    return (
      this.state.selectedProjectScope && (
        <ul className="row list-unstyled pt-2 custom-list">
          {this.state.selectedProjectScope.subScopes.map((subScope, key) => (
            <li key={key} className="checkboxes-subscope-search">
              <input
                onChange={(e) => {
                  let value = e.target.name;
                  if (this.state.selectedSubScop.includes(value)) {
                    if (value === "All") {
                      this.setState({ selectedSubScop: [] });
                    } else {
                      let newValue = this.state.selectedSubScop.filter(
                        (item) => item != value
                      );
                      this.setState({ selectedSubScop: newValue });
                    }
                  } else {
                    if (e.target.name === "All") {
                      this.setState({
                        selectedSubScop:
                          this.state.selectedProjectScope.subScopes.map(
                            (item) => item.text
                          ),
                      });
                    } else {
                      this.setState((pre) => ({
                        selectedSubScop: [...pre.selectedSubScop, value],
                      }));
                    }
                  }
                }}
                checked={
                  this.state.selectedSubScop.includes(subScope.text)
                    ? true
                    : false
                }
                type="checkbox"
                name={subScope.text}
              />{" "}
              <Link to="#" className="link text-light">
                {subScope.text}
              </Link>
            </li>
          ))}
          <li className="checkboxes-subscope-search">
            {" "}
            <button className="subScopeSearchButton bg-light text-dark">
              {this.props.languageType.SEARCH}
            </button>
          </li>
        </ul>
      )
    );
  }

  render() {
    let { languageType, language, projectScopes } = this.props;

    let {
      // designIcon,
      designRedirect,
      // webIcon,
      webRedirect,
      // accountingIcon,
      accountingRedirect,
      // marketingBlackIcon,
      marketingBlackRedirect,
      // videoPhotIcon,
      videoPhotRedirect,
      // engineeringIcon,
      engineeringRedirect,
      // translationIcon,
      translationRedirect,
      // planingIcon,
      planingRedirect,
      // realestateIcon,
      realestateRedirect,
      // adminIcon,
      adminRedirect,
      // internationalTradeIcon,
      internationalTradeRedirect,
      // customerServiceIcon,
      customerServiceRedirect,
      // teachingIcon,
      teachingRedirect,
      isActiveSub,
      selectedProjectScope,
    } = this.state;

    return (
      <>
        <div className="show-tool-tablet">
          <Carousel
            show={7}
            slide={3}
            leftArrow={
              <img
                className="cursor-pointer"
                src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrow_left_icon.svg"
              />
            }
            rightArrow={
              <img
                className="cursor-pointer"
                src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/arrow_right_icon.svg"
              />
            }
            swiping={true}
          >
            <div className="tool_icon">
              <div
                className="custom-transition-class"
                onMouseEnter={() => {
                  this.onIconChange("designIcon", "designColor.svg");
                  this.handleMenuItemMouseEnter("design");
                }}
                // onMouseLeave={() => {
                //   this.onIconChange("designIcon", "DesignBlack.svg");
                // }}
              >
                <Link to={designRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/designIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("webIcon", "WebColor.svg");
                  this.handleMenuItemMouseEnter("web");
                }}
                // onMouseLeave={() => {
                //   this.onIconChange("webIcon", "WebBlack.svg");
                // }}
              >
                <Link to={webRedirect} className="link">
                  <span className="icon">
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/webIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("LawBlack", "LawColor.svg");
                  this.handleMenuItemMouseEnter("legal");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("LawBlack", "LawBlack.svg")
                // }
              >
                <Link to={accountingRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/accountingIcon.svg"} alt="" />{" "}
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("marketingBlackIcon", "marketingColor.svg");
                  this.handleMenuItemMouseEnter("marketing");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("marketingBlackIcon", "marketingBlack.svg")
                // }
              >
                <Link to={marketingBlackRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/marketingBlackIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("videoPhotIcon", "VideoGoodColor.svg");
                  this.handleMenuItemMouseEnter("video");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("videoPhotIcon", "VideoGoodBlack.svg")
                // }
              >
                <Link to={videoPhotRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/videoPhotIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("engineeringIcon", "compassColor.svg");
                  this.handleMenuItemMouseEnter("engineering");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("engineeringIcon", "compassBlack.svg")
                // }
              >
                <Link to={engineeringRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/drawingEngineer.svg"} alt="" />{" "}
                  </span>
                </Link>
              </div>
            </div>
            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("translationIcon", "TranslationColor.svg");
                  this.handleMenuItemMouseEnter("translation");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("translationIcon", "TranslationBlack.svg")
                // }
              >
                <Link to={translationRedirect} className="link">
                  <span className="icon">
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/translationIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("planingIcon", "WritingColor.svg");
                  this.handleMenuItemMouseEnter("writing");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("planingIcon", "WritingBlack.svg")
                // }
              >
                <Link to={planingRedirect} className="link">
                  <span className="icon">
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/planingIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("teachingIcon", "onlineTeachingColor.svg");
                  this.handleMenuItemMouseEnter("tutorial");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("teachingIcon", "onlineTeachingBlack.svg")
                // }
              >
                <Link to={teachingRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/teachingIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("realestateIcon", "realestatecolor.svg");
                  this.handleMenuItemMouseEnter("realEstate");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("realestateIcon", "realestateblack.svg")
                // }
              >
                <Link to={realestateRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/realestateIcon.svg"} alt="" />{" "}
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("adminIcon", "ClipColor.svg");
                  this.handleMenuItemMouseEnter("admin");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("adminIcon", "ClipBlack.svg")
                // }
              >
                <Link to={adminRedirect} className="link">
                  <span className="icon">
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/adminIcon.svg"} alt="" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange(
                    "internationalTradeIcon",
                    "InternationalTradeColor.svg"
                  );
                  this.handleMenuItemMouseEnter("internationalTrade");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("internationalTradeIcon", "InternationalTradeBlack.svg")
                // }
              >
                <Link to={internationalTradeRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/internationalTradeIcon.svg"} alt="" />{" "}
                  </span>
                </Link>
              </div>
            </div>

            <div className="tool_icon">
              <div
                onMouseEnter={() => {
                  this.onIconChange("customerServiceIcon", "headsetColor.svg");
                  this.handleMenuItemMouseEnter("customerService");
                }}
                // onMouseLeave={() =>
                //   this.onIconChange("customerServiceIcon", "headsetBlack.svg")
                // }
              >
                <Link to={customerServiceRedirect} className="link">
                  <span className="icon">
                    {" "}
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/customerServiceIcon.svg"} alt="" />{" "}
                  </span>
                </Link>
              </div>
            </div>
          </Carousel>
        </div>

        <div className="hide-tool-tablet">
          <section
            className="icons_sec bg-transparent" /* onMouseLeave={() => this.handleMenuItemMouseLeave()} */
          >
            <div className="container-fluid">
              <div className="tool_icon d-flex justify-content-center" >
                <div className="menu-scopes-area">
                  <ul className="list-unstyled row custom-list-class" >
                    <li
                      className="custom-transition-class"
                      onMouseEnter={() => {
                        this.onIconChange("designIcon", "designColor.svg");
                        this.handleMenuItemMouseEnter("design");
                      }}
                      // onMouseLeave={() => {
                      //   this.onIconChange("designIcon", "DesignBlack.svg");
                      // }}
                    >
                      <Link to={designRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/designIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.DESIGN_TEXT}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange("webIcon", "WebColor.svg");
                        this.handleMenuItemMouseEnter("web");
                      }}
                      // onMouseLeave={() => {
                      //   this.onIconChange("webIcon", "WebBlack.svg");
                      // }}
                    >
                      <Link to={webRedirect} className="link">
                        <span className="icon">
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/webIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.WEB_DEVELOPMENT}{" "}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange("LawBlack", "LawColor.svg");
                        this.handleMenuItemMouseEnter("legal");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("LawBlack", "LawBlack.svg")
                      // }
                    >
                      <Link to={accountingRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/accountingIcon.svg"} alt="" />{" "}
                        </span>
                        <span className="title text-light">
                          {languageType.ACCOUNTING_TEXT}{" "}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "marketingBlackIcon",
                          "marketingColor.svg"
                        );
                        this.handleMenuItemMouseEnter("marketing");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("marketingBlackIcon", "marketingBlack.svg")
                      // }
                    >
                      <Link to={marketingBlackRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/marketingBlackIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.MARKETING_TEXT}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "videoPhotIcon",
                          "VideoGoodColor.svg"
                        );
                        this.handleMenuItemMouseEnter("video");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("videoPhotIcon", "VideoGoodBlack.svg")
                      // }
                    >
                      <Link to={videoPhotRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/videoPhotIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.PHOTO_VIDEO}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "engineeringIcon",
                          "compassColor.svg"
                        );
                        this.handleMenuItemMouseEnter("engineering");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("engineeringIcon", "compassBlack.svg")
                      // }
                    >
                      <Link to={engineeringRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/drawingEngineer.svg"} alt="" />{" "}
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.ENGINEERING_TEXT}{" "}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "translationIcon",
                          "TranslationColor.svg"
                        );
                        this.handleMenuItemMouseEnter("translation");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("translationIcon", "TranslationBlack.svg")
                      // }
                    >
                      <Link to={translationRedirect} className="link">
                        <span className="icon">
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/translationIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.TRANSLATION}
                        </span>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => {
                        this.onIconChange("planingIcon", "WritingColor.svg");
                        this.handleMenuItemMouseEnter("writing");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("planingIcon", "WritingBlack.svg")
                      // }
                    >
                      <Link to={planingRedirect} className="link">
                        <span className="icon">
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/planingIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.PLANNING}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "teachingIcon",
                          "onlineTeachingColor.svg"
                        );
                        this.handleMenuItemMouseEnter("tutorial");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("teachingIcon", "onlineTeachingBlack.svg")
                      // }
                    >
                      <Link to={teachingRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/teachingIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.TEACHING_TEXT}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "realestateIcon",
                          "realestatecolor.svg"
                        );
                        this.handleMenuItemMouseEnter("realEstate");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("realestateIcon", "realestateblack.svg")
                      // }
                    >
                      <Link to={realestateRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/realestateIcon.svg"} alt="" />{" "}
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.REAL_ESTATE}{" "}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange("adminIcon", "ClipColor.svg");
                        this.handleMenuItemMouseEnter("admin");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("adminIcon", "ClipBlack.svg")
                      // }
                    >
                      <Link to={adminRedirect} className="link">
                        <span className="icon">
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/adminIcon.svg"} alt="" />
                        </span>
                        <span className="title text-light">
                          {languageType.ADMIN}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "internationalTradeIcon",
                          "InternationalTradeColor.svg"
                        );
                        this.handleMenuItemMouseEnter("internationalTrade");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("internationalTradeIcon", "InternationalTradeBlack.svg")
                      // }
                    >
                      <Link to={internationalTradeRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/internationalTradeIcon.svg"} alt="" />{" "}
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.INTERNATIONAL_TRADE}{" "}
                        </span>
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        this.onIconChange(
                          "customerServiceIcon",
                          "headsetColor.svg"
                        );
                        this.handleMenuItemMouseEnter("customerService");
                      }}
                      // onMouseLeave={() =>
                      //   this.onIconChange("customerServiceIcon", "headsetBlack.svg")
                      // }
                    >
                      <Link to={customerServiceRedirect} className="link">
                        <span className="icon">
                          {" "}
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/hire/customerServiceIcon.svg"} alt="" />{" "}
                        </span>
                        <span className="title text-light">
                          {" "}
                          {languageType.CUSTOMER_SERVICE}{" "}
                        </span>
                      </Link>
                    </li>
                  </ul>

                  <div
                    className={
                      this.state.selectedProjectScope ? "fade-in" : "fade-out"
                    }
                  >
                    {this.renderProjectSubScopes()}
                  </div>
                  {/* <SearchBar {...this.props} /> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    projectScopes: state.languageReducer.projectScopes,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(BearoleIconBar);

import React, { Component } from "react";
import { v4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import BlobButton from "../../components/buttons/blobButton";
import ProjectTypeFilter from "../../components/project/projectTypeFilter";
import CheckboxCard from "../../components/checkboxCard/checkboxCard.jsx";
import {
  onReduxRouteChange,
  onReduxLangaugeChange,
} from "../../store/action/action";
import { connect } from "react-redux";
import DropdownList from "../../components/dropdowns/dropdownList";
import { ProjectTypeConst } from "../../utils/projectConst";
import { PackageTypeConst } from "../../utils/packageRequestConst";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { postMultipartFile, postOptions } from "../../utils/httpConfig";

class PackageDesign extends Component {
  constructor(props) {
    super(props);
    const images = [];
    for (let i = 0; i < 16; i++) {
      images.push({
        id: v4(),
        img: `https://source.unsplash.com/collection/151521/200x170?${i}`,
      });
    }
    this.state = {
      projectTypes: [],
      projectStatuses: [
        { name: "recruitment", title: "Recruitment", checked: false },
        { name: "onGoing", title: "On Going", checked: false },
        { name: "completed", title: "Completed", checked: false },
      ],
      isDesignStyleModelOpen: false,
      min: 1,
      max: 5,
      styles: images,
      selectedStyles: [],
      packageTypes: [],
      hoverTab: null,
      packageType: "",
      logoPackageType: "",
      assignedStyles: [],
      packageLanguage: "",
      organizationName: "",
      industryType: "",
      videoClipDuration: "",
      preferredVideoStyleUrl: "",
      description: "",
      errorMessage: {},
      selectedFile: "",
      referentialFileName: "",
      referentialFileExtension: "",
      referentialFilePath: "",
    };
  }

  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);
    this.bindProjectTypes();
    this.bindPackageTypes();
  }

  //#region Bind Events
  async bindProjectTypes() {
    let array = [];

    let projectTypes = new URLSearchParams(this.props.location.search).get(
      "type"
    );
    let projectTypeArray =
      projectTypes !== "" && projectTypes !== null && projectTypes !== undefined
        ? projectTypes.split(",")
        : [];

    Object.entries(ProjectTypeConst).map((item, index) => {
      let isChecked = projectTypeArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1],
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectType +=
          (this.state.selectedProjectType !== "" ? "," : "") + item[1];
    });
    this.setState({ projectTypes: array });
  }

  async bindPackageTypes() {
    let array = [];
    Object.entries(PackageTypeConst).map((item, index) => {
      array.push({
        id: item[0],
        title: item[1].Title,
        imgUrl: item[1].ImgUrl,
      });
    });
    this.setState({
      packageTypes: array,
      packageType: array.length > 0 ? array[0].title : "",
    });
  }
  //#endregion Bind Events

  //#region Change Events
  onCheckboxChangeHandle = (event, type, index) => {
    let { projectTypes, projectStatuses } = this.state;
    if (type === "projectTypes") {
      projectTypes[index].checked = event.target.checked;
      this.state.selectedProjectType = "";
      projectTypes.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectType +=
            (this.state.selectedProjectType !== "" ? "," : "") + element.title;
      });
    }
    if (type === "projectStatuses") {
      projectStatuses[index].checked = event.target.checked;
      this.state.selectedProjectStatus = "";
      projectStatuses.map((element, i) => {
        if (element.checked)
          this.state.selectedProjectStatus +=
            (this.state.selectedProjectStatus !== "" ? "," : "") +
            element.title;
      });
    }
    this.setState({ projectTypes, projectStatuses });
  };

  checkDesignStyleValidation(event) {
    let isSelected = event.currentTarget.checked;
    const styleId = event.currentTarget.dataset.id;
    if (isSelected) {
      if (this.state.selectedStyles.length < this.state.max) {
        this.setState({
          selectedStyles: [
            ...this.state.selectedStyles,
            this.state.styles.find((s) => s.id === styleId),
          ],
        });
      } else {
        event.preventDefault();
        event.currentTarget.checked = false;
        notifications.showError("You can only select maximum of 5 styles.");
      }
    } else {
      if (this.state.selectedStyles.length > this.state.min) {
        this.setState({
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.id !== styleId
          ),
        });
      } else {
        this.setState({
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.id !== styleId
          ),
        });
      }
    }
    return;
  }

  onAssignDesign = () => {
    if (this.state.selectedStyles.length <= 0)
      notifications.showError("Please select any style.");
    else
      this.setState({
        isDesignStyleModelOpen: false,
        assignedStyles: this.state.selectedStyles,
      });

    return;
  };
  //#endregion Change Events

  //#region Submit Package Request
  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;
    if (
      this.state.packageType === null ||
      this.state.packageType === "" ||
      this.state.packageType === undefined
    ) {
      formIsValid = false;
      errorMessage["packageType"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.LogoAndIdentity.Title &&
      (this.state.logoPackageType === null ||
        this.state.logoPackageType === "" ||
        this.state.logoPackageType === undefined)
    ) {
      formIsValid = false;
      errorMessage["logoPackageType"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.LogoAndIdentity.Title &&
      (!this.state.assignedStyles || this.state.assignedStyles.length <= 0)
    ) {
      formIsValid = false;
      errorMessage["selectDesignType"] = languageType.REQUIRED_MESSAGE;
    } else if (
      (this.state.packageType === PackageTypeConst.Illustration.Title ||
        this.state.packageType === PackageTypeConst.VideoClip.Title) &&
      (this.state.packageLanguage === null ||
        this.state.packageLanguage === "" ||
        this.state.packageLanguage === undefined)
    ) {
      formIsValid = false;
      errorMessage["packageLanguage"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.Illustration.Title &&
      (this.state.organizationName === null ||
        this.state.organizationName === "" ||
        this.state.organizationName === undefined)
    ) {
      formIsValid = false;
      errorMessage["organizationName"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.Illustration.Title &&
      (this.state.industryType === null ||
        this.state.industryType === "" ||
        this.state.industryType === undefined)
    ) {
      formIsValid = false;
      errorMessage["industryType"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.VideoClip.Title &&
      (this.state.videoClipDuration === null ||
        this.state.videoClipDuration === "" ||
        this.state.videoClipDuration === undefined)
    ) {
      formIsValid = false;
      errorMessage["videoClipDuration"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageType === PackageTypeConst.VideoClip.Title &&
      (this.state.preferredVideoStyleUrl === null ||
        this.state.preferredVideoStyleUrl === "" ||
        this.state.preferredVideoStyleUrl === undefined)
    ) {
      formIsValid = false;
      errorMessage["preferredVideoStyleUrl"] = languageType.REQUIRED_MESSAGE;
    } else if (
      (this.state.packageType === PackageTypeConst.Illustration.Title ||
        this.state.packageType === PackageTypeConst.VideoClip.Title) &&
      (this.state.description === null ||
        this.state.description === "" ||
        this.state.description === undefined)
    ) {
      formIsValid = false;
      errorMessage["description"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  getUploadFileKey = async (file) => {
    let formData = new FormData();
    formData.append("files", file);
    const response = await request(
      `${ENDPOINT["UploadFile"]}`,
      postMultipartFile(formData)
    );
    if (response.success)
      this.setState({
        referentialFileName: response.result[0]?.s3Key,
        referentialFileExtension:
          file.name.split(".")[file.name.split(".").length - 1],
        referentialFilePath: response.result[0]?.s3Key,
      });
  };

  onPageRedirectHandle = async (redirectTo) => {
    if (this.handleValidation()) {
      let param = {};
      this.state.selectedFile &&
        (await this.getUploadFileKey(this.state.selectedFile));
      if (this.state.packageType === PackageTypeConst.LogoAndIdentity.Title)
        param = {
          packageType: this.state.packageType,
          logoPackageType: this.state.logoPackageType,
          designStyles: JSON.stringify(this.state.assignedStyles),
        };
      else if (this.state.packageType === PackageTypeConst.Illustration.Title)
        param = {
          packageType: this.state.packageType,
          packageLanguage: this.state.packageLanguage,
          organizationName: this.state.organizationName,
          industryType: this.state.industryType,
          description: this.state.description,
          referentialFileName: this.state.referentialFileName,
          referentialFileExtension: this.state.referentialFileExtension,
          referentialFilePath: this.state.referentialFilePath,
        };
      else if (this.state.packageType === PackageTypeConst.VideoClip.Title)
        param = {
          packageType: this.state.packageType,
          packageLanguage: this.state.packageLanguage,
          videoClipDuration: this.state.videoClipDuration,
          preferredVideoStyleUrl: this.state.preferredVideoStyleUrl,
          description: this.state.description,
          referentialFileName: this.state.referentialFileName,
          referentialFileExtension: this.state.referentialFileExtension,
          referentialFilePath: this.state.referentialFilePath,
        };

      let result = await request(
        ENDPOINT["CreatePackageRequest"],
        postOptions(param)
      );
      if (result.success) {
        let redirectTo = "";
        if (this.state.packageType === PackageTypeConst.LogoAndIdentity.Title) {
          if (
            result.result !== undefined &&
            result.result !== null &&
            result.result !== ""
          )
            redirectTo = "/package-design-detail?id=" + result.result;
        } else redirectTo = "/all-packages";

        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
      } else notifications.showError(result.message);
    } else return;
  };
  //#endregion onPageRedirectHandle

  render() {
    let { projectTypes, projectStatuses, packageTypes, hoverTab } = this.state;

    const {
      packageType,
      logoPackageType,
      packageLanguage,
      organizationName,
      industryType,
      videoClipDuration,
      preferredVideoStyleUrl,
      description,
    } = this.state;
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <ProjectTypeFilter onChange={this.onCheckboxChangeHandle} />
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <CheckboxCard
                      title="Status"
                      data={projectStatuses}
                      type="projectStatuses"
                      onChange={this.onCheckboxChangeHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="project_post">
                  <div className="own_contest">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="contain-heading">
                          <div className="col-md-9 r-padding">
                            <h6>
                              {" "}
                              <img
                                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/Medal.svg"
                                className="medal-image"
                              ></img>
                              Get the best designers of competition award
                              winners
                            </h6>
                          </div>
                          <div className="col-md-3">
                            <BlobButton
                              className={`nav-link contest-tab history-btn  ${
                                packageType === "contest-tab" &&
                                (!hoverTab || hoverTab === "contest-tab")
                                  ? "active"
                                  : ""
                              }`}
                              id="contest-tab"
                              data-toggle="tab"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                              content="History"
                              onClick={() => {
                                this.props.history.push("/all-packages");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul
                    className="nav nav-tabs tab_menu"
                    id="myTab"
                    role="tablist"
                  >
                    {packageTypes &&
                      packageTypes.length > 0 &&
                      packageTypes.map((type, index) => {
                        return (
                          <li
                            key={`packageType${index}`}
                            className="nav-item"
                            onMouseEnter={() => {
                              this.setState({ hoverTab: type.title });
                            }}
                            onMouseLeave={() => {
                              this.setState({ hoverTab: null });
                            }}
                          >
                            <BlobButton
                              className={`nav-link ${
                                type.id === "PackagingAndLabel" && "package-btn"
                              } ${
                                packageType === type.title &&
                                (!hoverTab || hoverTab === type.title)
                                  ? "active"
                                  : ""
                              }`}
                              data-toggle="tab"
                              onClick={() => {
                                this.setState({ packageType: type.title });
                              }}
                              role="tab"
                              aria-controls={type.title}
                              aria-selected="true"
                              content={type.title}
                              image={type.imgUrl}
                            />
                          </li>
                        );
                      })}
                    {this.state.errorMessage.packageType && (
                      <p className="text-danger">
                        {this.state.errorMessage.packageType}
                      </p>
                    )}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    {packageType === PackageTypeConst.LogoAndIdentity.Title && (
                      <div
                        className={`tab-pane fade ${
                          packageType === PackageTypeConst.LogoAndIdentity.Title
                            ? "show active"
                            : ""
                        }`}
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div
                          className="business_card a_pack"
                          onClick={() => {
                            this.setState({
                              logoPackageType: "A Pack",
                              isDesignStyleModelOpen: true,
                              selectedStyles: [],
                              assignedStyles: [],
                            });
                          }}
                          style={{
                            boxShadow:
                              logoPackageType === "A Pack"
                                ? "5px 5px 5px rgb(0 0 0 / 35%)"
                                : "",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="media">
                                <div className="media_left">
                                  <i
                                    className="fa fa-address-card"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="media-body">
                                  <h5>Logo and Business Card</h5>
                                  <span>From US$399</span>
                                  <p>A logo and business card</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <ul className="list-unstyled">
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Logo</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Business Card</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-3 text-center">
                              <h3 className="green_text">A Pack</h3>
                              <span>From US$399</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="business_card b_pack"
                          onClick={() => {
                            this.setState({
                              logoPackageType: "B Pack",
                              isDesignStyleModelOpen: true,
                              selectedStyles: [],
                              assignedStyles: [],
                            });
                          }}
                          style={{
                            boxShadow:
                              logoPackageType === "B Pack"
                                ? "5px 5px 5px rgb(0 0 0 / 35%)"
                                : "",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="media">
                                <div className="media_left">
                                  <i
                                    className="fa fa-dropbox"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="media-body">
                                  <h5>Logo and Business Card</h5>
                                  <span>From US$499</span>
                                  <p>
                                    A logo plus digital and print essentials
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <ul className="list-unstyled">
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Logo</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Business Card</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Letterhead & Envelope</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Facebook cover</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-3 text-center align-self-center">
                              <h3 className="blue_text">B Pack</h3>
                              <span>From US$499</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="business_card c_pack"
                          onClick={() => {
                            this.setState({
                              logoPackageType: "C Pack",
                              isDesignStyleModelOpen: true,
                              selectedStyles: [],
                              assignedStyles: [],
                            });
                          }}
                          style={{
                            boxShadow:
                              logoPackageType === "C Pack"
                                ? "5px 5px 5px rgb(0 0 0 / 35%)"
                                : "",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="media">
                                <div className="media_left">
                                  <i
                                    className="fa fa-bookmark"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="media-body">
                                  <h5>Logo and Business Card</h5>
                                  <span>From US$699</span>
                                  <p>
                                    A logo plus digital and print essentials +
                                    Wix or WordPress
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <ul className="list-unstyled">
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Logo</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  <a>Business Card</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Letterhead & Envelope</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Facebook cover</a>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                  <a>Wix or WordPress</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-3 text-center align-self-center">
                              <h3 className="pink_text">C Pack</h3>
                              <span>From US$699</span>
                            </div>
                          </div>
                        </div>
                        {this.state.errorMessage.logoPackageType && (
                          <p className="text-danger">
                            {this.state.errorMessage.logoPackageType}
                          </p>
                        )}
                        <br />
                        {this.state.errorMessage.selectDesignType && (
                          <p className="text-danger">
                            {this.state.errorMessage.selectDesignType}
                          </p>
                        )}
                      </div>
                    )}
                    {packageType === PackageTypeConst.Illustration.Title && (
                      <div
                        className={`tab-pane fade ${
                          packageType === PackageTypeConst.Illustration.Title
                            ? "show active"
                            : ""
                        }`}
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <form className="post_form packg_form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <h5>Packaging & Label</h5>
                              </div>
                              <div className="form-group">
                                <label>Language</label>
                                <DropdownList
                                  id="language"
                                  name="language"
                                  enableAutoCompleteSearch
                                  value={packageLanguage}
                                  selectItem={(value) => {
                                    let errorMessage = {};
                                    this.setState({ packageLanguage: value });
                                    if (
                                      this.state.packageLanguage !== 0 &&
                                      this.state.packageLanguage !== "" &&
                                      this.state.packageLanguage !== null &&
                                      this.state.packageLanguage !== undefined
                                    )
                                      errorMessage["packageLanguage"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                  items={[
                                    { text: "2", value: "2" },
                                    { text: "3", value: "3" },
                                    { text: "4", value: "4" },
                                    { text: "5", value: "5" },
                                  ]}
                                />
                                {this.state.errorMessage.packageLanguage && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.packageLanguage}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>What is your organization name?</label>
                                <input
                                  id="organizationName"
                                  name="organizationName"
                                  type="text"
                                  className="wrapper-input"
                                  placeholder="Organization Name"
                                  value={organizationName}
                                  maxLength="100"
                                  onChange={(e) => {
                                    let errorMessage = {};
                                    this.setState({
                                      organizationName: e.target.value,
                                    });
                                    if (
                                      this.state.organizationName !==
                                        undefined &&
                                      this.state.organizationName !== null &&
                                      this.state.organizationName !== ""
                                    )
                                      errorMessage["organizationName"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                />
                                {this.state.errorMessage.organizationName && (
                                  <p className="text-danger">
                                    {" "}
                                    {
                                      this.state.errorMessage.organizationName
                                    }{" "}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>Select your industry</label>
                                <DropdownList
                                  id="industryType"
                                  name="industryType"
                                  enableAutoCompleteSearch
                                  value={industryType}
                                  selectItem={(value) => {
                                    let errorMessage = {};
                                    this.setState({ industryType: value });
                                    if (
                                      this.state.industryType !== 0 &&
                                      this.state.industryType !== "" &&
                                      this.state.industryType !== null &&
                                      this.state.industryType !== undefined
                                    )
                                      errorMessage["industryType"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                  items={[
                                    { text: "2", value: "2" },
                                    { text: "3", value: "3" },
                                    { text: "4", value: "4" },
                                    { text: "5", value: "5" },
                                  ]}
                                />
                                {this.state.errorMessage.industryType && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.industryType}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Description </label>
                                <textarea
                                  id="description"
                                  name="description"
                                  className="form-control"
                                  placeholder="Tell the designers about the project that you need designed"
                                  rows="3"
                                  value={description}
                                  maxLength="500"
                                  onChange={(e) => {
                                    let errorMessage = {};
                                    this.setState({
                                      description: e.target.value,
                                    });
                                    if (
                                      this.state.description !== undefined &&
                                      this.state.description !== null &&
                                      this.state.description !== ""
                                    )
                                      errorMessage["description"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                />
                                {this.state.errorMessage.description && (
                                  <p className="text-danger">
                                    {" "}
                                    {this.state.errorMessage.description}{" "}
                                  </p>
                                )}
                              </div>
                              <div className="form-group upload_file">
                                <label htmlFor="exampleFormControlFile1">
                                  <i
                                    className="fa fa-upload"
                                    aria-hidden="true"
                                  />{" "}
                                  Upload referential files{" "}
                                </label>
                                <input
                                  type="file"
                                  className="form-control-file"
                                  id="exampleFormControlFile1"
                                  onChange={(event) => {
                                    this.setState({
                                      selectedFile: event.target.files[0],
                                    });
                                  }}
                                />
                                {this.state.selectedFile && (
                                  <div>
                                    {this.state.selectedFile.name}
                                    <i
                                      onClick={() =>
                                        this.setState({
                                          selectedFile: "",
                                          referentialFileName: "",
                                          referentialFileExtension: "",
                                          referentialFilePath: "",
                                        })
                                      }
                                      className="fa fa-trash"
                                      style={{
                                        color: "#690",
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                      }}
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                    {packageType ===
                      PackageTypeConst.PackagingAndLabel.Title && (
                      <div
                        className={`tab-pane fade ${
                          packageType ===
                          PackageTypeConst.PackagingAndLabel.Title
                            ? "show active"
                            : ""
                        }`}
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      />
                    )}
                    {packageType === PackageTypeConst.VideoClip.Title && (
                      <div
                        className={`tab-pane fade ${
                          packageType === PackageTypeConst.VideoClip.Title
                            ? "show active"
                            : ""
                        }`}
                        role="tabpanel"
                        aria-labelledby="video-tab"
                      >
                        <form className="post_form packg_form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <h5>Packaging & Label</h5>
                              </div>
                              <div className="form-group">
                                <label>Language</label>
                                <DropdownList
                                  id="packageLanguage"
                                  name="packageLanguage"
                                  enableAutoCompleteSearch
                                  value={packageLanguage}
                                  selectItem={(value) => {
                                    let errorMessage = {};
                                    this.setState({ packageLanguage: value });
                                    if (
                                      this.state.packageLanguage !== 0 &&
                                      this.state.packageLanguage !== "" &&
                                      this.state.packageLanguage !== null &&
                                      this.state.packageLanguage !== undefined
                                    )
                                      errorMessage["packageLanguage"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                  items={[
                                    { text: "2", value: "2" },
                                    { text: "3", value: "3" },
                                    { text: "4", value: "4" },
                                    { text: "5", value: "5" },
                                  ]}
                                />
                                {this.state.errorMessage.packageLanguage && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.packageLanguage}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>Select the duration of video clip</label>
                                <DropdownList
                                  id="videoClipDuration"
                                  name="videoClipDuration"
                                  enableAutoCompleteSearch
                                  value={videoClipDuration}
                                  selectItem={(value) => {
                                    let errorMessage = {};
                                    this.setState({ videoClipDuration: value });
                                    if (
                                      this.state.videoClipDuration !== 0 &&
                                      this.state.videoClipDuration !== "" &&
                                      this.state.videoClipDuration !== null &&
                                      this.state.videoClipDuration !== undefined
                                    )
                                      errorMessage["videoClipDuration"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                  items={[
                                    { text: "15 sec", value: "15 sec" },
                                    { text: "2", value: "2" },
                                    { text: "3", value: "3" },
                                    { text: "4", value: "4" },
                                    { text: "5", value: "5" },
                                  ]}
                                />
                                {this.state.errorMessage.videoClipDuration && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.videoClipDuration}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Add your preferred video style from Youtube{" "}
                                </label>
                                <input
                                  id="preferredVideoStyleUrl"
                                  name="preferredVideoStyleUrl"
                                  type="text"
                                  className="form-control"
                                  value={preferredVideoStyleUrl}
                                  maxLength="500"
                                  onChange={(e) => {
                                    let errorMessage = {};
                                    this.setState({
                                      preferredVideoStyleUrl: e.target.value,
                                    });
                                    if (
                                      this.state.preferredVideoStyleUrl !==
                                        undefined &&
                                      this.state.preferredVideoStyleUrl !==
                                        null &&
                                      this.state.preferredVideoStyleUrl !== ""
                                    )
                                      errorMessage["preferredVideoStyleUrl"] =
                                        null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                />
                                {this.state.errorMessage
                                  .preferredVideoStyleUrl && (
                                  <p className="text-danger">
                                    {
                                      this.state.errorMessage
                                        .preferredVideoStyleUrl
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Description </label>
                                <textarea
                                  id="videodescription"
                                  name="videodescription"
                                  className="form-control"
                                  placeholder="Tell the designers about the project that you need designed"
                                  rows="3"
                                  maxLength="500"
                                  value={this.state.description}
                                  onChange={(e) => {
                                    let errorMessage = {};
                                    this.setState({
                                      description: e.target.value,
                                    });
                                    if (
                                      this.state.description !== undefined &&
                                      this.state.description !== null &&
                                      this.state.description !== ""
                                    )
                                      errorMessage["description"] = null;
                                    this.setState({
                                      errorMessage: errorMessage,
                                    });
                                  }}
                                />
                                {this.state.errorMessage.description && (
                                  <p className="text-danger">
                                    {this.state.errorMessage.description}
                                  </p>
                                )}
                              </div>
                              <div className="form-group upload_file">
                                <label htmlFor="exampleFormControlFile2">
                                  <i
                                    className="fa fa-upload"
                                    aria-hidden="true"
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Upload referential files{" "}
                                </label>
                                <input
                                  type="file"
                                  className="form-control-file"
                                  id="exampleFormControlFile2"
                                  onChange={(event) => {
                                    this.setState({
                                      selectedFile: event.target.files[0],
                                    });
                                  }}
                                />
                                {this.state.selectedFile && (
                                  <div>
                                    {this.state.selectedFile.name}
                                    <i
                                      onClick={() =>
                                        this.setState({
                                          selectedFile: "",
                                          referentialFileName: "",
                                          referentialFileExtension: "",
                                          referentialFilePath: "",
                                        })
                                      }
                                      className="fa fa-trash"
                                      style={{
                                        color: "#690",
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                      }}
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                    <div
                      className="text-right save_cancel"
                      hidden={
                        packageType === PackageTypeConst.PackagingAndLabel.Title
                      }
                    >
                      <button
                        type="button"
                        className="btn cancel_btn"
                        onClick={() => {
                          this.props.history.push("/package-design");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn save_btn"
                        onClick={() => this.onPageRedirectHandle()}
                      >
                        {packageType ===
                          PackageTypeConst.LogoAndIdentity.Title &&
                          "Save & Continue"}
                        {packageType === PackageTypeConst.Illustration.Title &&
                          "Save"}
                        {packageType === PackageTypeConst.VideoClip.Title &&
                          "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>

          {/* Design Style Popup */}
          <Modal
            dialogClassName="jungle-modal"
            contentClassName="jungle-modal-content lg"
            show={this.state.isDesignStyleModelOpen}
            onHide={() => {
              this.setState({ isDesignStyleModelOpen: false });
            }}
            centered
            size="lg"
          >
            <Modal.Header className="position-relative jungle-modal-header">
              <img
                src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/renew-jungleworks-logo.png"
                alt=""
              />
              <span className="position-absolute">Preferred Design</span>
              <span
                onClick={() => {
                  this.setState({ isDesignStyleModelOpen: false });
                }}
                className="custom-close"
              >
                {" "}
                x{" "}
              </span>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "887px",
                overflow: "auto",
                padding: "0px 0px",
              }}
            >
              <div
                className="project_post style_place"
                style={{ boxShadow: "none" }}
              >
                <div className="style_label">
                  <div className="row align-items-center mb-5">
                    <div className="col-md-6">
                      <label>You can select maxium 5 styles</label>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="text-right save_cancel"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <button
                          type="button"
                          className="btn cancel_btn"
                          onClick={() => {
                            this.setState({ isDesignStyleModelOpen: false });
                          }}
                        >
                          {" "}
                          Cancel{" "}
                        </button>
                        <button
                          type="button"
                          className="btn save_btn"
                          onClick={() => this.onAssignDesign()}
                        >
                          {" "}
                          Done{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="style_box">
                  <div className="row align-items-center">
                    {this.state.styles.map((e, index) => {
                      return (
                        <div className="col-md-3" key={e.id}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="exampleCheck"
                            data-id={e.id}
                            id={`exampleCheck${index}`}
                            onChange={this.checkDesignStyleValidation.bind(
                              this
                            )}
                          />
                          <label
                            style={{ width: "auto", height: "auto" }}
                            className="form-check-label"
                            htmlFor={`exampleCheck${index}`}
                          >
                            <img src={e.img} alt="" />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
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

export default connect(mapStateToProps, mapDispatchProps)(PackageDesign);

import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { v4 } from "uuid";
import { connect } from "react-redux";
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../store/action/action";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";
import { ProjectTypeConst, ProjectStepConst } from "../../utils/projectConst";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import DropdownList from "../../components/dropdowns/dropdownList";

class PackageDesignDetail extends Component {
  constructor(props) {
    super(props);
    const images = [];
    for (let i = 0; i < 16; i++) {
      images.push({
        id: v4(),
        img: `https://source.unsplash.com/collection/151521/200x170?${i}`,
      });
    }
    var editType =
      new URLSearchParams(this.props.location.search).get("type") !== null &&
      new URLSearchParams(this.props.location.search).get("type") !== ""
        ? new URLSearchParams(this.props.location.search).get("type")
        : "";
    this.state = {
      postUserId: props.authUser?.myAuth?.user?.userId,
      isRequestEdit: editType === "edit" ? true : false,
      requestId: new URLSearchParams(this.props.location.search).get("id"),
      packageType: "",
      currentData: 0,
      max: 5,
      min: 1,
      styles: images,
      selectedStyles: [],
      packageComment: "",
      malePercentage: "50",
      youngPercentage: "60",
      modernPercentage: "50",
      luxuryPercentage: "40",
      simplePercentage: "20",
      abstractPercentage: "10",
      errorMessage: {},
    };
  }

  componentWillMount() {
    if (
      this.state.requestId !== "" &&
      this.state.requestId !== null &&
      this.state.requestId !== undefined
    )
      this.getPackageRequestDetail();
  }

  //#region Bind Methods
  async getPackageRequestDetail() {
    let result = await request(
      `${ENDPOINT["GetPackageRequest"]}?requestId=` + this.state.requestId,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data !== null && result.result.data !== "") {
        this.setState({
          selectedStyles:
            result.result.data.designStyles !== ""
              ? JSON.parse(result.result.data.designStyles)
              : [],
          packageType: result.result.data.packageType,
        });
        this.setState({
          currentData:
            result.result.data.designStyles !== ""
              ? this.state.selectedStyles.length
              : 0,
        });
      } else this.props.history.push("/package-design");
    }
  }
  //#endregion Bind Methods

  //#region Validation Methods
  handleChange(field, e, value) {
    let errorMessage = {};

    if (field === "packageComment") this.state.packageComment = e.target.value;
    else if (field === "gender") this.state.malePercentage = e.target.value;
    else if (field === "age") this.state.youngPercentage = e.target.value;
    else if (field === "modern") this.state.modernPercentage = e.target.value;
    else if (field === "luxury") this.state.luxuryPercentage = e.target.value;
    else if (field === "complexity")
      this.state.simplePercentage = e.target.value;
    else if (field === "abstract")
      this.state.abstractPercentage = e.target.value;

    if (
      this.state.packageComment !== 0 &&
      this.state.packageComment !== "" &&
      this.state.packageComment !== null &&
      this.state.packageComment !== undefined
    )
      errorMessage["packageComment"] = null;

    this.setState({ errorMessage: errorMessage });
  }

  checkValidationCheckbox(event) {
    let isSelected = event.currentTarget.checked;
    const styleImg = event.currentTarget.dataset.id;
    if (isSelected) {
      if (this.state.currentData < this.state.max) {
        this.setState({
          currentData: this.state.currentData + 1,
          selectedStyles: [
            ...this.state.selectedStyles,
            this.state.styles.find((s) => s.img === styleImg),
          ],
        });
      } else {
        event.preventDefault();
        event.currentTarget.checked = false;
        notifications.showError("You can only select maximum of 5 styles.");
      }
    } else {
      if (this.state.currentData > this.state.min) {
        this.setState({
          currentData: this.state.currentData - 1,
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.img !== styleImg
          ),
        });
      } else {
        this.setState({
          currentData: this.state.currentData - 1,
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.img !== styleImg
          ),
        });
      }
    }

    return;
  }
  //#endregion Validation Methods

  //#region Submit Method
  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (!this.state.selectedStyles || this.state.selectedStyles.length <= 0) {
      formIsValid = false;
      errorMessage["selectedStyles"] = languageType.REQUIRED_MESSAGE;
    } else if (
      this.state.packageComment === null ||
      this.state.packageComment === "" ||
      this.state.packageComment === undefined
    ) {
      formIsValid = false;
      errorMessage["packageComment"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    return formIsValid;
  }

  onPageRedirectHandle = async () => {
    if (this.handleValidation()) {
      let param = {
        requestId: this.state.requestId,
        packageType: this.state.packageType,
        designStyles: JSON.stringify(this.state.selectedStyles),
        packageComment: this.state.packageComment,
        malePercentage: this.state.malePercentage,
        femalePercentage: 100 - parseInt(this.state.malePercentage),
        youngPercentage: this.state.youngPercentage,
        mutualPercentage: 100 - parseInt(this.state.youngPercentage),
        modernPercentage: this.state.modernPercentage,
        classicPercentage: 100 - parseInt(this.state.modernPercentage),
        luxuryPercentage: this.state.luxuryPercentage,
        publicPercentage: 100 - parseInt(this.state.luxuryPercentage),
        simplePercentage: this.state.simplePercentage,
        complexPercentage: 100 - parseInt(this.state.simplePercentage),
        abstractPercentage: this.state.abstractPercentage,
      };
      let result = await request(
        ENDPOINT["UpdatePackageRequest"],
        postOptions(param)
      );
      if (result.success) {
        let redirectTo = "/all-packages";

        this.props.onRouteChange(redirectTo);
        this.props.history.push(redirectTo);
      } else notifications.showError(result.message);
    } else return;
  };
  //#endregion Submit Method

  //#region Other Methods
  sliderCss = (field) => {
    return {
      left: `${
        parseInt(field || "50") - 4.6 * (0.9 - parseInt(field || "50") / 100)
      }%`,
      transform: `translateX(-${field || "50"}%)`,
    };
  };
  //#endregion Other Methods

  render() {
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post">
                  <h3 className="contest_title">Package Design Detail</h3>
                  <div className="post_form packg_form">
                    <div className="contest_bodr">
                      <div className="contest_width">
                        <div className="form-group">
                          <label>
                            Select Design Style
                            <span className="compulsory">*</span>
                          </label>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="style_box">
                                <div
                                  className="row align-items-center"
                                  style={{
                                    height: "250px",
                                    overflowX: "hidden",
                                    overflowY: "auto",
                                  }}
                                >
                                  {this.state.styles.map((e, index) => {
                                    let checked = false;
                                    let asd = this.state.selectedStyles.filter(
                                      (x) => x.img === e.img
                                    );
                                    if (
                                      this.state.selectedStyles.filter(
                                        (x) => x.img === e.img
                                      ).length > 0
                                    )
                                      checked = true;

                                    return (
                                      <div className="col-md-3" key={e.id}>
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          name="designStyle"
                                          data-id={e.img}
                                          id={`designStyle${index}`}
                                          checked={checked}
                                          onChange={(e) => {
                                            this.checkValidationCheckbox(e);
                                          }}
                                        />
                                        <label
                                          style={{
                                            width: "auto",
                                            height: "auto",
                                          }}
                                          className="form-check-label"
                                          htmlFor={`designStyle${index}`}
                                        >
                                          <img src={e.img} alt="" />
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                                <span className="error">
                                  {this.state.errorMessage.selectedStyles}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12">
                              <textarea
                                className="form-control"
                                placeholder="Please, write your comment"
                                rows="3"
                                name="packageComment"
                                value={this.state.packageComment}
                                maxLength="500"
                                onChange={(e) =>
                                  this.handleChange("packageComment", e)
                                }
                              ></textarea>
                              {this.state.errorMessage.packageComment && (
                                <p className="text-danger">
                                  {this.state.errorMessage.packageComment}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="contest_range">
                          <h4 className="heading_h4">Design Preference :</h4>
                          <div className="row justify-content-between">
                            <div className="col-md-6">
                              <div className="d-flex align-items-center custom_range">
                                <label>Male</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.malePercentage}
                                    className="slider"
                                    id="gender"
                                    onChange={(e) =>
                                      this.handleChange("gender", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.malePercentage
                                    )}
                                  >
                                    {" "}
                                    {`${this.state.malePercentage}%`}{" "}
                                  </span>
                                </div>
                                <label>Female</label>
                              </div>
                              <div className="d-flex align-items-center custom_range">
                                <label>Young</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.youngPercentage}
                                    className="slider"
                                    id="age"
                                    onChange={(e) =>
                                      this.handleChange("age", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.youngPercentage
                                    )}
                                  >
                                    {`${this.state.youngPercentage}%`}
                                  </span>
                                </div>
                                <label>Mutual</label>
                              </div>
                              <div className="d-flex align-items-center custom_range">
                                <label>Modern</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.modernPercentage}
                                    className="slider"
                                    id="modern"
                                    onChange={(e) =>
                                      this.handleChange("modern", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.modernPercentage
                                    )}
                                  >
                                    {`${this.state.modernPercentage}%`}
                                  </span>
                                </div>
                                <label>Classic</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center custom_range">
                                <label>Luxury</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.luxuryPercentage}
                                    className="slider"
                                    id="luxury"
                                    onChange={(e) =>
                                      this.handleChange("luxury", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.luxuryPercentage
                                    )}
                                  >
                                    {`${this.state.luxuryPercentage}%`}
                                  </span>
                                </div>
                                <label>Public</label>
                              </div>
                              <div className="d-flex align-items-center custom_range">
                                <label>Simple</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.simplePercentage}
                                    className="slider"
                                    id="complexity"
                                    onChange={(e) =>
                                      this.handleChange("complexity", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.simplePercentage
                                    )}
                                  >
                                    {`${this.state.simplePercentage}%`}
                                  </span>
                                </div>
                                <label>Complex</label>
                              </div>
                              <div className="d-flex align-items-center custom_range">
                                <label>Abstract</label>
                                <div className="range_slider">
                                  <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={this.state.abstractPercentage}
                                    className="slider"
                                    id="abstract"
                                    onChange={(e) =>
                                      this.handleChange("abstract", e)
                                    }
                                  />
                                  <span
                                    htmlFor="myRange"
                                    className="slider-bubble"
                                    style={this.sliderCss(
                                      this.state.abstractPercentage
                                    )}
                                  >
                                    {`${this.state.abstractPercentage}%`}
                                  </span>
                                </div>
                                <label>Abstract</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hourly_limit">
                      <div className="text-right save_cancel">
                        <button
                          onClick={() => this.onPageRedirectHandle()}
                          type="button"
                          className="btn save_btn"
                        >
                          {this.state.isContestTitleHide && "Save & Continue"}
                          {!this.state.isContestTitleHide && "Submit"}
                        </button>
                        {this.state.isContestTitleHide && (
                          <button
                            type="button"
                            className="btn cancel_btn"
                            onClick={() =>
                              this.props.history.push(
                                "/project-post-details?type=back&id=" +
                                  this.state.project.projectId
                              )
                            }
                          >
                            <i className="fas fa-chevron-left"></i> Back{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
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
    authUser: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(PackageDesignDetail);

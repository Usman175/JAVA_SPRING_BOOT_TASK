import React, { Component } from "react";
import notifications from "../utils/notifications";
import request from "../utils/request";
import { ENDPOINT } from "../utils/endpoint";
import { getOptions, postOptions } from "../utils/httpConfig";
import { ProjectTypeConst, ProjectStepConst } from "../utils/projectConst";
import RightTop from "../components/rightbar/rightTop";
import RightBottom from "../components/rightbar/rightBottom";
import SubHeader from "../components/subHeader";
import { onReduxLangaugeChange } from "./../store/action/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class Profession extends Component {
  constructor(props) {
    super(props);
    var editType =
      new URLSearchParams(this.props.location.search).get("type") !== null &&
        new URLSearchParams(this.props.location.search).get("type") !== ""
        ? new URLSearchParams(this.props.location.search).get("type")
        : "";
    this.state = {
      isProjectEdit: editType === "edit" ? true : false,
      projectId: new URLSearchParams(this.props.location.search).get("id"),
      projectType: "",
      projectScope: "",
      activeTab: "design",
      selectedProfession: {},
      project: {},

    };
  }

  componentWillMount() {
    this.getProjectDetail();
  }
  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
  }
  //#region Bind Methods
  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };
  async getProjectDetail() {
    // let result = await request(`${ENDPOINT["GetProjectDetails"]}?projectId=` + this.state.projectId, getOptions({}));
    // if (result.success) {
    //     if (result.result.data !== null && result.result.data !== "") {
    //         this.setState({ project: result.result.data.projectResponse });
    //         this.setState({ projectType: result.result.data.projectResponse.projectType });
    //         this.setState({ projectScope: result.result.data.projectResponse.projectScope });
    //         if (result.result.data.projectResponse.professions.trim() !== "") {
    //             this.setState({ selectedProfession: JSON.parse(result.result.data.projectResponse.professions) });
    //             let obj = Object.keys(JSON.parse(result.result.data.projectResponse.professions))
    //             this.setState({ activeTab: obj[obj.length - 1] });
    //         }
    //
    //         if (!this.state.isProjectEdit) {
    //             let redirectTo = '';
    //             if (this.state.project.lastCompletedStep === ProjectStepConst.Step1 && this.state.project.projectType !== ProjectTypeConst.FreeContract)
    //                 redirectTo = "/project-post-details?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Profession)
    //                 redirectTo = "/project-post-details?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step2 && this.state.project.projectType === ProjectTypeConst.Milestone)
    //                 redirectTo = "/project-post-milestone?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step2 && this.state.project.projectType === ProjectTypeConst.Hourly)
    //                 redirectTo = "/project-post-hourly?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step2 && this.state.project.projectType === ProjectTypeConst.FreeContract)
    //                 redirectTo = "/project-post-free-contract?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step2 && this.state.project.projectType === ProjectTypeConst.OfficeWork)
    //                 redirectTo = "/project-post-office?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step2 && this.state.project.projectType === ProjectTypeConst.Contest)
    //                 redirectTo = "/contest-detail?id=" + this.state.project.projectId;
    //             else if (this.state.project.lastCompletedStep === ProjectStepConst.Step3)
    //                 redirectTo = "/confirm-project?id=" + this.state.project.projectId;
    //
    //             if (redirectTo !== '')
    //                 this.props.history.push(redirectTo);
    //         }
    //     }
    // else
    //     this.props.history.push("/project-post");
    // }
  }

  //#endregion Bind Methods

  //#region Validation Methods

  handleCheckBoxClick = (e) => {
    const { languageType } = this.props;
    const { selectedProfession, activeTab } = this.state;
    if (!e.target.checked) {
      selectedProfession[activeTab] = selectedProfession[activeTab].filter(
        (sp) => sp.value !== e.target.value
      );
      this.setState({ selectedProfession });
    } else {
      if (
        selectedProfession[activeTab] &&
        selectedProfession[activeTab].length === 3
      ) {
        notifications.showError(languageType.YOU_SELECT_CATEGORY);
        e.target.checked = false;
      } else if (
        Object.entries(selectedProfession).filter(([k, v]) => v.length > 0)
          .length === 2 &&
        Object.entries(selectedProfession)
          .filter(([key, val]) => val.length > 0)
          .map(([key, val]) => key)
          .indexOf(activeTab) === -1
      ) {
        notifications.showError(languageType.YOU_SELECT_CATE_MAX);
        e.target.checked = false;
      } else {
        if (!selectedProfession[activeTab]) {
          selectedProfession[activeTab] = [{ value: e.target.value, text: e.target.name }];
        } else {
          selectedProfession[activeTab].push({ value: e.target.value, text: e.target.name });
        }
        this.setState({ selectedProfession });
      }
    }
  };

  //#endregion Validation Methods

  //#region Submit Method

  onPageRedirectHandle = async () => {    
    let IsValidate = true;
    const { languageType } = this.props;
    let newValuesIndex = Object.keys(this.state.selectedProfession);
    newValuesIndex.map((item) => {
      if (this.state.selectedProfession[item].length === 0) {
        IsValidate = false;
      }
    });

    if (Object.keys(this.state.selectedProfession).length > 0 && IsValidate) {
      let professions =
        JSON.stringify(this.state.selectedProfession) &&
        this.state.selectedProfession;
      this.props.history.push({
        pathname: "/create-fulltime-Offer",
        state: professions,
      });

      let param = {
        projectId: this.state.projectId,
        projectType: this.state.projectType,
        professions: professions,
      };
      let result = await request(
        ENDPOINT["UpdateFreeContractProfessions"],
        postOptions(param)
      );
      if (result.success)
        this.props.history.push(
          "/project-post-details?id=" + this.state.projectId
        );
      else notifications.showError(result.message);
    } else {
      notifications.showError(languageType.PLEASE_SELECT_ONE);
    }
  };

  handleRemoveCategory = (innerValue, outerValue) => {
    let profession = this.state.selectedProfession;

    let newProfession = profession[outerValue].filter(
      (item) => item.value != innerValue.value
    );
    this.setState({
      selectedProfession: {
        ...profession,
        [outerValue]: newProfession,
      },
    });
  };
  //#endregion Submit Method

  render() {
    const professionList = this.props.projectScopes;
    const { activeTab, selectedProfession, language } = this.state;
    const { languageType } = this.props;
    return (
      <>
        <SubHeader />
        <section className="card_sec" style={{ minHeight: "100vh" }}>
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-lg-8 col-md-12">
                <div className="project_post professio_nal professionMobile_query">
                  <h4>
                    {" "}
                    {languageType.PROFESSIOANL_AREA} <br className="professionMobile_query_lineBreak" />
                    <span className="sp">
                      {languageType.POST_FULL_JOB_TEXT}
                    </span>
                  </h4>
                  <div className="d-flex professionFlex_Mobile_query">
                    <ul className="aside_menu list-unstyled">
                      {professionList.map((profession) => (
                        <li
                          className={
                            activeTab === profession.value ? "active" : ""
                          }
                          onClick={() =>
                            this.setState({ activeTab: profession.value })
                          }
                        >
                          <a>{profession.text}</a>
                        </li>
                      ))}
                    </ul>
                    <div className="right_content">
                      <div className="dev_box post_form">
                        <div className="d-flex align-items-center flex-wrap">
                          {professionList
                            .find((item) => item.value === activeTab)
                            .subScopes.map((profession) => (
                              <div className="custom-control custom-checkbox mr-5 pb-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={profession.text}
                                  required=""
                                  name={profession.text}
                                  value={profession.value}
                                  onChange={this.handleCheckBoxClick}
                                  checked={
                                    selectedProfession[activeTab] &&
                                    selectedProfession[activeTab].findIndex((item) => item.value === profession.value) >= 0
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={profession.text}
                                >
                                  {profession.text}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="skill_name">
                        {Object.keys(selectedProfession).map((key, index) => (
                          <div key={`profession${index}`}>
                            {selectedProfession[key].map((prof) => (
                              <a key={prof}>
                                {prof.text}{" "}
                                <i
                                  onClick={() =>
                                    this.handleRemoveCategory(prof, key)
                                  }
                                  style={{ cursor: "pointer" }}
                                  className="fa fa-close"
                                ></i>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="text-right save_cancel btnSpaceTop2 NextBtnProjectPostMobileB">
                        <button
                          type="button"
                          className="btn save_btn"
                          onClick={this.onPageRedirectHandle}
                        >
                          {" "}
                          {languageType.CONTINUE_TEXT}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12"></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

// export default Profession;
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    projectScopes: state.languageReducer.projectScopes
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Profession));

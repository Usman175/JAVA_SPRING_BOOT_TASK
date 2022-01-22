import React, { Component } from "react";
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
} from "../../store/action/action";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { isValidString } from "../../utils/validationConfig";

class RightTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProject:
        localStorage.getItem("searchProject") === null
          ? ""
          : localStorage.getItem("searchProject"),
      selectedCategory:
        new URLSearchParams(this.props.location.search).get("category") === null
          ? ""
          : new URLSearchParams(this.props.location.search).get("category"),
    };
  }

  //#region AllProject/MyProject Page Filter Method
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
  //#endregion AllProject/MyProject Page Filter Method

  render() {
    let projectCategories = [
      { text: "Accounting/Counsulting", value: "Accounting/Counsulting" },
      { text: "Design/Art", value: "Design/Art" },
      { text: "Writing", value: "Writing" },
      { text: "Engineer", value: "Engineer" },
      { text: "Legal Service", value: "Legal Service" },
      { text: "Admin Support", value: "Admin Support" },
    ];

    return (
      <>
        <div className="right_bar">
          <h4>Other Business Scope</h4>
          <ul className="list-unstyled">
            {projectCategories &&
              projectCategories.length > 0 &&
              projectCategories.map((category, i) => (
                <li key={`category${i}`}>
                  <a
                    className="dropdown-toggle"
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
          <div className="showMore_box text-right"></div>
        </div>
      </>
    );
  }
}

// export default RightTop;
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
export default withRouter(connect(mapStateToProps, mapDispatchProps)(RightTop));

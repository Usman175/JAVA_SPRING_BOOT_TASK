import React, { Component } from "react";
import { connect } from "react-redux";
import LazyRoute from "../../shared/lazy/lazyComponent.js";
import SubNav from "./subNav.jsx";
import { Route, withRouter } from "react-router-dom";
import PrivateRoute from "../../shared/auth/private-route";

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      path,
      component,
      history,
      isPrivate = false,
      authUser,
      isFreelancer = false,
    } = this.props;

    if (path === "/organization-registration") {
      if (authUser?.user != null || authUser?.user != undefined) {
        if (authUser.user.userType) {
          // history.push("/")
        }
      }
    }

    // if (path === "/project-post") {
    //   if (
    //     !localStorage.isRegisterAsClient ||
    //     sessionStorage.userType !== "Client"
    //   ) {
    //     history.push("/");
    //   }
    // }
    // if (path === "/user-registration") {
    //   if (localStorage.isRegisterAsFreelancer) {
    //     history.push("/");
    //   }
    // }

    if (path === "/client-registration") {
      if (localStorage.isRegisterAsClient) {
        history.push("/");
      }
    }

    return (
      <div>
        {isPrivate ? (
          <PrivateRoute
            path={path}
            component={component}
            isFreelancer={isFreelancer}
            {...this.props}
          />
        ) : (
          <LazyRoute path={path} component={component} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.userReducer,
    organizationState: state.organizationReducer.organization,
    // organizationId
    // organizationType
  };
}

export default withRouter(connect(mapStateToProps, null)(Layout));

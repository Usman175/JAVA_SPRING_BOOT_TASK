import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {
  MY_CHANNEL_LIST,
  TOGGLE_FOOTER_SETTINGS,
} from "../../store/constants/constant.js";
import ErrorBoundary from "../error/error-boundary";
import LoginRequired from "../../components/modals/loginRequired";
import FallBackComponent from "../../components/fallBackComponent.js";

export const PrivateRouteComponent = ({
  component: Component,
  isAuthenticated,
  authUser = null,
  setFooterSetting,
  isClient,
  isFreelancer = false,
  freelancerClientAuth,
  isPrivate,
  ...rest
}) => {
  const freelancerTypes = ["freelancer", "company", "agency"];

  const setFooter = (value) => {
    setFooterSetting(value);
  };

  useEffect(() => {
    if (authUser == null) {
      setFooter(false);
    } else {
      setFooter(true);
    }
    return function cleanup() {
      setFooter(true);
    };
  }, []);

  const checkAuthorities = (props) =>
    authUser ? (
      <ErrorBoundary>
        <Suspense fallback={<FallBackComponent />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    ) : (
      <></>
    );

  const renderRedirect = (props) => {
    let redirectURl = window.location.href.replace(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
      ""
    );
    if (authUser !== null) {
      if (isPrivate && isFreelancer && isClient) {
        if (
          freelancerClientAuth.freelancerAuth?.individualFreelancerId ||
          freelancerClientAuth.organizationAuth?.organizationId ||
          freelancerClientAuth.clientAuth?.clientId
        ) {
          return checkAuthorities(props);
        } else {
          if (sessionStorage.userType === "Client") {
            props.history.push("/client-registration");
          }
          if (sessionStorage.userType === "Freelancer") {
            props.history.push("/user-registration");
          }
        }
      } else if (isPrivate && isFreelancer && !isClient) {
        if (
          freelancerClientAuth.freelancerAuth?.individualFreelancerId ||
          freelancerClientAuth.organizationAuth?.organizationId
        ) {
          return checkAuthorities(props);
        } else {
          props.history.push("/user-registration");
        }
      } else if (isPrivate && !isFreelancer && isClient) {
        if (freelancerClientAuth.clientAuth?.clientId) {
          return checkAuthorities(props);
        } else {
          props.history.push("/client-registration");
        }
      } else if (isPrivate) {
        return checkAuthorities(props);
      }
    } else {
      localStorage.setItem(
        "startRegisterWith",
        sessionStorage.userType?.toLowerCase()
      );
      window.location.href = `https://www.syncbench.com/#/sign-in?callback=${redirectURl}&storeid=HOQF9I`;
    }
  };

  if (!Component)
    throw new Error(
      `A component needs to be specified for private route for path ${rest.path}`
    );

  return <Route {...rest} render={renderRedirect} />;
};

const mapStateToProps = (state) => ({
  authUser: state.authReducer?.myAuth,
  freelancerClientAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setFooterSetting: (value) =>
    dispatch({ type: TOGGLE_FOOTER_SETTINGS, data: value }),
});

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const PrivateRoute = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PrivateRouteComponent);

export default PrivateRoute;

import React, {Suspense} from "react";
import { Route } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import FallBackComponent from "../../components/fallBackComponent.js";

const LazyComponent = ({component: Component, isAuthenticated, authUser = null, isFreelancerOnly = false, ...rest}) => {

    const renderLazyComponent = props => {
        return(
            <Suspense fallback={<FallBackComponent />}>
                <Component {...props} />
            </Suspense>
        )
    }

    return <Route {...rest} render={renderLazyComponent} />;
};


const LazyRoute = withRouter(LazyComponent);

export default LazyRoute;

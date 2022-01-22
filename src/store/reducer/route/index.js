import { ROUTE_CONST } from "../../constants/constant";

const INITIAL_STATE = {
    activeRoute: "/",
};

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case ROUTE_CONST:
            return {
                ...states,
                activeRoute: action.payload,
            };

        default:
            return states;
    }
};

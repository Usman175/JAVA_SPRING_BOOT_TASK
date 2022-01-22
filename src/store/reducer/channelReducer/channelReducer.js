import { de } from "date-fns/locale";
import {SELECTED_CHANNEL, MY_CHANNEL_LIST} from "./../../constants/constant";

const INITIAL_STATE = {
    selectedChannel: {},
    myChannelList: []
};

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECTED_CHANNEL:
            return {
                ...states,
                selectedChannel: action.payload,
            };
            case  MY_CHANNEL_LIST:
                return {
                    ...states,
                    myChannelList: action.payload,
                };
        default:
            return states;
    }
};

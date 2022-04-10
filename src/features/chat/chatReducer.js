import { CLEAR_COMMENTS } from "../events/eventConstants";
import { LISTEN_TO_GROUP_CHAT, LISTEN_TO_SELECTED_GROUP } from "./chatContstants";

const initialState = {
  groups: [],
  comments: [],
  selectedGroup: null,
};

export default function groupReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LISTEN_TO_GROUP_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: payload,
      };
    default:
      return state;
  }
}
import { LISTEN_TO_EVENT_CHAT } from "../events/eventConstants";
import { LISTEN_TO_SELECTED_GROUP } from "./chatContstants";

//グループを表示
export function listenToSelectedGroups(group) {
  return {
    type: LISTEN_TO_SELECTED_GROUP,
    payload: group,
  };
}
// チャット機能
export function listenToGroupChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}
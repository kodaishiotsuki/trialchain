import {
  CLEAR_COMMENTS,
  CLEAR_EVENTS,
  CLEAR_SELECTED_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  RETAIN_STATE,
  SET_FILTER,
  SET_START_DATE,
  UPDATE_EVENT,
} from "./eventConstants";

const initialState = {
  events: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
  lastVisible: null,
  filter: "all",
  startDate: new Date(),
  retainState: false,
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload], //新規登録
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ], //更新
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };
    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events], //会社の情報を蓄積するため
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      };
    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true,
        lastVisible: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload,
      };
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}

// import { fetchSampleData } from "../../app/api/mockApi";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {
  CLEAR_EVENTS,
  CLEAR_SELECTED_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  SET_FILTER,
  SET_START_DATE,
  UPDATE_EVENT,
} from "./eventConstants";
import {
  dataFromSnapshot,
  fetchEventsFromFirestore,
} from "../../app/firestore/firestoreService";
import { getDocs } from "firebase/firestore";

//イベント表示（並び替え）
export function fetchEvents(filter, startDate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      // const events = await fetchSampleData();
      const snapshot = await getDocs(
        fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot)
      );
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_EVENTS,
        payload: { events, moreEvents, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

//フィルターをセット
export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearEvents()); //クリーンアップ
    dispatch({ type: SET_FILTER, payload: value });
  };
}
//日付をセット
export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearEvents()); //クリーンアップ
    dispatch({ type: SET_START_DATE, payload: date });
  };
}

//イベントを表示
export function listenToSelectedEvents(event) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
}

//イベントをクリア（新規入力時）
export function clearSelectedEvents() {
  return {
    type: CLEAR_SELECTED_EVENT,
  };
}

//イベント作成
export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}
//イベント更新
export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}
//イベント削除
export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
}
// チャット機能
export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}
//イベントクリーンアップ
export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  };
}

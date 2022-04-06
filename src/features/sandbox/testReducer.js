import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { delay } from "../../app/common/util/util";
import { toast } from "react-toastify";

//constants
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

//action
export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      // throw "oops";
      dispatch({ type: DECREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  };
}

//reducer
const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - payload,
      };
    default:
      return state;
  }
}

import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

// Define the reducer function with a name
function messageReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default messageReducer;

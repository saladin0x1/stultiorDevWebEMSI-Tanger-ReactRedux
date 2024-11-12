import { combineReducers } from "redux";
import { authReducer } from './auth';  // Named import
import message from "./message";

// Use the correct name for the auth reducer in combineReducers
export default combineReducers({
  auth: authReducer,  // Rename authReducer to 'auth' in the combined reducer
  message,
});

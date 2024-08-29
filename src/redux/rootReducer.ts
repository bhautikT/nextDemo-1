import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";

const combinedReducer = combineReducers({
  //defind all slice here
  signIn: authSlice,
  users: userSlice,
});

const rootReducer = (state: any, action: any) => {
  //when user logout
  if (action.type === "signin/logoutUser") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;

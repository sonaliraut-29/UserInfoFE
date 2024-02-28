import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import authReducer from "../features/auth/auth";

const reducer = combineReducers({
  auth: authReducer,
});
const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
export default store;

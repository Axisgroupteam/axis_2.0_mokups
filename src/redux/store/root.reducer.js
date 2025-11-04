import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/redux/slice/auth.slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

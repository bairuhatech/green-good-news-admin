import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./userslice";

const Slices = combineReducers({
  User: UserSlice,
});
export default Slices;
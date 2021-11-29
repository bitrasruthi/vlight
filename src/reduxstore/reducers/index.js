import { combineReducers } from "redux";
import employeeReducer from "./attReducer";
import attReducer from "./employeeReducer";
import leaveReducer from './leaveReducer';

export default function allReducers() {
  return combineReducers({
    getattlist: attReducer,
    getemployeelist: employeeReducer,
    getleavelist: leaveReducer
  });
}

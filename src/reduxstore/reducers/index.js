import { combineReducers } from "redux";
import employeeReducer from "./attReducer";
import attReducer from "./employeeReducer";
import leaveReducer from "./leaveReducer";
import empleaveReducer from "./../empleaveReducer";
import admemployeeReducer from "./adminattRecuder";
import hoildaysReducer from "./hoildaysReducer";
import terminatedReducer from "./terminatedReducer";

export default function allReducers() {
  return combineReducers({
    getattlist: attReducer,
    getemployeelist: employeeReducer,
    getleavelist: leaveReducer,
    getempleavelist: empleaveReducer,
    getademplist: admemployeeReducer,
    gethoildayslist:hoildaysReducer,
    getterminatedlist: terminatedReducer
  });
}

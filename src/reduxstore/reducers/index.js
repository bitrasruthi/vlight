import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import attReducer from "./attReducerr";
import leaveReducer from "./leaveReducer";
import empleaveReducer from "./../empleaveReducer";
import admemployeeReducer from "./adminattRecuder";
import hoildaysReducer from "./hoildaysReducer";
import terminatedReducer from "./terminatedReducer";
import hrsReducer from "./hrsReducer";


export default function allReducers() {
  return combineReducers({
    getattlist: attReducer,
    getemployeelist: employeeReducer,
    getleavelist: leaveReducer,
    getempleavelist: empleaveReducer,
    getademplist: admemployeeReducer,
    gethoildayslist:hoildaysReducer,
    getterminatedlist: terminatedReducer,
    getthrslist: hrsReducer
  });
}

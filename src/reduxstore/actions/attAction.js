import emp from "../../services/empservice";

import store from "../store/index";

export var GET_ATTENDANCE_LIST = "GET_ATTENDANCE_LIST";
export var GET_MOREATTENDANCE_LIST = "GET_MOREATTENDANCE_LIST";

async function get_attlist() {
  const jwt = await emp.getCurrentUser();

  const id = jwt.EmployeeId;
  const data = await emp.getAttendance(id);

  store.dispatch({
    type: GET_ATTENDANCE_LIST,
    payload: data.data.data,
  });
}
 export async function get_moreattlist() {

  // const jwt = await emp.getCurrentUser();

  // const id = jwt.EmployeeId;
  // const data = await emp.getAttendance(id);

  store.dispatch({
    type: GET_MOREATTENDANCE_LIST,
    payload: {
      "_id": "61a9fbf7f64da91dcd5b787e",
      "EmployeeId": "cg123",
      "EmployeeName": "Raghava",
      "inTime": "16:43",
      "outTime": "16:44",
      "organisation": "Codegene",
      "Date": "03/12/2021",
      "ADate": "2021-12-03T11:13:59.164Z",
      "__v": 0
  },
  });
}

export default get_attlist;

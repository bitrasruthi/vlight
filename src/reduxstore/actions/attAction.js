import emp from "../../services/empservice";

import store from "../store/index";

export var GET_ATTENDANCE_LIST = "GET_ATTENDANCE_LIST";

async function get_attlist() {
  const jwt = await emp.getCurrentUser();

  const id = jwt.EmployeeId;
  const data = await emp.getAttendance(id);

  store.dispatch({
    type: GET_ATTENDANCE_LIST,
    payload: data.data.data,
  });
}

export default get_attlist;

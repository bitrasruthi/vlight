import emp from "../../services/empservice";

import store from "../store/index";

export var GET_EMPATTENDANCE_LIST = "GET_EMPATTENDANCE_LIST";

async function get_empattlist(id) {
  const data = await emp.getAttendance(id);

  store.dispatch({
    type: GET_EMPATTENDANCE_LIST,
    payload: data.data.data,
  });
}

export default get_empattlist;

import emp from "../../services/empservice";

import store from "../store/index";

export var GET_EMPATTENDANCE_LIST = "GET_EMPATTENDANCE_LIST";
export var GET_MOREEMPATTENDANCE_LIST = "GET_MOREEMPATTENDANCE_LIST";

async function get_empattlist(id,skip) {
  const data = await emp.getAttendance(id,skip);

  store.dispatch({
    type: GET_EMPATTENDANCE_LIST,
    payload: data.data.data,
  });
}
 export async function get_moreempattlist(id,skip) {
  const data = await emp.getAttendance(id,skip);

  store.dispatch({
    type: GET_MOREEMPATTENDANCE_LIST,
    payload: data.data.data,
  });
}

export default get_empattlist;

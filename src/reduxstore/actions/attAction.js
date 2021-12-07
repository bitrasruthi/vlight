import emp from "../../services/empservice";

import store from "../store/index";

export var GET_ATTENDANCE_LIST = "GET_ATTENDANCE_LIST";
export var GET_MOREATTENDANCE_LIST = "GET_MOREATTENDANCE_LIST";

async function get_attlist(skip1) {
  console.log(skip1)
  const jwt = await emp.getCurrentUser();

  const id = jwt.EmployeeId;
  const data = await emp.getAttendance(id , skip1);

  store.dispatch({
    type: GET_ATTENDANCE_LIST,
    payload: data.data.data,
  });
}
 export async function get_moreattlist(skip1) {

  const jwt = await emp.getCurrentUser();
  
  const id = jwt.EmployeeId;
  const data = await emp.getAttendance(id , skip1);
    
  store.dispatch({
    type: GET_MOREATTENDANCE_LIST,
    payload: { data:data.data.data, skip:data.skip || skip1}
  });
}

export default get_attlist;

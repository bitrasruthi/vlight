import store from "../store/index";
import { getEmployees ,getProHrs} from "./../../services/userService";

export var GET_EMPLOYEE_LIST = "GET_EMPLOYEE_LIST";
export var GET_PROHRS_LIST = "GET_PROHRS_LIST";

async function get_employeelist() {
  const data = await getEmployees();

  store.dispatch({
    type: GET_EMPLOYEE_LIST,
    payload: data.data,
  });
}
 export async function get_hrslist() {
  const data = await getProHrs();

  store.dispatch({
    type: GET_PROHRS_LIST,
    payload: data
  });
}

export default get_employeelist;

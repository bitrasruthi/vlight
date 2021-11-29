import store from "../store/index";
import { getEmployees } from './../../services/userService';

export var GET_EMPLOYEE_LIST = "GET_EMPLOYEE_LIST";

async function get_employeelist() {
  const data = await getEmployees();
  console.log(data.data);
  store.dispatch({
    type: GET_EMPLOYEE_LIST,
    payload: data.data,
  });
}

export default get_employeelist;

import store from "../store/index";
import { getLeaves } from "./../../services/leaveService";

export var GET_LEAVE_LIST = "GET_LEAVE_LIST";

async function get_leavelist() {
  const data = await getLeaves();

  store.dispatch({
    type: GET_LEAVE_LIST,
    payload: data.data,
  });
}

export default get_leavelist;

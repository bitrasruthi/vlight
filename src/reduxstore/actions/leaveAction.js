import store from "../store/index";
import { getLeaves } from "./../../services/leaveService";

export var GET_LEAVE_LIST = "GET_LEAVE_LIST";
export var GET_MORELEAVE_LIST = "GET_MORELEAVE_LIST";

async function get_leavelist(skip) {
  const data = await getLeaves(skip);

  store.dispatch({
    type: GET_LEAVE_LIST,
    payload: data.data.data,
  });
}
export async function get_moreleavelist(skip1) {

  const data = await getLeaves(skip1);
    
  store.dispatch({
    type: GET_MORELEAVE_LIST,
    payload: { data:data.data.data, skip:data.skip || skip1}
  });
}

export default get_leavelist;

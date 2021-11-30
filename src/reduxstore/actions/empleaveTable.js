import store from "../store/index";
import { getempLeaves } from "./../../services/leaveService";

export var GET_EMPLEAVE_LIST = "GET_EMPLEAVE_LIST";

async function get_empleavelist() {
  const data = await getempLeaves();

  store.dispatch({
    type: GET_EMPLEAVE_LIST,
    payload: data.data,
  });
}

export default get_empleavelist;

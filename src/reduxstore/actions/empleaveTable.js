import store from "../store/index";
import { getempLeaves } from "./../../services/leaveService";

export var GET_EMPLEAVE_LIST = "GET_EMPLEAVE_LIST";
export var GET_MOREEMPLEAVE_LIST = "GET_MOREEMPLEAVE_LIST";

async function get_empleavelist(skip) {
  const data = await getempLeaves(skip);
  
  store.dispatch({
    type: GET_EMPLEAVE_LIST,
    payload: data.data,
  });
}

 export async function get_moreempleavelist(skip) {
   
  const data = await getempLeaves(skip);
  store.dispatch({
    type: GET_MOREEMPLEAVE_LIST,
    payload: { data:data, skip:data.skip || skip}
  });
}

export default get_empleavelist;

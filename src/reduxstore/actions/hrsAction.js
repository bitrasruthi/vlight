import store from "../store/index";

import { getProHrs } from '../../services/userService'

export var GET_HRS_LIST = "GET_HRS_LIST";

async function get_hrslist() {
  const data = await getProHrs();
   
  store.dispatch({
    type: GET_HRS_LIST,
    payload: data,
  });
}


export default get_hrslist;

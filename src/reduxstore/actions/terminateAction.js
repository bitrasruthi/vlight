import emp from "../../services/empservice";

import store from "../store/index";
import { getTerminateEmpDetails } from 'services/terminateService';

export var GET_TERMINATED_LIST = "GET_TERMINATED_LIST";

async function get_termlist() {
    const data = await getTerminateEmpDetails();
    console.log(data);
    store.dispatch({
        type: GET_TERMINATED_LIST,
        payload: data.data
    });
}


export default get_termlist;

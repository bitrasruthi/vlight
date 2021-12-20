import { getTerminateEmpDetails } from 'services/terminateService';

import store from "../store/index";

export var GET_TERMINATED_LIST = "GET_TERMINATED_LIST";
export var GET_MORETERMINATED_LIST = "GET_MORETERMINATED_LIST";
export var SAVE_SKIP_LIST = "SAVE_SKIP_LIST";

async function get_termlist(skip1) {
    const data = await getTerminateEmpDetails(skip1);
    console.log(data);
    store.dispatch({
        type: GET_TERMINATED_LIST,
        payload: data.data
    });
}
export async function get_moretermlist(skip1) {
    const data = await getTerminateEmpDetails(skip1);

    store.dispatch({
        type: GET_MORETERMINATED_LIST,
        payload: { data:data.data.data, skip:skip1}
    });
}
export async function saveskip(i) {
    store.dispatch({
        type: SAVE_SKIP_LIST,
        payload: {skip:i }
    });
}


export default get_termlist;

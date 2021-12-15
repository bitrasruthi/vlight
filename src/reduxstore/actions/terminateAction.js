import { getTerminateEmpDetails } from 'services/terminateService';

import store from "../store/index";

export var GET_TERMINATED_LIST = "GET_TERMINATED_LIST";
export var GET_MORETERMINATED_LIST = "GET_MORETERMINATED_LIST";

async function get_termlist(skip1) {
    const data = await getTerminateEmpDetails(skip1);
    console.log(data);
    store.dispatch({
        type: GET_TERMINATED_LIST,
        payload: data.data
    });
}
export async function get_moretermlist(skip) {
    const data = await getTerminateEmpDetails(skip);

    store.dispatch({
        type: GET_MORETERMINATED_LIST,
        payload: data.data.data
    });
}


export default get_termlist;

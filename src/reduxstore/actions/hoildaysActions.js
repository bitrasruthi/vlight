import emp from "../../services/empservice";
import { getholidays} from '../../services/settings'
import store from "../store/index";

export var GET_HOILDAYS_LIST = "GET_HOILDAYS_LIST";

async function get_hoildays() {
  const jwt = await emp.getCurrentUser();

  const id = jwt.organisation;

  const data = await getholidays(id);
 
  store.dispatch({
    type: GET_HOILDAYS_LIST,
    payload: data.data.data,
  });
}

export default  get_hoildays;

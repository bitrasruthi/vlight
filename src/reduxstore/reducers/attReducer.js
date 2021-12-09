import { GET_EMPLOYEE_LIST ,GET_PROHRS_LIST} from "../actions/employeeAction";

const employeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLOYEE_LIST:
      return payload;
    case GET_PROHRS_LIST:
      state.hrs = payload
      return state;
    default:
      return state;
  }
};

export default employeeReducer;

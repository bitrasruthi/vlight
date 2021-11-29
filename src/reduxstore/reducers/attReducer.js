import { GET_EMPLOYEE_LIST } from "../actions/employeeAction";

const employeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLOYEE_LIST:
      console.log(payload);
      return payload;
    default:
      return state;
  }
};

export default employeeReducer;

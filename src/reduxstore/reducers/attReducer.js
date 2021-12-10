import { GET_EMPLOYEE_LIST ,GET_PROHRS_LIST,GET_MOREEMPLOYEE_LIST} from "../actions/employeeAction";

const employeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLOYEE_LIST:
      return payload;
    case GET_MOREEMPLOYEE_LIST:
      payload.data.forEach(element => {
        state.push(element)
      }); 
      state.skip = payload.skip
      
      return state;
    case GET_PROHRS_LIST:
      state.hrs = payload
      return state;
    default:
      return state;
  }
};

export default employeeReducer;

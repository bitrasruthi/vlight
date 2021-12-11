import { GET_EMPLOYEE_LIST ,GET_PROHRS_LIST,GET_MOREEMPLOYEE_LIST} from "../actions/employeeAction";

const employeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLOYEE_LIST:
      console.log(payload)
      return payload;
    
      case GET_MOREEMPLOYEE_LIST: 

        const gg = payload.data.data
        console.log('sai',gg)
      gg.forEach(element => {
        state.data.push(element)
      }); 
      state.skip = payload.skip
      console.log(state)
      return state;

    default:
      return state;
  }
};

export default employeeReducer;

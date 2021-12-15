import { GET_TERMINATED_LIST,GET_MORETERMINATED_LIST } from "../actions/terminateAction";

const terminatedReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_TERMINATED_LIST:
      return payload;

    case GET_TERMINATED_LIST:
      payload.forEach(element => {
        state.push(element)
      });
      return state;

      case GET_MORETERMINATED_LIST:
        
        payload.forEach(element => {
          state.data.push(element)
        }); 
        state.skip = payload.skip
        console.log(state)
        return state;
    default:
      return state;
  }
};

export default terminatedReducer;

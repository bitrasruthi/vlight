import { GET_TERMINATED_LIST,GET_MORETERMINATED_LIST,SAVE_SKIP_LIST } from "../actions/terminateAction";

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
        console.log(payload)
        payload.data.forEach(element => {
          state.data.push(element)
        }); 

        state.skip = payload.skip
        console.log(state)
        return state;
      case SAVE_SKIP_LIST:
        if(state === null){ 
          return state;
        }
        state.skip = payload.skip
        console.log(state)
        return state;
    default:
      return state;
  }
};

export default terminatedReducer;

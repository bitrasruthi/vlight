import { GET_TERMINATED_LIST } from "../actions/terminateAction";

const terminatedReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_TERMINATED_LIST:
      return payload;
    case GET_TERMINATED_LIST:
      payload.forEach(element => {
        state.push(element)
      });
      return state;
    default:
      return state;
  }
};

export default terminatedReducer;

import { GET_LEAVE_LIST ,GET_MORELEAVE_LIST} from "../actions/leaveAction";

const leaveReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_LEAVE_LIST:
      return payload;
    case GET_MORELEAVE_LIST:
      payload.data.forEach(element => {
        state.push(element)
      }); 
      state.skip = payload.skip
      console.log(state)
      return state;
    default:
      return state;
  }
};

export default leaveReducer;

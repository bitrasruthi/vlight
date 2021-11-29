import { GET_LEAVE_LIST } from "../actions/leaveAction";

const leaveReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_LEAVE_LIST:
      return payload;
    default:
      return state;
  }
};

export default leaveReducer;

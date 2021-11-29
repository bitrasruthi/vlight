import { GET_ATTENDANCE_LIST } from "../actions/attAction";

const attReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_ATTENDANCE_LIST:
      return payload;
    default:
      return state;
  }
};

export default attReducer;

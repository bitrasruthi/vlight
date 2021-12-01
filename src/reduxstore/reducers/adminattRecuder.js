import { GET_EMPATTENDANCE_LIST } from "../actions/adminattAction";

const admemployeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPATTENDANCE_LIST:
      return payload;
    default:
      return state;
  }
};

export default admemployeeReducer;

import { GET_EMPATTENDANCE_LIST } from "../actions/adminattAction";

const admemployeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPATTENDANCE_LIST:
      console.log(payload);
      return payload;
    default:
      return state;
  }
};

export default admemployeeReducer;

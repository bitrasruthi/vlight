import { GET_EMPATTENDANCE_LIST , GET_MOREEMPATTENDANCE_LIST } from "../actions/adminattAction";

const admemployeeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPATTENDANCE_LIST:
      return payload;
    case GET_MOREEMPATTENDANCE_LIST:
      payload.forEach(element => {
        state.push(element)
      });
      return state;
    default:
      return state;
  }
};

export default admemployeeReducer;

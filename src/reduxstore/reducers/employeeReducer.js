import { GET_ATTENDANCE_LIST,GET_MOREATTENDANCE_LIST } from "../actions/attAction";

const attReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_ATTENDANCE_LIST:
      return payload;

    case GET_MOREATTENDANCE_LIST:
      payload.forEach(element => {
        state.push(element)
      });
      return state;
    default:
      return state;
  }
};

export default attReducer;

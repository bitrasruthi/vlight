import { GET_EMPLEAVE_LIST } from "../reduxstore/actions/empleaveTable";

const empleaveReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLEAVE_LIST:
      return payload;
    default:
      return state;
  }
};

export default empleaveReducer;

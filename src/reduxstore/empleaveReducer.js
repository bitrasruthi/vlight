import { GET_EMPLEAVE_LIST,GET_MOREEMPLEAVE_LIST } from "../reduxstore/actions/empleaveTable";

const empleaveReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLEAVE_LIST:
      return payload;

    case GET_MOREEMPLEAVE_LIST:
      
      payload.forEach(element => {
        state.push(element)
      });
      return state;
    default:
      return state;
  }
};

export default empleaveReducer;

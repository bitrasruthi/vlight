import { GET_EMPLEAVE_LIST,GET_MOREEMPLEAVE_LIST } from "../reduxstore/actions/empleaveTable";

const empleaveReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_EMPLEAVE_LIST:
      
      return payload;

    case GET_MOREEMPLEAVE_LIST:
      console.log(payload.data.data.data)
      payload.data.data.data.forEach(element => {
        state.data.push(element)
      }); 
      console.log(state)
      state.skip = payload.skip
      return state;

    default:
      return state;
  }
};

export default empleaveReducer;

import { GET_HOILDAYS_LIST } from "../actions/hoildaysActions"

const hoildaysReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_HOILDAYS_LIST:
      
      return payload;
    default:
      return state;
  }
};

export default hoildaysReducer;

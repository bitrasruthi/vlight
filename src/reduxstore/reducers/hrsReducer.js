import { GET_HRS_LIST } from "../actions/hrsAction";

const hrsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_HRS_LIST:
    
      return payload;
    default:
      return state;
  }
};

export default hrsReducer;

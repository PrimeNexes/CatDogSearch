import { DATA_AVAILABLE } from './action';

export const initialState = {data: []};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      return {...state, data: action.payload};
    default:
      return state;
  }
};

export default reducer;
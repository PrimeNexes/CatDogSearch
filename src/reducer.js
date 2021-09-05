import { DATA_AVAILABLE } from './action';
export const initialState = {data: [],counter: 5};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      return {...state, data: action.payload};
    case 'INCREMENT_COUNTER': 
       return {...state, counter: action.counter};
    default:
      return state;
  }
};

export default reducer;
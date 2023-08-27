import {CALCULATE, CALCULATE_ERR, DELETE} from './action';

const initial = {
  woods: [],
};

export const calculateReducer = (state = initial, action) => {
  switch (action.type) {
    case CALCULATE:
      return {
        ...state,
        woods: [action.payload, ...state.woods],
      };
    case CALCULATE_ERR:
      return {
        ...state,
        err: action.payload,
      };
    case DELETE:
      let woods = state.woods;
      woods.splice(action.payload, 1);
      return {
        ...state,
        woods,
      };

    default:
      return {
        ...state,
      };
  }
};

import { CALCULATE, CALCULATE_ERR } from "./action";

export const calculateReducer = (state = {},action) => {
  switch (action.type) {
    case CALCULATE:
      return {
        ...state,
        volume: action.payload.volume,
        summ:action.payload.summ,
        num:action.payload.num
      }
    case CALCULATE_ERR:
      return{
      ...state,
      volume:[],
      err:action.payload
    }
  
    default: 
      return {
        state
      }
  }
}
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  calculateReducer
} from "./reducer";

const rootReducer = combineReducers({
  calculateReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

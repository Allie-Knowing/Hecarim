import { combineReducers } from "redux";
import signinReducer from "./signin";

const rootReducer = combineReducers({ signin: signinReducer });

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like/interface";
import signinReducer from "./signin";

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

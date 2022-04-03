import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like";
import signinReducer from "./signin";
import textAnswerReducer from "./textAnswer";

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
  textAnswer: textAnswerReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like";
import profileReducer from "./profile";
import signinReducer from "./signin";

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
  profile: profileReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

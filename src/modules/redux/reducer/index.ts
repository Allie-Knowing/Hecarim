import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like";
import myIdReducer from "./myId";
import profileReducer from "./profile";
import signinReducer from "./signin";

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
  profile: profileReducer,
  myId: myIdReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

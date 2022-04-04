import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like";
import signinReducer from "./signin";
import textAnswerReducer from "./textAnswer";
import cameraReducer from "./camera";

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
  textAnswer: textAnswerReducer,
  camera: cameraReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

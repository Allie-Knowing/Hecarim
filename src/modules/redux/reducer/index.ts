import { combineReducers } from "redux";
import feedReducer from "./feed";
import likeReducer from "./like";
import myIdReducer from "./myId";
import profileReducer from "./profile";
import signinReducer from "./signin";
import textAnswerReducer from "./textAnswer";
import cameraReducer from "./camera";
import answerReducer from './answer';
import searchReducer from './search';

const rootReducer = combineReducers({
  feed: feedReducer,
  signin: signinReducer,
  like: likeReducer,
  profile: profileReducer,
  myId: myIdReducer,
  textAnswer: textAnswerReducer,
  camera: cameraReducer,
  signin: signinReducer,
  search: searchReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

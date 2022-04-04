import { combineReducers } from "redux";
import likeReducer from "./like";
import myIdReducer from "./myId";
import profileReducer from "./profile";
import signinReducer from "./signin";
import textAnswerReducer from "./textAnswer";
// import cameraReducer from "./camera";
import answerReducer from "./answer";
import searchReducer from "./search";

const rootReducer = combineReducers({
  signin: signinReducer,
  like: likeReducer,
  profile: profileReducer,
  myId: myIdReducer,
  textAnswer: textAnswerReducer,
  // camera: cameraReducer,
  answer: answerReducer,
  search: searchReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

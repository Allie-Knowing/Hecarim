import { combineReducers } from "redux";
import likeReducer from "./like";
import myIdReducer from "./myId";
import profileReducer from "./profile";
import signinReducer from "./signin";
import textAnswerReducer from "./textAnswer";
import videoUrlReducer from "./videoUrl";
import answerReducer from "./answer";
import searchReducer from "./search";
import stackedQuestionReducer from "./stackedQuestionList";
import videoDataReducer from "./videoData";

const rootReducer = combineReducers({
  signin: signinReducer,
  like: likeReducer,
  profile: profileReducer,
  myId: myIdReducer,
  textAnswer: textAnswerReducer,
  videoUrl: videoUrlReducer,
  answer: answerReducer,
  search: searchReducer,
});

export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

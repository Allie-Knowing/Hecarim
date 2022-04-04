import { combineReducers } from 'redux';
import answerReducer from './answer';
import signinReducer from './signin';
import searchReducer from './search';

const rootReducer = combineReducers({
  answer: answerReducer,
  signin: signinReducer,
  search: searchReducer,
});
export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from 'redux';
import feedReducer from './feed';

const rootReducer = combineReducers({
    feed: feedReducer,
});
  
const rootReducer = combineReducers({ signin: signinReducer });
export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from 'redux';
import feedReducer from './feed';

const rootReducer = combineReducers({
    feed: feedReducer,
});
  
export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
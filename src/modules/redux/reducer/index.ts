import { combineReducers } from 'redux';
import feedReducer from './feed';
import signinReducer from './signin';

const rootReducer = combineReducers({
    feed: feedReducer,
    signin: signinReducer
});
export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

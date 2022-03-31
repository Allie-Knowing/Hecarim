import { combineReducers } from 'redux';

const rootReducer = combineReducers({});
  
export type reducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
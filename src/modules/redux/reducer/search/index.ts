import { SearchState } from "./interface";
import { searchActionType } from "modules/redux/action/search";
import { 
  GET_AUTO_COMPLETE_SUCCESS,
  GET_AUTO_COMPLETE_FAILURE
} from "modules/redux/action/search/interface";

const initState: SearchState = {
  searchAutoComplete: {
    data: []
  },
  error: {
    status: 0,
    message: '',
    type: '',
  }
}

const searchReducer = (
  state: SearchState = initState,
  action: searchActionType
): SearchState => {
  switch (action.type) {
    case GET_AUTO_COMPLETE_SUCCESS: 
      return {
        ...state,
        searchAutoComplete: {
          data: action.payload.data
        }
      }
    case GET_AUTO_COMPLETE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer;
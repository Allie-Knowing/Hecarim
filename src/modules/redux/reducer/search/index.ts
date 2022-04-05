import { SearchState } from "./interface";
import { searchActionType } from "modules/redux/action/search";
import { 
  GET_TITLE_SEARCH_SUCCESS,
  GET_TITLE_SEARCH_FAILURE
} from "modules/redux/action/search/interface";

const initState: SearchState = {
  searchTitle: {
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
    case GET_TITLE_SEARCH_SUCCESS: 
      return {
        ...state,
        searchTitle: {
          data: action.payload.data
        }
      }
    case GET_TITLE_SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer;
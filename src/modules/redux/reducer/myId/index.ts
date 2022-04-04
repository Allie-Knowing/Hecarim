import { myIdActionType } from "modules/redux/action/myId";
import {
  GET_MY_ID_SUCCESS,
  GET_MY_ID_FAILURE,
  SET_ID,
  GET_MY_ID,
} from "modules/redux/action/myId/interface";
import MyIdState from "./interface";

const initState: MyIdState = {
  error: {
    status: 0,
    message: "",
    type: "",
  },
  id: 0,
};

const myIdReducer = (
  state: MyIdState = initState,
  action: myIdActionType
): MyIdState => {
  switch (action.type) {
    case GET_MY_ID_SUCCESS:
      return {
        ...state,
        id: action.payload.userId,
      };
    case GET_MY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default myIdReducer;

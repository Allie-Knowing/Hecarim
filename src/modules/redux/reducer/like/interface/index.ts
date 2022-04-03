import { likeActionType } from "modules/redux/action/like";
import {
  DELETE_LIKE_FAILURE,
  DELETE_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  POST_LIKE_SUCCESS,
} from "modules/redux/action/like/interface";
import { LikeState } from "..";

const initState: LikeState = {
  body: {
    data: { message: "" },
  },
  error: {
    status: 0,
    message: "",
    type: "",
  },
};

const likeReducer = (
  state: LikeState = initState,
  action: likeActionType
): LikeState => {
  switch (action.type) {
    case POST_LIKE_SUCCESS:
      return { ...state, body: { data: action.payload.data } };
    case POST_LIKE_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_LIKE_SUCCESS:
      return { ...state, body: { data: action.payload.data } };
    case DELETE_LIKE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default likeReducer;

import { likeActionType } from "modules/redux/action/like";
import {
  DELETE_LIKE,
  DELETE_LIKE_FAILURE,
  DELETE_LIKE_SUCCESS,
  POST_LIKE,
  POST_LIKE_FAILURE,
  POST_LIKE_SUCCESS,
} from "modules/redux/action/like/interface";
import { LikeState } from "./interface";

const initState: LikeState = {
  likeRequest: { videoId: -1 },
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
    case POST_LIKE:
      return { ...state, likeRequest: action.payload };
    case POST_LIKE_SUCCESS:
      return { ...state };
    case POST_LIKE_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_LIKE:
      return { ...state, likeRequest: action.payload };
    case DELETE_LIKE_SUCCESS:
      return { ...state };
    case DELETE_LIKE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default likeReducer;

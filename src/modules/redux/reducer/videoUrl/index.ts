import { GET_VIDEO_URL, GET_VIDEO_URL_SUCCESS, GET_VIDEO_URL_FAILURE } from "modules/redux/action/videoUrl/interface";
import { getVideoUrlActionType } from "modules/redux/action/videoUrl";
import { VideoState } from "./interface";

const initState: VideoState = {
  postVideoRequest: {
    type: "question",
    file: "",
  },
  postVideoResponse: {
    uri: "",
  },
  error: {
    status: 0,
    message: "",
    type: "",
  },
};

const videoUrlReducer = (state: VideoState = initState, action: getVideoUrlActionType): VideoState => {
  switch (action.type) {
    case GET_VIDEO_URL:
      return {
        ...state,
        postVideoRequest: {
          type: action.payload.type,
          file: action.payload.file,
        },
      };
    case GET_VIDEO_URL_SUCCESS:
      return {
        ...state,
        postVideoResponse: {
          uri: action.payload.uri,
        },
      };
    case GET_VIDEO_URL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoUrlReducer;

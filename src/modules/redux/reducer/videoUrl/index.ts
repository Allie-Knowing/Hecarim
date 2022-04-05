import {
  GET_VIDEO_URL,
  GET_VIDEO_URL_SUCCESS,
  GET_VIDEO_URL_FAILURE,
} from "modules/redux/action/videoUrl/interface";
import { getVideoUrlActionType } from "modules/redux/action/videoUrl";
import { VideoUrlState } from "./interface";

const initState: VideoUrlState = {
  getVideoUrlRequest: {
    type: "question",
    file: "",
  },
  getVideoUrlResponse: {
    data: {
      url: "",
    },
  },
  error: {
    status: 0,
    message: "",
    type: "",
  },
};

const videoUrlReducer = (
  state: VideoUrlState = initState,
  action: getVideoUrlActionType
): VideoUrlState => {
  switch (action.type) {
    case GET_VIDEO_URL:
      return {
        ...state,
        getVideoUrlRequest: {
          type: action.payload.type,
          file: action.payload.file,
        },
      };
    case GET_VIDEO_URL_SUCCESS:
      return {
        ...state,
        getVideoUrlResponse: {
          data: {
            url: action.payload.data.url,
          },
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

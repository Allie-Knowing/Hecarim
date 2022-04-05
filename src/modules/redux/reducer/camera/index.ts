import {
  POST_VIDEO_UPLOAD,
  POST_VIDEO_UPLOAD_SUCCESS,
  POST_VIDEO_UPLOAD_FAILURE,
} from "modules/redux/action/camera/interface";
import { cameraActionType } from "modules/redux/action/camera";
import { VideoState } from "./interface";

const initState: VideoState = {
  postVideoRequest: {
    file: "",
  },
  postVideoResponse: {
    uri: "",
  },
  error: {
    statuscode: 0,
    message: "",
    type: "",
  },
};

const cameraReducer = (state: VideoState = initState, action: cameraActionType): VideoState => {
  switch (action.type) {
    case POST_VIDEO_UPLOAD:
      return {
        ...state,
        postVideoRequest: {
          file: action.payload.file,
        },
      };
    case POST_VIDEO_UPLOAD_SUCCESS:
      return {
        ...state,
        postVideoResponse: {
          uri: action.payload.uri,
        },
      };
    case POST_VIDEO_UPLOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  }
};

export default cameraReducer;

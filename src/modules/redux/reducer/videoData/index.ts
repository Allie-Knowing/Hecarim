import {
  POST_QUESTION_VIDEO_DATA,
  POST_QUESTION_VIDEO_DATA_FAILURE,
  POST_ANSWER_VIDEO_DATA,
  POST_ANSWER_VIDEO_DATA_FAILURE,
} from "modules/redux/action/videoData/interface";
import { postVideoDataActionType } from "modules/redux/action/videoData";
import { QuestionVideoDataState } from "./interface";

const initState: QuestionVideoDataState = {
  postQuestionVideoDataRequest: {
    title: "",
    description: "",
    hash_tag: [],
    video_url: "",
  },
  postAnswerVideoDataRequest: {
    title: "",
    video_url: "",
  },
  error: {
    status: 0,
    message: "",
    type: "",
  },
};

const videoDataReducer = (
  state: QuestionVideoDataState = initState,
  action: postVideoDataActionType
) => {
  switch (action.type) {
    case POST_QUESTION_VIDEO_DATA:
      return {
        ...state,
        postQuestionVideoDataRequest: {
          title: action.payload.title,
          description: action.payload.description,
          hash_tag: action.payload.hash_tag,
          video_url: action.payload.video_url,
        },
      };
    case POST_QUESTION_VIDEO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case POST_ANSWER_VIDEO_DATA:
      return {
        ...state,
        postAnswerVideoDataRequest: {
          title: action.payload.title,
          video_url: action.payload.video_url,
        },
      };
    case POST_ANSWER_VIDEO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoDataReducer;

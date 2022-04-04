import { GET_VIDEO_ANSWER_LIST_SUCCESS, GET_VIDEO_ANSWER_LIST_FAILURE } from "modules/redux/action/answer/interface";
import { answerState } from "./interface";
import { answerActionType } from "modules/redux/action/answer";

const initState: answerState = {
  videoAnswerList: {
    data: [],
  },
  error: {
    status: 0,
    message: "",
    type: "",
  },
};

const answerReducer = (state: answerState = initState, action: answerActionType): answerState => {
  switch (action.type) {
    case GET_VIDEO_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        videoAnswerList: {
          data: action.payload.data,
        },
      };
    case GET_VIDEO_ANSWER_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default answerReducer;

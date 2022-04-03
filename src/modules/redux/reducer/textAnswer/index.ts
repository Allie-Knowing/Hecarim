import { textAnswerActionType } from "modules/redux/action/textAnswer";
import {
  DELETE_TEXT_ANSWER,
  DELETE_TEXT_ANSWER_FAILURE,
  DELETE_TEXT_ANSWER_SUCCESS,
  GET_TEXT_ANSWER,
  GET_TEXT_ANSWER_FAILURE,
  GET_TEXT_ANSWER_SUCCESS,
  POST_TEXT_ANSWER,
  POST_TEXT_ANSWER_FAILURE,
  POST_TEXT_ANSWER_SUCCESS,
} from "modules/redux/action/textAnswer/interface";
import { TextAnswerState } from "./interface";

const initState: TextAnswerState = {
  getTextAnswerRequest: {},
  deleteTextAnswerRequest: {},
  getTextAnswerResponse: {},
  postTextAnswerRequest: {},
  error: { status: 0, message: "", type: "" },
};

const textAnswerReducer = (
  state: TextAnswerState = initState,
  action: textAnswerActionType
): TextAnswerState => {
  switch (action.type) {
    case GET_TEXT_ANSWER:
      return { ...state, getTextAnswerRequest: action.payload };
    case GET_TEXT_ANSWER_SUCCESS:
      return { ...state, getTextAnswerResponse: action.payload };
    case POST_TEXT_ANSWER:
      return { ...state, postTextAnswerRequest: action.payload };
    case DELETE_TEXT_ANSWER:
      return { ...state, deleteTextAnswerRequest: action.payload };
    case POST_TEXT_ANSWER_SUCCESS:
    case DELETE_TEXT_ANSWER_SUCCESS:
      return state;
    case GET_TEXT_ANSWER_FAILURE:
    case POST_TEXT_ANSWER_FAILURE:
    case DELETE_TEXT_ANSWER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default textAnswerReducer;

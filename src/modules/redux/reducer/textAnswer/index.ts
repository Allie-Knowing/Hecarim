import { textAnswerActionType } from "modules/redux/action/textAnswer";
import {
  DELETE_TEXT_ANSWER,
  DELETE_TEXT_ANSWER_FAILURE,
  DELETE_TEXT_ANSWER_SUCCESS,
  GET_TEXT_ANSWER_LIST,
  GET_TEXT_ANSWER_LIST_FAILURE,
  GET_TEXT_ANSWER_LIST_SUCCESS,
  POST_TEXT_ANSWER,
  POST_TEXT_ANSWER_FAILURE,
  POST_TEXT_ANSWER_SUCCESS,
  RESET_TEXT_ANSWER_LIST,
} from "modules/redux/action/textAnswer/interface";
import { TextAnswerState } from "./interface";

const initState: TextAnswerState = {
  getTextAnswerListRequest: {},
  deleteTextAnswerRequest: {},
  getTextAnswerListResponse: {},
  postTextAnswerRequest: {},
  error: { statuscode: 0, message: "", type: "" },
};

const textAnswerReducer = (
  state: TextAnswerState = initState,
  action: textAnswerActionType
): TextAnswerState => {
  switch (action.type) {
    case GET_TEXT_ANSWER_LIST:
      return { ...state, getTextAnswerListRequest: action.payload };
    case GET_TEXT_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        getTextAnswerListResponse: {
          data: [
            ...(state.getTextAnswerListResponse.data || []),
            ...action.payload.data,
          ],
        },
      };
    case RESET_TEXT_ANSWER_LIST:
      return {
        ...state,
        getTextAnswerListResponse: {},
        error: {
          statuscode: 0,
          message: "",
          type: "",
        },
      };
    case POST_TEXT_ANSWER:
      return { ...state, postTextAnswerRequest: action.payload };
    case DELETE_TEXT_ANSWER:
      return { ...state, deleteTextAnswerRequest: action.payload };
    case POST_TEXT_ANSWER_SUCCESS:
    case DELETE_TEXT_ANSWER_SUCCESS:
      return state;
    case GET_TEXT_ANSWER_LIST_FAILURE:
    case POST_TEXT_ANSWER_FAILURE:
    case DELETE_TEXT_ANSWER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default textAnswerReducer;

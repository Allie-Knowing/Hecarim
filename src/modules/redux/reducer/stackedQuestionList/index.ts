import { stackedQuestionListActionType } from "modules/redux/action/stackedQuestionList";
import {
  GET_STACKED_QUESTION_LIST,
  POST_STACKED_QUESTION_LIST,
} from "modules/redux/action/stackedQuestionList/interface";
import { StackedQuestionListState } from "./interface";

const initalState: StackedQuestionListState = {
  getStackedQuestionList: {},
  postStackedQuestionList: {},
};

const stackedQuestionReducer = (
  state: StackedQuestionListState = initalState,
  action: stackedQuestionListActionType
): StackedQuestionListState => {
  switch (action.type) {
    case GET_STACKED_QUESTION_LIST:
      return { ...state, getStackedQuestionList: action.payload };
    case POST_STACKED_QUESTION_LIST:
      return { ...state, postStackedQuestionList: action.payload };
    default:
      return state;
  }
};

export default stackedQuestionReducer;

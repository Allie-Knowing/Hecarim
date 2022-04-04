import { stackedQuestionListActionType } from "modules/redux/action/stackedQuestionList";
import { POST_STACKED_QUESTION_LIST } from "modules/redux/action/stackedQuestionList/interface";
import { StackedQuestionListState } from "./interface";

const initalState: StackedQuestionListState = {
  stackedQuestionList: [],
};

const stackedQuestionReducer = (
  state: StackedQuestionListState = initalState,
  action: stackedQuestionListActionType
): StackedQuestionListState => {
  switch (action.type) {
    case POST_STACKED_QUESTION_LIST:
      return {
        ...state,
        stackedQuestionList: action.payload.stackedQuestionList,
      };
    default:
      return state;
  }
};

export default stackedQuestionReducer;

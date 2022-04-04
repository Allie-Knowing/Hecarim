import { StackedQuestionListState } from "modules/redux/reducer/stackedQuestionList/interface";
import { createAction } from "typesafe-actions";
import { POST_STACKED_QUESTION_LIST } from "./interface";

export const postStackedQuestionList = createAction(
  POST_STACKED_QUESTION_LIST
)<StackedQuestionListState>();

export type stackedQuestionListActionType = ReturnType<
  typeof postStackedQuestionList
>;

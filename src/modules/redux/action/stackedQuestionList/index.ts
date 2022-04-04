import { createAction } from "typesafe-actions";
import {
  GET_STACKED_QUESTION_LIST,
  POST_STACKED_QUESTION_LIST,
} from "./interface";
import { getStackedQuestionListResponse } from "../../../dto/response/getStackedQuestionListResponse";
import { postStackedQuestionListRequest } from "../../../dto/request/postStackedQuestionListRequest";

export const getStackedQuestionList = createAction(
  GET_STACKED_QUESTION_LIST
)<getStackedQuestionListResponse>();
export const postStackedQuestionList = createAction(
  POST_STACKED_QUESTION_LIST
)<postStackedQuestionListRequest>();

export type stackedQuestionListActionType =
  | ReturnType<typeof getStackedQuestionList>
  | ReturnType<typeof postStackedQuestionList>;

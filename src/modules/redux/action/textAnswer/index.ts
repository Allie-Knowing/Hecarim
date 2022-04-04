import { error } from "modules/dto/error";
import { deleteTextAnswerRequest, getTextAnswerListRequest, postTextAnswerRequest } from "modules/dto/request/textAnswerRequest";
import { getTextAnswerListResponse } from "modules/dto/response/textAnswerResponse";
import { createAction } from "typesafe-actions";
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
} from "./interface";

export const getTextAnswerList = createAction(GET_TEXT_ANSWER_LIST)<getTextAnswerListRequest>();
export const getTextAnswerListSuccess = createAction(GET_TEXT_ANSWER_LIST_SUCCESS)<getTextAnswerListResponse>();
export const getTextAnswerListFailure = createAction(GET_TEXT_ANSWER_LIST_FAILURE)<error>();

export const postTextAnswer = createAction(POST_TEXT_ANSWER)<postTextAnswerRequest>();
export const postTextAnswerSuccess = createAction(POST_TEXT_ANSWER_SUCCESS)();
export const postTextAnswerFailure = createAction(POST_TEXT_ANSWER_FAILURE)<error>();

export const deleteTextAnswer = createAction(DELETE_TEXT_ANSWER)<deleteTextAnswerRequest>();
export const deleteTextAnswerSuccess = createAction(DELETE_TEXT_ANSWER_SUCCESS)();
export const deleteTextAnswerFailure = createAction(DELETE_TEXT_ANSWER_FAILURE)<error>();

export type textAnswerActionType =
  | ReturnType<typeof getTextAnswerList>
  | ReturnType<typeof getTextAnswerListSuccess>
  | ReturnType<typeof getTextAnswerListFailure>
  | ReturnType<typeof postTextAnswer>
  | ReturnType<typeof postTextAnswerSuccess>
  | ReturnType<typeof postTextAnswerFailure>
  | ReturnType<typeof deleteTextAnswer>
  | ReturnType<typeof deleteTextAnswerSuccess>
  | ReturnType<typeof deleteTextAnswerFailure>;

import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions/dist/deprecated/create-action";
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
} from "./interface";

export const getTextAnswer = createAction(GET_TEXT_ANSWER)();
export const getTextAnswerSuccess = createAction(GET_TEXT_ANSWER_SUCCESS)();
export const getTextAnswerFailure = createAction(GET_TEXT_ANSWER_FAILURE)<error>();

export const postTextAnswer = createAction(POST_TEXT_ANSWER)();
export const postTextAnswerSuccess = createAction(POST_TEXT_ANSWER_SUCCESS)();
export const postTextAnswerFailure = createAction(POST_TEXT_ANSWER_FAILURE)<error>();

export const deleteTextAnswer = createAction(DELETE_TEXT_ANSWER)();
export const deleteTextAnswerSuccess = createAction(DELETE_TEXT_ANSWER_SUCCESS)();
export const deleteTextAnswerFailure = createAction(DELETE_TEXT_ANSWER_FAILURE)<error>();

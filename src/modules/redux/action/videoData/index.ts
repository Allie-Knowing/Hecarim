import {
  POST_QUESTION_VIDEO_DATA,
  POST_QUESTION_VIDEO_DATA_FAILURE,
  POST_ANSWER_VIDEO_DATA,
  POST_ANSWER_VIDEO_DATA_FAILURE,
} from "./interface";
import {
  postQuestionVideoDataRequest,
  postAnswerVideoDataRequest,
} from "modules/dto/request/postVideoDataRequest";
import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions";

export const postQuestionVideoData =
  createAction(POST_QUESTION_VIDEO_DATA)<postQuestionVideoDataRequest>();
export const postAnswerVideoData =
  createAction(POST_ANSWER_VIDEO_DATA)<postAnswerVideoDataRequest>();
export const postQuestionVideoDataFailure = createAction(POST_QUESTION_VIDEO_DATA_FAILURE)<error>();
export const postAnswerVideoDataFailure = createAction(POST_ANSWER_VIDEO_DATA_FAILURE)<error>();

export type postVideoDataActionType =
  | ReturnType<typeof postQuestionVideoData>
  | ReturnType<typeof postAnswerVideoData>
  | ReturnType<typeof postQuestionVideoDataFailure>
  | ReturnType<typeof postAnswerVideoDataFailure>;

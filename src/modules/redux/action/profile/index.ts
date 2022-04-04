import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions";
import {
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  GET_PROFILE_QUESTION_LIST,
  GET_PROFILE_QUESTION_LIST_FAILURE,
  GET_PROFILE_QUESTION_LIST_SUCCESS,
  GET_PROFILE_SUCCESS,
  SET_ID,
} from "./interface";
import { profileResponse } from "modules/dto/response/getProfileResponse";
import { profileRequest } from "modules/dto/request/profileRequest";
import { getProfileQuestionListResponse } from "modules/dto/response/getProfileQuestionListResponse";

export const getProfile = createAction(GET_PROFILE)<profileRequest>();
export const getProfileFailure = createAction(GET_PROFILE_FAILURE)<error>();
export const getProfileSuccess =
  createAction(GET_PROFILE_SUCCESS)<profileResponse>();
export const getProfileQuestionList = createAction(
  GET_PROFILE_QUESTION_LIST
)<profileRequest>();
export const getProfileQuestionListSuccess = createAction(
  GET_PROFILE_QUESTION_LIST_SUCCESS
)<getProfileQuestionListResponse>();
export const getProfileQuestionListFailure = createAction(
  GET_PROFILE_QUESTION_LIST_FAILURE
)<error>();
export const setId = createAction(SET_ID)<number>();

export type profileActionType =
  | ReturnType<typeof getProfile>
  | ReturnType<typeof getProfileFailure>
  | ReturnType<typeof getProfileSuccess>
  | ReturnType<typeof getProfileQuestionList>
  | ReturnType<typeof getProfileQuestionListFailure>
  | ReturnType<typeof getProfileQuestionListSuccess>
  | ReturnType<typeof setId>;

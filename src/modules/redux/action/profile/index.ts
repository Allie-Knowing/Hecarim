import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions";
import {
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from "./interface";
import { profileResponse } from "modules/dto/response/getProfileResponse";

export const getProfile = createAction(GET_PROFILE)();
export const getProfileFailure = createAction(GET_PROFILE_FAILURE)<error>();
export const getProfileSuccess =
  createAction(GET_PROFILE_SUCCESS)<profileResponse>();

export type profileActionType =
  | ReturnType<typeof getProfile>
  | ReturnType<typeof getProfileFailure>
  | ReturnType<typeof getProfileSuccess>;

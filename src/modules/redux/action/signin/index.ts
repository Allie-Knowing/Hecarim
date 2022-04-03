import { error } from "modules/dto/error";
import { signinRequest } from "modules/dto/request/signinRequest";
import { createAction } from "typesafe-actions";
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  RESET,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
} from "./interface";

export const signin = createAction(SIGNIN)<signinRequest>();
export const signinFailure = createAction(SIGNIN_FAILURE)<error>();
export const signinSuccess = createAction(SIGNIN_SUCCESS)();
export const refreshToken = createAction(REFRESH_TOKEN)();
export const refreshTokenFailure = createAction(REFRESH_TOKEN_FAILURE)<error>();
export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS)();
export const reset = createAction(RESET)();

export type signinActionType =
  | ReturnType<typeof signin>
  | ReturnType<typeof signinFailure>
  | ReturnType<typeof signinSuccess>
  | ReturnType<typeof refreshToken>
  | ReturnType<typeof refreshTokenFailure>
  | ReturnType<typeof refreshTokenSuccess>
  | ReturnType<typeof setError>
  | ReturnType<typeof reset>;

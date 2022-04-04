import { error } from "modules/dto/error";
import { myIdResponse } from "modules/dto/response/getMyIdResponse";
import { createAction } from "typesafe-actions";
import {
  GET_MY_ID,
  GET_MY_ID_FAILURE,
  GET_MY_ID_SUCCESS,
  SET_ID,
} from "./interface";

export const getMyId = createAction(GET_MY_ID)();
export const getMyIdSuccess = createAction(GET_MY_ID_SUCCESS)<number>();
export const getMyIdFailure = createAction(GET_MY_ID_FAILURE)<error>();
export const setId = createAction(SET_ID)<number>();

export type myIdActionType =
  | ReturnType<typeof getMyId>
  | ReturnType<typeof getMyIdSuccess>
  | ReturnType<typeof getMyIdFailure>
  | ReturnType<typeof setId>;

import { GET_VIDEO_URL, GET_VIDEO_URL_SUCCESS, GET_VIDEO_URL_FAILURE } from "./interface";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import { getVideoUrlResponse } from "modules/dto/response/getVideoUrlResponse";
import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions";

export const getVideoUrl = createAction(GET_VIDEO_URL)<getVideoUrlRequest>();
export const getVideoUrlSuccess = createAction(GET_VIDEO_URL_SUCCESS)<getVideoUrlResponse>();
export const getVideoUrlFailure = createAction(GET_VIDEO_URL_FAILURE)<error>();

export type getVideoUrlActionType =
  | ReturnType<typeof getVideoUrl>
  | ReturnType<typeof getVideoUrlSuccess>
  | ReturnType<typeof getVideoUrlFailure>;

import { POST_VIDEO_UPLOAD, POST_VIDEO_UPLOAD_SUCCESS, POST_VIDEO_UPLOAD_FAILURE } from "./interface";
import { postCameraRequest } from "modules/dto/request/postCameraRequest";
import { postCameraResponse } from "modules/dto/response/postCameraResponse";
import { error } from "modules/dto/error";
import { createAction } from "typesafe-actions";

export const postVideoUpload = createAction(POST_VIDEO_UPLOAD)<postCameraRequest>();
export const postVideoUploadSuccess = createAction(POST_VIDEO_UPLOAD_SUCCESS)<postCameraResponse>();
export const postVideoUploadFailure = createAction(POST_VIDEO_UPLOAD_FAILURE)<error>();

export type cameraActionType =
  | ReturnType<typeof postVideoUpload>
  | ReturnType<typeof postVideoUploadSuccess>
  | ReturnType<typeof postVideoUploadFailure>;

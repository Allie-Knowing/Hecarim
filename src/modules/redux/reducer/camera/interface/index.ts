import { error } from "modules/dto/error";
import { postCameraRequest } from "modules/dto/request/postCameraRequest";
import { postCameraResponse } from "modules/dto/response/postCameraResponse";

export interface VideoState {
  postVideoRequest: postCameraRequest;
  postVideoResponse: postCameraResponse;
  error: error;
}

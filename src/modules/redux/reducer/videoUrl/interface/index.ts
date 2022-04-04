import { error } from "modules/dto/error";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import { getVideoUrlResponse } from "modules/dto/response/getVideoUrlResponse";

export interface VideoState {
  postVideoRequest: getVideoUrlRequest;
  postVideoResponse: getVideoUrlResponse;
  error: error;
}

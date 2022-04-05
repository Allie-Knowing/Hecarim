import { error } from "modules/dto/error";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import { getVideoUrlResponse } from "modules/dto/response/getVideoUrlResponse";

export interface VideoUrlState {
  getVideoUrlRequest: getVideoUrlRequest;
  getVideoUrlResponse: getVideoUrlResponse;
  error: error;
}

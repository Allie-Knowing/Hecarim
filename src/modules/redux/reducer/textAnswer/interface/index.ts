import { error } from "modules/dto/error";
import {
  deleteTextAnswerRequest,
  getTextAnswerListRequest,
  postTextAnswerRequest,
} from "modules/dto/request/textAnswerRequest";
import { getTextAnswerListResponse } from "modules/dto/response/textAnswerResponse";

export interface TextAnswerState {
  postTextAnswerRequest: postTextAnswerRequest;
  getTextAnswerListRequest: getTextAnswerListRequest;
  deleteTextAnswerRequest: deleteTextAnswerRequest;
  getTextAnswerListResponse: getTextAnswerListResponse;
  error: error;
}

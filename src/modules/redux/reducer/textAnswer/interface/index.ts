import { error } from "modules/dto/error";
import {
  deleteTextAnswerRequest,
  getTextAnswerRequest,
  postTextAnswerRequest,
} from "modules/dto/request/textAnswerRequest";
import { getTextAnswerResponse } from "modules/dto/response/textAnswerResponse";

export interface TextAnswerState {
  postTextAnswerRequest: postTextAnswerRequest;
  getTextAnswerRequest: getTextAnswerRequest;
  deleteTextAnswerRequest: deleteTextAnswerRequest;
  getTextAnswerResponse: getTextAnswerResponse;
  error: error;
}

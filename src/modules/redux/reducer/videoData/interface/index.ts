import { error } from "modules/dto/error";
import {
  postQuestionVideoDataRequest,
  postAnswerVideoDataRequest,
} from "modules/dto/request/postVideoDataRequest";

export interface QuestionVideoDataState {
  postQuestionVideoDataRequest: postQuestionVideoDataRequest;
  postAnswerVideoDataRequest: postAnswerVideoDataRequest;
  error: error;
}

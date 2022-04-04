import { postStackedQuestionListRequest } from "modules/dto/request/postStackedQuestionListRequest";
import { getStackedQuestionListResponse } from "modules/dto/response/getStackedQuestionListResponse";

export interface StackedQuestionListState {
  getStackedQuestionList: getStackedQuestionListResponse;
  postStackedQuestionList: postStackedQuestionListRequest;
}

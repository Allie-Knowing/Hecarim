import { getRequestWithAccessToken } from "../default";
import {
  postQuestionVideoDataRequest,
  postAnswerVideoDataRequest,
} from "modules/dto/request/postVideoDataRequest";
import uri from "constance/uri";

export const postQuestionVideoData = async (
  access_token: string,
  request_body: postQuestionVideoDataRequest
) => {
  const request = getRequestWithAccessToken(access_token);
  const data = await request.post(uri.question, request_body);

  return data;
};

export const postAnswerVideoData = async (
  access_token: string,
  request_body: postAnswerVideoDataRequest
) => {
  const request = getRequestWithAccessToken(access_token);
  const data = await request.post(uri.answer, request_body);

  return data;
};

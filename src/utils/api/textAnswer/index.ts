import uri from "constance/uri";
import {
  deleteTextAnswerRequest,
  getTextAnswerListRequest,
  postTextAnswerRequest,
} from "modules/dto/request/textAnswerRequest";
import { getRequest, getRequestWithAccessToken } from "../default";

export const getTextAnswerApi = async (
  access_token: string,
  { questionId, page, size }: getTextAnswerListRequest
) => {
  const request = getRequest();
  const url = `${uri.commentAnswer}/${questionId}`;

  const data = await request.get(url, { params: { page, size } });

  return data;
};

export const postTextAnswerApi = async (
  access_token: string,
  { questionId, content }: postTextAnswerRequest
) => {
  const request = getRequestWithAccessToken(access_token);
  const url = `${uri.commentAnswer}/${questionId}`;

  const data = await request.post(url, { content });

  return data;
};

export const deleteTextAnswerApi = async (
  access_token: string,
  { commentId }: deleteTextAnswerRequest
) => {
  const request = getRequestWithAccessToken(access_token);
  const url = `${uri.commentAnswer}/${commentId}`;

  const data = await request.delete(url);

  return data;
};

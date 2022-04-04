import uri from "constance/uri";
import { getRequestWithAccessToken } from "../default";

export const getTextAnswerApi = async (
  questionId: string,
  access_token: string
) => {
  const request = getRequestWithAccessToken(access_token);
  const url = `${uri.comment_answer}/${questionId}`;

  const data = await request.get(url);

  return data;
};

export const postTextAnswerApi = async (
  questionId: string,
  content: string,
  access_token: string
) => {
  const request = getRequestWithAccessToken(access_token);
  const url = `${uri.comment_answer}/${questionId}`;

  const data = await request.post(url, { content });

  return data;
};

export const deleteTextAnswerApi = async (
  commentId: string,
  access_token: string
) => {
  const request = getRequestWithAccessToken(access_token);
  const url = `${uri.comment_answer}/${commentId}`;

  const data = await request.delete(url);

  return data;
};

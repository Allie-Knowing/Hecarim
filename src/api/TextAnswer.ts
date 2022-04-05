import uri from "constance/uri";
import { getTextAnswerListResponse } from "modules/dto/response/textAnswerResponse";
import { instance } from "utils/axios";

export const getTextAnswerList = async (
  questionId: number,
  page: number,
  size: number
) => {
  const url = `${uri.commentAnswer}/${questionId}`;

  return await instance.get<getTextAnswerListResponse>(url, {
    params: { page, size },
  });
};

export const postTextAnswer = async (questionId: number, content: string) => {
  const url = `${uri.commentAnswer}/${questionId}`;
  const data = await instance.post(url, { content });

  return data;
};

export const deleteTextAnswer = async (commentId: number) => {
  const url = `${uri.commentAnswer}/${commentId}`;
  const data = await instance.delete(url);

  return data;
};

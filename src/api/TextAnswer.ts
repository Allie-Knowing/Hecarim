import uri from "constance/uri";
import { instance, noTokenInstance } from "utils/axios";

export const getTextAnswerList = async (
  questionId: number,
  page: number,
  size: number
) => {
  const url = `${uri.comment_answer}/${questionId}`;
  const data = await noTokenInstance.get(url, { params: { page, size } });

  return data;
};

export const postTextAnswer = async (questionId: number, content: string) => {
  const url = `${uri.comment_answer}/${questionId}`;
  const data = await instance.post(url, { content });

  return data;
};

export const deleteTextAnswer = async (commentId: number) => {
  const url = `${uri.comment_answer}/${commentId}`;
  const data = await instance.delete(url);

  return data;
};

import uri from "constance/uri";
import { instance } from "utils/axios";

export interface TextAnswer {
  id: 69;
  content: "ffggggg";
  is_adoption: false;
  created_at: "2022-04-05T13:40:43.602Z";
  updated_at: "2022-04-05T13:40:43.602Z";
  user: {
    id: 1;
    profile: "https://src.hidoc.co.kr/image/lib/2021/4/28/1619598179113_0.jpg";
    name: "손채건";
  };
  is_mine: true;
  is_like: false;
}

export interface TextAnswerListResponse {
  data: TextAnswer[];
}

export const getTextAnswerList = async (
  questionId: number,
  page: number,
  size: number
) => {
  const url = `${uri.commentAnswer}/${questionId}`;

  return await instance.get<TextAnswerListResponse>(url, {
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

export const adoptionTextAnswer = async (commentId: number) => {
  const url = `${uri.commentAnswer}/${commentId}`;
  return await instance.delete(url);
};

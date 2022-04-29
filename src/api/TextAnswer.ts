import uri from "constance/uri";
import { instance } from "utils/axios";

export interface TextAnswer {
  id: number;
  content: string;
  is_adoption: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    profile: string;
    name: string;
  };
  is_mine: boolean;
  is_like: boolean;
}

export interface TextAnswerListResponse {
  data: TextAnswer[];
}

export const getTextAnswerList = async (questionId: number, page: number, size: number) => {
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

export const adoptionTextAnswer = async (commentId: number, videoId: number) => {
  const url = `${uri.textAnswerAdoption}/${commentId}`;
  return await instance.put(url, { videoId });
};

export const reportTextAnswer = async (videoId: number, commentId: number, description: string) => {
  return await instance.post(uri.reportComment, {
    video_id: videoId,
    description,
    comment_id: commentId,
  });
};

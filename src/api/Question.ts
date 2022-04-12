import uri from "constance/uri";
import { instance } from "utils/axios";

export interface Question {
  id: number;
  description: string;
  title: string;
  video_url: string | null;
  created_at: string;
  user_id: number;
  profile: string | null;
  comment_cnt: number;
  like_cnt: number;
  is_mine: boolean;
  is_like: boolean;
  is_adoption: number;
}

export interface QuestionListResponse {
  data: Question[];
}

const getQuestionList = async (page: number, size: number) => {
  return await instance.get<QuestionListResponse>(uri.question, {
    params: { page, size },
  });
};

const getStackQuestionList = async (id: number[]) => {
  return await instance.get<QuestionListResponse>(
    `${uri.stack_question}?id=${id.join(",")}`
  );
};

export interface Hashtag {
  id: number;
  title: string;
}

export interface getHashtagResponse {
  data: Hashtag[];
}

const getQuestionHashtag = async (videoId: number) => {
  return await instance.get<getHashtagResponse>(
    `${uri.question}/${videoId}/hashtag`
  );
};

export interface QuestionDetailResponse {
  data: Question;
}

const getQuestionDetail = async (videoId: number) => {
  return await instance.get<QuestionDetailResponse>(
    `${uri.question}/${videoId}`
  );
};

const deleteQuestion = async (videoId: number) => {
  return await instance.delete(`${uri.question}/${videoId}`);
};

export {
  getQuestionList,
  getStackQuestionList,
  getQuestionHashtag,
  getQuestionDetail,
  deleteQuestion,
};

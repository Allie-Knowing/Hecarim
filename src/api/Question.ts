import uri from "constance/uri";
import { instance, noTokenInstance } from "utils/axios";

export interface Question {
  id: number;
  description: string;
  title: string;
  video_url: string;
  created_at: string;
  user_id: number;
  profile: string;
  comment_cnt: number;
  like_cnt: number;
  is_mine: boolean;
  is_like: true;
}

export interface QuestionListResponse {
  data: Question[];
}

const getQuestionList = async (page: number, size: number) => {
  return await noTokenInstance.get<QuestionListResponse>(uri.question, {
    params: { page, size },
  });
};

export interface Hashtag {
  id: number;
  title: string;
}

export interface getHashtagResponse {
  data: Hashtag[];
}

const getQuestionHashtag = async (videoId: number) => {
  return await noTokenInstance.get<getHashtagResponse>(
    `${uri.question}/${videoId}/hashtag`
  );
};

export interface QuestionDetailResponse {
  data: Question;
}

const getQuestionDetail = async (videoId: number) => {
  return await noTokenInstance.get<QuestionDetailResponse>(
    `${uri.question}/${videoId}`
  );
};

const deleteQuestion = async (videoId: number) => {
  return await instance.delete(`${uri.question}/${videoId}`);
};

export {
  getQuestionList,
  getQuestionHashtag,
  getQuestionDetail,
  deleteQuestion,
};

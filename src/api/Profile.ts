import uri from "constance/uri";
import { instance } from "utils/axios";

export interface ProfileResponse {
  data: {
    name: string;
    profile: string;
    email: string;
    follwer: number;
    following: number;
    video_cnt: number;
    answer_video_cnt: number;
  };
}

export interface ProfileRequest {
  id: number;
}

export interface ProfileQuestion {
  id: string;
  video_description: string;
  video_title: string;
  thumbnail?: string;
  user_profile?: string;
  video_url: string;
  created_at: string;
  comment_cnt: number;
  user_id: number;
  like_cnt: number;
  is_mine: boolean;
  is_like: boolean;
  is_adoption: number;
}

export interface ProfileAnswer {
  id: number;
  video_description: string;
  video_title: string;
  thumbnail: string | null;
  user_profile: string;
  video_url: string;
  created_at: string;
  like_cnt: number;
}

export interface GetProfileQuestionListResponse {
  data: ProfileQuestion[];
}

export const getProfileApi = async (body: ProfileRequest) => {
  const data = await instance.get<ProfileResponse>(
    `${uri.getProfile}${body.id}`
  );
  return data;
};

export const getProfilQuestionListApi = async (body: ProfileRequest) => {
  const data = await instance.get<GetProfileQuestionListResponse>(
    `${uri.getProfileQuestionList}${body.id}?page=1&size=10000`
  );

  return data;
};

export const getProfileAnswerListApi = async (userId: number) => {
  const data = await instance.get<{ data: ProfileAnswer[] }>(
    `${uri.profileAnswerList}${userId}?page=1&size=10000`
  );

  return data;
};

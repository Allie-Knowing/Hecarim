import uri from "constance/uri";
import { instance } from "utils/axios";

export interface ProfileResponse {
  data: { profile: string; name: string; video_cnt: number };
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

export interface GetProfileQuestionListResponse {
  data: ProfileQuestion[];
}

export const getProfileApi = async (body: ProfileRequest) => {
  console.log(body);
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

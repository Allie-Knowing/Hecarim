import uri from "constance/uri";
import { instance } from "utils/axios";

interface ProfileResponse {
  profile: string;
  name: string;
  video_cnt: number;
}

interface ProfileRequest {
  id: number;
}

interface ProfileQuestion {
  id: string;
  video_description: string;
  video_title: string;
  thumbnail?: string;
  user_profile?: string;
  video_url: string;
  created_at: string;
  comment_cnt: number;
  like_cnt: number;
  is_mine: boolean;
  is_like: boolean;
  is_adoption: number;
}

interface GetProfileQuestionListResponse {
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

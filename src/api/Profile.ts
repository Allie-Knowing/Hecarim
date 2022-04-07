import uri from "constance/uri";
import { instance } from "utils/axios";

interface ProfileResponse {
  profile: "https://profile.html/profile.png";
  name: "정지우";
  video_cnt: "1";
}

interface ProfileRequest {
  id: number;
}

interface ProfileQuestion {
  id: number;
  video_description: string;
  video_title: string;
  thumbnail: string | null;
  user_profile: string;
  video_url: string;
  created_at: string;
  comment_cnt: number;
  like_cnt: number;
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

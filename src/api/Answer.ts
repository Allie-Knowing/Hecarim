import uri from "constance/uri";
import { instance, noTokenInstance } from "utils/axios";

export interface VideoAnswer {
  id: number;
  title: string;
  user_id: number;
  profile: string;
  video_url: string;
  created_at: string;
  like_cnt: number;
  is_adoption: number;
  is_mine: boolean;
}

export const getVideoAnswerList = async (
  questionId: number,
  page: number,
  size: number
) => {
  return await noTokenInstance.get<VideoAnswer[]>(
    `${uri.videoAnswer}/${questionId}`,
    {
      params: { page, size },
    }
  );
};

export const adoptionVideoAnswer = async (videoId: number) => {
  return await instance.put(`${uri.videoAnswer}/${videoId}`);
};

export const deleteVideoAnswer = async (videoId: number) => {
  return await instance.delete(`${uri.videoAnswer}/${videoId}`);
};

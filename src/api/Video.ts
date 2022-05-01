import { instance } from "../utils/axios";
import uri from "../constance/uri";

export const reportVideo = async (videoId: number, description: string) => {
  return await instance.post(uri.reportVideo, { video_id: videoId, description });
};

export const blockVideo = async (videoId: number) => {
  return await instance.post(uri.blockVideo, { videoId });
};

import { instance } from "../utils/axios";
import uri from "../constance/uri";

export const reportVideo = async (videoId: number, description: string) => {
  return await instance.post(uri.report, { videoId, description });
};


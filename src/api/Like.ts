import uri from "constance/uri";
import { instance } from "utils/axios";

export const postLike = async (videoId: number) => {
  return await instance.post(uri.like, { videoId });
};

export const deleteLike = async (videoId: number) => {
  return await instance.delete(uri.like, { data: { videoId } });
};

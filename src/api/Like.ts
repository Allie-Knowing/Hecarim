import uri from "constance/uri";
import { instance } from "utils/axios";

export const postLike = async (videoId: number) => {
  const data = await instance.post<string>(uri.like, { videoId });

  return data;
};

export const deleteLike = async (videoId: number) => {
  const data = await instance.delete(uri.like, { data: { videoId } });

  return data;
};

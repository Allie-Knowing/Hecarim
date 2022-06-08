import uri from "constance/uri";
import { instance } from "utils/axios";

export const patchViews = async (videoId: number) => {
  const data = await instance.patch(`${uri.views}/${videoId}`);

  return data;
};

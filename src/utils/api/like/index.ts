import uri from "constance/uri";
import { getRequestWithAccessToken } from "../default";

export const postLikeApi = async (videoId: number, access_token: string) => {
  const request = getRequestWithAccessToken(access_token);

  const data = await request.post(uri.like, { videoId });

  return data;
};

export const deleteLikeApi = async (videoId: number, access_token: string) => {
  const request = getRequestWithAccessToken(access_token);

  const data = await request.delete(uri.like, { data: { videoId } });

  return data;
};

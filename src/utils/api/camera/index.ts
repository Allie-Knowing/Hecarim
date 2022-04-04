import { getRequestWithAccessToken } from "../default";
import uri from "constance/uri";

export const postVideoApi = async (videoData: string | FormData, access_token: string, type: "question" | "answer") => {
  const request = getRequestWithAccessToken(access_token, "json");
  const data = await request.post(`${uri.file}?type=${type}`, videoData);

  return data;
};

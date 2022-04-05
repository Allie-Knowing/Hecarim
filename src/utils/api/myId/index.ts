import uri from "constance/uri";
import { getRequestWithAccessToken } from "../default";

export const getMyId = async (accessToken: string) => {
  const request = getRequestWithAccessToken(accessToken);
  const data = await request.get(uri.myId);
  return data.data;
};

import uri from "constance/uri";
import { getRequestWithAccessToken } from "../default";

export const getMyId = async (accessToken: string) => {
  console.log("ada");
  const request = getRequestWithAccessToken(accessToken);
  const data = await request.get(uri.myId);
  console.log("adaasdasdasasd");
  return data;
};

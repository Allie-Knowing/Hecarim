import { AxiosResponse } from "axios";
import uri from "constance/uri";
import { myIdResponse } from "modules/dto/response/getMyIdResponse";
import { getRequestWithAccessToken } from "../default";

export const getMyId = async (accessToken: string) => {
  const request = getRequestWithAccessToken(accessToken);
  const data = await request.get(uri.myId);
  return data.data;
};

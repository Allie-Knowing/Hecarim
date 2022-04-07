import { getRequest, getRequestWithAccessToken } from "../default";
import uri from "constance/uri";

export const getVideoAnswerListApi = async () => {
  const request = getRequest();
  const data = await request.get(uri.videoAnswer);
  return data;
}


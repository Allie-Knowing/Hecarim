// import { instance } from "utils/axios";
import { getRequest, getRequestWithAccessToken } from "../default";
import uri from "constance/uri";

export const getVideoAnswerListApi = async () => {
  const request = getRequest();
  const data = await request.get(uri.video_answer);
  return data;
}

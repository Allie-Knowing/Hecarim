// import { instance } from "utils/axios";
import axios from "axios";
import { getRequest, getRequestWithAccessToken } from "../default";
import uri from "constance/uri";

export const getVideoAnswerListApi = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const request = getRequest();
    const data = await request.get(uri.video_answer);
    return data;
  } catch (error) {
    throw error;
  }
}

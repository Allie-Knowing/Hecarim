import uri from "constance/uri";
import { instance } from "utils/axios";

export const getMyId = async (accessToken: string) => {
  const data = await instance.get(uri.myId);
  return data.data;
};

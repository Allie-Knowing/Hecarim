import uri from "constance/uri";
import { instance } from "utils/axios";

export const getMyIdApi = async () => {
  const data = await instance.get<{ data: number }>(uri.myId);

  return data;
};

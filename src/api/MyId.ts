import uri from "constance/uri";
import { instance } from "utils/axios";

export const getMyIdApi = async () => {
  const data = await instance.get<any>(uri.myId);

  return data;
};

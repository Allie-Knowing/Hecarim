import uri from "constance/uri";
import { instance } from "utils/axios";

export const getInterests = async () => {
  return await instance.get<number[]>(uri.interests);
};

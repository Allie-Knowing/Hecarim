import uri from "constance/uri";
import { instance } from "utils/axios";

export const putNickname = async (nickname: string) => {
  return await instance.put(uri.nickname, { nickname });
};

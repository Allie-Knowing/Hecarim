import uri from "constance/uri";
import { instance } from "utils/axios";

export const getProfile = async (id: number) => {
  try {
    return await instance.get(uri.getProfile + id);
  } catch (error) {
    throw error;
  }
};

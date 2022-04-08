import { instance, noTokenInstance } from "utils/axios";
import uri from "constance/uri";
import { searchTitleResponse } from "constance/search";

export const getSearchTitle = async (q: string) => {
  return await instance.get<searchTitleResponse>(uri.title, {
    params: { q },
  });
};
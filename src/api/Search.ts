import { instance, noTokenInstance } from "utils/axios";
import uri from "constance/uri";
import { searchPayload } from "constance/search";

export const getSearchTitleResponseApi = async (payload: searchPayload) => {
  const data = await instance.get(
    uri.title,
    {
      params: payload,
    }
  );
  return data;
}
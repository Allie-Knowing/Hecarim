import { getRequest } from "../default";
import uri from "constance/uri";
import { searchPayload } from "constance/search";

export const getSearchTitleResponseApi = async (access_token: string, payload: searchPayload) => {
  const request = getRequest();
  const data = await request.get(
    uri.title,
    {
      params: payload,
    }
  );
  return data;
}
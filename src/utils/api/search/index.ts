import { getRequest } from "../default";
import uri from "constance/uri";
import { searchPayload } from "constance/search";

export const getSearchAutoCompleteApi = async (payload: searchPayload) => {
  const request = getRequest();
  const data = await request.get(uri.auto_complete+`/${payload.q}`);
  return data;
}
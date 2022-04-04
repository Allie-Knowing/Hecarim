import uri from "constance/uri";
import { getRequest } from "../default";

export const getProfile = async (id: number) => {
  const request = getRequest();

  const data = await request.post(`${uri.getProfile}${id}`);
  return data;
};

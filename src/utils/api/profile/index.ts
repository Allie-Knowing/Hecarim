import uri from "constance/uri";
import { profileRequest } from "modules/dto/request/profileRequest";
import { getRequest } from "../default";

export const getProfile = async (_, body: profileRequest) => {
  const request = getRequest();

  const data = await request.get(`${uri.getProfile}${body.id}`);
  console.log(data);
  return data.data;
};

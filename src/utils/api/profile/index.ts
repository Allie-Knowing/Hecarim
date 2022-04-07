import { ProfileRequest } from "api/Profile";
import uri from "constance/uri";
import { instance } from "utils/axios";
import { getRequest } from "../default";

export const getProfile = async (_, body: ProfileRequest) => {
  const data = await instance.get(`${uri.getProfile}${body.id}`);
  return data;
};

export const getProfilQuestionList = async (_, body: ProfileRequest) => {
  const data = await instance.get(`${uri.getProfileQuestionList}${body.id}`);

  return data;
};

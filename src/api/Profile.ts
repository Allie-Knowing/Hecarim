import uri from "constance/uri";
import { profileRequest } from "modules/dto/request/profileRequest";
import { getProfileQuestionListResponse } from "modules/dto/response/getProfileQuestionListResponse";
import { profileResponse } from "modules/dto/response/getProfileResponse";
import { noTokenInstance } from "utils/axios";

export const getProfileApi = async (body: profileRequest) => {
  const data = await noTokenInstance.get<profileResponse>(
    `${uri.getProfile}${body.id}`
  );
  return data;
};

export const getProfilQuestionListApi = async (body: profileRequest) => {
  const data = await noTokenInstance.get<getProfileQuestionListResponse>(
    `${uri.getProfileQuestionList}${body.id}?page=1&size=10000`
  );

  return data;
};

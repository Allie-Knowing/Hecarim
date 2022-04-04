import { getRequestWithAccessToken } from "../default";
import uri from "constance/uri";
import { postCameraRequest } from "modules/dto/request/getVideoUrlRequest";

export const getVideoUrl = async (access_token: string, { type, file }: postCameraRequest) => {
  const request = getRequestWithAccessToken(access_token);
  const data = await request.post(`${uri.file}?type=${type}`, file, {
    headers: { "Content-Type": "multipart/form-data", accept: "application/json" },
  });

  return data;
};

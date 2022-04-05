import { getRequestWithAccessToken } from "../default";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import uri from "constance/uri";

export const getVideoUrl = async (access_token: string, request_body: getVideoUrlRequest) => {
  const request = getRequestWithAccessToken(access_token);
  const data = await request.post(`${uri.file}?type=${request_body.type}`, request_body.file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

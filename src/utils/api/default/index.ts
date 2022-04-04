import axios from "axios";
import env from "constant/env";
import getEnvVars from "../../../../environment";

export const getRequest = () => {
  const request = axios.create({
    timeout: 10000,
    baseURL: env.baseUrl,
    withCredentials: true,
    headers: {
      withCredentials: true,
    },
  });
  return request;
};

export const getRequestWithAccessToken = (
  token: string,
  type: "json" | "blob" | "text" = "json"
) => {
  const request = axios.create({
    timeout: 10000,
    baseURL: getEnvVars().baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
    responseType: type,
    withCredentials: true,
  });
  return request;
};

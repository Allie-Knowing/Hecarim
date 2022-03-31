import axios, { AxiosError } from "axios";
import env from "constant/env";
import { refresh } from "./refresh";

export const instance = axios.create({ baseURL: env.baseUrl });

export const noTokenInstance = axios.create({ baseURL: env.baseUrl });

instance.interceptors.request.use(refresh, function (error: AxiosError) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

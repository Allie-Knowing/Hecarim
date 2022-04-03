import axios, { AxiosError, AxiosRequestConfig } from "axios";
import env from "constant/env";
import { refresh } from "./refresh";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";

export const instance = axios.create({ baseURL: env.baseUrl });

export const noTokenInstance = axios.create({ baseURL: env.baseUrl });

instance.interceptors.request.use(
  async function (config) {
    config.headers["Authorization"] = await localStorage.getItem<string>(
      storageKeys.accessToken
    );
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  return response;
}, refresh);

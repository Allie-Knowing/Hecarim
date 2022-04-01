import axios, { AxiosError, AxiosRequestConfig } from "axios";
import env from "constant/env";
import { refresh } from "./refresh";

export const instance = axios.create({ baseURL: env.baseUrl });

export const noTokenInstance = axios.create({ baseURL: env.baseUrl });

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  return response;
}, refresh);

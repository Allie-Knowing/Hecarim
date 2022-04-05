import axios, { AxiosError } from "axios";
import env from "constant/env";
import { refresh } from "./refresh";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";

export const instance = axios.create({
  baseURL: env.baseUrl,
});

export const noTokenInstance = axios.create({
  baseURL: env.baseUrl,
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJhY2Nlc3MiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDg2NTEwNjEsInN1YiI6IjEiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4NjUxMDYwfQ.FCSj2HgtWBlPZNNLrCNwC27g5Y415AaRXpwQY_pGHss",
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] =
      "Bearer eyJ0eXAiOiJhY2Nlc3MiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDg2NTEwNjEsInN1YiI6IjEiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4NjUxMDYwfQ.FCSj2HgtWBlPZNNLrCNwC27g5Y415AaRXpwQY_pGHss";
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  return response;
}, refresh);

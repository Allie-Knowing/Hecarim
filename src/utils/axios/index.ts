/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosRequestConfig } from "axios";
import env from "constant/env";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import RefreshError from "types/RefreshError";
import { Mutex } from "async-mutex";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

const mutex = new Mutex();

const refresh = async (error: any) => {
  if (!axios.isAxiosError(error) || error.response.status !== 401) {
    return Promise.reject(error);
  }

  //토큰 만료됨
  const release = await mutex.acquire();

  try {
    const refreshToken = await localStorage.getItem<string>(storageKeys.refreshToken);

    if (!refreshToken) {
      throw new RefreshError();
    }

    //서버에 리프레시 요청
    const { access_token, refresh_token } = (
      await noTokenInstance.post<RefreshResponse>(
        "/refresh",
        {},
        {
          headers: { "Refresh-Token": refreshToken },
        }
      )
    ).data;

    await localStorage.setItem(storageKeys.refreshToken, refresh_token);
    await localStorage.setItem(storageKeys.accessToken, access_token);

    instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    error.config.headers["Authorization"] = `Bearer ${access_token}`;

    return axios(error.config);
  } finally {
    release();
  }
};

export const instance = axios.create({
  baseURL: env.baseUrl,
});

export const noTokenInstance = axios.create({
  baseURL: env.baseUrl,
});

const requestInterceptor = async (config: AxiosRequestConfig) => {
  const access_token = await localStorage.getItem<string>(storageKeys.accessToken);

  config.headers.common["Authorization"] = `Bearer ${access_token}`;
  config.headers["Authorization"] = `Bearer ${access_token}`;
  instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

  return config;
};

instance.interceptors.request.use(requestInterceptor);

instance.interceptors.response.use((value) => value, refresh);

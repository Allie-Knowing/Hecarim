/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosRequestConfig } from "axios";
import env from "constant/env";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import RefreshError from "types/RefreshError";
import { Mutex } from "async-mutex";
import expiresTime from "constant/expiresTime";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

const mutex = new Mutex();

const requestRefresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const release = await mutex.acquire();

  try {
    const accessToken = await localStorage.getItem<string>(storageKeys.accessToken);
    const expiresAt = await localStorage.getItem<string>(storageKeys.expiresAt);

    if (!accessToken || !expiresAt) {
      throw new RefreshError();
    }

    if (new Date(expiresAt).getTime() > new Date().getTime()) {
      //만료되지 않음
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return config;
    }

    //만료됨
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

    await Promise.all([
      localStorage.setItem(storageKeys.accessToken, access_token),
      localStorage.setItem(storageKeys.refreshToken, refresh_token),
      localStorage.setItem(storageKeys.expiresAt, expiresTime()),
    ]);

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    await Promise.all([
      localStorage.removeItem(storageKeys.accessToken),
      localStorage.removeItem(storageKeys.refreshToken),
      localStorage.removeItem(storageKeys.expiresAt),
    ]);

    throw new RefreshError();
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

instance.interceptors.request.use(requestRefresh);

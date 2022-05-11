/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError } from "axios";
import env from "constant/env";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import RefreshError from "types/RefreshError";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export const refresh = async (error: AxiosError) => {
  if (error.response.status !== 401) {
    //토큰 오류가 아니면 그냥 에러 발생
    return Promise.reject(error);
  }
  try {
    //리프레시 로직
    const refreshToken = await localStorage.getItem<string>(storageKeys.refreshToken);

    if (refreshToken === null) {
      throw new RefreshError();
    }

    await Promise.all([
      localStorage.removeItem(storageKeys.accessToken),
      localStorage.removeItem(storageKeys.refreshToken),
    ]);

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

    //스토리지에 토큰 저장
    await Promise.all([
      localStorage.setItem(storageKeys.accessToken, access_token),
      localStorage.setItem(storageKeys.refreshToken, refresh_token),
    ]);

    //axios 헤더 변경
    error.config.headers["Authorization"] = `Bearer ${access_token}`;
    instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    //인증 오류난 요청으로 다시 요청 보내기
    return axios(error.config);
  } catch (error) {
    console.log(error);

    //리프레시중 오류 발생
    if (axios.isAxiosError(error) && error.response.status === 401) {
      //리프레시 토큰 만료 됨
      //스토리지에서 토큰 삭제
      await Promise.all([
        localStorage.removeItem(storageKeys.accessToken),
        localStorage.removeItem(storageKeys.refreshToken),
      ]);

      //피드로 이동후 로그인 만료 알럿 띄우기
      throw new RefreshError();
    }

    throw new RefreshError();
  }
};

export const instance = axios.create({
  baseURL: env.baseUrl,
});

export const noTokenInstance = axios.create({
  baseURL: env.baseUrl,
});

instance.interceptors.request.use(
  async function (config) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${await localStorage.getItem<string>(storageKeys.accessToken)}`;
    config.headers.common["Authorization"] = `Bearer ${await localStorage.getItem<string>(
      storageKeys.accessToken
    )}`;

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  return response;
}, refresh);

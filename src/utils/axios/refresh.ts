import axios, { AxiosError } from "axios";
import storageKeys from "constant/storageKeys";
import localStorage from "utils/localStorage";
import { noTokenInstance } from ".";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export const refresh = async (error: AxiosError) => {
  if (error.response.status !== 401) {
    //토큰 오류가 아니면 그냥 에러 발생
    return Promise.reject(error);
  }

  //리프레시 로직
  const refreshToken = await localStorage.getItem<string>(
    storageKeys.refreshToken
  );
  await localStorage.removeItem(storageKeys.accessToken);

  const { access_token, refresh_token } = (
    await noTokenInstance.post<RefreshResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    })
  ).data;

  await Promise.all([
    localStorage.setItem(storageKeys.accessToken, access_token),
    localStorage.setItem(storageKeys.refreshToken, refresh_token),
  ]);

  error.config.headers["Authorization"] = `Bearer ${access_token}`;

  return axios(error.config);
};

import uri from "constance/uri";
import expiresTime from "constant/expiresTime";
import storageKeys from "constant/storageKeys";
import { noTokenInstance } from "utils/axios";
import localStorage from "utils/localStorage";

export interface SigninRequest {
  provider: "NAVER" | "APPLE";
  id_token: string;
  name?: string | null;
}

export interface GoogleSigninRequest {
  email: string;
  name: string;
  picture: string;
}

export interface SigninResponse {
  access_token: string;
  refresh_token: string;
}

export const postGoogleSigninApi = async (body: GoogleSigninRequest) => {
  try {
    const response = await noTokenInstance.post<SigninResponse>(uri.googleSignin, body);
    await Promise.all([
      localStorage.setItem<string>(storageKeys.accessToken, response.data.access_token),
      localStorage.setItem<string>(storageKeys.refreshToken, response.data.refresh_token),
      localStorage.setItem<string>(storageKeys.expiresAt, expiresTime()),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const postSigninApi = async (body: SigninRequest) => {
  let response = null;
  try {
    if (body.provider === "NAVER") {
      response = await noTokenInstance.post<SigninResponse>(`${uri.signin}${body.provider}`, {
        code: body.id_token,
      });
    } else if (body.provider === "APPLE") {
      response = await noTokenInstance.post<SigninResponse>(uri.appleSignin, {
        id_token: body.id_token,
        name: body.name ? body.name : "",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await Promise.all([
    localStorage.setItem<string>(storageKeys.accessToken, response.data.access_token),
    localStorage.setItem<string>(storageKeys.refreshToken, response.data.refresh_token),
    localStorage.setItem<string>(storageKeys.expiresAt, expiresTime()),
  ]);
};

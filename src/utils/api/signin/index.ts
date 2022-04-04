import uri from "constance/uri";
import storageKeys from "constant/storageKeys";
import { signinRequest } from "modules/dto/request/signinRequest";
import { signinResponse } from "modules/dto/response/signinResponse";
import localStorage from "utils/localStorage";
import { getRequest } from "../default";

export const signin = async (body: signinRequest) => {
  const request = getRequest();
  let response = null;

  if (body.provider === "GOOGLE") {
    response = await request.post<signinResponse>(`${uri.googleSignin}`, {
      id_token: body.id_token,
    });
  }
  await Promise.all([
    localStorage.setItem<string>(storageKeys.accessToken, response.data.access_token),
    localStorage.setItem<string>(storageKeys.refreshToken, response.data.refresh_token),
  ]);
  return;
};

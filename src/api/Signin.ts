import uri from "constance/uri";
import storageKeys from "constant/storageKeys";
import { signinRequest } from "modules/dto/request/signinRequest";
import { signinResponse } from "modules/dto/response/signinResponse";
import { noTokenInstance } from "utils/axios";
import localStorage from "utils/localStorage";

export const postSigninApi = async (body: signinRequest) => {
  let response = null;

  if (body.provider === "GOOGLE") {
    response = await noTokenInstance.post<signinResponse>(
      `${uri.googleSignin}`,
      {
        id_token: body.id_token,
      }
    );
  } else {
    response = await noTokenInstance.post<signinResponse>(
      `${uri.signin}${body.provider}`,
      {
        code: body.id_token,
      }
    );
  }

  await Promise.all([
    localStorage.setItem<string>(
      storageKeys.accessToken,
      response.data.access_token
    ),
    localStorage.setItem<string>(
      storageKeys.refreshToken,
      response.data.refresh_token
    ),
  ]);
};

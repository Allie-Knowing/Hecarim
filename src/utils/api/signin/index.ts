import storageKeys from "constant/storageKeys";
import uri from "constant/uri";
import { signinRequest } from "modules/dto/request/signinRequest";
import { signinResponse } from "modules/dto/response/signinResponse";
import { instance } from "utils/axios";
import localStorage from "utils/localStorage";

export const signin = async (body: signinRequest) => {
  try {
    console.log(body);
    const response = await instance.post<signinResponse>(
      `${uri.signin}?provider=${body.provider}`,
      { code: body.code }
    );
    console.log(response);
    localStorage.setItem<string>(
      storageKeys.accessToken,
      response.data.access_token
    );
    localStorage.setItem<string>(
      storageKeys.refreshToken,
      response.data.refresh_token
    );
    console.log(localStorage.getItem(storageKeys.accessToken));
  } catch (error) {
    console.log(error);
    // throw error;
  }
};
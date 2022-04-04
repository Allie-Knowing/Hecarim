import storageKeys from "constant/storageKeys";
import uri from "constance/uri";
import { signinRequest } from "modules/dto/request/signinRequest";
import { signinResponse } from "modules/dto/response/signinResponse";
import { noTokenInstance } from "utils/axios";
import localStorage from "utils/localStorage";

export const signin = async (body: signinRequest) => {
  try {
    let response = null;
    if (body.provider === "GOOGLE") {
      response = await noTokenInstance.post<signinResponse>(
        `${uri.googleSignin}`,
        { id_token: body.id_token }
      );
    }
    console.log("asdasdasdadnsdfnj");
    localStorage.setItem<string>(
      storageKeys.accessToken,
      response.data.access_token
    );
    localStorage.setItem<string>(
      storageKeys.refreshToken,
      response.data.refresh_token
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

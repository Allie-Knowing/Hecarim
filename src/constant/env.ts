import getEnvVars from "../../environment";

const {
  baseUrl,
  googleIosClientId,
  googleWebClientId,
  naverUrl,
  facebookClientId,
  kakaoClientId,
  redirectUrl,
} = getEnvVars();

const env = {
  baseUrl,
  googleClientId: {
    iosId: googleIosClientId,
    webId: googleWebClientId,
  },
  naverUrl,
  facebookClientId,
  kakaoClientId,
  redirectUrl,
} as const;

export default env;

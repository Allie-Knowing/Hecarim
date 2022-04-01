import getEnvVars from "../../environment";

const {
  baseUrl,
  googleIosClientId,
  googleWebClientId,
  naverClientId,
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
  naverClientId,
  facebookClientId,
  kakaoClientId,
  redirectUrl,
} as const;

export default env;

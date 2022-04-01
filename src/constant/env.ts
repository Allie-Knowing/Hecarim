import getEnvVars from "../../environment";

const {
  baseUrl,
  googleClientId,
  naverClientId,
  facebookClientId,
  kakaoClientId,
  redirectUrl,
} = getEnvVars();

const env = {
  baseUrl,
  googleClientId,
  naverClientId,
  facebookClientId,
  kakaoClientId,
  redirectUrl,
} as const;

export default env;

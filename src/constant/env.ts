import getEnvVars from "../../environment";

const { baseUrl, googleClientId, naverUrl, redirectUrl, appleUrl } =
  getEnvVars();

const env = {
  baseUrl,
  googleClientId: {
    iosId: googleClientId.iosId,
    androidId: googleClientId.androidId,
  },
  naverUrl,
  appleUrl,
  redirectUrl,
} as const;

export default env;

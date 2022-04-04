import getEnvVars from "../../environment";

const { baseUrl, googleIosClientId, googleWebClientId, naverUrl, redirectUrl } =
  getEnvVars();

const env = {
  baseUrl,
  googleClientId: {
    iosId: googleIosClientId,
    webId: googleWebClientId,
  },
  naverUrl,
  redirectUrl,
} as const;

export default env;

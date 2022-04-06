import getEnvVars from "../../environment";

const {
  baseUrl,
  googleIosClientId,
  googleWebClientId,
  naverUrl,
  redirectUrl,
  appleUrl,
} = getEnvVars();

const env = {
  baseUrl,
  googleClientId: {
    iosId: googleIosClientId,
    webId: googleWebClientId,
  },
  naverUrl,
  appleUrl,
  redirectUrl,
} as const;

export default env;

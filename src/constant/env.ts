import getEnvVars from "../../environment";

const { baseUrl, googleClientId, naverUrl, redirectUrl, appleUrl } =
  getEnvVars();

const env = {
  baseUrl,
  googleClientId,
  naverUrl,
  appleUrl,
  redirectUrl,
} as const;

export default env;

import getEnvVars from "../../environment";

const { baseUrl, clientId } = getEnvVars();

const env = {
  baseUrl: baseUrl,
  clientId: clientId,
} as const;

export default env;

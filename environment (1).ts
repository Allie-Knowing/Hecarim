import Constants from "expo-constants";

const ENV = {
  baseUrl: "http://knowing-server.allie.kr/",
  redirectUrl: "https://auth.expo.io/@kimjimin4471/Hecarim-frontend",
  googleIosClientId:
    "959677783670-rbngjac5fn02eh2evb9dqo7bl7ucrvvu.apps.googleusercontent.com",
  googleWebClientId:
    "959677783670-1od5ittcokehv2cufumvlolteu1k7o7b.apps.googleusercontent.com",
  naverClientId: "uMGvM5foQtwu8kwOG3yU",
  kakaoClientId: "f4a2d9780068427c49d9192c48226a54",
  facebookClientId: "678103440220688",
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  return ENV;
};

export default getEnvVars;

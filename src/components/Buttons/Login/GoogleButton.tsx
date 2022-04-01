import LoginButtonLayout from "layout/loginButton";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import AuthSession from "expo-auth-session";

const google = require("../../../assets/icons/login/google.png");

const GoogleButton = () => {
  const redirectUri = AuthSession.makeRedirectUri();
  const [request, response, prompAsync] = Google.useAuthRequest({
    webClientId: env.googleClientId,
    redirectUri: redirectUri,
    responseType: "code",
  });

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <TouchableOpacity>
      <LoginButtonLayout>
        <S.Logo source={google} />
        <Text>google 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default GoogleButton;

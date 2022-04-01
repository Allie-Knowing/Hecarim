import LoginButtonLayout from "layout/loginButton";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import AuthSession from "expo-auth-session";

const google = require("../../../assets/icons/login/google.png");

const GoogleButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [request, _, prompAsync] = Google.useAuthRequest({
    clientId: env.googleClientId.webId,
    // redirectUri: env.redirectUrl,
    responseType: "code",
    clientSecret: "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",
    scopes: ["openid", "email", "profile"],
  });

  const login = async () => {
    try {
      setLoading(true);
      const response = await prompAsync();
      if (response.type === "success") {
        console.log(response.params.code);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity disabled={!request} onPress={login}>
      <LoginButtonLayout>
        <S.Logo source={google} />
        <Text>Google 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default GoogleButton;

import LoginButtonLayout from "layout/loginButton";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import useSignin from "utils/hooks/signin/useSignin";
import { signin } from "utils/api/signin";

const google = require("../../../assets/icons/login/google.png");

const GoogleButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state, setState } = useSignin();
  const [request, _, prompAsync] = Google.useAuthRequest({
    clientId: env.googleClientId.webId,
    responseType: "code",
    clientSecret: "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",
    scopes: ["openid", "email", "profile"],
  });

  const login = async () => {
    try {
      setLoading(true);
      const response = await prompAsync();
      if (response.type === "success") {
        signin({ code: response.params.code, provider: "GOOGLE" });
        // setState.signin({ code: response.params.code, provider: "GOOGLE" });
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

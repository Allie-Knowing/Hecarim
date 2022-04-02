import LoginButtonLayout from "layout/loginButton";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import useSignin from "utils/hooks/signin/useSignin";
import { signin } from "utils/api/signin";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";

const google = require("../../../assets/icons/login/google.png");

const GoogleButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state, setState } = useSignin();
  const [request, _, prompAsync] = Google.useAuthRequest({
    clientId: env.googleClientId.webId,
    responseType: "id_token",
    redirectUri: env.redirectUrl,
    scopes: ["openid", "email", "profile"],
  });
  const login = async () => {
    console.log(await localStorage.getItem(storageKeys.accessToken));
    try {
      setLoading(true);
      const response = await prompAsync();
      if (response.type === "success") {
        setState.signin({
          id_token: response.params.id_token,
          provider: "GOOGLE",
        });
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

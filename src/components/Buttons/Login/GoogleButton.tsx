import LoginButtonLayout from "layout/loginButton";
import React, { FC, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import useSignin from "utils/hooks/signin/useSignin";
import { SIGNIN } from "modules/redux/action/signin/interface";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";

const google = require("../../../assets/icons/login/google.png");

type Props = StackNavigationProp<MainStackParamList, "Login">;

const GoogleButton: FC<Props> = (navigation) => {
  const { state, setState } = useSignin();
  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId: env.googleClientId.webId,
    responseType: "id_token",
    redirectUri: env.redirectUrl,
    scopes: ["openid", "email", "profile"],
  });

  useEffect(() => {
    setState.reset();
  }, []);

  useEffect(() => {
    if (state.isSignin) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [state.isSignin]);

  useEffect(() => {
    if (state.error.type === SIGNIN) {
      alert("로그인 정보가 잘못되었습니다.");
      setState.reset();
    }
  }, [state.error]);

  const login = async () => {
    const response = await prompAsync();
    if (response.type === "success") {
      setState.signin({
        id_token: response.params.id_token,
        provider: "GOOGLE",
      });
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

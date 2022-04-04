import LoginButtonLayout from "layout/loginButton";
import React, { FC } from "react";
import * as S from "./styles";
import { Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import * as AuthSession from "expo-auth-session";
import env from "constant/env";
import useSignin from "utils/hooks/signin/useSignin";

const naver = require("../../../assets/icons/login/naver.png");

type Props = StackNavigationProp<MainStackParamList, "Login">;

const NaverButton: FC<Props> = (navigation) => {
  const { state, setState } = useSignin();

  const naverLogin = async () => {
    const result = await AuthSession.startAsync({
      authUrl: env.naverUrl + env.redirectUrl,
    });

    if (result.type === "success") {
      const code = result.params.code;
      setState.signin({
        id_token: code,
        provider: "NAVER",
      });
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  };

  return (
    <TouchableOpacity onPress={naverLogin}>
      <LoginButtonLayout>
        <S.Logo source={naver} />
        <Text>네이버 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default NaverButton;

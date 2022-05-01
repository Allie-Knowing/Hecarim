import LoginButtonLayout from "layout/loginButton";
import React, { FC, useEffect } from "react";
import * as S from "./styles";
import { Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import * as AuthSession from "expo-auth-session";
import env from "constant/env";
import useSignin from "queries/Signin";
import axios from "axios";
import useAlert from "hooks/useAlert";
import naver from "../../../assets/icons/login/naver.png";

const redirectUrl = AuthSession.getRedirectUrl();
const URI = env.naverUrl + redirectUrl;

type Props = StackNavigationProp<MainStackParamList, "Login">;

const NaverButton: FC<Props> = (navigation) => {
  const { mutate, isError, error, isSuccess } = useSignin();
  const { closeAlert, showAlert } = useAlert();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [isSuccess, navigation]);

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response.status === 409) {
      showAlert({
        title: "사용중인 이메일입니다.",
        content: "다른 계정으로 시도해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [closeAlert, error, isError, showAlert]);

  const naverLogin = async () => {
    const result = await AuthSession.startAsync({
      authUrl: URI,
    });

    if (result.type === "success") {
      const code = result.params.code;
      mutate({
        id_token: code,
        provider: "NAVER",
      });
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

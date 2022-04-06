import LoginButtonLayout from "layout/loginButton";
import React, { FC, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import * as Google from "expo-auth-session/providers/google";
import { SIGNIN } from "modules/redux/action/signin/interface";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import useSignin from "queries/Signin";
import useAlert from "hooks/useAlert";
import axios from "axios";

const google = require("../../../assets/icons/login/google.png");

type Props = StackNavigationProp<MainStackParamList, "Login">;

const GoogleButton: FC<Props> = (navigation) => {
  const { mutate, isSuccess, isError, error } = useSignin();
  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId: env.googleClientId.webId,
    responseType: "id_token",
    redirectUri: env.redirectUrl,
    scopes: ["openid", "email", "profile"],
  });
  const { closeAlert, showAlert } = useAlert();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [isSuccess]);

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
  }, [isError]);

  const login = async () => {
    const response = await prompAsync();
    if (response.type === "success") {
      mutate({
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

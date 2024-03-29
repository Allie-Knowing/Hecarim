/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import LoginButtonLayout from "layout/loginButton";
import React, { FC, useEffect } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import env from "constant/env";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import useAlert from "hooks/useAlert";
import axios from "axios";
import * as GoogleSignIn from "expo-google-sign-in";
import useGoogleSignin from "queries/GoogleSignin";
import google from "../../../assets/icons/login/google.png";

type Props = StackNavigationProp<MainStackParamList, "Login">;

const GoogleButton: FC<Props> = (navigation) => {
  const { mutate, isSuccess, isError, error } = useGoogleSignin();
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

  const login = async () => {
    try {
      await GoogleSignIn.initAsync({
        signInType: GoogleSignIn.TYPES.DEFAULT,
        clientId:
          Platform.OS === "android" ? env.googleClientId.androidId : env.googleClientId.iosId,
        scopes: [
          GoogleSignIn.SCOPES.OPEN_ID,
          GoogleSignIn.SCOPES.EMAIL,
          GoogleSignIn.SCOPES.PROFILE,
        ],
      });
      await GoogleSignIn.askForPlayServicesAsync();
      const response = await GoogleSignIn.signInAsync();
      if (response.type === "success") {
        mutate({
          name: response.user.displayName,
          picture: response.user.photoURL,
          email: response.user.email,
        });
      }
    } catch (error) {
      showAlert({
        title: "로그인에 실패했습니다.",
        content: error.message,
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  };

  return (
    <TouchableOpacity onPress={login}>
      <LoginButtonLayout>
        <S.Logo source={google} />
        <Text>Google 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default GoogleButton;

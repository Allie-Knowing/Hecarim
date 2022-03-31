import LoginButtonLayout from "layout/loginButton";
import React from "react";
import { Image, Text } from "react-native";
import * as S from "./styles";

const google = require("../../../assets/icons/login/google.png");

const GoogleButton = () => {
  return (
    <LoginButtonLayout>
      <S.Logo source={google} />
      <Text>google 계정으로 로그인</Text>
    </LoginButtonLayout>
  );
};

export default GoogleButton;

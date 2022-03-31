import LoginButtonLayout from "layout/loginButton";
import React from "react";
import * as S from "./styles";
import { Text } from "react-native";

const facebook = require("../../../assets/icons/login/facebook.png");

const FacebookButton = () => {
  return (
    <LoginButtonLayout>
      <S.Logo source={facebook} />
      <Text>페이스북 계정으로 로그인</Text>
    </LoginButtonLayout>
  );
};

export default FacebookButton;

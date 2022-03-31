import LoginButtonLayout from "layout/loginButton";
import React from "react";
import * as S from "./styles";
import { Text } from "react-native";

const naver = require("../../../assets/icons/login/naver.png");

const NaverButton = () => {
  return (
    <LoginButtonLayout>
      <S.Logo source={naver} />
      <Text>네이버 계정으로 로그인</Text>
    </LoginButtonLayout>
  );
};

export default NaverButton;

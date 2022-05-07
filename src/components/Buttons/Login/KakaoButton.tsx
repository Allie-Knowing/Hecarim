import LoginButtonLayout from "layout/loginButton";
import React from "react";
import * as S from "./styles";
import { Text } from "react-native";
import kakao from "../../../assets/icons/login/kakao.png";


const NaverButton = () => {
  return (
    <LoginButtonLayout>
      <S.Logo source={kakao} />
      <Text>카카오 계정으로 로그인</Text>
    </LoginButtonLayout>
  );
};

export default NaverButton;

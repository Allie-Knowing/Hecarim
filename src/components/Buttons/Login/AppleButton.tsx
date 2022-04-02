import LoginButtonLayout from "layout/loginButton";
import React, { useEffect } from "react";
import * as S from "./styles";
import { Text, TouchableOpacity } from "react-native";
import env from "constant/env";

const apple = require("../../../assets/icons/login/apple.png");

const FacebookButton = () => {
  return (
    <TouchableOpacity>
      <LoginButtonLayout>
        <S.Logo source={apple} resizeMode="contain" />
        <Text>Apple 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default FacebookButton;

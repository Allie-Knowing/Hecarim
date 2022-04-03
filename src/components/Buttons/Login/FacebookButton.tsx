import LoginButtonLayout from "layout/loginButton";
import React, { useEffect } from "react";
import * as S from "./styles";
import { Text, TouchableOpacity } from "react-native";
import env from "constant/env";

const facebook = require("../../../assets/icons/login/facebook.png");

const FacebookButton = () => {
  return (
    <TouchableOpacity>
      <LoginButtonLayout>
        <S.Logo source={facebook} />
        <Text>페이스북 계정으로 로그인</Text>
      </LoginButtonLayout>
    </TouchableOpacity>
  );
};

export default FacebookButton;

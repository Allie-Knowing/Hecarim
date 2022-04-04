import env from "constant/env";
import React, { FC } from "react";
import WebView from "react-native-webview";
import * as S from "./styles";

const uri = env.naverUrl + env.redirectUrl;

const LoginWebView: FC = () => {
  return (
    <S.Conatiner>
      <WebView source={{ uri }} />
    </S.Conatiner>
  );
};

export default LoginWebView;

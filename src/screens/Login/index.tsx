import LoginButton from "components/Buttons/Login";
import LoginHeader from "components/Header/Login";
import React, { FC } from "react";
import { Dimensions, ListRenderItem, SectionListData } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const google = require("../../assets/icons/login/google.png");
const naver = require("../../assets/icons/login/naver.png");
const kakao = require("../../assets/icons/login/kakao.png");
const facebook = require("../../assets/icons/login/facebook.png");

interface ButtonType {
  source: string;
  text: string;
}

const LOGIN_CONSTANT = [
  {
    data: [
      { source: google, text: "Google 계정으로 로그인" },
      { source: naver, text: "네이버 계정으로 로그인" },
      { source: kakao, text: "카카오 계정으로 로그인" },
      { source: facebook, text: "페이스북 계정으로 로그인" },
    ],
  },
];

const { height } = Dimensions.get("screen");

const Login: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container>
      <LoginHeader />
      <S.Content height={height - (50 + topPad)}>
        <S.Title>세상의 모든 질문을,{"\n"} Knowing.</S.Title>
        <S.LoginBtnContainer>
          <S.LoginDescription>로그인 후 질문해보세요.</S.LoginDescription>
          <S.LoginButtonList
            contentContainerStyle={{
              height: 200,
              justifyContent: "space-between",
            }}
            scrollEnabled={false}
            sections={LOGIN_CONSTANT}
            renderItem={({ item }: { item: SectionListData<ButtonType> }) => {
              return (
                <LoginButton logoSource={item.source}>{item.text}</LoginButton>
              );
            }}
          />
        </S.LoginBtnContainer>
      </S.Content>
    </S.Container>
  );
};

export default Login;

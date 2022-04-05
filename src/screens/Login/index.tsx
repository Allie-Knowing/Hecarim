import { StackNavigationProp } from "@react-navigation/stack";
import AppleButton from "components/Buttons/Login/AppleButton";
import GoogleButton from "components/Buttons/Login/GoogleButton";
import NaverButton from "components/Buttons/Login/NaverButton";
import LoginHeader from "components/Header/Login";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const { height } = Dimensions.get("screen");

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Login">;
};

const Login: FC<Props> = ({ navigation }) => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container>
      <LoginHeader {...navigation} />
      <S.Content height={height - (50 + topPad)}>
        <S.Title>세상의 모든 질문을,{"\n"} Knowing.</S.Title>
        <S.LoginBtnContainer>
          <S.LoginDescription>로그인 후 질문해보세요.</S.LoginDescription>
          <View>
            <GoogleButton {...navigation} />
            <NaverButton {...navigation} />
            <AppleButton />
          </View>
        </S.LoginBtnContainer>
      </S.Content>
    </S.Container>
  );
};

export default Login;

import { StackNavigationProp } from "@react-navigation/stack";
import AppleButton from "components/Buttons/Login/AppleButton";
import GoogleButton from "components/Buttons/Login/GoogleButton";
import NaverButton from "components/Buttons/Login/NaverButton";
import useMainStackNavigation, {
  MainStackParamList,
} from "hooks/useMainStackNavigation";
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
  const stackNavigation = useMainStackNavigation();

  return (
    <S.Container>
      <S.Content height={height - (50 + topPad)}>
        <S.Title>세상의 모든 질문을,{"\n"}Knowing.</S.Title>
        <S.LoginBtnContainer>
          <S.LoginDescription>로그인 후 질문해보세요.</S.LoginDescription>
          <View>
            <GoogleButton {...navigation} />
            <NaverButton {...navigation} />
            <AppleButton {...navigation} />
          </View>
        </S.LoginBtnContainer>
        <S.TermsContainer>
          <S.LoginTermsBox>
            계속 진행하면 Knowing의
            <S.TermsPoint
              onPress={() => stackNavigation.navigate("TermsOfService")}
            >
              {""} 이용약관
            </S.TermsPoint>
            에 동의하고,
            {"\n"}
            Knowing의
            <S.TermsPoint
              onPress={() => stackNavigation.navigate("PrivacyPolicy")}
            >
              {""} 개인정보 보호정책
            </S.TermsPoint>
            을 읽었음을 확인하는 것입니다.
          </S.LoginTermsBox>
        </S.TermsContainer>
      </S.Content>
    </S.Container>
  );
};

export default Login;

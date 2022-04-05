import LoginButtonLayout from "layout/loginButton";
import React, { FC } from "react";
import * as S from "./styles";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import env from "constant/env";
import * as AppleAuthentication from "expo-apple-authentication";
import theme from "theme/theme";
import useSignin from "queries/Signin";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";

const apple = require("../../../assets/icons/login/apple.png");

const URI = `${env.appleUrl}${env.redirectUrl}`;
const { width } = Dimensions.get("screen");
type Props = StackNavigationProp<MainStackParamList, "Login">;

const AppleButton: FC<Props> = (navigation) => {
  const signin = useSignin();

  return (
    <S.AppleWrapper width={width}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={5}
        style={{
          width: width - 40,
          height: 40,
          borderColor: theme.colors.grayscale.scale20,
          borderWidth: 1,
          borderRadius: 5,
        }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log("asdasd", credential);
            signin.mutate({
              id_token: credential.identityToken,
              provider: "APPLE",
            });
            navigation.reset({ routes: [{ name: "Main" }] });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </S.AppleWrapper>

    // <TouchableOpacity onPress={appleLogin}>
    //   <LoginButtonLayout>
    //     <S.Logo source={apple} resizeMode="contain" />
    //     <Text>Apple 계정으로 로그인</Text>
    //   </LoginButtonLayout>
    // </TouchableOpacity>
  );
};

export default AppleButton;

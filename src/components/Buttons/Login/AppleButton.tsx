import React, { FC, useEffect } from "react";
import * as S from "./styles";
import { Dimensions } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import theme from "theme/theme";
import useSignin from "queries/Signin";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import useAlert from "hooks/useAlert";
import axios from "axios";

const { width } = Dimensions.get("screen");
type Props = StackNavigationProp<MainStackParamList, "Login">;

const AppleButton: FC<Props> = (navigation) => {
  const { mutate, isError, error, isSuccess } = useSignin();
  const { closeAlert, showAlert } = useAlert();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response.status === 409) {
      showAlert({
        title: "사용중인 이메일입니다.",
        content: "다른 계정으로 시도해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [isError]);

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
            console.log(credential);
            mutate({
              id_token: credential.identityToken,
              provider: "APPLE",
              name: credential.fullName.nickname,
            });
          } catch (error) {
            showAlert({
              title: "로그인에 실패했습니다.",
              content: "잠시 후 다시 시도하세요.",
              buttons: [
                {
                  text: "확인",
                  color: "black",
                  onPress: (id) => closeAlert(id),
                },
              ],
            });
          }
        }}
      />
    </S.AppleWrapper>
  );
};

export default AppleButton;

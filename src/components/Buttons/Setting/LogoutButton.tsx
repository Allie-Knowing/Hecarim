import { StackNavigationProp } from "@react-navigation/stack";
import storageKeys from "constant/storageKeys";
import useAlert from "hooks/useAlert";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import localStorage from "utils/localStorage";
import * as S from "./styles";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Setting">;
};

const LogoutButton: FC<Props> = ({ navigation }) => {
  const { closeAlert: closeAlret, showAlert: showAlret } = useAlert();

  const logout = () => {
    showAlret({
      title: "로그아웃 하시겠습니까?",
      content: "메인페이지로 이동합니다.",
      buttons: [
        { text: "취소", color: "black", onPress: (id) => closeAlret(id) },
        {
          text: "로그아웃",
          color: "red",
          onPress: async (alert) => {
            closeAlret(alert);
            await localStorage.removeItem(storageKeys.accessToken);
            await localStorage.removeItem(storageKeys.refreshToken);
            navigation.reset({ routes: [{ name: "Main" }] });
          },
        },
      ],
    });
  };

  return (
    <S.ButtonWrapper activeOpacity={0.8} onPress={logout}>
      <S.Logout>로그아웃</S.Logout>
    </S.ButtonWrapper>
  );
};

export default LogoutButton;

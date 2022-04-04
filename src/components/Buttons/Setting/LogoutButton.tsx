import { StackNavigationProp } from "@react-navigation/stack";
import storageKeys from "constant/storageKeys";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import localStorage from "utils/localStorage";
import * as S from "./styles";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Setting">;
};

const LogoutButton: FC<Props> = ({ navigation }) => {
  const logout = async () => {
    await localStorage.removeItem(storageKeys.accessToken);
    await localStorage.removeItem(storageKeys.refreshToken);
    alert("로그아웃");
    navigation.reset({ routes: [{ name: "Main" }] });
  };

  return (
    <S.ButtonWrapper activeOpacity={0.8} onPress={logout}>
      <S.Logout>로그아웃</S.Logout>
    </S.ButtonWrapper>
  );
};

export default LogoutButton;

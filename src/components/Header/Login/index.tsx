import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const backIcon = require("../../../assets/icons/login/backIcon.png");

type Props = StackNavigationProp<MainStackParamList, "Login">;

const LoginHeader: FC<Props> = (navigation) => {
  const { top: topPad } = useSafeAreaInsets();

  const goBack = () => {
    navigation.pop();
  };

  return (
    <S.Container topPad={topPad}>
      <TouchableOpacity onPress={goBack}>
        <S.BackIcon source={backIcon} />
      </TouchableOpacity>
    </S.Container>
  );
};

export default LoginHeader;

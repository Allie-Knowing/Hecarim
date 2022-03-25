import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const backIcon = require("../../../assets/icons/login/backIcon.png");

const LoginHeader: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container topPad={topPad}>
      <S.BackIcon source={backIcon} />
    </S.Container>
  );
};

export default LoginHeader;

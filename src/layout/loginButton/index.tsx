import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./styles";

interface Props {
  children: JSX.Element[];
}

const { width } = Dimensions.get("screen");

const LoginButtonLayout: FC<Props> = ({ children }) => {
  return <S.Wrapper width={width}>{children}</S.Wrapper>;
};

export default LoginButtonLayout;

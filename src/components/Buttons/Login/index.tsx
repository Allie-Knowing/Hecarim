import React, { FC } from "react";
import { Dimensions } from "react-native";
import { ButtonProps } from "..";
import * as S from "./styles";

interface LoginButtonProps extends ButtonProps {
  logoSource: any;
}

const { width } = Dimensions.get("screen");

const LoginButton: FC<LoginButtonProps> = ({
  onPress,
  children,
  disabled,
  logoSource,
}) => {
  return (
    <S.Container width={width - 40}>
      <S.LoginIcon source={logoSource} />
      <S.Title>{children}</S.Title>
    </S.Container>
  );
};

export default LoginButton;

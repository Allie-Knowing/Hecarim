import React, { FC } from "react";
import * as S from "./styles";

type Props = {
  title: string;
  isRed: boolean;
  onPressFunction: () => void;
};

const DefaultSettingButton: FC<Props> = ({ title, isRed, onPressFunction }) => {
  return (
    <S.ButtonWrapper activeOpacity={0.8} onPress={onPressFunction}>
      {isRed ? (
        <S.ButtonTitleRed>{title}</S.ButtonTitleRed>
      ) : (
        <S.ButtonTitle>{title}</S.ButtonTitle>
      )}
    </S.ButtonWrapper>
  );
};

export default DefaultSettingButton;

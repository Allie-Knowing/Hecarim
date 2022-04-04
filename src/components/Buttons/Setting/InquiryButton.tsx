import React, { FC } from "react";
import { Linking } from "react-native";
import * as S from "./styles";

const InquiryButton: FC = () => {
  const openLanding = () => {
    Linking.openURL("https://knowing.allie.kr/");
  };

  return (
    <S.ButtonWrapper activeOpacity={0.8} onPress={openLanding}>
      <S.ButtonTitle>문의하기</S.ButtonTitle>
    </S.ButtonWrapper>
  );
};

export default InquiryButton;

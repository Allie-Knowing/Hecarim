import React, { FC } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const Logo = require("assets/icons/walletLogo.png");
const TierImage = require("assets/tier.png");

const WalletInfo: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  console.log(topPad);

  return (
    <S.WalletInfoContainer topPad={topPad}>
        <S.WalletHeader>
          <S.Logo source={Logo} />
          <S.HeaderTitle>지갑</S.HeaderTitle>
        </S.WalletHeader>
        <S.TierContainer>
          <S.TireInfo>
            <S.TierImage source={TierImage} />
            <S.TireTitle>챌린저</S.TireTitle>
          </S.TireInfo>
          <S.ShowTireButton>
            <S.ShowTireButtonDescription>등급보기</S.ShowTireButtonDescription>
          </S.ShowTireButton>
        </S.TierContainer>
        <S.Accumulate>
          <S.AccumulateContent>
            <S.AccumulateTitle>누적 IQ</S.AccumulateTitle>
            <S.AccumulateValue>999999 IQ</S.AccumulateValue>
          </S.AccumulateContent>
          <S.AccumulateContent>
            <S.AccumulateTitle>채택 수</S.AccumulateTitle>
            <S.AccumulateValue>99999</S.AccumulateValue>
          </S.AccumulateContent>
        </S.Accumulate>
        <S.HoldingContainer>
          <S.HoldingContent>
            <S.HoldingTitle>보유 IQ</S.HoldingTitle>
            <S.HoldingValue>99999 IQ</S.HoldingValue>
          </S.HoldingContent>
          <S.HoldingLine />
          <S.HoldingContent>
            <S.HoldingTitle>오늘 활동점수</S.HoldingTitle>
            <S.HoldingValue>99</S.HoldingValue>
          </S.HoldingContent>
        </S.HoldingContainer>
    </S.WalletInfoContainer>
  );
};

export default WalletInfo;

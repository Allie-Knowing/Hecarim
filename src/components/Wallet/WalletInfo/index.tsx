import { useWalletPoint } from "queries/Wallet";
import React, { FC } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const Logo = require("assets/icons/walletLogo.png");
const TierImage = require("assets/tier.png");

const WalletInfo: FC = () => {
  const { top: topPad } = useSafeAreaInsets();
  const { data, isSuccess, isError, isLoading } = useWalletPoint();

  return (
    <>
      <S.WalletInfoContainer topPad={topPad}>
        {isLoading && <Text>Loading...</Text>}
        {data && (
          <>
            <S.WalletHeader>
              <S.Logo source={Logo} />
              <S.HeaderTitle>지갑</S.HeaderTitle>
            </S.WalletHeader>
            <S.TierContainer>
              <S.TireInfo>
                <S.TireTitle>{data.category_name}</S.TireTitle>
              </S.TireInfo>
              <S.ShowTireButton>
                <S.ShowTireButtonDescription>
                  등급보기
                </S.ShowTireButtonDescription>
              </S.ShowTireButton>
            </S.TierContainer>
            <S.Accumulate>
              <S.AccumulateContent>
                <S.AccumulateTitle>누적 IQ</S.AccumulateTitle>
                <S.AccumulateValue>{data.tot_cnt} IQ</S.AccumulateValue>
              </S.AccumulateContent>
              <S.AccumulateContent>
                <S.AccumulateTitle>채택 수</S.AccumulateTitle>
                <S.AccumulateValue>{data.adoption_cnt}</S.AccumulateValue>
              </S.AccumulateContent>
            </S.Accumulate>
            <S.HoldingContainer>
              <S.HoldingContent>
                <S.HoldingTitle>보유 IQ</S.HoldingTitle>
                <S.HoldingValue>{data.cur_cnt} IQ</S.HoldingValue>
              </S.HoldingContent>
              <S.HoldingLine />
              <S.HoldingContent>
                <S.HoldingTitle>오늘 활동점수</S.HoldingTitle>
                <S.HoldingValue>12</S.HoldingValue>
              </S.HoldingContent>
            </S.HoldingContainer>
          </>
        )}
      </S.WalletInfoContainer>
    </>
  );
};

export default WalletInfo;

import { getPointResponse } from "api/Wallet";
import React, { FC } from "react";
import { Dimensions, GestureResponderEvent } from "react-native";
import * as S from "./style";
import TierLine from "./TierLine";
import Logo from "assets/icons/walletLogo.png";

const { width, height } = Dimensions.get("window");

interface Props extends getPointResponse {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DATA = [
  {
    tier: "티어",
    selection: "채택수",
    iq: "총 IQ",
  },
  {
    tier: "알파",
    selection: 1,
    iq: 100,
  },
  {
    tier: "베타",
    selection: 5,
    iq: 500,
  },
  {
    tier: "감마",
    selection: 10,
    iq: 1000,
  },
  {
    tier: "텔타",
    selection: 20,
    iq: 2000,
  },
  {
    tier: "세타",
    selection: 50,
    iq: 5000,
  },
  {
    tier: "람다",
    selection: 100,
    iq: 10000,
  },
  {
    tier: "뮤",
    selection: 300,
    iq: 30000,
  },
  {
    tier: "오미크론",
    selection: 1000,
    iq: 100000,
  },
  {
    tier: "시그마",
    selection: 10000,
    iq: 1000000,
  },
];

const nextTire = (currentTire: string) => {
  return DATA[DATA.findIndex(({ tier }) => tier === currentTire) + 1].tier;
};

const TierModal: FC<Props> = ({
  closeModal,
  category_name,
  next_tot_iq,
  tot_cnt,
  next_adoption_cnt,
  adoption_cnt,
}) => {
  const closetierModal = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) closeModal(false);
  };

  return (
    <S.TierModalContainer
      width={width}
      height={height}
      onPress={closetierModal}
      activeOpacity={1}
    >
      <S.TireModalContent>
        <S.Header>
          <S.Logo source={Logo} />
          <S.TireName>{category_name}</S.TireName>
          <S.NextTire>
            {nextTire(category_name)}까지{" "}
            {tot_cnt - next_tot_iq < 0
              ? `${next_tot_iq - tot_cnt} IQ `
              : `${next_adoption_cnt - adoption_cnt} 채택 수 `}
            남았습니다.
          </S.NextTire>
        </S.Header>
        <S.TireGaugeContainer>
          <S.TireBarBackground>
            <S.TireBar
              width={
                (tot_cnt / next_tot_iq) * 100 <= 100
                  ? (tot_cnt / next_tot_iq) * 100
                  : 100
              }
            />
          </S.TireBarBackground>
          <S.TireDescription>
            <S.TireDescriptionFont>{category_name}</S.TireDescriptionFont>
            <S.TireDescriptionFont>
              {nextTire(category_name)}
            </S.TireDescriptionFont>
          </S.TireDescription>
        </S.TireGaugeContainer>
        <S.TireTable>
          {DATA.map((v, i) => {
            return <TierLine {...v} key={i} />;
          })}
        </S.TireTable>
      </S.TireModalContent>
    </S.TierModalContainer>
  );
};

export default TierModal;

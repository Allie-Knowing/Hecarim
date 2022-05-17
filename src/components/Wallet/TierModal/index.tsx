import React, { FC } from "react";
import { Dimensions, GestureResponderEvent } from "react-native";
import * as S from "./style";
import TierLine from "./TierLine";

const { width, height } = Dimensions.get("window");

interface Props {
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

const TierModal: FC<Props> = ({ closeModal }) => {
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
      <S.Content>
        <S.Table>
          {DATA.map((v, i) => {
            return <TierLine {...v} key={i} />;
          })}
        </S.Table>
      </S.Content>
    </S.TierModalContainer>
  );
};

export default TierModal;

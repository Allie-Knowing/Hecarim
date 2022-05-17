import React, { FC } from "react";
import { Dimensions, GestureResponderEvent, Text } from "react-native";
import { GestureEvent } from "react-native-gesture-handler";
import * as S from "./style";
import TireLine from "./TireLine";

const { width, height } = Dimensions.get("window");

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DATA = [
  {
    tire: "티어",
    selection: "채택수",
    iq: "총 IQ",
  },
  {
    tire: "알파",
    selection: 1,
    iq: 100,
  },
  {
    tire: "베타",
    selection: 5,
    iq: 500,
  },
  {
    tire: "감마",
    selection: 10,
    iq: 1000,
  },
  {
    tire: "텔타",
    selection: 20,
    iq: 2000,
  },
  {
    tire: "세타",
    selection: 50,
    iq: 5000,
  },
  {
    tire: "람다",
    selection: 100,
    iq: 10000,
  },
  {
    tire: "뮤",
    selection: 300,
    iq: 30000,
  },
  {
    tire: "오미크론",
    selection: 1000,
    iq: 100000,
  },
  {
    tire: "시그마",
    selection: 10000,
    iq: 1000000,
  },
];

const TireModal: FC<Props> = ({ closeModal }) => {
  const closeTireModal = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) closeModal(false);
  };

  return (
    <S.TireModalContainer
      width={width}
      height={height}
      onPress={closeTireModal}
      activeOpacity={1}
    >
      <S.Content>
        <S.Table>
          {DATA.map((v, i) => {
            return <TireLine {...v} key={i} />;
          })}
        </S.Table>
      </S.Content>
    </S.TireModalContainer>
  );
};

export default TireModal;

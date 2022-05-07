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
    tire: "응애",
    selection: 1,
    iq: 100,
  },
  {
    tire: "유딩",
    selection: 5,
    iq: 500,
  },
  {
    tire: "초딩",
    selection: 10,
    iq: 1000,
  },
  {
    tire: "중딩",
    selection: 20,
    iq: 2000,
  },
  {
    tire: "고딩",
    selection: 50,
    iq: 5000,
  },
  {
    tire: "대딩",
    selection: 100,
    iq: 10000,
  },
  {
    tire: "박사",
    selection: 300,
    iq: 30000,
  },
  {
    tire: "성인",
    selection: 1000,
    iq: 100000,
  },
  {
    tire: "현인",
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

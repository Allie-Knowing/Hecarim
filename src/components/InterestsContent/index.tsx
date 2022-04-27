import React, { FC } from "react";
import { Dimensions, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InterestsItem from "./InterestsItem";
import { INTERESTS_Map } from "constance/interests";
import * as S from "./style";
import BrandButton from "components/Buttons/Brand";
import theme from "theme/theme";

const { height } = Dimensions.get("screen");

const InterestsContent: FC = () => {
  const { top: topPad } = useSafeAreaInsets();
  return (
    <S.InterestsContentContainer height={height - (50 + topPad)}>
      <S.Title>관심있는 컨텐츠를 선택해보세요.</S.Title>
      <S.Description>언제든지 변경 가능해요.</S.Description>
      <S.InterestsField>
        {INTERESTS_Map.map((v, index) => {
          return <InterestsItem title={v.title} image={v.image} />;
        })}
      </S.InterestsField>
      <S.CheckButton>
        <S.ButtonTitle>완료</S.ButtonTitle>
      </S.CheckButton>
    </S.InterestsContentContainer>
  );
};

export default InterestsContent;

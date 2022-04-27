import React, { FC } from "react";
import { ImageSourcePropType } from "react-native";
import * as S from "./style";

interface Props {
  title: string;
  image: ImageSourcePropType;
}

const InterestsItem: FC<Props> = ({ title, image }) => {
  return (
    <S.InterestsItemContainer>
      <S.BackgroundImage source={image} resizeMode="cover" />
    </S.InterestsItemContainer>
  );
};

export default InterestsItem;

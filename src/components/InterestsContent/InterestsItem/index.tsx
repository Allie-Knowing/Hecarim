import React, { FC } from "react";
import { ImageSourcePropType } from "react-native";
import * as S from "./style";

interface Props {
  title: string;
  image: ImageSourcePropType;
  checkInterestsItem: (index: number) => void;
  index: number;
  check: boolean;
}

const InterestsItem: FC<Props> = ({
  title,
  image,
  checkInterestsItem,
  index,
  check,
}) => {
  return (
    <S.InterestsItemContainer
      activeOpacity={0.9}
      onPress={() => checkInterestsItem(index)}
    >
      <S.BackgroundImage source={image} resizeMode="cover" check={check} />
      <S.grayWrapper>
        <S.Title>{title}</S.Title>
        <S.checkCircle check={check} />
      </S.grayWrapper>
    </S.InterestsItemContainer>
  );
};

export default InterestsItem;

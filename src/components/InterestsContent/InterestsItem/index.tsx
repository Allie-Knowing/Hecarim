import React, { FC } from "react";
import { ImageSourcePropType } from "react-native";
import * as S from "./style";

interface Props {
  title: string;
  image: ImageSourcePropType;
  setItem: React.Dispatch<React.SetStateAction<Boolean[]>>;
  item: Boolean[];
  index: number;
}

const InterestsItem: FC<Props> = ({ title, image, item, setItem, index }) => {
  const onPressCheck = () => {
    let arr = item;
    arr[index] = !item[index];
    setItem(arr);
  };

  return (
    <S.InterestsItemContainer activeOpacity={0.9} onPress={onPressCheck}>
      <S.BackgroundImage source={image} resizeMode="cover"  check={item[index]}/>
      <S.grayWrapper>
        <S.Title>{title}</S.Title>
        <S.checkCircle check={item[index]} />
      </S.grayWrapper>
    </S.InterestsItemContainer>
  );
};

export default InterestsItem;

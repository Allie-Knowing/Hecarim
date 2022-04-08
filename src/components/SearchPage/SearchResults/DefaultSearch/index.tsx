import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import * as S from "./style";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";

const { height } = Dimensions.get("screen");

interface Props {
  title: string;
}

const DefaultSearch: FC<Props> = ({ title }) => {
  return (
    <View>
      <SearchTopNavigation title={title} />
      <S.View height={height / 1.44}>
        <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
      </S.View>
    </View>
  );
};

export default DefaultSearch;

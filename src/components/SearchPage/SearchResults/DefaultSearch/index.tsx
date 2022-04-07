import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import * as S from "./style";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";

const { height } = Dimensions.get("screen");

interface Props {}

const DefaultSearch: FC<Props> = () => {
  return (
    <View>
      <SearchTopNavigation />
      <S.View height={height / 1.44}>
        <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
      </S.View>
    </View>
  );
};

export default DefaultSearch;

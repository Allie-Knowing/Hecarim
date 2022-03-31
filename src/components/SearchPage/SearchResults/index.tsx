import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const { height } = Dimensions.get("screen");

const SearchResults: FC = () => {
  return (
    <S.Wrapper height={height / 1.374}>
      <S.View>
        <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
      </S.View>
    </S.Wrapper>
  );
};

export default SearchResults;

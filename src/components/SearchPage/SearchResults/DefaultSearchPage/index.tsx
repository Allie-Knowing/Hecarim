import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import React, { FC } from "react";
import { Fragment } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const { height } = Dimensions.get("screen");

const DefaultSearchPage: FC = () => {
  return (
    <Fragment>
      <SearchTopNavigation />
      <S.Wrapper height={height / 1.374}>
        <S.View>
          <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
        </S.View>
      </S.Wrapper>
    </Fragment>
  );
};

export default DefaultSearchPage;

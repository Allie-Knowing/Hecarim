import React, { FC } from "react";
import * as S from "./style";
import DefaultPageHeader from "components/Header/DefaultPage";
import DefaultSearch from "components/SearchPage/SearchResults/DefaultSearch";
import isStackContext from "context/IsStackContext";

const DefaultSearchPage: FC = () => {
  return (
    <isStackContext.Provider value={false}>
      <S.Wrapper>
        <DefaultPageHeader />
        <DefaultSearch />
      </S.Wrapper>
    </isStackContext.Provider>
  );
};

export default DefaultSearchPage;

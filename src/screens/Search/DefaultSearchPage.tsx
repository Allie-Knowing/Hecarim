import React, { FC } from "react";
import * as S from "./style";
import DefaultPageHeader from "components/Header/DefaultPage";
import DefaultSearch from "components/SearchPage/SearchResults/DefaultSearch";
import isStackContext from "context/IsStackContext";

const DefaultSearchPage: FC = () => {
  return (
    <isStackContext.Provider value={false}>
      <S.DefaultPageWrapper>
        <DefaultPageHeader />
        <DefaultSearch />
      </S.DefaultPageWrapper>
    </isStackContext.Provider>
  );
};

export default DefaultSearchPage;

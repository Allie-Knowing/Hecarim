import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";
// import SearchResults from "components/SearchPage/SearchResults";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";

const Search: FC = () => {
  const { height, width } = Dimensions.get("screen");

  return (
    <S.Container style={{ height, width }}>
      <SearchTopNavigation />
      {/* <SearchResults /> */}
    </S.Container>
  );
};

export default Search;

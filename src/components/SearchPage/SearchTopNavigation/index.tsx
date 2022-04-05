import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import { searchPayload } from "constance/search";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import InputNavigation from "./InputNavigation";

interface Props {
  searchTitle: searchTitleResponse;
  getAutoComplete: (payload: searchPayload) => void;
}

const SearchTopNavigation: FC<Props> = ({ searchTitle, getAutoComplete }) => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Wrapper topPad={topPad}>
      <InputNavigation
        searchTitle={searchTitle}
        getAutoComplete={getAutoComplete}
        topPad={topPad}
      />
    </S.Wrapper>
  );
};

export default SearchTopNavigation;

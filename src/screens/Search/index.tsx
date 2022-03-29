import React, { FC } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import * as S from "./style";
import SearchResults from "components/SearchPage/SearchResults";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
const { height, width } = Dimensions.get("screen");

const Search: FC = () => {
  return (
    <S.Container style={{ height, width }}>
      <SearchTopNavigation />
      <SearchResults />
    </S.Container>
  );
};

export default Search;

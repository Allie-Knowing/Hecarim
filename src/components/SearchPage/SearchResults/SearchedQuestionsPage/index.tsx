import React, { FC } from "react";
import { Dimensions, FlatList, View } from "react-native";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import Results from "./Results";
import * as S from "./style";

const { height } = Dimensions.get("screen");

const SearchedQuestionsPage: FC = () => {
  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <SearchTopNavigation />
      <S.Container height={height / 1.44}>
        <S.ResultAmount>검색된 질문 8개</S.ResultAmount>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => <Results />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            width: "100%",
            paddingLeft: 10,
            overflow: "hidden",
          }}
        />
      </S.Container>
    </View>
  );
};

export default SearchedQuestionsPage;

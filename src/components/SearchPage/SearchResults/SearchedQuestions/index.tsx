import React, { FC } from "react";
import * as S from "./style";
import axios from "axios";
import { Dimensions, FlatList, ListRenderItem, View } from "react-native";
import { searchTitle } from "constance/search";
import { useSearchResults } from "queries/Search";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import Results from "./Results";

const { width, height } = Dimensions.get("screen");

interface Props {
  title: string;
}

const SearchedQuestions: FC<Props> = ({ title }) => {
  const { data, isLoading, isError, error } = useSearchResults(title);
  const navigation = useMainStackNavigation();

  // const pressRenderItem = React.useCallback(() => {
  //   navigation.navigate("StackedQuestionList", { questionList: , index: 0 });
  // }, []);

  const renderItem: ListRenderItem<searchTitle> = ({ item }) => {
    if (item.thumbnail !== null) {
      return (
        <Results
          item={item}
          // pressRenderItem={pressRenderItem}
        />
      );
    }
    return null;
  };

  if (isLoading) {
    return <S.Message>검색 결과 로딩중...</S.Message>;
  }

  if (isError && axios.isAxiosError(error) && error.response.status !== 404) {
    return <S.Message>검색 결과 오류</S.Message>;
  }

  return (
    <View style={{ width, backgroundColor: "#FFFFFF" }}>
      <SearchTopNavigation title={title} />
      <S.Container height={height / 1.29}>
        <S.ResultAmount>검색된 질문 {data?.data.data.length}개</S.ResultAmount>
        <FlatList
          decelerationRate="fast"
          snapToAlignment="start"
          data={data?.data.data}
          renderItem={renderItem}
          keyExtractor={(item) => `result_${item.id}`}
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

export default SearchedQuestions;

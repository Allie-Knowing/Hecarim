import React, { FC } from "react";
import * as S from "./style";
import axios from "axios";
import { Dimensions, FlatList, ListRenderItem, View } from "react-native";
import { searchTitle } from "constance/search";
import { useSearchResults } from "queries/Search";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import Results from "./Results";
import { useStackQuestionList } from "queries/Question";

const { height } = Dimensions.get("screen");

interface Props {
  title: string;
}

const SearchedQuestions: FC<Props> = ({ title }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const { data, isLoading, isError, error } = useSearchResults(title);
  const { data: questionList } = useStackQuestionList(
    data?.data.data.map((value) => Number(value.id)) || []
  );
  const navigation = useMainStackNavigation();

  const moveQuestionStack = (index: number) => {
    if (!questionList?.data?.data) return;
    const questionListData = questionList.data.data;
    navigation.push("StackedQuestionList", {
      data: questionListData,
      index,
    });
  };

  const renderItem: ListRenderItem<searchTitle> = ({ item, index }) => {
    if (data.data.data.length > 0) {
      return (
        <Results
          item={item}
          moveQuestionStack={() => {
            moveQuestionStack(index);
          }}
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
    <S.Container height={height - 290}>
      <View>
        <SearchTopNavigation
          title={title}
          inputValue={inputValue}
          setInputValue={setInputValue}
          checkValue={checkValue}
          setCheckValue={setCheckValue}
        />
        <S.ResultAmount>검색된 질문 {data?.data.data.length}개</S.ResultAmount>
        <FlatList
          decelerationRate="fast"
          snapToAlignment="start"
          data={data.data.data}
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
      </View>
    </S.Container>
  );
};

export default SearchedQuestions;

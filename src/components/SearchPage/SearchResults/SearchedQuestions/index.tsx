import React, { FC } from "react";
import * as S from "./style";
import axios from "axios";
import { Dimensions, FlatList, ListRenderItem, View } from "react-native";
import { searchTitle } from "constance/search";
import { useSearchResults } from "queries/Search";
import useMainStackNavigation, {
  StackedQuestionListProps,
} from "hooks/useMainStackNavigation";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import Results from "./Results";
import { useStackQuestionList } from "queries/Question";
import { Question } from "api/Question";

const { width, height } = Dimensions.get("screen");

interface Props {
  title: string;
}

const SearchedQuestions: FC<Props> = ({ title }) => {
  const { data, isLoading, isError, error } = useSearchResults(title);
  const { data: questionList } = useStackQuestionList(
    data?.data.data.map((value) => Number(value.id)) || []
  );
  const navigation = useMainStackNavigation();

  const moveQuestionStack = () => {
    if (!questionList?.data?.data) return;
    const questionListData = questionList.data.data;
    const questionLists: Question[] = [];
    for (let i = 0; i < questionListData.length; i++) {
      questionLists.push({
        id: questionListData[i].id,
        description: questionListData[i].description,
        title: questionListData[i].title,
        video_url: questionListData[i].video_url,
        created_at: questionListData[i].created_at,
        user_id: questionListData[i].user_id,
        profile: questionListData[i].profile,
        comment_cnt: questionListData[i].comment_cnt,
        like_cnt: questionListData[i].like_cnt,
        is_mine: questionListData[i].is_mine,
        is_like: questionListData[i].is_like,
        is_adoption: questionListData[i].is_adoption,
      });
    }
    navigation.push("StackedQuestionList", { data: questionLists, index: 0 });
  };

  // const pressRenderItem = React.useCallback(
  //   (index: number) => () => {
  //     navigation.navigate("StackedQuestionList", {
  //       data: questionList?.data.data,
  //       index: index,
  //     });
  //   },
  //   [navigation, questionList]
  // );

  const renderItem: ListRenderItem<searchTitle> = ({ item, index }) => {
    if (item.thumbnail !== null) {
      return <Results item={item} moveQuestionStack={moveQuestionStack} />;
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

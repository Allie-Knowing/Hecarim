import React, { FC, useMemo } from "react";
import * as S from "./style";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import SearchedQuestions from "components/SearchPage/SearchResults/SearchedQuestions";
import SearchedQuestionsPageHeader from "components/Header/SearchedQuestionsPage";
import isStackContext from "context/IsStackContext";

const SearchedQuestionsPage: FC<
  StackScreenProps<MainStackParamList, "SearchedQuestionsPage">
> = ({ navigation, route }) => {
  const title = useMemo(() => route.params.title || "", [route.params.title]);

  return (
    <isStackContext.Provider value={true}>
      <S.SearchedQuestionPageWrapper>
        <SearchedQuestionsPageHeader stackNavigation={navigation} />
        <SearchedQuestions title={title} />
      </S.SearchedQuestionPageWrapper>
    </isStackContext.Provider>
  );
};

export default SearchedQuestionsPage;

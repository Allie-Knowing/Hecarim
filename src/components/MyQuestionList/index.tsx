import { StackNavigationProp } from "@react-navigation/stack";
import { Question } from "api/Question";
import axios from "axios";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useProfileQuestionList } from "queries/Profile";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MyQuestion from "./MyQuestion";
import * as S from "./style";

const { height } = Dimensions.get("window");

type Props = {
  userId: number;
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyQuestionList: FC<Props> = ({ userId, navigation }) => {
  const { data, isLoading, isError, error } = useProfileQuestionList(userId);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const moveQuestionStack = useCallback(() => {
    if (!data) return;
    const questionListData = data.data.data;
    const questionList: Question[] = [];
    for (let i = 0; i < questionListData.length; i++) {
      console.log(questionListData[i].video_url);
      questionList.push({
        id: parseInt(questionListData[i].id),
        description: questionListData[i].video_description,
        title: questionListData[i].video_title,
        video_url: questionList[i].video_url,
        created_at: questionList[i].created_at,
        user_id: questionList[i].user_id,
        profile: questionList[i].profile,
        comment_cnt: questionList[i].comment_cnt,
        like_cnt: questionList[i].like_cnt,
        is_mine: questionList[i].is_mine,
        is_like: questionList[i].is_like,
        is_adoption: questionList[i].is_adoption,
      });
    }
    console.log(questionList);
    // navigation.push("StackedQuestionList");/
  }, [data]);

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response?.status === 404) {
      setIsEmpty(true);
    }
  }, [error]);

  return (
    <S.Container height={height - 290}>
      {data && (
        <View>
          <S.Title>질문</S.Title>
          {data.data.data.length === 0 ? (
            <S.Notice>질문이 없습니다.</S.Notice>
          ) : (
            <S.QuestionContainer
              key={"#"}
              data={data.data.data}
              renderItem={({ item }: any) => (
                <MyQuestion
                  question={item}
                  moveQuestionStack={moveQuestionStack}
                />
              )}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                width: "100%",
                paddingRight: 10,
                paddingLeft: 10,
                overflow: "hidden",
              }}
            />
          )}
        </View>
      )}
      {isLoading && <S.Notice>잠시만 기다려주세요.</S.Notice>}
      {!isLoading && !isEmpty && isError && (
        <S.Notice>잠시 후 다시 시도하세요.</S.Notice>
      )}
      {isEmpty && !isLoading && (
        <View>
          <S.Title>질문</S.Title>
          <S.Notice>아직 질문이 없습니다.</S.Notice>
        </View>
      )}
    </S.Container>
  );
};

export default MyQuestionList;

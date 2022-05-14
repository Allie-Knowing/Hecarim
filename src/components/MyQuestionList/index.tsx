import { StackNavigationProp } from "@react-navigation/stack";
import { Question } from "api/Question";
import axios from "axios";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useProfileQuestionList } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import theme from "theme/theme";
import MyQuestion from "./MyQuestion";
import * as S from "./style";
import Switch from "./Switch";

const { height } = Dimensions.get("window");

type Props = {
  userId: number;
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyQuestionList: FC<Props> = ({ userId, navigation }) => {
  const { data, isLoading, isError, error } = useProfileQuestionList(userId);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<boolean>(true);

  const moveQuestionStack = (index: number) => {
    if (!data?.data?.data) return;
    const questionListData = data.data.data;
    const questionList: Question[] = [];
    for (let i = 0; i < questionListData.length; i++) {
      questionList.push({
        id: parseInt(questionListData[i].id),
        description: questionListData[i].video_description,
        title: questionListData[i].video_title,
        video_url: questionListData[i].video_url,
        created_at: questionListData[i].created_at,
        user_id: questionListData[i].user_id,
        profile: questionListData[i].user_profile,
        comment_cnt: questionListData[i].comment_cnt,
        like_cnt: questionListData[i].like_cnt,
        is_mine: questionListData[i].is_mine,
        is_like: questionListData[i].is_like,
        is_adoption: questionListData[i].is_adoption,
      });
    }
    navigation.push("StackedQuestionList", { data: questionList, index });
  };

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response?.status === 404) {
      setIsEmpty(true);
    }
  }, [error]);

  return (
    <S.Container height={height - 290}>
      <Switch isLeft={isQuestion} setIsLeft={setIsQuestion} />
      {data && (
        <View>
          <S.Title>내가 올린 질문 {12}개</S.Title>
          {data.data.data.length === 0 ? (
            <S.Notice>질문이 없습니다.</S.Notice>
          ) : (
            <S.QuestionContainer
              key={"#"}
              data={data.data.data}
              renderItem={({ item, index }: { item: any; index: number }) => (
                <MyQuestion
                  question={item}
                  moveQuestionStack={() => moveQuestionStack(index)}
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

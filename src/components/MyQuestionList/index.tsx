import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileQuestion } from "api/Profile";
import { Question } from "api/Question";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useProfileAnswerList, useProfileQuestionList } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, ListRenderItem, View } from "react-native";
import MyQuestion from "./MyQuestion";
import * as S from "./style";
import Switch from "./Switch";

const { height } = Dimensions.get("window");

type Props = {
  userId: number;
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  questionCnt: number;
  answerCnt: number;
};

const MyQuestionList: FC<Props> = ({
  userId,
  navigation,
  questionCnt,
  answerCnt,
}) => {
  const {
    data: questionList,
    isLoading,
    isError,
    error,
  } = useProfileQuestionList(userId);
  const { data: answerList } = useProfileAnswerList(userId);
  const [isQuestion, setIsQuestion] = useState<boolean>(true);
  const [profileDataList, setProfileDataList] = useState<ProfileQuestion[]>([]);

  const moveQuestionStack = (index: number) => {
    if (profileDataList.length <= 0) return;
    const navigationArray: Question[] = [];
    for (let i = 0; i < profileDataList.length; i++) {
      navigationArray.push({
        id: parseInt(profileDataList[i].id),
        description: profileDataList[i].video_description,
        title: profileDataList[i].video_title,
        video_url: profileDataList[i].video_url,
        created_at: profileDataList[i].created_at,
        user_id: profileDataList[i].user_id,
        profile: profileDataList[i].user_profile,
        comment_cnt: profileDataList[i].comment_cnt,
        like_cnt: profileDataList[i].like_cnt,
        is_mine: profileDataList[i].is_mine,
        is_like: profileDataList[i].is_like,
        is_adoption: profileDataList[i].is_adoption,
      });
    }
    navigation.push("StackedQuestionList", {
      data: navigationArray,
      index,
    });
  };

  const renderItem: ListRenderItem<ProfileQuestion> = ({ item, index }) => (
    <MyQuestion
      question={item}
      moveQuestionStack={() => moveQuestionStack(index)}
    />
  );

  useEffect(() => {
    if (isQuestion) {
      setProfileDataList(questionList?.data.data || []);
    } else {
      setProfileDataList(answerList?.data.data || []);
    }
  }, [isQuestion, questionList, answerList]);

  return (
    <S.Container height={height - 290}>
      <Switch isLeft={isQuestion} setIsLeft={setIsQuestion} />
      {profileDataList.length !== 0 && (
        <View>
          <S.Title>
            {isQuestion
              ? `영상 질문 ${questionCnt || 0}개`
              : `영상 답변 ${answerCnt || 0}개`}
          </S.Title>
          <S.QuestionContainer
            key={"#"}
            data={profileDataList}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              width: "100%",
              paddingRight: 10,
              paddingLeft: 10,
              overflow: "hidden",
            }}
          />
        </View>
      )}
      {isLoading && <S.Notice>잠시만 기다려주세요.</S.Notice>}
      {profileDataList.length === 0 && !isLoading && (
        <View>
          <S.Title>질문</S.Title>
          <S.Notice>아직 질문이 없습니다.</S.Notice>
        </View>
      )}
    </S.Container>
  );
};

export default MyQuestionList;

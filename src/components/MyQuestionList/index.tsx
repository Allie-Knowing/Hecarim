import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileQuestion } from "api/Profile";
import { Question } from "api/Question";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useProfileAnswerList, useProfileQuestionList } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
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

  useEffect(() => {
    console.log(questionList);
    console.log(answerList);

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
        </View>
      )}
      {isLoading && <S.Notice>잠시만 기다려주세요.</S.Notice>}
      {!isLoading && isError && <S.Notice>잠시 후 다시 시도하세요.</S.Notice>}
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

// comment_cnt: 1
// created_at: "2022-05-12T14:29:30.467Z"
// id: 307
// is_adoption: 0
// is_like: true
// is_mine: true
// like_cnt: 7
// thumbnail: "https://test-knowing.s3.ap-northeast-2.amazonaws.com/processed/question/mov_b25d8beb-0374-4255-9d48-ddd360842750knowing.png"
// user_id: 16
// user_profile: "https://s3.ap-northeast-2.amazonaws.com/test-knowing/profile/58f95f13-cdd0-4b73-b1cc-88221d114e8d.jpg"
// video_description: "스키타러 가고 싶어요 ㅜㅜ"
// video_title: "어디 스키장인가요??"
// video_url: "https://d2kugok170b34v.cloudfront.net/processed/question/mov_b25d8beb-0374-4255-9d48-ddd360842750/mov_b25d8beb-0374-4255-9d48-ddd360842750knowing.m3u8"
// views: "90"

// comment_cnt: 0
// created_at: "2022-04-21T03:57:46.642Z"
// id: 197
// is_adoption: 0
// is_like: true
// is_mine: false
// like_cnt: 5
// thumbnail: "https://test-knowing.s3.ap-northeast-2.amazonaws.com/processed/question/mp4_31730040-6925-4f63-b911-d17a745e525fknowing.png"
// user_id: 3
// user_profile: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
// video_description: "롤체 저티어를 벗어나덜 몬하고 있어요 도와주세요"
// video_title: "롤체 넘나 어려웡"
// video_url: "https://d2kugok170b34v.cloudfront.net/processed/question/mp4_31730040-6925-4f63-b911-d17a745e525f/mp4_31730040-6925-4f63-b911-d17a745e525fknowing.m3u8"
// views: "1"

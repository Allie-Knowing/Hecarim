import React, { FC } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import MakeKnowingBanner from "components/MakeKnowingBanner";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import { RouteProp } from "@react-navigation/native";
import { useProfile } from "queries/Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  route: RouteProp<MainStackParamList, "UserPage">;
};

const UserPage: FC<Props> = ({ route, navigation }) => {
  const { top: topPad } = useSafeAreaInsets();
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useProfile(route.params.userId);

  return (
    <isStackContext.Provider value={true}>
      <S.UserContainer topPad={topPad}>
        <Profile
          userInfo={userInfo?.data.data}
          isLoading={isLoading}
          isError={isError}
          onPressFollower={() => navigation.push("Follower", { userId: route.params.userId })}
        />
        <MakeKnowingBanner />
        <MyQuestionList
          userId={route.params.userId}
          navigation={navigation}
          questionCnt={userInfo?.data.data.video_cnt}
          answerCnt={userInfo?.data.data.answer_video_cnt}
        />
      </S.UserContainer>
    </isStackContext.Provider>
  );
};

export default UserPage;

import React, { FC, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import { RouteProp } from "@react-navigation/native";
import { useProfile } from "queries/Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFollowMutation, useIsFollow } from "queries/Follow";
import { AdMobBanner } from "expo-ads-admob";
import getEnvVars from "../../../environment";

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
  const { data } = useIsFollow(route.params.userId);
  const { mutateAsync } = useFollowMutation(route.params.userId);
  const [adError, setAdError] = useState(false);

  return (
    <isStackContext.Provider value={true}>
      <S.UserContainer topPad={topPad}>
        <Profile
          isMy={false}
          isFollow={data?.data.is_follow}
          mutate={mutateAsync}
          userInfo={userInfo?.data.data}
          isLoading={isLoading}
          isError={isError}
          onPressFollower={() =>
            navigation.push("Follower", { userId: route.params.userId })
          }
        />
        <S.AdContainer>
          {!adError && (
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              servePersonalizedAds={true}
              onDidFailToReceiveAdWithError={(error) => {
                setAdError(true);
                alert(error);
              }}
              adUnitID={getEnvVars().googleAdLicense}
            />
          )}
        </S.AdContainer>
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

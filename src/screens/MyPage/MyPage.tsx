import React, { FC, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import { useMyId } from "queries/MyId";
import { useProfile } from "queries/Profile";
import { AdMobBanner } from "expo-ads-admob";
import getEnvVars from "../../../environment";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyPage: FC<Props> = ({ navigation }) => {
  const { data } = useMyId();
  const { data: userInfo, isLoading, isError } = useProfile(data?.data.data);
  const [adError, setAdError] = useState(false);

  return (
    <isStackContext.Provider value={false}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile
          isMy={true}
          userInfo={userInfo?.data.data}
          isLoading={isLoading}
          isError={isError}
          onPressFollower={() => navigation.push("Follower", { userId: data?.data.data })}
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
          userId={data?.data.data}
          navigation={navigation}
          questionCnt={userInfo?.data.data.video_cnt}
          answerCnt={userInfo?.data.data.answer_video_cnt}
        />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default MyPage;

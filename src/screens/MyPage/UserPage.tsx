import React, { FC, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
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

  return (
    <isStackContext.Provider value={true}>
      <S.UserContainer topPad={topPad}>
        <Profile userId={route.params.userId} />
        <MakeKnowingBanner />
        <MyQuestionList userId={route.params.userId} navigation={navigation} />
      </S.UserContainer>
    </isStackContext.Provider>
  );
};

export default UserPage;

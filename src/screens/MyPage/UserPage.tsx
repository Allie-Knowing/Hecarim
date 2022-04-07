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

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  route: RouteProp<MainStackParamList, "UserPage">;
};

const UserPage: FC<Props> = ({ route, navigation }) => {
  return (
    <isStackContext.Provider value={true}>
      <S.Container>
        <Profile userId={route.params.userId} />
        <MakeKnowingBanner />
        <MyQuestionList userId={route.params.userId} navigation={navigation} />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default UserPage;

import React, { FC, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import MakeKnowingBanner from "components/MakeKnowingBanner";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import useProfile from "utils/hooks/profile/useProfile";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  route: RouteProp<MainStackParamList, "UserPage">;
};

const UserPage: FC<Props> = ({ route, navigation }) => {
  const { state, setState } = useProfile();

  useEffect(() => {
    setState.reset();
    setState.profile({ id: route.params.userId });
    setState.questionList({ id: route.params.userId });
  }, []);

  return (
    <isStackContext.Provider value={true}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile />
        <MakeKnowingBanner />
        <MyQuestionList />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default UserPage;

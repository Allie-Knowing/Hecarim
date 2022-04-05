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
import useMyId from "utils/hooks/myId/useMyId";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const UserPage: FC<Props> = ({ navigation }) => {
  const { state, setState } = useProfile();

  useEffect(() => {
    setState.profile({ id: state.userId });
    setState.questionList({ id: state.userId });
  }, [state.userId]);

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

import React, { FC, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import MakeKnowingBanner from "components/MakeKnowingBanner";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  route: any;
};

const UserPage: FC<Props> = ({ navigation, route }) => {
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

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

const MyPage: FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const getProfile = async () => {
      if (!(await localStorage.getItem(storageKeys.accessToken))) {
        navigation.push("Login");
      }
    };
    getProfile();
  }, []);

  return (
    <isStackContext.Provider value={false}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile />
        <MakeKnowingBanner />
        <MyQuestionList />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default MyPage;

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
import { useMyId } from "queries/MyId";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyPage: FC<Props> = ({ navigation }) => {
  const { data } = useMyId();

  useEffect(() => {
    const isLogin = async () => {
      if (!(await localStorage.getItem<string>(storageKeys.accessToken))) {
        navigation.push("Login");
      }
    };
    isLogin();
  }, []);

  return (
    <isStackContext.Provider value={false}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile userId={data?.data?.data} />
        <MakeKnowingBanner />
        <MyQuestionList userId={data?.data?.data} />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default MyPage;
